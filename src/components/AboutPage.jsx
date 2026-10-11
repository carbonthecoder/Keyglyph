import React, { useEffect } from 'react';
import { X, ArrowLeft, Sparkles, Sliders, Play, Copy, Download, Keyboard as KeyboardIcon, Layers, Palette, Terminal } from 'lucide-react';

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
    <div
      className={`fixed inset-0 z-50 overflow-y-auto font-mono transition-colors duration-200 ${
        isDark ? 'bg-black/95 text-neutral-200' : 'bg-neutral-50/95 text-neutral-900'
      } backdrop-blur-xl animate-in fade-in duration-200`}
    >
      {/* Top sticky navigation bar */}
      <nav
        className={`sticky top-0 z-50 w-full px-4 sm:px-8 py-4 border-b flex items-center justify-between backdrop-blur-md ${
          isDark
            ? 'bg-black/80 border-neutral-800/80 text-white'
            : 'bg-white/80 border-neutral-200 text-neutral-900'
        }`}
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-700/60 hover:border-neutral-500 text-xs font-mono font-bold transition-all hover:scale-102 cursor-pointer active:scale-98"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Canvas</span>
          <span className="hidden sm:inline opacity-50 ml-1">[Esc]</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-syne font-extrabold tracking-tight text-lg">
            keyglyph
          </span>
          <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
            Guide
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close about guide"
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </nav>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16">
        {/* Hero Section */}
        <header className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generative Keystroke Calligraphy</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
            What is Keyglyph?
          </h1>
          <p className="text-sm sm:text-base font-mono text-neutral-400 max-w-2xl leading-relaxed">
            Keyglyph transforms human typing into an elegant vector signature. Every letter you type corresponds to a coordinate on a physical keyboard, synthesizing a geometric fingerprint of your name.
          </p>
        </header>

        {/* Section 1: The Core Concept */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
              01
            </span>
            <h2 className="font-syne font-extrabold text-xl sm:text-2xl text-neutral-100">
              The Kinetic Fingerprint
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-5 rounded-xl border ${isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200'} space-y-3`}>
              <KeyboardIcon className="w-5 h-5 text-cyan-400" />
              <h3 className="font-syne font-bold text-base text-neutral-200">
                Spatial Coordinate Mapping
              </h3>
              <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                When you type, your fingers choreograph across 2D space. Keyglyph maps each character to its exact physical centroid on the keyboard layout (QWERTY, Colemak, Dvorak, AZERTY, or Workman).
              </p>
            </div>

            <div className={`p-5 rounded-xl border ${isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200'} space-y-3`}>
              <Layers className="w-5 h-5 text-purple-400" />
              <h3 className="font-syne font-bold text-base text-neutral-200">
                Vector Spline Interpolation
              </h3>
              <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                Sequential key coordinates are interpolated in order using vector calculus. We calculate tangents, curvature tension, and path tangents to draw a smooth, uninterrupted signature line.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Step-by-Step Guide */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm">
              02
            </span>
            <h2 className="font-syne font-extrabold text-xl sm:text-2xl text-neutral-100">
              How to Use Keyglyph
            </h2>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className={`p-5 rounded-xl border flex flex-col sm:flex-row gap-4 items-start ${isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200'}`}>
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-syne font-bold text-sm text-neutral-200">
                  Type Your Name or Handle
                </h3>
                <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                  Click the center input field and type any name, pseudonym, or word. As you type, the keys illuminate with sound effects and the vector signature draws itself dynamically.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`p-5 rounded-xl border flex flex-col sm:flex-row gap-4 items-start ${isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200'}`}>
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-syne font-bold text-sm text-neutral-200">
                  Hover to Reveal, Leave to Fade
                </h3>
                <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                  Keyglyph keeps the canvas distraction-free. When you are not hovering the keyboard, the physical keys automatically fade out after 2 seconds, presenting your pure vector signature. Hovering the board instantly brings them back.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`p-5 rounded-xl border flex flex-col sm:flex-row gap-4 items-start ${isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200'}`}>
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-syne font-bold text-sm text-neutral-200">
                  Dial in Aesthetics with the Options Drawer
                </h3>
                <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                  Click the <strong>Options</strong> button in the bottom right corner to customize:
                </p>
                <ul className="text-xs font-mono text-neutral-400 space-y-1.5 mt-2 list-disc list-inside">
                  <li><strong>Layout</strong>: Switch between QWERTY, Colemak, Dvorak, AZERTY, or Workman.</li>
                  <li><strong>Curve Math</strong>: Choose Linear (sharp vectors), Simple Curve, Quadratic Bezier, Cubic Bezier, or Catmull-Rom.</li>
                  <li><strong>Tension & Width</strong>: Adjust the curve tension curvature and line thickness from 1px to 8px.</li>
                  <li><strong>Style & Palette</strong>: Choose Solid, dual-color Gradient, or Neon Glow.</li>
                  <li><strong>Nodes</strong>: Toggle visible key dots along the signature path.</li>
                  <li><strong>🎲 Randomize</strong>: Instantly experiment with unexpected combinations while preserving your color palette.</li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className={`p-5 rounded-xl border flex flex-col sm:flex-row gap-4 items-start ${isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200'}`}>
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                4
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-syne font-bold text-sm text-neutral-200">
                  Replay Animation & Export
                </h3>
                <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                  Click <strong>Replay</strong> to watch your stroke draw in stroke-by-stroke order. Then click <strong>Copy SVG</strong> to paste directly into Figma or Illustrator, or export lossless <strong>SVG</strong> and high-resolution <strong>PNG</strong> files.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Pro Tips */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 font-bold text-sm">
              03
            </span>
            <h2 className="font-syne font-extrabold text-xl sm:text-2xl text-neutral-100">
              Pro Tips & Hidden Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200'} space-y-2`}>
              <Play className="w-4 h-4 text-amber-400" />
              <div className="font-bold text-neutral-200">Replay Kinetic Order</div>
              <p className="text-neutral-400">
                Keys temporarily hide during replay so your vector path can be appreciated in motion without visual clutter.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200'} space-y-2`}>
              <Copy className="w-4 h-4 text-cyan-400" />
              <div className="font-bold text-neutral-200">Direct Figma Paste</div>
              <p className="text-neutral-400">
                Hit Copy SVG, switch to Figma, and press Ctrl+V. The vector bezier handles and anchor nodes are fully editable.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200'} space-y-2`}>
              <Terminal className="w-4 h-4 text-purple-400" />
              <div className="font-bold text-neutral-200">Audio Synthesis</div>
              <p className="text-neutral-400">
                Every keypress synthesizes acoustic feedback using the Web Audio API oscillator with realistic mechanical clack.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Credits & Concordance */}
        <section className={`p-6 sm:p-8 rounded-2xl border text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-200'}`}>
          <div className="space-y-1.5">
            <div className="font-syne font-extrabold text-base text-neutral-200">
              Crafted by Carbon
            </div>
            <p className="text-xs font-mono text-neutral-400">
              Engineered with relentless vigor • in tacit concordance with{' '}
              <a
                href="https://cnrad.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                cnrad
              </a>
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all cursor-pointer shadow-lg active:scale-95 shrink-0"
          >
            Create Your Signature →
          </button>
        </section>
      </main>
    </div>
  );
}
