import React from 'react';
import contentData from '../data/contentData.json';

interface SlideIndicatorProps {
  activeSlideId: string;
  onNavigate: (slideId: string) => void;
}

export const SlideIndicator: React.FC<SlideIndicatorProps> = ({
  activeSlideId,
  onNavigate,
}) => {
  const { navigation } = contentData;

  return (
    <aside
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-4 pointer-events-auto"
      aria-label="Chỉ mục slide"
    >
      <div className="flex flex-col items-center gap-3 py-3 px-2 rounded-full bg-[#112240]/90 backdrop-blur-md border border-[#233554] shadow-deep-ocean">
        {navigation.map((item, idx) => {
          const isActive = activeSlideId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
              aria-label={`Cuộn đến ${item.tag} - ${item.title}`}
            >
              {/* Tooltip on hover */}
              <div className="absolute right-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap bg-[#112240] text-[#E6F1FF] text-xs px-2.5 py-1 rounded-md border border-[#233554] shadow-deep-ocean flex items-center gap-2">
                <span className="font-mono text-[#00E5FF]">S{idx + 1}</span>
                <span>{item.title}</span>
              </div>

              {/* Indicator Dot */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-3 h-8 bg-[#00E5FF] shadow-[0_0_14px_#00E5FF]'
                    : 'w-2.5 h-2.5 bg-[#233554] group-hover:bg-[#8892B0]'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
};
