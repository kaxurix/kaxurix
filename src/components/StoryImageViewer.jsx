import { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { JournalImage } from "./Visuals";

export default function StoryImageViewer({ activity, index }) {
  const [zoomed, setZoomed] = useState(false);
  const viewport = useRef(null);
  const drag = useRef(null);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    element.scrollTo({
      left: (element.scrollWidth - element.clientWidth) / 2,
      top: (element.scrollHeight - element.clientHeight) / 2,
      behavior: "instant",
    });
  }, [zoomed]);

  if (!activity.coverImage) {
    return <div className="story-image"><JournalImage activity={activity} index={index} /></div>;
  }

  return (
    <div className="story-image story-image-viewer">
      <div className="story-image-tools">
        <span className="mono">{zoomed ? "Drag to explore" : "Full image"}</span>
        <button
          type="button"
          aria-label={zoomed ? "Reset image zoom" : "Zoom in image"}
          aria-pressed={zoomed}
          onClick={() => setZoomed((value) => !value)}
        >
          {zoomed ? <ZoomOut size={18} aria-hidden="true" /> : <ZoomIn size={18} aria-hidden="true" />}
          <span>{zoomed ? "Fit" : "Zoom"}</span>
        </button>
      </div>
      <div
        ref={viewport}
        className={`story-image-viewport${zoomed ? " is-zoomed" : ""}`}
        role="region"
        aria-label="Image preview"
        tabIndex={zoomed ? 0 : undefined}
        data-lenis-prevent
        onKeyDown={(event) => {
          // Arrow keys pan the image rather than navigating to another story.
          if (zoomed && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) event.stopPropagation();
        }}
        onPointerDown={(event) => {
          if (!zoomed || event.pointerType !== "mouse" || event.button !== 0) return;
          drag.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, top: event.currentTarget.scrollTop };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          event.currentTarget.scrollLeft = drag.current.left + drag.current.x - event.clientX;
          event.currentTarget.scrollTop = drag.current.top + drag.current.y - event.clientY;
        }}
        onLostPointerCapture={() => { drag.current = null; }}
        onPointerUp={(event) => {
          drag.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => { drag.current = null; }}
      >
        <div className="story-image-canvas" style={{ width: zoomed ? "250%" : "100%", height: zoomed ? "250%" : "100%" }}>
          <img src={activity.coverImage} alt={activity.imageAlt || activity.title} draggable={false} />
        </div>
      </div>
    </div>
  );
}
