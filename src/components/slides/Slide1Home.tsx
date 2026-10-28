import React from 'react';
import contentData from '../../data/contentData.json';
import { useContent } from '../../context/ContentContext';

interface Slide1HomeProps {
  onOpenBooking: () => void;
}

export const Slide1Home: React.FC<Slide1HomeProps> = ({ onOpenBooking }) => {
  const { slides } = contentData;
  const data = slides.s1_home;
  const { theme, team } = useContent();

  return (
    <section
      id="slide-1"
      className="min-h-screen pt-28 pb-20 flex flex-col justify-center relative overflow-hidden"
      aria-label="Slide 1: Trang chủ"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Tag & Slide Kicker */}
        <div className="flex items-center gap-3 mb-6 text-xs text-[#8892B0]">
          <span className="font-mono text-[#00E5FF] font-semibold">{data.slideNumber}</span>
          <span aria-hidden="true">·</span>
          <span>{data.primaryTitle}</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#E6F1FF]/80">{data.secondaryTitle}</span>
        </div>

        {/* Hero Split Layout: Left 60% / Right 40% */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Giant Typography & Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Slogan Pill / Accent Kicker */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
              <span className="text-sm font-bold text-[#00E5FF] tracking-normal uppercase">
                {theme.slogan}
              </span>
            </div>

            {/* Giant Title */}
            <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-[#E6F1FF] tracking-normal leading-[1.4] mb-6 balance-text">
              {data.displayTitle}
            </h1>

            {/* Body Content */}
            <p className="text-base sm:text-lg text-[#8892B0] leading-[1.4] tracking-normal max-w-2xl mb-8">
              {data.bodyContent}
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onOpenBooking}
                style={{ backgroundColor: theme.ctaColor }}
                className="px-8 py-4 rounded-[10px] text-[#0A192F] font-bold text-base tracking-normal transition-all duration-300 transform hover:-translate-y-1 cursor-pointer shadow-[0_0_25px_rgba(0,229,255,0.55),0_4px_20px_rgba(0,229,255,0.35)] hover:shadow-[0_0_35px_rgba(0,229,255,0.85),0_6px_25px_rgba(0,229,255,0.5)]"
              >
                {data.cta.text}
              </button>
              <div className="text-xs text-[#8892B0] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
                <span>Mô phỏng tức thì · Không tốn phí</span>
              </div>
            </div>

            {/* Bento Highlights Strip below Hero Split */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#233554]">
              {data.highlights.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#112240] border border-[#233554] shadow-deep-ocean hover:border-[#00E5FF]/50 hover:shadow-[0_10px_30px_-5px_rgba(0,229,255,0.2)] transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-8 h-8 rounded-lg object-contain p-1 bg-[#0A192F] border border-[#233554] group-hover:border-[#00E5FF]"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs font-bold text-[#00E5FF] tracking-normal">
                      {item.stat}
                    </span>
                  </div>
                  <h3 className="font-title font-normal text-lg sm:text-xl text-[#E6F1FF] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#8892B0] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Delivery Banner & Project Members Showcase */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-[20px] p-2.5 bg-[#112240] border border-[#00E5FF]/40 shadow-deep-ocean group overflow-hidden">
              <div className="relative aspect-video lg:aspect-[4/3] rounded-[16px] overflow-hidden">
                <img
                  src={theme.bannerUrl}
                  alt={theme.bannerAlt}
                  className="w-full h-full object-cover max-w-full transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = './assets/s1_hero_delivery_01.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/95 via-[#0A192F]/30 to-transparent" />
                
                {/* Floating Micro-Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0A192F]/90 backdrop-blur-md border border-[#233554] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-[#00E5FF] uppercase tracking-normal block">
                      Đặc quyền nội khu
                    </span>
                    <span className="text-xs font-bold text-[#E6F1FF] tracking-normal">
                      Tiết kiệm 60% chi phí chuyển phát
                    </span>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    style={{ backgroundColor: theme.ctaColor }}
                    className="px-3.5 py-1.5 rounded-lg text-[11px] font-bold text-[#0A192F] transition-all cursor-pointer tracking-normal shadow-[0_0_12px_rgba(0,229,255,0.5)]"
                  >
                    Thử ngay
                  </button>
                </div>
              </div>
            </div>

            {/* Project Team Showcase */}
            <div className="p-4 rounded-[20px] bg-[#112240] border border-[#233554] shadow-deep-ocean">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#233554]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
                  <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-normal">
                    Thành viên thực hiện dự án
                  </span>
                </div>
                <span className="text-[10px] text-[#8892B0] font-medium">HUBI Pioneer Team</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {team.slice(0, 3).map((m, idx) => (
                  <div
                    key={m.id || idx}
                    className="p-2.5 rounded-xl bg-[#0A192F]/80 border border-[#233554] hover:border-[#00E5FF]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-[#00E5FF]">
                        0{idx + 1}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#E6F1FF] tracking-normal truncate mb-0.5">
                      {m.name}
                    </h4>
                    <p className="text-[11px] text-[#8892B0] tracking-normal truncate">
                      {m.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
