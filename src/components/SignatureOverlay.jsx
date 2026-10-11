import React, { useMemo, useRef, useState, useEffect } from 'react';
import { generateSvgPath } from '../utils/curves';

export function SignatureOverlay({
  svgRef,
  points = [],
  curveType = 'linear',
  styleMode = 'solid', // 'solid' | 'gradient' | 'glow'
  color = '#ffffff',
  gradientPreset = 'sunset',
  strokeWidth = 3,
  showDots = false,
  tension = 0.35,
  replayProgress = 1, // 0 to 1
  isDark = true,
}) {
  const pathElRef = useRef(null);
  const [measuredLength, setMeasuredLength] = useState(1000);

  const pathD = useMemo(() => {
    return generateSvgPath(points, curveType, tension);
  }, [points, curveType, tension]);

  // Measure path length dynamically whenever path updates
  useEffect(() => {
    if (pathElRef.current) {
      try {
        const len = pathElRef.current.getTotalLength();
        if (len > 0) {
          setMeasuredLength(Math.ceil(len));
        }
      } catch (e) {
        // Fallback
      }
    }
  }, [pathD]);

  // Compute accurate total length with geometric fallback
  const totalLength = useMemo(() => {
    if (measuredLength > 10) return measuredLength;
    if (!points || points.length < 2) return 1000;
    let dist = 0;
    for (let i = 0; i < points.length - 1; i++) {
      dist += Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y);
    }
    return Math.max(600, Math.ceil(dist * 1.5));
  }, [measuredLength, points]);

  // Color & Gradient definitions
  const strokeColor = useMemo(() => {
    if (styleMode === 'gradient') {
      return 'url(#signature-gradient)';
    }
    return color;
  }, [styleMode, color]);

  const gradients = {
    sunset: ['#ff7e5f', '#feb47b'],
    cyberpunk: ['#00f2fe', '#4facfe'],
    neon: ['#f857a6', '#ff5858'],
    emerald: ['#10b981', '#6ee7b7'],
    violet: ['#a855f7', '#ec4899'],
    monochrome: isDark ? ['#ffffff', '#888888'] : ['#111827', '#6b7280'],
  };

  const activeGradient = gradients[gradientPreset] || gradients.cyberpunk;

  if (points.length < 2) {
    return null;
  }

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
    >
      <defs>
        {/* Gradient Definition */}
        <linearGradient id="signature-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={activeGradient[0]} />
          <stop offset="100%" stopColor={activeGradient[1]} />
        </linearGradient>

        {/* Glow Filter */}
        <filter id="signature-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={strokeWidth * 1.5} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Render Main Path */}
      {pathD && (
        <path
          ref={pathElRef}
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={styleMode === 'glow' ? 'url(#signature-glow)' : undefined}
          style={
            replayProgress < 1
              ? {
                  strokeDasharray: totalLength,
                  strokeDashoffset: Math.max(0, (1 - replayProgress) * totalLength),
                  transition: 'none',
                }
              : undefined
          }
        />
      )}

      {/* Render Dots at Key Vertices */}
      {showDots &&
        points
          .slice(0, replayProgress < 1 ? Math.max(1, Math.ceil(points.length * replayProgress)) : points.length)
          .map((pt, idx) => (
            <circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              r={Math.max(2, strokeWidth * 0.9)}
              fill={styleMode === 'gradient' ? activeGradient[0] : color}
              stroke={isDark ? '#000' : '#fff'}
              strokeWidth={1}
              opacity={0.9}
            />
          ))}
    </svg>
  );
}
