import React from 'react';
import { CURVE_TYPES } from '../utils/curves';
import { KEYBOARD_LAYOUTS } from '../utils/layouts';

export function OptionsDrawer({
  isOpen,
  onClose,
  options,
  onChange,
  onReset,
  onRandomize,
  isDark = true,
}) {
  if (!isOpen) return null;

  const colorPresets = [
    '#ffffff',
    '#000000',
    '#38bdf8',
    '#a855f7',
    '#ec4899',
    '#22c55e',
  ];

  return (
    <div
      className="flex flex-col items-start fixed sm:absolute bottom-6 sm:right-6 max-sm:-translate-x-1/2 max-sm:left-1/2 max-sm:w-[calc(100%-3rem)] sm:max-w-xs p-4 rounded-xl bg-neutral-950 border-neutral-800/50 border z-50 text-white shadow-2xl font-sans animate-ios-drawer"
    >
      {/* Close button & Title */}
      <button
        onClick={onClose}
        className="text-sm text-neutral-600 hover:text-neutral-400 absolute right-4 top-4 cursor-pointer font-medium transition-colors"
      >
        Close
      </button>
      <p className="font-semibold text-neutral-400 mb-4 text-sm">Options</p>

      {/* Grid: Exactly 5rem label column + 1fr controls */}
      <div className="grid grid-cols-[5rem_1fr] gap-y-4 items-center w-full text-sm">
        {/* Layout */}
        <label htmlFor="keyboard-layout" className="text-neutral-300 text-sm font-medium mr-8 mt-1">
          Layout
        </label>
        <select
          id="keyboard-layout"
          value={options.layout}
          onChange={(e) => onChange('layout', e.target.value)}
          className="border border-neutral-800 rounded-md px-2 py-1 bg-neutral-900 text-white text-sm outline-none cursor-pointer"
        >
          {Object.entries(KEYBOARD_LAYOUTS).map(([key, item]) => (
            <option key={key} value={key} className="text-neutral-300 bg-neutral-900">
              {item.name.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Curve */}
        <p className="text-neutral-300 text-sm font-medium mr-8 mt-1">Curve</p>
        <div className="flex flex-wrap gap-1">
          {CURVE_TYPES.map((curve) => (
            <button
              key={curve.id}
              type="button"
              onClick={() => onChange('curveType', curve.id)}
              className={`px-3 py-1 text-xs rounded-full transition-all duration-150 ease-out cursor-pointer border ${
                options.curveType === curve.id
                  ? 'bg-white text-black font-medium border-white'
                  : 'bg-neutral-900/50 text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200 border-neutral-800'
              }`}
            >
              {curve.label}
            </button>
          ))}
        </div>

        {/* Numbers Row */}
        <p className="text-neutral-300 text-sm font-medium mr-8">Numbers</p>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={options.showNumbers}
            onChange={(e) => onChange('showNumbers', e.target.checked)}
            className="sr-only"
          />
          <div
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
              options.showNumbers ? 'bg-white' : 'bg-neutral-700'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-black rounded-full transition-transform duration-200 ${
                options.showNumbers ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </label>

        {/* Style */}
        <p className="text-neutral-300 text-sm font-medium mr-8 mt-1">Style</p>
        <div className="flex flex-wrap gap-1">
          {['solid', 'gradient', 'glow'].map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => onChange('styleMode', style)}
              className={`px-3 py-1 text-xs rounded-full transition-all duration-150 ease-out cursor-pointer border capitalize ${
                options.styleMode === style
                  ? 'bg-white text-black font-medium border-white'
                  : 'bg-neutral-900/50 text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200 border-neutral-800'
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Color / Colors based on style */}
        {options.styleMode === 'gradient' ? (
          <>
            <p className="text-neutral-300 text-sm font-medium mr-8 mt-1">Colors</p>
            <div className="flex items-center gap-3">
              <label className="relative cursor-pointer flex items-center gap-1.5">
                <input
                  type="color"
                  value={options.gradientStart || '#ff6b6b'}
                  onChange={(e) => onChange('gradientStart', e.target.value)}
                  className="sr-only"
                />
                <div
                  className="w-7 h-7 rounded-md border border-neutral-800 cursor-pointer shadow-inner"
                  style={{ backgroundColor: options.gradientStart || '#ff6b6b' }}
                />
                <span className="text-neutral-400 text-xs">Start</span>
              </label>
              <label className="relative cursor-pointer flex items-center gap-1.5">
                <input
                  type="color"
                  value={options.gradientEnd || '#4ecdc4'}
                  onChange={(e) => onChange('gradientEnd', e.target.value)}
                  className="sr-only"
                />
                <div
                  className="w-7 h-7 rounded-md border border-neutral-800 cursor-pointer shadow-inner"
                  style={{ backgroundColor: options.gradientEnd || '#4ecdc4' }}
                />
                <span className="text-neutral-400 text-xs">End</span>
              </label>
            </div>
          </>
        ) : (
          <>
            <p className="text-neutral-300 text-sm font-medium mr-8 mt-1">Color</p>
            <div className="flex items-center gap-2">
              <label className="relative cursor-pointer">
                <input
                  type="color"
                  value={options.color}
                  onChange={(e) => onChange('color', e.target.value)}
                  className="sr-only"
                />
                <div
                  className="w-7 h-7 rounded-md border border-neutral-800 cursor-pointer shadow-inner hover:border-neutral-600 transition-colors"
                  style={{ backgroundColor: options.color }}
                />
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {colorPresets.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => onChange('color', c)}
                    className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                      options.color.toLowerCase() === c.toLowerCase()
                        ? 'scale-110 border-white ring-1 ring-white/50'
                        : 'border-neutral-800 opacity-80 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Width */}
        <p className="text-neutral-300 text-sm font-medium mr-8 mt-1">Width</p>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="8"
            value={options.strokeWidth}
            onChange={(e) => onChange('strokeWidth', parseInt(e.target.value, 10))}
            className="flex-1 accent-white cursor-pointer"
          />
          <span className="text-neutral-400 text-xs w-6">{options.strokeWidth}px</span>
        </div>

        {/* Tension */}
        <p className="text-neutral-300 text-sm font-medium mr-8 mt-1">Tension</p>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="10"
            max="75"
            step="1"
            value={Math.round((options.tension ?? 0.35) * 100)}
            onChange={(e) => onChange('tension', parseInt(e.target.value, 10) / 100)}
            className="flex-1 accent-white cursor-pointer"
          />
          <span className="text-neutral-400 text-xs w-6">{Math.round((options.tension ?? 0.35) * 100)}%</span>
        </div>

        {/* Nodes */}
        <p className="text-neutral-300 text-sm font-medium mr-8">Nodes</p>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={options.showDots}
            onChange={(e) => onChange('showDots', e.target.checked)}
            className="sr-only"
          />
          <div
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
              options.showDots ? 'bg-white' : 'bg-neutral-700'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-black rounded-full transition-transform duration-200 ${
                options.showDots ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </label>
      </div>

      {/* Action Buttons: Randomize & Reset */}
      <button
        onClick={onRandomize}
        className="mt-4 w-full px-3 py-2 text-sm bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-md transition-colors duration-150 border border-neutral-800 cursor-pointer flex items-center justify-center gap-1.5 font-medium"
      >
        <span>🎲</span>
        <span>Randomize</span>
      </button>

      <button
        onClick={onReset}
        className="mt-2 w-full px-3 py-2 text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-md transition-colors duration-150 border border-neutral-700 cursor-pointer font-medium"
      >
        Reset to Defaults
      </button>
    </div>
  );
}
