export const getRandomX = (CANVAS_WIDTH: number, SPRITE_WIDTH: number) => {
  let randomX = Phaser.Math.Between(0, CANVAS_WIDTH);

  const MIN_X = SPRITE_WIDTH / 2;
  const MAX_X = CANVAS_WIDTH - MIN_X;

  if (randomX < MIN_X) {
    console.log('fixing with MIN_X');
    randomX = MIN_X;
  }

  if (randomX > MAX_X) {
    console.log('fixing with MAX_X');
    randomX = MAX_X;
  }

  return randomX;
};

export const getRandomY = (CANVAS_HEIGHT: number, SPRITE_HEIGHT: number) => {
  let randomY = Phaser.Math.Between(0, CANVAS_HEIGHT);

  const MIN_Y = SPRITE_HEIGHT / 2;
  const MAX_Y = CANVAS_HEIGHT - MIN_Y;

  if (randomY < MIN_Y) {
    console.log('fixing with MIN_Y');
    randomY = MIN_Y;
  }

  if (randomY > MAX_Y) {
    console.log('fixing with MAX_Y');
    randomY = MAX_Y;
  }

  return randomY;
};
