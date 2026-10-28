import React from 'react';

/**
 * High-tech Dark Mode Ambient Lighting Drops:
 * - Orb Top-Left: radial-gradient Electric Cyan #00F0FF (8% opacity), blur 120px
 * - Orb Bottom-Right: radial-gradient Cyber Orange #FF6B00 (6% opacity), blur 150px
 */
export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Top-Left Electric Cyan Orb */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[650px] h-[650px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, rgba(0, 240, 255, 0) 70%)',
          filter: 'blur(120px)',
          transform: 'translate3d(0,0,0)',
        }}
      />
      
      {/* Bottom-Right Cyber Orange Orb */}
      <div
        className="absolute -bottom-[15%] -right-[10%] w-[750px] h-[750px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 0, 0.06) 0%, rgba(255, 107, 0) 0 70%)',
          filter: 'blur(150px)',
          transform: 'translate3d(0,0,0)',
        }}
      />

      {/* Subtle fine cybernetic grid texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
