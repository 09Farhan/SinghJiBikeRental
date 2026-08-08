import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { prisma } from '@/lib/prisma';
import { NotificationService } from '@/services/notification.service';
import { RateLimitService } from '@/services/rate-limit.service';

export async function POST(req: NextRequest) {
  try {
    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, null, 'public');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const inquiry = await prisma.contactInquiry.create({
      data: validatedData
    });

    // Send email notification and await it so Vercel doesn't kill the function
    await NotificationService.processLeadNotification(inquiry.id);

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Validation error' }, { status: 400 });
  }
}
