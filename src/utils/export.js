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
