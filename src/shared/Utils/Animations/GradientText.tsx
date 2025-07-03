import React, { CSSProperties, useEffect } from "react";

interface GradientTextProps {
  text: string;
  colors?: string[];
  speed?: number;
  fontSize?: string;
  fontWeight?: CSSProperties["fontWeight"];
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  colors = [
    "#ff00cc",
    "#cc00ff",
    "#9900ff",
    "#6600ff",
    "#3333ff",
    "#0066ff",
    "#00ccff",
    "#00ffff",
    "#00ffcc",
    "#00ff99",
    "#00ff66",
    "#00ff33",
    "#ccff00",
    "#ffff00",
    "#ffcc00",
    "#ff9900",
    "#ff00cc",
  ],
  speed = 20, // Увеличиваем время для плавности
  fontSize = "inherit",
  fontWeight = "normal",
  className = "",
}) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
    `;
    document.head.append(style);

    return () => style.remove();
  }, []);

  const gradientStyle: CSSProperties = {
    fontSize,
    fontWeight,
    backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
    backgroundSize: `${colors.length * 200}% 100%`, // Увеличиваем для плавности
    animation: `gradientShift ${speed}s linear infinite`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    MozBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    display: "inline-block",
    textShadow: "none",
  };

  return (
    <span
      className={`gradient-text ${className}`}
      style={gradientStyle}
      aria-label={text}
    >
      {text}
    </span>
  );
};

export default GradientText;
