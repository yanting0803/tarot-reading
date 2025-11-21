
import React, { memo } from 'react';

interface CardProps {
  id: number;
  x: number;
  y: number;
  rotation: number;
  hue: number;
  onClick: (id: number) => void;
  isActive: boolean; // Is the deck interactive?
  isSelected: boolean; // Is this specific card selected?
  isDimmed: boolean; // Should this card be faded out?
}

// Use memo to prevent re-rendering 55 cards when parent state changes unnecessarily
export const Card: React.FC<CardProps> = memo(({ 
  id, x, y, rotation, hue, onClick, isActive, isSelected, isDimmed 
}) => {
  
  // Calculate styles based on state
  const style: React.CSSProperties = isSelected 
    ? {
        // Selected State: Center of screen, large, no rotation
        transform: 'translate3d(-50%, -50%, 0) scale(2) rotate(0deg)',
        left: '50%',
        top: '50%',
        zIndex: 1000,
        opacity: 1
      }
    : {
        // Default Spiral State
        transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) rotate(${rotation}deg)`,
        left: '50%',
        top: '50%',
        zIndex: 100 + id,
        opacity: isDimmed ? 0.1 : 1, // Fade out if another card is selected
        pointerEvents: isActive ? 'auto' : 'none'
      };

  return (
    <div
      className={`
        absolute w-10 h-16 md:w-12 md:h-20 cursor-pointer will-change-transform
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
      `}
      style={style}
      onClick={() => isActive && onClick(id)}
    >
      <div 
        className={`
          w-full h-full rounded-sm relative overflow-hidden
          bg-cyber-900/80 backdrop-blur-[1px]
          border transition-all duration-300
          ${isSelected 
            ? 'border-cyber-cyan shadow-[0_0_50px_rgba(0,243,255,0.5)]' 
            : 'border-white/10 hover:border-cyber-cyan/50'
          }
        `}
        style={{
            // Use border color matching the hue for subtle variety
            borderColor: isSelected ? '#00f3ff' : `hsla(${hue}, 70%, 50%, 0.3)`
        }}
      >
        {/* Simple gradient overlay - removed complex internal divs for performance */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            background: `linear-gradient(to bottom right, transparent, hsla(${hue}, 80%, 60%, 0.5))` 
          }}
        />

        {/* Tech Lines (CSS only, no extra DOM nodes) */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20" />
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-white/20" />
        
        {/* Central Core - Only animate if selected or hovering (via CSS group) */}
        {isSelected && (
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border border-cyber-cyan/50 flex items-center justify-center animate-spin-slow">
                 <div className="w-2 h-2 bg-cyber-cyan rounded-full shadow-[0_0_10px_#00f3ff]" />
              </div>
           </div>
        )}

        {/* Hover Shine Effect - Only for active state */}
        {isActive && (
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
        )}
      </div>
    </div>
  );
});

Card.displayName = 'Card';
