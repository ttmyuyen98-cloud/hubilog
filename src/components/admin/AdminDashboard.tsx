import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { BrandThemeTab } from './tabs/BrandThemeTab';
import { ArticlesTab } from './tabs/ArticlesTab';
import { AboutCardsTab } from './tabs/AboutCardsTab';
import { BookingsTab } from './tabs/BookingsTab';
import { TeamTab } from './tabs/TeamTab';
import { ContactTab } from './tabs/ContactTab';
import {
  Shield,
  Palette,
  FileText,
  Sparkles,
  Package,
  Users,
  PhoneCall,
  ExternalLink,
  LogOut,
  Database,
  CheckCircle2,
  RefreshCw,
  Menu,
  X,
  Cloud,
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

type TabType = 'bookings' | 'branding' | 'articles' | 'about' | 'team' | 'contact';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const {
    theme,
    logoutAdmin,
    isSyncing,
    lastSaved,
    isCloudConnected,
    cloudDatabaseId,
    cloudProjectId,
    refreshFromCloud,
  } = useContent();

  const [activeTab, setActiveTab] = useState<TabType>('branding');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLogout = () => {
    logoutAdmin();
    onBackToSite();
  };

  const handleRefreshCloud = async () => {
    setIsRefreshing(true);
    await refreshFromCloud();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const tabs = [
    {
      id: 'bookings' as TabType,
      label: 'Đơn Đặt Lịch (Realtime)',
      icon: Package,
      desc: 'Điều phối gom đơn theo giờ',
    },
    {
      id: 'branding' as TabType,
      label: 'Nhận diện & Giao diện',
      icon: Palette,
      desc: 'Logo, Banner, Bảng màu',
    },
    {
      id: 'articles' as TabType,
      label: 'Quản lý Bài viết',
      icon: FileText,
      desc: 'Thêm, sửa, xóa bài viết',
    },
    {
      id: 'about' as TabType,
      label: 'Vấn đề & Giải pháp',
      icon: Sparkles,
      desc: '3 khối Vấn đề, Giải pháp, Giá trị',
    },
    {
      id: 'team' as TabType,
      label: 'Thành viên Ban dự án',
      icon: Users,
      desc: 'Họ tên, chức danh, email',
    },
    {
      id: 'contact' as TabType,
      label: 'Thông tin liên hệ & Footer',
      icon: PhoneCall,
      desc: 'Hotline, email, trụ sở',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A192F] text-[#E6F1FF] flex flex-col font-jakarta">
      {/* Top Admin Header Bar */}
      <header className="h-16 bg-[#112240] border-b border-[#233554] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        {/* Left: Brand Identity & Portal badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-[#8892B0] hover:text-[#E6F1FF] hover:bg-[#0A192F]"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <img
              src={theme.logoUrl}
              alt="Logo HUBI"
              className="w-8 h-8 rounded-lg object-contain bg-[#0A192F] border border-[#00E5FF]/40 p-1"
              onError={(e) => {
                e.currentTarget.src = './assets/s1_logo_brand_01.png';
              }}
            />
            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm text-[#E6F1FF] tracking-normal leading-tight">
                {theme.brandName}
              </span>
              <span className="text-[10px] text-[#00E5FF] font-medium tracking-normal flex items-center gap-1.5">
                Bảng Quản Trị Hệ Thống
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-[#00E5FF]/10 text-[#00E5FF] text-[9px] border border-[#00E5FF]/30 font-mono">
                  Cloud Live
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions: Sync status, Cloud reload, Return to Site & Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Firestore Cloud Status Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A192F] border border-[#233554] text-[11px] text-[#8892B0]">
            <Cloud className={`w-3.5 h-3.5 ${isCloudConnected ? 'text-[#00E5FF]' : 'text-amber-400'}`} />
            <span className="hidden md:inline">Firestore:</span>
            <span className="text-[#00E5FF] font-medium flex items-center gap-1.5">
              {isSyncing ? (
                <span className="text-amber-300 animate-pulse">Đang đẩy lên Cloud...</span>
              ) : isCloudConnected ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
                  <span>Trực tuyến</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Cục bộ</span>
                </>
              )}
            </span>
          </div>

          {/* Manual Cloud Reload Button */}
          <button
            onClick={handleRefreshCloud}
            disabled={isRefreshing}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#0A192F] hover:bg-[#1b325c] border border-[#233554] hover:border-[#00E5FF]/40 text-xs text-[#8892B0] hover:text-[#00E5FF] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Tải lại dữ liệu mới nhất từ Firestore Cloud"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#00E5FF]' : ''}`} />
            <span className="hidden xl:inline">Làm mới từ Cloud</span>
          </button>

          <button
            onClick={onBackToSite}
            className="px-3 py-1.5 rounded-lg bg-[#0A192F] hover:bg-[#1b325c] border border-[#233554] hover:border-[#00E5FF]/40 text-xs text-[#E6F1FF] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="hidden sm:inline">Xem website</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-xs text-red-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Đăng xuất khỏi phiên quản trị"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar (Desktop) + Content Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar (260px) */}
        <aside className="w-64 bg-[#112240] border-r border-[#233554] p-4 hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-[#8892B0] uppercase tracking-wider px-3 mb-2 block">
              Menu Quản Trị
            </span>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#00E5FF] text-[#0A192F] font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                      : 'text-[#8892B0] hover:text-[#E6F1FF] hover:bg-[#0A192F]/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0A192F]' : 'text-[#00E5FF]'}`} />
                  <div className="flex flex-col truncate">
                    <span className="text-xs tracking-normal leading-tight truncate">
                      {tab.label}
                    </span>
                    <span
                      className={`text-[10px] tracking-normal leading-tight mt-0.5 truncate ${
                        isActive ? 'text-[#0A192F]/80 font-normal' : 'text-[#8892B0]/80'
                      }`}
                    >
                      {tab.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Cloud Database Info Box in Sidebar */}
          <div className="p-3.5 rounded-xl bg-[#0A192F] border border-[#233554] text-[11px] text-[#8892B0] space-y-2">
            <div className="flex items-center gap-1.5 text-[#00E5FF] font-semibold">
              <Database className="w-3.5 h-3.5" />
              <span>Google Cloud Firestore</span>
            </div>
            <div className="space-y-1 text-[10px]">
              <p className="text-[#8892B0] flex items-center justify-between">
                <span>Dự án:</span>
                <span className="font-mono text-[#E6F1FF] truncate max-w-[120px]">{cloudProjectId || 'cool-victory-mc70r'}</span>
              </p>
              <p className="text-[#8892B0] flex items-center justify-between">
                <span>Database:</span>
                <span className="font-mono text-[#00E5FF] truncate max-w-[120px]">{cloudDatabaseId ? 'moi-2c41e...' : 'default'}</span>
              </p>
              <div className="flex items-center gap-1 text-emerald-400 pt-1 border-t border-[#233554]/60">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>Đồng bộ 2 chiều tức thì</span>
              </div>
            </div>
            {lastSaved && (
              <p className="text-[10px] text-[#8892B0] font-mono pt-1 border-t border-[#233554]/60">
                Lưu lúc: <span className="text-[#E6F1FF]">{lastSaved}</span>
              </p>
            )}
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex">
            <div className="w-64 bg-[#112240] h-full p-4 flex flex-col justify-between border-r border-[#233554]">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#233554]">
                  <span className="text-xs font-bold text-[#E6F1FF]">Danh mục quản trị</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-[#8892B0] hover:text-[#E6F1FF]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl flex items-center gap-3 ${
                        isActive
                          ? 'bg-[#00E5FF] text-[#0A192F] font-bold'
                          : 'text-[#8892B0] hover:text-[#E6F1FF]'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-xs">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-[#0A192F] border border-[#233554] text-[10px] text-[#8892B0]">
                  <p className="text-[#00E5FF] font-medium mb-1">Firestore Cloud Live</p>
                  <p>Tất cả bài viết & cài đặt cập nhật tức thì.</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-lg bg-red-950/60 border border-red-500/30 text-xs text-red-200 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#0A192F]">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Cloud Sync Announcement Banner */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#112240] border border-[#00E5FF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_20px_rgba(0,229,255,0.06)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0A192F] border border-[#00E5FF]/50 flex items-center justify-center text-[#00E5FF] shrink-0">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-semibold text-[#E6F1FF] flex items-center gap-2">
                    <span>Đã kết nối Database Đám Mây (Google Cloud Firestore)</span>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h2>
                  <p className="text-[11px] text-[#8892B0]">
                    Toàn bộ Bài viết, Banner, Logo và Cài đặt được lưu trữ tập trung trên Cloud. Mọi thao tác Thêm / Sửa / Xóa cập nhật trực tiếp lên cơ sở dữ liệu và hiển thị ngay lập tức tới người dùng trên mọi thiết bị.
                  </p>
                </div>
              </div>
            </div>

            {/* Active Tab Content */}
            {activeTab === 'bookings' && <BookingsTab />}
            {activeTab === 'branding' && <BrandThemeTab />}
            {activeTab === 'articles' && <ArticlesTab />}
            {activeTab === 'about' && <AboutCardsTab />}
            {activeTab === 'team' && <TeamTab />}
            {activeTab === 'contact' && <ContactTab />}
          </div>
        </main>
      </div>
    </div>
  );
};
