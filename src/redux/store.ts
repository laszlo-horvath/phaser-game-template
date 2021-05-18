import { createStore, applyMiddleware, AnyAction } from 'redux'
import logger from 'redux-logger';
import * as immutableStateInvariant from 'redux-immutable-state-invariant';

import { SOUND_SET, SOUND_TOGGLE } from './actions'

interface StoreAction extends AnyAction {
  payload?: any;
};

const initialState = { sound: false };

function counterReducer(state = initialState, { type, payload }: StoreAction) {
  switch (type) {
    case SOUND_SET:
      return { sound: !state.sound };
    case SOUND_TOGGLE:
      return { sound: payload.sound };
    default:
      return state;
  }
}

let store = createStore(
  counterReducer,
  applyMiddleware(
    logger,
    immutableStateInvariant.default()
  )
);

export { store };
