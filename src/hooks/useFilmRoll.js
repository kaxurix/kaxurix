import { useEffect, useRef, useState } from "react";

const SPEED = 24; // pixels per second
const INTERACTION_DELAY = 3500;

export default function useFilmRoll(enabled, suspended = false) {
  const rail = useRef(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [copies, setCopies] = useState(1);
  const control = useRef(null);
  const cycle = useRef(0);
  const looping = enabled && motionAllowed;

  useEffect(() => {
    if (!enabled) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, [enabled]);

  useEffect(() => {
    const element = rail.current;
    if (!looping) {
      element.dataset.rolling = "false";
      return;
    }

    const track = element.firstElementChild;
    // Visual copies must never repeat links in the keyboard or accessibility tree.
    track
      .querySelectorAll(
        "[data-film-copy] a, [data-film-copy] button, [data-film-copy] [tabindex]",
      )
      .forEach((node) => {
        node.tabIndex = -1;
      });

    let frame = 0;
    let timer = 0;
    let lastTime = 0;
    let position = element.scrollLeft;
    let visible = false;
    let focused = element.contains(document.activeElement);
    let pressed = false;
    let resumeAt = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      element.dataset.rolling = "false";
    };

    const tick = (time) => {
      if (lastTime) position += (Math.min(time - lastTime, 50) * SPEED) / 1000;
      lastTime = time;
      position %= cycle.current;
      element.scrollLeft = position;
      frame = requestAnimationFrame(tick);
    };

    const sync = () => {
      clearTimeout(timer);
      if (
        paused ||
        suspended ||
        !visible ||
        document.hidden ||
        focused ||
        pressed ||
        !cycle.current
      ) {
        stop();
        return;
      }
      const delay = resumeAt - performance.now();
      if (delay > 0) {
        stop();
        timer = setTimeout(sync, delay);
        return;
      }
      if (!frame) {
        position = element.scrollLeft % cycle.current;
        element.scrollLeft = position;
        element.dataset.rolling = "true";
        frame = requestAnimationFrame(tick);
      }
    };

    const hold = () => {
      resumeAt = performance.now() + INTERACTION_DELAY;
      stop();
      sync();
    };

    const measure = () => {
      const original = track.querySelector(".photo-rail-item");
      const copy = track.querySelector("[data-film-copy]");
      cycle.current =
        copy && original ? copy.offsetLeft - original.offsetLeft : 0;
      if (cycle.current) {
        const needed = Math.max(
          1,
          Math.ceil(element.clientWidth / cycle.current),
        );
        setCopies((current) => (current === needed ? current : needed));
      }
      track
        .querySelectorAll(
          "[data-film-copy] a, [data-film-copy] button, [data-film-copy] [tabindex]",
        )
        .forEach((node) => {
          node.tabIndex = -1;
        });
      stop();
      sync();
    };
    const down = () => {
      pressed = true;
      hold();
    };
    const up = () => {
      if (pressed) {
        pressed = false;
        hold();
      }
    };
    const focusIn = () => {
      focused = true;
      sync();
    };
    const focusOut = (event) => {
      focused = element.contains(event.relatedTarget);
      sync();
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    const size = new ResizeObserver(measure);
    visibility.observe(element);
    size.observe(element);
    size.observe(track);
    element.addEventListener("pointerdown", down, { passive: true });
    element.addEventListener("wheel", hold, { passive: true });
    element.addEventListener("focusin", focusIn);
    element.addEventListener("focusout", focusOut);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    document.addEventListener("visibilitychange", sync);
    control.current = { hold };
    measure();

    return () => {
      stop();
      clearTimeout(timer);
      visibility.disconnect();
      size.disconnect();
      element.removeEventListener("pointerdown", down);
      element.removeEventListener("wheel", hold);
      element.removeEventListener("focusin", focusIn);
      element.removeEventListener("focusout", focusOut);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      document.removeEventListener("visibilitychange", sync);
      control.current = null;
    };
  }, [looping, paused, suspended, rail]);

  return {
    rail,
    looping,
    copies,
    paused,
    toggle: () => setPaused((current) => !current),
    hold: () => control.current?.hold(),
    cycle: () => cycle.current,
  };
}
