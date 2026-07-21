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

  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. Scroll effect (Shrink, Opacity & Progress)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Scroll Progress Indicator (Top of screen)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollY / docHeight) * 100);
      }

      if (isProgrammaticScroll.current) return;

      // Safe Top Edge Check: Force "home" if scrolled close to top
      if (scrollY < 120) {
        setActiveSection("home");
      }
      // Safe Bottom Edge Check: Force "contact" if scrolled close to bottom
      else if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 60) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 2. Active Section Observer with robust intersection centering logic
    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -35% 0px", // Middle 30% of the viewport triggers section change
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isProgrammaticScroll.current) return;

      const intersectingEntry = entries.find((entry) => entry.isIntersecting);
      if (intersectingEntry) {
        setActiveSection(intersectingEntry.target.id);
      }
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
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const id = href.substring(1);
    
    // Set instantly for immediate, responsive visual feedback
    setActiveSection(id);
    
    // Suppress observer callbacks while smooth scrolling
    isProgrammaticScroll.current = true;
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    const element = document.getElementById(id);
    if (element) {
      const navHeight = isScrolled ? 64 : 88;
      const rect = element.getBoundingClientRect();
      const targetPosition = rect.top + window.scrollY - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Clear lock state after typical scroll duration finishes
      scrollTimeoutRef.current = window.setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 800);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
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
            aria-label="Namit Yadav Home"
          >
            <span className="bg-gradient-to-r from-electric-blue via-neon-purple to-neon-cyan bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              NAMIT YADAV
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-electric-glow group-hover:w-full transition-all duration-150" />
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
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide outline-none focus-visible:ring-1 focus-visible:ring-white/20 select-none ${
                    isActive
                      ? "text-white"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.02] hover:scale-[1.02]"
                  }`}
                  style={{
                    transition: "color 150ms ease-out, background-color 150ms ease-out, transform 150ms ease-out"
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Sliding Pill Background Indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10 layout-pill animate-[fade-in_120ms_ease-out_forwards]" />
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
              className={`relative inline-flex items-center gap-1 px-5 py-2.5 rounded-full border text-xs font-mono transition-all duration-150 ease-out group outline-none focus-visible:ring-1 focus-visible:ring-white/20 ${
                activeSection === "contact"
                  ? "border-white bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white hover:border-white/20"
              }`}
              style={{
                transition: "color 150ms ease-out, background-color 150ms ease-out, border-color 150ms ease-out, transform 150ms ease-out"
              }}
              aria-current={activeSection === "contact" ? "page" : undefined}
            >
              Let's Talk
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 ease-out" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] text-white hover:bg-white/[0.05] transition-colors focus-visible:ring-1 focus-visible:ring-white/20 outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden animate-[fadeIn_0.15s_ease_forwards]">
          <div className="flex flex-col gap-6">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  className={`text-3xl font-display font-medium tracking-tight uppercase transition-all duration-150 ease-out animate-[fadeInSlideUp_0.2s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 ${
                    isActive
                      ? "text-electric-glow pl-4 border-l-2 border-electric-blue"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="mt-12 opacity-0 animate-[fadeInSlideUp_0.2s_cubic-bezier(0.16,1,0.3,1)_forwards]" style={{ animationDelay: "0.3s" }}>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="w-full inline-flex items-center justify-center py-4 rounded-xl bg-gradient-to-r from-electric-blue to-neon-purple text-sm font-mono font-bold tracking-wider text-white hover:opacity-90 active:scale-98 transition-all duration-150"
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
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
