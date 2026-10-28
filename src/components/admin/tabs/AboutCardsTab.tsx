import React, { useState, useRef } from 'react';
import { useContent } from '../../../context/ContentContext';
import { AboutCardItem, AboutSectionSettings } from '../../../types/content';
import { readFileAsDataUrl } from '../../../utils/imageUpload';
import {
  AlertCircle,
  Zap,
  ShieldCheck,
  Upload,
  Link as LinkIcon,
  Check,
  RefreshCw,
  Image as ImageIcon,
  Sparkles,
  Info,
} from 'lucide-react';

type CardKey = 'problem' | 'solution' | 'value';

export const AboutCardsTab: React.FC = () => {
  const { about, updateAboutCard, updateAllAboutCards, isSyncing, lastSaved } = useContent();

  const [selectedKey, setSelectedKey] = useState<CardKey>('problem');
  const [formData, setFormData] = useState<AboutSectionSettings>(about);
  const [imageInputMode, setImageInputMode] = useState<Record<CardKey, 'upload' | 'url'>>({
    problem: 'upload',
    solution: 'upload',
    value: 'upload',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRefs = {
    problem: useRef<HTMLInputElement>(null),
    solution: useRef<HTMLInputElement>(null),
    value: useRef<HTMLInputElement>(null),
  };

  const cardMeta: Record<
    CardKey,
    {
      title: string;
      desc: string;
      icon: React.ElementType;
      color: string;
      defaultImage: string;
      badgeLabel: string;
      subLabel: string;
    }
  > = {
    problem: {
      title: 'Khối 1: Vấn đề hiện hữu',
      desc: 'Mô tả thực trạng giao hàng đơn lẻ, chi phí đắt đỏ và ùn tắc sảnh',
      icon: AlertCircle,
      color: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
      defaultImage: './assets/s2_problem_isolated_01.jpg',
      badgeLabel: 'Chỉ số thực trạng',
      subLabel: 'Hệ quả tồn tại',
    },
    solution: {
      title: 'Khối 2: Giải pháp đột phá',
      desc: 'Giới thiệu mô hình gom đơn nội khu theo các khung giờ vàng',
      icon: Zap,
      color: 'text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/30',
      defaultImage: './assets/s2_solution_hubi_02.jpg',
      badgeLabel: 'Chỉ số hiệu quả',
      subLabel: 'Quy chuẩn vận hành',
    },
    value: {
      title: 'Khối 3: Giá trị cốt lõi',
      desc: 'Sứ mệnh vận hành bền vững, thân thiện với cư dân và giảm phát thải',
      icon: ShieldCheck,
      color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
      defaultImage: './assets/s2_team_members_03.jpg',
      badgeLabel: 'Chỉ số cam kết',
      subLabel: 'Tác động môi trường & xã hội',
    },
  };

  const handleFieldChange = (key: CardKey, field: keyof AboutCardItem, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleImageUpload = async (key: CardKey, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setErrorMessage(null);
      const dataUrl = await readFileAsDataUrl(file);
      handleFieldChange(key, 'image', dataUrl);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Lỗi khi tải ảnh lên');
    }
  };

  const handleResetImage = (key: CardKey) => {
    handleFieldChange(key, 'image', cardMeta[key].defaultImage);
  };

  const handleSaveActiveCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await updateAboutCard(selectedKey, formData[selectedKey]);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Lỗi lưu dữ liệu lên Cloud');
    }
  };

  const handleSaveAll = async () => {
    setErrorMessage(null);
    try {
      await updateAllAboutCards(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Lỗi lưu tất cả khối');
    }
  };

  const current = formData[selectedKey];
  const meta = cardMeta[selectedKey];
  const ActiveIcon = meta.icon;

  return (
    <div className="space-y-6">
      {/* Top Banner & Fast Actions */}
      <div className="p-4 rounded-xl bg-[#0A192F] border border-[#233554] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg text-[#E6F1FF] font-medium tracking-normal flex items-center gap-2">
            <span>Quản lý Vấn đề, Giải pháp & Giá trị cốt lõi</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
              Slide 2: Giới thiệu
            </span>
          </h2>
          <p className="text-xs text-[#8892B0] tracking-normal mt-0.5">
            Tùy biến tiêu đề thẻ, phụ đề, nội dung chi tiết và tải ảnh minh họa riêng biệt cho 3 khối thông tin cốt lõi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {lastSaved && (
            <span className="text-[11px] text-[#8892B0] font-mono hidden md:inline">
              Đồng bộ lúc: {lastSaved}
            </span>
          )}
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSyncing}
            className="px-4 py-2 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] disabled:opacity-60 text-xs font-bold text-[#0A192F] flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,229,255,0.4)] cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{isSyncing ? 'Đang lưu Cloud...' : 'Lưu tất cả 3 khối'}</span>
          </button>
        </div>
      </div>

      {/* Success / Error notification */}
      {saveSuccess && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>Dữ liệu đã được lưu và cập nhật tức thì lên Google Cloud Firestore!</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 3 Block Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(Object.keys(cardMeta) as CardKey[]).map((key) => {
          const itemMeta = cardMeta[key];
          const ItemIcon = itemMeta.icon;
          const isSelected = selectedKey === key;
          const cardData = formData[key];

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedKey(key)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#112240] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                  : 'bg-[#0A192F] border-[#233554] hover:border-[#00E5FF]/40 text-[#8892B0]'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className={`p-1.5 rounded-lg border ${itemMeta.color}`}>
                  <ItemIcon className="w-4 h-4" />
                </span>
                <span className={`text-xs font-bold ${isSelected ? 'text-[#00E5FF]' : 'text-[#E6F1FF]'}`}>
                  {itemMeta.title}
                </span>
              </div>
              <p className="text-[11px] text-[#8892B0] line-clamp-1">{cardData.title}</p>
            </button>
          );
        })}
      </div>

      {/* Detailed Form for Currently Selected Card */}
      <form onSubmit={handleSaveActiveCard} className="space-y-6">
        <div className="p-6 rounded-2xl bg-[#112240] border border-[#233554] space-y-6">
          {/* Header of Active Card */}
          <div className="flex items-center justify-between pb-4 border-b border-[#233554]">
            <div className="flex items-center gap-3">
              <span className={`p-2 rounded-xl border ${meta.color}`}>
                <ActiveIcon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display font-semibold text-base text-[#E6F1FF] tracking-normal">
                  Chỉnh sửa: {meta.title}
                </h3>
                <p className="text-xs text-[#8892B0] tracking-normal">{meta.desc}</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSyncing}
              className="px-4 py-2 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] disabled:opacity-60 text-xs font-bold text-[#0A192F] flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,229,255,0.35)] cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isSyncing ? 'Đang lưu...' : 'Lưu khối này'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (7 cols): Textual Content Fields */}
            <div className="lg:col-span-7 space-y-4">
              {/* Tag / Kicker Pill */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8892B0] mb-1.5">
                    Nhãn thẻ (Tag / Kicker) *
                  </label>
                  <input
                    type="text"
                    required
                    value={current.tag}
                    onChange={(e) => handleFieldChange(selectedKey, 'tag', e.target.value)}
                    placeholder="Ví dụ: Vấn đề hiện hữu"
                    className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8892B0] mb-1.5">
                    Phụ đề thẻ (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={current.subtitle || ''}
                    onChange={(e) => handleFieldChange(selectedKey, 'subtitle', e.target.value)}
                    placeholder="Mô tả tóm tắt ngắn..."
                    className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>
              </div>

              {/* Main Title */}
              <div>
                <label className="block text-xs font-semibold text-[#8892B0] mb-1.5">
                  Tiêu đề thẻ chính (Title) *
                </label>
                <input
                  type="text"
                  required
                  value={current.title}
                  onChange={(e) => handleFieldChange(selectedKey, 'title', e.target.value)}
                  placeholder="Nhập tiêu đề nổi bật của thẻ..."
                  className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs font-medium text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#8892B0]">
                    Nội dung mô tả chi tiết (Description) *
                  </label>
                  <span className="text-[10px] text-[#8892B0]">
                    {current.description.length} ký tự
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  value={current.description}
                  onChange={(e) => handleFieldChange(selectedKey, 'description', e.target.value)}
                  placeholder="Nhập nội dung mô tả đầy đủ, rõ ràng cho thẻ..."
                  className="w-full bg-[#0A192F] border border-[#233554] rounded-lg p-3 text-xs text-[#E6F1FF] leading-relaxed focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              {/* Highlight Metrics / Sub-labels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#8892B0] mb-1.5">
                    {meta.badgeLabel}
                  </label>
                  <input
                    type="text"
                    value={current.badgeText || ''}
                    onChange={(e) => handleFieldChange(selectedKey, 'badgeText', e.target.value)}
                    placeholder="Ví dụ: -60% chi phí"
                    className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#00E5FF] font-semibold focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8892B0] mb-1.5">
                    {meta.subLabel}
                  </label>
                  <input
                    type="text"
                    value={current.extraLabel || ''}
                    onChange={(e) => handleFieldChange(selectedKey, 'extraLabel', e.target.value)}
                    placeholder="Ví dụ: 2 khung giờ cố định"
                    className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Image Upload / URL & Live Container Preview */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-[#0A192F] border border-[#233554] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#E6F1FF] flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Hình ảnh minh họa thẻ</span>
                </span>

                {/* Upload vs URL Toggle */}
                <div className="inline-flex rounded-lg bg-[#112240] p-0.5 border border-[#233554]">
                  <button
                    type="button"
                    onClick={() =>
                      setImageInputMode((p) => ({ ...p, [selectedKey]: 'upload' }))
                    }
                    className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${
                      imageInputMode[selectedKey] === 'upload'
                        ? 'bg-[#00E5FF] text-[#0A192F] font-bold'
                        : 'text-[#8892B0] hover:text-[#E6F1FF]'
                    }`}
                  >
                    Tải lên
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setImageInputMode((p) => ({ ...p, [selectedKey]: 'url' }))
                    }
                    className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${
                      imageInputMode[selectedKey] === 'url'
                        ? 'bg-[#00E5FF] text-[#0A192F] font-bold'
                        : 'text-[#8892B0] hover:text-[#E6F1FF]'
                    }`}
                  >
                    URL
                  </button>
                </div>
              </div>

              {/* Live Preview Container (Matches exact aspect ratio on live site) */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#00E5FF]/40 bg-[#112240] shadow-inner group">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = meta.defaultImage;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent flex items-end p-3">
                  <div className="text-[11px] text-[#E6F1FF] font-medium truncate">
                    {current.title}
                  </div>
                </div>
              </div>

              {/* Input: Upload or URL */}
              {imageInputMode[selectedKey] === 'upload' ? (
                <div>
                  <input
                    ref={fileInputRefs[selectedKey]}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(selectedKey, e)}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRefs[selectedKey].current?.click()}
                      className="flex-1 py-2 px-3 rounded-lg bg-[#112240] hover:bg-[#1b325c] border border-[#233554] hover:border-[#00E5FF]/40 text-xs text-[#E6F1FF] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>Chọn ảnh từ máy...</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResetImage(selectedKey)}
                      className="py-2 px-3 rounded-lg bg-[#112240] hover:bg-[#1b325c] border border-[#233554] text-xs text-[#8892B0] hover:text-[#E6F1FF] cursor-pointer"
                      title="Khôi phục ảnh mẫu mặc định"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-[#8892B0] mt-1.5 text-center">
                    Hỗ trợ PNG, JPG, WebP (Tỷ lệ khuyến nghị 16:10 hoặc 4:3)
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative">
                    <LinkIcon className="w-3.5 h-3.5 text-[#8892B0] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={current.image}
                      onChange={(e) => handleFieldChange(selectedKey, 'image', e.target.value)}
                      placeholder="https://... hoặc ./assets/..."
                      className="w-full bg-[#112240] border border-[#233554] rounded-lg pl-8 pr-3 py-2 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleResetImage(selectedKey)}
                    className="w-full py-1.5 rounded-lg bg-[#112240] hover:bg-[#1b325c] text-[11px] text-[#8892B0] hover:text-[#E6F1FF] border border-[#233554] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Khôi phục ảnh mẫu mặc định</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
