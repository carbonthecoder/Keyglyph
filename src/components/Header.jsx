import React, { useState, useRef } from 'react';
import { Sun, Moon, Volume2, VolumeX, Star, ArrowRight } from 'lucide-react';

function SlideToEnter({ onComplete }) {
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  const updateProgress = (clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const handleWidth = 28;
    const maxDrag = rect.width - handleWidth - 8;
    const currentX = clientX - rect.left - 4;
    const progress = Math.max(0, Math.min(1, currentX / maxDrag));
    setDragProgress(progress);
    if (progress >= 0.85) {
      setIsDragging(false);
      setDragProgress(0);
      onComplete?.();
    }
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updateProgress(e.clientX);
  };

  const handlePointerUp = () => {
    if (dragProgress >= 0.75) {
      onComplete?.();
    }
    setIsDragging(false);
    setDragProgress(0);
  };

  return (
    <div
      ref={trackRef}
      onClick={(e) => {
        e.stopPropagation();
        onComplete?.();
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full h-8 bg-neutral-900 border border-neutral-800 rounded-md overflow-hidden flex items-center px-1 cursor-pointer select-none group"
    >
      {/* Background slide fill */}
      <div
        className="absolute left-0 top-0 bottom-0 bg-neutral-800 transition-all pointer-events-none"
        style={{ width: `${Math.max(12, dragProgress * 100)}%` }}
      />

      {/* Label */}
      <span className="w-full text-center text-[10px] font-mono text-neutral-400 group-hover:text-neutral-200 transition-colors pointer-events-none z-10 pl-5">
        slide to enter about →
      </span>

      {/* Slider Knob */}
      <div
        onPointerDown={handlePointerDown}
        style={{
          transform: `translateX(${dragProgress * 180}px)`,
          transition: isDragging ? 'none' : 'transform 0.18s ease-out',
        }}
        className="absolute left-1 w-6 h-6 rounded bg-neutral-200 text-black flex items-center justify-center text-xs font-bold shadow-sm cursor-grab active:cursor-grabbing z-20 hover:bg-white active:scale-95"
      >
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}

export function Header({
  isDark,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onOpenAbout,
}) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsCardOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsCardOpen(false);
    }, 140);
  };

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-6 py-4 select-none z-30 font-mono">
      {/* Left: Keyglyph Brand with clean hover card & slide-to-enter */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={onOpenAbout}
          className="font-syne font-extrabold tracking-tight text-base sm:text-lg text-neutral-900 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-200 select-none cursor-pointer flex items-center gap-1.5"
        >
          <span>keyglyph</span>
        </button>

        {/* Minimal Hover Card with Slide to Enter */}
        {isCardOpen && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute left-0 top-full pt-2 z-50 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="w-72 p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 shadow-2xl text-left font-mono">
              <p className="text-xs font-bold text-neutral-200 mb-1.5">~/what-is-keyglyph</p>
              <p className="text-[11px] text-neutral-400 leading-relaxed mb-3">
                enter your name to generate a kinetic vector signature connecting keystroke coordinates across physical keyboard layouts.
              </p>
              <SlideToEnter onComplete={onOpenAbout} />
            </div>
          </div>
        )}
      </div>

      {/* Right: Controls in Space Mono with grey hover effects */}
      <div className="flex items-center gap-2 font-mono">
        {/* Top Right: Minimal "about" Link Button */}
        <button
          onClick={onOpenAbout}
          title="About Keyglyph"
          className="h-8 px-2.5 sm:px-3 rounded-lg border transition-all text-xs font-mono font-bold flex items-center border-neutral-300 bg-neutral-100 text-neutral-900 hover:text-neutral-500 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-900 shadow-sm cursor-pointer"
        >
          about
        </button>

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
