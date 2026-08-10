import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const fullText = "I build intelligent AI systems.";

  useEffect(() => {
    // Show content after a brief delay
    const showTimer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showContent) return;

    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [showContent]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 dark:bg-primary-900/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-start justify-center">
        <span
          className={`text-primary-600 dark:text-primary-400 font-mono tracking-wide mb-6 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '200ms' }}
        >
          Hi, my name is
        </span>
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '300ms' }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-slate-100 dark:via-slate-200 dark:to-slate-400">
            Nagesh Kure
          </span>
        </h1>
        <h2
          className={`text-4xl md:text-6xl lg:text-7xl font-bold text-slate-500 dark:text-slate-400 mb-8 tracking-tight min-h-[1.2em] transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '400ms' }}
        >
          {text}<span className="animate-pulse text-primary-600 dark:text-primary-500">|</span>
        </h2>

        <p
          className={`max-w-2xl text-lg text-slate-600 dark:text-slate-400 mb-12 leading-relaxed transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '600ms' }}
        >
          I design and deploy <span className="text-slate-900 dark:text-slate-200">end-to-end scalable intelligent systems</span>.
          Specializing in <span className="text-primary-600 dark:text-primary-400">Generative AI</span> (RAG, Multi-Agent Systems) and <span className="text-primary-600 dark:text-primary-400">Computer Vision</span> (YOLO).
          I optimize large models via <span className="text-slate-900 dark:text-slate-200">LLM Fine-Tuning</span> and build production-grade backends using <span className="text-slate-900 dark:text-slate-200">FastAPI</span>, <span className="text-slate-900 dark:text-slate-200">Flask</span>, and <span className="text-slate-900 dark:text-slate-200">Docker</span>.
        </p>

        <div
          className={`flex gap-4 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '800ms' }}
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-primary-600 text-white rounded font-medium shadow-lg shadow-primary-500/25 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/30"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative">Check out my work</span>
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded hover:border-primary-600 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 font-medium hover:-translate-y-1"
          >
            Contact Me
          </a>
        </div>
      </div>

      <div
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400 dark:text-slate-500 z-10 transition-all duration-700 ${showContent ? 'opacity-100' : 'opacity-0'
          }`}
        style={{ transitionDelay: '1000ms' }}
      >
        <a href="#about" aria-label="Scroll down">
          <ArrowDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};