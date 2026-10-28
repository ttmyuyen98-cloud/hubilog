import React, { useState } from 'react';
import { useBookings } from '../hooks/useBookings';
import { BookingSubmissionInput, DeliveryBooking } from '../types/booking';
import {
  X,
  Package,
  Clock,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  TrendingDown,
  RefreshCw,
  Radio,
  FileText,
  AlertCircle,
  Truck,
  ArrowRight,
  CloudCheck,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const {
    bookings,
    isLiveConnected,
    notification,
    clearNotification,
    submitBookingOptimistic,
  } = useBookings();

  const [activeTab, setActiveTab] = useState<'create' | 'live_feed'>('create');
  const [confirmedBooking, setConfirmedBooking] = useState<DeliveryBooking | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<BookingSubmissionInput>({
    fullName: '',
    phone: '',
    pickupPoint: '',
    dropoffPoint: '',
    timeSlot: 'slot_morning',
    packageType: 'standard',
    notes: '',
  });

  if (!isOpen) return null;

  // Realtime fee calculation
  const getPackageFee = (type: string) => {
    if (type === 'bulky' || type === 'fragile') return { hubi: 20000, single: 48000 };
    if (type === 'food') return { hubi: 17000, single: 42000 };
    return { hubi: 15000, single: 38000 };
  };

  const fees = getPackageFee(formData.packageType || 'standard');
  const savingsAmount = fees.single - fees.hubi;
  const savingsPct = Math.round((savingsAmount / fees.single) * 100);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Vui lòng nhập họ và tên cư dân';
    if (!formData.phone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9+() -]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Số điện thoại không hợp lệ (8-15 ký tự số)';
    }
    if (!formData.pickupPoint.trim()) errs.pickupPoint = 'Vui lòng nhập căn hộ / tòa nhà lấy hàng';
    if (!formData.dropoffPoint.trim()) errs.dropoffPoint = 'Vui lòng nhập căn hộ / tòa nhà giao đến';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /**
   * OPTIMISTIC UI: Non-blocking submission.
   * Flips screen instantly (< 0.05s) without awaiting network round-trips.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Synchronous optimistic dispatch (< 1ms)
    const optimisticCreated = submitBookingOptimistic(formData);

    // Instant UI state flip (< 0.05s)
    setConfirmedBooking(optimisticCreated);
  };

  const handleResetForNewBooking = () => {
    setConfirmedBooking(null);
    setFormData({
      fullName: '',
      phone: '',
      pickupPoint: '',
      dropoffPoint: '',
      timeSlot: 'slot_morning',
      packageType: 'standard',
      notes: '',
    });
    setFormErrors({});
    setActiveTab('create');
  };

  const handleClose = () => {
    handleResetForNewBooking();
    onClose();
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Đã xác nhận gom
          </span>
        );
      case 'in_transit':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30">
            <Truck className="w-3.5 h-3.5 animate-pulse" /> Đang giao nội khu
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-400/10 text-emerald-300 border border-emerald-400/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Giao thành công
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-400/10 text-red-300 border border-red-400/30">
            Đã hủy
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Chờ điều phối
          </span>
        );
    }
  };

  // Live order listener resolution
  const liveConfirmed = confirmedBooking
    ? bookings.find((b) => b.bookingCode === confirmedBooking.bookingCode) || confirmedBooking
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#070B14]/85 backdrop-blur-2xl animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-2xl rounded-[24px] bg-[#070B14]/95 border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,229,255,0.25)] text-[#E6F1FF] my-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Ambient background glow highlights */}
        <div
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#00E5FF]/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Header & Real-time Connectivity Badge */}
        <div className="p-5 sm:p-6 pb-4 border-b border-white/10 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#112240] border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)] shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="booking-modal-title"
                className="font-display font-semibold text-lg sm:text-xl text-[#E6F1FF] tracking-normal leading-tight"
              >
                Đặt Lịch Giao Hàng Nội Khu
              </h2>
              <p className="text-xs text-[#8892B0] tracking-normal mt-0.5">
                HUBI LOGISTICS · Gom đơn giao cố định theo giờ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Real-time Cloud Status */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112240]/80 border border-white/10 text-[11px] text-[#8892B0]">
              {isLiveConnected ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse" />
                  <span className="text-emerald-400 font-medium">Live Connected</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-amber-300">Offline / Đệm</span>
                </>
              )}
            </div>

            {/* Close Modal Button */}
            <button
              onClick={handleClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#8892B0] hover:text-[#E6F1FF] transition-colors cursor-pointer"
              aria-label="Đóng biểu mẫu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher: Create Booking vs Live Realtime Feed */}
        {!confirmedBooking && (
          <div className="flex items-center border-b border-white/10 bg-[#0A192F]/60 px-6">
            <button
              type="button"
              onClick={() => setActiveTab('create')}
              className={`py-3 px-4 text-xs font-semibold tracking-normal border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'create'
                  ? 'border-[#00E5FF] text-[#00E5FF]'
                  : 'border-transparent text-[#8892B0] hover:text-[#E6F1FF]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Đăng ký đơn mới</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('live_feed')}
              className={`py-3 px-4 text-xs font-semibold tracking-normal border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'live_feed'
                  ? 'border-[#00E5FF] text-[#00E5FF]'
                  : 'border-transparent text-[#8892B0] hover:text-[#E6F1FF]'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Đơn gom trên Server ({bookings.length})</span>
            </button>
          </div>
        )}

        {/* Non-blocking background notification */}
        {notification && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-xs text-red-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{notification.message}</span>
            </div>
            <button onClick={clearNotification} className="text-red-300 hover:text-white p-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 relative z-10 space-y-6">
          {/* SCREEN A: INSTANT OPTIMISTIC BOOKING CONFIRMATION */}
          {liveConfirmed ? (
            <div className="space-y-6 animate-in fade-in zoom-in-98 duration-100">
              <div className="text-center space-y-2 py-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-2xl text-[#E6F1FF]">
                  Đã Ghi Nhận Đặt Lịch Giao!
                </h3>
                <p className="text-xs text-[#8892B0] max-w-md mx-auto">
                  Đơn đã được khởi tạo tức thì và đang đồng bộ ngầm tới mạng lưới điều phối viên trên Cloud Firestore.
                </p>
              </div>

              {/* Order Tracking Live Ticket Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#112240]/80 border border-[#00E5FF]/30 shadow-[0_10px_30px_-5px_rgba(0,229,255,0.15)] space-y-4 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                  <div>
                    <span className="text-[10px] text-[#8892B0] block uppercase tracking-wider">
                      Mã vận đơn nội khu
                    </span>
                    <span className="font-mono text-xl font-bold text-[#00E5FF] tracking-normal">
                      {liveConfirmed.bookingCode}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8892B0] block uppercase tracking-wider mb-1">
                      Trạng thái thời gian thực
                    </span>
                    {statusBadge(liveConfirmed.status)}
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[#8892B0] block">Người gửi:</span>
                    <span className="font-semibold text-[#E6F1FF] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#00E5FF]" />
                      {liveConfirmed.fullName} ({liveConfirmed.phone})
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#8892B0] block">Khung giờ gom giao:</span>
                    <span className="font-semibold text-[#E6F1FF] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                      {liveConfirmed.timeSlotLabel}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#8892B0] block">Điểm lấy hàng:</span>
                    <span className="font-medium text-[#E6F1FF] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {liveConfirmed.pickupPoint}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#8892B0] block">Điểm giao hàng:</span>
                    <span className="font-medium text-[#E6F1FF] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {liveConfirmed.dropoffPoint}
                    </span>
                  </div>
                </div>

                {/* Economic Summary */}
                <div className="p-3.5 rounded-xl bg-[#0A192F]/90 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#8892B0] block">Cước phí gom đơn:</span>
                    <span className="text-base font-bold text-[#00E5FF]">
                      {liveConfirmed.estimatedFee.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center justify-end gap-1">
                      <TrendingDown className="w-3 h-3" /> Tiết kiệm 60%
                    </span>
                    <span className="text-[11px] text-[#8892B0] line-through">
                      {liveConfirmed.singleRate.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                </div>

                {liveConfirmed.notes && (
                  <p className="text-[11px] text-[#8892B0] italic bg-black/20 p-2.5 rounded-lg border border-white/5">
                    Ghi chú: {liveConfirmed.notes}
                  </p>
                )}

                {/* Background Network Sync Indicator */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-[#8892B0] border-t border-white/5">
                  <span className="flex items-center gap-1.5">
                    {liveConfirmed.isOptimistic ? (
                      <>
                        <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" />
                        <span className="text-amber-300">Đang lưu ngầm lên Cloud Firestore...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Đã lưu an toàn trên Cloud Server</span>
                      </>
                    )}
                  </span>
                  <span className="font-mono text-[10px]">Cross-device onSnapshot active</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetForNewBooking}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#E6F1FF] cursor-pointer"
                >
                  Đặt thêm đơn giao khác
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00E5FF] hover:bg-[#33ebff] text-xs font-bold text-[#0A192F] shadow-[0_0_15px_rgba(0,229,255,0.4)] cursor-pointer"
                >
                  Xong & Đóng
                </button>
              </div>
            </div>
          ) : activeTab === 'create' ? (
            /* SCREEN B: BOOKING FORM (< 0.1s INSTANT SUBMIT) */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Resident Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8892B0] mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Họ và tên người gửi *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className={`w-full bg-[#112240]/80 border ${
                      formErrors.fullName ? 'border-red-400' : 'border-white/10'
                    } rounded-xl px-3.5 py-2.5 text-xs text-[#E6F1FF] placeholder-[#8892B0]/50 focus:outline-none focus:border-[#00E5FF]`}
                  />
                  {formErrors.fullName && (
                    <span className="text-[11px] text-red-400 mt-1 block">{formErrors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8892B0] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Số điện thoại liên hệ *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="09xx xxx xxx"
                    className={`w-full bg-[#112240]/80 border ${
                      formErrors.phone ? 'border-red-400' : 'border-white/10'
                    } rounded-xl px-3.5 py-2.5 text-xs text-[#E6F1FF] placeholder-[#8892B0]/50 focus:outline-none focus:border-[#00E5FF]`}
                  />
                  {formErrors.phone && (
                    <span className="text-[11px] text-red-400 mt-1 block">{formErrors.phone}</span>
                  )}
                </div>
              </div>

              {/* Pickup & Dropoff Routing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8892B0] mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Điểm lấy hàng (Tòa / Phòng) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pickupPoint}
                    onChange={(e) => setFormData((p) => ({ ...p, pickupPoint: e.target.value }))}
                    placeholder="Ví dụ: Tòa S2.05 - Căn 1208"
                    className={`w-full bg-[#112240]/80 border ${
                      formErrors.pickupPoint ? 'border-red-400' : 'border-white/10'
                    } rounded-xl px-3.5 py-2.5 text-xs text-[#E6F1FF] placeholder-[#8892B0]/50 focus:outline-none focus:border-[#00E5FF]`}
                  />
                  {formErrors.pickupPoint && (
                    <span className="text-[11px] text-red-400 mt-1 block">
                      {formErrors.pickupPoint}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8892B0] mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Điểm giao hàng (Tòa / Phòng) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.dropoffPoint}
                    onChange={(e) => setFormData((p) => ({ ...p, dropoffPoint: e.target.value }))}
                    placeholder="Ví dụ: Tòa S1.02 - Căn 0604"
                    className={`w-full bg-[#112240]/80 border ${
                      formErrors.dropoffPoint ? 'border-red-400' : 'border-white/10'
                    } rounded-xl px-3.5 py-2.5 text-xs text-[#E6F1FF] placeholder-[#8892B0]/50 focus:outline-none focus:border-[#00E5FF]`}
                  />
                  {formErrors.dropoffPoint && (
                    <span className="text-[11px] text-red-400 mt-1 block">
                      {formErrors.dropoffPoint}
                    </span>
                  )}
                </div>
              </div>

              {/* Time Slots & Package Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8892B0] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Khung giờ gom giao cố định *</span>
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData((p) => ({ ...p, timeSlot: e.target.value }))}
                    className="w-full bg-[#112240]/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="slot_morning">09:00 - 11:00 (Buổi sáng)</option>
                    <option value="slot_afternoon">14:00 - 16:00 (Buổi chiều)</option>
                    <option value="slot_evening">18:30 - 20:30 (Buổi tối)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8892B0] mb-1.5 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Loại hàng hóa vận chuyển</span>
                  </label>
                  <select
                    value={formData.packageType}
                    onChange={(e) => setFormData((p) => ({ ...p, packageType: e.target.value }))}
                    className="w-full bg-[#112240]/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="standard">Đồ tiêu chuẩn / Quần áo</option>
                    <option value="documents">Giấy tờ / Hồ sơ / Thư từ</option>
                    <option value="food">Thực phẩm / Đồ ăn đóng hộp</option>
                    <option value="fragile">Hàng dễ vỡ / Mỹ phẩm</option>
                    <option value="bulky">Đồ cồng kềnh / Thùng hộp</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#8892B0] mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#8892B0]" />
                  <span>Ghi chú cho Shipper (Tùy chọn)</span>
                </label>
                <input
                  type="text"
                  value={formData.notes || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Ví dụ: Gọi trước khi lên 5 phút, để ở kệ hàng..."
                  className="w-full bg-[#112240]/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#E6F1FF] placeholder-[#8892B0]/50 focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              {/* Real-time Economic Benefit Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#112240] to-[#0A192F] border border-[#00E5FF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_20px_rgba(0,229,255,0.08)]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] text-[10px] font-bold border border-[#00E5FF]/30">
                      GOM ĐƠN THEO GIỜ
                    </span>
                    <span className="text-xs text-[#E6F1FF] font-semibold">
                      Tiết kiệm {savingsPct}% chi phí
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8892B0]">
                    Giá gọi shipper lẻ: <span className="line-through">{fees.single.toLocaleString('vi-VN')} đ</span>
                  </p>
                </div>

                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                  <span className="text-[10px] text-[#8892B0] uppercase block">Cước phí thanh toán:</span>
                  <span className="text-xl font-display font-bold text-[#00E5FF] tracking-normal">
                    {fees.hubi.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>

              {/* Submit Button - Instant Optimistic (< 0.1s) */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#8892B0] hover:text-[#E6F1FF] cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#00E5FF] hover:bg-[#33ebff] text-xs font-bold text-[#0A192F] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.45)] hover:shadow-[0_0_30px_rgba(0,229,255,0.7)] transition-all cursor-pointer"
                >
                  <span>Xác Nhận Đặt Lịch Ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* SCREEN C: REALTIME CLOUD ORDERS FEED */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
                  <span className="text-xs font-semibold text-[#E6F1FF]">
                    Danh sách đơn đang gom trên Cloud Server ({bookings.length})
                  </span>
                </div>
                <span className="text-[11px] text-[#8892B0] font-mono">
                  Tự động đồng bộ onSnapshot
                </span>
              </div>

              {bookings.length === 0 ? (
                <div className="py-12 text-center text-[#8892B0] space-y-2">
                  <Package className="w-10 h-10 mx-auto text-[#233554]" />
                  <p className="text-xs">Chưa có đơn hàng nào trong khung giờ hiện tại.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.slice(0, 10).map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-xl bg-[#112240]/60 border border-white/10 hover:border-[#00E5FF]/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#00E5FF]">
                            {b.bookingCode}
                          </span>
                          <span className="text-[#8892B0]">·</span>
                          <span className="font-medium text-[#E6F1FF]">{b.fullName}</span>
                          <span className="text-[#8892B0]">({b.timeSlotLabel})</span>
                          {b.isOptimistic && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono">
                              syncing...
                            </span>
                          )}
                        </div>
                        <div className="text-[#8892B0] flex items-center gap-1.5 text-[11px]">
                          <span>{b.pickupPoint}</span>
                          <ArrowRight className="w-3 h-3 text-[#00E5FF]" />
                          <span>{b.dropoffPoint}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <span className="font-mono font-bold text-[#00E5FF]">
                          {b.estimatedFee.toLocaleString('vi-VN')} đ
                        </span>
                        {statusBadge(b.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
