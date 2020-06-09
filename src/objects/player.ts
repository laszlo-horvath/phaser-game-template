import { State } from 'objects/state-machine';
import { getPointerFromScene } from 'prefabs/helper';
import { JUMP_FORCE } from 'config/game-settings';

class IdleState implements State {
  enter(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite) {
    player.setVelocity(0);
    player.anims.stop();
  }

  execute(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite) {
    let pointer = getPointerFromScene(scene);

    // Transition to jump
    if (pointer && pointer.isDown) {
      (this as any).stateMachine.transition(States.JUMP);
      return;
    }
  }
}

class JumpState implements State {
  enter() {
    // Do nothing
  }

  execute(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite) {
    player.play(Animations.JUMP);
    player.setVelocityY(-JUMP_FORCE);

    (this as any).stateMachine.transition(States.IDLE);
    return;
  }
}

enum Animations {
  JUMP = 'JUMP'
}

enum States {
  IDLE = 'IDLE',
  JUMP = 'JUMP'
}

export {
  States,
  IdleState,
  JumpState,
  Animations,
}

