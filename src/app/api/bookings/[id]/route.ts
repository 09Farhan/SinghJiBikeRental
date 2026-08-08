import { NextRequest, NextResponse } from 'next/server';
import { BookingService } from '@/services/booking.service';
import { BookingStatus } from '@prisma/client';
import { RateLimitService } from '@/services/rate-limit.service';
import { z } from 'zod';

const updateBookingSchema = z.object({
  status: z.nativeEnum(BookingStatus),
}).strict();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, null, 'public');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    const booking = await BookingService.getBookingById(params.id);
    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch booking' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminToken = req.cookies.get('adminToken')?.value;
    if (!adminToken) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, null, 'authenticated');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    const body = await req.json();
    const { status } = updateBookingSchema.parse(body);

    const booking = await BookingService.updateBookingStatus(params.id, status);
    return NextResponse.json({ success: true, data: booking });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminToken = req.cookies.get('adminToken')?.value;
    if (!adminToken) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, null, 'authenticated');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    await BookingService.deleteBooking(params.id);
    return NextResponse.json({ success: true, data: { message: 'Booking deleted successfully' } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete booking' }, { status: 500 });
  }
}
