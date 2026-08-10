import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { Background } from './components/Background';
import { LoadingScreen } from './components/LoadingScreen';
import { ThemeProvider } from './components/ThemeContext';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ThemeProvider>
      {!isLoaded && <LoadingScreen onComplete={() => {
        setIsLoaded(true);
        // Clear any hash in the URL (like #contact) and scroll to top
        window.history.replaceState(null, '', window.location.pathname);
        window.scrollTo(0, 0);
      }} />}

      {/* Clean base background */}
      <div className="fixed inset-0 bg-white dark:bg-slate-950 transition-colors duration-300 -z-10" />

      {/* Animated background */}
      <Background />

      <Navbar />

      <main
        className={`min-h-screen text-slate-700 dark:text-slate-300 selection:bg-primary-500/30 selection:text-primary-200 relative overflow-x-hidden transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>

      <AIChat />
    </ThemeProvider>
  );
};

export default App;