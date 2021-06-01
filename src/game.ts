import { config } from 'config/game-config';

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
};

export const createGame = () => {
  const game = new Game(config);
  console.log('Game created.', game);

  return game;
};
