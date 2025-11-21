
import { SOUL_MESSAGES } from '../constants';

export const getSoulMessage = async (_cardId: number): Promise<{ message: string }> => {
  // Simulate "decoding" latency for effect
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly select a message regardless of cardId to ensure randomness
      const index = Math.floor(Math.random() * SOUL_MESSAGES.length);
      const message = SOUL_MESSAGES[index];
      
      resolve({
        message: message || "系統校準中...請重新抽牌"
      });
    }, 1000); // 1s delay for "processing" feel
  });
};
