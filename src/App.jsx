import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sliders, Download, Check } from 'lucide-react';
import { Header } from './components/Header';
import { Keyboard } from './components/Keyboard';
import { SignatureOverlay } from './components/SignatureOverlay';
import { OptionsDrawer } from './components/OptionsDrawer';
import { AdModal } from './components/AdModal';
import { soundEngine } from './utils/audio';
import { downloadSVG, downloadPNG } from './utils/export';

const DEFAULT_OPTIONS = {
  layout: 'qwerty',
  curveType: 'linear',
  showNumbers: false,
  styleMode: 'solid',
  color: '#ffffff',
  gradientPreset: 'cyberpunk',
  strokeWidth: 2.5,
  showDots: false,
};

export default function App() {
  const [inputText, setInputText] = useState('');
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [isDark, setIsDark] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [lastPressedKey, setLastPressedKey] = useState(null);
  const [keyPositions, setKeyPositions] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  // Keyboard auto-disappear state
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);
  const inactivityTimerRef = useRef(null);

  // Ad modal state
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [pendingExportType, setPendingExportType] = useState('SVG');

  const svgRef = useRef(null);
  const textInputRef = useRef(null);

  // Timer to hide keypad only if user has entered text
  const resetInactivityTimer = useCallback(() => {
    setIsKeyboardVisible(true);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    // Only fade out keyboard if user has entered text
    const currentVal = textInputRef.current ? textInputRef.current.value : '';
    if (currentVal && currentVal.trim().length > 0) {
      inactivityTimerRef.current = setTimeout(() => {
        setIsKeyboardVisible(false);
      }, 2500);
    }
  }, []);

  // Theme setup
  useEffect(() => {
    const savedTheme = localStorage.getItem('signature_theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('signature_theme', 'dark');
      if (options.color === '#000000') {
        setOptions(prev => ({ ...prev, color: '#ffffff' }));
      }
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('signature_theme', 'light');
      if (options.color === '#ffffff') {
        setOptions(prev => ({ ...prev, color: '#000000' }));
      }
    }
  }, [isDark]);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  }, []);

  // Map input characters to sequential coordinates
  const signaturePoints = useMemo(() => {
    if (!inputText || Object.keys(keyPositions).length === 0) return [];
    const points = [];
    for (let char of inputText.toUpperCase()) {
      if (keyPositions[char]) {
        points.push(keyPositions[char]);
      }
    }
    return points;
  }, [inputText, keyPositions]);

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If user is focused inside an input element, native input handles text!
      if (e.target.tagName === 'INPUT') {
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          const char = e.key.toUpperCase();
          setLastPressedKey(char);
          setTimeout(() => setLastPressedKey(null), 120);
        }
        resetInactivityTimer();
        return;
      }

      if (e.key === 'Escape') {
        setIsOptionsOpen(false);
        return;
      }

      resetInactivityTimer();

      if (e.key === 'Backspace') {
        e.preventDefault();
        setInputText((prev) => prev.slice(0, -1));
        soundEngine.playKey();
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const char = e.key.toUpperCase();
        setLastPressedKey(char);
        setTimeout(() => setLastPressedKey(null), 120);
        setInputText((prev) => (prev + e.key).slice(0, 35));
        soundEngine.playKey();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resetInactivityTimer]);

  // Virtual key click
  const handleVirtualKeyClick = (char) => {
    setLastPressedKey(char);
    setTimeout(() => setLastPressedKey(null), 120);
    setInputText((prev) => (prev + char.toLowerCase()).slice(0, 35));
    soundEngine.playKey();
    resetInactivityTimer();
  };

  const handleOptionChange = (key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetOptions = () => {
    setOptions({
      ...DEFAULT_OPTIONS,
      color: isDark ? '#ffffff' : '#000000',
    });
    showToast('Reset to defaults');
  };

  const handleStartExport = (type) => {
    if (!inputText) {
      showToast('Type a name first');
      return;
    }
    setPendingExportType(type);
    setIsAdOpen(true);
  };

  const handleRewardUnlocked = () => {
    setIsAdOpen(false);
    if (pendingExportType === 'SVG') {
      if (svgRef.current) {
        downloadSVG(svgRef.current, `${inputText || 'signature'}.svg`, false);
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.85 } });
        showToast('SVG exported');
      }
    } else {
      if (svgRef.current) {
        downloadPNG(svgRef.current, `${inputText || 'signature'}.png`, 2, false);
        confetti({ particleCount: 40, spread: 55, origin: { y: 0.85 } });
        showToast('PNG exported');
      }
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-between transition-colors duration-200 relative select-none overflow-x-hidden ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black text-xs font-mono border border-neutral-800 dark:border-neutral-200 shadow-xl flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          const next = !soundEnabled;
          setSoundEnabled(next);
          soundEngine.enabled = next;
          showToast(next ? 'Sound on' : 'Sound off');
        }}
      />

      {/* Workspace */}
      <main className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center px-4 py-8 relative">
        {/* Name Input */}
        <div className="mb-10 sm:mb-14 text-center cursor-text relative w-full">
          <input
            ref={textInputRef}
            type="text"
            value={inputText}
            onChange={(e) => {
              const val = e.target.value.slice(0, 35);
              setInputText(val);
              soundEngine.playKey();
              resetInactivityTimer();
            }}
            placeholder="Enter your name"
            autoFocus
            className={`w-full text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-center bg-transparent border-none outline-none transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-700 ${
              isDark ? 'text-white' : 'text-black'
            }`}
          />
        </div>

        {/* Keyboard & Vector Signature Canvas */}
        <div 
          className="relative inline-block mx-auto max-w-full"
          onMouseEnter={() => setIsKeyboardVisible(true)}
          onClick={() => setIsKeyboardVisible(true)}
        >
          <Keyboard
            layout={options.layout}
            showNumbers={options.showNumbers}
            activeKeys={inputText.toUpperCase().split('')}
            lastPressedKey={lastPressedKey}
            onKeyClick={handleVirtualKeyClick}
            onKeyPositionsUpdate={setKeyPositions}
            isDark={isDark}
            isVisible={isKeyboardVisible}
            onHover={() => setIsKeyboardVisible(true)}
          />

          <SignatureOverlay
            svgRef={svgRef}
            points={signaturePoints}
            curveType={options.curveType}
            styleMode={options.styleMode}
            color={options.color}
            strokeWidth={options.strokeWidth}
            showDots={options.showDots}
            replayProgress={1}
            isDark={isDark}
          />
        </div>

        {/* Clean Vercel Export Buttons */}
        <div className="mt-10 flex items-center gap-2.5 z-30">
          <button
            onClick={() => handleStartExport('SVG')}
            className={`h-8 px-3.5 text-xs font-medium rounded-lg transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95 ${
              isDark
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export SVG</span>
          </button>

          <button
            onClick={() => handleStartExport('PNG')}
            className={`h-8 px-3.5 text-xs font-medium rounded-lg transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95 ${
              isDark
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PNG</span>
          </button>
        </div>
      </main>

      {/* Bottom Right: Options Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          className={`h-8 px-3 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 shadow-sm ${
            isDark
              ? 'bg-black border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
              : 'bg-neutral-100 border-neutral-300 text-neutral-900 hover:bg-neutral-200 hover:border-neutral-400'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Options</span>
        </button>
      </div>

      {/* Options Drawer */}
      <OptionsDrawer
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        options={options}
        onChange={handleOptionChange}
        onReset={handleResetOptions}
        isDark={isDark}
      />

      {/* Sponsor Unlock Modal */}
      <AdModal
        isOpen={isAdOpen}
        onClose={() => setIsAdOpen(false)}
        onRewardUnlocked={handleRewardUnlocked}
        exportType={pendingExportType}
        isDark={isDark}
      />
    </div>
  );
}
