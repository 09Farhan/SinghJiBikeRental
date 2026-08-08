import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { RateLimitService } from '@/services/rate-limit.service';

const updateSchema = z.object({
  isApproved: z.boolean().optional(),
}).strict();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, null, 'authenticated');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    const body = await req.json();
    const { isApproved } = updateSchema.parse(body);

    const review = await prisma.review.update({
      where: { id: params.id },
      data: {
        ...(isApproved !== undefined && { isApproved }),
      },
    });

    return NextResponse.json({ success: true, data: review });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, null, 'authenticated');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    await prisma.review.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
