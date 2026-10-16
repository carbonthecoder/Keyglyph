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

export function downloadJPG(svgElement, filename = 'keyglyph-signature.jpg', scale = 2, isDark = true) {
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
      const url = URLObj.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URLObj.revokeObjectURL(url);
    }, 'image/jpeg', 0.95);

    URLObj.revokeObjectURL(blobURL);
  };
  image.src = blobURL;
}

export function downloadWebP(svgElement, filename = 'keyglyph-signature.webp', scale = 2, isDark = true) {
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
      const url = URLObj.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URLObj.revokeObjectURL(url);
    }, 'image/webp', 0.95);

    URLObj.revokeObjectURL(blobURL);
  };
  image.src = blobURL;
}

export function downloadPDF(svgElement, filename = 'keyglyph-signature.pdf', isDark = true) {
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
    canvas.width = width * 2;
    canvas.height = height * 2;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = isDark ? '#000000' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const arrayBuffer = await blob.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const ptWidth = Math.round(width * 0.75);
      const ptHeight = Math.round(height * 0.75);

      const header = `%PDF-1.4\n`;
      const obj1 = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
      const obj2 = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
      const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${ptWidth} ${ptHeight}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`;
      const obj4Head = `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`;
      const obj4Tail = `\nendstream\nendobj\n`;
      const contentStream = `q\n${ptWidth} 0 0 ${ptHeight} 0 0 cm\n/Im0 Do\nQ\n`;
      const obj5 = `5 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}endstream\nendobj\n`;

      const enc = new TextEncoder();
      const bHeader = enc.encode(header);
      const bObj1 = enc.encode(obj1);
      const bObj2 = enc.encode(obj2);
      const bObj3 = enc.encode(obj3);
      const bObj4Head = enc.encode(obj4Head);
      const bObj4Tail = enc.encode(obj4Tail);
      const bObj5 = enc.encode(obj5);

      let offset = bHeader.length;
      const o1 = offset; offset += bObj1.length;
      const o2 = offset; offset += bObj2.length;
      const o3 = offset; offset += bObj3.length;
      const o4 = offset; offset += bObj4Head.length + bytes.length + bObj4Tail.length;
      const o5 = offset; offset += bObj5.length;

      const pad10 = (n) => String(n).padStart(10, '0');
      const xref = `xref\n0 6\n0000000000 65535 f \n${pad10(o1)} 00000 n \n${pad10(o2)} 00000 n \n${pad10(o3)} 00000 n \n${pad10(o4)} 00000 n \n${pad10(o5)} 00000 n \n`;
      const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${offset}\n%%EOF\n`;
      const bXref = enc.encode(xref);
      const bTrailer = enc.encode(trailer);

      const totalSize = offset + bXref.length + bTrailer.length;
      const pdf = new Uint8Array(totalSize);
      let p = 0;
      pdf.set(bHeader, p); p += bHeader.length;
      pdf.set(bObj1, p); p += bObj1.length;
      pdf.set(bObj2, p); p += bObj2.length;
      pdf.set(bObj3, p); p += bObj3.length;
      pdf.set(bObj4Head, p); p += bObj4Head.length;
      pdf.set(bytes, p); p += bytes.length;
      pdf.set(bObj4Tail, p); p += bObj4Tail.length;
      pdf.set(bObj5, p); p += bObj5.length;
      pdf.set(bXref, p); p += bXref.length;
      pdf.set(bTrailer, p);

      const pdfBlob = new Blob([pdf], { type: 'application/pdf' });
      const pdfUrl = URLObj.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URLObj.revokeObjectURL(pdfUrl);
    }, 'image/jpeg', 0.96);

    URLObj.revokeObjectURL(blobURL);
  };
  image.src = blobURL;
}

export async function recordReplayVideo(
  svgElement,
  filename = 'keyglyph-replay',
  isDark = true,
  format = 'mp4',
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

  let mimeType = 'video/webm';
  let ext = 'webm';

  if (format === 'mp4') {
    if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1')) {
      mimeType = 'video/mp4;codecs=avc1';
      ext = 'mp4';
    } else if (MediaRecorder.isTypeSupported('video/mp4')) {
      mimeType = 'video/mp4';
      ext = 'mp4';
    } else {
      mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';
      ext = 'webm';
    }
  } else {
    mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : 'video/webm';
    ext = 'webm';
  }

  const baseName = filename.replace(/\.(mp4|webm)$/i, '');
  const finalFilename = `${baseName}.${ext}`;

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
      link.download = finalFilename;
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
