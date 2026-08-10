import React, { useState } from 'react';
import { Experience as ExperienceType } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

const experiences: ExperienceType[] = [
  {
    id: 1,
    company: "Plutos.One",
    role: "AI/ML Developer",
    period: "Sep 2025 - Present",
    description: [
      "Built a production-grade Conversational AI Platform integrating LangChain, LangGraph, and Rasa for agentic workflow automation, handling 10K+ daily queries with 95% uptime.",
      "Developed RAG-based retrieval systems using FAISS/ChromaDB vector stores for context-aware responses, improving query resolution accuracy by 25%.",
      "Integrated FastAPI and Django REST Framework with asynchronous orchestration using Celery and Redis, reducing processing time by 35%.",
      "Deployed containerized services with Docker, enhancing scalability and streamlining CI/CD pipelines for 50% faster deployments."
    ],
    technologies: ["LangChain", "Rasa", "FastAPI", "Django", "Redis", "Docker", "PostgreSQL", "FAISS"]
  },
  {
    id: 2,
    company: "DigiMonk Tech",
    role: "Software Developer Intern",
    period: "Jan 2024 - July 2024",
    description: [
      "Developed an AI-driven Sales Dialer Agent integrating Vapi.ai and Twilio APIs for automated calling and lead engagement, boosting lead conversion rates by 25%.",
      "Built REST APIs for managing call logs, transcripts, and analytics, reducing manual workflows by 40% and enabling real-time dashboards for sales teams."
    ],
    technologies: ["Vapi.ai", "Django", "Twilio", "PostgreSQL", "LangChain", "Docker"]
  },
  {
    id: 3,
    company: "Superchat LLC",
    role: "AI/ML Intern",
    period: "June 2025 - Sep 2025",
    description: [
      "Engineered a workflow simulation platform similar to n8n using FastAPI and LangChain, enabling visual node-based process orchestration.",
      "Developed a Kidney Stone Detection system using YOLO (Computer Vision) to analyze medical imaging with high precision.",
      "Integrated PostgreSQL and VectorDB to handle complex state management and semantic search capabilities for the automation engine."
    ],
    technologies: ["FastAPI", "PostgreSQL", "VectorDB", "LangChain", "YOLO", "Computer Vision"]
  }
];

export const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-32 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <h2 className="flex items-center text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-12">
            <span className="text-primary-600 dark:text-primary-500 font-mono mr-2">02.</span> Work Experience
            <span className="hidden md:block ml-4 h-px bg-slate-200 dark:bg-slate-800 flex-grow max-w-xs"></span>
          </h2>
        </RevealOnScroll>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tab List */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-slate-200 dark:border-slate-700 min-w-[150px]">
            {experiences.map((exp, index) => (
              <RevealOnScroll key={exp.id} delay={index * 100}>
                <button
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left px-4 py-3 text-sm font-mono whitespace-nowrap transition-all duration-300 border-b-2 md:border-b-0 md:border-l-2 -mb-[2px] md:-mb-0 md:-ml-[2px] hover:bg-slate-100 dark:hover:bg-slate-800/30 ${activeTab === index
                      ? 'text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-500 bg-slate-100 dark:bg-slate-800/50'
                      : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                >
                  {exp.company}
                </button>
              </RevealOnScroll>
            ))}
          </div>

          {/* Panel Content */}
          <div className="flex-1 min-h-[350px]">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`transition-all duration-500 ${activeTab === index ? 'block opacity-100 translate-x-0' : 'hidden opacity-0 translate-x-8'}`}
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {exp.role} <span className="text-primary-600 dark:text-primary-500">@ {exp.company}</span>
                </h3>
                <p className="text-sm font-mono text-slate-500 mb-6">{exp.period}</p>
                <ul className="space-y-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                      <span className="text-primary-600 dark:text-primary-500 mt-1.5 text-xs">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-2">
                  {exp.technologies.map(tech => (
                    <span key={tech} className="text-xs font-mono text-primary-600/80 dark:text-primary-400/80 bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/10 hover:border-primary-500/30 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};