import React from 'react';

export function ContentSection({ isDark = true }) {
  const faqs = [
    {
      q: 'What is Keyglyph and how does it generate signatures?',
      a: 'Keyglyph is a generative vector signature tool that transforms your typed name into geometric digital signatures. As you type, the application maps the precise spatial center coordinates of each key across your chosen keyboard layout (QWERTY, Dvorak, Colemak, AZERTY, or QWERTZ). It then computes continuous mathematical spline paths connecting each letter in chronological order.',
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
    <section className="w-full max-w-4xl mx-auto px-6 py-16 font-mono text-xs border-t border-neutral-300 dark:border-neutral-800/80 transition-colors">
      {/* Header */}
      <div className="mb-12">
        <span className="text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold block mb-2">
          Architecture & Documentation
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-syne mb-3">
          Generative Keystroke Geometry
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
          Keyglyph turns the biomechanics of physical typing into kinetic vector art. Every word typed represents a spatial journey across the keyboard grid, producing a unique mathematical polygon that reflects your name’s linguistic rhythm.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-5 rounded-xl border border-neutral-300 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-950/50">
          <div className="w-7 h-7 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-neutral-900 dark:text-white mb-3">
            01
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1.5 text-sm">
            Coordinate Mapping
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed font-sans">
            Key coordinates are dynamically tracked via DOM bounding rects. When switching between QWERTY, Dvorak, Colemak, or AZERTY, the signature morphs in real-time according to the physical layout geometry.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-300 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-950/50">
          <div className="w-7 h-7 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-neutral-900 dark:text-white mb-3">
            02
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1.5 text-sm">
            Spline Interpolation
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed font-sans">
            Vector paths are synthesized using configurable tension-controlled Catmull-Rom splines and cubic Bezier transitions, eliminating jagged discontinuities while preserving the shape of your typing path.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-300 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-950/50">
          <div className="w-7 h-7 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-neutral-900 dark:text-white mb-3">
            03
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1.5 text-sm">
            Clean Scalable Output
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed font-sans">
            Export directly as production-ready standalone SVG files with explicit viewBox and namespace definitions, high-DPI 2x rasterized PNG images, or animated drawing recordings.
          </p>
        </div>
      </div>

      {/* How to Guide */}
      <div className="mb-16 p-6 rounded-xl border border-neutral-300 dark:border-neutral-800/80 bg-neutral-100/40 dark:bg-neutral-950/40">
        <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-4">
          How to Generate and Customize Your Signature
        </h3>
        <ol className="space-y-3 text-neutral-600 dark:text-neutral-400 font-sans text-xs">
          <li className="flex gap-3">
            <span className="font-mono font-bold text-neutral-900 dark:text-neutral-200">1.</span>
            <span><strong>Enter your name:</strong> Type directly in the center field or click the on-screen mechanical keycaps. The vector path renders instantaneously across the keys.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono font-bold text-neutral-900 dark:text-neutral-200">2.</span>
            <span><strong>Open Options:</strong> Click the Options button in the bottom drawer to adjust layout geometry (QWERTY, Colemak, Dvorak), stroke width, line tension, and curve interpolation algorithms.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono font-bold text-neutral-900 dark:text-neutral-200">3.</span>
            <span><strong>Export or Share:</strong> Use the one-click copy buttons or export scalable SVGs and PNGs for use in design workflows, GitHub profiles, and personal websites.</span>
          </li>
        </ol>
      </div>

      {/* FAQ Section */}
      <div>
        <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-6">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-950/60"
            >
              <h4 className="font-bold text-neutral-900 dark:text-neutral-200 mb-1.5 text-xs">
                {faq.q}
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 font-sans text-xs leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
