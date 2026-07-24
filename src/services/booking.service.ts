import { prisma } from '@/lib/prisma';
import type { BookingFormData, BookingWithDetails } from '@/types';
import { BookingStatus } from '@prisma/client';
import { calculateDays, calculateRentalAmount } from '@/lib/utils';

export const BookingService = {
  async checkAvailability(bikeId: string, startDate: Date, endDate: Date) {
    const bike = await prisma.bike.findUnique({
      where: { id: bikeId },
      include: { units: true }
    });

    if (!bike) throw new Error('Bike not found');

    const overlappingBookings = await prisma.booking.findMany({
      where: {
        bikeUnit: { bikeId },
        status: { in: ['CONFIRMED', 'ACTIVE', 'PENDING'] },
        OR: [
          { startDate: { lte: endDate }, endDate: { gte: startDate } }
        ]
      },
      select: { bikeUnitId: true }
    });

    const bookedUnitIds = new Set(overlappingBookings.map(b => b.bikeUnitId));
    
    const availableUnits = bike.units.filter(
      unit => unit.status === 'AVAILABLE' && !bookedUnitIds.has(unit.id)
    );

    return {
      available: availableUnits.length > 0,
      availableUnits: availableUnits.length,
      totalUnits: bike.units.length,
      availableUnitIds: availableUnits.map(u => u.id)
    };
  },

  async createBooking(data: BookingFormData) {
    const availability = await this.checkAvailability(data.bikeId, data.startDate, data.endDate);
    
    if (!availability.available || availability.availableUnitIds.length === 0) {
      throw new Error('No units available for the selected dates');
    }

    const assignedUnitId = availability.availableUnitIds[0];
    
    const bike = await prisma.bike.findUnique({ where: { id: data.bikeId }});
    if (!bike) throw new Error('Bike not found');

    const days = calculateDays(data.startDate, data.endDate);
    const totalAmount = calculateRentalAmount(bike.pricePerDay, days);

    return prisma.$transaction(async (tx) => {
      let customer = await tx.customer.findUnique({
        where: { email: data.customerEmail }
      });

      if (!customer) {
        customer = await tx.customer.create({
          data: {
            name: data.customerName,
            email: data.customerEmail,
            phone: data.customerPhone,
          }
        });
      } else {
        customer = await tx.customer.update({
          where: { id: customer.id },
          data: {
            name: data.customerName,
            phone: data.customerPhone,
          }
        });
      }

      const booking = await tx.booking.create({
        data: {
          bikeUnitId: assignedUnitId,
          customerId: customer.id,
          startDate: data.startDate,
          endDate: data.endDate,
          totalDays: days,
          totalAmount: totalAmount,
          status: 'PENDING',
          notes: data.notes,
        },
        include: {
          bikeUnit: { include: { bike: true } },
          customer: true
        }
      });

      return booking;
    });
  },

  async getBookingById(id: string): Promise<BookingWithDetails | null> {
    return prisma.booking.findUnique({
      where: { id },
      include: {
        bikeUnit: { include: { bike: true } },
        customer: true
      }
    });
  },

  async getAllBookings(status?: string): Promise<BookingWithDetails[]> {
    const where = status ? { status: status as BookingStatus } : {};
    return prisma.booking.findMany({
      where,
      include: {
        bikeUnit: { include: { bike: true } },
        customer: true
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async updateBookingStatus(id: string, status: BookingStatus) {
    return prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        bikeUnit: { include: { bike: true } },
        customer: true
      }
    });
  },

  async getBookingsByDateRange(start: Date, end: Date): Promise<BookingWithDetails[]> {
    return prisma.booking.findMany({
      where: {
        startDate: { gte: start },
        endDate: { lte: end }
      },
      include: {
        bikeUnit: { include: { bike: true } },
        customer: true
      },
      orderBy: { startDate: 'asc' }
    });
  }
};
