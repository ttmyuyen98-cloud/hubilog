# High-Performance Realtime Cloud Synchronization with Optimistic UI

Architectural blueprint for transitioning HUBI LOGISTICS to a non-blocking, sub-100ms optimistic UI delivery booking system with real-time bidirectional Firestore streaming via `onSnapshot` across resident devices and administrative dispatch dashboards.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Optimistic Execution Model**: All form submissions (new orders) and dispatch state transitions (confirm, in transit, delivered, cancel) will update local state and display the confirmation UI immediately without awaiting network round-trips. Firestore mutations (`addDoc`, `updateDoc`, `deleteDoc`) will execute asynchronously in the background with graceful rollback/error toasts if network drops.

- **Confirmed Decision (Phase 1 Default)**: Optimistic sub-0.1s confirmation card with real-time tracking badge inside the booking modal.
- **Confirmed Decision (Phase 1 Default)**: Full cross-device sync active on both Resident Booking views and the Admin Live Dispatch Dashboard.

---

## 1. Overview & Core Concept

- **What It Does**: Residents book estate-internal fixed-slot parcel deliveries with zero perceptible latency (< 0.1s). Dispatchers and residents on separate devices (mobile, laptop, tablet) receive instant updates the moment an order is created, claimed, or delivered.
- **Target Audience**: Urban residential estate inhabitants (VinHomes, Masteri, Sala) sending internal parcels, and hub coordinators managing batches at apartment lobbies.
- **Key Value**: Eliminates traditional 1–3s spinners during cloud transactions while guaranteeing eventual consistency across all open browser instances through server-authoritative Firestore `onSnapshot` streams.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Resident Fast Booking Flow**:
   - Resident opens "Đặt Lịch Ngay" modal from any slide.
   - Selects pickup apartment, delivery apartment, parcel type, and fixed delivery time slot.
   - Clicks "Xác Nhận Đặt Lịch": Modal immediately displays the generated tracking card (`HUBI-XXXXX`) and timeline with optimistic state `pending`.
   - Firestore writes execute in the background. If successful, `onSnapshot` synchronizes the server timestamp and authoritative doc ID seamlessly.
2. **Real-time Dispatcher Flow**:
   - Coordinator opens the Admin Dashboard on a separate device/tab.
   - New orders appear instantaneously via `onSnapshot` with sound/flash pulse.
   - Coordinator clicks "Xác nhận gom" or "Bắt đầu giao": The order card transitions color and state instantly on the coordinator's screen.
   - Within milliseconds, the resident's open confirmation card switches to "Đang giao nội khu" without any user reload.

### Visual Identity & Theme

- **Aesthetic Direction**: High-tech Dark Space & Modern Finance with Liquid Glass (`#070B14`, `#0A192F`).
- **Color Tokens**:
  - Background Canvas: `#070B14` (Deep Space Dark)
  - Surface Glass: `rgba(17, 34, 64, 0.75)` with `backdrop-blur-2xl` and `border-white/10`
  - Cyber Cyan Accent: `#00E5FF`
  - Emerald Live Indicator: `#10B981`
  - Muted Text: `#8892B0`
- **Typography**: Display headers in system font stack / `Syne`, body in `Plus Jakarta Sans`, tracking codes in `ui-monospace`.
- **Anti-AI Slop Discipline**: Clean unboxed metadata with dot separators (`·`), no generic pill badge clusters, proportional image containers (`16:10`), and crisp high-contrast interactive buttons.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Optimistic UI vs. Await-Block Flow**
  - *Chosen Approach*: Mutate local React state immediately and generate a deterministic optimistic order object before calling Firestore.
  - *Why*: Eliminates loading spinners; feels native and instant (< 0.1s response).
  - *Fallback*: If the background Firestore promise rejects (e.g. offline with corrupted cache or strict permission failure), display a non-blocking toast notification and roll back the optimistic record.
- **Decision 2: Eventual Consistency via `onSnapshot`**
  - *Chosen Approach*: The single source of truth remains the Firestore `hubi_bookings` collection. `onSnapshot` continuously merges remote state, automatically replacing optimistic temporary IDs with cloud IDs.
  - *Why*: Prevents stale state across tabs and devices without polling.
- **Decision 3: Persistence Layer Architecture**
  - *Chosen Approach*: Clean `src/firebase.js` entry point exporting `db` with IndexedDB offline persistence gracefully enabled.

---

## 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                    Resident Device A                         │
│  ┌───────────────────────┐        ┌───────────────────────┐  │
│  │ Booking Form / Modal  │───────>│ Optimistic State      │  │
│  └───────────────────────┘        │ (Instant < 0.1s)      │  │
│              │                    └───────────────────────┘  │
│              │ async background               ▲              │
│              ▼                                │ onSnapshot   │
│  ┌───────────────────────┐                    │ stream       │
│  │ bookingService.ts     │                    │              │
│  └───────────────────────┘                    │              │
└──────────────┬────────────────────────────────┼──────────────┘
               │ addDoc / updateDoc             │
               ▼                                │
┌───────────────────────────────────────────────┴──────────────┐
│            Google Cloud Firestore (/hubi_bookings)           │
└───────────────────────────────────────────────┬──────────────┘
                                                │ onSnapshot
                                                ▼ stream
┌──────────────────────────────────────────────────────────────┐
│                  Dispatcher / Admin Device B                 │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ BookingsTab (Live Dispatch View)                       │  │
│  │ Auto-renders incoming orders & status switches live    │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Data Model (`hubi_bookings`)

```typescript
interface DeliveryBooking {
  id: string;
  bookingCode: string;       // e.g. "HUBI-78291"
  fullName: string;
  phone: string;
  pickupPoint: string;       // e.g. "Tòa S2.05 - Căn 1208"
  dropoffPoint: string;      // e.g. "Tòa S1.02 - Căn 0604"
  timeSlot: string;          // "slot_morning" | "slot_afternoon" | "slot_evening"
  timeSlotLabel: string;
  packageType: string;
  notes?: string;
  estimatedFee: number;      // 15,000 VND
  singleRate: number;        // 38,000 VND
  savedAmount: number;       // 23,000 VND
  status: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt: string;         // ISO timestamp
  updatedAt: string;         // ISO timestamp
  isOptimistic?: boolean;    // Flag for pending background network sync
}
```

### Component & File Strategy

1. **`src/firebase.js`**: Clean modular JavaScript entry point exporting initialized `db` and `auth` with graceful IndexedDB persistence.
2. **`src/services/bookingService.ts`**: Pure asynchronous functions executing Firestore `addDoc`, `updateDoc`, and setting up `onSnapshot` listeners with catch handlers.
3. **`src/hooks/useBookings.ts`**: High-performance hook managing optimistic state queue, real-time snapshot merging, and non-blocking mutation helpers.
4. **`src/components/BookingModal.tsx`**: Liquid Glass high-tech modal delivering sub-100ms instant confirmation card, live tracking stream, and background sync indicator.
5. **`src/components/admin/tabs/BookingsTab.tsx`**: Real-time dispatch center with instant optimistic status toggles.
