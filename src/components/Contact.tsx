import { useState, FormEvent, ChangeEvent, FocusEvent } from "react";
import { Mail, Send, CheckCircle, AlertCircle, Sparkles, Github, MapPin, Linkedin } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { useToast } from "./Toast";

export default function Contact() {
  const { showToast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [activeField, setActiveField] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setSubmitStatus("error");
      showToast("Missing required transmission fields. Please verify and retry.", "warning");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setSubmitStatus("error");
      showToast("Invalid email address. Please check your contact coordinates.", "warning");
      return;
    }

    setSubmitStatus("loading");

    // Simulate safe API posting
    setTimeout(() => {
      setSubmitStatus("success");
      showToast("Transmission beam successfully engaged! I will review your message soon.", "success");
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-32 bg-[#050816] selection:bg-electric-blue/20 selection:text-white">
      {/* Decorative Top Separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-electric-blue/20 bg-electric-blue/5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-electric-glow" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-electric-glow">
                Transmission
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
              GET IN TOUCH
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-neon-purple to-transparent mx-auto" />
          </RevealOnScroll>
        </div>

        {/* Form and Info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Left Column: Direct info nodes */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <RevealOnScroll direction="right">
              <div className="flex flex-col gap-6">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                  LET'S DISCUSS OPPORTUNITIES.
                </h3>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
                  Looking for an enthusiastic Software Engineer intern or campus placement candidate? Send a message and let's discuss how I can contribute to your engineering team!
                </p>

                {/* Info blocks */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 group">
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-electric-glow group-hover:border-electric-blue/20 group-hover:bg-electric-blue/5 transition-all">
                      <Mail className="w-5 h-5 animate-[float_4s_ease-in-out_infinite]" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">
                        Direct Email
                      </span>
                      <a
                        href="mailto:namit27y@gmail.com"
                        className="text-neutral-200 text-sm hover:text-white transition-colors font-mono font-medium"
                      >
                        namit27y@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-neon-purple group-hover:border-neon-purple/20 group-hover:bg-neon-purple/5 transition-all">
                      <Github className="w-5 h-5 animate-[float_4s_ease-in-out_infinite_reverse]" style={{ animationDelay: "1s" }} />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">
                        Code Hub
                      </span>
                      <a
                        href="https://github.com/namit27y-dotcom"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-200 text-sm hover:text-white transition-colors font-mono font-medium"
                      >
                        github.com/namit27y-dotcom
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-electric-glow group-hover:border-electric-blue/20 group-hover:bg-electric-blue/5 transition-all">
                      <Linkedin className="w-5 h-5 animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: "1.5s" }} />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">
                        Professional Network
                      </span>
                      <a
                        href="https://www.linkedin.com/in/namit-yadav-b3516b392"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-200 text-sm hover:text-white transition-colors font-mono font-medium"
                      >
                        linkedin.com/in/namit-yadav-b3516b392
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-neon-cyan group-hover:border-neon-cyan/20 group-hover:bg-neon-cyan/5 transition-all">
                      <MapPin className="w-5 h-5 animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: "2s" }} />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">
                        Location Coordinates
                      </span>
                      <span className="text-neutral-200 text-sm font-mono font-medium">
                        Open to Remote // Relocation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Aesthetic coordinate watermark */}
            <RevealOnScroll direction="right" delay={150} className="hidden lg:block font-mono text-[10px] text-neutral-600 tracking-widest">
              AETHER_PROTOCOL_V4.1 // SECURE_SOCKET_ON
            </RevealOnScroll>
          </div>

          {/* Right Column: Interactive glass form panel */}
          <div className="lg:col-span-7">
            <RevealOnScroll direction="left" delay={100}>
              <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                {/* Back glow shadow spot */}
                <div className="absolute top-[-10%] right-[-10%] w-60 h-60 bg-electric-blue/5 rounded-full filter blur-[80px]" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10" aria-label="Contact secure submission form">
                  
                  {/* Row: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Input Field */}
                    <div className="relative flex flex-col group">
                      <input
                        id="form-name"
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={handleBlur}
                        className={`w-full bg-white/[0.02] hover:bg-white/[0.04] border rounded-2xl px-5 py-4 text-sm text-white placeholder-transparent focus:outline-none focus:bg-neutral-950/40 transition-all duration-300 ${
                          activeField === "name" || formState.name
                            ? "border-electric-blue pt-6 pb-2 ring-1 ring-electric-blue/20"
                            : "border-white/5"
                        }`}
                        placeholder="Name"
                      />
                      <label
                        htmlFor="form-name"
                        className={`absolute left-5 text-neutral-500 pointer-events-none transition-all duration-300 font-mono text-xs uppercase tracking-wide ${
                          activeField === "name" || formState.name
                            ? "top-1 text-[9px] text-electric-glow font-bold"
                            : "top-4 text-xs"
                        }`}
                      >
                        Full Name
                      </label>
                    </div>

                    {/* Email Input Field */}
                    <div className="relative flex flex-col group">
                      <input
                        id="form-email"
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        className={`w-full bg-white/[0.02] hover:bg-white/[0.04] border rounded-2xl px-5 py-4 text-sm text-white placeholder-transparent focus:outline-none focus:bg-neutral-950/40 transition-all duration-300 ${
                          activeField === "email" || formState.email
                            ? "border-electric-blue pt-6 pb-2 ring-1 ring-electric-blue/20"
                            : "border-white/5"
                        }`}
                        placeholder="Email"
                      />
                      <label
                        htmlFor="form-email"
                        className={`absolute left-5 text-neutral-500 pointer-events-none transition-all duration-300 font-mono text-xs uppercase tracking-wide ${
                          activeField === "email" || formState.email
                            ? "top-1 text-[9px] text-electric-glow font-bold"
                            : "top-4 text-xs"
                        }`}
                      >
                        Email Address
                      </label>
                    </div>
                  </div>

                  {/* Subject Input Field */}
                  <div className="relative flex flex-col group">
                    <input
                      id="form-subject"
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      onFocus={() => handleFocus("subject")}
                      onBlur={handleBlur}
                      className={`w-full bg-white/[0.02] hover:bg-white/[0.04] border rounded-2xl px-5 py-4 text-sm text-white placeholder-transparent focus:outline-none focus:bg-neutral-950/40 transition-all duration-300 ${
                        activeField === "subject" || formState.subject
                          ? "border-electric-blue pt-6 pb-2 ring-1 ring-electric-blue/20"
                          : "border-white/5"
                      }`}
                      placeholder="Subject"
                    />
                    <label
                      htmlFor="form-subject"
                      className={`absolute left-5 text-neutral-500 pointer-events-none transition-all duration-300 font-mono text-xs uppercase tracking-wide ${
                        activeField === "subject" || formState.subject
                          ? "top-1 text-[9px] text-electric-glow font-bold"
                          : "top-4 text-xs"
                      }`}
                    >
                      Project Subject
                    </label>
                  </div>

                  {/* Message Textarea */}
                  <div className="relative flex flex-col group">
                    <textarea
                      id="form-message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus("message")}
                      onBlur={handleBlur}
                      className={`w-full bg-white/[0.02] hover:bg-white/[0.04] border rounded-2xl px-5 py-4 text-sm text-white placeholder-transparent focus:outline-none focus:bg-neutral-950/40 transition-all duration-300 min-h-[140px] resize-y ${
                        activeField === "message" || formState.message
                          ? "border-electric-blue pt-6 pb-2 ring-1 ring-electric-blue/20"
                          : "border-white/5"
                      }`}
                      placeholder="Message"
                    />
                    <label
                      htmlFor="form-message"
                      className={`absolute left-5 text-neutral-500 pointer-events-none transition-all duration-300 font-mono text-xs uppercase tracking-wide ${
                        activeField === "message" || formState.message
                          ? "top-1 text-[9px] text-electric-glow font-bold"
                          : "top-4 text-xs"
                      }`}
                    >
                      Transmission Message
                    </label>
                  </div>

                  {/* SUBMIT TRIGGERS */}
                  <div className="flex flex-col gap-4 mt-2">
                    
                    {/* Visual Button State Managers */}
                    {submitStatus === "idle" && (
                      <button
                        type="submit"
                        className="w-full relative py-4 rounded-2xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 active:scale-98 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_45px_rgba(255,255,255,0.2)]"
                      >
                        <span>Send Transmission</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {submitStatus === "loading" && (
                      <div className="w-full py-4 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center gap-3 text-white font-mono text-xs font-bold uppercase tracking-widest">
                        <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        <span>Transmission Active...</span>
                      </div>
                    )}

                    {submitStatus === "success" && (
                      <div className="w-full py-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center gap-3 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest animate-[fadeIn_0.3s_ease]">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Message Engaged</span>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="flex flex-col gap-3">
                        <div className="w-full py-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 flex items-center justify-center gap-3 text-rose-400 font-mono text-xs font-bold uppercase tracking-widest animate-[fadeIn_0.3s_ease]">
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                          <span>Transmission Failed</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSubmitStatus("idle")}
                          className="text-center font-mono text-[10px] uppercase text-neutral-500 hover:text-white transition-colors"
                        >
                          Retry Connection
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
