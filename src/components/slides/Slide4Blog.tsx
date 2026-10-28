import React, { useRef } from 'react';
import contentData from '../../data/contentData.json';
import { useContent } from '../../context/ContentContext';
import { ArticleData } from '../ArticleModal';

interface Slide4BlogProps {
  onSelectArticle: (article: ArticleData) => void;
}

export const Slide4Blog: React.FC<Slide4BlogProps> = ({ onSelectArticle }) => {
  const { slides } = contentData;
  const data = slides.s4_blog;
  const { articles } = useContent();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="slide-4"
      className="min-h-screen py-24 flex flex-col justify-center relative overflow-hidden"
      aria-label="Slide 4: Tin tức và bài viết"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header & Horizontal Scroll Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3 text-xs text-[#8892B0]">
              <span className="font-mono text-[#00E5FF] font-semibold">{data.slideNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#E6F1FF]/80">{data.primaryTitle}</span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-[#E6F1FF] tracking-normal leading-[1.4] mb-2">
              {data.secondaryTitle}
            </h2>
            <p className="text-sm text-[#8892B0] leading-[1.4] tracking-normal">
              {data.bodyContent}
            </p>
          </div>

          {/* Carousel arrow controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full bg-[#112240] border border-[#233554] hover:border-[#00E5FF] text-[#8892B0] hover:text-[#00E5FF] transition-colors cursor-pointer"
              aria-label="Cuộn sang trái"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full bg-[#112240] border border-[#233554] hover:border-[#00E5FF] text-[#8892B0] hover:text-[#00E5FF] transition-colors cursor-pointer"
              aria-label="Cuộn sang phải"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Adaptive Showcase: Horizontal Row with smooth scroll */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin focus:outline-none"
          tabIndex={0}
          aria-label="Danh sách bài viết tin tức logistics"
        >
          {articles.map((art) => (
            <article
              key={art.id}
              className="min-w-[300px] sm:min-w-[340px] md:min-w-[360px] max-w-[380px] shrink-0 snap-start p-0 rounded-[20px] bg-[#112240] border border-[#233554] shadow-deep-ocean flex flex-col justify-between overflow-hidden group hover:border-[#00E5FF]/50 hover:shadow-[0_10px_30px_-5px_rgba(0,229,255,0.2)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card Image */}
              <div className="relative aspect-video overflow-hidden border-b border-[#233554]">
                <img
                  src={art.thumbnail}
                  alt={art.altText || art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = './assets/s4_thumb_solution_01.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0A192F]/90 backdrop-blur-md border border-[#233554] text-[11px] font-semibold text-[#00E5FF] tracking-normal">
                  {art.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs text-[#8892B0] mb-2.5">
                    <span>{art.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="font-display font-normal text-xl sm:text-2xl text-[#E6F1FF] tracking-normal leading-[1.4] mb-3 group-hover:text-[#00E5FF] transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8892B0] leading-relaxed line-clamp-3 mb-6">
                    {art.excerpt}
                  </p>
                </div>

                {/* Read more button */}
                <button
                  onClick={() =>
                    onSelectArticle({
                      id: art.id,
                      title: art.title,
                      category: art.category,
                      date: art.date,
                      readTime: art.readTime,
                      thumbnail: art.thumbnail,
                      excerpt: art.excerpt,
                      fullContent: art.fullContent,
                    })
                  }
                  className="w-full py-2.5 px-4 rounded-[10px] bg-[#0A192F] hover:bg-[#1b325c] border border-[#233554] hover:border-[#00E5FF]/40 text-xs font-semibold text-[#E6F1FF] hover:text-[#00E5FF] flex items-center justify-center gap-2 transition-all cursor-pointer tracking-normal"
                >
                  <span>Đọc thêm</span>
                  <svg className="w-3.5 h-3.5 text-[#00E5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
