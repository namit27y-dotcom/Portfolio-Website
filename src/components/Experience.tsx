import { useEffect, useRef, useState } from "react";
import { Briefcase, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { Experience } from "../types";
import RevealOnScroll from "./RevealOnScroll";

const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Full Stack & Frontend Developer",
    company: "Independent Projects",
    period: "2026 — PRESENT",
    description: "Architecting personal portfolio, ATS-friendly resume builder, and responsive client-side widgets with interactive layouts.",
    highlights: [
      "Designed and built an ATS-Friendly AI Resume Builder utilizing Gemini APIs to format and score resume uploads.",
      "Created dynamic responsive currency conversion layouts pulling live REST rates via async Fetch API pipelines.",
      "Optimized personal portfolio using Vite and custom Tailwind structures, ensuring sub-200ms initial paint velocities.",
    ],
    accentColor: "border-electric-blue text-electric-glow",
  },
  {
    id: "exp-2",
    role: "Python & Java Developer",
    company: "Creative Code Lab",
    period: "2025 — 2026",
    description: "Engineering vector-physics calculations, collision logic, and clean Object-Oriented layouts using desktop graphics canvases.",
    highlights: [
      "Coded lightweight vector physics analog clocks and classic snake mechanics using Python's native Turtle libraries.",
      "Designed relational MySQL database schemas storing transactional logs and currency metrics safely.",
      "Implemented core OOP design patterns in Java to modularize codebases and increase readability parameters.",
    ],
    accentColor: "border-neon-purple text-neon-purple",
  },
  {
    id: "exp-3",
    role: "Student Developer",
    company: "Pillai College of Engineering",
    period: "2025 — PRESENT",
    description: "Mastering fundamental elements of computer science, responsive page layouts, and async data flows as a B.Tech Computer Science student.",
    highlights: [
      "Acquired rich competencies in HTML5, CSS3, ES6+ JavaScript, and responsive design parameters.",
      "Practiced structural Git/GitHub workflows, branching, and repository code-management protocols.",
      "Explored core data structures, database querying techniques, and algorithmic principles.",
    ],
    accentColor: "border-neon-cyan text-neon-cyan",
  },
];

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [lineHeight, setLineHeight] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if section is in viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Calculate scroll progress within the section bounds
        const sectionHeight = rect.height;
        const scrollOffset = viewportHeight - rect.top;
        const progress = Math.min(Math.max(scrollOffset / (sectionHeight + viewportHeight * 0.4), 0), 1);
        setLineHeight(progress * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 bg-[#050816] selection:bg-neon-purple/20 selection:text-white overflow-hidden"
    >
      {/* Decorative timeline boundary header link */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-24">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-neon-purple" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neon-purple">
                Career History
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
              EXPERIENCE
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-electric-blue to-transparent mx-auto" />
          </RevealOnScroll>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto py-10">
          
          {/* Central Progress Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[1.5px] bg-neutral-900 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-electric-blue via-neon-purple to-neon-cyan transition-all duration-75 origin-top"
              style={{ height: `${lineHeight}%` }}
            />
          </div>

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-16 md:gap-20">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-stretch justify-between w-full ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content Card Panel */}
                  <div className="w-full md:w-[45%] pl-10 md:pl-0">
                    <RevealOnScroll
                      direction={isEven ? "right" : "left"}
                      delay={100}
                      duration={800}
                    >
                      <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 relative group overflow-hidden">
                        {/* Shimmer top card boundary lines */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        {/* Timing indicator */}
                        <div className="flex items-center gap-2 mb-3 text-neutral-500 font-mono text-[10px] font-bold tracking-widest uppercase">
                          <Calendar className="w-3.5 h-3.5 text-neutral-600" />
                          <span>{exp.period}</span>
                        </div>

                        {/* Title Role Header */}
                        <div className="mb-4">
                          <span className="font-mono text-[10px] text-electric-glow font-bold uppercase tracking-widest block mb-1">
                            {exp.company}
                          </span>
                          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-electric-glow transition-colors">
                            {exp.role}
                          </h3>
                        </div>

                        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                          {exp.description}
                        </p>

                        {/* Bullet Highlights */}
                        <div className="flex flex-col gap-3">
                          {exp.highlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-3 text-left">
                              <CheckCircle2 className="w-4 h-4 text-electric-glow shrink-0 mt-0.5" />
                              <span className="text-neutral-300 text-xs leading-relaxed">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </RevealOnScroll>
                  </div>

                  {/* Pulsing Node Axis Circle */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-4 w-4 h-4 rounded-full bg-neutral-950 border border-white/20 z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-electric-glow animate-ping absolute" />
                    <div className="w-1.5 h-1.5 rounded-full bg-electric-glow" />
                  </div>

                  {/* Empty Spacer Column on opposite side */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
