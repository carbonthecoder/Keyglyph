import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Check, ChevronUp } from 'lucide-react';

export const EXPORT_FORMAT_OPTIONS = [
  { id: 'png', label: 'PNG', badge: 'Lossless' },
  { id: 'jpg', label: 'JPG', badge: 'Smallest' },
  { id: 'webp', label: 'WebP', badge: 'Modern' },
  { id: 'svg', label: 'SVG', badge: 'Vector' },
  { id: 'pdf', label: 'PDF', badge: 'Print' },
];

export default function GlideSelect({
  value = 'png',
  onChange,
  options = EXPORT_FORMAT_OPTIONS,
  isDark = true,
  onSound,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ top: 6, height: 36, opacity: 0 });
  const [lastIndex, setLastIndex] = useState(-1);

  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const selectedIndex = options.findIndex((opt) => opt.id.toLowerCase() === value.toLowerCase());
  const activeIndex = selectedIndex !== -1 ? selectedIndex : 0;
  const currentOption = options[activeIndex] || options[0];

  // Align the gliding pill to active/hovered index on open
  useEffect(() => {
    if (isOpen) {
      const targetIndex = lastIndex !== -1 ? lastIndex : activeIndex;
      const targetEl = itemRefs.current[targetIndex];
      if (targetEl) {
        setPillStyle({
          top: targetEl.offsetTop,
          height: targetEl.offsetHeight,
          opacity: 1,
        });
      }
    }
  }, [isOpen, activeIndex, lastIndex]);

  // Click outside and ESC listener
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleTriggerClick = (e) => {
    e.stopPropagation();
    if (onSound) onSound();
    setIsOpen((prev) => !prev);
  };

  const handleHover = useCallback((index, el) => {
    if (!el) return;
    setLastIndex(index);
    setPillStyle({
      top: el.offsetTop,
      height: el.offsetHeight,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Glide back to the currently selected active item smoothly
    const targetEl = itemRefs.current[activeIndex];
    if (targetEl) {
      setPillStyle({
        top: targetEl.offsetTop,
        height: targetEl.offsetHeight,
        opacity: 1,
      });
    }
  }, [activeIndex]);

  const handleSelect = (optionId) => {
    if (onSound) onSound();
    onChange(optionId);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left select-none">
      {/* Trigger Chip Button matching user specification */}
      <button
        type="button"
        onClick={handleTriggerClick}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title="Choose format"
        className={`h-8 px-3 rounded-lg border flex items-center gap-1.5 font-mono text-xs font-bold cursor-pointer transition-colors shadow-sm ${
          isDark
            ? 'bg-[#242427] hover:bg-[#2d2d32] border-neutral-700/60 text-white'
            : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-900'
        }`}
      >
        <span>{currentOption.label}</span>
        <ChevronUp
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : 'rotate-0 text-neutral-400'
          }`}
        />
      </button>

      {/* Popout Menu */}
      {isOpen && (
        <div
          role="listbox"
          onMouseLeave={handleMouseLeave}
          className={`absolute bottom-full left-0 mb-2 w-52 p-1.5 rounded-2xl shadow-2xl z-50 origin-bottom-left transition-all duration-200 animate-in fade-in zoom-in-95 ${
            isDark
              ? 'bg-[#18181b] border border-neutral-800 text-white'
              : 'bg-white border border-neutral-200 text-neutral-900'
          }`}
          style={{
            boxShadow: isDark
              ? '0 20px 45px -10px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.07)'
              : '0 20px 45px -10px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
          }}
        >
          {/* Gliding Highlight Pill */}
          <div
            className={`absolute left-1.5 right-1.5 rounded-xl pointer-events-none ${
              isDark
                ? 'bg-[#2c2c31] border border-white/5'
                : 'bg-neutral-200/80 border border-black/5'
            }`}
            style={{
              top: `${pillStyle.top}px`,
              height: `${pillStyle.height}px`,
              opacity: pillStyle.opacity,
              transition:
                'top 220ms cubic-bezier(0.2, 0.9, 0.3, 1), height 180ms ease, opacity 160ms ease',
            }}
          />

          {/* Option Rows */}
          <div className="relative z-10 flex flex-col gap-0.5">
            {options.map((option, idx) => {
              const isSelected = option.id.toLowerCase() === value.toLowerCase();
              return (
                <div
                  key={option.id}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.id)}
                  onMouseEnter={(e) => handleHover(idx, e.currentTarget)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer relative z-10 transition-colors"
                >
                  {/* Left: Format Label */}
                  <span
                    className={`font-mono text-xs font-bold tracking-wide ${
                      isSelected
                        ? isDark ? 'text-white' : 'text-black'
                        : isDark ? 'text-neutral-200' : 'text-neutral-800'
                    }`}
                  >
                    {option.label}
                  </span>

                  {/* Right: Badge + Checkmark */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-sans text-[11px] font-normal tracking-normal ${
                        isDark ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {option.badge}
                    </span>
                    <span className="w-4 h-4 flex items-center justify-center">
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 stroke-[2.5] ${
                            isDark ? 'text-white' : 'text-black'
                          }`}
                        />
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
