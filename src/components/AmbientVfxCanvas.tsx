import React, { useEffect, useRef } from 'react';

interface AmbientVfxCanvasProps {
  mode: 'day' | 'night';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number; // 0.2 (far) .. 1 (near)
  hue: 'emerald' | 'amber' | 'cyan';
  phase: number;
  pulseSpeed: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const AmbientVfxCanvas: React.FC<AmbientVfxCanvasProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modeRef = useRef<'day' | 'night'>(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const pointer = {
      x: width * 0.5,
      y: height * 0.38,
      tx: width * 0.5,
      ty: height * 0.38,
      active: false,
    };

    const hues: Particle['hue'][] = ['emerald', 'amber', 'cyan'];
    const count = Math.min(48, Math.max(26, Math.floor((width * height) / 38000)));

    const particles: Particle[] = Array.from({ length: count }, (_, i) => {
      const depth = 0.25 + Math.random() * 0.75;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22 * depth,
        vy: -(0.12 + Math.random() * 0.28) * depth,
        radius: (1.6 + Math.random() * 3.8) * depth,
        depth,
        hue: hues[i % hues.length],
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.7 + Math.random() * 1.4,
      };
    });

    const ripples: Ripple[] = [];

    const handlePointerMove = (e: PointerEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.active = true;
    };

    const handlePointerDown = (e: PointerEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 8,
        maxRadius: 180,
        alpha: 0.42,
      });
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('resize', handleResize);

    let rafId = 0;
    let t = 0;

    const getRgb = (hue: Particle['hue'], isDay: boolean): [number, number, number] => {
      if (hue === 'emerald') return [52, 211, 153];
      if (hue === 'amber') return isDay ? [251, 191, 36] : [249, 115, 22];
      return isDay ? [56, 189, 248] : [129, 140, 248];
    };

    const render = () => {
      rafId = requestAnimationFrame(render);
      t += 0.012;

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      ctx.clearRect(0, 0, width, height);
      const isDay = modeRef.current === 'day';

      // 1. Volumetric Sunbeams (Day) or Deep Horizon Aurora Caustic (Night)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      if (isDay) {
        for (let b = 0; b < 3; b++) {
          const sway = Math.sin(t * 0.45 + b * 1.3) * 70;
          const startX = width * (0.14 + b * 0.24) + sway;
          const endX = startX + width * 0.28;
          const beamGrad = ctx.createLinearGradient(startX, 0, endX, height * 0.85);
          beamGrad.addColorStop(0, b === 1 ? 'rgba(251, 191, 36, 0.065)' : 'rgba(52, 211, 153, 0.07)');
          beamGrad.addColorStop(0.55, 'rgba(16, 185, 129, 0.025)');
          beamGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');

          ctx.fillStyle = beamGrad;
          ctx.beginPath();
          ctx.moveTo(startX - 90, 0);
          ctx.lineTo(startX + 140, 0);
          ctx.lineTo(endX + 220, height);
          ctx.lineTo(endX - 160, height);
          ctx.closePath();
          ctx.fill();
        }
      } else {
        // Night mode: subtle bioluminescent horizon sweep
        const sweepX = width * (0.5 + Math.sin(t * 0.3) * 0.28);
        const sweepY = height * (0.32 + Math.cos(t * 0.22) * 0.15);
        const nightGlow = ctx.createRadialGradient(sweepX, sweepY, 10, sweepX, sweepY, width * 0.42);
        nightGlow.addColorStop(0, 'rgba(6, 182, 212, 0.075)');
        nightGlow.addColorStop(0.45, 'rgba(99, 102, 241, 0.04)');
        nightGlow.addColorStop(1, 'rgba(5, 7, 10, 0)');
        ctx.fillStyle = nightGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Cursor Caustic Spotlight
      if (pointer.active) {
        const causticRadius = isDay ? 260 : 300;
        const caustic = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          4,
          pointer.x,
          pointer.y,
          causticRadius
        );
        if (isDay) {
          caustic.addColorStop(0, 'rgba(52, 211, 153, 0.09)');
          caustic.addColorStop(0.45, 'rgba(251, 191, 36, 0.035)');
          caustic.addColorStop(1, 'rgba(16, 185, 129, 0)');
        } else {
          caustic.addColorStop(0, 'rgba(56, 189, 248, 0.10)');
          caustic.addColorStop(0.5, 'rgba(16, 185, 129, 0.045)');
          caustic.addColorStop(1, 'rgba(6, 182, 212, 0)');
        }
        ctx.fillStyle = caustic;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, causticRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Click Shockwave Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += 3.6;
        rp.alpha *= 0.96;
        if (rp.alpha <= 0.015 || rp.radius >= rp.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = isDay
          ? `rgba(52, 211, 153, ${rp.alpha})`
          : `rgba(56, 189, 248, ${rp.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Update & Draw Depth-of-Field Bokeh / Telemetry Motes
      const parallaxX = (pointer.x - width * 0.5) * 0.018;
      const parallaxY = (pointer.y - height * 0.5) * 0.018;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(t * p.pulseSpeed + p.phase) * 0.14 * p.depth;
        p.y += p.vy;

        if (p.y < -30) {
          p.y = height + 25;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 25;
        if (p.x > width + 30) p.x = -25;

        const drawX = p.x + parallaxX * p.depth;
        const drawY = p.y + parallaxY * p.depth;

        const twinkle = 0.55 + 0.45 * Math.sin(t * p.pulseSpeed * 1.6 + p.phase);
        const [r, g, b] = getRgb(p.hue, isDay);

        // Soft bokeh halo
        const haloRadius = p.radius * (isDay ? 5.2 : 4.2);
        const grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, haloRadius);
        const baseAlpha = (isDay ? 0.18 : 0.24) * p.depth * twinkle;
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${baseAlpha * 1.9})`);
        grad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${baseAlpha * 0.65})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(drawX, drawY, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Crisp core specularity for foreground particles
        if (p.depth > 0.55) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.35 * twinkle})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius * 0.42, 0, Math.PI * 2);
          ctx.fill();
        }

        // Night mode: delicate fiber-optic telemetry links near cursor
        if (!isDay && pointer.active) {
          const dx = drawX - pointer.x;
          const dy = drawY - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 165) {
            const linkAlpha = (1 - dist / 165) * 0.18 * p.depth;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${linkAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      ctx.restore();
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
};
