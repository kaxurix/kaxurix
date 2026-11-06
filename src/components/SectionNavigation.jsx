import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import useSmoothScroll from "../hooks/useSmoothScroll";
import "../section-navigation.css";

export default function SectionNavigation() {
  const scroller = useSmoothScroll();
  const sections = useRef([]);
  const [position, setPosition] = useState({ index: 0, labels: [] });

  useEffect(() => {
    const viewport = matchMedia("(min-width: 761px)");
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (!viewport.matches) return;
      const entries = sections.current;
      let index = 0;
      const threshold = Math.min(innerHeight * 0.25, 180);
      entries.forEach((section, candidate) => {
        if (section.getBoundingClientRect().top <= threshold) index = candidate;
      });
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 3) index = entries.length - 1;
      const labels = entries.map((section) => section.dataset.scrollSection);
      setPosition((current) => current.index === index && current.labels.join() === labels.join()
        ? current : { index, labels });
    };
    const queue = () => {
      if (!frame && viewport.matches) frame = requestAnimationFrame(measure);
    };
    sections.current = [...document.querySelectorAll("[data-scroll-section]")];
    const observer = new ResizeObserver(queue);
    observer.observe(document.body);
    sections.current.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });
    viewport.addEventListener("change", queue);
    queue();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      viewport.removeEventListener("change", queue);
    };
  }, []);

  const move = (direction) => {
    const index = Math.max(0, Math.min(sections.current.length - 1, position.index + direction));
    const target = sections.current[index];
    if (!target || document.querySelector("dialog[open]")) return;
    const limit = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const top = index === 0 ? 0 : Math.min(limit, Math.max(0, scrollY + target.getBoundingClientRect().top - 24));
    if (scroller.current) {
      // Ease in as well as out; longer journeys get more time to settle.
      const distance = Math.abs(top - scrollY);
      scroller.current.scrollTo(top, {
        duration: Math.min(1.65, Math.max(1, 0.85 + distance / 1600)),
        lerp: 0,
        easing: (progress) => (1 - Math.cos(Math.PI * progress)) / 2,
      });
    }
    else window.scrollTo({ top, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  if (position.labels.length < 2) return null;
  const { index, labels } = position;
  return (
    <nav className="section-navigation" aria-label="Section navigation">
      <div className="section-navigation-status">
        <span>{labels[index]}</span>
        <span className="mono">{String(index + 1).padStart(2, "0")} / {String(labels.length).padStart(2, "0")}</span>
      </div>
      <button type="button" onClick={() => move(-1)} disabled={index === 0}
        aria-label={`Previous section${index > 0 ? `: ${labels[index - 1]}` : ""}`}
        title={index > 0 ? `Previous: ${labels[index - 1]}` : "First section"}>
        <ArrowUp size={18} aria-hidden="true" />
      </button>
      <button type="button" onClick={() => move(1)} disabled={index === labels.length - 1}
        aria-label={`Next section${index < labels.length - 1 ? `: ${labels[index + 1]}` : ""}`}
        title={index < labels.length - 1 ? `Next: ${labels[index + 1]}` : "Last section"}>
        <ArrowDown size={18} aria-hidden="true" />
      </button>
    </nav>
  );
}
