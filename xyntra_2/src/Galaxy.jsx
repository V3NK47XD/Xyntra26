import { useEffect, useRef } from "react";

export default function Galaxy({
  density = 1.6,
  glowIntensity = 0.7,
  twinkleIntensity = 5,
  mouseInteraction = true,
  mouseRepulsion = true,
  repulsionStrength = 5,
  starSpeed = 0.7,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const stars = [];
    const STAR_COUNT = Math.floor(width * height * 0.0001 * density);
    const mouse = { x: width / 2, y: height / 2 };

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * starSpeed,
        vy: (Math.random() - 0.5) * starSpeed,
        a: Math.random(),
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0 || s.x > width) s.vx *= -1;
        if (s.y < 0 || s.y > height) s.vy *= -1;

        if (mouseInteraction && mouseRepulsion) {
          const dx = s.x - mouse.x;
          const dy = s.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            s.x += (dx / dist) * repulsionStrength;
            s.y += (dy / dist) * repulsionStrength;
          }
        }

        s.a += (Math.random() - 0.5) * twinkleIntensity;
        s.a = Math.max(0.2, Math.min(1, s.a));

        ctx.beginPath();
        ctx.fillStyle = `rgba(180,120,255,${s.a})`;
        ctx.shadowBlur = 10 * glowIntensity;
        ctx.shadowColor = "#8A2BE2";
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
    />
  );
}
