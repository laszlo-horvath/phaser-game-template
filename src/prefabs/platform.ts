export const isCordova = () => {
  return window.hasOwnProperty('cordova');
};

export const isGameAnalytics = () => {
  return window.hasOwnProperty('GameAnalytics');
};
