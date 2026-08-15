import { useState } from "react";
import { Sparkles, Terminal, Palette, BrainCircuit, Component, Server, Code2, CheckCircle2 } from "lucide-react";
import { Skill } from "../types";
import RevealOnScroll from "./RevealOnScroll";
import SkillsVisualizer from "./SkillsVisualizer";
import { 
  getTechIcon, 
  PythonIcon, 
  NumpyIcon, 
  PandasIcon, 
  NodejsIcon, 
  ReactIcon, 
  ExpressIcon, 
  JavaIcon, 
  JavascriptIcon, 
  TypescriptIcon, 
  TailwindIcon, 
  MysqlIcon, 
  MongodbIcon,
  GitIcon 
} from "./TechIcons";

// Core Skills List with full representation of requested technologies and clear subtitles
const SKILLS_DATA: (Skill & { subtitle: string; status: string })[] = [
  // Category: Frontend
  { name: "React.js", subtitle: "Component Core & Custom Hooks", level: 92, category: "Frontend", status: "Advanced Mastery" },
  { name: "Tailwind CSS", subtitle: "Fluid Layouts & Design Systems", level: 95, category: "Frontend", status: "Expertise" },
  { name: "JavaScript (ES6+)", subtitle: "Modern Syntax & DOM Architecture", level: 90, category: "Frontend", status: "Advanced Mastery" },
  { name: "TypeScript", subtitle: "Strict Types & Interfaces", level: 85, category: "Frontend", status: "Production Ready" },
  { name: "HTML5 & Canvas 2D", subtitle: "Semantic Web & 2D Render Engine", level: 95, category: "Frontend", status: "Expertise" },
  { name: "CSS3 & Responsive Grids", subtitle: "Flexbox, Transitions & Animations", level: 92, category: "Frontend", status: "Advanced Mastery" },

  // Category: Backend & Databases
  { name: "Node.js", subtitle: "Event-Driven Async Runtime", level: 88, category: "Backend", status: "Production Ready" },
  { name: "Express.js", subtitle: "REST APIs & Middleware Pipelines", level: 86, category: "Backend", status: "Production Ready" },
  { name: "MongoDB", subtitle: "Document Store & NoSQL Aggregations", level: 85, category: "Backend", status: "Production Ready" },
  { name: "MySQL Database", subtitle: "Relational Schemas & SQL Queries", level: 84, category: "Backend", status: "Competent" },
  { name: "Async Promises & Fetch", subtitle: "RESTful Data Flow & Web Sockets", level: 90, category: "Backend", status: "Advanced Mastery" },

  // Category: Programming & Core Languages
  { name: "Python", subtitle: "Scripting, Math & Data Structures", level: 90, category: "Programming", status: "Advanced Mastery" },
  { name: "Java", subtitle: "OOP Architecture & Multithreading", level: 88, category: "Programming", status: "Advanced Mastery" },
  { name: "JavaScript (Core)", subtitle: "Asynchronous Event Loop & V8", level: 90, category: "Programming", status: "Advanced Mastery" },
  { name: "TypeScript", subtitle: "Static Typing & Generics", level: 85, category: "Programming", status: "Production Ready" },
  { name: "Data Structures & Algos", subtitle: "Trees, Graphs & Time Complexity", level: 85, category: "Programming", status: "Strong Core" },
  { name: "C & Systems Concepts", subtitle: "Memory Layouts & Low-level logic", level: 80, category: "Programming", status: "Academic Core" },

  // Category: Data & AI
  { name: "NumPy", subtitle: "Multi-dimensional Array Math & Matrix", level: 86, category: "Future Learning", status: "Active Application" },
  { name: "Pandas", subtitle: "DataFrames, Cleansing & Analytics", level: 85, category: "Future Learning", status: "Active Application" },
  { name: "AI/ML Model Pipelines", subtitle: "Tensor Operations & Preprocessing", level: 75, category: "Future Learning", status: "Exploring" },
  { name: "Large Language Models", subtitle: "Gemini API, Context Windows & Agents", level: 78, category: "Future Learning", status: "Hands-on Projects" },
  { name: "RAG Info Retrievers", subtitle: "Vector Search & Retrieval Pipelines", level: 72, category: "Future Learning", status: "Exploring" },

  // Category: Dev Tools
  { name: "Git", subtitle: "Version Control & Branching Flow", level: 88, category: "Dev Tools", status: "Daily Driver" },
  { name: "GitHub", subtitle: "Collaboration, PRs & Workflows", level: 90, category: "Dev Tools", status: "Daily Driver" },
  { name: "VS Code", subtitle: "Custom Workspaces & Debuggers", level: 92, category: "Dev Tools", status: "Primary IDE" },
  { name: "IntelliJ IDEA", subtitle: "Java Profiling & Enterprise Tools", level: 85, category: "Dev Tools", status: "IDE Tool" },
  { name: "Vite Pipelines", subtitle: "Fast HMR & Optimized Bundles", level: 88, category: "Dev Tools", status: "Build Engine" },
];

