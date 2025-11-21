import React from 'react';
import { Code, Sparkles, Terminal, Cpu } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-cyber-950 relative border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-center">
          
          {/* Visual Element */}
          <div className="relative group">
             <div className="absolute -inset-4 bg-gradient-to-tr from-cyber-cyan to-cyber-purple opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
             <div className="relative aspect-[4/5] max-w-xs mx-auto bg-cyber-900 border border-cyber-cyan/30 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
                {/* 
                   TODO: 請替換下方 src 網址為您的個人照。
                   建議將照片上傳至 https://imgur.com/，然後複製 "Direct Link" (結尾是 .jpg 或 .png 的網址) 貼在下面。
                   Google Drive 連結通常會因為權限問題無法直接顯示。
                */}
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80" 
                  alt="Tarot Engineer" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
                />
                
                {/* Overlay Gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-950 via-transparent to-transparent"></div>
                
                {/* Identity Label Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                   <div className="flex items-center gap-2 mb-2">
                       <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse"></div>
                       <p className="font-mono text-xs text-cyber-cyan tracking-wider font-bold shadow-black drop-shadow-md">身份識別：靈性駭客</p>
                   </div>
                   <p className="text-white font-bold text-2xl tracking-wide drop-shadow-lg">會塔羅的工程師</p>
                </div>
             </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block px-3 py-1 bg-cyber-purple/10 border border-cyber-purple/30 rounded-full text-cyber-purple text-xs font-bold mb-4">
                靈性駭客
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                以工程師的邏輯，<br/>
                讀出你靈魂的底層程式碼。
              </h2>
              <p className="text-gray-300 leading-loose text-lg">
                我是個寫 Code 的工程師，也是個解牌的塔羅師。
                <br/><br/>
                這兩者其實很像——工程師除錯 (Debug) 是為了讓系統運行順暢，
                而塔羅解牌是為了幫你找出人生卡關的 Bug，並重新部署 (Deploy) 更好的版本。
                <br/><br/>
                我不講虛無飄渺的大道理，我用邏輯與直覺，幫你找到問題的 Root Cause。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 { icon: <Code size={20}/>, title: "邏輯拆解", desc: "理性分析現狀" },
                 { icon: <Sparkles size={20}/>, title: "靈性點亮", desc: "直覺指引方向" },
                 { icon: <Cpu size={20}/>, title: "系統優化", desc: "找出人生 Bug" },
                 { icon: <Terminal size={20}/>, title: "版本更新", desc: "重啟更好生活" }
               ].map((item, idx) => (
                 <div key={idx} className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                    <div className="text-cyber-cyan mb-2">{item.icon}</div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};