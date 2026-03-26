import { useEffect, useRef } from 'react';

interface Blob {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  hue: number;
  opacity: number;
}

/**
 * AuroraBackground — soft, large blurred colour blobs that drift slowly
 * giving a frosted-glass / aurora effect behind all content.
 * Pure canvas, ~5 blobs, very low opacity. No distracting sharp edges.
 */
export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ── Blob parameters — kept very subtle and slow ──
    const blobs: Blob[] = [
      { x: 0.15, y: 0.10, vx: 0.00008, vy: 0.00005, r: 0.55, hue: 250, opacity: 0.07 },
      { x: 0.80, y: 0.20, vx:-0.00006, vy: 0.00008, r: 0.50, hue: 280, opacity: 0.05 },
      { x: 0.50, y: 0.75, vx: 0.00007, vy:-0.00006, r: 0.60, hue: 220, opacity: 0.055 },
      { x: 0.10, y: 0.70, vx: 0.00005, vy:-0.00007, r: 0.40, hue: 200, opacity: 0.04 },
      { x: 0.85, y: 0.80, vx:-0.00009, vy:-0.00005, r: 0.45, hue: 270, opacity: 0.05 },
    ];

    let rafId: number;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach(b => {
        // Drift
        b.x += b.vx;
        b.y += b.vy;
        // Bounce off edges
        if (b.x < -0.2 || b.x > 1.2) b.vx *= -1;
        if (b.y < -0.2 || b.y > 1.2) b.vy *= -1;

        const cx = b.x * canvas.width;
        const cy = b.y * canvas.height;
        const radius = b.r * Math.max(canvas.width, canvas.height);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `hsla(${b.hue}, 70%, 60%, ${b.opacity})`);
        grad.addColorStop(0.5, `hsla(${b.hue}, 60%, 50%, ${b.opacity * 0.5})`);
        grad.addColorStop(1, `hsla(${b.hue}, 50%, 40%, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        filter: 'blur(48px)',   // the glass-frost blur is applied at the canvas level
      }}
    />
  );
}
