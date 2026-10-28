import React, { useRef, useEffect } from 'react';

/**
 * High-tech Video Background component:
 * - Plays seamless looping ambient background video (autoPlay, loop, muted, playsInline)
 * - Deep Space Navy (#070B14) measured gradient scrim for high-contrast legibility
 * - Ambient cybernetic glow overlays and liquid light streaks
 */
export const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85; // smooth ambient flow
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: video remains muted and ready
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen scale-105 transition-opacity duration-1000"
      >
        <source src="./assets/background_video.mp4" type="video/mp4" />
      </video>

      {/* Cybernetic Deep Ocean Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/85 via-[#0A192F]/75 to-[#0A192F]/95" />

      {/* Top-Left Radiant Cyan Glowing Light */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.14) 0%, rgba(0, 229, 255, 0) 70%)',
          filter: 'blur(120px)',
          transform: 'translate3d(0,0,0)',
        }}
      />
      
      {/* Bottom-Right Deep Ocean & Subtle Ambient Glow */}
      <div
        className="absolute -bottom-[15%] -right-[10%] w-[750px] h-[750px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(17, 34, 64, 0.6) 0%, rgba(10, 25, 47, 0) 70%)',
          filter: 'blur(150px)',
          transform: 'translate3d(0,0,0)',
        }}
      />

      {/* Subtle fine tech mesh grid */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(230,241,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(230,241,255,0.12) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
