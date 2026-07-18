import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Media query to check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const maxParticles = prefersReducedMotion ? 50 : 250;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          size: Math.random() * 1.5 + 0.5,
          baseAlpha: Math.random() * 0.2 + 0.1,
          alpha: 0,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resize();

    // Intersection Observer to pause rendering when canvas is out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Animation loop
    const render = () => {
      if (!ctx || !canvas) return;

      if (!isVisibleRef.current || prefersReducedMotion) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const attractionRadius = 150;
      const attractionForce = 0.04;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Particle Drift Physics
        p.x += p.vx;
        p.y += p.vy;

        // Mouse attraction logic
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          if (dist < attractionRadius) {
            const force = (attractionRadius - dist) / attractionRadius;
            p.x += (dx / dist) * force * attractionForce;
            p.y += (dy / dist) * force * attractionForce;
            // Increase glow alpha on proximity
            p.alpha = Math.min(p.baseAlpha * 2.5, p.alpha + 0.02);
          } else {
            p.alpha = Math.max(p.baseAlpha, p.alpha - 0.01);
          }
        } else {
          p.alpha = Math.max(p.baseAlpha, p.alpha - 0.01);
        }

        // Wrap boundaries elegantly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Render point with color based on index
        const isPurple = i % 2 === 0;
        ctx.fillStyle = isPurple 
          ? `rgba(139, 92, 246, ${p.alpha})` // Violet
          : `rgba(6, 182, 212, ${p.alpha})`; // Cyan
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      id="hero-particles"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
