/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import EducationAndCertifications from "./components/Education";
import ExperienceTimeline from "./components/Experience";
import Contact from "./components/Contact";
import SectionDivider from "./components/SectionDivider";
import { ToastProvider } from "./components/Toast";
import RevealOnScroll from "./components/RevealOnScroll";
import TerminalConsole from "./components/TerminalConsole";
import FocusSoundboard from "./components/FocusSoundboard";
import Guestbook from "./components/Guestbook";
import { Terminal } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <ToastProvider>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-[#050816] text-white selection:bg-electric-blue/30 selection:text-white">
          {/* Custom Mouse Cursor (Desktop/Large Screens) */}
          <CustomCursor />

          {/* Sticky Navigation Header */}
          <Navbar />

          {/* Core Visual Pages */}
          <main>
            {/* Cinematic Hero & Particle Canvas */}
            <Hero />

            <SectionDivider variant="pulse" glowColor="cyan" />

            {/* Detailed Biographical Background */}
            <RevealOnScroll direction="up" duration={1000}>
              <About />
            </RevealOnScroll>

            <SectionDivider variant="tech" glowColor="cyan" />

            {/* Interactive Terminal Shell */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-10">
              <RevealOnScroll direction="up" duration={1000}>
                <div className="flex flex-col items-center text-center mb-12">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 mb-4">
                    <Terminal className="w-3.5 h-3.5 text-neon-cyan" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neon-cyan">
                      SECURE TUNNEL
                    </span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                    INTERACTIVE TERMINAL CONSOLE
                  </h2>
                  <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                    Execute low-level environment checks, parse skills, and activate live immersive canvas matrices.
                  </p>
                </div>
                <TerminalConsole />
              </RevealOnScroll>
            </div>

            <SectionDivider variant="wave" glowColor="purple" />

            {/* Technical Stack Dashboard */}
            <RevealOnScroll direction="up" duration={1000}>
              <Skills />
            </RevealOnScroll>

            <SectionDivider variant="tech" glowColor="cyan" />

            {/* Selected Case Studies */}
            <RevealOnScroll direction="up" duration={1000}>
              <Projects />
            </RevealOnScroll>

            <SectionDivider variant="pulse" glowColor="purple" />

            {/* Education and Verified Certifications */}
            <RevealOnScroll direction="up" duration={1000}>
              <EducationAndCertifications />
            </RevealOnScroll>

            <SectionDivider variant="wave" glowColor="cyan" />

            {/* Career Timeline Progress */}
            <RevealOnScroll direction="up" duration={1000}>
              <ExperienceTimeline />
            </RevealOnScroll>

            <SectionDivider variant="tech" glowColor="cyan" />

            {/* Focus Soundboard Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-10">
              <RevealOnScroll direction="up" duration={1000}>
                <FocusSoundboard />
              </RevealOnScroll>
            </div>

            <SectionDivider variant="pulse" glowColor="purple" />

            {/* Guestbook Visitor Register */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-10">
              <RevealOnScroll direction="up" duration={1000}>
                <Guestbook />
              </RevealOnScroll>
            </div>

            <SectionDivider variant="tech" glowColor="purple" />

            {/* Form Transmission Panel */}
            <RevealOnScroll direction="up" duration={1000}>
              <Contact />
            </RevealOnScroll>
          </main>

          {/* Footer Grid */}
          <footer className="relative z-20 py-16 bg-neutral-950 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Brand identifier */}
              <div className="flex flex-col items-center md:items-start gap-2">
                <span className="font-display text-lg font-bold tracking-tighter text-white uppercase">
                  NAMIT YADAV
                </span>
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                  Software Engineer Portfolio
                </span>
              </div>

              {/* Legal mark */}
              <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest text-center md:text-left">
                © 2026 NAMIT YADAV. ALL RIGHTS RESERVED.
              </p>

              {/* Navigation short links */}
              <div className="flex items-center gap-6">
                <a
                  href="#home"
                  className="font-mono text-[9px] text-neutral-400 hover:text-white uppercase tracking-widest transition-colors"
                >
                  TOP
                </a>
                <a
                  href="https://github.com/namit27y-dotcom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[9px] text-neutral-400 hover:text-white uppercase tracking-widest transition-colors"
                >
                  GITHUB
                </a>
                <a
                  href="https://www.linkedin.com/in/namit-yadav-b3516b392"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[9px] text-neutral-400 hover:text-white uppercase tracking-widest transition-colors"
                >
                  LINKEDIN
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}
    </ToastProvider>
  );
}

