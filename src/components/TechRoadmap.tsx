import React, { useState } from "react";
import { 
  Cpu, Code2, ShieldAlert, BrainCircuit, LineChart, Award, 
  Terminal, GraduationCap, ChevronRight, CheckCircle2, Star, Calendar, Bookmark
} from "lucide-react";
import { playKeyboardClick } from "./FocusSoundboard";

interface RoadmapNode {
  id: string;
  title: string;
  phase: string;
  date: string;
  icon: React.ReactNode;
  category: "Core OOP" | "Security" | "AI & Data" | "Web Orchestration";
  status: "Completed" | "Active" | "Advanced Mastery";
  summary: string;
  description: string;
  gradeMetric?: string;
  projectConnected?: {
    name: string;
    description: string;
    tech: string;
  };
  credential?: {
    title: string;
    issuer: string;
    id: string;
    date: string;
    tasks?: string[];
  };
}

const ROADMAP_NODES: RoadmapNode[] = [
  {
    id: "java-core",
    title: "Java Programming & OOP Core",
    phase: "Phase 1: Computer Engineering Core",
    date: "Academic Year 2025 — 2026",
    icon: <Cpu className="w-5 h-5 text-emerald-400" />,
    category: "Core OOP",
    status: "Completed",
    summary: "Mastered fundamental Java, multithreading, and event-driven Swing interface engines.",
    description: "Built deep structural computing foundations at Pillai College of Engineering, achieving absolute mastery in object-oriented structures, class decoupling, and GUI layout managers.",
    gradeMetric: "Pillai CE Grade Card: 'O' Grade (Outstanding, 10/10 Grade Points)",
    projectConnected: {
      name: "Student Portal Login Application",
      description: "Desktop GUI dashboard leveraging Java Swing, GridBagLayout, JPasswordField masks, and secure event-listener classes.",
      tech: "Java Core, Swing UI, AWT Graphics Engine"
    },
    credential: {
      title: "First Year Bachelor of Engineering (B.E.) Grade Card",
      issuer: "Pillai College of Engineering (University of Mumbai)",
      id: "SGPI: 9.05 / CGPA Master",
      date: "May 2026",
      tasks: [
        "CE102 Java Programming - Grade O",
        "MATH102 Engineering Mathematics II - Grade A (9 GP)",
        "ENGG101 Basic Electrical Engineering - Grade A"
      ]
    }
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking & Penetration Testing",
    phase: "Phase 1: Computer Engineering Core",
    date: "February 2026",
    icon: <ShieldAlert className="w-5 h-5 text-red-400" />,
    category: "Security",
    status: "Completed",
    summary: "Acquired fundamental offensive & defensive shell hacking competencies.",
    description: "Participated in intensive cyber security modules during Pillai University's flagship Alegria 2026 symposium.",
    credential: {
      title: "Certificate of Participation: Ethical Hacking",
      issuer: "Mahatma Education Society, Pillai University",
      id: "ALEGRIA-2026-HACK-749",
      date: "Feb 3rd — 7th, 2026",
      tasks: [
        "Network penetration and shell injection",
        "Credential handshake sniffing audits",
        "Bypassing insecure firewalls",
        "Securing local sandbox nodes"
      ]
    }
  },
  {
    id: "prompt-eng",
    title: "Prompt Engineering & Generative AI",
    phase: "Phase 2: AI & Data Science",
    date: "February 2026",
    icon: <BrainCircuit className="w-5 h-5 text-cyan-400" />,
    category: "AI & Data",
    status: "Completed",
    summary: "Pioneered LLM context design, agent structures, and visual prompt matrixing.",
    description: "Completed specialized training in generative artificial intelligence modeling during Pillai University's Alegria 2026.",
    credential: {
      title: "Certificate of Participation: Prompt Engineering & Gen AI",
      issuer: "Pillai University (Alegria 2026 Festival of Joy)",
      id: "ALEGRIA-2026-GENAI-118",
      date: "Feb 3rd — 7th, 2026",
      tasks: [
        "Contextual system instructions and parameter constraints",
        "Few-shot chain-of-thought orchestration",
        "Dynamic embedding and Retrieval-Augmented Generation basics",
        "Ethical GenAI compliance parameters"
      ]
    }
  },
  {
    id: "tata-data",
    title: "GenAI Powered Data Analytics",
    phase: "Phase 2: AI & Data Science",
    date: "July 2026",
    icon: <LineChart className="w-5 h-5 text-blue-400" />,
    category: "AI & Data",
    status: "Completed",
    summary: "Executed real-world risk modeling and AI-driven collections strategy simulation.",
    description: "Completed a prestigious corporate job simulation focusing on raw financial transformations, predictive AI, and executive risk analysis reports.",
    credential: {
      title: "GenAI Powered Data Analytics Job Simulation Certification",
      issuer: "Tata Group & Forage",
      id: "FORAGE-TATA-GENAI-JULY-2026",
      date: "July 10th, 2026",
      tasks: [
        "Exploratory data analysis and financial risk profiling",
        "Predicting account delinquency with AI modeling",
        "Synthesizing business report storytelling with interactive charts",
        "Implementing an AI-driven predictive collection strategy"
      ]
    }
  },
  {
    id: "deloitte-cyber",
    title: "Cyber Security Simulation",
    phase: "Phase 3: Advanced Operations",
    date: "July 2026",
    icon: <ShieldAlert className="w-5 h-5 text-pink-400" />,
    category: "Security",
    status: "Completed",
    summary: "Simulated industrial grade risk posture, firewall rulesets, and encryption compliance.",
    description: "Completed practical security engineering challenges mapping corporate assets, vulnerability patches, and zero-trust tunnel routing.",
    credential: {
      title: "Cyber Security Job Simulation Certificate",
      issuer: "Deloitte & Forage",
      id: "FORAGE-DELOITTE-CYBER-2026",
      date: "July 18th, 2026",
      tasks: [
        "Vulnerability scanning and patch validation audits",
        "Securing database endpoints from injection vectors",
        "Configuring zero-trust network topology structures",
        "Corporate incident response & system recovery logs"
      ]
    }
  },
  {
    id: "web-orch",
    title: "Modern Web Orchestration & Cloud Engine",
    phase: "Phase 4: High-Performance Web Architectures",
    date: "July 2026 — Present",
    icon: <Code2 className="w-5 h-5 text-purple-400" />,
    category: "Web Orchestration",
    status: "Advanced Mastery",
    summary: "Connecting React core interfaces with optimized cloud backends, Web Audio engines, and motion vectors.",
    description: "Orchestrated advanced portfolio structures, modular state engines, customizable interactive terminal consoles, and secure database persistence systems.",
    projectConnected: {
      name: "AI ATS Resume Builder & Cinematic Portfolio",
      description: "Comprehensive ATS extraction tool paired with physics canvases, dual audio soundboards, and custom CSS.",
      tech: "React 18+, Vite Core, Tailwind, motion, Web Audio API"
    }
  }
];

