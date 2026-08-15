import React, { useState } from "react";
import { Cpu, Code, Database, Sparkles, Award } from "lucide-react";
import { getTechIcon } from "./TechIcons";

interface SkillDetail {
  name: string;
  category: string;
  level: number;
  years: string;
  projectsCount: number;
  description: string;
}

const DETAILED_SKILLS: SkillDetail[] = [
  { name: "Python", category: "Languages", level: 90, years: "2.5 years", projectsCount: 14, description: "Mastering Python syntax, object-oriented concepts, algorithms, automation scripting, and scientific data manipulation." },
  { name: "NumPy", category: "Data & Math", level: 85, years: "2 years", projectsCount: 8, description: "High-performance multidimensional array math, matrix transformations, linear algebra, vector operations, and numerical broadcasting." },
  { name: "Pandas", category: "Data Analysis", level: 84, years: "2 years", projectsCount: 9, description: "Structured data wrangling with DataFrames/Series, dataset cleansing, exploratory statistics, grouping aggregations, and CSV/JSON pipelines." },
  { name: "Node.js", category: "Backend", level: 86, years: "2 years", projectsCount: 12, description: "Asynchronous event-driven JavaScript server environments, non-blocking I/O routines, REST micro-services, and npm tooling." },
  { name: "React.js", category: "Frontend", level: 92, years: "2.5 years", projectsCount: 18, description: "Component-driven reactive architectures, hooks state synchronization, custom hooks, dynamic rendering optimizations, and Tailwind integration." },
  { name: "Express.js", category: "Backend", level: 85, years: "2 years", projectsCount: 11, description: "Minimalist and robust backend routing, REST API middleware architectures, request/response validation pipelines, and JSON API engines." },
  { name: "MongoDB", category: "Databases", level: 85, years: "2 years", projectsCount: 8, description: "Flexible document-based collections, aggregation pipelines, dynamic indexing, and seamless integration with Mongoose & Express." },
  { name: "MySQL & SQL", category: "Databases", level: 84, years: "2 years", projectsCount: 10, description: "Relational schemas, transactional queries, indexing, foreign keys, and connecting databases with REST/Node pipelines." },
  { name: "Java Core & OOP", category: "Languages", level: 90, years: "3 years", projectsCount: 14, description: "Highly proficient in Java 17+, complex object-oriented patterns, multithreading, modular code design, and data structures." },
  { name: "TypeScript", category: "Languages", level: 85, years: "1.5 years", projectsCount: 8, description: "Strong adherence to type interfaces, generic utilities, asynchronous patterns, and modern state-management integration." },
  { name: "Tailwind CSS", category: "Frontend", level: 95, years: "2.5 years", projectsCount: 22, description: "Expert in complex fluid flexbox/grid layout design, fully responsive custom layouts, transition states, and micro-animations." },
];

