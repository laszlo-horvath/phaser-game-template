interface State {
  enter: (scene: Phaser.Scene, ...params: any[]) => void;
  execute: (scene: Phaser.Scene, ...params: any[]) => void;
  // exit: (scene: Phaser.Scene, ...params: any[]) => void;
  stateMachine?: StateMachine;
}

class StateMachine {
  private initialState: string;
  private possibleStates: any;
  private stateArgs: Array<any>;
  private state: string | null = null;

  constructor(initialState: string, possibleStates: Object, stateArgs: any[]) {
    this.initialState = initialState;
    this.possibleStates = possibleStates;
    this.stateArgs = stateArgs;

    // State instances get access to the state machine via this.stateMachine
    for (const state of Object.values(this.possibleStates)) {
      (state as any).stateMachine = this;
    }
  }

  step() {
    // On the first step, initialize the first state
    if (this.state === null) {
      this.state = this.initialState;
      this.possibleStates[this.state].enter(...this.stateArgs);
    }

    // Run the current state's execute
    this.possibleStates[this.state].execute(...this.stateArgs);
  }

  transition(newState: string, ...enterArgs: any[]) {
    // this.possibleStates[this.state].exit(...this.stateArgs, ...enterArgs)

    this.state = newState;
    this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs)
  }
}

export {
  StateMachine,
  State
}
