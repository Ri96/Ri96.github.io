import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, User, Code, Briefcase, Mail, Phone, Download, MapPin, 
  Copy, Check, ExternalLink, Award, FileBadge, ChevronRight 
} from 'lucide-react';

const MouseTrailer = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] bg-emerald-500/10 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
    </div>
  );
};

const Typewriter = ({ text, delay = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

const TerminalSection = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'DebarshiOS v1.0.0 init...' },
    { type: 'system', content: 'Connection established.' },
    { type: 'system', content: 'Type "help" for a list of commands.' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let response = '';
      
      switch(cmd) {
        case 'help':
          response = 'Available commands: whoami, stack, experience, contact, clear';
          break;
        case 'whoami':
          response = 'Debarshi Sen — Senior Software Engineer III @ HCLSoftware. Deploying high-throughput services & solving hard bugs.';
          break;
        case 'stack':
          response = 'TypeScript, Python, PHP, Vue.js, Laravel, React, MongoDB...';
          break;
        case 'experience':
          response = 'HCLSoftware (2026-Present) | PwC (2021-2026) | CodeClouds (2019-2021)';
          break;
        case 'contact':
          response = 'Email: d19sen@yahoo.com | Phone: +91 89816 02712';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case '':
          break;
        default:
          response = `Command not found: ${cmd}`;
      }

      setHistory(prev => [
        ...prev, 
        { type: 'user', content: cmd },
        ...(response ? [{ type: 'system', content: response }] : [])
      ]);
      setInput('');
    }
  };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto my-12">
      <div className="bg-slate-900/80 border border-emerald-500/30 rounded-lg overflow-hidden backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <div className="flex items-center px-4 py-2 bg-slate-950 border-b border-emerald-500/30">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <div className="mx-auto text-xs font-mono text-slate-400">guest@debarshi-sys:~</div>
        </div>
        <div className="p-6 font-mono text-sm sm:text-base h-[300px] overflow-y-auto">
          {history.map((line, i) => (
            <div key={i} className="mb-2">
              {line.type === 'user' ? (
                <div><span className="text-emerald-400">guest@sys</span><span className="text-slate-400">:</span><span className="text-cyan-400">~</span>$ {line.content}</div>
              ) : (
                <div className="text-slate-300 opacity-90">{line.content}</div>
              )}
            </div>
          ))}
          <div className="flex items-center">
            <span className="text-emerald-400">guest@sys</span><span className="text-slate-400">:</span><span className="text-cyan-400">~</span>$ 
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent border-none outline-none text-slate-100 ml-2 font-mono"
              autoFocus
            />
          </div>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ company, period, role, tags = [], isLast = false }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="relative pl-8 sm:pl-32 py-6 group"
  >
    {/* Line & Dot */}
    <div className="absolute left-0 sm:left-24 top-0 bottom-0 w-px bg-slate-800 group-hover:bg-emerald-500/50 transition-colors"></div>
    {!isLast && <div className="absolute left-0 sm:left-24 top-8 bottom-0 w-px bg-emerald-500/30"></div>}
    
    <div className="absolute left-[-4px] sm:left-[92px] top-8 w-3 h-3 rounded-full bg-canvas border-2 border-emerald-500 group-hover:bg-emerald-500 group-hover:shadow-[0_0_10px_#10b981] transition-all z-10"></div>
    
    <div className="flex flex-col sm:flex-row sm:items-center mb-2">
      <div className="sm:absolute sm:left-0 sm:w-20 text-xs font-mono text-cyan-400 sm:text-right sm:top-8 mb-1 sm:mb-0">
        {period}
      </div>
      <h3 className="text-xl font-bold text-slate-100 glow-emerald">{company}</h3>
    </div>
    <div className="text-emerald-400 font-mono text-sm mb-3"># {role}</div>
    
    {tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, i) => (
          <span key={i} className="px-2 py-1 text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded">
            {tag}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

const TechCard = ({ title, skills, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-slate-900/50 border border-slate-700 hover:border-cyan-500/50 p-6 rounded-lg box-glow-cyan transition-all"
  >
    <h4 className="text-cyan-400 font-mono mb-4 text-sm flex items-center">
      <Code className="w-4 h-4 mr-2" /> [ {title} ]
    </h4>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, i) => (
        <span key={i} className="text-sm bg-slate-800 text-slate-300 px-3 py-1 rounded border border-slate-700">
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const CopyButton = ({ text, value }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button 
      onClick={handleCopy}
      className="flex items-center justify-between w-full p-4 bg-slate-900/60 border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800/80 rounded-lg group transition-all"
    >
      <span className="font-mono text-slate-300 group-hover:text-emerald-400 transition-colors">{text}</span>
      {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5 text-slate-500 group-hover:text-emerald-400" />}
    </button>
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-canvas text-slate-300 font-sans scanlines bg-grid">
      <MouseTrailer />
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-[90vh] flex flex-col justify-center px-6 sm:px-12 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-emerald-500 font-mono mb-4 flex items-center">
            <Terminal className="w-5 h-5 mr-2" /> SYS.INIT
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-100 tracking-tight mb-4 glow-cyan">
            Debarshi Sen
          </h1>
          <h3 className="text-2xl md:text-3xl text-slate-400 mb-6 flex items-center">
            <ChevronRight className="w-8 h-8 text-emerald-500 mr-2" />
            <Typewriter text="Senior Software Engineer III" delay={60} />
          </h3>
          <p className="max-w-2xl text-lg text-slate-400 leading-relaxed mb-8 border-l-2 border-emerald-500/50 pl-4">
            Architecting distributed backends, modern frontend systems, and resilient cloud solutions.
          </p>
          
          <div className="flex flex-wrap gap-4 font-mono text-sm">
            <div className="flex items-center bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700">
              <MapPin className="w-4 h-4 mr-2 text-cyan-500" /> Kolkata / Bengaluru
            </div>
            <div className="flex items-center bg-emerald-900/20 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Deploying high-throughput services
            </div>
          </div>
        </motion.div>
        
        <TerminalSection />
      </section>

      {/* Experience Timeline */}
      <section className="relative z-10 px-6 sm:px-12 md:px-24 py-20 bg-slate-950/50 border-t border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center text-slate-100">
            <Briefcase className="w-8 h-8 mr-4 text-emerald-500" /> 
            <span className="glow-emerald">Career_Trajectory.log</span>
          </h2>
          
          <div className="mt-8">
            <TimelineItem 
              company="HCLSoftware"
              period="2026 - Pres"
              role="Senior Software Engineer III"
            />
            <TimelineItem 
              company="PwC Acceleration Centers"
              period="2021 - 2026"
              role="Senior Associate III (Started as Associate II)"
              tags={["Awarded Bright Beginner LoS", "Territory Spot Awards"]}
            />
            <TimelineItem 
              company="CodeClouds"
              period="2019 - 2021"
              role="Senior Software Developer (Started as Software Developer)"
            />
            <TimelineItem 
              company="Xelpmoc Design & Tech"
              period="2018 - 2019"
              role="Software Engineer"
            />
            <TimelineItem 
              company="Eleven & Sterling AG"
              period="2016 - 2018"
              role="Full Stack & Frontend Developer"
              isLast={true}
            />
          </div>
        </div>
      </section>

      {/* Tech Matrix */}
      <section className="relative z-10 px-6 sm:px-12 md:px-24 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center text-slate-100">
            <Code className="w-8 h-8 mr-4 text-cyan-500" /> 
            <span className="glow-cyan">Tech_Matrix.cfg</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TechCard 
              title="CORE_LANGUAGES_WEB" 
              skills={['TypeScript', 'Python', 'PHP', 'JavaScript', 'HTML5/CSS3']} 
              delay={0.1}
            />
            <TechCard 
              title="FRAMEWORKS_ECOSYSTEMS" 
              skills={['Vue.js (Composition API)', 'Laravel', 'React', 'FastAPIs']} 
              delay={0.2}
            />
            <TechCard 
              title="COMMERCE_ENTERPRISE" 
              skills={['HCL Commerce+', 'Hive Router']} 
              delay={0.3}
            />
            <TechCard 
              title="DATABASES_CLOUD" 
              skills={['MongoDB', 'REST APIs', 'Microservices', 'Cloud Server Mgmt']} 
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="relative z-10 px-6 sm:px-12 md:px-24 py-20 bg-slate-950/80 border-t border-slate-800">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center text-slate-100">
              <FileBadge className="w-6 h-6 mr-3 text-amber-500" /> 
              <span className="glow-amber">Certifications</span>
            </h2>
            <ul className="space-y-4">
              {['Vue.js Complete Guide', 'Complete Developers Guide to MongoDB', 'Complete Python Bootcamp', 'Master Laravel Suite'].map((cert, i) => (
                <li key={i} className="flex items-start bg-slate-900 p-4 rounded-lg border border-slate-800 hover:border-amber-500/50 transition-colors">
                  <Check className="w-5 h-5 text-amber-500 mr-3 shrink-0 mt-0.5" />
                  <span className="text-slate-300">{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center text-slate-100">
              <Award className="w-6 h-6 mr-3 text-amber-500" /> 
              <span className="glow-amber">Education & Recognition</span>
            </h2>
            
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 mb-6 hover:border-amber-500/50 transition-colors">
              <h4 className="text-amber-400 font-mono mb-2">/edu/MAKAUT</h4>
              <p className="text-slate-300">Bachelor of Computer Applications (BCA)</p>
            </div>
            
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-amber-500/50 transition-colors">
              <h4 className="text-amber-400 font-mono mb-2">/awards/PwC</h4>
              <ul className="space-y-2 text-slate-300 list-disc list-inside">
                <li>Bright Beginner - LoS Award</li>
                <li>Territory Spot Award</li>
              </ul>
            </div>
          </div>
          
        </div>
      </section>

      {/* Contact Hub */}
      <section className="relative z-10 px-6 sm:px-12 md:px-24 py-20 border-t border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 flex items-center justify-center text-slate-100">
            <User className="w-8 h-8 mr-4 text-emerald-500" /> 
            <span className="glow-emerald">Initiate_Handshake</span>
          </h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto">
            My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <CopyButton text="d19sen@yahoo.com" value="d19sen@yahoo.com" />
            <CopyButton text="+91 89816 02712" value="+91 89816 02712" />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://linkedin.com/in/d19sen" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-full transition-colors glow-cyan"
            >
              <ExternalLink className="w-5 h-5 mr-2" /> LinkedIn Profile
            </a>
            
            <a 
              href="./Resume-GitHub.pdf" 
              download="Resume-GitHub.pdf"
              className="flex items-center px-8 py-3 bg-transparent border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-bold rounded-full transition-colors"
            >
              <Download className="w-5 h-5 mr-2" /> Resume.pdf
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-6 text-center text-slate-500 font-mono text-sm border-t border-slate-800 bg-slate-950">
        <p>Built by Debarshi Sen © 2026</p>
        <p className="mt-1 text-xs opacity-50">System online. All protocols operational.</p>
      </footer>
    </div>
  );
}

export default App;
