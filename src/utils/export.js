/**
 * Export helpers for Vector SVG and High-Res PNG
 */

export function downloadSVG(svgElement, filename = 'keyglyph-signature.svg', isDark = true) {
  if (!svgElement) return;

  const rect = svgElement.getBoundingClientRect();
  const width = Math.max(rect.width || svgElement.clientWidth || 800, 300);
  const height = Math.max(rect.height || svgElement.clientHeight || 450, 200);

  const clone = svgElement.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', width);
  clone.setAttribute('height', height);
  clone.setAttribute('viewBox', `0 0 ${width} ${height}`);

  // Insert background rect so white signatures are clearly visible in external image viewers
  const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bgRect.setAttribute('width', '100%');
  bgRect.setAttribute('height', '100%');
  bgRect.setAttribute('fill', isDark ? '#000000' : '#ffffff');
  clone.insertBefore(bgRect, clone.firstChild);

  // Remove any leftover dash styling on path
  const paths = clone.querySelectorAll('path');
  paths.forEach((p) => {
    p.removeAttribute('style');
    p.removeAttribute('stroke-dasharray');
    p.removeAttribute('stroke-dashoffset');
  });

  const svgData = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function copySVGToClipboard(svgElement, isDark = true) {
  if (!svgElement) return false;

  const rect = svgElement.getBoundingClientRect();
  const width = Math.max(rect.width || svgElement.clientWidth || 800, 300);
  const height = Math.max(rect.height || svgElement.clientHeight || 450, 200);

  const clone = svgElement.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', width);
  clone.setAttribute('height', height);
  clone.setAttribute('viewBox', `0 0 ${width} ${height}`);

  const paths = clone.querySelectorAll('path');
  paths.forEach((p) => {
    p.removeAttribute('style');
    p.removeAttribute('stroke-dasharray');
    p.removeAttribute('stroke-dashoffset');
  });

  const svgData = new XMLSerializer().serializeToString(clone);
  try {
    await navigator.clipboard.writeText(svgData);
    return true;
  } catch (err) {
    return false;
  }
}

export function downloadPNG(svgElement, filename = 'keyglyph-signature.png', scale = 2, isDark = true) {
  if (!svgElement) return;

  const rect = svgElement.getBoundingClientRect();
  const width = Math.max(rect.width || svgElement.clientWidth || 800, 300);
  const height = Math.max(rect.height || svgElement.clientHeight || 450, 200);

  const clone = svgElement.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', width);
  clone.setAttribute('height', height);
  clone.setAttribute('viewBox', `0 0 ${width} ${height}`);

  const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bgRect.setAttribute('width', '100%');
  bgRect.setAttribute('height', '100%');
  bgRect.setAttribute('fill', isDark ? '#000000' : '#ffffff');
  clone.insertBefore(bgRect, clone.firstChild);

  const paths = clone.querySelectorAll('path');
  paths.forEach((p) => {
    p.removeAttribute('style');
    p.removeAttribute('stroke-dasharray');
    p.removeAttribute('stroke-dashoffset');
  });

  const svgData = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const URLObj = window.URL || window.webkitURL || window;
  const blobURL = URLObj.createObjectURL(svgBlob);

  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = isDark ? '#000000' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const pngUrl = URLObj.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URLObj.revokeObjectURL(pngUrl);
    }, 'image/png');

    URLObj.revokeObjectURL(blobURL);
  };
  image.src = blobURL;
}

export async function recordReplayVideo(
  svgElement,
  filename = 'keyglyph-replay.webm',
  isDark = true,
  durationMs = 2200
) {
  if (!svgElement) return;

  const rect = svgElement.getBoundingClientRect();
  const width = Math.max(rect.width || 800, 300) * 1.5;
  const height = Math.max(rect.height || 450, 200) * 1.5;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const clone = svgElement.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', width);
  clone.setAttribute('height', height);
  clone.setAttribute('viewBox', `0 0 ${width / 1.5} ${height / 1.5}`);

  const paths = clone.querySelectorAll('path');
  const pathData = Array.from(paths).map((p) => {
    let len = 1000;
    try {
      len = p.getTotalLength() || 1000;
    } catch (e) {}
    return { element: p, length: len };
  });

  const stream = canvas.captureStream(60);
  const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
    ? 'video/webm;codecs=vp9'
    : MediaRecorder.isTypeSupported('video/webm')
    ? 'video/webm'
    : 'video/mp4';

  const mediaRecorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 4000000,
  });

  const chunks = [];
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  const recordingPromise = new Promise((resolve) => {
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      resolve();
    };
  });

  mediaRecorder.start();

  const startTime = performance.now();
  const URLObj = window.URL || window.webkitURL || window;

  const renderFrame = async () => {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(1, elapsed / durationMs);

    pathData.forEach(({ element, length }) => {
      const offset = length * (1 - progress);
      element.setAttribute('stroke-dasharray', length);
      element.setAttribute('stroke-dashoffset', offset);
    });

    const svgString = new XMLSerializer().serializeToString(clone);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const imgUrl = URLObj.createObjectURL(svgBlob);

    await new Promise((res) => {
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = isDark ? '#000000' : '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        URLObj.revokeObjectURL(imgUrl);
        res();
      };
      img.onerror = () => {
        URLObj.revokeObjectURL(imgUrl);
        res();
      };
      img.src = imgUrl;
    });

    if (progress < 1) {
      requestAnimationFrame(renderFrame);
    } else {
      setTimeout(() => {
        mediaRecorder.stop();
      }, 500);
    }
  };

  requestAnimationFrame(renderFrame);
  return recordingPromise;
}
