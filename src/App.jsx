import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Instagram, 
  Server, Database, Code, 
  Cpu, Shield, Zap, ExternalLink, Activity, Wifi, Lock, 
  Terminal as TerminalIcon, GraduationCap, Settings, Eye, Gauge,
  MessageSquare, Send
} from 'lucide-react';

// --- DATA PRIBADI ---
const portfolioData = {
  name: "Kautsar Rifqi Aditya",
  role: "Full-Stack Systems Architect",
  bio: "Mengorkestrasi data dalam skala masif. Membangun sistem yang tak hanya berjalan, tapi berlari. Spesialisasi dalam High-Concurrency Systems dan Distributed Architecture.",
  email: "kautsarrifqi1@gmail.com", // Email asli nanti muncul setelah didekripsi
  phone: "6282133454277",
  
  education: [
    {
      school: "Universitas Jenderal Soedirman",
      degree: "S1 Informatika",
      year: "2025 - Present",
      desc: "Research Focus: Distributed Systems & Cloud Computing Security.",
      status: "Current Kernel"
    },
    {
      school: "SMK Telkom Purwokerto",
      degree: "Rekayasa Perangkat Lunak",
      year: "2021 - 2024",
      desc: "Graduated with High Distinction. Best Capstone Project Award.",
      status: "Legacy Core"
    }
  ],
  
  skills: [
    { name: "Python / Django", level: 98, icon: <Code size={18} /> },
    { name: "Go-lang (Concurrency)", level: 95, icon: <Zap size={18} /> },
    { name: "Database Sharding", level: 92, icon: <Database size={18} /> },
    { name: "System Security", level: 90, icon: <Shield size={18} /> },
  ],
  
  projects: [
    {
      title: "Vortex API Gateway",
      tag: "Infrastructure",
      desc: "Menangani 1M+ request/detik dengan latency <10ms menggunakan Go-routines.",
      tech: ["Go", "gRPC", "Redis Cluster"],
    },
    {
      title: "Project A.S.A.P",
      tag: "Health Tech",
      desc: "Analisis Big Data untuk pola komunikasi P-Process pada kampanye anti-rokok.",
      tech: ["Python", "Pandas", "NLP"],
    },
    {
      title: "Musyang 2025 VoteChain",
      tag: "Blockchain",
      desc: "Sistem voting terdesentralisasi untuk musyawarah organisasi, anti-manipulasi.",
      tech: ["Solidity", "Node.js", "Merkle Tree"],
    }
  ]
};

// --- COMPONENT: DECRYPTOR BUTTON (CONTACT) ---
const DecryptorContact = () => {
  const [decrypted, setDecrypted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleDecrypt = () => {
    if (decrypted || isRunning) return;
    setIsRunning(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 15);
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setDecrypted(true);
        setIsRunning(false);
      }
      setProgress(p);
    }, 100);
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-white/10 text-center max-w-md mx-auto mt-12">
      <h3 className="text-xl font-bold mb-4 flex justify-center items-center gap-2">
        <Lock size={18} className={decrypted ? "text-green-500" : "text-red-500"} />
        SECURE CONTACT CHANNEL
      </h3>
      
      {!decrypted ? (
        <div className="space-y-4">
          <div className="font-mono text-gray-500 tracking-widest bg-black/30 p-3 rounded">
            ***********************
          </div>
          {isRunning ? (
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
            </div>
          ) : (
            <button 
              onClick={handleDecrypt}
              className="bg-red-500/20 hover:bg-red-500/40 text-red-300 px-6 py-2 rounded-lg font-mono text-sm border border-red-500/50 transition-all hover:scale-105 active:scale-95"
            >
              [ RUN DECRYPTION PROTOCOL ]
            </button>
          )}
          {isRunning && <p className="text-xs text-green-500 font-mono animate-pulse">Brute-forcing encryption keys...</p>}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="font-mono text-green-400 text-lg mb-2 select-all bg-green-900/20 p-3 rounded border border-green-500/30">
            {portfolioData.email}
          </div>
          <p className="text-xs text-gray-500">Access Granted. Logged.</p>
        </motion.div>
      )}
    </div>
  );
};

