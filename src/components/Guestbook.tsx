import React, { useState, useEffect } from "react";
import { MessageSquare, Send, Award, Sparkles, Trash2, Calendar } from "lucide-react";
import { playKeyboardClick } from "./FocusSoundboard";

interface GuestbookEntry {
  id: string;
  name: string;
  badge: string;
  glowColor: "blue" | "purple" | "cyan" | "pink" | "emerald";
  message: string;
  timestamp: string;
}

const PREPOPULATED_ENTRIES: GuestbookEntry[] = [
  {
    id: "pre-1",
    name: "Guido van Rossum",
    badge: "Python Creator",
    glowColor: "emerald",
    message: "Impressive work with the Python Turtle graphics simulator! Decoupled object-oriented logic classes are robust.",
    timestamp: "July 12, 2026"
  },
  {
    id: "pre-2",
    name: "Dr. K. Sharma",
    badge: "B.E. Academics",
    glowColor: "blue",
    message: "Namit demonstrates superior diligence in his computer science coursework. His grasp of Java OOP structure is highly refined.",
    timestamp: "June 24, 2026"
  },
  {
    id: "pre-3",
    name: "Linus Torvalds",
    badge: "Kernel Architect",
    glowColor: "purple",
    message: "Clean Git workspace specifications and neat responsive styling. Solid developer hygiene. Keep compiling.",
    timestamp: "May 18, 2026"
  }
];

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedBadge, setSelectedBadge] = useState("CS Peer");
  const [selectedGlow, setSelectedGlow] = useState<GuestbookEntry["glowColor"]>("blue");

  const badges = ["CS Peer", "Tech Lead", "Fullstack Recruiter", "AI Dev", "Hacker"];

  const glowStyles = {
    blue: { text: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/5", glow: "shadow-[0_0_15px_rgba(59,130,246,0.15)]", badgeBg: "bg-blue-500/10 text-blue-400" },
    purple: { text: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/5", glow: "shadow-[0_0_15px_rgba(168,85,247,0.15)]", badgeBg: "bg-purple-500/10 text-purple-400" },
    cyan: { text: "text-cyan-400", border: "border-cyan-500/20", bg: "bg-cyan-500/5", glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)]", badgeBg: "bg-cyan-500/10 text-cyan-400" },
    pink: { text: "text-pink-400", border: "border-pink-500/20", bg: "bg-pink-500/5", glow: "shadow-[0_0_15px_rgba(236,72,153,0.15)]", badgeBg: "bg-pink-500/10 text-pink-400" },
    emerald: { text: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5", glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]", badgeBg: "bg-emerald-500/10 text-emerald-400" },
  };

  // Initialize and load entries
  useEffect(() => {
    const saved = localStorage.getItem("namit_portfolio_guestbook");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        setEntries(PREPOPULATED_ENTRIES);
      }
    } else {
      setEntries(PREPOPULATED_ENTRIES);
      localStorage.setItem("namit_portfolio_guestbook", JSON.stringify(PREPOPULATED_ENTRIES));
    }
  }, []);

  const handlePostEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    playKeyboardClick();

    const newEntry: GuestbookEntry = {
      id: "entry-" + Date.now(),
      name: name.trim(),
      badge: selectedBadge,
      glowColor: selectedGlow,
      message: message.trim(),
      timestamp: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("namit_portfolio_guestbook", JSON.stringify(updated));

    setName("");
    setMessage("");
  };

  const clearGuestbook = () => {
    playKeyboardClick();
    if (confirm("Reset guestbook entries to default baseline?")) {
      setEntries(PREPOPULATED_ENTRIES);
      localStorage.setItem("namit_portfolio_guestbook", JSON.stringify(PREPOPULATED_ENTRIES));
    }
  };

  return (
    <div id="guestbook-wall" className="p-8 rounded-3xl border border-white/5 bg-neutral-950/60 backdrop-blur-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Form panel column */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/5 mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-neon-purple" />
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-neon-purple">
                Visitor Registry
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
              SIGN THE VISITOR LOG
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mb-6 leading-relaxed">
              Authenticate your visit! Leave a verified network log, pick a dynamic badge title, and customize your signature styling parameters.
            </p>

            <form onSubmit={handlePostEntry} className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-neutral-500 uppercase font-bold">Your Identifier / Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elon Musk, Tech Lead, CS Student"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/5 text-white font-sans text-xs sm:text-sm outline-none focus:border-neon-purple/40 transition-colors"
                />
              </div>

              {/* Badge Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-neutral-500 uppercase font-bold font-bold">Assign Title Badge</label>
                <div className="flex flex-wrap gap-1.5">
                  {badges.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => { playKeyboardClick(); setSelectedBadge(b); }}
                      className={`px-3 py-1.5 rounded-lg border font-mono text-[9px] uppercase tracking-wider transition-all ${
                        selectedBadge === b
                          ? "bg-neon-purple/10 border-neon-purple text-neon-purple font-bold"
                          : "bg-white/[0.01] border-white/5 text-neutral-400 hover:bg-white/[0.03]"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Signature Accent Glow Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-neutral-500 uppercase font-bold">Signature Accent Color</label>
                <div className="flex items-center gap-2.5">
                  {(Object.keys(glowStyles) as Array<GuestbookEntry["glowColor"]>).map((color) => {
                    const styles = glowStyles[color];
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => { playKeyboardClick(); setSelectedGlow(color); }}
                        className={`w-5 h-5 rounded-full border transition-all ${
                          selectedGlow === color
                            ? "border-white scale-110 shadow-lg"
                            : "border-white/10 hover:scale-105"
                        }`}
                        style={{
                          backgroundColor: color === "blue" ? "#3b82f6" : color === "purple" ? "#a855f7" : color === "cyan" ? "#06b6d4" : color === "pink" ? "#ec4899" : "#10b857"
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Log Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-neutral-500 uppercase font-bold">Log Message</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a friendly message, peer-review, or coding test log..."
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/5 text-white font-sans text-xs sm:text-sm outline-none focus:border-neon-purple/40 transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-5 rounded-xl bg-neon-purple hover:bg-neon-purple/95 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              >
                <Send className="w-3.5 h-3.5" />
                COMMIT SIGNATURE
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-neutral-500 text-[10px] font-mono">
            <span>TOTAL SIGNATURES: {entries.length}</span>
            <button
              onClick={clearGuestbook}
              className="flex items-center gap-1 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              RESET SYSTEM LOG
            </button>
          </div>
        </div>

        {/* Scrollable lists column */}
        <div className="lg:col-span-7 flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {entries.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center border border-white/5 bg-white/[0.01] rounded-2xl text-neutral-500">
              <Sparkles className="w-6 h-6 mb-2 text-neutral-600 animate-pulse" />
              <span className="font-mono text-xs">No entries committed. Be the first!</span>
            </div>
          ) : (
            entries.map((entry) => {
              const theme = glowStyles[entry.glowColor] || glowStyles.blue;
              return (
                <div
                  key={entry.id}
                  className={`p-5 rounded-2xl border bg-neutral-950/40 backdrop-blur-sm transition-all duration-300 hover:bg-neutral-900/40 ${theme.border} ${theme.glow} flex flex-col gap-3 animate-[scale-slide-up_0.3s_ease_forwards]`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center font-display font-extrabold text-sm text-white">
                        {entry.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-white leading-tight">
                          {entry.name}
                        </h4>
                        <span className={`inline-block px-2 py-0.5 rounded-full font-mono text-[8px] uppercase tracking-wider font-extrabold mt-1 ${theme.badgeBg}`}>
                          {entry.badge}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-neutral-500">
                      <Calendar className="w-3 h-3" />
                      <span>{entry.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-sans">
                    {entry.message}
                  </p>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
