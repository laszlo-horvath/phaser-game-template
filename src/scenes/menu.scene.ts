import { Scenes } from 'scenes/keys';
import { Fonts } from 'fonts/keys';
import { Sounds } from 'audio/keys';
import { Sprites } from 'sprites/keys';
import { store } from 'store/store';
import { SOUND_SET, SOUND_TOGGLE } from 'store/actions';

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

    const unsubscribe = store.subscribe(() => {
      console.log('[REDUX] State changed. New state:', store.getState());
    });

    store.dispatch({ type: SOUND_SET, payload: { sound: !this.game.sound.mute } });

    this.addTexts();
    this.addSprites();
  }

  addTexts() {
    const centerX = this.sys.canvas.width / 2;
    const centerY = this.sys.canvas.height / 2;

    const pressEnterText = this.add.bitmapText(centerX, centerY, Fonts.MAIN, 'PRESS ENTER TO PLAY', 45);
    pressEnterText.setX(pressEnterText.x - pressEnterText.width / 2);
    this.bitmapTexts.push(pressEnterText);
  }

  addSprites() {
    const volumeSprite = this.add.image(this.sys.canvas.width - 50, 50, Sprites.VOLUME, this.game.sound.mute ? 1 : 0);
    volumeSprite.setInteractive();

    volumeSprite.on('pointerup', () => {
      this.game.sound.mute = !this.game.sound.mute;
      volumeSprite.setFrame(this.game.sound.mute ? 0 : 1);
      store.dispatch({ type: SOUND_TOGGLE });
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
