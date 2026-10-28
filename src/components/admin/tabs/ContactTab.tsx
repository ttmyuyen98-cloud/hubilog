import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { Mail, Phone, MapPin, Clock, Check, MessageSquare } from 'lucide-react';

export const ContactTab: React.FC = () => {
  const { contact, updateContact } = useContent();
  const [formData, setFormData] = useState({ ...contact });
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateContact(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0A192F] border border-[#233554]">
        <div>
          <h2 className="font-display text-lg text-[#E6F1FF] font-medium tracking-normal">
            Thông Tin Liên Hệ & Chân Trang (Footer)
          </h2>
          <p className="text-xs text-[#8892B0] tracking-normal">
            Cập nhật email liên lạc, hotline hỗ trợ, địa chỉ văn phòng điều phối và khung giờ làm việc.
          </p>
        </div>
        <button
          type="submit"
          className="px-5 py-1.5 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] text-xs font-bold text-[#0A192F] flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all cursor-pointer"
        >
          {saved ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Đã lưu!</span>
            </>
          ) : (
            <span>Lưu thông tin</span>
          )}
        </button>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>Thông tin liên hệ và chân trang đã được cập nhật thành công!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Points */}
        <div className="p-6 rounded-[20px] bg-[#112240] border border-[#233554] shadow-deep-ocean space-y-4">
          <h3 className="text-sm font-semibold text-[#E6F1FF] pb-3 border-b border-[#233554]">
            Kênh Liên Lạc Trực Tiếp
          </h3>

          <div>
            <label className="block text-xs font-medium text-[#8892B0] mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Địa chỉ Email chính thức (Footer & Liên hệ)</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8892B0] mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Đường dây nóng / Hotline</span>
            </label>
            <input
              type="text"
              required
              value={formData.hotline}
              onChange={(e) => setFormData((p) => ({ ...p, hotline: e.target.value }))}
              placeholder="1900 8892 (07:30 - 21:00)"
              className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8892B0] mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Khung giờ giao nhận & hỗ trợ</span>
            </label>
            <input
              type="text"
              required
              value={formData.operatingHours}
              onChange={(e) => setFormData((p) => ({ ...p, operatingHours: e.target.value }))}
              placeholder="Thứ 2 – Chủ Nhật: 07:30 – 21:00"
              className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>

        {/* Operational Location & Headline */}
        <div className="p-6 rounded-[20px] bg-[#112240] border border-[#233554] shadow-deep-ocean space-y-4">
          <h3 className="text-sm font-semibold text-[#E6F1FF] pb-3 border-b border-[#233554]">
            Địa Điểm & Thông Điệp Kết Nối
          </h3>

          <div>
            <label className="block text-xs font-medium text-[#8892B0] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Địa chỉ trung tâm điều phối</span>
            </label>
            <textarea
              rows={3}
              required
              value={formData.address}
              onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
              placeholder="Trung tâm điều phối HUBI Logistics, Khu đô thị mẫu, TP. Hồ Chí Minh"
              className="w-full bg-[#0A192F] border border-[#233554] rounded-lg p-2.5 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8892B0] mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Tiêu đề khối liên hệ (Slide 5)</span>
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => setFormData((p) => ({ ...p, headline: e.target.value }))}
              className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8892B0] mb-1.5">
              Phụ đề / Lời ngỏ
            </label>
            <input
              type="text"
              value={formData.subline}
              onChange={(e) => setFormData((p) => ({ ...p, subline: e.target.value }))}
              className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#8892B0] focus:text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
