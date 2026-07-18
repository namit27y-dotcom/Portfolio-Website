import { motion } from "motion/react";

interface SectionDividerProps {
  glowColor?: "cyan" | "purple";
  variant?: "pulse" | "wave" | "tech";
}

export default function SectionDivider({ glowColor = "cyan", variant = "pulse" }: SectionDividerProps) {
  const isPurple = glowColor === "purple";
  const accentColor = isPurple ? "bg-neon-purple" : "bg-electric-glow";
  const strokeColor = isPurple ? "#8b5cf6" : "#06b6d4";

  return (
    <div className="relative w-full py-16 flex items-center justify-center overflow-hidden pointer-events-none select-none bg-[#050816]">
      {/* 1. VARIANT: PULSE LINE */}
      {variant === "pulse" && (
        <>
          {/* Main Divider Line */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {/* Laser Pulse running across */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 left-0 w-32 h-[2px] bg-gradient-to-r from-transparent via-${glowColor === "purple" ? "neon-purple" : "electric-glow"} to-transparent opacity-50 animate-[laser-pulse_6s_linear_infinite]`}
          />

          {/* Glowing central orb and diamond */}
          <div className="relative z-10 flex items-center justify-center bg-[#050816] px-6">
            {/* Outer soft glow ring */}
            <div 
              className="absolute w-12 h-12 rounded-full border border-white/5 animate-ping opacity-25"
              style={{ animationDuration: '3s' }}
            />
            
            {/* Center animated icon */}
            <svg
              className="w-8 h-8 text-neutral-500 hover:text-white transition-colors duration-500 animate-[spin_15s_linear_infinite]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Star / diamond geometric path */}
              <path
                d="M50 15 L58 42 L85 50 L58 58 L50 85 L42 58 L15 50 L42 42 Z"
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-60"
              />
              <circle cx="50" cy="50" r="3" fill={strokeColor} className="animate-pulse" />
            </svg>
          </div>
        </>
      )}

      {/* 2. VARIANT: WAVE / SINE GRAPH */}
      {variant === "wave" && (
        <div className="w-full flex justify-center px-4 relative">
          {/* Center visual horizontal baseline */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          
          <svg className="w-full max-w-xl h-16 opacity-40 relative z-10" viewBox="0 0 800 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 50 C 200 100, 200 0, 400 50 C 600 100, 600 0, 800 50"
              stroke={`url(#wave-gradient-${glowColor})`}
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-[dash-flow_25s_linear_infinite]"
            />
            <defs>
              <linearGradient id={`wave-gradient-${glowColor}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor={strokeColor} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* 3. VARIANT: TECH PANEL CONNECTOR */}
      {variant === "tech" && (
        <div className="relative w-full flex items-center justify-center">
          {/* Grid Connector */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="relative z-10 flex items-center gap-3 px-6 bg-[#050816]">
            <span className="text-[8px] font-mono tracking-[0.4em] text-neutral-500 uppercase">SYSTEM_SEGMENT_ACTIVE</span>
            <div className="flex gap-1 items-center">
              <span className={`w-1.5 h-1.5 rounded-full ${accentColor} animate-pulse`} />
              <div className="h-4 w-[1px] bg-white/10" />
              <span className={`w-1 h-3 rounded-sm ${accentColor} opacity-70`} />
              <span className={`w-1 h-3 rounded-sm ${accentColor} opacity-30`} />
            </div>
          </div>
        </div>
      )}

      {/* Local keyframe styles */}
      <style>{`
        @keyframes laser-pulse {
          0% { left: -20%; }
          100% { left: 120%; }
        }
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -240;
          }
        }
      `}</style>
    </div>
  );
}
