'use client';
import { useRef, useEffect, useCallback, useMemo } from 'react';
import React from "react"

function parseColor(color: string): { r: number; g: number; b: number; a: number } {
  // Handle rgba format
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1
    };
  }
  
  // Handle hex format
  const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16),
      a: 1
    };
  }
  
  return { r: 255, g: 255, b: 255, a: 1 };
}

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  targetXOffset: number;
  targetYOffset: number;
}

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockRadius?: number;
  shockStrength?: number;
  returnSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DotGrid = ({
  dotSize = 3,
  gap = 24,
  baseColor = '#D4AF37',
  activeColor = '#FFD700',
  proximity = 120,
  shockRadius = 200,
  shockStrength = 3,
  returnSpeed = 0.08,
  className = '',
  style
}: DotGridProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>();

  const baseRgb = useMemo(() => parseColor(baseColor), [baseColor]);
  const activeRgb = useMemo(() => parseColor(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;
    const p = new window.Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, targetXOffset: 0, targetYOffset: 0 });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;

    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        // Apply continuous repulsion when mouse is within proximity
        if (dsq < proxSq && dsq > 0) {
          const dist = Math.sqrt(dsq);
          const force = (1 - dist / proximity) * shockStrength * 0.5;
          const angle = Math.atan2(dy, dx);
          dot.targetXOffset = Math.cos(angle) * force * proximity * 0.3;
          dot.targetYOffset = Math.sin(angle) * force * proximity * 0.3;
        } else {
          // Gradually return target to 0 when outside proximity
          dot.targetXOffset *= 0.92;
          dot.targetYOffset *= 0.92;
        }

        // Smooth interpolation to target position
        dot.xOffset += (dot.targetXOffset - dot.xOffset) * returnSpeed;
        dot.yOffset += (dot.targetYOffset - dot.yOffset) * returnSpeed;

        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;

        let style: string;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          const a = baseRgb.a + (activeRgb.a - baseRgb.a) * t;
          style = `rgba(${r},${g},${b},${a})`;
        } else {
          style = `rgba(${baseRgb.r},${baseRgb.g},${baseRgb.b},${baseRgb.a})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath, returnSpeed, shockStrength]);

  useEffect(() => {
    buildGrid();
    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid);
      if (wrapperRef.current) ro.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      pointerRef.current.x = -1000;
      pointerRef.current.y = -1000;
    };

    const onClick = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius) {
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          dot.targetXOffset = pushX;
          dot.targetYOffset = pushY;
        }
      }
    };

    // Use document-level mousemove to track even when mouse moves fast
    document.addEventListener('mousemove', onMove, { passive: true });
    wrapper.addEventListener('mouseleave', onLeave, { passive: true });
    wrapper.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      wrapper.removeEventListener('mouseleave', onLeave);
      wrapper.removeEventListener('click', onClick);
    };
  }, [shockRadius, shockStrength]);

  return (
    <div className={`absolute inset-0 ${className}`} style={style}>
      <div ref={wrapperRef} className="w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default DotGrid;
