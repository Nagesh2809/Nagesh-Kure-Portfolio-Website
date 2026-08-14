import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-slate-50 dark:bg-slate-900 text-center relative z-10 transition-colors duration-300">
      <div className="flex justify-center gap-8 mb-4">
        <a
          href="https://github.com/Nagesh2809"
          target="_blank"
          rel="noreferrer"
          className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors transform hover:-translate-y-1 duration-300"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/nageshkure/"
          target="_blank"
          rel="noreferrer"
          className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors transform hover:-translate-y-1 duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="mailto:nagesh.kure20@gmail.com"
          className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors transform hover:-translate-y-1 duration-300"
          aria-label="Email"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>
      <p className="text-slate-500 text-sm font-mono hover:text-primary-600 dark:hover:text-primary-500 transition-colors cursor-default">
        Designed & Built by Nagesh Kure
      </p>
    </footer>
  );
};