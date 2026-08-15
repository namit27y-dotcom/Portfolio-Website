import { Sparkles, GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import TechRoadmap from "./TechRoadmap";

export default function EducationAndCertifications() {
  const educationItems = [
    {
      degree: "Bachelor of Engineering (B.E.) in Computer Engineering",
      institution: "Pillai College of Engineering, New Panvel",
      period: "2025 — 2029 (Expected)",
      location: "New Panvel, Navi Mumbai",
      description: "Rigorous Bachelors of Engineering curriculum centered around structural algorithms, computing platforms, and modular systems software. Currently in 2nd Year (as of 2026).",
      highlights: [
        "Core Coursework: Data Structures & Algorithms, OOP (Java & Python), DBMS (MySQL), Web Architecture.",
        "Maintained strong academic performance, placing in the top tier of competitive coding forums.",
        "Active member of the Student Computer Engineering Society and Collaborative Developer Forum."
      ]
    }
  ];

  const certifications = [
    {
      title: "Modern Responsive Web Design Specialization",
      issuer: "Industry Standard Certification",
      date: "2025",
      id: "CERT-W3-RESP-942",
      skills: ["CSS3 Grid", "Flexbox Architecture", "Fluid Typography", "Mobile-First Design", "WCAG Accessibility"]
    },
    {
      title: "Java Object-Oriented Programming Mastery",
      issuer: "Global Software Engineering Forum",
      date: "2024",
      id: "CERT-JAVA-OOP-881",
      skills: ["Java Core", "Polymorphism", "Data Structures", "Inheritance Models", "Encapsulation Design"]
    },
    {
      title: "Asynchronous Web Applications & REST API Pipelines",
      issuer: "Interactive Code Academy",
      date: "2024",
      id: "CERT-JS-ASYNC-205",
      skills: ["Promises", "Async/Await Engine", "Fetch API", "RESTful Interfaces", "JSON Parsing"]
    },
    {
      title: "Data Science & Numerical Foundations with Python",
      issuer: "Evolving Intelligence Lab",
      date: "2025",
      id: "CERT-PY-DSML-104",
      skills: ["NumPy Arrays", "Pandas DataFrames", "Data Preprocessing", "Linear Regressions", "Data Analytics"]
    }
  ];

  return (
    <>
      {/* 1. SECTION: EDUCATION TIMELINE */}
      <section id="education" className="relative py-32 bg-[#050816] selection:bg-neon-cyan/20 selection:text-white overflow-hidden">
        {/* Horizontal dividing line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        {/* Light glowing node background */}
        <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-cyan/[0.03] blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="mb-20">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neon-cyan">
                  Academic Milestones
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                EDUCATION TIMELINE
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                A chronological map of my academic background, computer science coursework, and fundamental theoretical training.
              </p>
            </RevealOnScroll>
          </div>

          {/* Timeline Grid */}
          <div className="relative border-l border-white/10 ml-4 md:ml-6 flex flex-col gap-12 max-w-4xl">
            {educationItems.map((item, index) => (
              <div key={item.degree}>
                <RevealOnScroll direction="left" delay={index * 100}>
                  <div className="relative pl-8 md:pl-10 group">
                  
                  {/* Timeline dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-neon-cyan bg-neutral-950 group-hover:bg-neon-cyan group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  
                  {/* Card Container */}
                  <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 relative group">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                      <div>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                          {item.degree}
                        </h3>
                        <p className="text-neutral-300 text-sm font-medium mt-1">
                          {item.institution}
                        </p>
                      </div>
                      <div className="flex flex-col md:items-end gap-1.5 text-xs text-neutral-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-neon-cyan" />
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Highlights bullet list */}
                    <div className="border-t border-white/5 pt-6">
                      <h4 className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> Core Achievements
                      </h4>
                      <ul className="space-y-2 text-neutral-300 text-xs leading-relaxed">
                        {item.highlights.map((bullet, bulletIdx) => (
                          <li key={bulletIdx} className="flex items-start gap-2">
                            <span className="text-neon-cyan font-mono mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
              </div>
            ))}
          </div>

          {/* Interactive Knowledge Roadmap */}
          <div className="mt-28">
            <RevealOnScroll duration={1000}>
              <TechRoadmap />
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* 2. SECTION: CERTIFICATIONS */}
      <section id="certifications" className="relative py-32 bg-[#050816] selection:bg-neon-purple/20 selection:text-white overflow-hidden">
        {/* Horizontal dividing line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Purple glow background sphere */}
        <div className="absolute top-1/2 right-[10%] w-[500px] h-[500px] rounded-full bg-neon-purple/[0.03] blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
            <RevealOnScroll className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/5 mb-4">
                <Award className="w-3.5 h-3.5 text-neon-purple animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neon-purple">
                  Industry Endorsements
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                CERTIFICATIONS
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Verified training and credentials earned from rigorous specialization programs to build state-of-the-art developer skills.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100} className="w-full md:w-auto">
              <div className="w-full h-[1px] md:hidden bg-neutral-950 mb-4" />
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
                04 // CREDENTIALED SPECIALISTS
              </span>
            </RevealOnScroll>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div key={cert.title}>
                <RevealOnScroll delay={index * 50}>
                  <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md relative overflow-hidden group hover:border-white/10 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex flex-col h-full">
                  {/* Decorative corner indicator */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-neon-purple/10 to-transparent group-hover:from-neon-purple/20 transition-all duration-300 pointer-events-none" />
                  
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-1">
                        {cert.issuer}
                      </span>
                      <h3 className="font-display text-lg md:text-xl font-bold text-white group-hover:text-neon-purple transition-colors">
                        {cert.title}
                      </h3>
                    </div>
                    <div className="px-2 py-1 rounded border border-neon-purple/20 bg-neon-purple/5 text-[9px] font-mono font-bold text-neon-purple">
                      {cert.date}
                    </div>
                  </div>

                  <div className="flex-grow">
                    {/* Skills tags list */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 rounded bg-white/[0.02] border border-white/5 text-[10px] font-mono text-neutral-300 group-hover:border-white/10 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ID verification */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                    <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest">
                      ID: {cert.id}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
