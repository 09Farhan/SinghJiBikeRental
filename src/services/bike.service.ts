import { prisma } from '@/lib/prisma';
import type { BikeFiltersType, BikeWithUnits } from '@/types';
import { Prisma } from '@prisma/client';

export const BikeService = {
  async getAllBikes(filters?: BikeFiltersType): Promise<BikeWithUnits[]> {
    const whereClause: Prisma.BikeWhereInput = { isActive: true };

    if (filters) {
      if (filters.category) whereClause.category = filters.category as any;
      if (filters.brand) whereClause.brand = filters.brand;
      if (filters.minPrice || filters.maxPrice) {
        whereClause.pricePerDay = {};
        if (filters.minPrice) whereClause.pricePerDay.gte = Number(filters.minPrice);
        if (filters.maxPrice) whereClause.pricePerDay.lte = Number(filters.maxPrice);
      }
    }

    let orderByClause: Prisma.BikeOrderByWithRelationInput = { createdAt: 'desc' };
    if (filters?.sortBy === 'price_asc') orderByClause = { pricePerDay: 'asc' };
    if (filters?.sortBy === 'price_desc') orderByClause = { pricePerDay: 'desc' };

    const bikes = await prisma.bike.findMany({
      where: whereClause,
      include: {
        units: true,
        _count: {
          select: { units: { where: { status: 'AVAILABLE' } } }
        }
      },
      orderBy: orderByClause,
    });

    return bikes.map(bike => ({
      ...bike,
      availableUnits: bike._count?.units || 0
    }));
  },

  async getBikeBySlug(slug: string): Promise<BikeWithUnits | null> {
    const bike = await prisma.bike.findUnique({
      where: { slug, isActive: true },
      include: {
        units: true,
        _count: {
          select: { units: { where: { status: 'AVAILABLE' } } }
        }
      },
    });

    if (!bike) return null;

    return {
      ...bike,
      availableUnits: bike._count?.units || 0
    };
  },

  async getBikeById(id: string): Promise<BikeWithUnits | null> {
    const bike = await prisma.bike.findUnique({
      where: { id },
      include: {
        units: true,
        _count: {
          select: { units: { where: { status: 'AVAILABLE' } } }
        }
      },
    });

    if (!bike) return null;

    return {
      ...bike,
      availableUnits: bike._count?.units || 0
    };
  },

  async createBike(data: any) {
    const { registrationNumber, ...bikeData } = data;
    const bike = await prisma.bike.create({ data: bikeData });
    if (registrationNumber) {
      await prisma.bikeUnit.create({
        data: {
          bikeId: bike.id,
          registrationNumber,
          color: 'Standard',
        }
      });
    }
    return bike;
  },

  async updateBike(id: string, data: any) {
    const { registrationNumber, ...bikeData } = data;
    const bike = await prisma.bike.update({
      where: { id },
      data: bikeData,
    });

    if (registrationNumber) {
      const firstUnit = await prisma.bikeUnit.findFirst({
        where: { bikeId: id },
        orderBy: { createdAt: 'asc' }
      });
      
      if (firstUnit) {
        await prisma.bikeUnit.update({
          where: { id: firstUnit.id },
          data: { registrationNumber }
        });
      } else {
        await prisma.bikeUnit.create({
          data: {
            bikeId: id,
            registrationNumber,
            color: 'Standard'
          }
        });
      }
    }
    return bike;
  },

  async deleteBike(id: string) {
    return prisma.bike.update({
      where: { id },
      data: { isActive: false },
    });
  },

  async addBikeUnit(bikeId: string, data: any) {
    return prisma.bikeUnit.create({
      data: {
        ...data,
        bikeId,
      },
    });
  },

  async updateBikeUnit(unitId: string, data: any) {
    return prisma.bikeUnit.update({
      where: { id: unitId },
      data,
    });
  },

  async removeBikeUnit(unitId: string) {
    return prisma.bikeUnit.delete({
      where: { id: unitId },
    });
  }
};
