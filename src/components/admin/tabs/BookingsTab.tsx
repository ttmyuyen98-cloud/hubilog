import React, { useState } from 'react';
import { useBookings } from '../../../hooks/useBookings';
import { BookingStatus } from '../../../types/booking';
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Phone,
  User,
  MapPin,
  RefreshCw,
  Radio,
  Trash2,
  ArrowRight,
  TrendingDown,
  AlertCircle,
  X,
} from 'lucide-react';

export const BookingsTab: React.FC = () => {
  const {
    bookings,
    loading,
    notification,
    clearNotification,
    changeStatusOptimistic,
    removeBookingOptimistic,
  } = useBookings();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.pickupPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.dropoffPoint.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, status: BookingStatus) => {
    // Instant optimistic status flip (< 1ms)
    changeStatusOptimistic(id, status);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn đặt này khỏi hệ thống Firestore?')) {
      removeBookingOptimistic(id);
    }
  };

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    in_transit: bookings.filter((b) => b.status === 'in_transit').length,
    delivered: bookings.filter((b) => b.status === 'delivered').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Live Sync Stats */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0A192F] border border-[#233554] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg text-[#E6F1FF] font-medium tracking-normal flex items-center gap-2">
            <span>Điều Phối Đơn Đặt Lịch Giao Nội Khu</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              Optimistic UI & onSnapshot
            </span>
          </h2>
          <p className="text-xs text-[#8892B0] tracking-normal mt-0.5">
            Dữ liệu đồng bộ trực tiếp hai chiều với Cloud Firestore. Thao tác điều phối phản hồi ngay lập tức và tự động nhảy ở mọi màn hình đang mở.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#112240] border border-white/10 text-xs">
            <span className="text-[#8892B0]">Tổng đơn:</span>
            <span className="font-mono font-bold text-[#00E5FF]">{bookings.length}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#112240] border border-white/10 text-xs">
            <span className="text-[#8892B0]">Chờ gom:</span>
            <span className="font-mono font-bold text-amber-400">{counts.pending}</span>
          </div>
        </div>
      </div>

      {/* Non-blocking error notification */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-200 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{notification.message}</span>
          </div>
          <button onClick={clearNotification} className="text-red-300 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filter Strip */}
      <div className="p-4 rounded-xl bg-[#112240] border border-[#233554] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8892B0] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo mã vận đơn, tên cư dân, số điện thoại, căn hộ..."
            className="w-full bg-[#0A192F] border border-[#233554] rounded-lg pl-9 pr-3 py-2 text-xs text-[#E6F1FF] placeholder-[#8892B0]/60 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Tất cả', count: counts.all },
            { id: 'pending', label: 'Chờ gom', count: counts.pending },
            { id: 'confirmed', label: 'Đã xác nhận', count: counts.confirmed },
            { id: 'in_transit', label: 'Đang giao', count: counts.in_transit },
            { id: 'delivered', label: 'Đã giao', count: counts.delivered },
            { id: 'cancelled', label: 'Đã hủy', count: counts.cancelled },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-normal transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                filterStatus === tab.id
                  ? 'bg-[#00E5FF] text-[#0A192F] font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                  : 'bg-[#0A192F] text-[#8892B0] hover:text-[#E6F1FF] border border-[#233554]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filterStatus === tab.id ? 'bg-[#0A192F]/20 text-[#0A192F]' : 'bg-white/10 text-[#8892B0]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List Card View */}
      {loading ? (
        <div className="p-12 text-center text-[#8892B0] space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#00E5FF]" />
          <p className="text-xs">Đang đồng bộ dữ liệu đơn từ Cloud Firestore...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-[#8892B0] space-y-3 bg-[#112240] rounded-2xl border border-[#233554]">
          <Package className="w-10 h-10 mx-auto text-[#233554]" />
          <p className="text-sm text-[#E6F1FF] font-medium">Không tìm thấy đơn đặt giao hàng nào</p>
          <p className="text-xs text-[#8892B0]">Hãy tạo đơn thử từ cửa sổ "Đặt Lịch Ngay" trên trang chủ.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((b) => (
            <div
              key={b.id}
              className={`p-5 rounded-2xl bg-[#112240] border ${
                b.isOptimistic ? 'border-amber-400/40 bg-[#112240]/90' : 'border-[#233554]'
              } hover:border-[#00E5FF]/40 transition-all shadow-deep-ocean flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4`}
            >
              {/* Left: Code, Resident, Route */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-sm font-bold text-[#00E5FF] px-2.5 py-0.5 rounded-md bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                    {b.bookingCode}
                  </span>
                  <span className="text-xs font-semibold text-[#E6F1FF] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#8892B0]" />
                    {b.fullName}
                  </span>
                  <span className="text-xs text-[#8892B0] flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3 text-[#00E5FF]" />
                    {b.phone}
                  </span>
                  <span className="text-[11px] text-[#00E5FF] font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {b.timeSlotLabel}
                  </span>
                  {b.isOptimistic && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono flex items-center gap-1">
                      <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                      optimistic
                    </span>
                  )}
                </div>

                {/* Route & Package */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#8892B0]">
                  <div className="flex items-center gap-1.5 bg-[#0A192F] px-2.5 py-1 rounded-lg border border-[#233554]">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span className="text-[#E6F1FF] font-medium">{b.pickupPoint}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <div className="flex items-center gap-1.5 bg-[#0A192F] px-2.5 py-1 rounded-lg border border-[#233554]">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span className="text-[#E6F1FF] font-medium">{b.dropoffPoint}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-[#8892B0]">
                    {b.packageTypeLabel || b.packageType}
                  </span>
                </div>

                {b.notes && (
                  <p className="text-[11px] text-[#8892B0] italic bg-[#0A192F]/60 px-2.5 py-1 rounded border border-[#233554]/40 w-fit">
                    Ghi chú: {b.notes}
                  </p>
                )}
              </div>

              {/* Middle: Fee & Savings */}
              <div className="text-left lg:text-right shrink-0">
                <div className="text-sm font-bold text-[#00E5FF] font-mono">
                  {b.estimatedFee.toLocaleString('vi-VN')} đ
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center lg:justify-end gap-1">
                  <TrendingDown className="w-3 h-3" />
                  <span>Tiết kiệm {(b.savedAmount || 0).toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="text-[10px] text-[#8892B0] font-mono mt-0.5">
                  Tạo lúc: {new Date(b.createdAt).toLocaleTimeString('vi-VN')}
                </div>
              </div>

              {/* Right: Instant Optimistic Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 w-full lg:w-auto justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-[#233554]">
                {b.status === 'pending' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(b.id, 'confirmed')}
                    className="px-3 py-1.5 rounded-lg bg-[#00E5FF]/15 hover:bg-[#00E5FF]/25 border border-[#00E5FF]/40 text-xs font-semibold text-[#00E5FF] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Xác nhận gom</span>
                  </button>
                )}

                {b.status === 'confirmed' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(b.id, 'in_transit')}
                    className="px-3 py-1.5 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-xs font-semibold text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Bắt đầu giao</span>
                  </button>
                )}

                {b.status === 'in_transit' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(b.id, 'delivered')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-400/15 hover:bg-emerald-400/25 border border-emerald-400/40 text-xs font-semibold text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Giao thành công</span>
                  </button>
                )}

                {b.status !== 'cancelled' && b.status !== 'delivered' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(b.id, 'cancelled')}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-red-950/40 border border-white/10 hover:border-red-500/40 text-xs text-[#8892B0] hover:text-red-300 cursor-pointer transition-colors"
                    title="Hủy đơn giao"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(b.id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-900/40 text-[#8892B0] hover:text-red-400 transition-colors cursor-pointer"
                  title="Xóa vĩnh viễn đơn"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
