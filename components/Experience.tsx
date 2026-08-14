import React, { useState } from 'react';
import { Experience as ExperienceType } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

const experiences: ExperienceType[] = [
  {
    id: 1,
    company: "Avineon India Private Limited",
    role: "AI/ML Engineer",
    period: "Oct 2025 - Present",
    description: [
    "Built the backend architecture for MAPCHAT, an AI-powered geospatial platform, developing agentic conversational and document-intelligence pipelines using FastAPI, LangChain, and LangGraph.",
    "Designed multi-agent workflows with Human-in-the-Loop (HITL) and integrated Model Context Protocol (MCP) for reusable tool calling, enabling natural-language interaction with ArcGIS geospatial data.",
    "Reduced LLM token consumption by ~50% and improved response accuracy from 80% to 90% through agent orchestration, validation, and prompt optimization using GPT-OSS 120B, with Redis-based conversational memory and Langfuse observability.",
    "Developed a PDF/OCR document-intelligence pipeline using PaddleOCR (PP-OCRv5, PP-StructureV3) and YOLOv26 to extract structured geospatial and property information from scanned documents, achieving ~90% OCR extraction accuracy and ~95% object-detection accuracy."
  ],
  technologies: [
    "LangChain",
    "LangGraph",
    "MCP",
    "FastAPI",
    "GPT-OSS",
    "Redis",
    "Langfuse",
    "ArcGIS",
    "PaddleOCR",
    "YOLO",
    "RAG",
    "Computer Vision"
  ]
  },
  {
    id: 2,
    company: "CODETRU",
    role: "Tech Intern",
    period: "Apr 2025 - AUG 2025",
    description: [
    "Developed and optimized RESTful APIs for Ruto.ai using FastAPI, PostgreSQL, and SQLAlchemy ORM, improving request processing speed by 25%.",
    "Designed modular database operations using SQLAlchemy and generic classes, improving code reusability, maintainability, and scalability.",
    "Implemented Pydantic-based data validation, JWT authentication, and API pagination to improve reliability and secure application workflows.",
    "Integrated Mailivery API to automate Gmail and Outlook workflows and support email-based application processes."
  ],
  technologies: [
    "Python",
    "FastAPI",
    "PostgreSQL",
    "SQLAlchemy",
    "Pydantic",
    "JWT",
    "REST APIs",
    "Mailivery API"
  ]
  },
  {
    id: 3,
    company: "Konu",
    role: "AI/ML Intern",
    period: "Feb 2025 - Apr 2025",
    description: [
    "Built a multi-agent AI-powered real estate assistant for property search, financing, and EMI calculations, achieving ~90% response accuracy.",
    "Developed intelligent query handling and tool-based workflows for retrieving company-specific information and generating context-aware responses.",
    "Replaced legacy tool-wrapper integrations with Model Context Protocol (MCP), enabling seamless and modular tool calling with LLMs.",
    "Resolved parsing issues and replaced deprecated libraries, improving application stability by ~15%."
  ],
  technologies: [
    "Python",
    "LangChain",
    "MCP",
    "RAG",
    "LLMs",
    "FAISS",
    "AI Agents"
  ]
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