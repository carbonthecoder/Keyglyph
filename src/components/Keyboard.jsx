import React, { useEffect, useRef } from 'react';
import { KEYBOARD_LAYOUTS } from '../utils/layouts';

export function Keyboard({
  layout = 'qwerty',
  showNumbers = false,
  activeKeys = [],
  lastPressedKey = null,
  onKeyClick,
  onKeyPositionsUpdate,
  isDark = true,
  isVisible = true,
  onHover,
}) {
  const containerRef = useRef(null);
  const layoutData = KEYBOARD_LAYOUTS[layout] || KEYBOARD_LAYOUTS.qwerty;

  // Compute key centers relative to container
  const updateKeyPositions = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const keyElements = containerRef.current.querySelectorAll('[data-key]');
    const positions = {};

    keyElements.forEach((el) => {
      const keyChar = el.getAttribute('data-key');
      const rect = el.getBoundingClientRect();
      positions[keyChar] = {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    });

    onKeyPositionsUpdate?.(positions);
  };

  useEffect(() => {
    updateKeyPositions();
    const ro = new ResizeObserver(() => {
      updateKeyPositions();
    });
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener('resize', updateKeyPositions);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateKeyPositions);
    };
  }, [layout, showNumbers]);

  const rows = showNumbers
    ? [layoutData.numbers, ...layoutData.rows]
    : layoutData.rows;

  return (
    <div
      ref={containerRef}
      onMouseEnter={onHover}
      onTouchStart={onHover}
      className={`relative flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-4 select-none max-w-full overflow-hidden transition-opacity duration-500 ease-in-out ${
        isVisible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 w-full">
          {row.map((char) => {
            const isLastPressed = lastPressedKey === char;
            const isInSignature = activeKeys.includes(char);

            return (
              <button
                key={char}
                data-key={char}
                type="button"
                onClick={() => onKeyClick?.(char)}
                style={{ touchAction: 'manipulation' }}
                className={`w-7 h-9 xs:w-8 xs:h-10 sm:w-10 sm:h-12 md:w-12 md:h-13 rounded-lg sm:rounded-xl flex items-center justify-center font-mono text-[11px] xs:text-xs transition-all duration-100 cursor-pointer active:scale-90 ${
                  isLastPressed
                    ? isDark
                      ? 'bg-neutral-600 text-white border border-neutral-300 scale-95 shadow-md'
                      : 'bg-neutral-400 text-black border border-neutral-600 scale-95 shadow-md'
                    : isInSignature
                    ? isDark
                      ? 'bg-neutral-900 text-white border border-neutral-700'
                      : 'bg-neutral-200 text-black border border-neutral-400 font-bold shadow-sm'
                    : isDark
                    ? 'bg-[#0c0c0e] text-neutral-400 border border-[#222226] hover:bg-[#141418] hover:text-white hover:border-neutral-700'
                    : 'bg-[#f4f4f5] text-neutral-900 border border-neutral-300 hover:bg-neutral-200 hover:text-black hover:border-neutral-400 shadow-[0_1px_2px_rgba(0,0,0,0.06)] font-medium'
                }`}
              >
                {char}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
