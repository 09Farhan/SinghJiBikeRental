import { z } from 'zod';

export const bookingSchema = z.object({
  bikeId: z.string().cuid('Invalid bike ID'),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  customerEmail: z.string().email('Invalid email address').max(255, 'Email is too long'),
  customerPhone: z.string().regex(/^[0-9+\\-]{10,15}$/, 'Invalid phone number format'),
  notes: z.string().max(1000, 'Notes are too long').optional(),
}).strict().refine(data => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address').max(255, 'Email is too long'),
  phone: z.string().regex(/^[0-9+\\-]{10,15}$/, 'Invalid phone number format'),
  message: z.string().max(2000, 'Message is too long').optional(),
  preferredBike: z.string().max(100, 'Preferred bike is too long').optional(),
  pickupLocation: z.string().max(200, 'Pickup location is too long').optional(),
  rentalDate: z.string().max(50, 'Rental date is too long').optional(),
  source: z.string().max(50).default('CONTACT_FORM'),
}).strict();

export const bikeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  slug: z.string().min(1, 'Slug is required').max(100, 'Slug is too long'),
  brand: z.string().min(1, 'Brand is required').max(50, 'Brand is too long'),
  category: z.enum(['BIKE', 'SCOOTER']),
  description: z.string().min(10, 'Description is too short').max(2000, 'Description is too long'),
  pricePerDay: z.number().int().positive('Price must be a positive number'),
  engine: z.string().min(1, 'Engine detail is required').max(50, 'Engine detail is too long'),
  mileage: z.string().min(1, 'Mileage is required').max(50, 'Mileage is too long'),
  fuelType: z.enum(['PETROL', 'ELECTRIC']),
  transmission: z.enum(['MANUAL', 'AUTOMATIC']),
  seatCapacity: z.number().int().positive('Seat capacity must be positive').optional(),
  images: z.array(z.string().max(500, 'Image URL is too long')).max(10, 'Too many images').optional(),
}).strict();

export const bikeUnitSchema = z.object({
  registrationNumber: z.string().min(1, 'Registration number is required').max(50, 'Registration number is too long'),
  color: z.string().min(1, 'Color is required').max(50, 'Color is too long'),
  status: z.enum(['AVAILABLE', 'BOOKED', 'MAINTENANCE']),
  notes: z.string().max(1000, 'Notes are too long').optional(),
}).strict();

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').max(255, 'Email is too long'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password is too long'),
}).strict();
