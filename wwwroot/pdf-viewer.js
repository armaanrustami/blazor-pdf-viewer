const PDFJS_VERSION = "4.4.168";
let pdfjs;
let state;

async function getPdfJs() {
  if (!pdfjs) {
    pdfjs = await import(`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.mjs`);
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.mjs`;
  }
  return pdfjs;
}

export async function load(container, canvas, url) {
  const api = await getPdfJs();
  const loadingTask = api.getDocument({ url, withCredentials: true });
  const pdf = await loadingTask.promise;
  state = { container, canvas, pdf, page: 1, zoom: 100 };
  await render();
  return { pageCount: pdf.numPages, zoomPercent: state.zoom };
}

async function render() {
  if (!state) return;
  const page = await state.pdf.getPage(state.page);
  const baseViewport = page.getViewport({ scale: 1 });
  const availableWidth = Math.max(240, state.container.clientWidth - 48);
  const fitScale = availableWidth / baseViewport.width;
  const scale = state.zoom === 100 ? fitScale : fitScale * state.zoom / 100;
  const viewport = page.getViewport({ scale });
  const ratio = window.devicePixelRatio || 1;
  const context = state.canvas.getContext("2d", { alpha: false });
  state.canvas.width = Math.floor(viewport.width * ratio);
  state.canvas.height = Math.floor(viewport.height * ratio);
  state.canvas.style.width = `${viewport.width}px`;
  state.canvas.style.height = `${viewport.height}px`;
  await page.render({ canvasContext: context, viewport, transform: ratio !== 1 ? [ratio, 0, 0, ratio, 0, 0] : null }).promise;
}

export async function goToPage(page) { if (state) { state.page = page; await render(); } }
export async function setZoom(percent) { if (state) { state.zoom = percent; await render(); } }
export async function fitWidth() { if (state) { state.zoom = 100; await render(); } return 100; }
export function print(url) { const frame = document.createElement("iframe"); frame.style.display = "none"; frame.src = url; document.body.appendChild(frame); frame.onload = () => { frame.contentWindow.print(); setTimeout(() => frame.remove(), 1000); }; }
export async function fullscreen(element) { if (document.fullscreenElement) await document.exitFullscreen(); else await element.requestFullscreen?.(); }
export function dispose() { state = undefined; }

window.addEventListener("resize", () => { if (state) render(); }, { passive: true });
