import React from 'react';

export interface ArticleData {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  fullContent: string;
  thumbnail: string;
}

interface ArticleModalProps {
  article: ArticleData | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#0A192F]/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl rounded-[20px] bg-[#112240] border border-[#00E5FF]/40 shadow-deep-ocean p-6 sm:p-8 text-[#E6F1FF] my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-lg bg-[#0A192F]/80 backdrop-blur-md text-[#8892B0] hover:text-[#E6F1FF] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E5FF] cursor-pointer"
          aria-label="Đóng bài viết"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Thumbnail banner */}
        <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden mb-6 border border-[#233554]">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-transparent to-transparent" />
        </div>

        {/* Unboxed Metadata with typographic separators */}
        <div className="flex items-center gap-2 text-xs text-[#8892B0] mb-3">
          <span className="text-[#00E5FF] font-semibold">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.date}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>

        {/* Title */}
        <h2 id="article-modal-title" className="font-display font-normal text-2xl sm:text-3xl text-[#E6F1FF] mb-4 leading-[1.4] tracking-normal">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-base font-medium text-[#E6F1FF]/90 italic mb-6 pb-6 border-b border-[#233554]">
          "{article.excerpt}"
        </p>

        {/* Body content */}
        <div className="space-y-4 text-sm sm:text-base text-[#8892B0] leading-relaxed whitespace-pre-line font-normal">
          {article.fullContent}
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-6 border-t border-[#233554] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-[10px] bg-[#0A192F] hover:bg-[#1b325c] border border-[#233554] text-[#E6F1FF] hover:text-[#00E5FF] font-semibold text-xs tracking-normal transition-colors cursor-pointer"
          >
            ĐÓNG BÀI VIẾT
          </button>
        </div>
      </div>
    </div>
  );
};
