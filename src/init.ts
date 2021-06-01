import { isCordova } from 'prefabs/platform';
import { onDeviceReady } from './cordova';
import { createGame } from './game';

if (isCordova()){
  // Mobile app
  document.addEventListener('deviceready', onDeviceReady);
} else {
  // Web browser
  window.addEventListener('load', createGame);
}
