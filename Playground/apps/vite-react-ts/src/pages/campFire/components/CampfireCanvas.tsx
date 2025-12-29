import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

import type { CampfireHandle, FireState } from '../types';
import type { CSSProperties } from 'react';

interface CampfireCanvasProps {
  onFireClick?: () => void;
}

const FIRE_SCALE = 0.6;

export const CampfireCanvas = forwardRef<CampfireHandle, CampfireCanvasProps>(
  ({ onFireClick }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioInitialized = useRef(false);
    const fireStateRef = useRef<FireState>({
      particles: [],
      time: 0,
      intensity: 1,
      effectiveIntensity: 1,
      fireBoostWave: 0,
      soundEnabled: false,
    });
    const spritesRef = useRef<any[]>([]);
    const spriteCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useImperativeHandle(ref, () => ({
      boostFire: () => {
        fireStateRef.current.fireBoostWave = 1.0;
        fireStateRef.current.intensity = Math.min(
          fireStateRef.current.intensity + 1.2,
          3.0
        );

        const fireLoop = document.getElementById(
          'fireLoop'
        ) as HTMLAudioElement;

        if (fireStateRef.current.soundEnabled && fireLoop) {
          fireLoop.volume = Math.min(0.7, fireLoop.volume + 0.25);
          setTimeout(() => {
            fireLoop.volume = 0.5;
          }, 1500);
        }

        const firePopSound = document.getElementById(
          'firePopSound'
        ) as HTMLAudioElement;

        if (fireStateRef.current.soundEnabled && Math.random() > 0.3) {
          const pop = firePopSound.cloneNode() as HTMLAudioElement;
          pop.volume = 0.4;
          pop.currentTime = Math.random() * 15;
          pop.play().catch(() => {});
        }
      },
      getFireCenter: () => {
        const baseX = window.innerWidth * 0.5;
        const baseY = window.innerHeight * 0.72;

        return { x: baseX, y: baseY };
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const ctx = canvas.getContext('2d')!;
      const state = fireStateRef.current;

      // Utils
      const rand = (a: number, b: number) => a + Math.random() * (b - a);
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      function getWind(time: number) {
        return {
          x: Math.sin(time * 0.003) * 0.3 + Math.sin(time * 0.007) * 0.15,
          y: Math.cos(time * 0.005) * 0.1,
        };
      }

      // Resize
      function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      window.addEventListener('resize', resize);
      resize();

      // Create fire sprites
      const spriteCanvas = document.createElement('canvas');
      const sCtx = spriteCanvas.getContext('2d')!;
      const sprites: any[] = [];

      spriteCanvas.width = 800;
      spriteCanvas.height = 200;

      const sizes = [50, 80, 120, 160];
      sizes.forEach((size, i) => {
        const x = i * 200 + 100;
        const y = 100;
        const radius = size / 2;

        for (let j = 0; j < 6; j++) {
          const px = x + rand(-radius * 0.3, radius * 0.3);
          const py = y + rand(-radius * 0.3, radius * 0.3);
          const pRadius = radius * rand(0.5, 0.8);

          const grad = sCtx.createRadialGradient(px, py, 0, px, py, pRadius);
          grad.addColorStop(0, 'rgba(255, 200, 50, 0.4)');
          grad.addColorStop(0.4, 'rgba(255, 80, 20, 0.2)');
          grad.addColorStop(1, 'rgba(150, 20, 0, 0)');

          sCtx.fillStyle = grad;
          sCtx.beginPath();
          sCtx.arc(px, py, pRadius, 0, Math.PI * 2);
          sCtx.fill();
        }

        sprites.push({ x: x - 100, y: y - 100, size: 200 });
      });

      spritesRef.current = sprites;
      spriteCanvasRef.current = spriteCanvas;

      // Spawn functions
      function spawnFlame(x: number, y: number) {
        const count = Math.floor(8 * state.effectiveIntensity);

        for (let i = 0; i < count; i++) {
          const waveScale = 1.0 + state.fireBoostWave * 0.5;

          state.particles.push({
            type: 'flame',
            x: x + rand(-60, 60) * FIRE_SCALE * waveScale,
            y: y + rand(-15, 5),
            vx: rand(-0.8, 0.8) * FIRE_SCALE * waveScale,
            vy:
              rand(-4.0, -7.0) *
              state.effectiveIntensity *
              FIRE_SCALE *
              waveScale,
            spriteIdx: Math.floor(Math.random() * sprites.length),
            scale: rand(0.8, 2.2) * FIRE_SCALE * waveScale,
            life: rand(40, 70),
            maxLife: 70,
            angle: rand(0, Math.PI * 2),
            rotationSpeed: rand(-0.1, 0.1),
            seed: Math.random() * 1000,
          });
        }
      }

      function spawnCore(x: number, y: number) {
        const count = Math.floor(6 * state.effectiveIntensity);

        for (let i = 0; i < count; i++) {
          const life = rand(18, 30);
          const waveScale = 1.0 + state.fireBoostWave * 0.5;

          state.particles.push({
            type: 'core',
            x: x + rand(-30, 30) * FIRE_SCALE * waveScale,
            y: y + rand(-8, 8),
            vx: rand(-0.2, 0.2) * FIRE_SCALE * waveScale,
            vy:
              rand(-2.0, -1.2) *
              state.effectiveIntensity *
              FIRE_SCALE *
              waveScale,
            size: rand(18, 30) * FIRE_SCALE * waveScale,
            life,
            maxLife: life,
            seed: Math.random() * 1000,
            depth: rand(0.3, 1),
          });
        }
      }

      function spawnSpark(x: number, y: number) {
        if (Math.random() > 0.12 * state.effectiveIntensity) {
          return;
        }
        const life = rand(20, 40);
        const angle = rand(-Math.PI / 2.5, -Math.PI / 4);
        const speed = rand(3.0, 5.0) * FIRE_SCALE;
        const waveScale = 1.0 + state.fireBoostWave * 0.8;

        state.particles.push({
          type: 'spark',
          x: x + rand(-20, 20) * FIRE_SCALE * waveScale,
          y: y + rand(-12, 12),
          vx: Math.sin(angle) * speed * 0.3 * waveScale,
          vy: Math.cos(angle) * speed * waveScale,
          size: rand(3, 6) * FIRE_SCALE * waveScale,
          life,
          maxLife: life,
          seed: Math.random() * 1000,
          depth: rand(0, 1),
        });
      }

      function spawnSmoke(x: number, y: number) {
        if (Math.random() > 0.08) {
          return;
        }
        const life = rand(90, 140);
        state.particles.push({
          type: 'smoke',
          x: x + rand(-36, 36) * FIRE_SCALE,
          y: y + rand(-20, 0),
          vx: rand(-0.2, 0.2),
          vy: rand(-0.7, -0.4),
          size: rand(36, 64) * FIRE_SCALE,
          life,
          maxLife: life,
          seed: Math.random() * 1000,
          depth: rand(0, 0.5),
        });
      }

      function spawnEmber(x: number, y: number) {
        if (Math.random() > 0.95) {
          const angle = rand(0, Math.PI * 2);
          const speed = rand(4, 7) * FIRE_SCALE;
          state.particles.push({
            type: 'ember',
            x: x + rand(-20, 20) * FIRE_SCALE,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 3 * FIRE_SCALE,
            size: rand(4, 8) * FIRE_SCALE,
            life: rand(40, 60),
            maxLife: 60,
            seed: Math.random() * 1000,
            depth: rand(0.5, 1),
          });
        }
      }

      function spawnMultiPointFlames(baseX: number, baseY: number) {
        const waveScale = 1.0 + state.fireBoostWave * 0.6;

        const firePoints = [
          {
            x: baseX - 70 * FIRE_SCALE * waveScale,
            y: baseY + 5,
            intensity: 0.7,
          },
          {
            x: baseX - 35 * FIRE_SCALE * waveScale,
            y: baseY - 5,
            intensity: 0.9,
          },
          { x: baseX, y: baseY - 10, intensity: 1.0 },
          {
            x: baseX + 35 * FIRE_SCALE * waveScale,
            y: baseY - 5,
            intensity: 0.9,
          },
          {
            x: baseX + 70 * FIRE_SCALE * waveScale,
            y: baseY + 5,
            intensity: 0.7,
          },
        ];

        firePoints.forEach((point) => {
          if (Math.random() < point.intensity * 0.3) {
            spawnFlame(point.x, point.y);
          }

          if (Math.random() < point.intensity * 0.25) {
            spawnCore(point.x, point.y);
          }
        });
      }

      function drawGroundReflection(x: number, y: number, breathe: number) {
        const reflectionIntensity = 0.15 * breathe;
        const g = ctx.createRadialGradient(x, y + 100, 0, x, y + 100, 200);
        g.addColorStop(0, `rgba(255,120,40,${reflectionIntensity})`);
        g.addColorStop(1, 'rgba(255,120,40,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y + 100, 200, 0, Math.PI * 2);
        ctx.fill();
      }

      function drawLog(
        x: number,
        y: number,
        width: number,
        height: number,
        angle: number,
        charred = 0
      ) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        const logGrad = ctx.createLinearGradient(0, -height / 2, 0, height / 2);
        logGrad.addColorStop(0, 'rgba(30, 20, 12, 0.9)');
        logGrad.addColorStop(0.3, 'rgba(60, 45, 30, 0.95)');
        logGrad.addColorStop(0.7, 'rgba(50, 38, 25, 0.95)');
        logGrad.addColorStop(1, 'rgba(25, 18, 10, 0.9)');
        ctx.fillStyle = logGrad;
        ctx.fillRect(-width / 2, -height / 2, width, height);

        ctx.strokeStyle = 'rgba(20, 15, 10, 0.3)';
        ctx.lineWidth = 1;

        for (let i = 0; i < 5; i++) {
          const offsetX = -width / 2 + (width / 6) * (i + 1);
          ctx.beginPath();
          ctx.moveTo(offsetX, -height / 2);
          ctx.lineTo(offsetX + Math.random() * 4 - 2, height / 2);
          ctx.stroke();
        }

        if (charred > 0) {
          const charredGrad = ctx.createLinearGradient(
            -width / 2,
            0,
            -width / 2 + charred,
            0
          );
          charredGrad.addColorStop(0, 'rgba(10, 5, 3, 0.9)');
          charredGrad.addColorStop(0.5, 'rgba(15, 8, 5, 0.8)');
          charredGrad.addColorStop(1, 'rgba(25, 15, 10, 0.5)');
          ctx.fillStyle = charredGrad;
          ctx.fillRect(-width / 2, -height / 2, charred, height);

          ctx.fillStyle = 'rgba(180, 60, 20, 0.3)';
          ctx.fillRect(-width / 2, -height / 2, charred * 0.3, height);
        }

        const endGrad = ctx.createRadialGradient(
          -width / 2,
          0,
          0,
          -width / 2,
          0,
          height / 2
        );
        endGrad.addColorStop(0, 'rgba(45, 35, 22, 0.95)');
        endGrad.addColorStop(0.7, 'rgba(30, 22, 15, 0.9)');
        endGrad.addColorStop(1, 'rgba(20, 15, 10, 0.8)');
        ctx.fillStyle = endGrad;
        ctx.beginPath();
        ctx.arc(-width / 2, 0, height / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(25, 18, 12, 0.5)';
        ctx.lineWidth = 1.5;

        for (let r = height / 6; r < height / 2; r += height / 6) {
          ctx.beginPath();
          ctx.arc(-width / 2, 0, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      }

      function drawLogs(x: number, y: number) {
        ctx.save();
        drawLog(x - 95, y + 55, 120, 26, -Math.PI / 9, 30);
        drawLog(x - 60, y + 50, 110, 24, -Math.PI / 12, 25);
        drawLog(x - 30, y + 58, 115, 25, -Math.PI / 15, 28);
        drawLog(x + 30, y + 58, 115, 25, Math.PI / 15, 28);
        drawLog(x + 60, y + 50, 110, 24, Math.PI / 12, 25);
        drawLog(x + 95, y + 55, 120, 26, Math.PI / 9, 30);
        ctx.restore();
      }

      function drawStone(x: number, y: number, size: number, seed: number) {
        ctx.save();

        const points = 6 + Math.floor(seed * 3);
        const vertices = [];

        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const randomness = 0.7 + (Math.sin(seed * 100 + i) * 0.5 + 0.5) * 0.6;
          const r = size * randomness;
          vertices.push({
            x: x + Math.cos(angle) * r,
            y: y + Math.sin(angle) * r * 0.8,
          });
        }

        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        vertices.forEach((v, i) => {
          if (i === 0) {
            ctx.moveTo(v.x + 3, v.y + 5);
          } else {
            ctx.lineTo(v.x + 3, v.y + 5);
          }
        });
        ctx.closePath();
        ctx.fill();

        const stoneGrad = ctx.createRadialGradient(
          x - size / 3,
          y - size / 3,
          0,
          x,
          y,
          size
        );
        stoneGrad.addColorStop(0, 'rgba(140, 135, 130, 0.95)');
        stoneGrad.addColorStop(0.5, 'rgba(100, 95, 90, 0.95)');
        stoneGrad.addColorStop(1, 'rgba(60, 58, 55, 0.9)');
        ctx.fillStyle = stoneGrad;
        ctx.beginPath();
        vertices.forEach((v, i) => {
          if (i === 0) {
            ctx.moveTo(v.x, v.y);
          } else {
            ctx.lineTo(v.x, v.y);
          }
        });
        ctx.closePath();
        ctx.fill();

        for (let i = 0; i < 8; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * size * 0.6;
          const px = x + Math.cos(angle) * dist;
          const py = y + Math.sin(angle) * dist * 0.8;
          ctx.fillStyle =
            Math.random() > 0.5
              ? 'rgba(120, 115, 110, 0.6)'
              : 'rgba(80, 75, 70, 0.5)';
          ctx.beginPath();
          ctx.arc(px, py, Math.random() * 2 + 1, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = 'rgba(160, 155, 150, 0.4)';
        ctx.beginPath();
        ctx.arc(x - size / 3, y - size / 3, size / 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      function drawStones(x: number, y: number) {
        ctx.save();

        const stonePositions = [
          { x: x - 135, y: y + 70, size: 24, seed: 0.123 },
          { x: x - 105, y: y + 80, size: 28, seed: 0.456 },
          { x: x - 75, y: y + 83, size: 26, seed: 0.789 },
          { x: x - 45, y: y + 85, size: 22, seed: 0.234 },
          { x: x + 45, y: y + 75, size: 22, seed: 0.567 },
          { x: x + 75, y: y + 73, size: 26, seed: 0.89 },
          { x: x + 105, y: y + 80, size: 28, seed: 0.345 },
          { x: x + 130, y: y + 75, size: 25, seed: 0.678 },
          { x: x - 155, y: y + 75, size: 20, seed: 0.912 },
          { x: x + 145, y: y + 65, size: 20, seed: 0.321 },
          { x: x - 15, y: y + 86, size: 28, seed: 0.654 },
          { x: x + 15, y: y + 80, size: 20, seed: 0.987 },
        ];

        stonePositions.forEach((stone) => {
          drawStone(stone.x, stone.y, stone.size, stone.seed);
        });

        ctx.restore();
      }

      // Main update loop
      let animationId: number;

      function update() {
        state.time++;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const baseX = window.innerWidth * 0.5;
        const baseY = window.innerHeight * 0.72;

        state.intensity = Math.max(1, state.intensity * 0.985);

        if (state.fireBoostWave > 0) {
          state.fireBoostWave = Math.max(0, state.fireBoostWave - 0.03);
        }

        const breathe = Math.sin(state.time * 0.01) * 0.3 + 1.0;
        state.effectiveIntensity = state.intensity * breathe;

        ctx.globalCompositeOperation = 'source-over';
        const waveGlowScale = 1.0 + state.fireBoostWave * 0.5;
        const glowIntensity = 0.5 * breathe * (1.0 + state.fireBoostWave * 0.4);
        const g = ctx.createRadialGradient(
          baseX,
          baseY + 20,
          60 * FIRE_SCALE * waveGlowScale,
          baseX,
          baseY + 20,
          600 * FIRE_SCALE * waveGlowScale
        );
        g.addColorStop(0, `rgba(255,180,90,${glowIntensity * 0.8})`);
        g.addColorStop(0.6, `rgba(255,140,60,${glowIntensity * 0.5})`);
        g.addColorStop(1, 'rgba(10,15,30,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(
          baseX,
          baseY + 20,
          600 * FIRE_SCALE * waveGlowScale,
          0,
          Math.PI * 2
        );
        ctx.fill();

        drawGroundReflection(
          baseX,
          baseY,
          breathe * (1.0 + state.fireBoostWave * 0.5)
        );

        drawLogs(baseX, baseY);

        spawnMultiPointFlames(baseX, baseY);
        spawnSpark(baseX, baseY);
        spawnSmoke(baseX, baseY);
        spawnEmber(baseX, baseY);

        ctx.globalCompositeOperation = 'lighter';

        const wind = getWind(state.time);

        state.particles.sort((a, b) => (a.depth || 0) - (b.depth || 0));

        for (let i = state.particles.length - 1; i >= 0; i--) {
          const p = state.particles[i];
          p.life--;

          if (p.life <= 0) {
            state.particles.splice(i, 1);
            continue;
          }

          const u = 1 - p.life / p.maxLife;
          const wobble = Math.sin(state.time * 0.05 + p.seed) * 0.25;

          if (p.type === 'core') {
            p.x += p.vx;
            p.y += p.vy;

            const depthScale = 0.7 + (p.depth || 0.5) * 0.3;
            const r = p.size! * (1 - u * 0.5) * depthScale;
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
            grad.addColorStop(0, `rgba(180, 120, 25, ${0.25 * (1 - u)})`);
            grad.addColorStop(0.4, `rgba(170, 90, 20, ${0.2 * (1 - u)})`);
            grad.addColorStop(0.7, `rgba(160, 60, 15, ${0.15 * (1 - u)})`);
            grad.addColorStop(1, `rgba(140, 40, 10, 0)`);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
            ctx.fill();
          }

          if (p.type === 'flame') {
            const noise =
              Math.sin(state.time * 0.08 + p.seed) *
              Math.cos(state.time * 0.1 + p.seed);
            p.vx += noise * 0.15;

            p.vx += wind.x * 0.1;
            p.vy += wind.y * 0.06;

            p.x += p.vx;
            p.y += p.vy;

            const heightFactor = Math.max(0, (baseY - p.y) / 150);
            p.vx += (Math.random() - 0.5) * 0.4 * heightFactor;
            p.vy! -= 0.02 * heightFactor;

            p.angle! += p.rotationSpeed! * (1 + heightFactor * 0.5);

            const sprite = sprites[p.spriteIdx!];
            const drawSize = sprite.size * p.scale! * (1 - u * 0.4);

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle!);
            ctx.globalAlpha = Math.pow(1 - u, 0.8) * 0.85;

            ctx.drawImage(
              spriteCanvas,
              sprite.x,
              sprite.y,
              sprite.size,
              sprite.size,
              -drawSize / 2,
              -drawSize / 2,
              drawSize,
              drawSize
            );

            ctx.restore();
          }

          if (p.type === 'spark') {
            p.vy += 0.1;
            p.x += p.vx;
            p.y += p.vy;
            const depthScale = 0.7 + (p.depth || 0.5) * 0.3;
            const sparkSize = p.size! * depthScale;
            ctx.fillStyle = `rgba(255,220,160,${1 - u})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, sparkSize, 0, Math.PI * 2);
            ctx.fill();
          }

          if (p.type === 'smoke') {
            ctx.globalCompositeOperation = 'source-over';
            p.vx += wind.x * 0.05;
            p.vy += wind.y * 0.03;
            p.x += p.vx + wobble * 0.01;
            p.y += p.vy;
            const depthScale = 0.7 + (p.depth || 0.5) * 0.3;
            ctx.fillStyle = `rgba(210,220,255,${(1 - u) * 0.15})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size! * (0.6 + u) * depthScale, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'lighter';
          }

          if (p.type === 'ember') {
            p.vy += 0.15;
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.98;

            const depthScale = 0.7 + (p.depth || 0.5) * 0.3;
            const emberSize = p.size! * depthScale;

            const glowSize = emberSize * 2;
            ctx.fillStyle = `rgba(255,140,40,${(1 - u) * 0.4})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(255,220,100,${1 - u})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, emberSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (state.particles.length > 1000) {
          state.particles.splice(0, state.particles.length - 1000);
        }

        ctx.globalCompositeOperation = 'source-over';
        drawStones(baseX, baseY);

        animationId = requestAnimationFrame(update);
      }

      // Fire detection
      function isNearFire(x: number, y: number) {
        const baseX = window.innerWidth * 0.5;
        const baseY = window.innerHeight * 0.72;

        const horizontalRadius = 200 * FIRE_SCALE;
        const verticalRadius = 300 * FIRE_SCALE;

        const dx = (x - baseX) / horizontalRadius;
        const dy = (y - baseY) / verticalRadius;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < 1.0;
      }

      // Event handlers
      const handleClick = (e: MouseEvent) => {
        const isNear = isNearFire(e.clientX, e.clientY);

        if (isNear && onFireClick) {
          onFireClick();
        }
      };

      const handleTouchStart = (e: TouchEvent) => {
        e.preventDefault();

        for (let i = 0; i < e.touches.length; i++) {
          const touch = e.touches[i];

          if (isNearFire(touch.clientX, touch.clientY) && onFireClick) {
            onFireClick();
            break;
          }
        }
      };

      // Audio init
      const initAudio = () => {
        if (!audioInitialized.current) {
          audioInitialized.current = true;
          state.soundEnabled = true;

          const fireLoop = document.getElementById(
            'fireLoop'
          ) as HTMLAudioElement;
          const forestLoop = document.getElementById(
            'forestLoop'
          ) as HTMLAudioElement;

          if (fireLoop) {
            fireLoop.volume = 0.5;
            fireLoop.play().catch(() => {});
          }

          if (forestLoop) {
            forestLoop.volume = 0.25;
            forestLoop.play().catch(() => {});
          }
        }
      };

      window.addEventListener('click', initAudio, { once: true });
      canvas.addEventListener('click', handleClick);
      canvas.addEventListener('touchstart', handleTouchStart, {
        passive: false,
      });

      update();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('click', handleClick);
        canvas.removeEventListener('touchstart', handleTouchStart);
      };
    }, [onFireClick]);

    const canvasStyle: CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      touchAction: 'none',
      cursor: 'pointer',
    };

    return (
      <>
        <canvas ref={canvasRef} style={canvasStyle} />

        <audio id="fireLoop" loop preload="auto">
          <source src="/fire/assets/fire-crackling.mp3" type="audio/mpeg" />
        </audio>
        <audio id="forestLoop" loop preload="auto">
          <source src="/fire/assets/forest.mp3" type="audio/mpeg" />
        </audio>
        <audio id="firePopSound" preload="auto">
          <source src="/fire/assets/fire-pops.mp3" type="audio/mpeg" />
        </audio>
      </>
    );
  }
);

CampfireCanvas.displayName = 'CampfireCanvas';
