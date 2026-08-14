import React, { useRef, useState } from 'react';
import { Project } from '../types';
import { Github, ExternalLink, Folder } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

const projects: Project[] = [
  {
    id: 1,
    title: "Support Chatbot (RAG)",
    description: "Designed and deployed an enterprise-grade RAG-based chatbot using FAISS and Gemini LLM. Supports document ingestion (PDFs, CSVs) with adaptive top-k retrieval and hybrid search. Handles 1K+ daily interactions.",
    tags: ["Python", "Gemini API", "FAISS", "RAG", "Flask"],
    imageUrl: "",
    repoUrl: "https://github.com/Nagesh2809",
    demoUrl: ""
  },
  {
    id: 2,
    title: "Automatic Number Plate Recognition (ANPR) System ",
    description: "Developed a real-time ANPR system using YOLOv8 and OCR, achieving 92% recognition accuracy with image preprocessing for reliable number extraction. Integrated MySQL/Excel storage with duplicate prevention and built a FastAPI interface for vehicle data management and visualization across parking, toll, and law-enforcement use cases.",
    tags: [
    "Python",
    "YOLOv8",
    "PaddleOcr",
    "OpenCV",
    "MySQL",
    "FastAPI"
  ],
    imageUrl: "",
    repoUrl: "https://github.com/Nagesh2809",
    demoUrl: ""
  },
  {
    id: 3,
    title: "Sentiment Analysis",
    description: "Fine-tuned BERT using LoRA on IMDb dataset to classify sentiment polarity, achieving 92% F1-score. Reduced model parameters by 70% while maintaining 90% accuracy. Integrated with Streamlit for monitoring.",
    tags: ["BERT", "LoRA", "PyTorch", "MLflow", "Streamlit"],
    imageUrl: "",
    repoUrl: "https://github.com/Nagesh2809",
    demoUrl: ""
  }
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <h2 className="flex items-center text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-12">
            <span className="text-primary-600 dark:text-primary-500 font-mono mr-2">03.</span> Notable Projects
            <span className="hidden md:block ml-4 h-px bg-slate-200 dark:bg-slate-800 flex-grow max-w-xs"></span>
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <RevealOnScroll key={project.id} delay={index * 100} className="h-full">
              <ProjectCard project={project} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden h-full border border-slate-200 dark:border-slate-700/50 transition-all duration-300 hover:-translate-y-2 shadow-sm dark:shadow-none"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className="relative p-8 flex flex-col h-full z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="p-3 bg-slate-100 dark:bg-slate-900/50 rounded-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors border border-slate-200 dark:border-slate-700/50 group-hover:border-primary-500/30">
            <Folder className="w-8 h-8 text-primary-600 dark:text-primary-500" />
          </div>
          <div className="flex gap-4 text-slate-400">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:scale-110 transform duration-200 z-20"
                aria-label="View Source Code"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:scale-110 transform duration-200 z-20"
                aria-label="View Live Demo"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <li key={tag} className="text-xs font-mono text-slate-500 mr-2 bg-slate-100 dark:bg-slate-900/30 px-2 py-1 rounded">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};