/**
 * Export helpers for Vector SVG and High-Res PNG
 */

export function downloadSVG(svgElement, filename = 'keyboard-signature.svg', withBackground = false, bgColor = '#090a0f') {
  if (!svgElement) return;

  const clone = svgElement.cloneNode(true);
  
  if (withBackground) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', bgColor);
    clone.insertBefore(rect, clone.firstChild);
  }

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

export function downloadPNG(svgElement, filename = 'keyboard-signature.png', scale = 2, withBackground = false, bgColor = '#090a0f') {
  if (!svgElement) return;

  const svgData = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const URLObj = window.URL || window.webkitURL || window;
  const blobURL = URLObj.createObjectURL(svgBlob);

  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement('canvas');
    const width = svgElement.clientWidth || 800;
    const height = svgElement.clientHeight || 450;

    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');

    if (withBackground) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

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
