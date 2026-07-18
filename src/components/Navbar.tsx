import { useState, useEffect, useRef, MouseEvent } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Scroll effect (Shrink & Opacity)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Scroll Progress Indicator (Top of screen)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollY / docHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // 2. Active Section Observer
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Watch center-screen triggers
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const id = item.href.substring(1);
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = isScrolled ? 64 : 88;
      const targetPosition = element.offsetTop - navHeight + 2;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "h-16 bg-neutral-950/75 backdrop-blur-md border-white/5 shadow-2xl"
            : "h-24 bg-transparent border-transparent"
        }`}
      >
        {/* Scroll Progress Bar */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-electric-blue via-neon-purple to-neon-cyan transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group relative flex items-center gap-2 font-display text-2xl font-bold tracking-tighter text-white uppercase select-none"
          >
            <span className="bg-gradient-to-r from-electric-blue via-neon-purple to-neon-cyan bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              NAMIT YADAV
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-electric-glow group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/5 px-2 py-1.5 rounded-full backdrop-blur-xl">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {/* Sliding Pill Background Indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10 layout-pill" />
                  )}
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="relative inline-flex items-center gap-1 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-xs font-mono text-white transition-all duration-300 group hover:border-white/20"
            >
              Let's Talk
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] text-white hover:bg-white/[0.05] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden animate-[fadeIn_0.3s_ease_forwards]">
          <div className="flex flex-col gap-6">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  style={{ animationDelay: `${index * 0.08}s` }}
                  className={`text-3xl font-display font-medium tracking-tight uppercase transition-all duration-300 animate-[fadeInSlideUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 ${
                    isActive
                      ? "text-electric-glow pl-4 border-l-2 border-electric-blue"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="mt-12 opacity-0 animate-[fadeInSlideUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]" style={{ animationDelay: "0.4s" }}>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="w-full inline-flex items-center justify-center py-4 rounded-xl bg-gradient-to-r from-electric-blue to-neon-purple text-sm font-mono font-bold tracking-wider text-white"
            >
              LET'S COLLABORATE
            </a>
          </div>
        </div>
      )}

      {/* Embedded Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
