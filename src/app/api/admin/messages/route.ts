import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { RateLimitService } from '@/services/rate-limit.service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, null, 'authenticated');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const status = searchParams.get('status');
    const source = searchParams.get('source');

    let whereClause: any = {};

    if (query) {
      whereClause.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
        { phone: { contains: query, mode: 'insensitive' } },
      ];
    }

    if (status) {
      whereClause.status = status;
    }

    if (source) {
      whereClause.source = source;
    }

    const messages = await prisma.contactInquiry.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 });
  }
}
