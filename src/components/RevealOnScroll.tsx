import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number; // ms
  duration?: number; // ms
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export default function RevealOnScroll({
  children,
  delay = 0,
  duration = 800,
  direction = "up",
  className = "",
}: RevealOnScrollProps) {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Once it enters view, we stop observing to keep animation state fixed
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before hitting the exact fold
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  // Directional translation offsets
  const getTransform = () => {
    if (!isIntersecting) {
      switch (direction) {
        case "up":
          return "translateY(32px)";
        case "down":
          return "translateY(-32px)";
        case "left":
          return "translateX(32px)";
        case "right":
          return "translateX(-32px)";
        default:
          return "none";
      }
    }
    return "none";
  };

  return (
    <div
      ref={elementRef}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
        willChange: isIntersecting ? "auto" : "transform, opacity",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
