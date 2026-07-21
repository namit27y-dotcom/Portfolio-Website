import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, X, Sparkles, Code2, LineChart, Cpu, Search, Code, Folder, Terminal } from "lucide-react";
import { Project } from "../types";

const MOCK_CODES: Record<string, { filename: string; language: string; code: string }> = {
  "ai-resume-builder": {
    filename: "resumeParser.ts",
    language: "typescript",
    code: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI();

export async function parseResume(pdfBuffer: Buffer) {
  const extractedText = await extractPdfText(pdfBuffer);
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { text: "Optimize this resume text for ATS standards: " + extractedText }
    ]
  });

  return JSON.parse(response.text);
}`
  },
  "aether-portfolio": {
    filename: "particlePhysics.ts",
    language: "typescript",
    code: `export class Particle {
  x: number; y: number; vx: number; vy: number; alpha: number;

  constructor(x: number, y: number) {
    this.x = x; this.y = y;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.alpha = 1.0;
  }

  update(gravity = 0.02) {
    this.x += this.vx;
    this.y += this.vy + gravity;
    this.alpha -= 0.008;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = \`rgba(6, 182, 212, \${this.alpha})\`;
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}`
  },
  "currency-converter": {
    filename: "rateConverter.js",
    language: "javascript",
    code: `const API_ENDPOINT = "https://v6.exchangerate-api.com/v6/latest/";

export async function getLiveRates(baseCurrency) {
  const cacheKey = \`rates_\${baseCurrency}\`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < 3600000) return data;
  }

  const res = await fetch(\`\${API_ENDPOINT}\${baseCurrency}\`);
  const result = await res.json();
  localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: result.conversion_rates }));
  return result.conversion_rates;
}`
  },
  "amazon-clone": {
    filename: "productGrid.css",
    language: "css",
    code: `.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 10px;
}

.product-card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}`
  },
  "turtle-simulators": {
    filename: "analogClock.py",
    language: "python",
    code: `import turtle
import time

wn = turtle.Screen()
wn.bgcolor("black")
wn.setup(width=600, height=600)

hand = turtle.Turtle()
hand.speed(0)
hand.color("cyan")

def draw_hand(length, angle):
    hand.penup()
    hand.goto(0, 0)
    hand.setheading(90 - angle)
    hand.pendown()
    hand.forward(length)`
  },
  "student-portal-login": {
    filename: "StudentPortalLogin.java",
    language: "java",
    code: `import java.awt.*;
import javax.swing.*;
import javax.swing.border.EmptyBorder;

public class StudentPortalLogin extends JFrame {
    private final JTextField studentIdField = new JTextField(20);
    private final JPasswordField passwordField = new JPasswordField(20);
    private final JLabel statusLabel = new JLabel(" ");

    public StudentPortalLogin() {
        super("Student Portal Login");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setMinimumSize(new Dimension(420, 260));
        setLocationRelativeTo(null);
        setContentPane(buildUi());
        wireActions();
    }

    private JPanel buildUi() {
        JPanel root = new JPanel(new BorderLayout());
        root.setBorder(new EmptyBorder(18, 18, 18, 18));
        JLabel title = new JLabel("Student Portal");
        title.setFont(title.getFont().deriveFont(Font.BOLD, 20f));
        root.add(title, BorderLayout.NORTH);
        
        JPanel form = new JPanel(new GridBagLayout());
        // Custom GridBagLayout grid configuration
        return root;
    }
}`
  }
};
import TiltCard from "./TiltCard";
import RevealOnScroll from "./RevealOnScroll";

