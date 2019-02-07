import { Scenes } from './keys';
import { Fonts } from './../assets/fonts/keys';
import { Sounds } from './../assets/audio/keys';
import { Sprites } from './../assets/sprites/keys';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: Scenes.PRELOAD
    });
  }

  preload() {
    // Fonts
    this.load.bitmapFont(Fonts.MAIN, 'assets/fonts/vcr-osd-mono/vcr-osd-mono.png', 'assets/fonts/vcr-osd-mono/vcr-osd-mono.fnt');

    // Audio
    this.load.audio(Sounds.CLICK, 'assets/audio/click.mp3');
    this.load.audio(Sounds.QUIT, 'assets/audio/quit.mp3');

    // Sprites
    this.load.spritesheet(Sprites.VOLUME, 'assets/sprites/volume.png', { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    console.log(`create ${Scenes.PRELOAD}`);
    this.scene.start(Scenes.MENU);
  }

  shutdown() {
    console.log(`shutdown ${Scenes.PRELOAD}`);
  }
}
