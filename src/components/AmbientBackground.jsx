import { useEffect, useRef } from "react";
import "../ambient.css";

export default function AmbientBackground() {
  const surface = useRef(null);

  useEffect(() => {
    const element = surface.current;
    const preference = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let stop = () => {};

    const configure = () => {
      stop();
      if (!preference.matches) return;

      let frame = 0;
      let x = innerWidth * 0.65;
      let y = innerHeight * 0.35;
      let targetX = x;
      let targetY = y;
      const draw = () => {
        frame = 0;
        if (document.hidden) return;
        x += (targetX - x) * 0.12;
        y += (targetY - y) * 0.12;
        element.style.setProperty("--pointer-x", `${x}px`);
        element.style.setProperty("--pointer-y", `${y}px`);
        if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.2) {
          frame = requestAnimationFrame(draw);
        }
      };
      const move = (event) => {
        if (event.pointerType !== "mouse" || document.querySelector("dialog[open]")) return;
        element.dataset.hover = "true";
        targetX = event.clientX;
        targetY = event.clientY;
        if (!frame) frame = requestAnimationFrame(draw);
      };
      const reset = () => {
        delete element.dataset.hover;
        targetX = innerWidth * 0.65;
        targetY = innerHeight * 0.35;
        if (!frame) frame = requestAnimationFrame(draw);
      };
      const visibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      };
      element.dataset.interactive = "true";
      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", reset);
      window.addEventListener("resize", reset, { passive: true });
      document.addEventListener("visibilitychange", visibility);
      stop = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", reset);
        window.removeEventListener("resize", reset);
        document.removeEventListener("visibilitychange", visibility);
        delete element.dataset.interactive;
        delete element.dataset.hover;
        element.style.removeProperty("--pointer-x");
        element.style.removeProperty("--pointer-y");
      };
    };
    configure();
    preference.addEventListener("change", configure);
    return () => {
      stop();
      preference.removeEventListener("change", configure);
    };
  }, []);

  return <div className="ambient-background" ref={surface} aria-hidden="true" />;
}
