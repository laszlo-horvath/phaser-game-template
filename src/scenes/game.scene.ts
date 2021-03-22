import { Scenes } from 'scenes/keys';
import { Fonts } from 'fonts/keys';
import { Sounds } from 'audio/keys';
// import { StateMachine } from 'objects/state-machine';
// import { States as PlayerStates, IdleState, JumpState } from 'objects/player';

export class GameScene extends Phaser.Scene {
  private quitKey!: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];
  private quitSound!: Phaser.Sound.BaseSound;
  // private playerStateMachine!: StateMachine;

  constructor() {
    super({
      key: Scenes.GAME
    });
  }

  init() {
    this.quitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.quitSound = this.sound.add(Sounds.QUIT);
  }

  create() {
    console.log(`create ${Scenes.GAME}`);

    this.addTexts();
    // this.addPlayer();

    // this.playerStateMachine = new StateMachine(PlayerStates.IDLE, {
    //   [PlayerStates.IDLE]: new IdleState(),
    //   [PlayerStates.JUMP]: new JumpState(),
    // }, [this, this.player]);
  }

  addTexts() {
    const centerX = this.sys.canvas.width / 2;
    const centerY = this.sys.canvas.height / 2;

    const yourGameText = this.add.bitmapText(centerX, centerY - 250, Fonts.MAIN, 'PLAYING...', 45);
    yourGameText.setX(yourGameText.x - yourGameText.width / 2);
    this.bitmapTexts.push(yourGameText);

    const pressEscText = this.add.bitmapText(centerX, centerY, Fonts.MAIN, 'PRESS ESCAPE TO QUIT', 45);
    pressEscText.setX(pressEscText.x - pressEscText.width / 2);
    this.bitmapTexts.push(pressEscText);
  }

  shutdown() {
    console.log(`shutdown ${Scenes.GAME}`);
  }

  update() {
    if (this.quitKey.isDown) {
      console.log('Quiting the game.');
      this.quitSound.play();
      this.scene.stop();
      this.scene.start(Scenes.MENU);
    }
  }
}
