import { SafeZone } from 'typings/intefaces';

export const calculateCanvasSize = () => {
  const TARGET_HEIGHT = 800;

  let width = window.innerWidth * window.devicePixelRatio;
  let height = window.innerHeight * window.devicePixelRatio;

  if (height > TARGET_HEIGHT) {
    const div = height / TARGET_HEIGHT;
    width = width / div;
    height = TARGET_HEIGHT;
  }

  return {
    width,
    height
  }
};

let safeZone!: SafeZone;
export const getSafeZone = (): SafeZone => {
  if (safeZone) {
    return safeZone;
  }

  const { width: CANVAS_WIDTH, height: CANVAS_HEIGHT } = calculateCanvasSize();
  const scaleFactor = window.devicePixelRatio / 3;

  safeZone = {
    x: 0,
    y: 0,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  };

  const heightWidthRatio = 1.9;
  const currentHeightWidthRatio = CANVAS_HEIGHT / CANVAS_WIDTH;
  if (currentHeightWidthRatio > heightWidthRatio) {
    safeZone.height = CANVAS_WIDTH * heightWidthRatio;
    safeZone.y = (CANVAS_HEIGHT - safeZone.height) / 2;
  } else {
    safeZone.width = CANVAS_HEIGHT / heightWidthRatio;
    safeZone.x = (CANVAS_WIDTH - safeZone.width) / 2;
  }

  // Center on screen
  safeZone.x = safeZone.x + safeZone.width / 2;
  safeZone.y = safeZone.y + safeZone.height / 2;

  return safeZone;
}
