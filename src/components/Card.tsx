import React from 'react';

interface CardProps {
  id: number;
  x: number;
  y: number;
  rotation: number;
  hue: number; // For rainbow effect
  onClick: (id: number) => void;
  isHoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ id, x, y, rotation, hue, onClick, isHoverable = true }) => {
  return (
    <div
      className="absolute w-12 h-20 md:w-16 md:h-24 cursor-pointer transition-all duration-700 ease-out will-change-transform"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg)`,
        zIndex: 100 + id,
      }}
      onClick={() => onClick(id)}
    >
      <div 
        className={`
          w-full h-full rounded-lg relative group overflow-hidden transition-transform duration-200
          bg-cyber-900 border border-white/20
          ${isHoverable ? 'hover:scale-150 hover:z-[200] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)]' : ''}
        `}
        style={{
          boxShadow: isHoverable 
            ? `0 0 15px hsla(${hue}, 70%, 50%, 0.4), inset 0 0 5px hsla(${hue}, 70%, 50%, 0.2)` 
            : `0 0 2px hsla(${hue}, 50%, 30%, 0.5)`
        }}
      >
        {/* Holographic Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{ 
            background: `linear-gradient(135deg, transparent, hsla(${hue}, 80%, 60%, 0.4), transparent)` 
          }}
        />

        {/* Chip Circuit Lines */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 20%, #000 20%)', backgroundSize: '2px 2px' }}></div>
        
        {/* Central Soul Core Symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="relative w-6 h-6 rounded-full border border-white/40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: `hsl(${hue}, 100%, 70%)`, boxShadow: `0 0 10px hsl(${hue}, 100%, 70%)` }}
              />
           </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </div>
    </div>
  );
};