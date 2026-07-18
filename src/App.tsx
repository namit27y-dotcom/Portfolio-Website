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
            <About />

            <SectionDivider variant="wave" glowColor="purple" />

            {/* Technical Stack Dashboard */}
            <Skills />

            <SectionDivider variant="tech" glowColor="cyan" />

            {/* Selected Case Studies */}
            <Projects />

            <SectionDivider variant="pulse" glowColor="purple" />

            {/* Education and Verified Certifications */}
            <EducationAndCertifications />

            <SectionDivider variant="wave" glowColor="cyan" />

            {/* Career Timeline Progress */}
            <ExperienceTimeline />

            <SectionDivider variant="tech" glowColor="purple" />

            {/* Form Transmission Panel */}
            <Contact />
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

