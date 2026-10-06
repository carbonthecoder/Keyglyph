import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Shield } from 'lucide-react';

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

    // Check if Google AdSense / Google Tag Rewarded Ad is available in window
    if (typeof window !== 'undefined' && window.googletag && window.googletag.cmd) {
      window.googletag.cmd.push(() => {
        // If developer has configured a GPT rewarded ad slot
        if (window.__rewardedSlot) {
          window.googletag.display(window.__rewardedSlot);
        }
      });
    }

    // Precise 5-second countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCompleted(true);
          
          // Trigger reward strictly once after completion
          if (!rewardedFiredRef.current) {
            rewardedFiredRef.current = true;
            setTimeout(() => {
              onRewardUnlocked?.();
            }, 600);
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-sm rounded-xl p-5 shadow-2xl border transition-all ${
          isDark
            ? 'bg-black border-neutral-800 text-white shadow-[0_8px_30px_rgb(0,0,0,0.9)]'
            : 'bg-white border-neutral-200 text-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              Rewarded Sponsor
            </span>
          </div>

          {isCompleted ? (
            <button
              onClick={onClose}
              className="p-1 rounded-md text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 text-neutral-500">
              {timeLeft}s
            </span>
          )}
        </div>

        {/* Ad Container Box */}
        <div className="rounded-lg p-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center text-center">
          {/* Ad Slot Container (Google AdSense can inject here when live) */}
          <div id="google-rewarded-ad-slot" />

          {!isCompleted ? (
            <>
              <div className="w-8 h-8 rounded-md bg-black text-white dark:bg-white dark:text-black flex items-center justify-center mb-3 font-mono font-bold text-xs">
                ▲
              </div>
              <h4 className="font-medium text-xs text-neutral-900 dark:text-neutral-100 mb-1 tracking-tight">
                Vercel Serverless & Edge
              </h4>
              <p className="text-[11px] text-neutral-500 max-w-xs mb-4 leading-relaxed">
                Watch this short message to unlock high-resolution vector export.
              </p>

              {/* Progress Line */}
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black dark:bg-white transition-all duration-1000 ease-linear"
                  style={{ width: `${((5 - timeLeft) / 5) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-neutral-400 mt-2">
                Unlocking {exportType} in {timeLeft}s...
              </span>
            </>
          ) : (
            <div className="py-2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mb-2">
                <Check className="w-4 h-4" />
              </div>
              <h4 className="font-medium text-xs text-neutral-900 dark:text-neutral-100">
                Unlocked
              </h4>
              <p className="text-[11px] text-neutral-500 mt-0.5 font-mono">
                Downloading your {exportType}...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