const CATEGORIES = [
  { id: "Frontend", label: "Frontend", icon: Terminal },
  { id: "Backend", label: "Backend", icon: Server },
  { id: "Programming", label: "Languages", icon: BrainCircuit },
  { id: "Future Learning", label: "Data & AI", icon: Palette },
  { id: "Dev Tools", label: "Dev Tools", icon: Component },
] as const;

// Highlighted Language & Framework cards for top showcase
const FEATURED_LANGUAGES = [
  {
    name: "Python",
    role: "Language & Scripting",
    icon: <PythonIcon className="w-9 h-9" />,
    level: 90,
    accent: "border-blue-500/30 hover:border-blue-400/60 shadow-[0_0_20px_rgba(56,126,184,0.15)]",
    glow: "rgba(56,126,184,0.25)",
    description: "Object-oriented scripting, algorithmic modeling, automation, and data processing.",
  },
  {
    name: "NumPy",
    role: "Matrix Math Arrays",
    icon: <NumpyIcon className="w-9 h-9" />,
    level: 86,
    accent: "border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(77,171,207,0.15)]",
    glow: "rgba(77,171,207,0.25)",
    description: "Multidimensional vector computations, matrix math, broadcasting, and numerical analysis.",
  },
  {
    name: "Pandas",
    role: "DataFrames & Analytics",
    icon: <PandasIcon className="w-9 h-9" />,
    level: 85,
    accent: "border-fuchsia-500/30 hover:border-fuchsia-400/60 shadow-[0_0_20px_rgba(231,4,136,0.15)]",
    glow: "rgba(231,4,136,0.25)",
    description: "Data manipulation, dataset cleansing, statistical aggregations, and CSV/JSON pipelines.",
  },
  {
    name: "Node.js",
    role: "Async Server Runtime",
    icon: <NodejsIcon className="w-9 h-9" />,
    level: 88,
    accent: "border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_0_20px_rgba(95,160,78,0.15)]",
    glow: "rgba(95,160,78,0.25)",
    description: "High-performance event-driven server runtime, async microservices, and npm tooling.",
  },
  {
    name: "React.js",
    role: "Reactive UI Framework",
    icon: <ReactIcon className="w-9 h-9" />,
    level: 92,
    accent: "border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(97,218,251,0.15)]",
    glow: "rgba(97,218,251,0.25)",
    description: "Declarative component-driven interfaces, custom hook state flows, and modular UX.",
  },
  {
    name: "Express.js",
    role: "REST API Backend",
    icon: <ExpressIcon className="w-9 h-9" />,
    level: 86,
    accent: "border-sky-500/30 hover:border-sky-400/60 shadow-[0_0_20px_rgba(56,189,248,0.15)]",
    glow: "rgba(56,189,248,0.25)",
    description: "Minimalist server routing, custom REST middleware pipelines, and API endpoints.",
  },
  {
    name: "Java",
    role: "OOP & Systems Core",
    icon: <JavaIcon className="w-9 h-9" />,
    level: 88,
    accent: "border-orange-500/30 hover:border-orange-400/60 shadow-[0_0_20px_rgba(237,139,0,0.15)]",
    glow: "rgba(237,139,0,0.25)",
    description: "Strict object-oriented programming, inheritance, multithreading, and algorithmic design.",
  },
  {
    name: "TypeScript",
    role: "Static Type Engine",
    icon: <TypescriptIcon className="w-9 h-9" />,
    level: 85,
    accent: "border-blue-500/30 hover:border-blue-400/60 shadow-[0_0_20px_rgba(49,120,198,0.15)]",
    glow: "rgba(49,120,198,0.25)",
    description: "Strict type safety, generic interfaces, scalable architecture, and error-free refactoring.",
  },
];

