import { useState } from "react";
import { Sparkles, Terminal, Palette, BrainCircuit, Component } from "lucide-react";
import { Skill } from "../types";
import RevealOnScroll from "./RevealOnScroll";

const SKILLS_DATA: Skill[] = [
  // Category: Frontend
  { name: "HTML5 / Canvas 2D", level: 95, category: "Frontend" },
  { name: "CSS3 / Custom Grids", level: 92, category: "Frontend" },
  { name: "JavaScript (ES6+ Core)", level: 90, category: "Frontend" },
  { name: "Responsive Web Layouts", level: 94, category: "Frontend" },
  { name: "Modern UI/UX Designs", level: 88, category: "Frontend" },
  { name: "React.js Component Core", level: 75, category: "Frontend" },

  // Category: Programming
  { name: "Java OOP Structures", level: 85, category: "Programming" },
  { name: "Python Scripting & Math", level: 88, category: "Programming" },
  { name: "MySQL Schema Queries", level: 80, category: "Programming" },
  { name: "Async Promises & Await", level: 85, category: "Programming" },
  { name: "Fetch & RESTful Pipelines", level: 82, category: "Programming" },

  // Category: Dev Tools
  { name: "Git Version Control", level: 85, category: "Dev Tools" },
  { name: "GitHub Collaboration", level: 88, category: "Dev Tools" },
  { name: "VS Code Custom Workspace", level: 90, category: "Dev Tools" },
  { name: "IntelliJ IDEA Tools", level: 84, category: "Dev Tools" },
  { name: "DOM Manipulation Systems", level: 88, category: "Dev Tools" },

  // Category: Future Learning
  { name: "NumPy Data Matrices", level: 75, category: "Future Learning" },
  { name: "Pandas DataFrames", level: 72, category: "Future Learning" },
  { name: "AI/ML Model Pipelines", level: 70, category: "Future Learning" },
  { name: "Large Language Models", level: 65, category: "Future Learning" },
  { name: "RAG Info Retrievers", level: 60, category: "Future Learning" },
];

const CATEGORIES = [
  { id: "Frontend", label: "Frontend", icon: Terminal },
  { id: "Programming", label: "Languages", icon: BrainCircuit },
  { id: "Dev Tools", label: "Dev Tools", icon: Component },
  { id: "Future Learning", label: "Currently Learning", icon: Palette },
] as const;

// Interactive SVG Progress Ring Component
function SkillRing({ name, level, index }: { name: string; level: number; index: number }) {
  const radius = 35;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div
      style={{ animationDelay: `${index * 80}ms` }}
      className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden animate-[float_6s_ease-in-out_infinite]"
    >
      {/* Decorative hover gradient corner glow */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-electric-blue/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* SVG Vector Progress Ring */}
      <div className="relative w-20 h-20 mb-4 transform group-hover:scale-105 transition-transform duration-300">
        <svg className="w-full h-full transform -rotate-90">
          {/* Outer silent background circle */}
          <circle
            className="text-neutral-900"
            strokeWidth={stroke}
            stroke="currentColor"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Active progress circle path */}
          <circle
            className="text-electric-glow transition-all duration-[1500ms] ease-out stroke-linecap-round"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            stroke="url(#skill-grad)"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <defs>
            <linearGradient id="skill-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-white">
          {level}%
        </span>
      </div>

      <h4 className="font-display text-sm font-bold text-neutral-200 group-hover:text-white transition-colors">
        {name}
      </h4>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Skill["category"]>("Frontend");

  const filteredSkills = SKILLS_DATA.filter((skill) => skill.category === activeTab);

  return (
    <section id="skills" className="relative py-32 bg-[#050816] selection:bg-neon-cyan/20 selection:text-white overflow-hidden">
      {/* Decorative Ambient Aura behind section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neon-cyan">
                Expertise Grid
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
              SKILLS & STACK
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Bridging functional frontend frameworks, async cluster architecture, visual motion shaders, and responsive typographic systems.
            </p>
          </RevealOnScroll>
        </div>

        {/* Bento Selector Tabs */}
        <RevealOnScroll delay={100} className="flex justify-center mb-16">
          <div className="grid grid-cols-2 md:flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-950 border border-white/5 backdrop-blur-md w-full max-w-2xl">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-mono text-xs font-semibold tracking-wide transition-all duration-300 relative w-full ${
                    isActive
                      ? "text-white bg-white/5 border border-white/10"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-neon-cyan" : "text-neutral-500"}`} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Dynamic skills visual panel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredSkills.map((skill, index) => (
            <div key={skill.name}>
              <RevealOnScroll delay={index * 50} duration={800}>
                <SkillRing name={skill.name} level={skill.level} index={index} />
              </RevealOnScroll>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
