import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const reviewSchema = z.object({
  author: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().min(2, 'Location is required'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters'),
  images: z.array(z.string()).optional(), // Array of base64 strings
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = reviewSchema.parse(body);

    const review = await prisma.review.create({
      data: {
        author: data.author,
        location: data.location,
        rating: data.rating,
        comment: data.comment,
        images: data.images || [],
        isApproved: true, // Auto-approve by default
      },
    });

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    console.error('Error creating review:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit review' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';

    // If 'all' is true, this might be an admin call. (Ideally, check auth token here).
    // For now, we'll keep it simple and just fetch approved ones by default.
    const reviews = await prisma.review.findMany({
      where: all ? {} : { isApproved: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
