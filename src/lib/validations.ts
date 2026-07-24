import { z } from 'zod';

export const bookingSchema = z.object({
  bikeId: z.string().cuid('Invalid bike ID'),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().regex(/^[0-9+\\-]{10,15}$/, 'Invalid phone number format'),
  notes: z.string().optional(),
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9+\\-]{10,15}$/, 'Invalid phone number format'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const bikeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  brand: z.string().min(1, 'Brand is required'),
  category: z.enum(['BIKE', 'SCOOTER']),
  description: z.string().min(10, 'Description is too short'),
  pricePerDay: z.number().int().positive('Price must be a positive number'),
  engine: z.string().min(1, 'Engine detail is required'),
  mileage: z.string().min(1, 'Mileage is required'),
  fuelType: z.enum(['PETROL', 'ELECTRIC']),
  transmission: z.enum(['MANUAL', 'AUTOMATIC']),
  seatCapacity: z.number().int().positive().default(2),
  images: z.array(z.string()).min(1, 'At least one image is required'),
});

export const bikeUnitSchema = z.object({
  registrationNumber: z.string().min(1, 'Registration number is required'),
  color: z.string().min(1, 'Color is required'),
  status: z.enum(['AVAILABLE', 'BOOKED', 'MAINTENANCE']),
  notes: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
