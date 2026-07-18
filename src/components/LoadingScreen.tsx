import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [prefersReduced, setPrefersReduced] = useState<boolean>(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPrefersReduced(reducedMotion);

    if (reducedMotion) {
      onComplete();
      return;
    }

    // Progress counter (Capped at ~1.1s)
    const duration = 1100;
    const intervalTime = 30;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(timer);
        // Start fading out
        setTimeout(() => {
          setIsFadingOut(true);
          // Fully complete after crossfade finishes (350ms)
          setTimeout(() => {
            onComplete();
          }, 350);
        }, 150);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (prefersReduced) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-300 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Aurora Glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-electric-blue/10 rounded-full filter blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-neon-purple/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Interactive geometric SVG logo */}
      <div className="relative mb-8 w-24 h-24">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-white"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Animated diamond container */}
          <path
            d="M50 5 L95 50 L50 95 L5 50 Z"
            stroke="url(#logo-grad)"
            strokeWidth="2"
            strokeDasharray="400"
            strokeDashoffset={400 - (400 * progress) / 100}
            className="transition-all duration-75"
          />
          {/* Internal aesthetic lines */}
          <line
            x1="50"
            y1="5"
            x2="50"
            y2="95"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />
          <line
            x1="5"
            y1="50"
            x2="95"
            y2="50"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />
          {/* Core glow orb */}
          <circle
            cx="50"
            cy="50"
            r={3 + (5 * progress) / 100}
            fill="url(#logo-grad-core)"
            className="opacity-80 transition-all duration-75"
          />

          <defs>
            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <radialGradient id="logo-grad-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Progress indicators */}
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-xs font-bold tracking-widest text-neutral-400">
          INITIALIZING CORE
        </span>
        <div className="w-48 h-[2px] bg-neutral-900 rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-electric-blue via-neon-purple to-neon-cyan transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-[10px] text-neutral-500 font-bold tracking-widest">
          {progress}%
        </span>
      </div>
    </div>
  );
}
