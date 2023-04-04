import { createCanvas, loadImage } from "canvas";
import { writeFileSync } from "fs";
import { applyBorderRadius, rgbToHex } from "./helper.js";
import { INSET, RADIUS, SCAN_PADDING } from "./index.js";

async function getImageColor(image) {
  const imageCanvas = createCanvas(image.width, image.height);
  const imageContext = imageCanvas.getContext("2d");
  imageContext.drawImage(image, 0, 0, image.width, image.height);

  //  Check the color value of the corners
  const corners = [
    { x: SCAN_PADDING, y: SCAN_PADDING },
    { x: image.width - SCAN_PADDING, y: SCAN_PADDING },
    { x: SCAN_PADDING, y: image.height - SCAN_PADDING },
    { x: image.width - SCAN_PADDING, y: image.height - SCAN_PADDING },
  ];
  const colorCodes = corners.map(({ x, y }) => {
    const pixel = imageContext.getImageData(x, y, 1, 1).data;
    const hex = `#${`000000${rgbToHex(pixel[0], pixel[1], pixel[2])}`.slice(
      -6
    )}`;
    // console.log(x, y, hex)
    return hex;
  });
  return colorCodes;
}

export async function processImage(imageSource) {
  const image = await loadImage(imageSource);
  const colorCodes = await getImageColor(image);
  const applyInset = colorCodes.every((code) => code === colorCodes[0]);
  const inset = applyInset ? INSET : 0;

  const canvas = createCanvas(
    image.width + inset * 2,
    image.height + inset * 2
  );
  const context = canvas.getContext("2d");
  const radius = image.width * RADIUS;
  applyBorderRadius(context, 0, 0, canvas.width, canvas.height, radius);

  if (applyInset) {
    context.fillStyle = colorCodes[0];
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  context.drawImage(image, INSET, INSET, image.width, image.height);

  // Write the canvas to a file
  const buffer = canvas.toBuffer("image/png");
  const newFilePath = imageSource.replace(".png", "-processed.png");
  writeFileSync(newFilePath, buffer);
}
