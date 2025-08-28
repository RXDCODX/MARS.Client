import { useEffect, useRef } from "react";

interface RainDrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
  thickness: number;
}

export const RainEffect = (): React.ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Устанавливаем размер canvas на весь экран
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Создаем капли дождя
    const raindrops: RainDrop[] = [];
    const maxDrops = 400; // Увеличил с 200 до 400

    for (let i = 0; i < maxDrops; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        speed: 4 + Math.random() * 6, // Увеличил скорость с 2-5 до 4-10
        length: 20 + Math.random() * 40, // Увеличил длину с 10-30 до 20-60
        opacity: 0.3 + Math.random() * 0.7, // Увеличил прозрачность с 0.1-0.4 до 0.3-1.0
        thickness: 1 + Math.random() * 2, // Добавил толщину капель
      });
    }

    // Анимация дождя
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Более яркий и заметный цвет дождя
      ctx.strokeStyle = "#4fc3f7"; // Яркий голубой цвет
      ctx.lineCap = "round";

      raindrops.forEach(drop => {
        ctx.globalAlpha = drop.opacity;
        ctx.lineWidth = drop.thickness; // Используем толщину для каждой капли

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        // Обновляем позицию капли
        drop.y += drop.speed;

        // Если капля вышла за пределы экрана, возвращаем её наверх
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
};
