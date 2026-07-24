import { NextRequest, NextResponse } from 'next/server';
import { BookingService } from '@/services/booking.service';
import { bookingSchema } from '@/lib/validations';
import { EmailService } from '@/services/email.service';

export async function GET(req: NextRequest) {
  try {
    const adminToken = req.cookies.get('adminToken')?.value;
    if (!adminToken) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;

    const bookings = await BookingService.getAllBookings(status);
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Parse dates to ensure they are Date objects for Zod
    if (body.startDate) body.startDate = new Date(body.startDate);
    if (body.endDate) body.endDate = new Date(body.endDate);
    
    const validatedData = bookingSchema.parse(body);

    const booking = await BookingService.createBooking(validatedData);
    
    // Send email notification async
    if (booking.customer && booking.bikeUnit?.bike) {
      EmailService.sendBookingConfirmation(booking, booking.customer, booking.bikeUnit.bike).catch(console.error);
    }

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Validation error' }, { status: 400 });
  }
}