// Rich Language & Skill Card with prominent Icon and Animated Progress Bar
function SkillCard({ 
  name, 
  subtitle,
  level, 
  status,
  index 
}: { 
  name: string; 
  subtitle: string;
  level: number; 
  status: string;
  index: number;
}) {
  const icon = getTechIcon(name, "w-8 h-8");

  return (
    <div
      style={{ animationDelay: `${index * 50}ms` }}
      className="p-5 rounded-2xl border border-white/10 bg-neutral-900/40 hover:bg-neutral-900/80 hover:border-neon-cyan/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md hover:shadow-[0_4px_25px_rgba(6,182,212,0.12)] hover:-translate-y-1"
    >
      {/* Decorative hover gradient corner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Top Section: Icon, Name, Subtitle, and Percentage Badge */}
      <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Prominent Language / Tech Icon Container */}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-neutral-950/80 border border-white/10 shrink-0 group-hover:border-neon-cyan/30 group-hover:scale-105 transition-all duration-300 shadow-inner">
            {icon || <Code2 className="w-6 h-6 text-neon-cyan" />}
          </div>

          {/* Title & Subtitle */}
          <div className="min-w-0">
            <h4 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-neon-cyan transition-colors truncate">
              {name}
            </h4>
            <p className="font-sans text-[11px] text-neutral-400 truncate mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Level Percentage Tag */}
        <div className="flex flex-col items-end shrink-0">
          <span className="font-mono text-xs sm:text-sm font-extrabold text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20 px-2 py-0.5 rounded-md">
            {level}%
          </span>
        </div>
      </div>

      {/* Bottom Section: Progress Bar and Status Label */}
      <div className="mt-2 relative z-10">
        {/* Horizontal glowing progress bar */}
        <div className="w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden border border-white/5 p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-electric-blue via-neon-cyan to-emerald-400 rounded-full transition-all duration-1000 ease-out group-hover:brightness-125"
            style={{ width: `${level}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2 font-mono text-[10px]">
          <span className="text-neutral-500 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {status}
          </span>
          <span className="text-neutral-500 group-hover:text-neutral-300 transition-colors">
            Mastery Score
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Skill["category"]>("Frontend");
  const [hoveredFeatured, setHoveredFeatured] = useState<string | null>(null);

  const filteredSkills = SKILLS_DATA.filter((skill) => skill.category === activeTab);

  return (
    <section id="skills" className="relative py-32 bg-[#050816] selection:bg-neon-cyan/20 selection:text-white overflow-hidden">
      {/* Decorative Ambient Aura behind section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-neon-cyan/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neon-cyan">
                Technical Stack & Capabilities
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
              SKILLS & LANGUAGES
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Equipped with deep proficiency in Python, numerical matrices (NumPy & Pandas), reactive frontends (React.js), asynchronous server APIs (Node.js & Express.js), and strict OOP architecture.
            </p>
          </RevealOnScroll>
        </div>

        {/* 1. FEATURED LANGUAGE ICONS SHOWCASE GRID */}
        <div className="mb-16">
          <RevealOnScroll>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-neon-cyan" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-bold">
                  Core Technologies & Language Ecosystem
                </h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase hidden sm:inline">
                Hover for Live Telemetry
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
              {FEATURED_LANGUAGES.map((item) => {
                const isHovered = hoveredFeatured === item.name;
                return (
                  <div
                    key={item.name}
                    onMouseEnter={() => setHoveredFeatured(item.name)}
                    onMouseLeave={() => setHoveredFeatured(null)}
                    className={`p-4 rounded-2xl border bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-300 flex flex-col items-center text-center group relative cursor-pointer ${
                      isHovered
                        ? `${item.accent} scale-105 bg-neutral-900/90`
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    {/* Icon container */}
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-neutral-950 border border-white/10 mb-3 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      {item.icon}
                    </div>

                    {/* Title */}
                    <span className="font-display text-xs font-bold text-white mb-0.5 group-hover:text-neon-cyan transition-colors">
                      {item.name}
                    </span>

                    {/* Proficiency Tag */}
                    <span className="font-mono text-[9px] text-neutral-400">
                      {item.level}% Mastery
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Dynamic details strip for hovered tech */}
            {hoveredFeatured && (
              <div className="mt-4 p-4 rounded-xl border border-neon-cyan/30 bg-neutral-900/90 backdrop-blur-md flex items-center justify-between gap-4 animate-[fade-slide-up_0.2s_ease_forwards] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {(() => {
                  const curr = FEATURED_LANGUAGES.find((l) => l.name === hoveredFeatured);
                  if (!curr) return null;
                  return (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-neutral-950 border border-white/10">
                          {curr.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-sm font-bold text-white">{curr.name}</span>
                            <span className="font-mono text-[10px] text-neon-cyan uppercase font-semibold">({curr.role})</span>
                          </div>
                          <p className="text-xs text-neutral-300 mt-0.5">{curr.description}</p>
                        </div>
                      </div>
                      <div className="hidden sm:flex flex-col items-end">
                        <span className="font-mono text-[10px] text-neutral-400">Proficiency Score</span>
                        <span className="font-display text-sm font-extrabold text-neon-cyan">{curr.level}%</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </RevealOnScroll>
        </div>

        {/* 2. CATEGORY SELECTOR TABS */}
        <RevealOnScroll delay={100} className="flex justify-center mb-10">
          <div className="grid grid-cols-3 sm:flex items-center gap-1.5 p-1.5 rounded-2xl bg-neutral-950 border border-white/10 backdrop-blur-md w-full max-w-3xl">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wide transition-all duration-300 relative w-full ${
                    isActive
                      ? "text-white bg-white/10 border border-white/20 shadow-md"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-neon-cyan" : "text-neutral-500"}`} />
                  <span className="truncate">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* 3. DYNAMIC SKILLS CARDS GRID WITH CRISP LANGUAGE ICONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {filteredSkills.map((skill, index) => (
            <div key={skill.name}>
              <RevealOnScroll delay={index * 40} duration={600}>
                <SkillCard 
                  name={skill.name} 
                  subtitle={skill.subtitle}
                  level={skill.level} 
                  status={skill.status}
                  index={index} 
                />
              </RevealOnScroll>
            </div>
          ))}
        </div>

        {/* 4. DYNAMIC SKILLS RADAR MATRIX & DEEP TELEMETRY */}
        <RevealOnScroll delay={150}>
          <SkillsVisualizer />
        </RevealOnScroll>
      </div>
    </section>
  );
}
