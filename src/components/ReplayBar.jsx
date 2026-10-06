import React from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';

export function ReplayBar({
  isPlaying,
  onTogglePlay,
  onRestart,
  speed = 1,
  onChangeSpeed,
  isDark = true,
}) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-md shadow-lg transition-all ${
        isDark
          ? 'bg-[#121319]/90 border-neutral-800 text-neutral-300'
          : 'bg-white/90 border-neutral-200 text-neutral-700'
      }`}
    >
      <button
        onClick={onTogglePlay}
        title={isPlaying ? 'Pause' : 'Replay Stroke'}
        className={`p-1.5 rounded-lg transition-colors ${
          isDark ? 'hover:bg-neutral-800 text-white' : 'hover:bg-neutral-100 text-black'
        }`}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
      </button>

      <button
        onClick={onRestart}
        title="Restart"
        className={`p-1.5 rounded-lg transition-colors ${
          isDark ? 'hover:bg-neutral-800 text-neutral-400 hover:text-white' : 'hover:bg-neutral-100 text-neutral-500 hover:text-black'
        }`}
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      <div className="h-3 w-px bg-neutral-700/60 mx-1" />

      {/* Speed Selector */}
      {[0.5, 1, 2].map((s) => (
        <button
          key={s}
          onClick={() => onChangeSpeed(s)}
          className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium transition-colors ${
            speed === s
              ? isDark
                ? 'bg-neutral-700 text-white'
                : 'bg-neutral-300 text-black'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          {s}x
        </button>
      ))}
    </div>
  );
}
