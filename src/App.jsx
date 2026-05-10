import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Instagram, 
  Server, Database, Code, 
  Cpu, Shield, Zap, GraduationCap, 
  MessageSquare, ChevronRight, CheckCircle2, LayoutTemplate,
  PenTool, Terminal
} from 'lucide-react';

// --- DATA PRIBADI ---
const portfolioData = {
  name: "Kautsar Rifqi Aditya",
  role: "Full-Stack Web Developer",
  bio: "A passionate Full-Stack Web Developer with a solid foundation from vocational school, currently pursuing a degree in Informatics. I enjoy building efficient, functional, and user-friendly web applications, from frontend interfaces to backend logic.",
  email: "kautsarrifqi1@gmail.com", 
  phone: "6282133454277",
  
  education: [
    {
      school: "Universitas Jenderal Soedirman",
      degree: "S1 Informatika",
      year: "2025 - Present",
      desc: "Currently learning core computer science concepts, data structures, algorithms, and collaborative software engineering.",
    },
    {
      school: "SMK Telkom Purwokerto",
      degree: "Rekayasa Perangkat Lunak",
      year: "2021 - 2024",
      desc: "Built a strong practical foundation in basic programming, web development, and database management.",
    }
  ],
  
  skills: [
    { name: "Python", icon: <Code size={20} /> },
    { name: "Go-lang", icon: <Zap size={20} /> },
    { name: "JavaScript", icon: <LayoutTemplate size={20} /> },
    { name: "SQL & Database", icon: <Database size={20} /> },
    { name: "C#", icon: <Terminal size={20} /> },
    { name: "UI/UX Design", icon: <PenTool size={20} /> },
  ],
  
  contributions: [
    {
      title: "Introduction to Interactive Components",
      organization: "Catalyst - UNSOED",
      desc: "A comprehensive presentation about interactive components, exploring design patterns, user interaction best practices, and modern approaches to building engaging interfaces.",
      link: "https://presentasi-weekly-meet.vercel.app/",
      type: "Presentation",
      image: "/presentation-preview.png"
    }
  ],

  projects: [
    {
      title: "E-Voting OSIS SMK Telkom",
      tag: "Web Application",
      desc: "Sistem pemilihan ketua OSIS digital yang dirancang untuk memastikan transparansi, keamanan data pemilih, dan perhitungan suara real-time.",
      tech: ["PHP", "SQL", "Laravel"],
    },
    {
      title: "Idealibs",
      tag: "Digital Asset",
      desc: "Platform penyedia aset digital interaktif bergaya mirip Freepik, dirancang untuk mempermudah pencarian dan pengunduhan referensi visual.",
      tech: ["NextJs", "NodeJs", "SQL"],
    },
    {
      title: "Imhomekontraktor",
      tag: "Company Profile",
      desc: "Website profil perusahaan sebagai wadah promosi untuk meningkatkan daya tarik konsumen untuk menggunakan jasa kontraktor.",
      tech: ["Wordpress"],
    }
  ]
};

// --- COMPONENT: STATIC CODE WINDOW ---
const CodeProfileWindow = () => {
  return (
    <div className="glass-card rounded-xl border border-white/10 overflow-hidden text-sm font-mono shadow-2xl">
      <div className="bg-white/5 px-4 py-3 flex gap-2 border-b border-white/10 items-center">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <span className="ml-2 text-gray-400 text-xs">kaxurix-profile.json</span>
      </div>
      <div className="p-6 text-gray-300 bg-black/40 leading-relaxed overflow-x-auto">
        <pre>
          <span className="text-cyan-400">const</span> <span className="text-blue-300">developer</span> = {'{'} <br/>
          {'  '}name: <span className="text-green-400">"{portfolioData.name}"</span>,<br/>
          {'  '}role: <span className="text-green-400">"{portfolioData.role}"</span>,<br/>
          {'  '}location: <span className="text-green-400">"Purwokerto, ID"</span>,<br/>
          {'  '}skills: [<br/>
          {'    '}<span className="text-green-400">"Python"</span>,<br/>
          {'    '}<span className="text-green-400">"Go-lang"</span>,<br/>
          {'    '}<span className="text-green-400">"JavaScript"</span>,<br/>
          {'    '}<span className="text-green-400">"SQL"</span>,<br/>
          {'    '}<span className="text-green-400">"C#"</span>,<br/>
          {'    '}<span className="text-green-400">"UI/UX Design"</span><br/>
          {'  '}],<br/>
          {'  '}status: <span className="text-green-400">"Open to Work & Collaborate"</span><br/>
          {'}'};
        </pre>
      </div>
    </div>
  );
};

// --- COMPONENT: PROFESSIONAL WHATSAPP BUTTON ---
const FloatingWhatsApp = () => {
  const message = encodeURIComponent("Halo Kautsar, saya melihat portofolio Anda dan tertarik untuk berdiskusi lebih lanjut.");
  const whatsappLink = `https://wa.me/${portfolioData.phone}?text=${message}`;

  return (
    <a 
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-green-500/25 flex items-center justify-center">
        <MessageSquare size={24} />
      </div>
    </a>
  );
};

