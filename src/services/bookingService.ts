/**
 * HUBI LOGISTICS - Real-time Delivery Bookings Data Service
 * Pure asynchronous Firestore operations with non-blocking optimistic helpers
 * and real-time onSnapshot synchronization.
 */

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { DeliveryBooking, BookingSubmissionInput, BookingStatus } from '../types/booking';

const BOOKINGS_COLLECTION = 'hubi_bookings';

/**
 * Calculates delivery economics for internal estate fixed-slot logistics.
 */
export function computeBookingFees(packageType: string = 'standard') {
  let baseHubi = 15000;
  let baseSingle = 38000;

  if (packageType === 'bulky' || packageType === 'fragile') {
    baseHubi = 20000;
    baseSingle = 48000;
  } else if (packageType === 'food') {
    baseHubi = 17000;
    baseSingle = 42000;
  }

  const savedAmount = baseSingle - baseHubi;
  return {
    estimatedFee: baseHubi,
    singleRate: baseSingle,
    savedAmount,
  };
}

const packageLabels: Record<string, string> = {
  standard: 'Đồ tiêu chuẩn / Quần áo',
  documents: 'Giấy tờ / Hồ sơ / Thư',
  food: 'Thực phẩm / Đồ ăn đóng hộp',
  fragile: 'Hàng dễ vỡ / Mỹ phẩm',
  bulky: 'Đồ cồng kềnh / Thùng hộp',
};

const slotLabels: Record<string, string> = {
  slot_morning: '09:00 - 11:00 (Buổi sáng)',
  slot_afternoon: '14:00 - 16:00 (Buổi chiều)',
  slot_evening: '18:30 - 20:30 (Buổi tối)',
};

/**
 * Subscribes to live cross-device delivery bookings via onSnapshot.
 */
export function subscribeToLiveBookings(
  onData: (bookings: DeliveryBooking[]) => void,
  onError?: (err: Error) => void
): () => void {
  if (!db) {
    console.warn('[Firestore] Database instance not ready. Realtime listener skipped.');
    return () => {};
  }

  const bookingsRef = collection(db, BOOKINGS_COLLECTION);
  const q = query(bookingsRef, orderBy('createdAt', 'desc'), limit(100));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const items: DeliveryBooking[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        items.push({
          id: docSnap.id,
          bookingCode: data.bookingCode || `HUBI-${docSnap.id.slice(0, 6).toUpperCase()}`,
          fullName: data.fullName || 'Cư dân',
          phone: data.phone || '',
          pickupPoint: data.pickupPoint || '',
          dropoffPoint: data.dropoffPoint || '',
          timeSlot: data.timeSlot || 'slot_morning',
          timeSlotLabel: data.timeSlotLabel || '09:00 - 11:00 (Sáng)',
          packageType: data.packageType || 'standard',
          packageTypeLabel: data.packageTypeLabel || 'Hàng tiêu chuẩn',
          notes: data.notes || '',
          estimatedFee: typeof data.estimatedFee === 'number' ? data.estimatedFee : 15000,
          singleRate: typeof data.singleRate === 'number' ? data.singleRate : 38000,
          savedAmount: typeof data.savedAmount === 'number' ? data.savedAmount : 23000,
          status: (data.status as BookingStatus) || 'pending',
          statusNote: data.statusNote || '',
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || new Date().toISOString(),
          isOptimistic: false,
          syncStatus: 'synced',
        });
      });
      onData(items);
    },
    (error) => {
      console.error('[Firestore onSnapshot error]:', error);
      if (onError) onError(error);
    }
  );

  return unsubscribe;
}

/**
 * Builds an immediate optimistic booking item and launches the background Firestore write.
 * This function returns in < 1ms, enabling non-blocking sub-0.1s UI responses.
 */
export function initiateOptimisticBooking(input: BookingSubmissionInput): {
  optimisticBooking: DeliveryBooking;
  commitPromise: Promise<string>;
} {
  const { estimatedFee, singleRate, savedAmount } = computeBookingFees(input.packageType);
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const bookingCode = `HUBI-${randomSuffix}`;
  const nowIso = new Date().toISOString();
  const tempId = `opt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const payload = {
    bookingCode,
    fullName: input.fullName.trim(),
    phone: input.phone.trim(),
    pickupPoint: input.pickupPoint.trim(),
    dropoffPoint: input.dropoffPoint.trim(),
    timeSlot: input.timeSlot,
    timeSlotLabel: input.timeSlotLabel || slotLabels[input.timeSlot] || input.timeSlot,
    packageType: input.packageType || 'standard',
    packageTypeLabel: packageLabels[input.packageType || 'standard'] || 'Đồ tiêu chuẩn',
    notes: (input.notes || '').trim(),
    estimatedFee,
    singleRate,
    savedAmount,
    status: 'pending' as BookingStatus,
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  const optimisticBooking: DeliveryBooking = {
    id: tempId,
    ...payload,
    isOptimistic: true,
    syncStatus: 'syncing',
  };

  // Launch background promise without blocking
  const commitPromise = (async () => {
    if (!db) {
      throw new Error('Firestore database instance not connected');
    }
    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), payload);
    return docRef.id;
  })();

  return { optimisticBooking, commitPromise };
}

/**
 * Updates status of an existing booking in Firestore asynchronously.
 */
export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus,
  statusNote?: string
): Promise<void> {
  if (!db) {
    throw new Error('Cơ sở dữ liệu Firestore chưa được khởi tạo.');
  }

  const docRef = doc(db, BOOKINGS_COLLECTION, bookingId);
  try {
    await updateDoc(docRef, {
      status: newStatus,
      statusNote: statusNote || '',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[updateBookingStatus background error]:', error);
    handleFirestoreError(error, OperationType.UPDATE, `${BOOKINGS_COLLECTION}/${bookingId}`);
  }
}

/**
 * Deletes a booking record from Firestore asynchronously.
 */
export async function deleteDeliveryBooking(bookingId: string): Promise<void> {
  if (!db) {
    throw new Error('Cơ sở dữ liệu Firestore chưa được khởi tạo.');
  }

  const docRef = doc(db, BOOKINGS_COLLECTION, bookingId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error('[deleteDeliveryBooking background error]:', error);
    handleFirestoreError(error, OperationType.DELETE, `${BOOKINGS_COLLECTION}/${bookingId}`);
  }
}
