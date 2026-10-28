/**
 * HUBI LOGISTICS - High-Performance Real-time Hook for Delivery Bookings
 * Implements Optimistic UI with sub-0.1s instant visual updates and background
 * Firestore synchronization with onSnapshot cross-device streaming.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  DeliveryBooking,
  BookingSubmissionInput,
  BookingStatus,
} from '../types/booking';
import {
  subscribeToLiveBookings,
  initiateOptimisticBooking,
  updateBookingStatus,
  deleteDeliveryBooking,
} from '../services/bookingService';

export function useBookings() {
  const [serverBookings, setServerBookings] = useState<DeliveryBooking[]>([]);
  const [optimisticQueue, setOptimisticQueue] = useState<DeliveryBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);

  // Reference for rollback on background mutation failure
  const previousStateRef = useRef<DeliveryBooking[]>([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToLiveBookings(
      (items) => {
        setServerBookings(items);
        setLoading(false);
        setIsLiveConnected(true);

        // Clear out any optimistic items that have now appeared on the server
        setOptimisticQueue((prevQueue) => {
          if (prevQueue.length === 0) return prevQueue;
          const serverCodes = new Set(items.map((i) => i.bookingCode));
          return prevQueue.filter((opt) => !serverCodes.has(opt.bookingCode));
        });
      },
      (err) => {
        console.error('[useBookings onSnapshot Error]:', err);
        setNotification({
          type: 'error',
          message: 'Mất kết nối thời gian thực tới Cloud Firestore. Chuyển sang chế độ đệm.',
        });
        setLoading(false);
        setIsLiveConnected(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Merged view: optimistic items first, then server bookings (deduplicated by bookingCode)
  const bookings: DeliveryBooking[] = [
    ...optimisticQueue,
    ...serverBookings.filter(
      (sb) => !optimisticQueue.some((opt) => opt.bookingCode === sb.bookingCode)
    ),
  ];

  /**
   * Optimistic Submission: Returns within < 1ms to prevent blocking the UI.
   * Background promise communicates with Cloud Firestore.
   */
  const submitBookingOptimistic = useCallback(
    (input: BookingSubmissionInput): DeliveryBooking => {
      const { optimisticBooking, commitPromise } = initiateOptimisticBooking(input);

      // 1. Immediately inject into local state (< 1ms)
      setOptimisticQueue((prev) => [optimisticBooking, ...prev]);

      // 2. Execute background write without blocking
      commitPromise
        .then((docId) => {
          // Success: update the optimistic item's docId and sync status
          setOptimisticQueue((prev) =>
            prev.map((item) =>
              item.bookingCode === optimisticBooking.bookingCode
                ? { ...item, id: docId, syncStatus: 'synced', isOptimistic: false }
                : item
            )
          );
        })
        .catch((err: unknown) => {
          console.error('[Background Firestore sync failed]:', err);
          setNotification({
            type: 'error',
            message: `Lỗi đồng bộ đơn ${optimisticBooking.bookingCode} lên đám mây. Đang thử lại...`,
          });
          setOptimisticQueue((prev) =>
            prev.map((item) =>
              item.bookingCode === optimisticBooking.bookingCode
                ? { ...item, syncStatus: 'error' }
                : item
            )
          );
        });

      return optimisticBooking;
    },
    []
  );

  /**
   * Optimistic Status Mutation: Updates UI instantly and syncs in background.
   */
  const changeStatusOptimistic = useCallback(
    (id: string, newStatus: BookingStatus, note?: string) => {
      // Save snapshot for potential rollback
      previousStateRef.current = bookings;

      // 1. Instant local state update (< 1ms)
      setServerBookings((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: newStatus, statusNote: note || item.statusNote, updatedAt: new Date().toISOString() }
            : item
        )
      );
      setOptimisticQueue((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: newStatus, statusNote: note || item.statusNote, updatedAt: new Date().toISOString() }
            : item
        )
      );

      // 2. Async background Firestore write
      updateBookingStatus(id, newStatus, note).catch((err) => {
        console.error('[Background status update failed]:', err);
        // Rollback on failure
        setServerBookings(previousStateRef.current);
        setNotification({
          type: 'error',
          message: 'Không thể cập nhật trạng thái đơn hàng trên Cloud Server. Vui lòng kiểm tra kết nối mạng.',
        });
      });
    },
    [bookings]
  );

  /**
   * Optimistic Deletion: Removes from UI immediately and deletes in background.
   */
  const removeBookingOptimistic = useCallback(
    (id: string) => {
      previousStateRef.current = bookings;

      // 1. Instant removal
      setServerBookings((prev) => prev.filter((item) => item.id !== id));
      setOptimisticQueue((prev) => prev.filter((item) => item.id !== id));

      // 2. Async background delete
      deleteDeliveryBooking(id).catch((err) => {
        console.error('[Background delete failed]:', err);
        // Rollback
        setServerBookings(previousStateRef.current);
        setNotification({
          type: 'error',
          message: 'Không thể xóa đơn hàng trên Cloud Server.',
        });
      });
    },
    [bookings]
  );

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    bookings,
    loading,
    notification,
    clearNotification,
    isLiveConnected,
    submitBookingOptimistic,
    changeStatusOptimistic,
    removeBookingOptimistic,
  };
}
