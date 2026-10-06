import React, { useState, useEffect, useRef } from 'react';
import { X, Check } from 'lucide-react';

export function AdModal({
  isOpen,
  onClose,
  onRewardUnlocked,
  exportType = 'SVG',
  isDark = true,
}) {
  const [timeLeft, setTimeLeft] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);
  const rewardedFiredRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(5);
      setIsCompleted(false);
      rewardedFiredRef.current = false;
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCompleted(true);
          
          if (!rewardedFiredRef.current) {
            rewardedFiredRef.current = true;
            setTimeout(() => {
              onRewardUnlocked?.();
            }, 500);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onRewardUnlocked]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-xs rounded-xl p-6 shadow-2xl border transition-all text-center ${
          isDark
            ? 'bg-black border-neutral-800 text-white shadow-[0_8px_30px_rgb(0,0,0,0.9)]'
            : 'bg-white border-neutral-300 text-neutral-900 shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
        }`}
      >
        {/* Header Close button if completed */}
        <div className="flex justify-end mb-1">
          {isCompleted && (
            <button
              onClick={onClose}
              className="p-1 rounded-md text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Content - Simple Ads coming soon */}
        <div className="py-3 flex flex-col items-center">
          {!isCompleted ? (
            <>
              <h3 className="font-semibold text-sm tracking-tight mb-1 text-neutral-900 dark:text-neutral-100">
                Ads coming soon
              </h3>
              <p className="text-xs font-mono text-neutral-500 mb-5">
                Unlocking {exportType} in {timeLeft}s
              </p>

              {/* Minimal Progress Bar */}
              <div className="w-48 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black dark:bg-white transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${((5 - timeLeft) / 5) * 100}%` }}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center py-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mb-2">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                Unlocked
              </h3>
              <p className="text-xs font-mono text-neutral-500 mt-1">
                Downloading {exportType}...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