const PROJECTS: Project[] = [
  {
    id: "ai-resume-builder",
    title: "AI ATS RESUME BUILDER",
    description: "An intelligent, ATS-optimized recruitment suite parsing credentials and aligning candidates with industry standard scoring.",
    category: "AI/ML Product",
    tags: ["React.js", "Gemini SDK", "Async JavaScript", "PDF Parser"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    details: "AI Resume Builder leverages state-of-the-art Large Language Models (LLMs) to parse uploaded user profiles, generate optimized ATS keywords, and reconstruct resume files with clean typesetting and optimal reading flows.",
    metrics: [
      { label: "ATS Score Match", value: "95" },
      { label: "Processing Latency", value: "1200" },
      { label: "Optimized Templates", value: "12" },
    ],
    accentColor: "from-blue-500 to-cyan-400",
  },
  {
    id: "aether-portfolio",
    title: "CINEMATIC PORTFOLIO",
    description: "A motion-first creative web workspace showcasing high-contrast negative space and particle physics integrations.",
    category: "Web Engineering",
    tags: ["Vite Core", "Tailwind CSS", "HTML5 Canvas", "Spring Parallax"],
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    details: "This portfolio showcases modern design engineering, utilizing micro-interaction spring solvers, real-time responsive particle simulations, and a fully structured custom routing stack compiled via Vite with strict SEO optimizations.",
    metrics: [
      { label: "Initial Paint Time", value: "140" },
      { label: "FPS Velocity", value: "60" },
      { label: "Responsive Outlets", value: "100" },
    ],
    accentColor: "from-purple-500 to-indigo-400",
  },
  {
    id: "currency-converter",
    title: "CURRENCY CONVERSION SYSTEM",
    description: "A low-latency web client connecting to REST rate APIs to visualize fluctuations on a clean, grid-based dashboard.",
    category: "Web Engineering",
    tags: ["Vanilla JS", "Fetch API", "RESTful Pipelines", "CSS Grid"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    details: "Engineered with asynchronous network requests and fluid client state, this web widget processes real-time exchange rates. Designed for high availability with an elegant modular dashboard styled strictly in Tailwind.",
    metrics: [
      { label: "API Query Latency", value: "220" },
      { label: "Supported Currencies", value: "160" },
      { label: "Uptime Metric", value: "99" },
    ],
    accentColor: "from-cyan-500 to-emerald-400",
  },
  {
    id: "amazon-clone",
    title: "RETAIL INTERFACE EMULATOR",
    description: "An incredibly accurate responsive replica of the global marketplace's main layouts and micro-interactions.",
    category: "Frontend Development",
    tags: ["HTML5 Structure", "CSS3 Flexbox", "Media Queries", "Microinteractions"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    details: "A detailed visual and structural recreation of the e-commerce titan's core homepage, category grids, navigation rails, and shopping-cart systems, serving as a masterclass study in complex fluid document structures.",
    metrics: [
      { label: "Visual Fidelity", value: "98" },
      { label: "Breakpoints Tested", value: "8" },
      { label: "CSS Coverage", value: "100" },
    ],
    accentColor: "from-amber-500 to-orange-400",
  },
  {
    id: "turtle-simulators",
    title: "VECTOR RETRO ARCADE",
    description: "A suite of graphics simulators and math modules containing customized analog clocks and classic snake mechanics.",
    category: "Creative Programming",
    tags: ["Python Core", "Turtle Graphics", "Object-Oriented Logic", "Vector Math"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    details: "Constructed utilizing object-oriented principles, this suite contains mathematical analog timekeepers that render dynamically, and a modular game engine implementing grid collisions and trajectory logic on the vector canvas.",
    metrics: [
      { label: "Frame Rate Performance", value: "60" },
      { label: "Physics Steps", value: "10" },
      { label: "Logic Class Decouple", value: "100" },
    ],
    accentColor: "from-pink-500 to-rose-400",
  },
  {
    id: "student-portal-login",
    title: "STUDENT PORTAL LOGIN ENGINE",
    description: "A desktop-based secure credential authentication gate and GUI developed utilizing Java Swing and event-driven architectures.",
    category: "Desktop Engineering",
    tags: ["Java SE", "Java Swing GUI", "GridBagLayout", "Event Listener Pattern"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    details: "Developed as a formal Java Programming mini project at Pillai College of Engineering (University of Mumbai) under Prof. Ashwini Mate. Employs BorderLayout, secure masked password array clearing protocols (Arrays.fill to prevent raw-memory credential scraping), and a native look-and-feel wrapper.",
    metrics: [
      { label: "Grade Awarded", value: "100" },
      { label: "Layout Decoupling", value: "100" },
      { label: "Authentication Speed", value: "10" },
    ],
    accentColor: "from-emerald-600 to-teal-400",
  },
];

// High-craft Count Up Component using standard intervals for 100% compatibility
function CountUp({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1200; // Animation duration in ms

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Out-cubic easing for slow end
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setValue(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  return (
    <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalTab, setModalTab] = useState<"specs" | "code">("specs");

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = ["All", "AI/ML Product", "Web Engineering", "Frontend Development", "Creative Programming"];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="relative py-32 bg-[#050816] selection:bg-neon-purple/20 selection:text-white">
      {/* Visual top accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <RevealOnScroll className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-electric-blue/20 bg-electric-blue/5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-electric-glow" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-electric-glow">
                Curated Cases
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
              SELECTED WORKS
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              An interactive compilation of premium applications, digital interfaces, and code experiments focused on elite visual aesthetics and peak performance.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={100} className="w-full md:w-auto">
            <div className="w-full h-[1px] md:hidden bg-neutral-950 mb-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
              {filteredProjects.length} // ACTIVE DEPLOYMENTS MATCHED
            </span>
          </RevealOnScroll>
        </div>

        {/* Dynamic Search & Filters Console */}
        <div className="mb-16 p-6 rounded-2xl border border-white/5 bg-neutral-950/40 backdrop-blur-md flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 animate-[scale-slide-up_0.3s_ease_forwards]">
          
          {/* Categories pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl font-mono text-[9px] sm:text-xs uppercase tracking-wider transition-all border ${
                  activeCategory === cat
                    ? "bg-electric-blue border-electric-blue text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] font-bold"
                    : "bg-white/[0.01] border-white/5 text-neutral-400 hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                {cat === "All" ? "ALL SYSTEMS" : cat}
              </button>
            ))}
          </div>

          {/* Search bar input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech stack, keywords, or tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-white/5 text-white font-sans text-xs sm:text-sm outline-none focus:border-electric-blue/40 transition-colors"
            />
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
          </div>
        </div>

        {/* Selected Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.length === 0 ? (
            <div className="md:col-span-2 h-64 flex flex-col items-center justify-center border border-white/5 bg-white/[0.01] rounded-3xl text-neutral-500">
              <Code className="w-8 h-8 mb-3 text-neutral-600 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest mb-1 font-bold">Query Handshake Unresolved</span>
              <span className="text-neutral-500 text-xs font-sans">No deployments found matching current search inputs.</span>
            </div>
          ) : (
            filteredProjects.map((project, index) => {
            const isFullWidth = index === 0; // First card takes full width on desktop

            return (
              <div
                key={project.id}
                className={`w-full ${isFullWidth ? "md:col-span-2" : "md:col-span-1"}`}
              >
                <RevealOnScroll delay={index * 150} duration={1000}>
                  <div onClick={() => setSelectedProject(project)}>
                    <TiltCard className="cursor-pointer h-full">
                      {/* Inner contents */}
                      <div className="relative flex flex-col justify-end p-6 sm:p-10 min-h-[420px] md:min-h-[500px]">
                        
                        {/* Background Mockup Image with Zoom Hover */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 opacity-40 group-hover:opacity-75 transition-all duration-700 ease-out"
                            referrerPolicy="no-referrer"
                          />
                          {/* Rich darkened bottom gradient shield */}
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                        </div>

                        {/* Foreground content panel */}
                        <div className="relative z-10 w-full">
                          
                          {/* Staggered tags list */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.slice(0, 3).map((tag, tIdx) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] uppercase tracking-wider text-neutral-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Project Header Row */}
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <span className="font-mono text-[10px] text-electric-glow font-bold uppercase tracking-widest block mb-1">
                                {project.category}
                              </span>
                              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-electric-glow transition-colors">
                                {project.title}
                              </h3>
                            </div>

                            {/* Hover revealing arrow circle */}
                            <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transform group-hover:scale-110 group-hover:bg-white group-hover:border-white transition-all duration-300">
                              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                            </div>
                          </div>

                          <p className="mt-3 text-neutral-400 text-xs sm:text-sm max-w-xl group-hover:text-neutral-300 transition-colors">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </RevealOnScroll>
              </div>
            );
          })
        )}
      </div>
      </div>

      {/* FULL SCREEN DETAILED OVERLAY MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-neutral-950/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto animate-[fade-in_0.3s_ease_forwards]">
          <div
            className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-neutral-950/90 shadow-2xl overflow-hidden my-auto animate-[scale-slide-up_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Hero Section inside detailed modal */}
            <div className="relative h-[250px] sm:h-[350px] w-full">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

              {/* Float Dismiss button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:text-neutral-300 hover:border-white/20 transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10">
                <span className="font-mono text-xs text-electric-glow font-bold uppercase tracking-widest block mb-2">
                  {selectedProject.category}
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Tabs Bar */}
            <div className="flex border-b border-white/5 bg-neutral-900/40 px-6 sm:px-10 py-3 gap-4">
              <button
                onClick={() => setModalTab("specs")}
                className={`font-mono text-xs sm:text-sm uppercase tracking-wider transition-colors py-2 border-b-2 px-1 ${
                  modalTab === "specs"
                    ? "border-electric-blue text-white font-bold"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                SYSTEM SPECS & BRIEF
              </button>
              <button
                onClick={() => setModalTab("code")}
                className={`font-mono text-xs sm:text-sm uppercase tracking-wider transition-colors py-2 border-b-2 px-1 flex items-center gap-2 ${
                  modalTab === "code"
                    ? "border-electric-blue text-white font-bold"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                <Code className="w-4 h-4 text-electric-glow" />
                IDE SOURCE PLAYGROUND
              </button>
            </div>

            {modalTab === "specs" ? (
              /* Content Details Grid */
              <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 animate-[fade-in_0.3s_ease_forwards]">
                
                {/* Left Column: Metrics counters and Technical tags */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  
                  {/* Visual Technical Badge */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-4 border-b border-white/5 pb-2">
                      DEPLOYMENT SPECS
                    </span>
                    
                    {/* Dynamic engineering counts */}
                    <div className="flex flex-col gap-5">
                      {selectedProject.metrics?.map((metric, mIdx) => {
                        const valueNum = parseFloat(metric.value);
                        let suffix = "";
                        let prefix = "";
                        if (metric.label.toLowerCase().includes("velocity") || metric.label.toLowerCase().includes("fps")) {
                          suffix = " FPS";
                        } else if (metric.label.toLowerCase().includes("paint") || metric.label.toLowerCase().includes("latency") || metric.label.toLowerCase().includes("time")) {
                          suffix = "ms";
                        } else if (metric.label.toLowerCase().includes("throughput")) {
                          suffix = " /s";
                        } else if (metric.label.toLowerCase().includes("uptime") || metric.label.toLowerCase().includes("satisfaction") || metric.label.toLowerCase().includes("score")) {
                          suffix = "%";
                        } else if (metric.label.toLowerCase().includes("devices") || metric.label.toLowerCase().includes("nodes")) {
                          suffix = "+";
                        } else if (metric.label.toLowerCase().includes("interactions")) {
                          suffix = "+";
                        }
                        
                        return (
                          <div key={mIdx} className="flex flex-col">
                            <CountUp end={valueNum} suffix={suffix} prefix={prefix} />
                            <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest mt-1">
                              {metric.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Core Technologies Used */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-3">
                      CORE SYSTEM TECH
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 font-mono text-[10px] text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Case study descriptions */}
                <div className="lg:col-span-8 flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-6">
                    
                    {/* Executive Summary Block */}
                    <div className="flex gap-4">
                      <div className="p-3 rounded-xl bg-electric-blue/10 border border-electric-blue/20 h-fit text-electric-glow">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-lg font-bold text-white mb-2">Project Vision</h4>
                        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                          {selectedProject.details}
                        </p>
                      </div>
                    </div>

                    {/* Architecture & Engineering blocks */}
                    <div className="flex gap-4">
                      <div className="p-3 rounded-xl bg-neon-purple/10 border border-neon-purple/20 h-fit text-neon-purple">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-lg font-bold text-white mb-2">Performance Blueprint</h4>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                          To respect high performance budgets, this deployment focuses on hardware-accelerated animations using optimized compositing layers. It minimizes DOM tree depth and forces sub-pixel rendering via GPU bounds to preserve frame rate benchmarks under heavy layout shifts.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Closing CTAs */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 pt-6 border-t border-white/5">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                    >
                      CLOSE BRIEF
                    </button>
                    <a
                      href="https://github.com/namit27y-dotcom"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      INSPECT REPOSITORY
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* IDE Source Playground View */
              <div className="p-6 sm:p-10 flex flex-col gap-6 animate-[fade-in_0.3s_ease_forwards]">
                <div className="rounded-2xl border border-white/5 bg-neutral-900/90 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
                  {/* IDE Header */}
                  <div className="flex items-center justify-between px-5 py-3 bg-neutral-950 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-yellow-500" />
                      <span className="text-neutral-400 font-bold">workspace / src / components /</span>
                      <span className="text-white font-bold">{MOCK_CODES[selectedProject.id]?.filename || "index.ts"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                  </div>

                  {/* IDE Editor Pane */}
                  <div className="flex min-h-[300px] overflow-x-auto">
                    {/* Line numbers gutter */}
                    <div className="px-4 py-4 text-right text-neutral-600 select-none border-r border-white/5 bg-neutral-950/40 font-mono text-xs">
                      {Array.from({ length: (MOCK_CODES[selectedProject.id]?.code.split("\n").length || 10) }).map((_, idx) => (
                        <div key={idx}>{idx + 1}</div>
                      ))}
                    </div>

                    {/* Code display area */}
                    <pre className="p-4 text-emerald-400 whitespace-pre overflow-x-auto flex-1 leading-relaxed bg-neutral-950/20">
                      <code>{MOCK_CODES[selectedProject.id]?.code || "// Code block compiles cleanly."}</code>
                    </pre>
                  </div>
                </div>

                {/* Closing CTAs inside IDE tab */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 pt-6 border-t border-white/5">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                  >
                    CLOSE BRIEF
                  </button>
                  <a
                    href="https://github.com/namit27y-dotcom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    INSPECT REPOSITORY
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Internal animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-slide-up {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
