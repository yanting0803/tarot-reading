import React from 'react';
import { Button } from './Button';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToDeck = () => {
    document.getElementById('deck')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10 bg-cyber-950">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern cyber-grid opacity-30 pointer-events-none" />
      
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 border border-cyber-cyan/30 bg-cyber-cyan/5 px-4 py-1.5 rounded-full mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
          </span>
          <span className="text-xs font-medium text-cyber-cyan tracking-widest">系統就緒</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-tight">
          會塔羅的工程師
        </h1>
        
        <h2 className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
          用邏輯拆解迷惘，用靈性點亮方向
        </h2>
        
        <p className="text-base md:text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
          不談複雜的玄學術語，只給你最直接的系統優化建議。<br/>
          讓我幫你讀出靈魂的底層程式碼。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={scrollToDeck}>
             開始靈魂檢測
          </Button>
          <Button variant="outline" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            關於我
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-cyber-slate">
        <ChevronDown size={24} />
      </div>
    </div>
  );
};