import { Scenes } from 'scenes/keys'
import { initErrorReporting, initAnalytics } from './reporting';
import { createGame, Game } from './game';

let game: Game;
let gameScene: Phaser.Scene;

export const onDeviceReady = () => {
  // pause game
  document.addEventListener('pause', onPause);

  // resume game
  document.addEventListener('resume', onResume);

  initErrorReporting();

  initAnalytics();

  game = createGame();
};

const onPause = () => {
  const activeScenes = game.scene.getScenes(true);
  activeScenes.forEach(scene => {
    const isGameScene = scene.scene.key === Scenes.GAME;
    if (isGameScene) {
      gameScene = scene;

      // @ts-ignore
      gameScene.pauseGame();
    }
  });
};

const onResume = () => {
  // iOS Quirks:
  // When called from a resume event handler, interactive functions such as alert()
  // need to be wrapped in a setTimeout() call with a timeout value of zero, or else the app hangs.
  setTimeout(() => {
    if (gameScene) {
      // @ts-ignore
      gameScene.resumeGame();
    }
  }, 0);
};
