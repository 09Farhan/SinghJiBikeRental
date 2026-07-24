# Singh Ji's Bike Rental

A premium, full-stack Next.js 14 web application for bike and scooter rentals.

## Tech Stack
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Zod (Validation)
- JSON Web Tokens (Auth)
- date-fns

## Prerequisites
- Node.js 18+
- PostgreSQL database

## Setup Instructions

1. **Clone and Install**
   ```bash
   git clone <repo-url>
   cd singhji-bike-rental
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env` and fill in your details:
   ```bash
   cp .env.example .env
   ```
   Ensure you provide a valid `DATABASE_URL` pointing to your PostgreSQL instance.

3. **Database Setup**
   Push the Prisma schema to your database and generate the client:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **Seed Database**
   Seed the database with initial bikes, units, and the admin user:
   ```bash
   npm run prisma:seed
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   Access the site at http://localhost:3000

## API Documentation Summary

### Public Routes
- `GET /api/bikes` - List all bikes (supports filtering)
- `GET /api/bikes/[id]` - Get single bike details
- `POST /api/availability` - Check bike availability for specific dates
- `POST /api/bookings` - Create a new booking
- `POST /api/contact` - Submit a contact form inquiry
- `POST /api/admin/auth` - Admin login

### Protected Routes (Requires Admin Cookie)
- `POST /api/bikes` - Add new bike
- `PUT /api/bikes/[id]` - Update bike
- `DELETE /api/bikes/[id]` - Soft delete bike
- `GET /api/bookings` - List all bookings
- `PATCH /api/bookings/[id]` - Update booking status
- `GET /api/admin/stats` - Get dashboard metrics

## Deployment

1. **Vercel**: The frontend and API routes are optimized for Vercel deployment. Connect your GitHub repository to Vercel.
2. **Database**: Use a hosted PostgreSQL solution like Railway, Supabase, or Neon. Update the `DATABASE_URL` in Vercel's environment variables.
3. **Build settings**: `npm run build` will automatically run `prisma generate` during deployment.

## Future Enhancements
- Payment Gateway Integration (Razorpay/Stripe)
- SMS Notifications (Twilio)
- User Authentication (NextAuth)
- Image Uploads (AWS S3 / Cloudinary)

## License
MIT
