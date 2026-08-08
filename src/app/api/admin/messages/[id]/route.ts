import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { RateLimitService } from '@/services/rate-limit.service';
import { InquiryStatus } from '@prisma/client';

const updateSchema = z.object({
  status: z.nativeEnum(InquiryStatus),
}).strict();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, null, 'authenticated');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    const { id } = params;
    const body = await req.json();
    const { status } = updateSchema.parse(body);

    const message = await prisma.contactInquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, data: message });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    console.error('Failed to update message:', error);
    return NextResponse.json({ success: false, error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, null, 'authenticated');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    const { id } = params;

    await prisma.contactInquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete message:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete message' }, { status: 500 });
  }
}
