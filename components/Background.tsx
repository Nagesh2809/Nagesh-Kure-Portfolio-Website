import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  pulsePhase: number;
}

export const Background: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const orbsRef = useRef<Orb[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      initOrbs();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Initialize floating particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    // Initialize animated gradient orbs (smaller and more subtle)
    const initOrbs = () => {
      orbsRef.current = [
        {
          x: canvas.width * 0.2,
          y: canvas.height * 0.3,
          vx: 0.3,
          vy: 0.2,
          radius: 120,
          hue: 250, // Purple
          pulsePhase: 0,
        },
        {
          x: canvas.width * 0.8,
          y: canvas.height * 0.6,
          vx: -0.25,
          vy: -0.15,
          radius: 150,
          hue: 200, // Blue
          pulsePhase: Math.PI,
        },
        {
          x: canvas.width * 0.5,
          y: canvas.height * 0.8,
          vx: 0.2,
          vy: -0.25,
          radius: 100,
          hue: 280, // Indigo
          pulsePhase: Math.PI / 2,
        },
        {
          x: canvas.width * 0.6,
          y: canvas.height * 0.2,
          vx: -0.15,
          vy: 0.3,
          radius: 130,
          hue: 270, // Purple-Indigo
          pulsePhase: Math.PI / 4,
        },
      ];
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      const isDark = theme === 'dark';
      timeRef.current += 0.01;

      // Clear canvas with fade effect for smooth trails
      ctx.fillStyle = isDark ? 'rgba(2, 6, 23, 0.08)' : 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw animated gradient orbs
      orbsRef.current.forEach((orb) => {
        // Update position
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges
        if (orb.x < -orb.radius / 2 || orb.x > canvas.width + orb.radius / 2) {
          orb.vx *= -1;
          orb.x = Math.max(-orb.radius / 2, Math.min(canvas.width + orb.radius / 2, orb.x));
        }
        if (orb.y < -orb.radius / 2 || orb.y > canvas.height + orb.radius / 2) {
          orb.vy *= -1;
          orb.y = Math.max(-orb.radius / 2, Math.min(canvas.height + orb.radius / 2, orb.y));
        }

        // Pulse effect
        orb.pulsePhase += 0.02;
        const pulseScale = 1 + Math.sin(orb.pulsePhase) * 0.1;
        const currentRadius = orb.radius * pulseScale;

        // Create radial gradient for orb
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius);

        if (isDark) {
          gradient.addColorStop(0, `hsla(${orb.hue}, 70%, 60%, 0.12)`);
          gradient.addColorStop(0.5, `hsla(${orb.hue}, 70%, 50%, 0.06)`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          gradient.addColorStop(0, `hsla(${orb.hue}, 70%, 65%, 0.08)`);
          gradient.addColorStop(0.5, `hsla(${orb.hue}, 70%, 55%, 0.04)`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw floating particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Calculate distance from mouse for interactive effect
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse interaction - particles move away from cursor
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x += (dx / distance) * force * 2;
          particle.y += (dy / distance) * force * 2;
        }

        // Draw particle with glow
        const particleOpacity = isDark ? particle.opacity * 0.6 : particle.opacity * 0.4;

        // Outer glow
        ctx.fillStyle = isDark
          ? `rgba(139, 92, 246, ${particleOpacity * 0.3})`
          : `rgba(99, 102, 241, ${particleOpacity * 0.2})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Inner particle
        ctx.fillStyle = isDark
          ? `rgba(167, 139, 250, ${particleOpacity})`
          : `rgba(129, 140, 248, ${particleOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw enhanced grid pattern with subtle lines
      const gridSize = 60;
      const dotSize = 1.2;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          // Calculate distance from mouse
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Wave effect based on time and position
          const wave = Math.sin(timeRef.current + x * 0.01 + y * 0.01) * 0.5 + 0.5;

          // Create cursor glow effect
          if (distance < 200) {
            const intensity = 1 - distance / 200;
            const glowSize = dotSize + intensity * 2.5;

            // Outer glow
            ctx.beginPath();
            ctx.arc(x, y, glowSize * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = isDark
              ? `rgba(99, 102, 241, ${intensity * 0.15})`
              : `rgba(99, 102, 241, ${intensity * 0.1})`;
            ctx.fill();

            // Inner dot
            ctx.beginPath();
            ctx.arc(x, y, glowSize, 0, Math.PI * 2);
            ctx.fillStyle = isDark
              ? `rgba(139, 92, 246, ${intensity * 0.6})`
              : `rgba(99, 102, 241, ${intensity * 0.4})`;
            ctx.fill();
          } else {
            // Animate dots with wave effect
            const animatedSize = dotSize * (0.7 + wave * 0.3);
            ctx.beginPath();
            ctx.arc(x, y, animatedSize, 0, Math.PI * 2);
            ctx.fillStyle = isDark
              ? `rgba(148, 163, 184, ${0.08 + wave * 0.08})`
              : `rgba(148, 163, 184, ${0.12 + wave * 0.08})`;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <>
      {/* Main animated canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-700"
      />

      {/* Subtle gradient overlays with smooth transitions */}
      <div className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/3 to-indigo-500/5 dark:from-purple-500/10 dark:via-blue-500/5 dark:to-indigo-500/10 animate-gradient-shift" />

        {/* Smaller floating gradient orbs for additional depth */}
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-radial from-violet-500/15 to-transparent dark:from-violet-500/20 dark:to-transparent blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-radial from-blue-500/15 to-transparent dark:from-blue-500/20 dark:to-transparent blur-3xl animate-float-slower" />
        <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-gradient-radial from-indigo-500/10 to-transparent dark:from-indigo-500/15 dark:to-transparent blur-3xl animate-float" />
      </div>
    </>
  );
};