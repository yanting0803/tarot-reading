
import React, { useState, useEffect, useRef } from 'react';
import { Card } from './Card';
import { Card as CardType, LoadingState, ReadingResult } from '../types';
import { getSoulMessage } from '../services/geminiService';
import { ReadingResultModal } from './ReadingResultModal';
import { Sparkles } from 'lucide-react';

const TOTAL_CARDS = 55;

export const TarotDeck: React.FC = () => {
  const [cards, setCards] = useState<(CardType & { hue: number })[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  
  // Ref to track if we are mounted to prevent state updates on unmount
  const isMounted = useRef(true);

  const initializeDeck = () => {
    const newCards: (CardType & { hue: number })[] = [];
    const goldenAngle = 137.508; 
    // Adjusted spread for better mobile view (tighter spiral)
    const c = window.innerWidth < 768 ? 18 : 24; 

    for (let i = 0; i < TOTAL_CARDS; i++) {
      const angleDeg = i * goldenAngle;
      const angleRad = (angleDeg * Math.PI) / 180;
      const radius = c * Math.sqrt(i);

      const x = radius * Math.cos(angleRad);
      const y = radius * Math.sin(angleRad);
      const rotation = angleDeg - 90; 
      const hue = (i * 8 + 200) % 360;

      newCards.push({ id: i + 1, x, y, rotation, hue });
    }
    setCards(newCards);
  };

  useEffect(() => {
    initializeDeck();
    // Handle resize to adjust spiral density
    const handleResize = () => initializeDeck();
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
        isMounted.current = false;
    };
  }, []);

  const handleCardClick = async (id: number) => {
    if (loadingState !== LoadingState.IDLE) return;

    // 1. Visual Feedback: Select card immediately
    setSelectedCardId(id);
    setLoadingState(LoadingState.DRAWING);

    // 2. Wait for animation (card flying to center)
    setTimeout(async () => {
      if (!isMounted.current) return;
      setLoadingState(LoadingState.ANALYZING);
      
      try {
        const reading = await getSoulMessage(id);
        if (isMounted.current) {
          setResult({
            cardId: id,
            message: reading.message
          });
          setLoadingState(LoadingState.COMPLETE);
        }
      } catch (e) {
        if (isMounted.current) setLoadingState(LoadingState.ERROR);
      }
    }, 1200); // Slightly longer to enjoy the visual transformation
  };

  const handleCloseModal = () => {
    setLoadingState(LoadingState.SHUFFLING);
    setResult(null);
    setSelectedCardId(null);
    
    // Simple reset delay
    setTimeout(() => {
      if (isMounted.current) {
          setLoadingState(LoadingState.IDLE);
      }
    }, 600);
  };

  return (
    <section id="deck" className="py-12 min-h-[70vh] relative overflow-hidden flex flex-col items-center justify-center bg-cyber-950">
      
      <div className="text-center mb-4 z-10 px-4 relative pointer-events-none">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-cyber-cyan" />
          靈魂指引
          <Sparkles className="w-5 h-5 text-cyber-cyan" />
        </h2>
        <p className="text-gray-400 text-sm tracking-wider opacity-80">
            {loadingState === LoadingState.IDLE && "點擊晶片 · 讀取意識"}
            {loadingState === LoadingState.DRAWING && "正在鎖定目標..."}
            {loadingState === LoadingState.ANALYZING && "解析靈魂數據..."}
            {loadingState === LoadingState.SHUFFLING && "重組矩陣..."}
        </p>
      </div>

      {/* Deck Container */}
      <div className="relative w-full max-w-3xl h-[500px] flex justify-center items-center perspective-1000">
         
         {/* Background Decoration - Optimized: Removed complex CSS animation for performance */}
         <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

         {/* Card Layer */}
         <div className="relative w-full h-full flex items-center justify-center">
            {cards.map((card) => (
              <Card 
                key={card.id}
                {...card}
                onClick={handleCardClick}
                // Optimization: Only pass necessary boolean flags
                isActive={loadingState === LoadingState.IDLE}
                isSelected={selectedCardId === card.id}
                isDimmed={selectedCardId !== null && selectedCardId !== card.id}
              />
            ))}
         </div>
      </div>

      <ReadingResultModal 
        isOpen={loadingState === LoadingState.COMPLETE} 
        onClose={handleCloseModal}
        result={result}
        cardId={selectedCardId || 0}
      />
      
    </section>
  );
};
