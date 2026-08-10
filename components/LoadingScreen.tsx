import React, { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [startTime] = useState(Date.now());

  const MIN_DISPLAY_TIME = 3000;

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = prev < 70 ? 3 : prev < 90 ? 5 : 8;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsedTime);

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }, remainingTime + 300);
    }
  }, [progress, onComplete, startTime]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
    >
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950"></div>

      {/* Floating glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute top-1/2 right-1/3 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl animate-float-slower"></div>

      {/* Animated scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-400/5 to-transparent animate-scan pointer-events-none"></div>

      {/* Floating sparkle particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/60 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Animated logo/symbol */}
      <div className="relative mb-16 scale-110">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 w-48 h-48 md:w-64 md:h-64 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="2"
              strokeDasharray="10 5"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Middle ring - counter rotation */}
        <div className="absolute inset-0 w-40 h-40 md:w-52 md:h-52 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <svg className="w-full h-full animate-spin-reverse" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="1.5"
              strokeDasharray="5 10"
              opacity="0.5"
            />
            <defs>
              <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Center symbol - AS initials */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
          <div className="text-7xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-shift">
            NK
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl animate-pulse"></div>
        </div>

        {/* Pulsing circle behind */}
        <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-indigo-500/10 rounded-full animate-ping"></div>
      </div>

      {/* Name with creative letter animations */}
      <div className="mb-12 relative">
        {/* Decorative dots around name */}
        <div className="absolute -left-8 -top-8 flex gap-2">
          <div className="w-2 h-2 bg-indigo-400/40 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <div className="absolute -right-8 -bottom-8 flex gap-2">
          <div className="w-2 h-2 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          <div className="w-2 h-2 bg-indigo-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
        </div>

        {/* First Name - NAGESH */}
        <h1 className="text-5xl md:text-6xl font-bold mb-2 tracking-tight overflow-hidden">
          {['N', 'A', 'G', 'E', 'S', 'H'].map((letter, i) => (
            <span
              key={i}
              className="inline-block animate-wave-in"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationFillMode: 'both',
                background: `linear-gradient(135deg, hsl(${240 + i * 20}, 70%, ${60 + i * 5}%), hsl(${260 + i * 20}, 70%, ${70 + i * 3}%))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))'
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Last Name - KURE */}
        <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight overflow-hidden">
          {['K', 'u', 'r', 'e'].map((letter, i) => (
            <span
              key={i}
              className="inline-block animate-wave-in"
              style={{
                animationDelay: `${(i + 6) * 0.1}s`,
                animationFillMode: 'both',
                background: `linear-gradient(135deg, hsl(${260 + i * 15}, 65%, ${65 + i * 4}%), hsl(${280 + i * 15}, 65%, ${75 + i * 2}%))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 15px rgba(99, 102, 241, 0.4))'
              }}
            >
              {letter}
            </span>
          ))}
        </h2>

        {/* Subtitle with fade in */}
        <p
          className="text-indigo-400 text-sm md:text-base font-medium tracking-wider animate-fade-in-up"
          style={{ animationDelay: '1.2s', animationFillMode: 'both' }}
        >
          AI/ML ENGINEER
        </p>
      </div>

      {/* Enhanced progress bar */}
      <div className="w-80 md:w-96 max-w-[90vw]">
        <div className="relative h-1.5 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
          {/* Background pulse */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 animate-pulse"></div>

          <div
            className="relative h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>

            {/* Progress glow */}
            <div className="absolute -inset-y-1 -right-2 w-4 bg-gradient-to-r from-transparent to-indigo-400 blur-sm"></div>
          </div>
        </div>

        {/* Progress percentage */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-slate-500 text-xs font-mono">LOADING</span>
          <span className="text-indigo-400 text-sm font-mono font-bold tabular-nums">{progress}%</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes wave-in {
          0% {
            opacity: 0;
            transform: translateY(30px) rotateX(-90deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, 40px); }
        }

        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -50px); }
        }

        @keyframes scan {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-wave-in {
          animation: wave-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 12s ease-in-out infinite;
        }

        .animate-scan {
          animation: scan 4s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};