import { useEffect, useState, useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail, Sparkles, FileText, Download, Printer, X, Check } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";

export default function Hero() {
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [prefersReduced, setPrefersReduced] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Parallax / cursor-tracker coordinates
  const targetMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const smoothedMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const parallaxBgRef = useRef<HTMLDivElement | null>(null);
  const parallaxMidRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 1. Reduced motion check
    const pmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(pmQuery.matches);
    const handlePmChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    pmQuery.addEventListener("change", handlePmChange);

    // 2. Scroll listener to fade out scroll indicator
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // 3. Mouse move tracking
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Translate coordinates to range from -0.5 to 0.5
      targetMouseRef.current = {
        x: (clientX / width) - 0.5,
        y: (clientY / height) - 0.5,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 4. Spring loop for smooth parallax tracking & spotlight position
    let animationId: number;
    const tick = () => {
      if (pmQuery.matches) return;

      const target = targetMouseRef.current;
      const smoothed = smoothedMouseRef.current;

      // Smooth interpolation (Stiffness: 0.08)
      smoothed.x += (target.x - smoothed.x) * 0.08;
      smoothed.y += (target.y - smoothed.y) * 0.08;

      // Apply background parallax (Offset: 8px max)
      if (parallaxBgRef.current) {
        parallaxBgRef.current.style.transform = `translate3d(${smoothed.x * 8}px, ${smoothed.y * 8}px, 0)`;
      }

      // Apply midground parallax (Offset: 16px max)
      if (parallaxMidRef.current) {
        parallaxMidRef.current.style.transform = `translate3d(${smoothed.x * -16}px, ${smoothed.y * -16}px, 0)`;
      }

      // Update cursor tracking spotlight
      if (spotlightRef.current) {
        // Map back to screen pixel coordinates
        const mouseX = (smoothed.x + 0.5) * window.innerWidth;
        const mouseY = (smoothed.y + 0.5) * window.innerHeight;
        spotlightRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      animationId = requestAnimationFrame(tick);
    };

    if (!pmQuery.matches) {
      animationId = requestAnimationFrame(tick);
    }

    return () => {
      pmQuery.removeEventListener("change", handlePmChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Copy resume textual profile
  const copyResumeToClipboard = () => {
    const text = `NAMIT YADAV
namit27y@gmail.com | github.com/namit27y-dotcom | linkedin.com/in/namit-yadav-b3516b392
B.Tech Computer Science student at Pillai College of Engineering, New Panvel

TECHNICAL SKILLS:
- Frontend: HTML5, CSS3, JavaScript (ES6+), React.js Core, Tailwind CSS, Responsive Web Design
- Programming Languages: Java, Python, Async Promises, OOP Concepts
- Database: MySQL
- Tools: Git, GitHub, VS Code, IntelliJ IDEA
- Currently Learning: NumPy, Pandas, AI/ML Fundamentals

PROJECTS:
- AI Resume Builder (ATS-Friendly): Parsing credentials, generating ATS keywords with Gemini SDK.
- Currency Converter Web App: Dynamic REST exchange rates pulled via Async Fetch.
- Amazon Clone: Responsive HTML/CSS flexbox recreations.
- Turtle Simulators: Python visual retro clocks and game engines.`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Split headline text for word-by-word reveal
  const headlineWords = "Code. Create. Continuously Improve.".split(" ");

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#050816] selection:bg-electric-blue/30 selection:text-white"
    >
      {/* 1. LAYER: Animated Aurora Gradient Background Mesh */}
      <div
        ref={parallaxBgRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen overflow-hidden"
      >
        {/* Soft Glowing Mesh Nebulas */}
        <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-electric-blue/15 to-neon-purple/5 blur-[120px] animate-aurora" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-tl from-neon-cyan/15 to-electric-blue/5 blur-[120px] animate-aurora" style={{ animationDelay: "-10s" }} />
      </div>

      {/* 2. LAYER: Soft Light Waves entering from bottom corners (Stitch-style) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-electric-blue/20 to-transparent blur-[110px] animate-pulse-slow" />
        <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-neon-purple/20 to-transparent blur-[110px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      {/* 3. LAYER: Dotted Grid Background with shimmer opacity */}
      <div
        className={`absolute inset-0 z-0 dots-grid pointer-events-none ${
          prefersReduced ? "opacity-30" : "animate-[shimmer-opacity_4s_ease-in-out_infinite]"
        }`}
        aria-hidden="true"
      />

      {/* 4. LAYER: Particle Field (HTML5 2D Canvas) */}
      <ParticleCanvas />

      {/* 5. LAYER: Interactive spotlight tracker (Mouse follow glow) */}
      {!prefersReduced && (
        <div
          ref={spotlightRef}
          className="fixed top-0 left-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full pointer-events-none z-10 filter blur-[120px] mix-blend-screen opacity-70"
          style={{ transform: "translate3d(-1000px, -1000px, 0)" }}
        />
      )}

      {/* FOREGROUND CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center">
        
        {/* Floating Profile Image Stack */}
        <div
          ref={parallaxMidRef}
          className={`relative mb-8 group interactive ${
            prefersReduced ? "" : "animate-float"
          }`}
        >
          {/* Orbital glowing ring */}
          <div className="absolute -inset-4 rounded-full border border-electric-blue/25 group-hover:border-electric-blue/50 transition-all duration-500 animate-[spin_30s_linear_infinite]" />
          <div className="absolute -inset-6 rounded-full border border-neon-purple/15 group-hover:border-neon-purple/35 transition-all duration-500 animate-[spin_45s_linear_infinite_reverse]" />

          {/* Visual card */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-[3px] bg-gradient-to-br from-electric-blue via-neon-purple to-neon-cyan shadow-[0_0_50px_rgba(79,70,229,0.25)] group-hover:shadow-[0_0_60px_rgba(79,70,229,0.45)] transition-all duration-500">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-neutral-950 bg-neutral-900 flex items-center justify-center relative">
              {/* Premium Vector Avatar for Namit Yadav (NY) representing a CS developer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 to-neutral-800" />
              
              {/* Floating tech background elements */}
              <div className="absolute text-[8px] font-mono text-neon-cyan/20 animate-pulse top-4 left-4">Java</div>
              <div className="absolute text-[8px] font-mono text-neon-purple/20 animate-pulse bottom-4 right-4">Python</div>
              
              {/* Central initials */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <span className="font-display text-4xl md:text-5xl font-extrabold tracking-tighter bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  NY
                </span>
                <span className="font-mono text-[7px] text-electric-glow uppercase tracking-[0.25em] mt-1 font-bold">
                  B.Tech CS
                </span>
              </div>
              
              {/* Glowing decorative rings */}
              <div className="absolute w-[80%] h-[80%] rounded-full border border-white/5 animate-ping opacity-25" />
            </div>
          </div>

          {/* Dynamic availability badge */}
          <div className="absolute bottom-1 right-1 bg-neutral-950 border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono font-semibold text-neutral-300 uppercase tracking-widest">
              Available
            </span>
          </div>
        </div>

        {/* Small badge overlay */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md mb-8">
          <span className="text-[10px] font-mono text-electric-glow font-semibold uppercase tracking-wider">
            SOFTWARE ENGINEERING PORTFOLIO
          </span>
        </div>

        {/* Word-by-word reveal headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-[5.5rem] font-extrabold text-white max-w-5xl tracking-tight leading-[1.15] md:leading-[1.1] mb-8 select-none">
          {prefersReduced ? (
            <span className="animate-[simple-fade_0.2s_ease_forwards]">
              Code. Create. Continuously Improve.
            </span>
          ) : (
            <span className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-y-4 md:gap-y-6">
              {headlineWords.map((word, index) => (
                <span
                  key={index}
                  style={{
                    animationDelay: `${index * 0.08}s`,
                  }}
                  className="inline-block origin-bottom animate-[spring-reveal_0.8s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards] opacity-0 translate-y-4 scale-95"
                >
                  {word}
                </span>
              ))}
            </span>
          )}
        </h1>

        {/* Subtitle description with slide up entry delay */}
        <p
          style={{ animationDelay: prefersReduced ? "0ms" : "0.5s" }}
          className="font-sans text-neutral-400 text-sm sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed opacity-0 animate-[fade-slide-up_1s_cubic-bezier(0.16,1,0.3,1)_forwards] mix-blend-screen"
        >
          I'm <strong className="text-white font-medium">Namit Yadav</strong>, a Computer Science student passionate about building responsive web applications, solving real-world problems, and continuously learning modern technologies including AI, Machine Learning, and Full Stack Development.
        </p>

        {/* Professional Status Badges */}
        <div
          style={{ animationDelay: prefersReduced ? "0ms" : "0.55s" }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10 max-w-2xl mx-auto opacity-0 animate-[fade-slide-up_1s_cubic-bezier(0.16,1,0.3,1)_forwards]"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all hover:border-white/10 hover:scale-102 duration-300 shadow-sm">
            <span className="text-sm">📍</span>
            <span className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-widest">Mumbai, India</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all hover:border-white/10 hover:scale-102 duration-300 shadow-sm">
            <span className="text-sm">🌍</span>
            <span className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-widest">Open Worldwide</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all hover:border-white/10 hover:scale-102 duration-300 shadow-sm">
            <span className="text-sm">💼</span>
            <span className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-widest">Full-Time Opportunities</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all hover:border-white/10 hover:scale-102 duration-300 shadow-sm">
            <span className="text-sm">✈️</span>
            <span className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-widest">Willing to Relocate</span>
          </div>
        </div>

        {/* Call to Actions with glow borders, magnets and premium transitions */}
        <div
          style={{ animationDelay: prefersReduced ? "0ms" : "0.6s" }}
          className="flex flex-col sm:flex-row items-center gap-4 opacity-0 animate-[fade-slide-up_1s_cubic-bezier(0.16,1,0.3,1)_forwards] w-full sm:w-auto"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-electric-blue to-neon-purple text-white font-mono text-xs font-bold uppercase tracking-wider group hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] border border-white/10"
            data-cursor-text="View Projects"
          >
            View Projects
          </a>
          <button
            onClick={() => setIsResumeOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/[0.02] hover:bg-white/[0.06] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group hover:border-white/30"
            data-cursor-text="Get Resume"
          >
            <FileText className="w-4 h-4 text-neon-cyan" />
            Download Resume
          </button>
        </div>

        {/* Social Quick Links */}
        <div
          style={{ animationDelay: prefersReduced ? "0ms" : "0.7s" }}
          className="flex items-center gap-6 mt-16 text-neutral-500 opacity-0 animate-[fade-slide-up_1s_cubic-bezier(0.16,1,0.3,1)_forwards]"
        >
          <a
            href="https://github.com/namit27y-dotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:scale-110 transition-all p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] duration-300"
            aria-label="GitHub Profile"
            data-cursor-text="Github"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/namit-yadav-b3516b392"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:scale-110 transition-all p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] duration-300"
            aria-label="LinkedIn Profile"
            data-cursor-text="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:namit27y@gmail.com"
            className="hover:text-white hover:scale-110 transition-all p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] duration-300"
            aria-label="Email Address"
            data-cursor-text="Mail Me"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Floating dynamic scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 transition-all duration-500 ${
          hasScrolled ? "opacity-0 pointer-events-none translate-y-4" : "opacity-40"
        }`}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400">
          Scroll Down
        </span>
        <div className="w-[28px] h-[46px] rounded-full border border-white/20 p-1 flex justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-electric-glow animate-[scroll-indicator-dot_1.8s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* PREMIUM INTERACTIVE RESUME MODAL & PRINT ENGINE */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-xl animate-[simple-fade_0.3s_ease_forwards]">
          <div className="relative w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-2xl max-h-[90vh] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-neutral-950">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-neon-cyan animate-pulse" />
                <h3 className="font-display font-bold text-white text-base uppercase tracking-wider">
                  Namit Yadav - ATS Friendly Resume
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyResumeToClipboard}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-mono text-neutral-300 flex items-center gap-1 transition-all"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    "Copy Text Profile"
                  )}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-mono text-neutral-300 flex items-center gap-1 transition-all"
                >
                  <Printer className="w-3.5 h-3.5 text-neon-purple" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"
                  aria-label="Close Resume Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume content */}
            <div id="printable-resume" className="overflow-y-auto p-8 md:p-12 bg-white text-neutral-900 font-sans leading-relaxed selection:bg-blue-100 selection:text-neutral-900">
              <div className="max-w-3xl mx-auto">
                <div className="text-center border-b-2 border-neutral-800 pb-6 mb-8">
                  <h1 className="text-4xl font-extrabold tracking-tight uppercase text-neutral-950 mb-1">
                    Namit Yadav
                  </h1>
                  <p className="text-sm font-medium tracking-wide text-neutral-600 mb-2">
                    B.Tech Computer Science Student | Aspiring Software Engineer
                  </p>
                  <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-neutral-500">
                    <span>Email: namit27y@gmail.com</span>
                    <span>•</span>
                    <span>Github: github.com</span>
                    <span>•</span>
                    <span>LinkedIn: linkedin.com</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  {/* Left Column */}
                  <div className="md:col-span-1 flex flex-col gap-6">
                    <div>
                      <h2 className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase border-b border-neutral-300 pb-1 mb-3">
                        Technical Stack
                      </h2>
                      <div className="flex flex-col gap-3">
                        <div>
                          <h3 className="text-xs font-semibold text-neutral-800 uppercase">Frontend</h3>
                          <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Responsive UI/UX</p>
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold text-neutral-800 uppercase">Core Languages</h3>
                          <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">Java, Python, Object-Oriented Programming (OOP)</p>
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold text-neutral-800 uppercase">Databases</h3>
                          <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">MySQL schemas, relational queries</p>
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold text-neutral-800 uppercase">Development Tools</h3>
                          <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">Git, GitHub, VS Code, IntelliJ IDEA</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase border-b border-neutral-300 pb-1 mb-3">
                        Education
                      </h2>
                      <div>
                        <h3 className="text-sm font-bold text-neutral-800">B.Tech Computer Science</h3>
                        <p className="text-xs text-neutral-500 font-medium">Pillai College of Engineering, New Panvel</p>
                        <p className="text-xs text-neutral-400 mt-1">2025 — 2029 (Expected) • 2nd Year</p>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase border-b border-neutral-300 pb-1 mb-3">
                        Certifications
                      </h2>
                      <ul className="list-disc pl-4 text-xs text-neutral-600 flex flex-col gap-1.5">
                        <li>Modern Frontend Development Specialization</li>
                        <li>Java Object-Oriented Structures Certificate</li>
                        <li>Responsive Web & Accessibility (WCAG AA)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="md:col-span-2 flex flex-col gap-6">
                    <div>
                      <h2 className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase border-b border-neutral-300 pb-1 mb-3">
                        Projects Built
                      </h2>
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-sm font-bold text-neutral-800">AI Resume Builder (ATS-Friendly)</h3>
                          <p className="text-xs text-neutral-500 font-medium mb-1">React.js | Gemini SDK | Asynchronous JS</p>
                          <p className="text-xs text-neutral-600 leading-relaxed">
                            Developed an intelligent recruitment optimizer parsing user credentials and using LLM models to restructure resume files with proper formatting. Built with responsive interfaces.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-neutral-800">Currency Converter Web Application</h3>
                          <p className="text-xs text-neutral-500 font-medium mb-1">Vanilla JavaScript | Fetch API | REST Services</p>
                          <p className="text-xs text-neutral-600 leading-relaxed">
                            Created a dynamic, low-latency currency visualizer pulling real-time rates via asynchronous pipeline calls, designed with elegant Tailwind grid panels.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-neutral-800">Python Retro Simulators</h3>
                          <p className="text-xs text-neutral-500 font-medium mb-1">Python Core | Turtle Graphics | OOP Logic</p>
                          <p className="text-xs text-neutral-600 leading-relaxed">
                            Coded lightweight retro arcade setups including vector-logic analog clocks and classic snake mechanics, applying OOP patterns to separate physics and canvas rendering loops.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase border-b border-neutral-300 pb-1 mb-3">
                        Key Competencies
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {["Asynchronous Javascript", "REST APIs", "Fetch API", "DOM Manipulation", "Data Structures", "Continuous Learning", "Team Collaboration"].map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-neutral-100 border border-neutral-200 text-neutral-700 text-[10px] font-medium rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer warning */}
            <div className="px-6 py-4 border-t border-white/5 bg-neutral-950 text-center">
              <p className="text-[10px] font-mono text-neutral-500">
                Tip: Printing this page defaults to clean, physical A4 margins for paper submission.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles Embedded */}
      <style>{`
        @keyframes spring-reveal {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes simple-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer-opacity {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.35; }
        }
        @keyframes scroll-indicator-dot {
          0% { transform: translateY(0); opacity: 0; }
          30% { opacity: 1; }
          60% { transform: translateY(22px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }

        /* Print Override Styles to render resume perfectly on print trigger */
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-resume, #printable-resume * {
            visibility: visible;
          }
          #printable-resume {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </section>
  );
}
