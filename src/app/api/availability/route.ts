import { NextRequest, NextResponse } from 'next/server';
import { BookingService } from '@/services/booking.service';
import { z } from 'zod';

const availabilitySchema = z.object({
  bikeId: z.string().cuid(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after start date",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bikeId, startDate, endDate } = availabilitySchema.parse(body);

    const result = await BookingService.checkAvailability(bikeId, startDate, endDate);
    
    return NextResponse.json({ 
      success: true, 
      data: {
        available: result.available,
        availableUnits: result.availableUnits,
        totalUnits: result.totalUnits
      } 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Error checking availability' }, { status: 400 });
  }
}
