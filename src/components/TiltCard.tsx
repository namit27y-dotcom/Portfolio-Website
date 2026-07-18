import { useRef, useState, MouseEvent, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glowStyle, setGlowStyle] = useState<{ x: string; y: string; opacity: number }>({
    x: "50%",
    y: "50%",
    opacity: 0,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    // Skip tilt if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (from -0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Calculate rotation angles
    // Moving mouse up (negative relativeY) should tilt card backward (negative rotateX)
    const rotX = relativeY * -maxTilt * 2;
    const rotY = relativeX * maxTilt * 2;

    setRotateX(rotX);
    setRotateY(rotY);

    // Calculate spotlight/glow coordinates
    const glowX = `${(e.clientX - rect.left / width) * 100}%`;
    const glowY = `${(e.clientY - rect.top / height) * 100}%`;

    setGlowStyle({
      x: `${(e.clientX - rect.left) / width * 100}%`,
      y: `${(e.clientY - rect.top) / height * 100}%`,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    // Smoothly spring-damp back to original position
    setRotateX(0);
    setRotateY(0);
    setGlowStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 150ms cubic-bezier(0.25, 1, 0.5, 1)",
        willChange: "transform",
      }}
      className={`relative group ${className}`}
    >
      {/* Dynamic blurred shadow elements that shift opposite to tilt */}
      <div
        className="absolute -inset-2 rounded-[32px] bg-electric-blue/10 opacity-0 blur-xl group-hover:opacity-40 pointer-events-none transition-all duration-300"
        style={{
          transform: `translate3d(${rotateY * -0.6}px, ${rotateX * 0.6}px, -10px)`,
        }}
      />
      <div
        className="absolute -inset-2 rounded-[32px] bg-neon-purple/10 opacity-0 blur-xl group-hover:opacity-40 pointer-events-none transition-all duration-300 delay-75"
        style={{
          transform: `translate3d(${rotateY * -0.4}px, ${rotateX * 0.4}px, -15px)`,
        }}
      />

      {/* Actual Glass Panel Container */}
      <div className="relative h-full w-full overflow-hidden rounded-[24px] border border-white/5 bg-neutral-950/40 backdrop-blur-xl transition-colors duration-300 group-hover:border-white/10">
        
        {/* Spot/Glow Follower inside the card */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${glowStyle.x} ${glowStyle.y}, rgba(255, 255, 255, ${glowStyle.opacity}), transparent 80%)`,
          }}
        />

        {children}
      </div>
    </div>
  );
}
