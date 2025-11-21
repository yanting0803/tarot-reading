
import React from 'react';
import { Instagram, ArrowUpRight, Send } from 'lucide-react';
import { IG_ID, LINE_ID } from '../constants';

export const Contact: React.FC = () => {
  // Generate dynamic QR code URL for Line
  const lineQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://line.me/R/ti/p/${LINE_ID}`;

  return (
    <section id="contact" className="py-24 bg-cyber-950 relative overflow-hidden">
      {/* Decorative Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
          預約解牌
        </h2>
        <p className="text-cyber-slate mb-12 text-lg">
          如果剛才的靈魂指引觸動了你，<br/>
          歡迎預約更完整的個人化解讀。
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Line@ Section */}
          <div className="flex flex-col gap-4 group">
            {/* QR Code Placeholder */}
            <div className="w-full max-w-[160px] mx-auto aspect-square bg-white/5 border border-green-500/30 rounded-xl p-3 relative overflow-hidden backdrop-blur-sm shadow-[0_0_20px_rgba(74,222,128,0.05)] group-hover:shadow-[0_0_30px_rgba(74,222,128,0.2)] transition-all">
               {/* Scan Animation */}
               <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 animate-scan opacity-30 pointer-events-none z-20"></div>
               
               <div className="w-full h-full border-2 border-dashed border-green-500/20 rounded-lg flex items-center justify-center bg-black/40 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-green-500/70 font-mono text-xs tracking-wider z-10 relative bg-black/60 px-2 py-1 rounded backdrop-blur-md">
                       QR CODE
                     </span>
                  </div>
                  
                  {/* 使用 QR Code API 自動生成，保證可顯示 */}
                  <img 
                    src={lineQrUrl} 
                    className="absolute inset-0 w-full h-full object-cover z-20 bg-white" 
                    alt="Line QR Code"
                  />
               </div>
            </div>

            <a 
              href={`https://line.me/R/ti/p/${LINE_ID}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <div className="p-6 border border-white/10 bg-cyber-900 rounded-xl hover:border-green-400/50 transition-all relative overflow-hidden">
                 <div className="flex flex-col items-center">
                    <Send className="w-6 h-6 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-white mb-1">Line@ 預約</h3>
                    <p className="text-sm text-gray-400 mb-3">預約解牌 / 諮詢 / 聊聊</p>
                    <div className="flex items-center justify-center text-xs font-medium text-green-500 bg-green-500/10 px-4 py-1.5 rounded-full">
                      <span>加入好友</span>
                      <ArrowUpRight size={12} className="ml-1" />
                    </div>
                 </div>
              </div>
            </a>
          </div>

          {/* Instagram Section */}
          <div className="flex flex-col gap-4 group justify-end">
            
            <a 
              href={`https://instagram.com/${IG_ID}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <div className="p-6 border border-white/10 bg-cyber-900 rounded-xl hover:border-pink-500/50 transition-all relative overflow-hidden">
                 <div className="flex flex-col items-center">
                    <Instagram className="w-6 h-6 text-pink-500 mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-white mb-1">@{IG_ID}</h3>
                    <p className="text-sm text-gray-400 mb-3">工程師的日常觀察</p>
                    <div className="flex items-center justify-center text-xs font-medium text-pink-500 bg-pink-500/10 px-4 py-1.5 rounded-full">
                      <span>追蹤 IG</span>
                      <ArrowUpRight size={12} className="ml-1" />
                    </div>
                 </div>
              </div>
            </a>
          </div>
        </div>

        <footer className="mt-24 pt-8 border-t border-white/5 text-cyber-slate/40 text-xs">
          <p>&copy; {new Date().getFullYear()} Tarot Engineer. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
};
