import {Pdf} from "../PdfDocument/Pdf";
import DotNetObject = DotNet.DotNetObject;

const activeGestures = new Map<string, { pointers: Map<number, PointerEvent>, startDistance: number, startScale: number }>();

function distance(a: PointerEvent, b: PointerEvent): number {
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

/** Enables two-finger pinch zoom on the PDF host. The final scale is snapped by the .NET Zoom model. */
export function enablePinchZoom(id: string, dotnetReference: DotNetObject): void {
    const host = document.getElementById(id);
    if (!host || activeGestures.has(id)) return;

    host.style.touchAction = "none";
    const pointers = new Map<number, PointerEvent>();
    let startDistance = 0;
    let startScale = 1;

    const begin = (event: PointerEvent) => {
        pointers.set(event.pointerId, event);
        if (pointers.size === 2) {
            const values = [...pointers.values()];
            const pdf = Pdf.getPdf(id);
            startDistance = distance(values[0], values[1]);
            startScale = pdf?.scale ?? 1;
            host.setPointerCapture?.(event.pointerId);
            event.preventDefault();
        }
    };

    const move = (event: PointerEvent) => {
        if (!pointers.has(event.pointerId)) return;
        pointers.set(event.pointerId, event);
        if (pointers.size === 2) event.preventDefault();
    };

    const end = async (event: PointerEvent) => {
        if (!pointers.has(event.pointerId)) return;
        pointers.delete(event.pointerId);
        if (pointers.size === 1 && startDistance > 0) {
            const remaining = [...pointers.values()][0];
            const released = event;
            const finalDistance = distance(remaining, released);
            const scale = Math.max(0.25, Math.min(5, startScale * finalDistance / startDistance));
            await dotnetReference.invokeMethodAsync("PinchZoomChanged", scale);
            startDistance = 0;
        }
    };

    host.addEventListener("pointerdown", begin, { passive: false });
    host.addEventListener("pointermove", move, { passive: false });
    host.addEventListener("pointerup", end, { passive: false });
    host.addEventListener("pointercancel", end, { passive: false });
    activeGestures.set(id, { pointers, startDistance, startScale });
}
