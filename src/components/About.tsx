import { Sparkles, Terminal, Code, GraduationCap, Cpu, Heart } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

export default function About() {
  const interestCards = [
    {
      icon: Cpu,
      title: "AI & Machine Learning",
      description: "Passionate about large language models (LLMs), RAG systems, and data pipelines to solve real-world problems.",
      accent: "from-blue-500/20 to-cyan-500/10 border-blue-500/20 text-blue-400"
    },
    {
      icon: Code,
      title: "Frontend Engineering",
      description: "Crafting fluid, high-fidelity responsive websites with semantic structures, clean state flows, and elegant animations.",
      accent: "from-purple-500/20 to-pink-500/10 border-purple-500/20 text-purple-400"
    },
    {
      icon: Terminal,
      title: "Systems & OOP",
      description: "Familiar with modular design, data structures, and core algorithms across Java and object-oriented architectures.",
      accent: "from-emerald-500/20 to-teal-500/10 border-emerald-500/20 text-emerald-400"
    }
  ];

  return (
    <section id="about" className="relative py-32 bg-[#050816] selection:bg-electric-blue/20 selection:text-white overflow-hidden">
      {/* Decorative vector dividers */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      {/* Soft gradient blur spheres */}
      <div className="absolute top-1/4 right-[-10%] w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[400px] h-[400px] rounded-full bg-electric-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-neon-purple" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neon-purple">
                Background Profile
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              PASSIONATE ABOUT INNOVATION
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              I balance rigorous academic coursework in computer science with direct hands-on web development, crafting clean source code and implementing complex design parameters.
            </p>
          </RevealOnScroll>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Main Biography Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <RevealOnScroll direction="left">
              <div className="p-8 md:p-10 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-all duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-electric-blue to-neon-purple" />
                
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-electric-glow" />
                  Computer Science Undergrad
                </h3>
                
                <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    I am currently a 2nd-year student pursuing my B.Tech in Computer Science at Pillai College of Engineering, New Panvel (graduating in 2029), building a robust mathematical and architectural foundation. My academic studies focus heavily on Data Structures, Object-Oriented Principles, Database Systems, and Algorithmic Efficiency.
                  </p>
                  <p>
                    Outside the lecture hall, I dedicate my energy to exploring modern web ecosystems and full-stack software development. By building highly responsive clone projects, ATS-optimized recruitment tools, and dynamic calculation panels, I gain deep experience in asynchronous JavaScript, Fetch API structures, and browser DOM control mechanisms.
                  </p>
                  <p>
                    I am driven by a deep philosophy of continuous self-improvement. Whether refining code templates for mobile accessibility, mastering vector layouts in Python, or researching LLMs and retrieval-augmented pipelines, I am eager to contribute to forward-thinking engineering teams.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Core Values Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <RevealOnScroll direction="right" delay={100}>
              <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:border-white/10 transition-all duration-300">
                <h3 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
                  Core Engineering Values
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-white">Continuous Self-Improvement</span>
                      <span className="text-xs font-mono text-electric-glow">100%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-electric-blue rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-white">Clean, Scalable Codebases</span>
                      <span className="text-xs font-mono text-neon-purple">95%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-neon-purple rounded-full" style={{ width: "95%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-white">Mobile Responsiveness</span>
                      <span className="text-xs font-mono text-neon-cyan">98%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-neon-cyan rounded-full" style={{ width: "98%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-white">Algorithmic Problem Solving</span>
                      <span className="text-xs font-mono text-amber-400">90%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "90%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

        </div>

        {/* Focused Areas of Interest (Staggered Bento Row) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interestCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div key={card.title}>
                <RevealOnScroll delay={index * 100}>
                  <div className={`p-6 rounded-2xl border bg-gradient-to-br ${card.accent} backdrop-blur-md hover:scale-[1.02] active:scale-[0.99] transition-all duration-300`}>
                    <div className="p-3 w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="font-display text-lg font-bold text-white mb-2">
                      {card.title}
                    </h4>
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </RevealOnScroll>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
