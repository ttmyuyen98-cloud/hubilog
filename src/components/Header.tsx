import React, { useState } from 'react';
import contentData from '../data/contentData.json';
import { useContent } from '../context/ContentContext';
import { Shield } from 'lucide-react';

interface HeaderProps {
  activeSlideId: string;
  onNavigate: (slideId: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSlideId,
  onNavigate,
  onOpenBooking,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navigation } = contentData;
  const { theme } = useContent();

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Mark */}
        <button
          onClick={() => handleNavClick('slide-1')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] rounded-lg"
          aria-label="HUBI LOGISTICS - Về đầu trang"
        >
          <img
            src={theme.logoUrl}
            alt={`Logo ${theme.brandName}`}
            className="w-10 h-10 aspect-square rounded-xl object-contain max-w-full shrink-0 border border-[#00E5FF]/40 group-hover:border-[#00E5FF] group-hover:shadow-[0_0_12px_rgba(0,229,255,0.5)] transition-all bg-[#0A192F]/80 p-1"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = './assets/s1_logo_brand_01.png';
            }}
          />
          <div className="flex flex-col">
            <span className="font-display font-normal text-lg sm:text-xl text-[#E6F1FF] tracking-normal group-hover:text-[#00E5FF] transition-colors whitespace-nowrap">
              {theme.brandName}
            </span>
            <span className="text-[11px] font-medium text-[#8892B0] tracking-normal uppercase hidden sm:block whitespace-nowrap">
              {contentData.brand.serviceName}
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Scrollspy) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium" aria-label="Thanh điều hướng chính">
          {navigation.map((item) => {
            const isActive = activeSlideId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 flex flex-col items-center transition-colors whitespace-nowrap cursor-pointer text-sm font-medium ${
                  isActive ? 'text-[#00E5FF]' : 'text-[#8892B0] hover:text-[#E6F1FF]'
                }`}
              >
                <span>{item.title}</span>
                {isActive && (
                  <span
                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#00E5FF]"
                    style={{ boxShadow: '0 0 10px #00E5FF, 0 0 4px #00E5FF' }}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action CTA, Admin portal shortcut & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#112240] hover:bg-[#1b325c] border border-[#233554] hover:border-[#00E5FF]/40 text-xs text-[#8892B0] hover:text-[#00E5FF] transition-all cursor-pointer"
              title="Quản trị viên"
            >
              <Shield className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Admin</span>
            </button>
          )}

          <button
            onClick={onOpenBooking}
            style={{ backgroundColor: theme.ctaColor }}
            className="relative px-5 py-2.5 rounded-[10px] text-[#0A192F] font-bold text-xs sm:text-sm tracking-normal transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.5),0_4px_15px_rgba(0,229,255,0.35)] hover:shadow-[0_0_30px_rgba(0,229,255,0.8),0_6px_20px_rgba(0,229,255,0.5)]"
          >
            {contentData.brand.ctaText}
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#8892B0] hover:text-[#E6F1FF] hover:bg-[#112240] transition-colors focus:outline-none"
            aria-label="Mở thanh điều hướng"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A192F]/95 backdrop-blur-xl border-b border-[#233554] px-4 pt-3 pb-6 animate-fade-rise">
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => {
              const isActive = activeSlideId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                    isActive ? 'bg-[#112240] text-[#00E5FF]' : 'text-[#8892B0] hover:text-[#E6F1FF] hover:bg-[#112240]/60'
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="px-4 py-2.5 rounded-lg text-left text-sm font-medium text-[#00E5FF] hover:bg-[#112240] flex items-center gap-2 border-t border-[#233554] mt-2 pt-3"
              >
                <Shield className="w-4 h-4" />
                <span>Trang Quản Trị Viên (Admin)</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
