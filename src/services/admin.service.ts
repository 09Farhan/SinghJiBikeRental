import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { DashboardStats } from '@/types';
import type { AdminUser } from '@prisma/client';

export const AdminService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const [
      totalBikes,
      totalUnits,
      activeBookings,
      pendingBookings,
      totalCustomers,
      completedBookingsAmount
    ] = await Promise.all([
      prisma.bike.count({ where: { isActive: true } }),
      prisma.bikeUnit.count(),
      prisma.booking.count({ where: { status: 'ACTIVE' } }),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.customer.count(),
      prisma.booking.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { totalAmount: true }
      })
    ]);

    return {
      totalBikes,
      totalUnits,
      activeBookings,
      pendingBookings,
      totalCustomers,
      totalRevenue: completedBookingsAmount._sum.totalAmount || 0
    };
  },

  async authenticateAdmin(email: string, password: string): Promise<AdminUser | null> {
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) return null;

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) return null;

    return admin;
  },

  async verifyAdminToken(token: string): Promise<{ id: string, email: string } | null> {
    try {
      const secret = process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production';
      const decoded = jwt.verify(token, secret) as { id: string, email: string };
      return decoded;
    } catch (e) {
      return null;
    }
  },

  createAdminToken(admin: AdminUser): string {
    const secret = process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production';
    return jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      secret,
      { expiresIn: '24h' }
    );
  }
};
