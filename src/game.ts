
import { GRAVITY, IS_DEBUG } from 'config/game-settings';
import { calculateCanvasSize } from 'config/scaling';
import { BootScene, PreloadScene, MenuScene, GameScene } from 'scenes/index';

const { width, height } = calculateCanvasSize();

const config: Phaser.Types.Core.GameConfig = {
  title: 'Your Game',
  version: '1.0',

  // Canvas scale
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,

    parent: 'game-container',

    width,
    height,
  },

  // Automatically detect supported rendering engine to use (e.g. Canvas, WebGL)
  type: Phaser.AUTO,

   // DOM element to render the game into
  parent: 'game-container',

  // Scenes
  scene: [
    BootScene,
    PreloadScene,
    MenuScene,
    GameScene
  ],

  // Physics
  physics: {
    default: 'arcade',
    arcade: {
        gravity: {
          y: GRAVITY
        },
        debug: IS_DEBUG
    }
  }
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const game = new Game(config);
  console.log('Game created.', game);
});
