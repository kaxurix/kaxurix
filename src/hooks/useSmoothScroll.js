import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function useSmoothScroll() {
  const scroller = useRef(null);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: no-preference)");
    const mobile = matchMedia("(max-width: 760px)");
    const syncDialog = () => {
      if (document.body.style.overflow === "hidden") scroller.current?.stop();
      else scroller.current?.start();
    };
    const configure = () => {
      scroller.current?.destroy();
      scroller.current = null;
      if (!preference.matches) return;
      scroller.current = new Lenis({
        autoRaf: true,
        lerp: mobile.matches ? 0.1 : 0.12,
        smoothWheel: true,
        wheelMultiplier: mobile.matches ? 0.9 : 1,
        syncTouch: mobile.matches,
        touchMultiplier: 1,
        syncTouchLerp: 0.075,
        touchInertiaExponent: 1.4,
        anchors: { offset: -24 },
        prevent: (node) => node.matches("dialog, .story-copy, textarea, select, [data-lenis-prevent]"),
        // Keep horizontal gallery gestures, pinch zoom, and Shift+wheel native.
        virtualScroll: ({ event, deltaX, deltaY }) =>
          !event.shiftKey && !(event.touches?.length > 1) && Math.abs(deltaX) <= Math.abs(deltaY),
      });
      syncDialog();
    };
    configure();
    preference.addEventListener("change", configure);
    mobile.addEventListener("change", configure);
    const observer = new MutationObserver(syncDialog);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", configure);
      mobile.removeEventListener("change", configure);
      scroller.current?.destroy();
      scroller.current = null;
    };
  }, []);

  return scroller;
}
