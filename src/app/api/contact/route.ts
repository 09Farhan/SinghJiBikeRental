import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { prisma } from '@/lib/prisma';
import { EmailService } from '@/services/email.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const inquiry = await prisma.contactInquiry.create({
      data: validatedData
    });

    // EmailService.sendContactNotification(inquiry).catch(console.error);

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Validation error' }, { status: 400 });
  }
}