// --- APP UTAMA ---
function App() {
  return (
    <div className="min-h-screen text-gray-100 bg-slate-950 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 pb-20 overflow-x-hidden">
      
      {/* Background Subtle Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        
        {/* NAV BAR */}
        <nav className="flex justify-between items-center mb-24 py-4 border-b border-white/5">
            <span className="font-bold text-xl tracking-wide text-white">
              Kaxurix<span className="text-cyan-500">.</span>
            </span>
            <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#education" className="hover:text-white transition-colors">Education</a>
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
        </nav>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32" id="about">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
             <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white leading-tight">
               {portfolioData.name}
             </h1>
             <h2 className="text-xl md:text-2xl text-cyan-400 font-medium mb-6">
               {portfolioData.role}
             </h2>
             <p className="text-gray-400 text-lg leading-relaxed mb-8">
               {portfolioData.bio}
             </p>
             
             <div className="flex gap-4">
               <a href={`mailto:${portfolioData.email}`} className="bg-white hover:bg-gray-200 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
                 <Mail size={18} /> Contact Me
               </a>
               <a href="https://drive.google.com/file/d/1dLXqYTMm-l_fJqWkHl2Pr0HXmpoJUmU5/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="border border-white/20 hover:bg-white/5 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                 View CV
               </a>
             </div>
          </motion.div>

          {/* HERO RIGHT (Static Code Profile) */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <CodeProfileWindow />
          </motion.div>
        </div>

        {/* SECTION: SKILLS */}
        <motion.section 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          className="mb-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Cpu className="text-cyan-500" /> Core Competencies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolioData.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="text-cyan-400">{skill.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-200">{skill.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <GraduationCap className="text-cyan-500" /> Education Background
              </h3>
              <div className="space-y-8">
                {portfolioData.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-white/10">
                    <div className="absolute w-3 h-3 bg-cyan-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-slate-950"></div>
                    <h4 className="text-lg font-bold text-white">{edu.school}</h4>
                    <p className="text-cyan-400 font-medium mb-2">{edu.degree} <span className="text-gray-500 text-sm font-normal">• {edu.year}</span></p>
                    <p className="text-gray-400 text-sm leading-relaxed">{edu.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* EDUCATION & CONTRIBUTIONS SECTION */}
        <section className="mb-32" id="education">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Education & Contributions</h2>
            <p className="text-gray-400">Sharing knowledge and insights through presentations and contributions to the tech community at Catalyst UNSOED.</p>
          </div>
          
          <div className="space-y-6">
            {portfolioData.contributions.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="block overflow-hidden rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all group"
              >
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 relative">
                  {/* Preview Image */}
                  <div className="relative h-48 overflow-hidden bg-black/40">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded-full bg-cyan-500/10">
                        {item.type}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">{item.organization}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-3">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="text-cyan-400 group-hover:translate-x-1 transition-transform flex-shrink-0">
                        <ChevronRight size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="mb-32" id="projects">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Selected Projects</h2>
            <p className="text-gray-400">An overview of several web applications and systems I have developed.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.projects.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/[0.02] p-8 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group flex flex-col h-full"
              >
                <div className="mb-6">
                  <span className="text-xs font-mono text-cyan-400 border border-cyan-500/20 px-3 py-1.5 rounded-full bg-cyan-500/5">
                    {project.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-8 flex-grow leading-relaxed">{project.desc}</p>
                <div className="flex gap-2 flex-wrap mt-auto">
                  {project.tech.map((t, i) => (
                     <span key={i} className="text-xs text-gray-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                       {t}
                     </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FOOTER & CONTACT */}
        <footer className="pt-16 pb-8 border-t border-white/5 text-center" id="contact">
          <h2 className="text-2xl font-bold text-white mb-6">Mari Terhubung</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Saya selalu terbuka untuk mendiskusikan peluang kerja, proyek kolaborasi, atau sekadar berbagi wawasan tentang teknologi.
          </p>
          
          <div className="flex justify-center gap-6 mb-16">
             <a href="#" className="text-gray-500 hover:text-white transition-colors p-2"><Github size={24} /></a>
             <a href="#" className="text-gray-500 hover:text-white transition-colors p-2"><Linkedin size={24} /></a>
             <a href="#" className="text-gray-500 hover:text-white transition-colors p-2"><Instagram size={24} /></a>
          </div>
          
          <p className="text-sm text-gray-600 font-mono">
             © {new Date().getFullYear()} Kautsar Rifqi Aditya. All rights reserved.
          </p>
        </footer>

        {/* FLOATING WHATSAPP BUTTON */}
        <FloatingWhatsApp />

      </div>
    </div>
  );
}

export default App;