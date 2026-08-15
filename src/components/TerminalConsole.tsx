import React, { useState, useEffect, useRef } from "react";
import { Terminal, RefreshCw, Maximize2, Minimize2, Circle } from "lucide-react";
import { playKeyboardClick } from "./FocusSoundboard";

interface HistoryItem {
  type: "input" | "output" | "error" | "system";
  text: string;
}

const COMMAND_LIST = ["help", "about", "skills", "projects", "contact", "neofetch", "matrix", "hack", "clear"];

export default function TerminalConsole() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "system", text: "Namit Yadav Portfolio Terminal v1.0.4 [Build: JULY-2026]" },
    { type: "system", text: "Initializing secure shell tunnel... Done." },
    { type: "system", text: "Type 'help' or 'neofetch' to view system specs and commands." },
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isHackingActive, setIsHackingActive] = useState(false);
  const [hackProgress, setHackProgress] = useState(0);
  const [hackLog, setHackLog] = useState<string[]>([]);
  
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const hackTimerRef = useRef<any>(null);

  // Auto-scroll to bottom of command history
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, hackLog, isHackingActive]);

  // Falling Matrix Rain effect
  useEffect(() => {
    if (!isMatrixActive) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const katakana = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*+=-";
    const alphabet = katakana.split("");

    const fontSize = 12;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0"; // Green text
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMatrixActive]);

  // Hack simulation sequencer
  const startHackSequence = () => {
    setIsHackingActive(true);
    setHackProgress(0);
    setHackLog(["[INIT] Connecting to hyper-coffee gateway...", "[LOAD] Injecting custom algorithms into node modules..."]);
    
    let currentStep = 0;
    const logs = [
      "[OK] Database handshake resolved.",
      "[ALERT] Attempting bypass of caffeine depletion barrier...",
      "[OK] Coffee reserves critical but stable.",
      "[LOAD] Overclocking portfolio components via Framer Motion...",
      "[OK] Synthesizing audio oscillators for visual ambient theme...",
      "[LOAD] Scraping Git repos for hidden developer Easter Eggs...",
      "[ALERT] Port 3000 detected as highly aesthetic...",
      "[SUCCESS] Full stack compilation validated in 100% cloud space!"
    ];

    hackTimerRef.current = setInterval(() => {
      currentStep++;
      setHackProgress((prev) => {
        const next = Math.min(prev + Math.floor(Math.random() * 15) + 5, 100);
        if (next >= 100) {
          clearInterval(hackTimerRef.current);
          setTimeout(() => {
            setIsHackingActive(false);
            setHistory((prevH) => [
              ...prevH,
              { type: "system", text: "----------------------------------------" },
              { type: "system", text: "✔ Hacking sequence complete!" },
              { type: "system", text: "Successfully downloaded 10x developer knowledge. Enjoy the portfolio!" },
              { type: "system", text: "----------------------------------------" }
            ]);
          }, 800);
        }
        return next;
      });

      if (currentStep < logs.length) {
        setHackLog((prevLogs) => [...prevLogs, logs[currentStep]]);
      }
    }, 450);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    playKeyboardClick();

    const newHistory = [...history, { type: "input" as const, text: cmd }];
    setHistory(newHistory);
    setInput("");

    // Turn off special modes on any general command input
    if (isMatrixActive) {
      setIsMatrixActive(false);
    }

    switch (cmd) {
      case "help":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "Available commands inside secure terminal session:" },
          { type: "output", text: "  neofetch   - Displays developer specifications & portfolio specs" },
          { type: "output", text: "  about      - Biographical profile of Namit Yadav" },
          { type: "output", text: "  skills     - Displays primary language & framework competencies" },
          { type: "output", text: "  projects   - Lists actively compiled production web products" },
          { type: "output", text: "  contact    - Provides channels for secure networking" },
          { type: "output", text: "  matrix     - Activates full-window cybernetic digital falling rain" },
          { type: "output", text: "  hack       - Synthesizes an interactive cyber hacking protocol simulation" },
          { type: "output", text: "  clear      - Flushes current terminal terminal session buffer" },
        ]);
        break;

      case "about":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "BIOGRAPHY: Namit Yadav is an elite Computer Science undergraduate" },
          { type: "output", text: "specializing in full-stack engineering, interactive UI physics," },
          { type: "output", text: "and programmatic audio synthesis. He builds rich digital portfolios" },
          { type: "output", text: "connecting custom backends with smooth cinematic motion." }
        ]);
        break;

      case "skills":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "TECHNICAL COMPETENCIES MATRIX:" },
          { type: "output", text: "  • PROGRAMMING Languages: Java (OOP Master), Python, JavaScript, TypeScript, C" },
          { type: "output", text: "  • FRONTEND & FRAMEWORKS: React.js, Vite Core, Tailwind CSS, HTML5 Canvas, motion" },
          { type: "output", text: "  • SYSTEM UTILITIES & TOOLS: Git, Linux Commands, Node.js, Web Audio API" },
        ]);
        break;

      case "projects":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "ACTIVE DEPLOYED APPLICATIONS:" },
          { type: "output", text: "  1. AI ATS RESUME BUILDER - Recruitment optimization using generative AI" },
          { type: "output", text: "  2. CINEMATIC PORTFOLIO   - High-fidelity visual hub with negative-space particles" },
          { type: "output", text: "  3. CURRENCY SYSTEM      - REST API pipeline with live financial dashboards" },
          { type: "output", text: "  4. AMAZON RETAIL REPLICA- Structural study of complex responsive layouts" },
          { type: "output", text: "  5. RETRO PHYSICS ARCADE  - Custom Python/Turtle mathematical clock engine" }
        ]);
        break;

      case "contact":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "ESTABLISHING COMMUNICATION PIPELINE:" },
          { type: "output", text: "  • Email: namit27y@gmail.com" },
          { type: "output", text: "  • GitHub: https://github.com (Explore repository architecture)" },
          { type: "output", text: "  • LinkedIn: https://linkedin.com (Let's connect for engineering roles)" },
          { type: "output", text: "  • Status: Actively accepting internships and software development roles." }
        ]);
        break;

      case "neofetch":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "      _   _                      _   __     __        _               " },
          { type: "output", text: "     | \\ | |  __ _  _ __ ___    (_)  \\ \\   / /_ _  __| |  __ _ __   __" },
          { type: "output", text: "     |  \\| | / _` || '_ ` _ \\   | |   \\ \\ / // _` |/ _` | / _` |\\ \\ / /" },
          { type: "output", text: "     | |\\  || (_| || | | | | |  | |    \\ V /| (_| | (_| || (_| | \\ V / " },
          { type: "output", text: "     |_| \\_| \\__,_||_| |_| |_|  |_|     \\_/  \\__,_|\\__,_| \\__,_|  \\_/  " },
          { type: "output", text: "----------------------------------------------------------------------" },
          { type: "output", text: "  DEVELOPER:   Namit Yadav // Bachelors of Engineering (B.E.) Developer" },
          { type: "output", text: "  CREDENTIALS: Class of 2029 // Computer Engineering Specialization" },
          { type: "output", text: "  OS / ENV:    Linux Container x86_64 // Node v18.x // React & Vite" },
          { type: "output", text: "  SHELL:       NamitPortSH v1.0.4-live-preview" },
          { type: "output", text: "  HOST_PORT:   3000 (Secure SSL Ingress Node)" },
          { type: "output", text: "  UPTIME:      100% Smooth Render Frame Velocity" },
          { type: "output", text: "  THEME:       Electric Blue + Cyber Punk Neon Ambiance" },
          { type: "output", text: "----------------------------------------------------------------------" }
        ]);
        break;

      case "matrix":
        setIsMatrixActive(true);
        setHistory((prev) => [
          ...prev,
          { type: "system", text: "Activating falling digital green code matrix rain! Type any key or command to return." }
        ]);
        break;

      case "hack":
        startHackSequence();
        break;

      case "clear":
        setHistory([]);
        break;

      default:
        setHistory((prev) => [
          ...prev,
          { type: "error", text: `Command not found: '${cmd}'. Type 'help' for a lists of system controls.` }
        ]);
        break;
    }
  };

  return (
    <div className={`w-full rounded-2xl border border-white/10 bg-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 ${isMaximized ? "min-h-[500px]" : "h-[450px]"}`}>
      {/* Top Title Bar of Mac/Linux terminal */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Circle className="w-3 h-3 text-red-500 fill-red-500/30" />
          <Circle className="w-3 h-3 text-yellow-500 fill-yellow-500/30" />
          <Circle className="w-3 h-3 text-green-500 fill-green-500/30" />
          <span className="font-mono text-xs text-neutral-400 ml-3 flex items-center gap-1.5 font-bold">
            <Terminal className="w-3.5 h-3.5 text-electric-glow" />
            namit-yadav@portfolio: ~ (shell)
          </span>
        </div>

        <button
          onClick={() => setIsMaximized(!isMaximized)}
          className="text-neutral-500 hover:text-white transition-colors"
        >
          {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Terminal Work Body */}
      <div className="relative w-full h-[calc(100%-48px)] p-6 overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed text-emerald-400">
        
        {/* Falling matrix code rain mode overlay */}
        {isMatrixActive && (
          <div className="absolute inset-0 bg-black z-20 cursor-pointer" onClick={() => setIsMatrixActive(false)}>
            <canvas ref={matrixCanvasRef} className="w-full h-full" />
            <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded border border-green-500/30 text-green-500 text-[10px] animate-pulse">
              [MATRIX ON] Click anywhere or input key to dismiss
            </div>
          </div>
        )}

        {/* Hack Progress Mode */}
        {isHackingActive && (
          <div className="absolute inset-0 bg-black/95 z-20 p-6 flex flex-col justify-between text-cyan-400 border border-cyan-500/20">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold text-cyan-200 tracking-wider animate-pulse mb-4">
                ☣ SECURITY BREACH IMMERSIVE SIMULATOR
              </span>
              {hackLog.map((log, index) => (
                <div key={index} className="text-xs sm:text-sm tracking-wide">
                  {log}
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-bold">
                <span>INFILTRATING DIGITAL PORTFOLIO STACK</span>
                <span>{hackProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-neutral-900 rounded-full overflow-hidden border border-cyan-500/30 p-[1px]">
                <div
                  className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${hackProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Normal Terminal Text Logs */}
        <div className="flex flex-col gap-1.5">
          {history.map((item, index) => {
            if (item.type === "input") {
              return (
                <div key={index} className="flex items-center gap-2 text-white">
                  <span className="text-electric-glow font-bold">namit-yadav@portfolio:~$</span>
                  <span>{item.text}</span>
                </div>
              );
            }
            if (item.type === "error") {
              return (
                <div key={index} className="text-red-400">
                  {item.text}
                </div>
              );
            }
            if (item.type === "system") {
              return (
                <div key={index} className="text-neutral-500 text-xs">
                  {item.text}
                </div>
              );
            }
            return (
              <div key={index} className="whitespace-pre text-neutral-300 leading-normal">
                {item.text}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Console Command Input Form */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 mt-4 text-white">
          <span className="text-electric-glow font-bold whitespace-nowrap">namit-yadav@portfolio:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent outline-none border-none text-white font-mono caret-electric-glow"
            placeholder="type 'help'..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