// --- COMPONENT: CONTROL PANEL (FLOATING) ---
const ControlPanel = ({ debugMode, setDebugMode, turboMode, setTurboMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-card p-4 rounded-xl border border-white/20 mb-2 min-w-[200px]"
          >
            <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">System Overrides</h4>
            
            {/* Toggle 1: X-RAY */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-sm">
                <Eye size={14} className="text-cyan-400" /> X-Ray Vision
              </div>
              <button 
                onClick={() => setDebugMode(!debugMode)}
                className={`w-10 h-5 rounded-full relative transition-colors ${debugMode ? 'bg-cyan-500' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${debugMode ? 'left-6' : 'left-1'}`} />
              </button>
            </div>

            {/* Toggle 2: TURBO */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm">
                <Gauge size={14} className="text-red-400" /> Turbo Boost
              </div>
              <button 
                onClick={() => setTurboMode(!turboMode)}
                className={`w-10 h-5 rounded-full relative transition-colors ${turboMode ? 'bg-red-500' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${turboMode ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 ${isOpen ? 'bg-white text-black' : 'glass-card text-white'}`}
      >
        <Settings size={24} className={isOpen ? "animate-spin-slow" : ""} />
      </button>
    </div>
  );
};

// --- COMPONENT: TERMINAL ---
const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Connecting to Kautsar_Mainframe...' },
    { type: 'system', content: 'Type "help" to see commands.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let res = '';
      if (cmd === 'help') res = 'try: about, clear, date, sudo reboot';
      else if (cmd === 'about') res = 'Prof. Kautsar: The Architect.';
      else if (cmd === 'date') res = new Date().toString();
      else if (cmd === 'sudo reboot') res = 'Nice try. Permission denied.';
      else if (cmd === 'clear') { setHistory([]); setInput(''); return; }
      else res = `Command not found: ${cmd}`;
      
      setHistory([...history, { type: 'user', content: `> ${input}` }, { type: 'system', content: res }]);
      setInput('');
    }
  };

  return (
    <div className="glass-card mt-8 rounded-lg overflow-hidden font-mono text-sm border border-gray-700/50 w-full">
      <div className="bg-gray-900/80 px-4 py-2 flex gap-2 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="p-4 bg-black/40 h-48 overflow-y-auto">
        {history.map((line, i) => (
          <div key={i} className={`mb-1 ${line.type === 'user' ? 'text-green-400' : 'text-blue-300'}`}>{line.content}</div>
        ))}
        <div className="flex gap-2 text-green-400">
          <span>$</span>
          <input 
            value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand}
            className="bg-transparent outline-none flex-1 text-white" autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
// --- COMPONENT: WHATSAPP UPLINK (CHAT) ---
const SecureUplink = () => {
  // Ganti pesan sesuai selera Prof.
  const message = encodeURIComponent("Halo Prof. Kautsar, saya telah mengakses System V.3.0. Saya tertarik untuk berdiskusi lebih lanjut mengenai arsitektur sistem dan kolaborasi.");
  const whatsappLink = `https://wa.me/${portfolioData.phone}?text=${message}`;

  return (
    <a 
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
    >
      <div className="relative">
        {/* Ping Animation Effect */}
        <div className="absolute -inset-1 bg-green-500/30 rounded-full blur opacity-40 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
        
        <div className="glass-card flex items-center gap-3 px-4 py-3 rounded-full border border-green-500/30 text-green-400 hover:bg-green-500/10 transition-all hover:scale-105 hover:pr-6">
          <div className="relative">
            <MessageSquare size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-gray-400 leading-none uppercase tracking-wider">Secure Line</span>
            <span className="text-sm font-bold leading-none group-hover:text-white transition-colors">ESTABLISH UPLINK</span>
          </div>
          
          <Send size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
        </div>
      </div>
    </a>
  );
};
// --- APP UTAMA ---
function App() {
  const [debugMode, setDebugMode] = useState(false);
  const [turboMode, setTurboMode] = useState(false);

  return (
    <div className={`min-h-screen text-white font-sans selection:bg-cyan-500 selection:text-black pb-20 overflow-x-hidden ${debugMode ? 'debug-screens' : ''}`}>
      
      {/* CSS untuk Debug Mode */}
      {debugMode && (
        <style>{`
          * { outline: 1px solid rgba(0, 255, 255, 0.3) !important; }
          .glass-card { background: rgba(0, 0, 0, 0.8) !important; }
        `}</style>
      )}

      {/* Background Blobs (Kecepatan tergantung Turbo Mode) */}
      <div className="blob-cont fixed inset-0 pointer-events-none">
        <div className={`blob blob-1 rounded-full mix-blend-screen ${turboMode ? 'animate-fast' : ''}`}></div>
        <div className={`blob blob-2 rounded-full mix-blend-screen ${turboMode ? 'animate-fast' : ''}`}></div>
        <div className={`blob blob-3 rounded-full mix-blend-screen ${turboMode ? 'animate-fast' : ''}`}></div>
      </div>
      {turboMode && <style>{`.blob { animation-duration: 2s !important; }`}</style>}

      <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        
        {/* NAV BAR */}
        <nav className="flex justify-between items-center mb-16 glass-card px-6 py-4 rounded-full sticky top-4 z-40 backdrop-blur-xl border border-white/10">
            <span className="font-bold text-xl tracking-tighter">K.R.A<span className="text-cyan-400">.DEV</span></span>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-mono text-green-400">ONLINE</span>
            </div>
        </nav>

        {/* CONTROL PANEL (Mainan Baru) */}
        <ControlPanel 
          debugMode={debugMode} setDebugMode={setDebugMode}
          turboMode={turboMode} setTurboMode={setTurboMode}
        />
        <SecureUplink /> 

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          
          {/* HERO LEFT */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono mb-6">
                <Activity size={14} /> SYSTEM V.3.0 READY
             </div>
             <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
               {portfolioData.name}
             </h1>
             <p className="text-xl text-cyan-100/70 font-light leading-relaxed mb-8">
               {portfolioData.role} <br/>
               <span className="text-sm font-mono text-gray-400 mt-2 block">Building digital fortresses & scalable engines.</span>
             </p>
             
             <div className="flex gap-4">
               <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-lg transition-all active:scale-95">
                 Explore Projects
               </button>
               <button className="border border-white/20 hover:bg-white/10 px-6 py-3 rounded-lg transition-all">
                 View CV
               </button>
             </div>
          </motion.div>

          {/* HERO RIGHT (Interactive Terminal) */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Terminal />
          </motion.div>
        </div>

        {/* SECTION: EDUCATION LOGS (FIXED) */}
        <motion.section 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
              <GraduationCap size={24} />
            </div>
            <h2 className="text-3xl font-bold">Kernel Version History</h2>
          </div>

          <div className="relative border-l-2 border-white/10 ml-6 space-y-12">
            {portfolioData.education.map((edu, idx) => (
              <div key={idx} className="relative pl-8 group">
                {/* Dot Connector */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-purple-500 group-hover:bg-purple-500 transition-colors"></div>
                
                <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all cursor-default">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{edu.school}</h3>
                    <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                      {edu.status}
                    </span>
                  </div>
                  <p className="text-purple-400 font-medium mb-2">{edu.degree} <span className="text-gray-500 text-sm">/ {edu.year}</span></p>
                  
                  {/* BAGIAN YANG DIPERBAIKI ADA DI SINI */}
                  <p className="text-gray-400 text-sm leading-relaxed flex gap-2">
                    <span className="text-purple-500 font-bold">&gt;</span> 
                    {edu.desc}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PROJECTS GRID */}
        <section className="mb-32">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Server className="text-cyan-400" /> Deployed Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioData.projects.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="glass-card p-8 rounded-3xl border border-white/5 hover:border-cyan-500/50 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-mono text-cyan-400 border border-cyan-500/30 px-2 py-1 rounded bg-cyan-900/20">{project.tag}</span>
                  <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{project.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.tech.map((t, i) => (
                     <span key={i} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/5">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT DECRYPTOR (Mainan Baru) */}
        <section className="pb-20">
          <DecryptorContact />
          
          <div className="flex justify-center gap-8 mt-12">
             <Github className="text-gray-500 hover:text-white cursor-pointer hover:scale-110 transition" />
             <Linkedin className="text-gray-500 hover:text-white cursor-pointer hover:scale-110 transition" />
             <Instagram className="text-gray-500 hover:text-white cursor-pointer hover:scale-110 transition" />
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;