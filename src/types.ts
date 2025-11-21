export interface Card {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export interface ReadingResult {
  cardId: number;
  message: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  SHUFFLING = 'SHUFFLING',
  DRAWING = 'DRAWING',
  ANALYZING = 'ANALYZING', // Decoding Process
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}