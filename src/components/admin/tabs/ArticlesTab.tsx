import React, { useState, useRef } from 'react';
import { useContent } from '../../../context/ContentContext';
import { ArticleItem } from '../../../types/content';
import { readFileAsDataUrl } from '../../../utils/imageUpload';
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Link as LinkIcon,
  Search,
  Check,
  X,
  FileText,
  Calendar,
  Clock,
  Tag,
  AlertTriangle,
} from 'lucide-react';

export const ArticlesTab: React.FC = () => {
  const { articles, addArticle, updateArticle, deleteArticle } = useContent();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Giải pháp',
    date: new Date().toLocaleDateString('vi-VN'),
    readTime: '3 phút đọc',
    excerpt: '',
    fullContent: '',
    thumbnail: './assets/s4_thumb_solution_01.jpg',
    altText: '',
  });

  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload');
  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = Array.from(new Set(articles.map((a) => a.category)));

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingArticleId(null);
    setFormData({
      title: '',
      category: 'Giải pháp',
      date: new Date().toLocaleDateString('vi-VN'),
      readTime: '3 phút đọc',
      excerpt: '',
      fullContent: '',
      thumbnail: './assets/s4_thumb_solution_01.jpg',
      altText: '',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (article: ArticleItem) => {
    setEditingArticleId(article.id);
    setFormData({
      title: article.title,
      category: article.category,
      date: article.date,
      readTime: article.readTime,
      excerpt: article.excerpt,
      fullContent: article.fullContent,
      thumbnail: article.thumbnail,
      altText: article.altText || article.title,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setFormError(null);
      const dataUrl = await readFileAsDataUrl(file);
      setFormData((prev) => ({ ...prev, thumbnail: dataUrl }));
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Lỗi tải ảnh');
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError('Vui lòng nhập tiêu đề bài viết');
      return;
    }
    if (!formData.fullContent.trim()) {
      setFormError('Vui lòng nhập nội dung chi tiết bài viết');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        ...formData,
        altText: formData.altText || formData.title,
        excerpt: formData.excerpt || formData.fullContent.slice(0, 140) + '...',
      };

      if (editingArticleId) {
        await updateArticle(editingArticleId, payload);
      } else {
        await addArticle(payload);
      }

      setIsModalOpen(false);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Lỗi khi lưu lên cơ sở dữ liệu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsSubmitting(true);
      await deleteArticle(id);
      setDeleteConfirmId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action strip */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0A192F] border border-[#233554]">
        {/* Search & Filter */}
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#8892B0] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="w-full bg-[#112240] border border-[#233554] rounded-lg pl-9 pr-3 py-2 text-xs text-[#E6F1FF] placeholder-[#8892B0]/60 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs py-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#00E5FF] text-[#0A192F] font-bold'
                  : 'bg-[#112240] text-[#8892B0] hover:text-[#E6F1FF] border border-[#233554]'
              }`}
            >
              Tất cả ({articles.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#00E5FF] text-[#0A192F] font-bold'
                    : 'bg-[#112240] text-[#8892B0] hover:text-[#E6F1FF] border border-[#233554]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Add Article Button */}
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] text-xs font-bold text-[#0A192F] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm bài viết mới</span>
        </button>
      </div>

      {/* Articles List / Table */}
      <div className="rounded-[20px] bg-[#112240] border border-[#233554] shadow-deep-ocean overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0A192F]/80 text-[#8892B0] border-b border-[#233554] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4 w-20">Ảnh bìa</th>
                <th className="py-3 px-4">Tiêu đề bài viết</th>
                <th className="py-3 px-4 w-32">Chuyên mục</th>
                <th className="py-3 px-4 w-28">Ngày đăng</th>
                <th className="py-3 px-4 w-24">Thời gian</th>
                <th className="py-3 px-4 w-28 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#233554]">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#8892B0]">
                    Không tìm thấy bài viết nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-[#1b325c]/50 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-[#0A192F] border border-[#233554] shrink-0">
                        <img
                          src={art.thumbnail}
                          alt={art.altText || art.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = './assets/s4_thumb_solution_01.jpg';
                          }}
                        />
                      </div>
                    </td>

                    {/* Title & Excerpt */}
                    <td className="py-3 px-4 max-w-md">
                      <span className="font-semibold text-sm text-[#E6F1FF] block mb-1 line-clamp-1">
                        {art.title}
                      </span>
                      <span className="text-[11px] text-[#8892B0] line-clamp-1">
                        {art.excerpt}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="text-[#00E5FF] font-medium">
                        {art.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-[#8892B0]">
                      {art.date}
                    </td>

                    {/* Read Time */}
                    <td className="py-3 px-4 whitespace-nowrap text-[#8892B0]">
                      {art.readTime}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(art)}
                          className="p-1.5 rounded-lg text-[#8892B0] hover:text-[#00E5FF] hover:bg-[#0A192F] transition-colors cursor-pointer"
                          title="Chỉnh sửa bài viết"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(art.id)}
                          className="p-1.5 rounded-lg text-[#8892B0] hover:text-red-400 hover:bg-[#0A192F] transition-colors cursor-pointer"
                          title="Xóa bài viết"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-rise">
          <div className="bg-[#112240] border border-red-500/40 rounded-[20px] p-6 max-w-sm w-full shadow-deep-ocean">
            <div className="flex items-center gap-3 text-red-400 mb-3">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-semibold text-base text-[#E6F1FF]">
                Xác nhận xóa bài viết?
              </h3>
            </div>
            <p className="text-xs text-[#8892B0] leading-relaxed mb-6">
              Hành động này sẽ xóa vĩnh viễn bài viết khỏi hệ thống và trang hiển thị cho người dùng.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg bg-[#0A192F] hover:bg-[#1b325c] text-xs text-[#8892B0] hover:text-[#E6F1FF] border border-[#233554] cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs text-white font-semibold cursor-pointer shadow-md"
              >
                Xóa bài viết
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#112240] border border-[#233554] rounded-[20px] max-w-3xl w-full my-8 p-6 sm:p-8 shadow-deep-ocean relative text-[#E6F1FF]">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#233554]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00E5FF]" />
                <h3 className="font-display text-lg text-[#E6F1FF] font-normal">
                  {editingArticleId ? 'Chỉnh Sửa Bài Viết' : 'Thêm Bài Viết Mới'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-[#8892B0] hover:text-[#E6F1FF] hover:bg-[#0A192F] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-5 p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-[#8892B0] mb-1.5">
                  Tiêu đề bài viết *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Ví dụ: HUBI LOGISTICS – Tối ưu chi phí giao nội khu..."
                  className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3.5 py-2.5 text-sm text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              {/* Grid: Category, Date, Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8892B0] mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Chuyên mục / Thẻ *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                    placeholder="Giải pháp, Xu hướng..."
                    className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8892B0] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Ngày đăng</span>
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                    className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8892B0] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Thời gian đọc</span>
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData((p) => ({ ...p, readTime: e.target.value }))}
                    placeholder="3 phút đọc"
                    className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>
              </div>

              {/* Thumbnail Image Picker & Preview */}
              <div className="p-4 rounded-xl bg-[#0A192F] border border-[#233554]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#E6F1FF]">
                    Ảnh đại diện bài viết (Thumbnail)
                  </span>
                  <div className="flex items-center gap-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setImageInputMode('upload')}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        imageInputMode === 'upload' ? 'bg-[#112240] text-[#00E5FF] font-medium' : 'text-[#8892B0]'
                      }`}
                    >
                      Tải lên tệp
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode('url')}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        imageInputMode === 'url' ? 'bg-[#112240] text-[#00E5FF] font-medium' : 'text-[#8892B0]'
                      }`}
                    >
                      Đường dẫn URL
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded-lg overflow-hidden bg-[#112240] border border-[#233554] shrink-0">
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = './assets/s4_thumb_solution_01.jpg';
                      }}
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    {imageInputMode === 'upload' ? (
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="py-2 px-3 rounded-lg bg-[#112240] hover:bg-[#1b325c] border border-[#233554] text-xs text-[#E6F1FF] flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Upload className="w-4 h-4 text-[#00E5FF]" />
                          <span>Tải ảnh từ thiết bị</span>
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <LinkIcon className="w-3.5 h-3.5 text-[#8892B0] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.thumbnail}
                          onChange={(e) => setFormData((p) => ({ ...p, thumbnail: e.target.value }))}
                          placeholder="https://... hoặc ./assets/..."
                          className="w-full bg-[#112240] border border-[#233554] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                        />
                      </div>
                    )}
                    <input
                      type="text"
                      value={formData.altText}
                      onChange={(e) => setFormData((p) => ({ ...p, altText: e.target.value }))}
                      placeholder="Văn bản thay thế (Alt text mô tả ảnh)..."
                      className="w-full bg-[#112240] border border-[#233554] rounded-lg px-3 py-1.5 text-xs text-[#8892B0] focus:text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                    />
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-[#8892B0] mb-1.5">
                  Tóm tắt ngắn (Excerpt)
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData((p) => ({ ...p, excerpt: e.target.value }))}
                  placeholder="Đoạn văn ngắn xuất hiện trên thẻ bìa bài viết..."
                  className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-2 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-xs font-semibold text-[#8892B0] mb-1.5">
                  Nội dung đầy đủ của bài viết *
                </label>
                <textarea
                  rows={8}
                  required
                  value={formData.fullContent}
                  onChange={(e) => setFormData((p) => ({ ...p, fullContent: e.target.value }))}
                  placeholder="Nhập toàn bộ nội dung chi tiết bài viết (hỗ trợ xuống dòng, đoạn văn)..."
                  className="w-full bg-[#0A192F] border border-[#233554] rounded-lg p-3 text-xs leading-relaxed text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF] font-sans"
                />
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#233554]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#0A192F] hover:bg-[#1b325c] text-xs text-[#8892B0] hover:text-[#E6F1FF] border border-[#233554] cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] disabled:opacity-60 disabled:cursor-not-allowed text-xs font-bold text-[#0A192F] flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,229,255,0.4)] cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? 'Đang đồng bộ Cloud...'
                      : editingArticleId
                      ? 'Lưu bài viết'
                      : 'Đăng bài viết'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
