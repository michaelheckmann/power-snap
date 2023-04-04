import { createCanvas, loadImage } from "canvas";
import { writeFileSync } from "fs";
import { applyShadow, createBackground, pSBC } from "./helper.js";
import { processImage } from "./processImage.js";

const args = process.argv.slice(2);
// console.log("args:", args);

const FILE_PATH = args[0] || "./pic.png";
const PX = 100;
const PY = 100;
const FROM_COLOR = "#642B73";
const TO_COLOR = "#C6426E";
export const SCAN_PADDING = 10;
export const INSET = 50;
export const RADIUS = 1 / 40;

await processImage(FILE_PATH);
const image = await loadImage(FILE_PATH.replace(".png", "-processed.png"));

// Dimensions for the image
const width = image.width + PX * 2;
const height = image.height + PY * 2;
const imagePosition = {
  w: image.width,
  h: image.height,
  x: PX,
  y: PY,
};
// Instantiate the canvas object
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

createBackground(context, width, height, FROM_COLOR, TO_COLOR);

const { w, h, x, y } = imagePosition;

const t = (s, o = 20) => s + o;
applyShadow(context, imagePosition, pSBC(-0.4, t(FROM_COLOR)), 20, 0, 15);
applyShadow(context, imagePosition, pSBC(-0.4, t(TO_COLOR)), 40, 0, 40);

context.drawImage(image, x, y, w, h);

const buffer = canvas.toBuffer("image/png");
writeFileSync("./image.png", buffer);
