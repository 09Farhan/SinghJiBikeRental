import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { prisma } from '@/lib/prisma';
import { NotificationService } from '@/services/notification.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const inquiry = await prisma.contactInquiry.create({
      data: validatedData
    });

    // Send email notification async
    NotificationService.processLeadNotification(inquiry.id).catch(console.error);

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Validation error' }, { status: 400 });
  }
}
