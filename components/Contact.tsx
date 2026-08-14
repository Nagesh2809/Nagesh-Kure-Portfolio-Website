import React, { useEffect } from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { Mail, Github, Linkedin, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
  useEffect(() => {
    console.log("Contact component mounted");
  }, []);

  return (
    <section id="contact" className="py-32 text-center relative overflow-hidden transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <span className="block text-primary-600 dark:text-primary-400 font-mono mb-4 text-base tracking-wider">04. What's Next?</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-200 mb-6 tracking-tight">Get In Touch</h2>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
            I am currently open to new opportunities to build innovative AI products. Whether you have a question about my projects, a potential collaboration, or just want to say hi, my inbox is always open!
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <a
            href="mailto:anuragparashar111@gmail.com"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 rounded-md font-mono text-sm hover:bg-primary-50 dark:hover:bg-primary-400/10 transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            <span className="relative z-10 flex items-center gap-2">
              Say Hello
            </span>
          </a>
        </RevealOnScroll>

        {/* Social Links with enhanced styling */}
        <RevealOnScroll delay={600}>
          <div className="mt-12 flex justify-center items-center gap-4">
            {/* Email */}
            <a
              href="mailto:nagesh.kure20@gmail.com@gmail.com"
              className="group relative p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/nageshkure/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-[#0077B5] transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Nagesh2809"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>

            {/* Phone */}
            <a
              href="tel:+919665388168"
              className="group relative p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Phone"
            >
              <Phone className="w-6 h-6" />
            </a>
          </div>

          {/* Contact details text */}
          <div className="mt-6 space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <p>
              <a href="mailto:anuragparashar111@gmail.com" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                nagesh.kure20@gmail.com
              </a>
            </p>
            <p>
              <a href="tel:+919665388168" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                +91 9665388168
              </a>
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};