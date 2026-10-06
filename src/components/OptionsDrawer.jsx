import React from 'react';
import { CURVE_TYPES } from '../utils/curves';
import { KEYBOARD_LAYOUTS } from '../utils/layouts';
import { X } from 'lucide-react';

export function OptionsDrawer({
  isOpen,
  onClose,
  options,
  onChange,
  onReset,
  isDark = true,
}) {
  if (!isOpen) return null;

  const colorPresets = [
    '#ffffff',
    '#000000',
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ec4899',
    '#8b5cf6',
  ];

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-84 max-w-sm rounded-xl p-5 shadow-2xl z-50 border transition-all duration-200 ${
        isDark
          ? 'bg-black border-neutral-800 text-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.8)]'
          : 'bg-white border-neutral-300 text-neutral-900 shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <span className="font-semibold text-xs tracking-tight text-neutral-900 dark:text-neutral-100">
          Configuration
        </span>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-0.5 text-xs">
        {/* Layout */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-neutral-700 dark:text-neutral-400">Layout</span>
          <select
            value={options.layout}
            onChange={(e) => onChange('layout', e.target.value)}
            className={`h-7 px-2.5 rounded-md border outline-none font-mono text-xs cursor-pointer transition-colors ${
              isDark
                ? 'bg-[#0a0a0a] border-neutral-800 text-white hover:border-neutral-700'
                : 'bg-neutral-100 border-neutral-300 text-neutral-900 hover:border-neutral-400 font-medium'
            }`}
          >
            {Object.entries(KEYBOARD_LAYOUTS).map(([key, item]) => (
              <option key={key} value={key} className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>
                {item.name.toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Curve Selection */}
        <div>
          <span className="font-medium text-neutral-700 dark:text-neutral-400 block mb-2">Curve</span>
          <div className="flex flex-wrap gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg">
            {CURVE_TYPES.map((curve) => {
              const isSelected = options.curveType === curve.id;
              return (
                <button
                  key={curve.id}
                  onClick={() => onChange('curveType', curve.id)}
                  className={`text-[11px] px-2 py-1 rounded-md transition-all font-mono ${
                    isSelected
                      ? isDark
                        ? 'bg-neutral-800 text-white shadow-sm font-semibold'
                        : 'bg-black text-white shadow-sm font-semibold'
                      : isDark
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-neutral-700 hover:text-black font-medium'
                  }`}
                >
                  {curve.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Numbers Row Toggle */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-neutral-700 dark:text-neutral-400">Numbers Row</span>
          <button
            type="button"
            onClick={() => onChange('showNumbers', !options.showNumbers)}
            className={`w-9 h-5 rounded-full relative transition-colors duration-200 cursor-pointer ${
              options.showNumbers
                ? isDark ? 'bg-white' : 'bg-black'
                : isDark ? 'bg-neutral-800' : 'bg-neutral-300'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full absolute top-0.75 transition-transform duration-200 ${
                options.showNumbers
                  ? isDark ? 'translate-x-4.5 bg-black' : 'translate-x-4.5 bg-white'
                  : isDark ? 'translate-x-1 bg-neutral-400' : 'translate-x-1 bg-white'
              }`}
            />
          </button>
        </div>

        {/* Color Palette */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-neutral-700 dark:text-neutral-400">Stroke Color</span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-1">
              {colorPresets.map((c) => (
                <button
                  key={c}
                  onClick={() => onChange('color', c)}
                  style={{ backgroundColor: c }}
                  className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                    options.color.toLowerCase() === c.toLowerCase()
                      ? 'scale-125 ring-2 ring-blue-500'
                      : 'border-neutral-400 dark:border-neutral-700 opacity-80 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
            <label className="relative cursor-pointer ml-1">
              <input
                type="color"
                value={options.color}
                onChange={(e) => onChange('color', e.target.value)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
              <div
                style={{ backgroundColor: options.color }}
                className="w-5 h-5 rounded border border-neutral-400 dark:border-neutral-700 shadow-sm"
              />
            </label>
          </div>
        </div>

        {/* Stroke Width Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-neutral-700 dark:text-neutral-400">Stroke Width</span>
            <span className="font-mono text-neutral-700 dark:text-neutral-500">{options.strokeWidth}px</span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            value={options.strokeWidth}
            onChange={(e) => onChange('strokeWidth', parseInt(e.target.value, 10))}
            className="w-full h-1 bg-neutral-300 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
          />
        </div>
      </div>

      {/* Reset to Defaults */}
      <button
        onClick={onReset}
        className="w-full mt-5 py-2 text-xs font-semibold rounded-lg border transition-colors border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-black text-neutral-900 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-900"
      >
        Reset to Defaults
      </button>
    </div>
  );
}
