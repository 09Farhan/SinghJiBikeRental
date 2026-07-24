import { BikeCategory, FuelType, TransmissionType, UnitStatus, BookingStatus, InquiryStatus } from '@prisma/client';
import type { Bike, BikeUnit, Booking, Customer, AdminUser, ContactInquiry } from '@prisma/client';

export { BikeCategory, FuelType, TransmissionType, UnitStatus, BookingStatus, InquiryStatus };
export type { Bike, BikeUnit, Booking, Customer, AdminUser, ContactInquiry };

export type BikeWithUnits = Bike & { 
  units: BikeUnit[];
  _count?: { units: number };
  availableUnits?: number;
};

export type BookingWithDetails = Booking & {
  bikeUnit: BikeUnit & { bike: Bike };
  customer: Customer;
};

export interface DashboardStats {
  totalBikes: number;
  totalUnits: number;
  activeBookings: number;
  totalRevenue: number;
  totalCustomers: number;
  pendingBookings: number;
}

export interface BikeFiltersType {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}

export interface BookingFormData {
  bikeId: string;
  startDate: Date;
  endDate: Date;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
