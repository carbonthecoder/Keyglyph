import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sliders, Download, Check, Copy, Play, Share2, Video } from 'lucide-react';
import { Header } from './components/Header';
import { Keyboard } from './components/Keyboard';
import { SignatureOverlay } from './components/SignatureOverlay';
import { OptionsDrawer } from './components/OptionsDrawer';
import { AboutPage } from './components/AboutPage';
import { AdModal } from './components/AdModal';
import { soundEngine } from './utils/audio';
import { downloadSVG, downloadPNG, copySVGToClipboard, recordReplayVideo } from './utils/export';
import { KEYBOARD_LAYOUTS } from './utils/layouts';
import { CURVE_TYPES } from './utils/curves';

const DEFAULT_OPTIONS = {
  layout: 'qwerty',
  curveType: 'linear',
  showNumbers: false,
  styleMode: 'solid',
  color: '#ffffff',
  gradientStart: '#ff6b6b',
  gradientEnd: '#4ecdc4',
  gradientPreset: 'cyberpunk',
  strokeWidth: 2.5,
  showDots: false,
  tension: 0.35,
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
  const isHoveringBoardRef = useRef(false);
  const hideTimerRef = useRef(null);

  // About Page state
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Listen to browser hash (#about)
  useEffect(() => {
    const handleHash = () => {
      setIsAboutOpen(window.location.hash === '#about');
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  // Hydrate name from URL path (/yourname) on load & auto-replay
  useEffect(() => {
    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
    if (rawPath && rawPath !== 'about') {
      try {
        const decoded = decodeURIComponent(rawPath).replace(/[-_]/g, ' ');
        if (decoded.trim()) {
          setInputText(decoded.trim());
          setTimeout(() => {
            soundEngine.playKey();
            setIsReplaying(true);
            setReplayProgress(0.001);
            const duration = 1800;
            const startTime = performance.now();
            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(1, elapsed / duration);
              const eased = 1 - Math.pow(1 - progress, 3);
              setReplayProgress(Math.min(1, Math.max(0, eased)));
              if (progress < 1) {
                replayAnimRef.current = requestAnimationFrame(animate);
              } else {
                setIsReplaying(false);
                setReplayProgress(1);
              }
            };
            replayAnimRef.current = requestAnimationFrame(animate);
          }, 450);
        }
      } catch (e) {
        // Malformed URI handling
      }
    }
  }, []);

  // Sync browser address bar with current typed name
  useEffect(() => {
    if (inputText && inputText.trim()) {
      const slug = encodeURIComponent(inputText.trim().toLowerCase().replace(/\s+/g, '-'));
      window.history.replaceState(null, '', `/${slug}`);
    } else {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.replaceState(null, '', '/');
      }
    }
  }, [inputText]);

  // Replay animation state
  const [isReplaying, setIsReplaying] = useState(false);
  const [replayProgress, setReplayProgress] = useState(1);
  const replayAnimRef = useRef(null);

  // Copy & Share states
  const [isCopied, setIsCopied] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [selectedVideoFormat, setSelectedVideoFormat] = useState('mp4');

  // Name Stacking state (default false every time)
  const [nameStacking, setNameStacking] = useState(false);

  // Ad modal state
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [pendingExportType, setPendingExportType] = useState('SVG');

  const svgRef = useRef(null);
  const textInputRef = useRef(null);

  // Automatically hide keyboard after 1.8 seconds of inactivity
  const scheduleKeyboardHide = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => {
      setIsKeyboardVisible(false);
    }, 1800);
  }, []);

  // Show keys immediately and restart the 1.8s disappearance countdown
  const triggerKeyboardActive = useCallback(() => {
    if (!isReplaying) {
      setIsKeyboardVisible(true);
      scheduleKeyboardHide();
    }
  }, [isReplaying, scheduleKeyboardHide]);

  const handleTypingActivity = useCallback(() => {
    triggerKeyboardActive();
  }, [triggerKeyboardActive]);

  // Theme setup
  useEffect(() => {
    const savedTheme = localStorage.getItem('signature_theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
    scheduleKeyboardHide();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [scheduleKeyboardHide]);

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

  // Stacked multi-word points when name stacking is active
  const stackedSignaturePoints = useMemo(() => {
    if (!nameStacking || !inputText || Object.keys(keyPositions).length === 0) return null;
    const words = inputText.trim().split(/\s+/).filter(Boolean);
    if (words.length <= 1) return null;
    return words.map((word) => {
      const wordPoints = [];
      for (let char of word.toUpperCase()) {
        if (keyPositions[char]) {
          wordPoints.push(keyPositions[char]);
        }
      }
      return wordPoints;
    });
  }, [nameStacking, inputText, keyPositions]);

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
        handleTypingActivity();
        return;
      }

      if (e.key === 'Escape') {
        setIsOptionsOpen(false);
        setIsAboutOpen(false);
        return;
      }

      handleTypingActivity();

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
  }, [handleTypingActivity]);

  // Virtual key click
  const handleVirtualKeyClick = (char) => {
    setLastPressedKey(char);
    setTimeout(() => setLastPressedKey(null), 120);
    setInputText((prev) => (prev + char.toLowerCase()).slice(0, 35));
    soundEngine.playKey();
    handleTypingActivity();
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

  const handleRandomizeOptions = () => {
    const layoutKeys = Object.keys(KEYBOARD_LAYOUTS);
    const curveKeys = CURVE_TYPES.map((c) => c.id);

    const randomLayout = layoutKeys[Math.floor(Math.random() * layoutKeys.length)];
    const randomCurve = curveKeys[Math.floor(Math.random() * curveKeys.length)];
    const randomNumbers = Math.random() > 0.5;
    const randomWidth = +(1.5 + Math.random() * 4).toFixed(1);

    setOptions((prev) => ({
      ...prev,
      layout: randomLayout,
      curveType: randomCurve,
      showNumbers: randomNumbers,
      strokeWidth: randomWidth,
      // DO NOT CHANGE COLOR - keep existing color untouched!
    }));

    soundEngine.playKey();
    showToast(`Randomized 🎲 (${randomCurve})`);
  };

  // Replay stroke animation
  const handleReplay = useCallback(() => {
    if (!inputText || signaturePoints.length < 2) {
      showToast('Type your name first');
      return;
    }
    if (replayAnimRef.current) {
      cancelAnimationFrame(replayAnimRef.current);
    }
    soundEngine.playKey();
    setIsReplaying(true);
    setReplayProgress(0.001);
    const startTime = performance.now();
    const duration = Math.min(2600, Math.max(1000, signaturePoints.length * 170));

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutCubic curve for smooth pen stroke
      const eased = 1 - Math.pow(1 - progress, 3);
      setReplayProgress(Math.min(1, Math.max(0, eased)));

      if (progress < 1) {
        replayAnimRef.current = requestAnimationFrame(animate);
      } else {
        setIsReplaying(false);
        setReplayProgress(1);
      }
    };

    replayAnimRef.current = requestAnimationFrame(animate);
  }, [inputText, signaturePoints.length, showToast]);

  // Reset replay animation when user types new characters
  useEffect(() => {
    if (replayAnimRef.current) {
      cancelAnimationFrame(replayAnimRef.current);
      setIsReplaying(false);
    }
    setReplayProgress(1);
  }, [inputText]);

  useEffect(() => {
    return () => {
      if (replayAnimRef.current) cancelAnimationFrame(replayAnimRef.current);
    };
  }, []);

  // 1-Click Copy SVG
  const handleCopySVG = async () => {
    if (!inputText || signaturePoints.length < 2) {
      showToast('Type your name first');
      return;
    }
    if (svgRef.current) {
      const success = await copySVGToClipboard(svgRef.current, isDark);
      if (success) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        showToast('SVG copied to clipboard');
      } else {
        showToast('Failed to copy SVG');
      }
    }
  };

  // 1-Click Copy direct share link
  const handleShareLink = useCallback(async () => {
    if (!inputText || !inputText.trim()) {
      showToast('Type your name first');
      return;
    }
    const slug = encodeURIComponent(inputText.trim().toLowerCase().replace(/\s+/g, '-'));
    const shareUrl = `${window.location.origin}/${slug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsLinkCopied(true);
      showToast('Share link copied');
      setTimeout(() => setIsLinkCopied(false), 2000);
    } catch (err) {
      showToast('Could not copy link');
    }
  }, [inputText, showToast]);

  // Export 60fps video replay in selected format (MP4 or WebM)
  const handleExportVideo = useCallback(async (format = 'mp4') => {
    if (!svgRef.current || isRecordingVideo) return;
    if (!inputText || signaturePoints.length < 2) {
      showToast('Type your name first');
      return;
    }
    setIsRecordingVideo(true);
    showToast(`Recording ${format.toUpperCase()} video...`);
    try {
      const slug = inputText.trim() ? inputText.trim().toLowerCase().replace(/\s+/g, '-') : 'keyglyph';
      await recordReplayVideo(svgRef.current, `${slug}-replay`, isDark, format);
      showToast(`Video (${format.toUpperCase()}) downloaded`);
    } catch (err) {
      showToast('Video export failed');
    } finally {
      setIsRecordingVideo(false);
    }
  }, [inputText, isDark, isRecordingVideo, signaturePoints.length, showToast]);

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
        downloadSVG(svgRef.current, `${inputText || 'signature'}.svg`, isDark);
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.85 } });
        showToast('SVG exported');
      }
    } else {
      if (svgRef.current) {
        downloadPNG(svgRef.current, `${inputText || 'signature'}.png`, 2, isDark);
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
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 rounded-full bg-neutral-900/95 text-white dark:bg-neutral-100/95 dark:text-black text-xs font-mono border border-neutral-700 dark:border-neutral-300 shadow-2xl backdrop-blur-md flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
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
        onOpenAbout={() => {
          setIsAboutOpen(true);
          window.location.hash = 'about';
        }}
      />

      {/* Workspace */}
      <main className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center px-4 py-8 relative">
        {/* Name Input with Dynamic Sizing & Cool Changing Shades Underline */}
        <div className="mb-10 sm:mb-14 text-center cursor-text relative w-full flex flex-col items-center">
          <div className="relative inline-block max-w-3xl w-full px-4 sm:px-8">
            <input
              ref={textInputRef}
              type="text"
              value={inputText}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="off"
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
              onChange={(e) => {
                const val = e.target.value.slice(0, 50);
                setInputText(val);
                soundEngine.playKey();
                handleTypingActivity();
                // Ensure latest typed letter automatically scrolls into view side-to-side
                requestAnimationFrame(() => {
                  if (textInputRef.current) {
                    textInputRef.current.scrollLeft = textInputRef.current.scrollWidth;
                  }
                });
              }}
              placeholder="Enter your name"
              autoFocus
              className={`w-full overflow-x-auto whitespace-nowrap tracking-tight text-center bg-transparent border-none outline-none transition-all duration-150 pb-2 placeholder:text-neutral-400 dark:placeholder:text-neutral-700 font-syne font-extrabold ${
                inputText.length > 20
                  ? 'text-xl sm:text-2xl md:text-3xl'
                  : inputText.length > 12
                  ? 'text-2xl sm:text-3xl md:text-4xl'
                  : 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl'
              } ${isDark ? 'text-white' : 'text-black'}`}
              style={{
                textDecoration: 'none',
              }}
            />
            {/* Ambient Underline: Thin knife-edge with sleek grey-white shimmer and realistic moving shadow */}
            <div className="w-full flex justify-center mt-2 animate-shadow-move">
              <div
                className={`h-[2px] transition-all duration-300 ${
                  inputText
                    ? 'w-full max-w-lg animate-silver-sweep'
                    : 'w-44 sm:w-56 opacity-50'
                }`}
                style={{
                  clipPath:
                    'polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)',
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(180,180,180,0.45) 25%, #ffffff 50%, rgba(180,180,180,0.45) 75%, rgba(255,255,255,0.05) 100%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Keyboard & Vector Signature Canvas */}
        <div 
          className="relative inline-block mx-auto max-w-full"
          onMouseEnter={triggerKeyboardActive}
          onMouseMove={triggerKeyboardActive}
          onTouchStart={triggerKeyboardActive}
          onClick={triggerKeyboardActive}
        >
          <Keyboard
            layout={options.layout}
            showNumbers={options.showNumbers}
            activeKeys={inputText.toUpperCase().split('')}
            lastPressedKey={lastPressedKey}
            onKeyClick={handleVirtualKeyClick}
            onKeyPositionsUpdate={setKeyPositions}
            isDark={isDark}
            isVisible={isKeyboardVisible && !isReplaying}
            onHover={triggerKeyboardActive}
          />

          <SignatureOverlay
            svgRef={svgRef}
            points={signaturePoints}
            stackedPoints={stackedSignaturePoints}
            curveType={options.curveType}
            styleMode={options.styleMode}
            color={options.color}
            gradientStart={options.gradientStart}
            gradientEnd={options.gradientEnd}
            strokeWidth={options.strokeWidth}
            showDots={options.showDots}
            tension={options.tension}
            replayProgress={replayProgress}
            isDark={isDark}
          />
        </div>

        {/* Minimal Name Stacking status below keyboard: pure monospace, always visible */}
        <div className="mt-3 text-center select-none font-mono text-[11px] text-neutral-500">
          <span>name stacking: </span>
          <button
            onClick={() => {
              const next = !nameStacking;
              setNameStacking(next);
              showToast(next ? 'Name stacking enabled' : 'Name stacking disabled');
            }}
            className={`cursor-pointer underline underline-offset-4 transition-colors ${
              nameStacking
                ? 'text-neutral-100 font-bold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {nameStacking ? 'enabled' : 'disabled'}
          </button>
        </div>

        {/* Action Buttons: Only show when user has entered text */}
        {inputText && inputText.trim().length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 z-30 font-mono animate-ios-enter">
            <button
              onClick={handleReplay}
              className={`h-8 px-3.5 text-xs font-mono font-bold rounded-lg transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
                isDark
                  ? 'bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-neutral-400 hover:bg-neutral-800'
                  : 'bg-neutral-100 border border-neutral-300 text-neutral-900 hover:text-neutral-500 hover:bg-neutral-200'
              }`}
              title="Replay stroke drawing animation"
            >
              <Play className={`w-3.5 h-3.5 ${isReplaying ? 'animate-pulse text-amber-500' : ''}`} />
              <span>{isReplaying ? 'Replaying...' : 'Replay'}</span>
            </button>

            <button
              onClick={handleShareLink}
              className={`h-8 px-3.5 text-xs font-mono font-bold rounded-lg transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
                isLinkCopied
                  ? isDark
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'bg-neutral-200 text-black border border-neutral-300'
                  : isDark
                  ? 'bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-neutral-400 hover:bg-neutral-800'
                  : 'bg-neutral-100 border border-neutral-300 text-neutral-900 hover:text-neutral-500 hover:bg-neutral-200'
              }`}
              title="Copy direct share link (keyglyph.vercel.app/name)"
            >
              {isLinkCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopySVG}
              className={`h-8 px-3.5 text-xs font-mono font-bold rounded-lg transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
                isDark
                  ? 'bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-neutral-400 hover:bg-neutral-800'
                  : 'bg-neutral-100 border border-neutral-300 text-neutral-900 hover:text-neutral-500 hover:bg-neutral-200'
              }`}
              title="Copy vector SVG to clipboard for Figma or Illustrator"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SVG</span>
                </>
              )}
            </button>

            <div className={`inline-flex items-center rounded-lg border shadow-sm font-mono text-xs ${
              isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-300 bg-neutral-100'
            }`}>
              <button
                onClick={() => handleExportVideo(selectedVideoFormat)}
                disabled={isRecordingVideo}
                className={`h-8 px-3 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer rounded-l-lg ${
                  isRecordingVideo
                    ? 'opacity-60 cursor-not-allowed'
                    : isDark
                    ? 'text-neutral-200 hover:text-white hover:bg-neutral-800'
                    : 'text-neutral-900 hover:text-black hover:bg-neutral-200'
                }`}
                title={`Export video as .${selectedVideoFormat}`}
              >
                <Video className={`w-3.5 h-3.5 ${isRecordingVideo ? 'animate-pulse text-amber-500' : ''}`} />
                <span>{isRecordingVideo ? 'Recording...' : 'Export Video'}</span>
              </button>
              <div className={`h-4 w-px ${isDark ? 'bg-neutral-800' : 'bg-neutral-300'}`} />
              <div className="flex items-center gap-0.5 px-1.5">
                <button
                  onClick={() => setSelectedVideoFormat('mp4')}
                  className={`px-1.5 py-0.5 text-[10px] rounded cursor-pointer transition-colors ${
                    selectedVideoFormat === 'mp4'
                      ? isDark
                        ? 'bg-neutral-800 text-white font-bold'
                        : 'bg-neutral-300 text-black font-bold'
                      : isDark
                      ? 'text-neutral-400 hover:text-neutral-200'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  mp4
                </button>
                <button
                  onClick={() => setSelectedVideoFormat('webm')}
                  className={`px-1.5 py-0.5 text-[10px] rounded cursor-pointer transition-colors ${
                    selectedVideoFormat === 'webm'
                      ? isDark
                        ? 'bg-neutral-800 text-white font-bold'
                        : 'bg-neutral-300 text-black font-bold'
                      : isDark
                      ? 'text-neutral-400 hover:text-neutral-200'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  webm
                </button>
              </div>
            </div>

            <button
              onClick={() => handleStartExport('SVG')}
              className={`h-8 px-3.5 text-xs font-mono font-bold rounded-lg transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
                isDark
                  ? 'bg-white text-black hover:text-neutral-600 hover:bg-neutral-200'
                  : 'bg-black text-white hover:text-neutral-400 hover:bg-neutral-800'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export SVG</span>
            </button>

            <button
              onClick={() => handleStartExport('PNG')}
              className={`h-8 px-3.5 text-xs font-mono font-bold rounded-lg transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
                isDark
                  ? 'bg-white text-black hover:text-neutral-600 hover:bg-neutral-200'
                  : 'bg-black text-white hover:text-neutral-400 hover:bg-neutral-800'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PNG</span>
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto py-8 px-6 sm:px-12 select-none font-mono z-30 relative">
        {/* Options Button: Positioned cleanly ABOVE the divider line */}
        {!isOptionsOpen && (
          <div className="w-full flex justify-end mb-4">
            <button
              onClick={() => setIsOptionsOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 cursor-pointer text-xs font-mono font-medium text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors shadow-lg"
            >
              Options
            </button>
          </div>
        )}

        {/* Full-width Divider Line */}
        <div className="w-full border-t border-neutral-300 dark:border-neutral-800 mb-6" />

        {/* Bottom Content: Clean credit and GitHub profile with icon */}
        <div className="w-full flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-300">
            <span>©</span>
            <span>crafted by</span>
            <a
              href="https://ibrahim.is-cool.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-4 text-neutral-900 dark:text-neutral-100 hover:text-neutral-400 transition-colors"
            >
              carbon
            </a>
            <span className="text-neutral-400 dark:text-neutral-700">•</span>
            <a
              href="https://github.com/carbonthecoder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="underline underline-offset-4">@carbonthecoder</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Options Drawer */}
      <OptionsDrawer
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        options={options}
        onChange={handleOptionChange}
        onReset={handleResetOptions}
        onRandomize={handleRandomizeOptions}
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

      {/* What is Keyglyph Guide Page */}
      <AboutPage
        isOpen={isAboutOpen}
        onClose={() => {
          setIsAboutOpen(false);
          if (window.location.hash === '#about') {
            history.pushState('', document.title, window.location.pathname + window.location.search);
          }
        }}
        isDark={isDark}
      />
    </div>
  );
}
