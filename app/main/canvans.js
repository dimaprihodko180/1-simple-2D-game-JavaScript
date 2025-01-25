const size = 500;
const canvas = document.getElementById("canvas-1");

export const CANVAS = {
  CANVAS: canvas,
  CTX: canvas.getContext("2d"),
  WIDTH: (canvas.width = size * 2.5),
  HEIGHT: (canvas.height = size),
};
