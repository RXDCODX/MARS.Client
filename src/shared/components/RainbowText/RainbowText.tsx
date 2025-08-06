import { useMemo } from "react";

import rainbowGradient from "./rainbowGradient";

interface RainbowTextProps {
  text: string;
  saturation?: number;
  lightness?: number;
  className?: string;
  style?: React.CSSProperties;
}

const RainbowText = ({
  text,
  saturation = 1,
  lightness = 0.5,
  className = "",
  style = {},
}: RainbowTextProps) => {
  const characters = useMemo(() => text.split(""), [text]);
  const gradientSize = useMemo(
    () => characters.filter(char => char !== " ").length,
    [characters]
  );
  const gradient = useMemo(
    () => rainbowGradient(gradientSize, saturation, lightness),
    [gradientSize, saturation, lightness]
  );

  return (
    <span className={className} style={style}>
      {characters.map((char, index) => {
        if (char === " ") {
          return <span key={index}>{char}</span>;
        }

        return (
          <span
            key={index}
            style={{
              color: `rgb(${gradient[index % gradient.length].join(", ")})`,
              display: "inline-block",
              transition: "color 0.5s",
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

export default RainbowText;
