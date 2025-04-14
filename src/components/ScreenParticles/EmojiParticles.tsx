import { JSX, useEffect, useState } from "react";
import { getEmojisSrcFromText } from "../../shared/Utils";
import useTwitchStore from "../../shared/twitchStore/twitchStore";
import { ChatMessage } from "../../shared/api/generated/baza";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { randomInRange } from ".";

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
  input: string | ChatMessage;
  scalar?: number;
}

export async function getBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 200) {
        const reader = new FileReader();
        reader.onloadend = function () {
          if (reader.result) {
            resolve(reader.result.toString());
          } else {
            reject(new Error("Failed to read file"));
          }
        };
        reader.onerror = function () {
          reject(new Error("Failed to read file"));
        };
        reader.readAsDataURL(xhr.response);
      } else {
        reject(new Error(`Failed to load file: ${xhr.statusText}`));
      }
    };
    xhr.onerror = function () {
      reject(new Error("Failed to send request"));
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
}

const ConfettiImage = ({ input, scalar = 10 }: Props) => {
  const [shapes, setShapes] = useState<Array<any>>([]);
  const parser = useTwitchStore((state) => state.parser);
  const parserToLink = useTwitchStore((state) => state.parseToLink);
  if (!parser || !parserToLink) {
    return undefined;
  }
  const [images, _] = useState(
    getEmojisSrcFromText(input, parser, parserToLink),
  );
  const [element, setElement] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (images?.length && images.length > 0) {
      images.forEach(async (image) => {
        const base64 = await getBase64(image);
        const aa = await shapeFromImage({ src: base64, scalar });
        setShapes((prev) => [...prev, aa]);
      });
    }
  }, [images]);

  useEffect(() => {
    if (shapes.length > 0) {
      setElement(
        <Fireworks
          width="100%"
          height="100%"
          autorun={{ speed: 3, duration: 10000 }}
          decorateOptions={() => {
            return {
              startVelocity: 30,
              spread: 360,
              ticks: 60,
              particleCount: 30,
              shapes,
              scalar,
              origin: {
                x: randomInRange(0, 1),
                y: randomInRange(0, 1),
              },
            };
          }}
        />,
      );
    }
  }, [shapes, scalar]);

  return element;
};

export default ConfettiImage;
