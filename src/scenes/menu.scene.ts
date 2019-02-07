import { Scenes } from './keys';
import { Fonts } from './../assets/fonts/keys';
import { Sounds } from './../assets/audio/keys';
import { Sprites } from './../assets/sprites/keys';

export class MenuScene extends Phaser.Scene {
  private startKey!: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];
  private clickSound!: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: Scenes.MENU
    });
  }

  init() {
    this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.clickSound = this.sound.add(Sounds.CLICK);
  }

  create() {
    console.log(`create ${Scenes.MENU}`);

    this.addTexts();
    this.addSprites();
  }

  addTexts() {
    var centerX = this.sys.canvas.width / 2;
    var centerY = this.sys.canvas.height / 2;

    var pressEnterText = this.add.bitmapText(centerX, centerY, Fonts.MAIN, 'PRESS ENTER TO PLAY', 45);
    pressEnterText.setX(pressEnterText.x - pressEnterText.width / 2);
    this.bitmapTexts.push(pressEnterText);
  }

  addSprites() {
    var volumeSprite = this.add.image(this.sys.canvas.width - 50, 50, Sprites.VOLUME, this.game.sound.mute ? 1 : 0);
    volumeSprite.setInteractive();

    volumeSprite.on('pointerup', () => {
      this.game.sound.mute = !this.game.sound.mute;
      volumeSprite.setFrame(this.game.sound.mute ? 0 : 1);
    });
  }

  update() {
    if (this.startKey.isDown) {
      console.log('Starting the game.');
      this.clickSound.play();
      this.scene.start(Scenes.GAME);
    }
  }

  shutdown() {
    console.log(`shutdown ${Scenes.MENU}`);
  }
}
