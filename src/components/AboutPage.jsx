import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export function AboutPage({ isOpen, onClose, isDark = true }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <main
      className={`fixed inset-0 z-50 overflow-y-auto font-mono selection:bg-neutral-800 selection:text-white transition-colors duration-150 ${
        isDark ? 'bg-black text-neutral-200' : 'bg-white text-neutral-900'
      }`}
    >
      {/* Subpage Nav */}
      <nav
        className={`sticky top-0 z-50 w-full px-4 sm:px-8 py-3.5 border-b flex items-center justify-between backdrop-blur-md ${
          isDark ? 'bg-black/80 border-neutral-800/60' : 'bg-white/80 border-neutral-200'
        }`}
      >
        <button
          onClick={onClose}
          className="font-mono text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← back to canvas</span>
        </button>

        <button
          onClick={onClose}
          aria-label="Close"
          className="text-neutral-500 hover:text-neutral-300 text-xs font-mono transition-colors cursor-pointer"
        >
          [esc]
        </button>
      </nav>

      {/* Main Container matching portfolio-v2 */}
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-20">
        {/* Top Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="font-mono text-xs text-neutral-500 mb-2 tracking-widest">~/keyglyph</p>
          <h1 className="font-sans text-3xl sm:text-4xl font-black tracking-tight uppercase text-neutral-100">
            About Keyglyph
          </h1>
        </div>

        {/* Section 1: # what is keyglyph */}
        <section className="mb-10 sm:mb-12">
          <h2 className="font-mono text-sm sm:text-base font-bold text-neutral-100 mb-3 flex items-center gap-1.5">
            <span className="text-neutral-500 font-normal">#</span> what is keyglyph
          </h2>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            keyglyph turns keystrokes into a generative visual signature. every letter you type maps to physical 2d coordinates on a keyboard, connecting sequential keystrokes into a continuous vector path.
          </p>
        </section>

        {/* Section 2: # lineage */}
        <section className="mb-10 sm:mb-12">
          <h2 className="font-mono text-sm sm:text-base font-bold text-neutral-100 mb-3 flex items-center gap-1.5">
            <span className="text-neutral-500 font-normal">#</span> lineage
          </h2>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal mb-3">
            an architectural derivation maintaining subtle aesthetic concordance with prior cartographic keystroke studies by{' '}
            <a
              href="https://signature.cnrad.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 underline underline-offset-4 hover:text-white transition-colors"
            >
              cnrad
            </a>
            .
          </p>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            extended through parametric spline tension, multi-topological keyboard projections (colemak, dvorak, azerty, workman), synthetic acoustic resonance, and lossless vector serialization.
          </p>
        </section>

        {/* Section 3: # how it works */}
        <section className="mb-10 sm:mb-12">
          <h2 className="font-mono text-sm sm:text-base font-bold text-neutral-100 mb-3 flex items-center gap-1.5">
            <span className="text-neutral-500 font-normal">#</span> how it works
          </h2>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            type your name into the center prompt. keyglyph traces the underlying centroid vectors across the switches in real time.
          </p>
        </section>

        {/* Section 4: # credits */}
        <section className="pt-6 border-t border-neutral-800/60 flex flex-col sm:flex-row items-baseline justify-between gap-3 text-xs text-neutral-500 font-mono">
          <div>
            crafted by{' '}
            <a
              href="https://ibrahim.is-cool.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 underline underline-offset-4 hover:text-white transition-colors"
            >
              carbon
            </a>{' '}
            • in tacit concordance with{' '}
            <a
              href="https://cnrad.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 underline underline-offset-4 hover:text-white transition-colors"
            >
              cnrad
            </a>
          </div>
          <div>
            <a
              href="https://github.com/carbonthecoder/Keyglyph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              github ↗
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
