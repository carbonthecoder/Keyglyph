import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export function AboutPage({ isOpen, onClose, isDark = true }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 260);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const faqs = [
    {
      q: 'What is Keyglyph and how does it generate signatures?',
      a: 'Keyglyph is a generative vector typography tool that transforms your typed name into geometric digital signatures. As you type, the application maps the precise spatial center coordinates of each key across your chosen keyboard layout (QWERTY, Dvorak, Colemak, AZERTY, or QWERTZ). It then computes continuous mathematical spline paths connecting each letter in chronological order.',
    },
    {
      q: 'Which curve algorithms are supported?',
      a: 'Keyglyph features five distinct mathematical interpolation models: Linear (sharp polygonal path), Simple Curve (rounded corner fillets), Quadratic Bezier (smooth midpoint anchor curves), Cubic Bezier (high-tension fluid curves), and Centripetal Catmull-Rom Splines (smooth parametric curves passing directly through all key centers without loop overshoot).',
    },
    {
      q: 'Can I use the exported signatures commercially?',
      a: 'Yes. All vector signatures generated and exported from Keyglyph (both SVG and PNG formats) are 100% royalty-free and owned by you. You may freely use them for personal branding, email signatures, logo marks, social media avatars, and commercial graphic design projects.',
    },
    {
      q: 'Is my typing data private and secure?',
      a: 'Keyglyph operates 100% client-side directly within your web browser. Keystrokes, names, and vector calculations are executed in local memory using the HTML5 Canvas and SVG APIs. No names, keystrokes, or personal data are ever uploaded, recorded, or stored on external servers.',
    },
  ];

  return (
    <main
      className={`fixed inset-0 z-50 overflow-y-auto font-mono selection:bg-neutral-800 selection:text-white ${
        isDark ? 'bg-black text-neutral-200' : 'bg-white text-neutral-900'
      } ${isClosing ? 'animate-ios-page-exit' : 'animate-ios-page-enter'}`}
    >
      {/* Subpage Nav */}
      <nav
        className={`sticky top-0 z-50 w-full px-4 sm:px-8 py-3.5 border-b flex items-center justify-between backdrop-blur-md ${
          isDark ? 'bg-black/80 border-neutral-800/60' : 'bg-white/80 border-neutral-200'
        }`}
      >
        <button
          onClick={handleClose}
          className="font-mono text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← back to canvas</span>
        </button>

        <button
          onClick={handleClose}
          aria-label="Close"
          className="text-neutral-500 hover:text-neutral-300 text-xs font-mono transition-colors cursor-pointer"
        >
          [esc]
        </button>
      </nav>

      {/* Main Container */}
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-24">
        {/* Top Header */}
        <div className="text-center mb-12 sm:mb-14">
          <p className="font-mono text-xs text-neutral-500 mb-2 tracking-widest uppercase">~/keyglyph/about</p>
          <h1 className="font-sans text-3xl sm:text-4xl font-black tracking-tight uppercase text-neutral-900 dark:text-neutral-100">
            About Keyglyph
          </h1>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-2 max-w-md mx-auto">
            Generative Keystroke Geometry & Mathematical Vector Typography
          </p>
        </div>

        {/* Section 1: # what is keyglyph */}
        <section className="mb-12">
          <h2 className="font-mono text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-1.5">
            <span className="text-neutral-500 font-normal">#</span> what is keyglyph
          </h2>
          <p className="font-mono text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
            Keyglyph turns the biomechanics of physical typing into kinetic vector art. Every word you type represents a spatial journey across the keyboard grid, producing a continuous mathematical polygon that reflects your name’s linguistic cadence.
          </p>
        </section>

        {/* Section 2: Core Architecture Pillars */}
        <section className="mb-12">
          <h2 className="font-mono text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-1.5">
            <span className="text-neutral-500 font-normal">#</span> core architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60">
              <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 block mb-1">01 / MAP</span>
              <h3 className="font-bold text-xs text-neutral-900 dark:text-neutral-200 mb-1">Topology</h3>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Registers exact 2D key coordinates on QWERTY, Dvorak, Colemak, AZERTY, and QWERTZ layouts.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60">
              <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 block mb-1">02 / SPLINE</span>
              <h3 className="font-bold text-xs text-neutral-900 dark:text-neutral-200 mb-1">Geometry</h3>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Interpolates keystrokes through Catmull-Rom splines and cubic Bezier paths with real-time tension modulation.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60">
              <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 block mb-1">03 / EXPORT</span>
              <h3 className="font-bold text-xs text-neutral-900 dark:text-neutral-200 mb-1">Vector Engine</h3>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Generates standalone scalable SVG files, high-DPI 2x retina PNG graphics, and animated recording videos.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: # how to use */}
        <section className="mb-12">
          <h2 className="font-mono text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-1.5">
            <span className="text-neutral-500 font-normal">#</span> how to use
          </h2>
          <div className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/40">
            <ol className="space-y-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">
              <li className="flex gap-2.5">
                <span className="font-bold text-neutral-900 dark:text-neutral-100">1.</span>
                <span>Type your name or handle directly into the center prompt or tap the tactile on-screen keys.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="font-bold text-neutral-900 dark:text-neutral-100">2.</span>
                <span>Open the bottom-right Options drawer to switch layouts, change stroke width, adjust tension, or select curve algorithms.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="font-bold text-neutral-900 dark:text-neutral-100">3.</span>
                <span>Use the action buttons to replay the pen stroke, copy the SVG to your clipboard, or export high-resolution vector assets.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Section 4: # frequently asked questions */}
        <section className="mb-14">
          <h2 className="font-mono text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-1.5">
            <span className="text-neutral-500 font-normal">#</span> frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60"
              >
                <h4 className="font-bold text-xs text-neutral-900 dark:text-neutral-200 mb-1.5">
                  {faq.q}
                </h4>
                <p className="font-mono text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: # credits */}
        <section className="pt-6 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row items-baseline justify-between gap-3 text-xs text-neutral-500 font-mono">
          <div>
            crafted by{' '}
            <a
              href="https://ibrahim.is-cool.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 dark:text-neutral-200 underline underline-offset-4 hover:text-neutral-400 transition-colors font-bold"
            >
              carbon
            </a>{' '}
            <span className="text-neutral-400 dark:text-neutral-600">(@carbonthecoder)</span>
          </div>
          <div>
            <a
              href="https://github.com/carbonthecoder/Keyglyph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
            >
              github repository ↗
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
