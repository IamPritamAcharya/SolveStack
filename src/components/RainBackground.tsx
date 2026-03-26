import { useEffect, useRef } from 'react';

interface Drop {
  x: number;
  y: number;
  len: number;
  speed: number;
  opacity: number;
  width: number;
  hue: number;
}

/**
 * Rain frost background — slow-falling frosted glass droplet streaks.
 * Each drop: glowing head + gradient trail fading to transparent.
 * Very subtle, professional, ~90 drops at ultra-low opacity.
 */
export function RainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const DROP_COUNT = 110;

    const makeDrops = (): Drop[] =>
      Array.from({ length: DROP_COUNT }, () => ({
        x:       Math.random() * window.innerWidth,
        y:       Math.random() * window.innerHeight,
        len:     18 + Math.random() * 50,                 // 18–68px streak
        speed:   0.3 + Math.random() * 0.65,              // slow fall
        opacity: 0.04 + Math.random() * 0.055,            // clearly visible
        width:   0.8 + Math.random() * 1.0,               // slightly thicker
        hue:     210 + Math.random() * 80,
      }));

    const drops = makeDrops();

    let rafId: number;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach(d => {
        // Glowing head at the bottom of the streak
        const headX = d.x;
        const headY = d.y + d.len;
        const headR = d.width * 2.5;

        // Streak: linear gradient from transparent (top) to colour (bottom)
        const streak = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.len);
        streak.addColorStop(0, `hsla(${d.hue}, 80%, 75%, 0)`);
        streak.addColorStop(0.6, `hsla(${d.hue}, 80%, 75%, ${d.opacity * 0.5})`);
        streak.addColorStop(1, `hsla(${d.hue}, 90%, 85%, ${d.opacity})`);

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.len);
        ctx.strokeStyle = streak;
        ctx.lineWidth   = d.width;
        ctx.stroke();

        // Soft glowing bead at head
        const glow = ctx.createRadialGradient(headX, headY, 0, headX, headY, headR * 3);
        glow.addColorStop(0, `hsla(${d.hue}, 100%, 88%, ${d.opacity * 1.8})`);
        glow.addColorStop(0.4, `hsla(${d.hue}, 80%, 75%, ${d.opacity * 0.6})`);
        glow.addColorStop(1, `hsla(${d.hue}, 60%, 60%, 0)`);

        ctx.beginPath();
        ctx.arc(headX, headY, headR * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Fall
        d.y += d.speed;
        if (d.y > canvas.height + d.len + 10) {
          d.y = -d.len - 10;
          d.x = Math.random() * canvas.width;
          d.opacity = 0.022 + Math.random() * 0.04;
          d.len     = 14 + Math.random() * 38;
          d.speed   = 0.25 + Math.random() * 0.55;
          d.hue     = 210 + Math.random() * 80;
        }
      });
    };

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
