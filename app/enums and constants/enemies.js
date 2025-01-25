export const ENEMIE_CONSTANTS = {
  CLIMBING: {
    WIDTH: 120,
    HEIGHT: 144,
    SPEED_Y_OPTIONS: [1, -1],
    MAX_FRAME: 5,
    IMAGE: "enemyBigSpider",
    DRAW_LINE_OFFSET: 50,
  },
  FLYING: {
    WIDTH: 60,
    HEIGHT: 44,
    SPEED_X: 2,
    ANGLE_VA_MIN: 0.1,
    ANGLE_VA_MAX: 0.2,
    MAX_FRAME: 5,
    IMAGE: "enemyFly",
  },
  GROUND: {
    WIDTH: 60,
    HEIGHT: 87,
    SPEED_X: 0,
    SPEED_Y: 0,
    MAX_FRAME: 1,
    IMAGE: "enemyPlant",
  },
};
