import { Sun, Moon, Volume2, VolumeX, Star } from 'lucide-react';

export function Header({
  isDark,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
}) {
  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-6 py-4 select-none z-30 font-mono">
      {/* Left: Keyglyph Brand in Syne font with max weight & grey hover */}
      <div className="flex items-center gap-2">
        <span className="font-syne font-extrabold tracking-tight text-base sm:text-lg text-neutral-900 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-200 select-none cursor-pointer">
          keyglyph
        </span>
      </div>

      {/* Right: Controls in Space Mono with grey hover effects */}
      <div className="flex items-center gap-2 font-mono">
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
