import React from 'react';
import { Sun, Moon, Volume2, VolumeX, Star, HelpCircle, Sparkles } from 'lucide-react';

export function Header({
  isDark,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onOpenAbout,
}) {
  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-6 py-4 select-none z-30 font-mono">
      {/* Left: Keyglyph Brand in Syne font with hover info card */}
      <div className="relative group">
        <button
          onClick={onOpenAbout}
          className="font-syne font-extrabold tracking-tight text-base sm:text-lg text-neutral-900 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-200 select-none cursor-pointer flex items-center gap-1.5"
        >
          <span>keyglyph</span>
        </button>

        {/* Hover Mini Info Box */}
        <div className="absolute left-0 top-full mt-2 w-68 p-3.5 rounded-xl bg-neutral-950/95 border border-neutral-800/80 backdrop-blur-md shadow-2xl z-50 text-left opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-syne font-extrabold text-xs text-white tracking-wide">
              what is keyglyph?
            </span>
          </div>
          <p className="text-[11px] font-mono text-neutral-400 leading-relaxed mb-2.5">
            Generative keystroke calligraphy. Connects the spatial coordinates of your keystrokes into vector signatures.
          </p>
          <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-400 hover:text-cyan-300">
            <span>Click to explore full guide & usage</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Right: Controls in Space Mono with grey hover effects */}
      <div className="flex items-center gap-2 font-mono">
        {/* Top Right "What is Keyglyph?" Info Button with Hover Card */}
        <div className="relative group">
          <button
            onClick={onOpenAbout}
            aria-label="What is Keyglyph?"
            className="h-8 px-2.5 sm:px-3 rounded-lg border transition-all text-xs font-mono font-bold flex items-center gap-1.5 border-neutral-300 bg-neutral-100 text-neutral-900 hover:text-neutral-500 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black dark:text-neutral-200 dark:hover:text-neutral-400 dark:hover:bg-neutral-900 shadow-sm cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="hidden sm:inline">what is keyglyph?</span>
            <span className="sm:hidden">about</span>
          </button>

          {/* Hover Mini Info Box */}
          <div className="absolute right-0 top-full mt-2 w-68 p-3.5 rounded-xl bg-neutral-950/95 border border-neutral-800/80 backdrop-blur-md shadow-2xl z-50 text-left opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-syne font-extrabold text-xs text-white tracking-wide">
                what is keyglyph?
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-400 leading-relaxed mb-2.5">
              Generative keystroke calligraphy. Connects the spatial coordinates of your keystrokes into vector signatures.
            </p>
            <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-400 hover:text-cyan-300">
              <span>Click to explore full guide & usage</span>
              <span>→</span>
            </div>
          </div>
        </div>

        {/* Star on GitHub */}
        <a
          href="https://github.com/carbonthecoder/Keyglyph"
          target="_blank"
          rel="noopener noreferrer"
          className="h-8 px-2.5 sm:px-3 rounded-lg border transition-all text-xs font-mono font-bold flex items-center gap-1.5 border-neutral-300 bg-neutral-100 text-neutral-900 hover:text-neutral-500 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black dark:text-neutral-200 dark:hover:text-neutral-400 dark:hover:bg-neutral-900 shadow-sm"
        >
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
          <span className="hidden xs:inline sm:inline">Star on GitHub</span>
          <span className="xs:hidden sm:hidden">Star</span>
        </a>

        {/* Sound FX Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute keyboard audio' : 'Enable keyboard audio'}
          className="h-8 w-8 rounded-lg flex items-center justify-center border transition-colors border-neutral-300 bg-neutral-100 text-neutral-800 hover:text-neutral-500 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black dark:text-neutral-300 dark:hover:text-neutral-400 dark:hover:bg-neutral-900 shadow-sm cursor-pointer"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-current" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-current opacity-60" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="h-8 w-8 rounded-lg flex items-center justify-center border transition-colors border-neutral-300 bg-neutral-100 text-neutral-800 hover:text-neutral-500 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black dark:text-neutral-300 dark:hover:text-neutral-400 dark:hover:bg-neutral-900 shadow-sm cursor-pointer"
        >
          {isDark ? (
            <Sun className="w-3.5 h-3.5 text-current" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-current" />
          )}
        </button>
      </div>
    </header>
  );
}