export default function SkillsVisualizer() {
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail>(DETAILED_SKILLS[0]);
  const [activeDimension, setActiveDimension] = useState<string | null>(null);

  // Radar dimension variables
  const dimensions = [
    { label: "Systems Architecture", val: 88, desc: "High rating in modular Java and OOP decoupling" },
    { label: "Dynamic Frontend", val: 94, desc: "Top velocity in Tailwind, React interfaces, and graphics" },
    { label: "Data Pipelines", val: 82, desc: "Familiarity with SQL schema layout and Python scripting" },
    { label: "Version Workflows", val: 88, desc: "Adherence to Git collaborative standards" },
    { label: "Creative Code", val: 90, desc: "Aesthetic math clocks, Web Audio synths, and canvas loops" }
  ];

  // Radar Chart coordinates solver
  const centerX = 150;
  const centerY = 150;
  const maxVal = 100;
  const r = 110;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 / dimensions.length) * index - Math.PI / 2;
    const distance = (value / maxVal) * r;
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);
    return { x, y };
  };

  // Generate web polygon paths
  const levels = [25, 50, 75, 100];
  const gridPolygons = levels.map((lvl) => {
    return dimensions.map((_, i) => {
      const { x, y } = getCoordinates(i, lvl);
      return `${x},${y}`;
    }).join(" ");
  });

  // Active user data path polygon
  const activePolygon = dimensions.map((d, i) => {
    const { x, y } = getCoordinates(i, d.val);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div id="skills-radar-matrix" className="p-8 rounded-3xl border border-white/5 bg-neutral-950/60 backdrop-blur-md">
      <div className="flex flex-col lg:flex-row items-stretch gap-10">
        
        {/* Left Column: Core interactive list of deep competencies */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 mb-3">
              <Award className="w-3.5 h-3.5 text-neon-cyan" />
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-neon-cyan">
                Engineering Diagnostics
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
              CORE CAPABILITIES ENGINE
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mb-6 leading-relaxed">
              Explore dynamic deep-dives into core libraries, compilers, and architectures. Tap a technology card to execute metadata diagnostics.
            </p>

            {/* Quick click items */}
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {DETAILED_SKILLS.map((skill) => {
                const icon = getTechIcon(skill.name, "w-4 h-4");
                const isSelected = selectedSkill.name === skill.name;
                return (
                  <button
                    key={skill.name}
                    onClick={() => setSelectedSkill(skill)}
                    className={`px-3.5 py-2.5 rounded-xl border font-mono text-xs text-left transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? "bg-neon-cyan/10 border-neon-cyan/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                        : "bg-white/[0.01] border-white/5 text-neutral-400 hover:bg-white/[0.03] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {icon && <span className="shrink-0">{icon}</span>}
                      <span className="truncate">{skill.name}</span>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? 'bg-neon-cyan animate-pulse' : 'bg-neutral-700'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Display Card */}
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 animate-[scale-slide-up_0.3s_ease_forwards]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
              <span className="font-mono text-[9px] text-neon-cyan uppercase tracking-widest block font-bold">
                DIAGNOSTIC TELEMETRY // {selectedSkill.name.toUpperCase()}
              </span>
              <div className="flex items-center gap-1.5">
                {getTechIcon(selectedSkill.name, "w-4 h-4")}
                <span className="font-mono text-[9px] text-neutral-400">{selectedSkill.category}</span>
              </div>
            </div>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4">
              {selectedSkill.description}
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-3">
              <div>
                <span className="font-mono text-[8px] text-neutral-500 uppercase block">PROFICIENCY</span>
                <span className="font-display text-sm font-bold text-white">{selectedSkill.level}% Mastery</span>
              </div>
              <div>
                <span className="font-mono text-[8px] text-neutral-500 uppercase block">EXPERIENCE</span>
                <span className="font-display text-sm font-bold text-white">{selectedSkill.years}</span>
              </div>
              <div>
                <span className="font-mono text-[8px] text-neutral-500 uppercase block">BUILD COUNT</span>
                <span className="font-display text-sm font-bold text-white">{selectedSkill.projectsCount} Repos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-craft SVG Radar Web Visualizer */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-4 rounded-3xl bg-neutral-950/40 border border-white/5">
          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-4">
            5-DIMENSIONAL TECH MATRIX RADAR
          </span>

          <div className="relative">
            {/* SVG Chart */}
            <svg width={300} height={300} className="overflow-visible">
              {/* Radial grid circles/polygons */}
              {gridPolygons.map((points, idx) => (
                <polygon
                  key={idx}
                  points={points}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                />
              ))}

              {/* Angle axis lines */}
              {dimensions.map((_, i) => {
                const { x, y } = getCoordinates(i, 100);
                return (
                  <line
                    key={i}
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.06)"
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                  />
                );
              })}

              {/* Glowing active data polygon */}
              <polygon
                points={activePolygon}
                fill="rgba(6, 182, 212, 0.08)"
                stroke="#06b6d4"
                strokeWidth="2"
                className="transition-all duration-700"
              />

              {/* Data Node dots */}
              {dimensions.map((d, i) => {
                const { x, y } = getCoordinates(i, d.val);
                const isSelected = activeDimension === d.label;
                return (
                  <g
                    key={i}
                    onMouseEnter={() => setActiveDimension(d.label)}
                    onMouseLeave={() => setActiveDimension(null)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? "#06b6d4" : "#ffffff"}
                      className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Labels placed absolutely around the SVG */}
            {dimensions.map((d, i) => {
              const { x, y } = getCoordinates(i, 100);
              // Calculate offsets for label placement
              const isTop = y < centerY - 30;
              const isBottom = y > centerY + 30;
              const isLeft = x < centerX - 30;
              const isRight = x > centerX + 30;

              let style: React.CSSProperties = {
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                left: `${(x / 300) * 100}%`,
                top: `${(y / 300) * 100}%`,
              };

              return (
                <div
                  key={i}
                  style={style}
                  className={`font-mono text-[9px] uppercase tracking-wider px-2 py-1 rounded border transition-all duration-300 pointer-events-none whitespace-nowrap ${
                    activeDimension === d.label
                      ? "bg-neon-cyan border-neon-cyan text-black font-extrabold"
                      : "bg-neutral-900 border-white/5 text-neutral-400"
                  }`}
                >
                  {d.label}
                </div>
              );
            })}
          </div>

          {/* Hover spec feedback */}
          <div className="mt-8 h-10 flex items-center justify-center text-center">
            {activeDimension ? (
              <p className="text-neon-cyan font-mono text-xs tracking-wider animate-pulse">
                {dimensions.find(d => d.label === activeDimension)?.desc}
              </p>
            ) : (
              <p className="text-neutral-500 font-mono text-xs">
                Hover over the radar vectors to read specific index diagnostics.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
