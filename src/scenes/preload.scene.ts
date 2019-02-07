import { Scenes } from './keys';
import { Fonts } from './../assets/fonts/keys';
import { Sounds } from './../assets/audio/keys';
import { Sprites } from './../assets/sprites/keys';

export class PreloadScene extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Graphics;
  private progressBar!: Phaser.GameObjects.Graphics;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() {
    super({
      key: Scenes.PRELOAD
    });
  }

  preload() {
    this.createLoadingBar();
    this.handleLoading();

    // Fonts
    this.load.bitmapFont(Fonts.MAIN, 'assets/fonts/vcr-osd-mono/vcr-osd-mono.png', 'assets/fonts/vcr-osd-mono/vcr-osd-mono.fnt');

    // Audio
    this.load.audio(Sounds.CLICK, 'assets/audio/click.mp3');
    this.load.audio(Sounds.QUIT, 'assets/audio/quit.mp3');

    // Sprites
    this.load.spritesheet(Sprites.VOLUME, 'assets/sprites/volume.png', { frameWidth: 32, frameHeight: 32 });
  }

  createLoadingBar() {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0xfff6d3);

    var canvasWidth = this.sys.canvas.width;
    this.loadingBar.fillRect(canvasWidth / 2 - canvasWidth / 4, this.sys.canvas.height / 1.5, canvasWidth / 2, 50);

    this.progressBar = this.add.graphics();
  }

  handleLoading() {
    this.load.on('progress', (value: number) => {
      this.progressBar.clear();
      this.progressBar.fillStyle(0x5dae47, 1);
      this.progressBar.fillRect(0, 0, 2 * value, 40);

      var canvasWidth = this.sys.canvas.width;
      this.progressBar.fillRect(canvasWidth / 2 - canvasWidth / 4 + 5, this.sys.canvas.height / 1.5 + 5, (canvasWidth / 2 - 10) * value, 50 - 10);
    });
  }

  addTexts() {
    var loadingText = this.add.bitmapText(this.sys.canvas.width / 2, this.sys.canvas.height / 2 - 150, Fonts.MAIN, 'LOADING', 45);
    loadingText.setX(loadingText.x - loadingText.width / 2);
    this.bitmapTexts.push(loadingText);
  }

  create() {
    console.log(`create ${Scenes.PRELOAD}`);

    this.addTexts();

    this.time.addEvent({
      delay: 1000,
      callback: () => { this.scene.start(Scenes.MENU); }
    });
  }

  shutdown() {
    console.log(`shutdown ${Scenes.PRELOAD}`);
  }
}
