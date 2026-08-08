import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { RateLimitService } from '@/services/rate-limit.service';

const reviewSchema = z.object({
  author: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  location: z.string().min(2, 'Location is required').max(100, 'Location is too long'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters').max(1000, 'Review is too long'),
  images: z.array(z.string().max(500, 'Image URL is too long')).max(5, 'Too many images').optional(),
}).strict();

export async function POST(req: NextRequest) {
  try {
    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, null, 'public');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

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
