import React from 'react';
import contentData from '../../data/contentData.json';

interface Slide3ServicesProps {
  onOpenBooking: () => void;
}

export const Slide3Services: React.FC<Slide3ServicesProps> = ({ onOpenBooking }) => {
  const { slides } = contentData;
  const data = slides.s3_services;
  const { details, visualPanel } = data;

  return (
    <section
      id="slide-3"
      className="min-h-screen py-24 flex flex-col justify-center relative"
      aria-label="Slide 3: Sản phẩm và dịch vụ"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3 text-xs text-[#8892B0]">
            <span className="font-mono text-[#00E5FF] font-semibold">{data.slideNumber}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E6F1FF]/80">{data.primaryTitle}</span>
          </div>
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-[#E6F1FF] tracking-normal leading-[1.4] mb-3">
            {data.secondaryTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#8892B0] leading-[1.4] tracking-normal max-w-2xl">
            {data.bodyContent}
          </p>
        </div>

        {/* Split Dashboard: Left 60% (Interactive Text + Timeline) / Right 40% (Sticky/Floating Showcase) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (60% / 7 cols): Detailed Service Architecture */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Service Card */}
            <div className="p-6 sm:p-7 rounded-[20px] bg-[#112240] border border-[#233554] shadow-deep-ocean">
              <span className="text-xs font-bold text-[#00E5FF] tracking-wider uppercase block mb-2">
                Dịch vụ trọng tâm
              </span>
              <h3 className="font-display font-normal text-2xl sm:text-3xl text-[#E6F1FF] tracking-normal leading-[1.4] mb-3">
                {details.mainService.title}
              </h3>
              <p className="text-sm text-[#8892B0] leading-[1.4] tracking-normal mb-6">
                {details.mainService.description}
              </p>

              {/* 3 Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {details.benefits.map((b, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0A192F]/80 border border-[#233554]">
                    <span className="text-xs font-mono text-[#00E5FF] font-bold block mb-1">
                      0{idx + 1}
                    </span>
                    <h4 className="font-syne font-bold text-xs text-[#E6F1FF] mb-1">
                      {b.title}
                    </h4>
                    <p className="text-[11px] text-[#8892B0] leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience 2 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {details.targetAudience.map((aud) => (
                <div key={aud.id} className="p-5 rounded-[20px] bg-[#112240] border border-[#233554] shadow-deep-ocean flex items-center gap-4 group hover:border-[#00E5FF]/40 transition-all">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#233554] group-hover:border-[#00E5FF] transition-all">
                    <img
                      src={aud.image}
                      alt={aud.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-sm text-[#E6F1FF] mb-1">
                      {aud.title}
                    </h4>
                    <p className="text-xs text-[#8892B0] leading-relaxed">
                      {aud.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Process Flow 4 Steps (Quy trình 01-04) with Glowing Cyan Circles & Connecting Line */}
            <div className="p-6 sm:p-7 rounded-[20px] bg-[#112240] border border-[#233554] shadow-deep-ocean">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#233554]">
                <div>
                  <span className="text-xs font-bold text-[#00E5FF] tracking-wider uppercase block mb-1">
                    Chuẩn Hóa Vận Hành
                  </span>
                  <h4 className="font-display font-normal text-2xl text-[#E6F1FF] tracking-normal leading-[1.4]">
                    {details.processFlow.title}
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0A192F] text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_10px_rgba(0,229,255,0.25)] tracking-normal">
                  4 Bước Khép Kín
                </span>
              </div>

              {/* Glowing Timeline Bar with Connected Circles */}
              <div className="relative mb-6">
                {/* Horizontal Neon Glowing Connecting Line (visible on tablet/desktop) */}
                <div
                  className="hidden sm:block absolute top-7 left-12 right-12 h-[2px] z-0 bg-[#00E5FF] pointer-events-none"
                  style={{
                    boxShadow: '0 0 12px #00E5FF, 0 0 4px #00E5FF',
                  }}
                  aria-hidden="true"
                />

                {/* 4 Process Step Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative z-10">
                  {details.processFlow.steps.map((st) => (
                    <div
                      key={st.step}
                      className="p-4 rounded-xl bg-[#112240] border border-[#233554] shadow-[0_10px_30px_-10px_rgba(2,12,27,0.7)] hover:border-[#00E5FF]/60 hover:shadow-[0_10px_30px_-5px_rgba(0,229,255,0.25)] transition-all flex flex-col items-center text-center group"
                    >
                      {/* Vòng tròn quy trình (01, 02, 03, 04) phát sáng Cyan */}
                      <div className="w-12 h-12 rounded-full mb-3 flex items-center justify-center font-mono font-bold text-sm bg-[#0A192F] text-[#00E5FF] border-2 border-[#00E5FF] shadow-[0_0_16px_rgba(0,229,255,0.7),inset_0_0_10px_rgba(0,229,255,0.35)] group-hover:scale-110 transition-transform">
                        {st.step}
                      </div>

                      <span className="font-bold text-sm text-[#E6F1FF] block mb-1.5 tracking-normal">
                        {st.name}
                      </span>
                      <p className="text-xs text-[#8892B0] leading-relaxed">
                        {st.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infographic Banner */}
              <div className="rounded-xl overflow-hidden border border-[#233554] bg-[#0A192F]">
                <img
                  src={details.processFlow.image}
                  alt="Sơ đồ quy trình 4 bước HUBI LOGISTICS"
                  className="w-full h-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* CTA Action Bar inside Dashboard */}
              <div className="mt-6 pt-5 border-t border-[#233554] flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-[#8892B0]">
                  Sẵn sàng gom đơn hôm nay? Đặt lịch trong vòng 30 giây.
                </div>
                {/* Nút 'ĐẶT LỊCH NGAY': Dùng màu Xanh Cyan #00E5FF (chữ đen #0A192F) */}
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-[10px] bg-[#00E5FF] hover:bg-[#33ebff] text-[#0A192F] font-bold text-xs tracking-normal transition-all shadow-[0_0_20px_rgba(0,229,255,0.5),0_4px_15px_rgba(0,229,255,0.35)] hover:shadow-[0_0_30px_rgba(0,229,255,0.8),0_6px_20px_rgba(0,229,255,0.5)] cursor-pointer"
                >
                  ĐẶT LỊCH NGAY
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (40% / 5 cols): Floating Dashboard Visual Container */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="p-4 rounded-[20px] bg-[#112240] border border-[#00E5FF]/40 shadow-deep-ocean">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 border border-[#233554] group">
                <img
                  src={visualPanel.mainImage}
                  alt="Ảnh sảnh giao nhận HUBI LOGISTICS"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-semibold text-[#00E5FF] uppercase tracking-normal block mb-1">
                    Trực Quan Thực Tế
                  </span>
                  <p className="text-xs font-medium text-[#E6F1FF]">
                    {visualPanel.caption}
                  </p>
                </div>
              </div>

              {/* 2 Linked Sub-thumbnails */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-xl bg-[#0A192F]/90 border border-[#233554] flex items-center gap-2.5">
                  <img
                    src={visualPanel.apartmentImage}
                    alt="Cư dân"
                    className="w-12 h-12 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[11px] font-bold text-[#E6F1FF] block">Cư dân</span>
                    <span className="text-[10px] text-[#8892B0]">Giao tận cửa</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0A192F]/90 border border-[#233554] flex items-center gap-2.5">
                  <img
                    src={visualPanel.shopImage}
                    alt="Cửa hàng"
                    className="w-12 h-12 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[11px] font-bold text-[#E6F1FF] block">Cửa hàng</span>
                    <span className="text-[10px] text-[#8892B0]">Gom theo ca</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
