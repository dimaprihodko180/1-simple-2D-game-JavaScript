/**@type {HTMLCanvasElement} */

const size = 500;
const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");

export const CANVAS_ENUMS = {
  CANVAS: canvas,
  CTX: ctx,
  WIDTH: (canvas.width = size),
  HEIGHT: (canvas.height = size),
};
