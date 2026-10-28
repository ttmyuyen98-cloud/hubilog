import React, { useState } from 'react';
import contentData from '../../data/contentData.json';
import { useContent } from '../../context/ContentContext';
import { validateContactForm } from '../../utils/booking';

export const Slide5Contact: React.FC = () => {
  const { slides } = contentData;
  const data = slides.s5_contact;
  const { contactInfo, form } = data;
  const { contact, theme } = useContent();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData.name, formData.email, formData.message);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <section
      id="slide-5"
      className="min-h-screen py-24 flex flex-col justify-center relative"
      aria-label="Slide 5: Liên hệ"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3 text-xs text-[#8892B0]">
            <span className="font-mono text-[#00E5FF] font-semibold">{data.slideNumber}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E6F1FF]/80">{data.primaryTitle}</span>
          </div>
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-[#E6F1FF] tracking-normal leading-[1.4] mb-2">
            {data.secondaryTitle}
          </h2>
          <p className="text-sm text-[#8892B0] leading-[1.4] tracking-normal">
            {data.bodyContent}
          </p>
        </div>

        {/* Split Dashboard Zig-Zag: Left (40% Visual Panel) / Right (60% Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (40% / 5 cols): Background Panel + Contact Info */}
          <div className="lg:col-span-5 relative rounded-[20px] overflow-hidden border border-[#00E5FF]/40 p-8 flex flex-col justify-between shadow-deep-ocean min-h-[420px] bg-[#112240]">
            {/* Background Image with Deep Ocean Scrim */}
            <img
              src={contactInfo.backgroundPanel}
              alt="HUBI Dispatch Center"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/92 via-[#112240]/88 to-[#0A192F]/95 backdrop-blur-[2px]" />

            {/* Content atop panel */}
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#112240] border border-[#00E5FF]/50 p-2.5 mb-6 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                <img
                  src={contactInfo.emailIcon}
                  alt="Email Icon"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <span className="text-xs font-bold text-[#00E5FF] tracking-wider uppercase block mb-2">
                Kênh Trực Tuyến
              </span>
              <h3 className="font-display font-normal text-2xl sm:text-3xl text-[#E6F1FF] mb-3 tracking-normal leading-[1.4]">
                {contact.headline}
              </h3>
              <p className="text-xs sm:text-sm text-[#8892B0] leading-[1.4] tracking-normal mb-6">
                {contact.subline}
              </p>

              {/* Direct Email Address Box */}
              <div className="p-4 rounded-xl bg-[#0A192F]/80 border border-[#233554] backdrop-blur-md">
                <span className="text-[11px] text-[#8892B0] block mb-1">Email dự án chính thức:</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-mono text-sm sm:text-base text-[#00E5FF] font-bold hover:underline break-all"
                >
                  {contact.email}
                </a>
              </div>
            </div>

            {/* Bottom Panel Details */}
            <div className="relative z-10 pt-6 border-t border-[#233554] mt-6 space-y-2 text-xs text-[#8892B0]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
                <span className="text-[#E6F1FF]/90">Giờ làm việc: {contact.operatingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
                <span className="text-[#E6F1FF]/90">Hotline: {contact.hotline}</span>
              </div>
              <p className="text-[11px] text-[#8892B0]">
                {contact.address}
              </p>
            </div>
          </div>

          {/* Right Column (60% / 7 cols): Interactive Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-[20px] bg-[#112240] border border-[#233554] shadow-deep-ocean flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#00E5FF] tracking-wider uppercase block mb-1">
                Biểu mẫu kết nối
              </span>
              <h3 className="font-display font-normal text-2xl sm:text-3xl text-[#E6F1FF] mb-2 tracking-normal leading-[1.4]">
                {form.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#8892B0] leading-[1.4] tracking-normal mb-6">
                {form.description}
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Họ tên */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#E6F1FF] uppercase tracking-wide mb-1">
                      Họ và tên <span className="text-[#00E5FF]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className={`w-full px-4 py-2.5 rounded-[10px] bg-[#0A192F] border text-sm text-[#E6F1FF] placeholder-[#8892B0]/50 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-[#233554] focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-[#E6F1FF] uppercase tracking-wide mb-1">
                      Địa chỉ Email <span className="text-[#00E5FF]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nguyenvana@gmail.com"
                      className={`w-full px-4 py-2.5 rounded-[10px] bg-[#0A192F] border text-sm text-[#E6F1FF] placeholder-[#8892B0]/50 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#233554] focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[#E6F1FF] uppercase tracking-wide mb-1">
                      Nội dung liên hệ <span className="text-[#00E5FF]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Nhập thắc mắc, đề xuất hợp tác hoặc phản hồi về dịch vụ gom đơn..."
                      className={`w-full px-4 py-2.5 rounded-[10px] bg-[#0A192F] border text-sm text-[#E6F1FF] placeholder-[#8892B0]/50 focus:outline-none transition-colors ${
                        errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-[#233554] focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    style={{ backgroundColor: theme.ctaColor }}
                    className="w-full py-3.5 rounded-[10px] text-[#0A192F] font-bold text-sm tracking-normal transition-all shadow-[0_0_20px_rgba(0,229,255,0.5),0_4px_15px_rgba(0,229,255,0.35)] hover:shadow-[0_0_30px_rgba(0,229,255,0.8),0_6px_20px_rgba(0,229,255,0.5)] cursor-pointer"
                  >
                    {form.submitText}
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center bg-[#0A192F]/80 rounded-xl border border-[#00E5FF]/40 p-6 shadow-deep-ocean">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-display font-normal text-xl text-[#E6F1FF] mb-2">
                    Gửi Liên Hệ Thành Công!
                  </h4>
                  <p className="text-xs text-[#8892B0] max-w-sm mx-auto mb-4">
                    Cảm ơn bạn đã liên hệ. Ban dự án HUBI LOGISTICS sẽ phản hồi qua email <span className="text-[#00E5FF] font-medium">{formData.email}</span> trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="px-4 py-2 rounded-lg bg-[#112240] text-xs font-semibold text-[#E6F1FF] hover:bg-[#1b325c] border border-[#233554] cursor-pointer"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              )}
            </div>

            {/* Privacy Badge Footer */}
            <div className="pt-6 border-t border-[#233554] mt-6 flex items-center gap-3">
              <img
                src={form.security.badgeIcon}
                alt="Bảo mật"
                className="w-8 h-8 rounded-lg object-contain p-1 bg-[#0A192F] border border-[#233554] shrink-0"
                referrerPolicy="no-referrer"
              />
              <p className="text-[11px] text-[#8892B0] leading-relaxed">
                {form.security.statement}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
