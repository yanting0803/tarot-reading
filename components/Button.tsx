import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-3 font-mono text-sm tracking-wider transition-all duration-200 relative overflow-hidden group active:scale-95";
  
  const variants = {
    primary: "bg-cyber-cyan text-black font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] clip-path-slant",
    outline: "bg-transparent border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Tech decoration corners */}
      {variant !== 'ghost' && (
        <>
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-50" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-50" />
        </>
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};