import React from 'react';
import contentData from '../../data/contentData.json';
import { useContent } from '../../context/ContentContext';
import { AlertCircle, Zap, ShieldCheck } from 'lucide-react';

export const Slide2About: React.FC = () => {
  const { slides } = contentData;
  const data = slides.s2_about;
  const { about, team } = useContent();

  const cards = [
    {
      item: about.problem,
      icon: AlertCircle,
      accentBorder: 'border-[#233554] hover:border-amber-400/50',
      tagColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
      glowShadow: 'hover:shadow-[0_15px_35px_-5px_rgba(245,158,11,0.15)]',
      fallbackImage: './assets/s2_problem_isolated_01.jpg',
      badgeCategory: 'Thực trạng',
      labelCategory: 'Hệ quả',
    },
    {
      item: about.solution,
      icon: Zap,
      accentBorder: 'border-[#00E5FF]/40 hover:border-[#00E5FF]',
      tagColor: 'text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/30',
      glowShadow: 'hover:shadow-[0_15px_35px_-5px_rgba(0,229,255,0.25)]',
      fallbackImage: './assets/s2_solution_hubi_02.jpg',
      badgeCategory: 'Hiệu quả',
      labelCategory: 'Quy chuẩn',
    },
    {
      item: about.value,
      icon: ShieldCheck,
      accentBorder: 'border-[#233554] hover:border-emerald-400/50',
      tagColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
      glowShadow: 'hover:shadow-[0_15px_35px_-5px_rgba(16,185,129,0.15)]',
      fallbackImage: './assets/s2_team_members_03.jpg',
      badgeCategory: 'Cam kết',
      labelCategory: 'Tác động',
    },
  ];

  return (
    <section
      id="slide-2"
      className="min-h-screen py-24 flex flex-col justify-center relative"
      aria-label="Slide 2: Giới thiệu"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Slide Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3 text-xs text-[#8892B0]">
            <span className="font-mono text-[#00E5FF] font-semibold">{data.slideNumber}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E6F1FF]/80">{data.primaryTitle}</span>
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#E6F1FF] tracking-normal leading-[1.4] mb-3">
            {data.secondaryTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#8892B0] leading-[1.4] tracking-normal max-w-2xl">
            {data.bodyContent}
          </p>
        </div>

        {/* Bento Grid: 3 Equal-Height Columns with Balanced Content & Dedicated Image Containers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-stretch">
          {cards.map(({ item, icon: Icon, accentBorder, tagColor, glowShadow, fallbackImage, badgeCategory, labelCategory }) => (
            <div
              key={item.id}
              className={`p-6 sm:p-7 rounded-[20px] bg-[#112240] ${accentBorder} shadow-deep-ocean flex flex-col justify-between group ${glowShadow} transition-all duration-300`}
            >
              {/* Top Text Content Area */}
              <div className="flex-1">
                {/* Tag Pill with Icon */}
                <div className="flex items-center justify-between mb-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-normal uppercase border ${tagColor}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.tag}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#E6F1FF] tracking-normal leading-[1.35] mb-2 group-hover:text-[#00E5FF] transition-colors">
                  {item.title}
                </h3>

                {/* Subtitle */}
                {item.subtitle && (
                  <p className="text-xs text-[#00E5FF]/90 font-medium mb-3 tracking-normal leading-relaxed">
                    {item.subtitle}
                  </p>
                )}

                {/* Detailed Description */}
                <p className="text-xs sm:text-sm text-[#8892B0] leading-[1.5] tracking-normal mb-5">
                  {item.description}
                </p>
              </div>

              {/* Dedicated Image Container: Well-fitted, aspect-ratio preserved, clean borders */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden my-3 border border-[#233554] bg-[#0A192F] shadow-inner group-hover:border-[#00E5FF]/40 transition-colors">
                <img
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  className="w-full h-full object-cover max-w-full transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bottom Metrics / Highlights Row */}
              <div className="grid grid-cols-2 gap-2.5 pt-4 mt-2 border-t border-[#233554]">
                <div className="p-2.5 rounded-lg bg-[#0A192F]/80 border border-[#233554] flex flex-col justify-center">
                  <span className="text-[10px] text-[#8892B0] block uppercase tracking-wider leading-tight">
                    {badgeCategory}
                  </span>
                  <span className="text-xs font-bold text-[#00E5FF] tracking-normal truncate mt-0.5">
                    {item.badgeText || 'Tiêu chuẩn HUBI'}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0A192F]/80 border border-[#233554] flex flex-col justify-center">
                  <span className="text-[10px] text-[#8892B0] block uppercase tracking-wider leading-tight">
                    {labelCategory}
                  </span>
                  <span className="text-xs font-semibold text-[#E6F1FF] tracking-normal truncate mt-0.5">
                    {item.extraLabel || 'Nội khu'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: Full-width Team Section */}
        <div className="p-6 sm:p-8 rounded-[20px] bg-gradient-to-b from-[#112240] to-[#0A192F] border border-[#00E5FF]/30 shadow-deep-ocean">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#233554]">
            <div>
              <span className="text-xs font-bold text-[#00E5FF] tracking-normal uppercase block mb-1">
                {data.bentoItems.team.tag}
              </span>
              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[#E6F1FF] tracking-normal leading-[1.4]">
                {data.bentoItems.team.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#8892B0] max-w-md">
              {data.bentoItems.team.description}
            </p>
          </div>

          {/* Full-width balanced 3-column team grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {team.map((member, idx) => (
              <div
                key={member.id || idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#112240]/90 to-[#0A192F]/95 border border-[#00E5FF]/30 hover:border-[#00E5FF]/80 hover:shadow-[0_20px_40px_-10px_rgba(0,229,255,0.25)] transform hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0A192F] border border-[#00E5FF]/60 shadow-[0_0_15px_rgba(0,229,255,0.35)] flex items-center justify-center font-display font-bold text-base text-[#00E5FF] group-hover:scale-105 transition-transform">
                      {member.name ? member.name.charAt(0) : idx + 1}
                    </div>
                    <span className="text-[11px] font-mono text-[#00E5FF] px-2.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="font-display font-semibold text-lg text-[#E6F1FF] mb-1.5 tracking-normal group-hover:text-[#00E5FF] transition-colors">
                    {member.name}
                  </h4>
                  <span className="text-xs font-semibold text-[#00E5FF] block mb-3 tracking-normal">
                    {member.role}
                  </span>
                  <p className="text-xs text-[#8892B0] leading-relaxed mb-6">
                    {member.responsibility}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#233554] flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[11px] text-[#8892B0] group-hover:text-[#E6F1FF] truncate transition-colors font-mono tracking-normal">
                    {member.email}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
