export type GameStatus = 'WAITING' | 'IN_PROGRESS' | 'COMPLETED' | 'ABORTED';

export type GameResult = 'WHITE_WIN' | 'BLACK_WIN' | 'DRAW';

export interface Game {
  id: string;
  whitePlayerId: string;
  blackPlayerId: string;
  status: GameStatus;
  result?: GameResult;
  fen: string;
  createdAt: Date;
}

export interface Move {
  from: string;
  to: string;
  promotion?: 'q' | 'r' | 'b' | 'n';
}
