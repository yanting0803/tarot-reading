import React from 'react';
import { X, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from './Button';
import { ReadingResult } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  result: ReadingResult | null;
  cardId: number;
}

export const ReadingResultModal: React.FC<Props> = ({ isOpen, onClose, result, cardId }) => {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-cyber-900 border border-cyber-cyan/30 rounded-2xl max-w-md w-full p-1 shadow-[0_0_40px_rgba(0,243,255,0.1)] animate-float overflow-hidden">
        
        {/* Header */}
        <div className="bg-cyber-950/50 px-6 py-4 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></div>
            <span className="font-mono text-xs text-cyber-cyan tracking-widest">分析完成</span>
          </div>
          <button onClick={onClose} className="text-cyber-slate hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 flex flex-col items-center text-center space-y-6 bg-gradient-to-b from-cyber-800/50 to-transparent">
          
          <div className="w-16 h-16 rounded-full bg-cyber-cyan/10 flex items-center justify-center border border-cyber-cyan/20 text-cyber-cyan font-mono text-xl font-bold">
            {cardId}
          </div>

          <div className="w-full">
            <h3 className="text-cyber-slate text-sm font-medium mb-4 uppercase tracking-wider">
              // 靈魂訊息
            </h3>
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
              「{result.message}」
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2"></div>

          <div className="w-full space-y-3">
            <p className="text-sm text-gray-300">
              這句話只是冰山一角，想知道如何應用在生活中嗎？
            </p>
            
            <Button 
              className="w-full flex items-center justify-center gap-2" 
              onClick={() => {
                // Scroll to contact AND trigger onClose (which triggers shuffle in TarotDeck)
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                onClose();
              }}
            >
              <MessageSquare size={16} />
              預約深度解牌
              <ArrowRight size={16} />
            </Button>
            
            <p className="text-xs text-gray-400">
              * 初次體驗 自由樂捐
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};