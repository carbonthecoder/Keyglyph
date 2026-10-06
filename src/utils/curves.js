/**
 * Vector curve generation utilities for Keyboard Signature.
 * Generates valid SVG path data strings ('d' attribute) from an ordered list of 2D points [{x, y}].
 */

export const CURVE_TYPES = [
  { id: 'linear', label: 'linear' },
  { id: 'simple curve', label: 'simple curve' },
  { id: 'quadratic bezier', label: 'quadratic bezier' },
  { id: 'cubic bezier', label: 'cubic bezier' },
  { id: 'catmull rom', label: 'catmull rom' },
];

/**
 * Generate linear path
 */
function getLinearPath(points) {
  if (!points || points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  return points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');
}

/**
 * Simple curve: lines with rounded corners
 */
function getSimpleCurvePath(points, cornerRadius = 24) {
  if (!points || points.length === 0) return '';
  if (points.length < 3) return getLinearPath(points);

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    // Vectors
    const d1 = { x: prev.x - curr.x, y: prev.y - curr.y };
    const d2 = { x: next.x - curr.x, y: next.y - curr.y };

    const len1 = Math.hypot(d1.x, d1.y);
    const len2 = Math.hypot(d2.x, d2.y);

    if (len1 === 0 || len2 === 0) {
      path += ` L ${curr.x} ${curr.y}`;
      continue;
    }

    const radius = Math.min(cornerRadius, len1 / 2, len2 / 2);

    const start = {
      x: curr.x + (d1.x / len1) * radius,
      y: curr.y + (d1.y / len1) * radius
    };
    const end = {
      x: curr.x + (d2.x / len2) * radius,
      y: curr.y + (d2.y / len2) * radius
    };

    path += ` L ${start.x} ${start.y} Q ${curr.x} ${curr.y} ${end.x} ${end.y}`;
  }

  path += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
  return path;
}

/**
 * Quadratic Bezier path: connects points through midpoints
 */
function getQuadraticBezierPath(points) {
  if (!points || points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  if (points.length === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const midX = (curr.x + next.x) / 2;
    const midY = (curr.y + next.y) / 2;

    if (i === 0) {
      path += ` Q ${curr.x} ${curr.y} ${midX} ${midY}`;
    } else {
      path += ` Q ${curr.x} ${curr.y} ${midX} ${midY}`;
    }
  }

  const last = points[points.length - 1];
  path += ` L ${last.x} ${last.y}`;
  return path;
}

/**
 * Cubic Bezier path
 */
function getCubicBezierPath(points) {
  if (!points || points.length === 0) return '';
  if (points.length < 3) return getLinearPath(points);

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x} ${p2.y}`;
  }

  return path;
}

/**
 * Catmull-Rom Spline path (Centripetal / tension controlled)
 */
function getCatmullRomPath(points, tension = 0.5) {
  if (!points || points.length === 0) return '';
  if (points.length < 3) return getLinearPath(points);

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    const cp1x = p1.x + ((p2.x - p0.x) * tension) / 3;
    const cp1y = p1.y + ((p2.y - p0.y) * tension) / 3;
    const cp2x = p2.x - ((p3.x - p1.x) * tension) / 3;
    const cp2y = p2.y - ((p3.y - p1.y) * tension) / 3;

    path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x} ${p2.y}`;
  }

  return path;
}

/**
 * Master dispatcher for SVG path generation based on selected curve style
 */
export function generateSvgPath(points, curveType = 'linear') {
  if (!points || points.length === 0) return '';
  
  switch (curveType) {
    case 'simple curve':
      return getSimpleCurvePath(points);
    case 'quadratic bezier':
      return getQuadraticBezierPath(points);
    case 'cubic bezier':
      return getCubicBezierPath(points);
    case 'catmull rom':
      return getCatmullRomPath(points);
    case 'linear':
    default:
      return getLinearPath(points);
  }
}
