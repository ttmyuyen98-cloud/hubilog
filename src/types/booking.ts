export type BookingStatus = 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';

export interface DeliveryBooking {
  id: string;
  bookingCode: string;
  fullName: string;
  phone: string;
  pickupPoint: string;
  dropoffPoint: string;
  timeSlot: string;
  timeSlotLabel: string;
  packageType: string;
  packageTypeLabel?: string;
  notes?: string;
  estimatedFee: number;
  singleRate: number;
  savedAmount: number;
  status: BookingStatus;
  statusNote?: string;
  createdAt: string;
  updatedAt: string;
  isOptimistic?: boolean;
  syncStatus?: 'synced' | 'syncing' | 'error';
}

export interface BookingSubmissionInput {
  fullName: string;
  phone: string;
  pickupPoint: string;
  dropoffPoint: string;
  timeSlot: string;
  timeSlotLabel?: string;
  packageType?: string;
  notes?: string;
}
