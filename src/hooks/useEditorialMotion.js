import { useEffect } from "react";

export default function useEditorialMotion() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: no-preference)");
    const seen = new WeakSet();
    const animations = new Set();
    let observer;

    const settle = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const configure = () => {
      observer?.disconnect();
      settle();
      if (!preference.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting || seen.has(target)) return;
          seen.add(target);
          observer.unobserve(target);
          // Only soften the heading's appearance; nothing shifts during scrolling.
          const animation = target.animate([
            { opacity: 0.84 },
            { opacity: 1 },
          ], { duration: 480, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
          animation.id = "section-intro";
          animations.add(animation);
          animation.onfinish = () => {
            animations.delete(animation);
            animation.cancel();
          };
        });
      }, { threshold: 0.35 });
      document.querySelectorAll(
        ".human-layout > h2, .section-heading-row, .page-intro > h1, .about-intro h1, .footer-main > h2",
      ).forEach((element) => observer.observe(element));
    };
    const focus = (event) => {
      animations.forEach((animation) => {
        if (animation.effect.target.contains(event.target)) {
          animation.cancel();
          animations.delete(animation);
        }
      });
    };

    configure();
    preference.addEventListener("change", configure);
    document.addEventListener("focusin", focus);
    document.addEventListener("visibilitychange", settle);
    return () => {
      observer?.disconnect();
      settle();
      preference.removeEventListener("change", configure);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("visibilitychange", settle);
    };
  }, []);
}
