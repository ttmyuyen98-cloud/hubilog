import React from 'react';
import contentData from '../data/contentData.json';
import { useContent } from '../context/ContentContext';
import { Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (slideId: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking, onOpenAdmin }) => {
  const { navigation } = contentData;
  const { theme, contact, isAdminLoggedIn } = useContent();

  return (
    <footer className="relative border-t border-[#233554] bg-[#0A192F] py-12 text-[#8892B0] z-10 font-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[#233554]">
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <img
              src={theme.logoUrl}
              alt={`Logo ${theme.brandName}`}
              className="w-10 h-10 aspect-square rounded-xl object-contain max-w-full border border-[#00E5FF]/40 bg-[#112240] p-1"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = './assets/s1_logo_brand_01.png';
              }}
            />
            <div>
              <span className="font-display font-normal text-lg text-[#E6F1FF] block tracking-normal leading-[1.4]">
                {theme.brandName}
              </span>
              <span className="text-xs text-[#00E5FF] font-medium tracking-normal">
                {theme.slogan}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-6 text-xs">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="hover:text-[#00E5FF] transition-colors cursor-pointer text-[#8892B0]"
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* CTA & Admin Access */}
          <div className="flex items-center gap-3 flex-wrap">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-4 py-2.5 rounded-[10px] bg-[#112240] hover:bg-[#1b325c] border border-[#233554] hover:border-[#00E5FF]/40 text-[#E6F1FF] hover:text-[#00E5FF] font-medium text-xs tracking-normal transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Shield className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>{isAdminLoggedIn ? 'Trang Quản Trị' : 'Đăng nhập Admin'}</span>
              </button>
            )}

            <button
              onClick={onOpenBooking}
              style={{ backgroundColor: theme.ctaColor }}
              className="px-5 py-2.5 rounded-[10px] text-[#0A192F] font-bold text-xs tracking-normal transition-all shadow-[0_0_20px_rgba(0,229,255,0.5)] cursor-pointer"
            >
              {contentData.brand.ctaText}
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8892B0]">
          <p>© {new Date().getFullYear()} {theme.brandName}. Dự án gom đơn giao nội khu theo giờ. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="text-[#00E5FF]/90 font-medium">Hotline: {contact.hotline}</span>
            <span className="hidden sm:inline">·</span>
            <a href={`mailto:${contact.email}`} className="text-[#8892B0] hover:text-[#00E5FF] transition-colors">
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
