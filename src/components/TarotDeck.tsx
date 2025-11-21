import React, { useState, useEffect, useRef } from 'react';
import { Card } from './Card';
import { Card as CardType, LoadingState, ReadingResult } from '../types';
import { getSoulMessage } from '../services/geminiService';
import { ReadingResultModal } from './ReadingResultModal';
import { Loader2, Sparkles } from 'lucide-react';

const TOTAL_CARDS = 55;

export const TarotDeck: React.FC = () => {
  const [cards, setCards] = useState<(CardType & { hue: number })[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const initializeDeck = () => {
    const newCards: (CardType & { hue: number })[] = [];
    const goldenAngle = 137.508; // The Golden Angle
    const c = 28; // Spread factor (increase to spread cards further apart)

    for (let i = 0; i < TOTAL_CARDS; i++) {
      // Phyllotaxis Spiral Formula
      const angleDeg = i * goldenAngle;
      const angleRad = (angleDeg * Math.PI) / 180;
      const radius = c * Math.sqrt(i);

      const x = radius * Math.cos(angleRad);
      const y = radius * Math.sin(angleRad);

      // Rotation: Point outward from center +90 degrees for "petal" look
      // Or just use the angleDeg for a swirling look.
      const rotation = angleDeg - 90; 

      // Hue: Spiral gradient
      const hue = (i * 5 + 200) % 360; // Start from purples/blues

      newCards.push({
        id: i + 1,
        x,
        y,
        rotation,
        hue
      });
    }
    setCards(newCards);
  };

  useEffect(() => {
    initializeDeck();
  }, []);

  const handleCardClick = async (id: number) => {
    if (loadingState !== LoadingState.IDLE) return;

    setLoadingState(LoadingState.DRAWING);
    setSelectedCardId(id);

    // Simulate delay
    setTimeout(async () => {
      setLoadingState(LoadingState.ANALYZING);
      try {
        const reading = await getSoulMessage(id);
        setResult({
          cardId: id,
          message: reading.message
        });
        setLoadingState(LoadingState.COMPLETE);
      } catch (e) {
        setLoadingState(LoadingState.ERROR);
      }
    }, 1000);
  };

  const handleCloseModal = () => {
    // Trigger Shuffle Logic
    setLoadingState(LoadingState.SHUFFLING);
    setResult(null);
    
    // Shuffle Animation Effect: Retract cards to center then respawn
    setCards(prev => prev.map(c => ({ ...c, x: 0, y: 0, rotation: 0 })));
    
    setTimeout(() => {
      initializeDeck(); // Respawn spiral with random hues/positions effectively recreated
      setLoadingState(LoadingState.IDLE);
    }, 800);
  };

  return (
    <section id="deck" className="py-16 min-h-[80vh] relative overflow-hidden flex flex-col items-center justify-center bg-cyber-950">
      
      <div className="text-center mb-8 z-10 px-4 relative">
        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-cyber-cyan" />
          靈魂指引
          <Sparkles className="w-5 h-5 text-cyber-cyan" />
        </h2>
        <p className="text-gray-300 max-w-md mx-auto text-sm leading-relaxed">
          神聖幾何正在運算你的能量場...<br/>
          直覺點擊一張「靈魂晶片」
        </p>
      </div>

      {/* Deck Container - Increased height for spiral */}
      <div className="relative w-full max-w-3xl h-[500px] md:h-[600px] flex justify-center items-center perspective-1000">
         
         {/* Background Spiral Decoration */}
         <div className="absolute w-[600px] h-[600px] border border-cyber-cyan/5 rounded-full animate-[spin_60s_linear_infinite]" />
         <div className="absolute w-[400px] h-[400px] border border-cyber-purple/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

         {/* Loading Overlay */}
         {(loadingState === LoadingState.ANALYZING || loadingState === LoadingState.SHUFFLING) && (
           <div className="absolute inset-0 z-[300] flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px] rounded-full">
             <Loader2 className="w-10 h-10 text-cyber-cyan animate-spin mb-4" />
             <p className="text-cyber-cyan font-mono text-sm tracking-widest bg-black/50 px-4 py-1 rounded">
               {loadingState === LoadingState.SHUFFLING ? '系統重置中...' : '靈魂解碼中...'}
             </p>
           </div>
         )}

         <div className={`relative w-full h-full transition-all duration-700 ${loadingState === LoadingState.SHUFFLING ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`} ref={containerRef}>
            {cards.map((card) => (
              <Card 
                key={card.id}
                {...card}
                onClick={handleCardClick}
                isHoverable={loadingState === LoadingState.IDLE}
              />
            ))}
         </div>
      </div>
      
      <div className="mt-4 text-gray-400 text-xs font-mono">
         * 每次抽完自動重組矩陣，保持能量流動
      </div>

      <ReadingResultModal 
        isOpen={loadingState === LoadingState.COMPLETE} 
        onClose={handleCloseModal}
        result={result}
        cardId={selectedCardId}
      />
      
    </section>
  );
};