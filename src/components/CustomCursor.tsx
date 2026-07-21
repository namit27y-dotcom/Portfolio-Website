import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState<boolean>(true);
  
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  // Real mouse coordinates
  const mouseRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  // Interpolated ring coordinates for organic lag
  const ringPosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });

  useEffect(() => {
    // Detect touch device
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const checkTouch = () => {
      const isCoarse = touchQuery.matches || "ontouchstart" in window;
      setIsTouch(isCoarse);
      if (!isCoarse) {
        document.body.classList.add("custom-cursor-active");
      } else {
        document.body.classList.remove("custom-cursor-active");
      }
    };

    checkTouch();
    touchQuery.addEventListener("change", checkTouch);

    if (isTouch) return;

    let latestX = -100;
    let latestY = -100;
    let rfaPending = false;
    let lastExecuted = 0;
    let trailingTimeout: ReturnType<typeof setTimeout> | null = null;
    const THROTTLE_INTERVAL = 8; // 8ms throttle limit (~125Hz) for extreme tracking performance

    const updateCoordinates = () => {
      mouseRef.current = { x: latestX, y: latestY };

      // Update dot position inside the animation frame to prevent main thread layout thrashing
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${latestX}px, ${latestY}px, 0)`;
      }
      rfaPending = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;

      if (trailingTimeout) {
        clearTimeout(trailingTimeout);
      }

      const now = performance.now();
      const timeSinceLast = now - lastExecuted;

      if (timeSinceLast >= THROTTLE_INTERVAL) {
        if (!rfaPending) {
          rfaPending = true;
          lastExecuted = now;
          requestAnimationFrame(updateCoordinates);
        }
      } else {
        // Ensure the last movement is always captured (trailing edge execution)
        trailingTimeout = setTimeout(() => {
          if (!rfaPending) {
            rfaPending = true;
            requestAnimationFrame(updateCoordinates);
          }
        }, THROTTLE_INTERVAL - timeSinceLast + 1);
      }
    };

    // Smooth spring animation for the outer ring
    let animationId: number;
    const updateRing = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      // Spring formula: position = current + (target - current) * factor
      const speed = 0.22; // Slightly snappier tracking
      ringPosRef.current.x += (targetX - ringPosRef.current.x) * speed;
      ringPosRef.current.y += (targetY - ringPosRef.current.y) * speed;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationId = requestAnimationFrame(updateRing);
    };

    animationId = requestAnimationFrame(updateRing);

    // Global Hover Detection using Event Delegation & Direct DOM
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor-hover], .clickable'
      );

      if (interactiveEl && ringRef.current) {
        ringRef.current.classList.add("ring-hovered");
        const text = interactiveEl.getAttribute("data-cursor-text") || "";
        if (textRef.current) {
          textRef.current.textContent = text;
          if (text) {
            textRef.current.classList.remove("hidden");
            textRef.current.classList.add("block");
          } else {
            textRef.current.classList.add("hidden");
            textRef.current.classList.remove("block");
          }
        }
      } else if (ringRef.current) {
        ringRef.current.classList.remove("ring-hovered");
        if (textRef.current) {
          textRef.current.textContent = "";
          textRef.current.classList.add("hidden");
          textRef.current.classList.remove("block");
        }
      }
    };

    // Fast Ripple Creation using Direct DOM Injection (Avoids React State entirely)
    const handleMouseDown = (e: MouseEvent) => {
      const ripple = document.createElement("div");
      ripple.className = "fixed pointer-events-none rounded-full border border-electric-glow/50 z-[9998]";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.width = "6px";
      ripple.style.height = "6px";
      ripple.style.animation = "ripple-out 0.35s cubic-bezier(0.1, 0.8, 0.3, 1) forwards";
      
      document.body.appendChild(ripple);

      // Pulse the ring on click
      if (ringRef.current) {
        ringRef.current.style.transition = "transform 0.1s ease-out, border-color 0.1s, background-color 0.1s, width 0.1s, height 0.1s";
        ringRef.current.classList.add("ring-clicked");
      }

      setTimeout(() => {
        ripple.remove();
        if (ringRef.current) {
          ringRef.current.style.transition = "";
          ringRef.current.classList.remove("ring-clicked");
        }
      }, 350);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      touchQuery.removeEventListener("change", checkTouch);
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationId);
      if (trailingTimeout) {
        clearTimeout(trailingTimeout);
      }
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -mt-1 -ml-1 w-2 h-2 bg-electric-glow rounded-full pointer-events-none z-[9999] transition-transform duration-75 mix-blend-difference"
      />

      {/* Outer Lag Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-electric-glow/30 pointer-events-none z-[9999] flex items-center justify-center transition-all duration-150 mix-blend-screen"
      >
        <span
          ref={textRef}
          className="text-[9px] font-mono font-bold tracking-wider text-white uppercase hidden animate-[fade-in_0.15s_ease_forwards]"
        />
      </div>

      {/* Optimized keyframe animations and utility classes */}
      <style>{`
        @keyframes ripple-out {
          0% {
            width: 6px;
            height: 6px;
            opacity: 1;
            border-color: rgba(6, 182, 212, 0.6);
          }
          100% {
            width: 50px;
            height: 50px;
            opacity: 0;
            border-color: rgba(139, 92, 246, 0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        .ring-hovered {
          width: 56px !important;
          height: 56px !important;
          background-color: rgba(79, 70, 229, 0.12) !important;
          border-color: #06b6d4 !important;
        }
        .ring-clicked {
          transform: translate3d(0, 0, 0) translate(-50%, -50%) scale(0.75) !important;
          border-color: #8b5cf6 !important;
        }
      `}</style>
    </>
  );
}
