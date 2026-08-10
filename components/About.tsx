import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { Code2, Database, Brain, Terminal, Server, Layers } from 'lucide-react';

// Helper icons (simulated since we can't import everything easily)
const MessageSquareIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
);
const ContainerIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /><line x1="3.27" y1="6.96" x2="12" y2="2.08" /><line x1="20.73" y1="6.96" x2="12" y2="2.08" /></svg>
);

const skills = [
  { name: 'Python (Expert)', icon: <Code2 className="w-4 h-4" /> },
  { name: 'LangChain / LangGraph', icon: <Brain className="w-4 h-4" /> },
  { name: 'LLM Fine-tuning (BERT,TinyLlama)', icon: <Brain className="w-4 h-4" /> },
  { name: 'Ollama / Local LLMs (gpt-oss,gemma,phi,llama,qwen)', icon: <Terminal className="w-4 h-4" /> },
  { name: 'RAG / Vector DBs', icon: <Database className="w-4 h-4" /> },
  { name: 'Human Feedback-Driven Conversational AI', icon: <MessageSquareIcon className="w-4 h-4" /> },
  { name: 'FastAPI / Flask / Streamlit / MCP', icon: <Server className="w-4 h-4" /> },
  { name: 'Computer Vision (YOLO)', icon: <Layers className="w-4 h-4" /> },
  { name: 'Data Extraction / OCR(Paddleocr, Tesseract, Easyocr)', icon: <Layers className="w-4 h-4" /> },
  { name: 'Docker / Kubernetes', icon: <ContainerIcon className="w-4 h-4" /> },
  { name: 'PostgreSQL / SQL', icon: <Database className="w-4 h-4" /> }
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-slate-50 dark:bg-slate-900/30 relative transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <h2 className="flex items-center text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-12">
            <span className="text-primary-600 dark:text-primary-500 font-mono mr-2">01.</span> About Me
            <span className="hidden md:block ml-4 h-px bg-slate-200 dark:bg-slate-800 flex-grow max-w-xs"></span>
          </h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 text-slate-600 dark:text-slate-400 space-y-6 text-lg leading-relaxed">
            <RevealOnScroll delay={200}>
              <p>
                Hello! I'm Nagesh, an <span className="text-primary-600 dark:text-primary-400 font-medium">AI/ML Engineer</span> based in India. I have hands-on experience in designing scalable RAG-based chatbots, multi-agent conversational systems, and backend automation.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={400}>
              <p>
                My goal is to build innovative AI products that integrate advanced reasoning with real-world applications. I'm currently focused on agentic workflow automation using <span className="text-primary-600 dark:text-primary-400 font-medium">LangChain</span> and <span className="text-primary-600 dark:text-primary-400 font-medium">Rasa</span>, and optimizing retrieval systems for context-aware responses.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={600}>
              <p>
                I hold a B.Tech in Information Technology from ITM University, Gwalior.
              </p>

              <div className="mt-8">
                <p className="mb-4 font-mono text-sm text-slate-700 dark:text-slate-300">Here are a few technologies I've been working with recently:</p>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 hover:border-primary-500/30 rounded-full text-sm font-mono text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:-translate-y-1 shadow-sm dark:shadow-none"
                    >
                      <span className="text-primary-600 dark:text-primary-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">{skill.icon}</span>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <div className="md:col-span-2 relative group mx-auto md:mx-0 max-w-xs">
            <RevealOnScroll delay={400}>
              <div className="relative">
                <div className="absolute inset-0 bg-primary-600 dark:bg-primary-500 rounded-lg transform translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                <div className="relative rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 aspect-square filter grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                  <img
                    src="https://ui-avatars.com/api/?name=Nagesh+Kure&background=6366f1&color=fff&size=400&bold=true"
                    alt="Nagesh Kure"
                    className="w-full h-full object-cover mix-blend-multiply hover:mix-blend-normal transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-primary-500/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};