export default function TechRoadmap() {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode>(ROADMAP_NODES[0]);

  const handleSelectNode = (node: RoadmapNode) => {
    playKeyboardClick();
    setSelectedNode(node);
  };

  // Coordinates solver for a fluid connecting vector line in the UI
  return (
    <div className="p-8 rounded-3xl border border-white/5 bg-neutral-950/60 backdrop-blur-md relative overflow-hidden">
      
      {/* Visual glowing title block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-neon-cyan animate-pulse">
              Interactive Tech Roadmap
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            COMPUTER SCIENCE KNOWLEDGE TREE
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Track Namit's academic trajectory and verified certificates from Java OOP systems up to modern cloud web orchestration.
          </p>
        </div>

        {/* Legend status indicators */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-500">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> COMPLETED</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> ORCHESTRATION</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Interactive Tree Diagram (Tree flow simulation with beautiful connections) */}
        <div className="lg:col-span-6 flex flex-col gap-4 relative justify-center">
          
          {/* Visual connecting line in background */}
          <div className="absolute left-[34px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-emerald-500 via-cyan-500 to-purple-500/20 z-0 hidden sm:block" />

          {ROADMAP_NODES.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            
            // Custom styling states depending on category
            let borderStyle = "border-white/5 bg-white/[0.01]";
            let glowAccent = "";
            if (isSelected) {
              if (node.category === "Core OOP") {
                borderStyle = "border-emerald-500/30 bg-emerald-500/5 text-emerald-400";
                glowAccent = "shadow-[0_0_15px_rgba(16,185,129,0.15)]";
              } else if (node.category === "Security") {
                borderStyle = "border-red-500/30 bg-red-500/5 text-red-400";
                glowAccent = "shadow-[0_0_15px_rgba(239,68,68,0.15)]";
              } else if (node.category === "AI & Data") {
                borderStyle = "border-cyan-500/30 bg-cyan-500/5 text-cyan-400";
                glowAccent = "shadow-[0_0_15px_rgba(6,182,212,0.15)]";
              } else if (node.category === "Web Orchestration") {
                borderStyle = "border-purple-500/30 bg-purple-500/5 text-purple-400";
                glowAccent = "shadow-[0_0_15px_rgba(168,85,247,0.15)]";
              }
            }

            return (
              <button
                key={node.id}
                onClick={() => handleSelectNode(node)}
                className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all relative z-10 hover:bg-neutral-900/40 w-full group ${borderStyle} ${glowAccent}`}
              >
                {/* Node circle on timeline */}
                <div className={`w-10 h-10 rounded-xl bg-neutral-900 border flex items-center justify-center transition-all ${
                  isSelected 
                    ? "border-white scale-105" 
                    : "border-white/5 group-hover:border-white/15 group-hover:scale-105"
                }`}>
                  {node.icon}
                </div>

                {/* Node summary block */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-500 font-bold">
                      {node.phase}
                    </span>
                    <span className="text-neutral-600 font-mono text-[8px]">•</span>
                    <span className="font-mono text-[8px] uppercase text-neutral-400">
                      {node.date}
                    </span>
                  </div>

                  <h4 className="font-display text-sm font-bold text-white leading-tight group-hover:text-neon-cyan transition-colors">
                    {node.title}
                  </h4>

                  <p className="text-neutral-400 text-xs mt-1 line-clamp-1">
                    {node.summary}
                  </p>
                </div>

                {/* Status indicator pill on end */}
                <div className="flex flex-col items-end gap-1.5 self-center">
                  <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full uppercase font-bold tracking-widest ${
                    node.status === "Completed"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : node.status === "Active"
                      ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  }`}>
                    {node.status}
                  </span>
                  <ChevronRight className={`w-4 h-4 text-neutral-600 transition-transform ${isSelected ? "translate-x-1 text-white" : "group-hover:translate-x-0.5 group-hover:text-neutral-400"}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Diagnostic Detailed Display Card */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-white/5 bg-neutral-900/40 relative">
          
          {/* Subtle glowing mesh */}
          <div className="absolute inset-0 bg-radial-gradient from-neon-cyan/[0.02] to-transparent pointer-events-none" />

          <div className="relative z-10">
            {/* Phase header */}
            <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-5 gap-4">
              <div>
                <span className="font-mono text-[9px] text-neon-cyan uppercase tracking-widest font-extrabold block">
                  ROADMAP NODE SYSTEM DIAGNOSTIC
                </span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-white mt-1">
                  {selectedNode.title}
                </h4>
              </div>
              <span className="font-mono text-[9px] text-neutral-500 px-2.5 py-1 rounded bg-neutral-950 border border-white/5 whitespace-nowrap self-center font-bold">
                {selectedNode.category.toUpperCase()}
              </span>
            </div>

            {/* Description */}
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
              {selectedNode.description}
            </p>

            {/* Grade Card metric if available */}
            {selectedNode.gradeMetric && (
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[8px] text-neutral-500 uppercase block font-bold">ACADEMIC EXCELLENCE INDICATOR</span>
                  <p className="text-emerald-400 font-display text-xs sm:text-sm font-bold leading-snug">
                    {selectedNode.gradeMetric}
                  </p>
                </div>
              </div>
            )}

            {/* Credential Block (Alegria, Forage, Deloitte certifications) */}
            {selectedNode.credential && (
              <div className="p-5 rounded-2xl bg-neutral-950/60 border border-white/5 mb-6">
                <span className="font-mono text-[8px] text-neon-purple uppercase tracking-widest block font-bold mb-3 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-neon-purple animate-pulse" /> VERIFIED CREDENTIAL METADATA
                </span>

                <div className="flex flex-col gap-2 border-b border-white/5 pb-3 mb-3">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>{selectedNode.credential.title}</span>
                    <span className="text-neon-cyan shrink-0 font-mono font-bold">{selectedNode.credential.date}</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400">
                    <span>ISSUER: {selectedNode.credential.issuer}</span>
                    <span className="text-neutral-500">ID: {selectedNode.credential.id}</span>
                  </div>
                </div>

                {selectedNode.credential.tasks && (
                  <div>
                    <span className="font-mono text-[8px] text-neutral-500 uppercase font-bold block mb-2">PRACTICAL SKILLS VERIFIED:</span>
                    <ul className="space-y-1.5">
                      {selectedNode.credential.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2 text-[10px] text-neutral-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Connected Project Details */}
            {selectedNode.projectConnected && (
              <div className="p-5 rounded-2xl bg-neutral-950/60 border border-white/5">
                <span className="font-mono text-[8px] text-neon-cyan uppercase tracking-widest block font-bold mb-2 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-neon-cyan" /> CONNECTED DEPLOYED SYSTEM
                </span>

                <h5 className="text-white text-xs font-bold font-display mb-1">
                  {selectedNode.projectConnected.name}
                </h5>
                <p className="text-neutral-400 text-[10px] leading-normal mb-3">
                  {selectedNode.projectConnected.description}
                </p>
                <div className="flex items-center gap-1 flex-wrap">
                  {selectedNode.projectConnected.tech.split(", ").map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 font-mono text-[8px] text-neutral-400 uppercase tracking-wider font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Secure Handshake signature */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500 relative z-10">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> HANDSHAKE VERIFIED // SECURE TUNNEL
            </span>
            <span>NODE ACTIVE // 200 OK</span>
          </div>

        </div>

      </div>
    </div>
  );
}
