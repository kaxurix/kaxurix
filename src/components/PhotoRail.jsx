import { Children, useEffect, useId, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import useFilmRoll from "../hooks/useFilmRoll";

export default function PhotoRail({
  label,
  theme,
  children,
  autoRoll = false,
  suspended = false,
}) {
  const id = useId();
  const { rail, looping, copies, paused, toggle, hold, cycle } = useFilmRoll(
    autoRoll,
    suspended,
  );
  const items = Children.toArray(children);
  const [edges, setEdges] = useState({ previous: false, next: false });

  useEffect(() => {
    const element = rail.current;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const previous = element.scrollLeft > 2;
      const next =
        element.scrollLeft + element.clientWidth < element.scrollWidth - 2;
      setEdges((current) =>
        current.previous === previous && current.next === next
          ? current
          : { previous, next },
      );
    };
    const queueMeasure = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(queueMeasure);
    observer.observe(element);
    observer.observe(element.firstElementChild);
    element.addEventListener("scroll", queueMeasure, { passive: true });
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      element.removeEventListener("scroll", queueMeasure);
    };
  }, [rail]);

  useEffect(() => {
    const element = rail.current;
    let startX = 0;
    let startScroll = 0;
    let pointer = null;
    let moved = false;
    const down = (event) => {
      // Touch retains the browser's native momentum and vertical page scrolling.
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      pointer = event.pointerId;
      startX = event.clientX;
      startScroll = element.scrollLeft;
      moved = false;
    };
    const move = (event) => {
      if (pointer !== event.pointerId) return;
      const delta = event.clientX - startX;
      if (!moved && Math.abs(delta) < 6) return;
      if (!moved) {
        moved = true;
        element.setPointerCapture(pointer);
        element.classList.add("is-dragging");
      }
      event.preventDefault();
      element.scrollTo({ left: startScroll - delta, behavior: "instant" });
    };
    const up = (event) => {
      if (pointer !== event.pointerId) return;
      if (element.hasPointerCapture(pointer))
        element.releasePointerCapture(pointer);
      element.classList.remove("is-dragging");
      pointer = null;
    };
    const click = (event) => {
      if (!moved) return;
      moved = false;
      event.preventDefault();
      event.stopPropagation();
    };
    element.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    element.addEventListener("click", click, true);
    return () => {
      element.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      element.removeEventListener("click", click, true);
    };
  }, [rail]);

  const move = (direction) => {
    const element = rail.current;
    const item = element.querySelector(".photo-rail-item");
    if (!item) return;
    const gap =
      parseFloat(getComputedStyle(element.firstElementChild).columnGap) || 0;
    hold();
    const distance = item.getBoundingClientRect().width + gap;
    if (looping && cycle()) {
      if (direction < 0 && element.scrollLeft < distance)
        element.scrollTo({
          left: element.scrollLeft + cycle(),
          behavior: "instant",
        });
      if (
        direction > 0 &&
        element.scrollLeft + distance >
          element.scrollWidth - element.clientWidth
      )
        element.scrollTo({
          left: element.scrollLeft % cycle(),
          behavior: "instant",
        });
    }
    element.scrollBy({
      left: direction * distance,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <div className={`photo-gallery photo-gallery--${theme}`}>
      <div
        ref={rail}
        id={id}
        className={`photo-rail${looping ? " is-looping" : ""}`}
        role="region"
        aria-label={`${label} photo gallery`}
        aria-describedby={`${id}-help`}
        tabIndex={0}
        onDragStart={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if (
            event.target !== event.currentTarget ||
            !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
          )
            return;
          event.preventDefault();
          if (event.key === "Home" || event.key === "End") {
            hold();
            event.currentTarget.scrollTo({
              left:
                event.key === "Home"
                  ? 0
                  : (cycle() || event.currentTarget.scrollWidth) -
                    event.currentTarget.clientWidth,
              behavior: "instant",
            });
            return;
          }
          move(event.key === "ArrowRight" ? 1 : -1);
        }}
      >
        <ul className="photo-rail-track">
          {items.map((child, index) => (
            <li className="photo-rail-item" key={`frame-${index}`}>
              {child}
            </li>
          ))}
          {looping &&
            Array.from({ length: copies }, (_, copy) =>
              items.map((child, index) => (
                <li
                  className="photo-rail-item"
                  data-film-copy="true"
                  aria-hidden="true"
                  key={`copy-${copy}-${index}`}
                >
                  {child}
                </li>
              )),
            )}
        </ul>
      </div>
      <div className="photo-rail-toolbar">
        <span className="gallery-hint mono" id={`${id}-help`}>
          Drag to explore · open a frame
          <span className="sr-only">
            . Gunakan tombol panah kiri dan kanan saat galeri terfokus.
          </span>
        </span>
        <div className="gallery-controls">
          {looping && (
            <button
              type="button"
              aria-label={`${paused ? "Resume" : "Pause"} ${label} film`}
              aria-controls={id}
              aria-pressed={paused}
              onClick={toggle}
            >
              {paused ? (
                <Play size={18} aria-hidden="true" />
              ) : (
                <Pause size={18} aria-hidden="true" />
              )}
            </button>
          )}
          <button
            type="button"
            aria-label={`Previous ${label} photo`}
            aria-controls={id}
            disabled={!looping && !edges.previous}
            onClick={() => move(-1)}
          >
            <ArrowLeft size={19} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Next ${label} photo`}
            aria-controls={id}
            disabled={!looping && !edges.next}
            onClick={() => move(1)}
          >
            <ArrowRight size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
