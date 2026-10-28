import React, { useState, useRef } from 'react';
import { useContent } from '../../../context/ContentContext';
import { readFileAsDataUrl } from '../../../utils/imageUpload';
import { Upload, Link as LinkIcon, RefreshCw, Check, Palette, Sparkles, Image as ImageIcon } from 'lucide-react';

export const BrandThemeTab: React.FC = () => {
  const { theme, updateTheme, resetToDefault, isSyncing, lastSaved } = useContent();

  const [form, setForm] = useState({ ...theme });
  const [logoInputType, setLogoInputType] = useState<'upload' | 'url'>('upload');
  const [bannerInputType, setBannerInputType] = useState<'upload' | 'url'>('upload');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const logoFileRef = useRef<HTMLInputElement>(null);
  const bannerFileRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (key: 'primaryColor' | 'surfaceColor' | 'accentColor' | 'ctaColor', value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setErrorMessage(null);
      const dataUrl = await readFileAsDataUrl(file);
      setForm((prev) => ({ ...prev, logoUrl: dataUrl }));
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Lỗi tải ảnh logo');
    }
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setErrorMessage(null);
      const dataUrl = await readFileAsDataUrl(file);
      setForm((prev) => ({ ...prev, bannerUrl: dataUrl }));
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Lỗi tải ảnh banner');
    }
  };

  const handleApplyPreset = (preset: {
    primaryColor: string;
    surfaceColor: string;
    accentColor: string;
    ctaColor: string;
  }) => {
    setForm((prev) => ({ ...prev, ...preset }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await updateTheme(form);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Lỗi khi lưu cấu hình');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục giao diện về mặc định ban đầu không?')) {
      await resetToDefault();
      setForm({
        primaryColor: '#0A192F',
        surfaceColor: '#112240',
        accentColor: '#00E5FF',
        ctaColor: '#00E5FF',
        logoUrl: './assets/s1_logo_brand_01.png',
        bannerUrl: './assets/s1_hero_delivery_01.jpg',
        bannerAlt: 'Banner trang chủ HUBI LOGISTICS',
        brandName: 'HUBI LOGISTICS',
        slogan: 'Nhận Đúng Giờ – Phí Siêu Hời',
      });
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0A192F] border border-[#233554]">
        <div>
          <h2 className="font-display text-lg text-[#E6F1FF] font-medium tracking-normal">
            Nhận Diện Thương Hiệu & Bảng Màu
          </h2>
          <p className="text-xs text-[#8892B0] tracking-normal">
            Tải lên Logo, thay đổi ảnh Banner trang chủ và tùy chỉnh màu sắc hiển thị toàn hệ thống.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <span className="text-[11px] text-[#00E5FF] font-mono">
              Lưu lúc: {lastSaved}
            </span>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-[#112240] hover:bg-[#1b325c] text-xs text-[#8892B0] hover:text-[#E6F1FF] border border-[#233554] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Mặc định</span>
          </button>
          <button
            type="submit"
            disabled={isSyncing}
            className="px-5 py-1.5 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] text-xs font-bold text-[#0A192F] flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all cursor-pointer disabled:opacity-50"
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Đã lưu!</span>
              </>
            ) : isSyncing ? (
              <span>Đang lưu...</span>
            ) : (
              <span>Lưu cấu hình</span>
            )}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs">
          {errorMessage}
        </div>
      )}

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>Cấu hình giao diện đã được cập nhật thành công và áp dụng cho toàn bộ người dùng!</span>
        </div>
      )}

      {/* Grid: 2 Columns (Left: Brand Assets / Right: Color Palettes) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Assets (Logo & Banner) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Logo Setting */}
          <div className="p-6 rounded-[20px] bg-[#112240] border border-[#233554] shadow-deep-ocean">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#233554]">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#00E5FF]" />
                <h3 className="font-semibold text-sm text-[#E6F1FF] tracking-normal">
                  Logo Thương Hiệu (Header & Footer)
                </h3>
              </div>
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#0A192F] border border-[#233554] text-[11px]">
                <button
                  type="button"
                  onClick={() => setLogoInputType('upload')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    logoInputType === 'upload' ? 'bg-[#112240] text-[#00E5FF] font-medium' : 'text-[#8892B0]'
                  }`}
                >
                  Tải lên tệp
                </button>
                <button
                  type="button"
                  onClick={() => setLogoInputType('url')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    logoInputType === 'url' ? 'bg-[#112240] text-[#00E5FF] font-medium' : 'text-[#8892B0]'
                  }`}
                >
                  Đường dẫn URL
                </button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              {/* Preview Thumbnail */}
              <div className="w-20 h-20 rounded-xl bg-[#0A192F] border border-[#00E5FF]/40 p-2 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,229,255,0.2)]">
                <img
                  src={form.logoUrl}
                  alt="Logo Preview"
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = './assets/s1_logo_brand_01.png';
                  }}
                />
              </div>

              {/* Upload or URL Controls */}
              <div className="flex-1 space-y-3">
                {logoInputType === 'upload' ? (
                  <div>
                    <input
                      ref={logoFileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => logoFileRef.current?.click()}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#0A192F] hover:bg-[#152a4e] border border-[#233554] text-xs text-[#E6F1FF] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4 text-[#00E5FF]" />
                      <span>Chọn ảnh từ máy tính (PNG, SVG, JPG)</span>
                    </button>
                    <p className="text-[11px] text-[#8892B0] mt-1.5">
                      Khuyên dùng: Ảnh vuông nền trong suốt tỉ lệ 1:1, tối đa 5MB.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="relative">
                      <LinkIcon className="w-3.5 h-3.5 text-[#8892B0] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={form.logoUrl}
                        onChange={(e) => setForm((prev) => ({ ...prev, logoUrl: e.target.value }))}
                        placeholder="Nhập https://... hoặc ./assets/..."
                        className="w-full bg-[#0A192F] border border-[#233554] rounded-lg pl-9 pr-3 py-2 text-xs text-[#E6F1FF] placeholder-[#8892B0]/50 focus:outline-none focus:border-[#00E5FF]"
                      />
                    </div>
                    <p className="text-[11px] text-[#8892B0] mt-1.5">
                      Đường dẫn trực tiếp đến tệp ảnh logo.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Banner Setting */}
          <div className="p-6 rounded-[20px] bg-[#112240] border border-[#233554] shadow-deep-ocean">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#233554]">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#00E5FF]" />
                <h3 className="font-semibold text-sm text-[#E6F1FF] tracking-normal">
                  Ảnh Banner Trang Chủ (Hero Section)
                </h3>
              </div>
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#0A192F] border border-[#233554] text-[11px]">
                <button
                  type="button"
                  onClick={() => setBannerInputType('upload')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    bannerInputType === 'upload' ? 'bg-[#112240] text-[#00E5FF] font-medium' : 'text-[#8892B0]'
                  }`}
                >
                  Tải lên tệp
                </button>
                <button
                  type="button"
                  onClick={() => setBannerInputType('url')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    bannerInputType === 'url' ? 'bg-[#112240] text-[#00E5FF] font-medium' : 'text-[#8892B0]'
                  }`}
                >
                  Đường dẫn URL
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Aspect Ratio Preview */}
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#0A192F] border border-[#233554]">
                <img
                  src={form.bannerUrl}
                  alt={form.bannerAlt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = './assets/s1_hero_delivery_01.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] text-[#E6F1FF] font-medium truncate">
                    Xem trước Banner Trang Chủ (16:9)
                  </span>
                </div>
              </div>

              {bannerInputType === 'upload' ? (
                <div>
                  <input
                    ref={bannerFileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => bannerFileRef.current?.click()}
                    className="w-full py-2.5 px-3 rounded-lg bg-[#0A192F] hover:bg-[#152a4e] border border-[#233554] text-xs text-[#E6F1FF] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4 text-[#00E5FF]" />
                    <span>Tải ảnh Banner mới từ máy tính</span>
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <LinkIcon className="w-3.5 h-3.5 text-[#8892B0] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={form.bannerUrl}
                    onChange={(e) => setForm((prev) => ({ ...prev, bannerUrl: e.target.value }))}
                    placeholder="Nhập https://... hoặc ./assets/..."
                    className="w-full bg-[#0A192F] border border-[#233554] rounded-lg pl-9 pr-3 py-2 text-xs text-[#E6F1FF] placeholder-[#8892B0]/50 focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs text-[#8892B0] mb-1">
                  Văn bản mô tả ảnh (Alt text):
                </label>
                <input
                  type="text"
                  value={form.bannerAlt}
                  onChange={(e) => setForm((prev) => ({ ...prev, bannerAlt: e.target.value }))}
                  className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Theme Color Customization */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-[20px] bg-[#112240] border border-[#233554] shadow-deep-ocean">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#233554]">
              <Palette className="w-4 h-4 text-[#00E5FF]" />
              <h3 className="font-semibold text-sm text-[#E6F1FF] tracking-normal">
                Màu Sắc Chủ Đạo Toàn Trang (Theme Colors)
              </h3>
            </div>

            {/* Color Presets */}
            <div className="mb-6">
              <span className="text-xs text-[#8892B0] block mb-2 font-medium">
                Gợi ý phối màu chuẩn (Presets):
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      primaryColor: '#0A192F',
                      surfaceColor: '#112240',
                      accentColor: '#00E5FF',
                      ctaColor: '#00E5FF',
                    })
                  }
                  className="p-2.5 rounded-xl bg-[#0A192F] border border-[#233554] hover:border-[#00E5FF] flex items-center justify-between text-left transition-colors cursor-pointer"
                >
                  <span className="text-xs text-[#E6F1FF] font-medium">Ocean Deep (Mặc định)</span>
                  <div className="flex gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0A192F] border border-white/20" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#112240]" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#00E5FF]" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      primaryColor: '#070B14',
                      surfaceColor: '#101726',
                      accentColor: '#00F0FF',
                      ctaColor: '#FF6B00',
                    })
                  }
                  className="p-2.5 rounded-xl bg-[#0A192F] border border-[#233554] hover:border-[#00E5FF] flex items-center justify-between text-left transition-colors cursor-pointer"
                >
                  <span className="text-xs text-[#E6F1FF] font-medium">Cyber Night & Amber</span>
                  <div className="flex gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#070B14] border border-white/20" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#00F0FF]" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#FF6B00]" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      primaryColor: '#061a14',
                      surfaceColor: '#0d281e',
                      accentColor: '#10B981',
                      ctaColor: '#10B981',
                    })
                  }
                  className="p-2.5 rounded-xl bg-[#0A192F] border border-[#233554] hover:border-[#00E5FF] flex items-center justify-between text-left transition-colors cursor-pointer"
                >
                  <span className="text-xs text-[#E6F1FF] font-medium">Eco Green Logistics</span>
                  <div className="flex gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#061a14] border border-white/20" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0d281e]" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#10B981]" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      primaryColor: '#0F172A',
                      surfaceColor: '#1E293B',
                      accentColor: '#38BDF8',
                      ctaColor: '#F59E0B',
                    })
                  }
                  className="p-2.5 rounded-xl bg-[#0A192F] border border-[#233554] hover:border-[#00E5FF] flex items-center justify-between text-left transition-colors cursor-pointer"
                >
                  <span className="text-xs text-[#E6F1FF] font-medium">Slate Enterprise</span>
                  <div className="flex gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0F172A] border border-white/20" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#1E293B]" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#38BDF8]" />
                  </div>
                </button>
              </div>
            </div>

            {/* Individual Color Pickers */}
            <div className="space-y-4">
              {/* Primary Background */}
              <div className="p-3.5 rounded-xl bg-[#0A192F] border border-[#233554] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#E6F1FF] block">
                    Màu Nền Website (Background Canvas)
                  </span>
                  <span className="text-[11px] text-[#8892B0]">
                    Màu nền chính toàn bộ các slide
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                  />
                  <input
                    type="text"
                    value={form.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="w-24 bg-[#112240] border border-[#233554] rounded-md px-2 py-1 text-xs text-[#00E5FF] font-mono text-center"
                  />
                </div>
              </div>

              {/* Surface Card Color */}
              <div className="p-3.5 rounded-xl bg-[#0A192F] border border-[#233554] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#E6F1FF] block">
                    Màu Mặt Thẻ / Khối (Surface Cards)
                  </span>
                  <span className="text-[11px] text-[#8892B0]">
                    Màu nền của Bento grid, hộp thông tin
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.surfaceColor}
                    onChange={(e) => handleColorChange('surfaceColor', e.target.value)}
                    className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                  />
                  <input
                    type="text"
                    value={form.surfaceColor}
                    onChange={(e) => handleColorChange('surfaceColor', e.target.value)}
                    className="w-24 bg-[#112240] border border-[#233554] rounded-md px-2 py-1 text-xs text-[#00E5FF] font-mono text-center"
                  />
                </div>
              </div>

              {/* Cyan Accent Color */}
              <div className="p-3.5 rounded-xl bg-[#0A192F] border border-[#233554] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#E6F1FF] block">
                    Màu Điểm Nhấn (Accent Glow)
                  </span>
                  <span className="text-[11px] text-[#8892B0]">
                    Viền phát sáng, số bước, tiêu đề phụ
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.accentColor}
                    onChange={(e) => handleColorChange('accentColor', e.target.value)}
                    className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                  />
                  <input
                    type="text"
                    value={form.accentColor}
                    onChange={(e) => handleColorChange('accentColor', e.target.value)}
                    className="w-24 bg-[#112240] border border-[#233554] rounded-md px-2 py-1 text-xs text-[#00E5FF] font-mono text-center"
                  />
                </div>
              </div>

              {/* CTA Button Color */}
              <div className="p-3.5 rounded-xl bg-[#0A192F] border border-[#233554] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#E6F1FF] block">
                    Màu Nút Hành Động (CTA Button)
                  </span>
                  <span className="text-[11px] text-[#8892B0]">
                    Nút "Đặt Lịch Ngay" và các nút tương tác chính
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.ctaColor}
                    onChange={(e) => handleColorChange('ctaColor', e.target.value)}
                    className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                  />
                  <input
                    type="text"
                    value={form.ctaColor}
                    onChange={(e) => handleColorChange('ctaColor', e.target.value)}
                    className="w-24 bg-[#112240] border border-[#233554] rounded-md px-2 py-1 text-xs text-[#00E5FF] font-mono text-center"
                  />
                </div>
              </div>
            </div>

            {/* Live Component Preview */}
            <div className="mt-6 pt-4 border-t border-[#233554]">
              <span className="text-xs text-[#8892B0] block mb-2 font-medium">
                Mô phỏng tức thì khối giao diện (Live Preview):
              </span>
              <div
                style={{ backgroundColor: form.surfaceColor, borderColor: form.accentColor }}
                className="p-4 rounded-xl border shadow-deep-ocean transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span style={{ color: form.accentColor }} className="text-xs font-bold font-mono">
                    01 · GOM ĐƠN NỘI KHU
                  </span>
                  <span className="text-[10px] text-[#8892B0]">Vận hành thử</span>
                </div>
                <p className="text-xs text-[#E6F1FF] mb-3 leading-relaxed">
                  Gói dịch vụ giao theo khung giờ với chi phí siêu rẻ.
                </p>
                <button
                  type="button"
                  style={{ backgroundColor: form.ctaColor }}
                  className="px-4 py-2 rounded-lg text-[#0A192F] font-bold text-xs shadow-md transition-transform hover:scale-[1.02]"
                >
                  ĐẶT LỊCH NGAY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
