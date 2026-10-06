import React, { useState } from 'react';
import { X, Sparkles, Hash } from 'lucide-react';
import { PRESET_NAMES } from '../utils/layouts';

export function PresetsModal({ isOpen, onClose, onSelectPreset, isDark = true }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredPresets = PRESET_NAMES.filter((p) =>
    p.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-md rounded-2xl p-6 shadow-2xl border transition-all ${
          isDark
            ? 'bg-[#121319] border-neutral-800 text-white'
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-sm">Preset Signatures</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <input
          type="text"
          placeholder="Search signatures..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className={`w-full px-3.5 py-2 text-xs rounded-xl border mb-4 outline-none ${
            isDark
              ? 'bg-[#181a24] border-neutral-700 text-white placeholder-neutral-500 focus:border-neutral-500'
              : 'bg-neutral-50 border-neutral-300 text-black placeholder-neutral-400 focus:border-neutral-500'
          }`}
        />

        <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto">
          {filteredPresets.map((name) => (
            <button
              key={name}
              onClick={() => {
                onSelectPreset(name);
                onClose();
              }}
              className={`px-3 py-1.5 text-xs rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
                isDark
                  ? 'bg-[#181a24] border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 hover:bg-[#202330]'
                  : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-400 hover:bg-neutral-200'
              }`}
            >
              <Hash className="w-3 h-3 text-neutral-500" />
              {name}
            </button>
          ))}
          {filteredPresets.length === 0 && (
            <p className="text-xs text-neutral-500 py-3 text-center w-full">
              No matching preset found. Try typing it directly!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
