import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export type RouteType = 'auth' | 'public' | 'authenticated';

interface RateLimitConfig {
  maxAttempts: number;
  windowMinutes: number; // For cleanup or rolling window
  // Exponential backoff multipliers: 
  // If failures > maxAttempts, wait = baseDelaySeconds * (multiplier ^ (failures - maxAttempts))
  baseDelaySeconds: number;
  multiplier: number;
  maxDelaySeconds: number;
}

export const RATE_LIMIT_CONFIGS: Record<RouteType, RateLimitConfig> = {
  auth: {
    maxAttempts: 5,
    windowMinutes: 15,
    baseDelaySeconds: 60, // 1 minute
    multiplier: 2,
    maxDelaySeconds: 3600 // max 1 hour
  },
  public: {
    maxAttempts: 300, // Higher limits for public APIs
    windowMinutes: 10,
    baseDelaySeconds: 60, // 1 minute backoff
    multiplier: 1.5,
    maxDelaySeconds: 900 // max 15 minutes
  },
  authenticated: {
    maxAttempts: 150, // Loose limits for authenticated admin routes
    windowMinutes: 15,
    baseDelaySeconds: 30,
    multiplier: 1.5,
    maxDelaySeconds: 300 // max 5 minutes
  }
};

export const RateLimitService = {
  getIp(req: NextRequest): string {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    
    // Fallback to a default if not found (useful for dev)
    return forwarded?.split(',')[0] || realIp || '127.0.0.1';
  },

  async checkLimit(
    ip: string | null, 
    identifier: string | null, 
    routeType: RouteType
  ): Promise<{ allowed: boolean; retryAfter?: number; error?: string }> {
    try {
      const config = RATE_LIMIT_CONFIGS[routeType];
      
      const recordsToUpdate: any[] = [];
      let isBlocked = false;
      let maxRetryAfter = 0;

      // Check IP limit
      if (ip) {
        const ipRecord = await this.getOrUpdateRecord(ip, null, routeType, config);
        if (ipRecord.blocked) {
          isBlocked = true;
          maxRetryAfter = Math.max(maxRetryAfter, ipRecord.retryAfter);
        }
      }

      // Check Identifier limit
      if (identifier) {
        const identifierRecord = await this.getOrUpdateRecord(null, identifier, routeType, config);
        if (identifierRecord.blocked) {
          isBlocked = true;
          maxRetryAfter = Math.max(maxRetryAfter, identifierRecord.retryAfter);
        }
      }

      if (isBlocked) {
        return { 
          allowed: false, 
          retryAfter: maxRetryAfter,
          error: `Too many requests. Please try again in ${Math.ceil(maxRetryAfter / 60)} minutes.`
        };
      }

      return { allowed: true };
    } catch (error) {
      console.error('Rate Limiter Error:', error);
      // In case of DB failure, we let the request through to avoid blocking legitimate users due to infra issues
      return { allowed: true };
    }
  },

  async getOrUpdateRecord(
    ip: string | null, 
    identifier: string | null, 
    routeType: RouteType, 
    config: RateLimitConfig
  ) {
    const now = new Date();
    const windowStart = new Date(now.getTime() - config.windowMinutes * 60 * 1000);

    // Find existing record within the window
    let record = await prisma.rateLimit.findFirst({
      where: {
        ip: ip,
        identifier: identifier,
        routeType: routeType,
      },
      orderBy: { updatedAt: 'desc' }
    });

    if (!record || record.updatedAt < windowStart) {
      // If no record or it's older than the window, create/reset it
      if (record) {
        record = await prisma.rateLimit.update({
          where: { id: record.id },
          data: {
            attempts: 1,
            blockedUntil: null,
          }
        });
      } else {
        record = await prisma.rateLimit.create({
          data: {
            ip,
            identifier,
            routeType,
            attempts: 1,
          }
        });
      }
      return { blocked: false, retryAfter: 0 };
    }

    // Record is within window. Check if currently blocked.
    if (record.blockedUntil && record.blockedUntil > now) {
      const retryAfterSeconds = Math.ceil((record.blockedUntil.getTime() - now.getTime()) / 1000);
      return { blocked: true, retryAfter: retryAfterSeconds };
    }

    // Increment attempts
    const newAttempts = record.attempts + 1;
    let newBlockedUntil = null;
    let retryAfter = 0;

    if (newAttempts > config.maxAttempts) {
      // Apply exponential backoff
      const failuresOverMax = newAttempts - config.maxAttempts;
      const delaySeconds = Math.min(
        config.baseDelaySeconds * Math.pow(config.multiplier, failuresOverMax - 1),
        config.maxDelaySeconds
      );
      
      retryAfter = delaySeconds;
      newBlockedUntil = new Date(now.getTime() + delaySeconds * 1000);
    }

    await prisma.rateLimit.update({
      where: { id: record.id },
      data: {
        attempts: newAttempts,
        blockedUntil: newBlockedUntil
      }
    });

    if (newBlockedUntil) {
      return { blocked: true, retryAfter };
    }

    return { blocked: false, retryAfter: 0 };
  },

  async clearLimit(ip: string | null, identifier: string | null, routeType: RouteType) {
    // Used to clear limits after a successful authentication to prevent locking out on subsequent actions
    try {
      await prisma.rateLimit.deleteMany({
        where: {
          ip,
          identifier,
          routeType
        }
      });
    } catch (e) {
      console.error('Failed to clear limit', e);
    }
  }
};
