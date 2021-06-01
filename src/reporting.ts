import { isGameAnalytics } from 'prefabs/platform';

export const initErrorReporting = () => {
  // Sentry - error reporting
  const Sentry = cordova.require('sentry-cordova.Sentry');
  Sentry.init({ dsn: 'your-sentry-url' });
};

export const initAnalytics = () => {
  if (isGameAnalytics()) {
    // GameAnalytics - analytics reporting
    // version should match pacakge.json version and git release version
    GameAnalytics.configureBuild('1.x.x');

    // There is an option to auto detect app version to use for build field.
    // Just call this before intializing the SDK:
    // GameAnalytics.configureAutoDetectAppVersion(true);

    GameAnalytics.initialize({
      gameKey: 'your-game-key',
      secretKey: 'your-secret-key'
    });
  }
};
