import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { getEmojisSrcFromText } from "../../shared/Utils";

interface imageData {
  src: string;
  scalar?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

async function shapeFromImage(imageData: imageData) {
  const { src, scalar = 1 } = imageData;
  const scale = 1 / scalar;

  const img = new Image();
  img.src = src;

  await new Promise((res) => img.addEventListener("load", res));

  const size = 10 * scalar;

  const sx = imageData.x ?? 0;
  const sy = imageData.y ?? 0;
  const sWidth = imageData.width ?? img.naturalWidth;
  const sHeight = imageData.height ?? img.naturalHeight;

  const x = 0;
  const y = 0;
  const width = size;
  const height = (size * sHeight) / sWidth;

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);

  return {
    type: "bitmap",
    bitmap: canvas.transferToImageBitmap(),
    matrix: [scale, 0, 0, scale, (-width * scale) / 2, (-height * scale) / 2],
  };
}

interface Props {
  input: string;
  scalar?: number;
}

// async function getBase64(url: string) {
//   const xhr = new XMLHttpRequest();
//   xhr.onload = function () {
//     var reader = new FileReader();
//     reader.onloadend = function () {
//       return reader.result;
//     };
//     reader.readAsDataURL(xhr.response);
//   };
//   xhr.open("GET", url);
//   xhr.responseType = "blob";
//   xhr.send();
// }

const ConfettiImage = ({ input, scalar = 1 }: Props) => {
  const [shapes, setShapes] = useState<Array<any>>([]);
  const [images, _] = useState(getEmojisSrcFromText(input));

  useEffect(() => {
    if (images?.length && images.length > 0) {
      images.forEach(async (image) => {
        const aa = await shapeFromImage({ src: image, scalar });
        setShapes((prev) => [...prev, aa]);
      });
    }
  }, [images]);

  useEffect(() => {
    if (shapes.length > 0) {
      confetti({
        spread: 360,
        ticks: 200,
        gravity: 0,
        decay: 0.9,
        startVelocity: 40,
        shapes,
        scalar,
        particleCount: 50,
      });
    }
  }, [shapes, scalar]);

  return null;
};

export default ConfettiImage;
