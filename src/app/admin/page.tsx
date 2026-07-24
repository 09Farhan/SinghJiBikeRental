import { AdminService } from '@/services/admin.service';
import { BookingService } from '@/services/booking.service';
import DashboardClient from './DashboardClient';

// Force dynamic to prevent caching on the dashboard
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const stats = await AdminService.getDashboardStats();
  const recentBookings = await BookingService.getAllBookings();

  return <DashboardClient initialStats={stats} initialBookings={recentBookings} />;
}
