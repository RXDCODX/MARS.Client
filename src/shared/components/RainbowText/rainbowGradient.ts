import hsl2rgb from "./hsl2rgb";

const rainbowGradient = (
  len: number,
  saturation: number = 1,
  lightness: number = 0.5,
): number[][] => {
  const gradient: number[][] = [];
  for (let x = 0; x < len; x++) {
    gradient.push(
      hsl2rgb(x / len, saturation, lightness).map((c) => Math.round(c * 255)),
    );
  }
  return gradient;
};

export default rainbowGradient;
