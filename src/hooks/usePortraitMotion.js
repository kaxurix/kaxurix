import { useEffect } from "react";

export default function usePortraitMotion(scene) {
  useEffect(() => {
    const element = scene.current;
    const preference = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const floats = [...element.querySelectorAll(".portrait-satellite-float")];
    const satellites = [...element.querySelectorAll(".portrait-satellite")];
    const hovered = new Set();
    let animations = [];
    let frame = 0, lastTime = 0;
    let visible = false;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    const render = () => {
      element.style.setProperty("--portrait-x", x.toFixed(4));
      element.style.setProperty("--portrait-y", y.toFixed(4));
    };
    const draw = (time) => {
      frame = 0;
      if (!preference.matches || !visible || document.hidden) return;
      const blend = 1 - Math.exp(-Math.min(lastTime ? time - lastTime : 16, 40) / 90);
      lastTime = time;
      x += (targetX - x) * blend;
      y += (targetY - y) * blend;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) < 0.001) {
        x = targetX; y = targetY;
      } else {
        frame = requestAnimationFrame(draw);
      }
      render();
    };
    const queue = () => {
      if (!frame && visible && preference.matches && !document.hidden) {
        lastTime = 0;
        frame = requestAnimationFrame(draw);
      }
    };
    const reset = () => { targetX = targetY = 0; queue(); };
    const syncSatellites = () => {
      if (reduced.matches) {
        animations.forEach((animation) => animation.cancel());
        animations = [];
      } else if (visible && !animations.length) {
        animations = floats.map((float, index) => {
          const rear = satellites[index].classList.contains("is-back");
          const bottom = parseFloat(satellites[index].style.getPropertyValue("--satellite-y")) > 85;
          const amplitude = bottom ? 12 : rear ? 14 : 26;
          const sway = index % 2 ? 8 : -8;
          const animation = float.animate([
            { transform: "perspective(600px) translate3d(0, 0, 0) rotate(-2deg) rotateY(-5deg)" },
            { transform: `perspective(600px) translate3d(${sway}px, ${-amplitude}px, 0) rotate(4deg) rotateY(8deg)`, offset: 0.35 },
            { transform: `perspective(600px) translate3d(${-sway * 0.6}px, ${amplitude * 0.55}px, 0) rotate(-3deg) rotateY(-4deg)`, offset: 0.72 },
            { transform: "perspective(600px) translate3d(0, 0, 0) rotate(-2deg) rotateY(-5deg)" },
          ], { duration: 7000 + (index % 5) * 1100, delay: -index * 1330, iterations: Infinity, easing: "ease-in-out" });
          animation.id = "portrait-drift";
          animation.pause();
          return animation;
        });
      }
      const running = visible && !document.hidden && !reduced.matches;
      animations.forEach((animation, index) => running && !hovered.has(index) ? animation.play() : animation.pause());
      element.dataset.satellitesRunning = String(running);
    };
    const satelliteListeners = satellites.map((satellite, index) => {
      const enter = (event) => {
        if (event.pointerType !== "mouse" || !preference.matches) return;
        hovered.add(index);
        syncSatellites();
      };
      const leave = () => { hovered.delete(index); syncSatellites(); };
      satellite.addEventListener("pointerenter", enter);
      satellite.addEventListener("pointerleave", leave);
      return () => {
        satellite.removeEventListener("pointerenter", enter);
        satellite.removeEventListener("pointerleave", leave);
      };
    });
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (!preference.matches || !visible || document.hidden) {
        hovered.clear();
        x = y = targetX = targetY = 0;
        render();
      }
      element.dataset.portraitInteractive = String(preference.matches && visible && !document.hidden);
      syncSatellites();
    };
    const move = (event) => {
      if (event.pointerType !== "mouse" || !preference.matches) return;
      const bounds = element.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      targetY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      queue();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(element);
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", reset);
    preference.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      animations.forEach((animation) => animation.cancel());
      satelliteListeners.forEach((remove) => remove());
      observer.disconnect();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      preference.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [scene]);
}
