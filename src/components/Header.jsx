import { Sun, Moon, Volume2, VolumeX, Star } from 'lucide-react';

export function Header({
  isDark,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
}) {
  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-6 py-4 select-none z-30">
      {/* Left: Brand */}
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-xs sm:text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          keyglyph
        </span>
      </div>

      {/* Right Controls: Star on GitHub, Sound, Theme Toggle */}
      <div className="flex items-center gap-2">
        {/* Star on GitHub Button */}
        <a
          href="https://github.com/carbonthecoder/Keyglyph"
          target="_blank"
          rel="noopener noreferrer"
          className="h-8 px-2.5 sm:px-3 rounded-lg border transition-all text-xs font-medium flex items-center gap-1.5 border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-black hover:border-neutral-300 dark:border-neutral-800 dark:bg-black dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white dark:hover:border-neutral-700 shadow-sm"
        >
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="hidden xs:inline sm:inline">Star on GitHub</span>
          <span className="xs:hidden sm:hidden">Star</span>
        </a>

        {/* Sound FX Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute keyboard audio' : 'Enable keyboard audio'}
          className="h-8 w-8 rounded-lg flex items-center justify-center border transition-colors border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-black dark:border-neutral-800 dark:bg-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-200" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="h-8 w-8 rounded-lg flex items-center justify-center border transition-colors border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-black dark:border-neutral-800 dark:bg-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
        >
          {isDark ? (
            <Sun className="w-3.5 h-3.5 text-neutral-300" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-neutral-700" />
          )}
        </button>
      </div>
    </header>
  );
}
