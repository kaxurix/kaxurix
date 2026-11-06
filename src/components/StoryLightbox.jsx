import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import StoryImageViewer from "./StoryImageViewer";
import { formatDate } from "../utils/formatDate";
import { TextLink } from "./Shell";

export default function StoryLightbox({
  activities,
  active,
  onChange,
  onDismiss,
}) {
  const dialog = useRef(null);
  const activity = activities[active];
  const step = (direction) =>
    onChange((active + direction + activities.length) % activities.length);
  const dismiss = () => {
    // Close the modal before restoring focus outside its inert background.
    dialog.current.close();
    onDismiss();
  };
  useEffect(() => {
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    const padding = document.body.style.paddingRight;
    const scrollbar = innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar) document.body.style.paddingRight = `${scrollbar}px`;
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = padding;
    };
  }, []);
  useEffect(() => {
    dialog.current.scrollTo({ top: 0, behavior: "instant" });
    dialog.current
      .querySelector(".story-copy")
      .scrollTo({ top: 0, behavior: "instant" });
  }, [active]);
  return (
    <dialog
      ref={dialog}
      className="story-lightbox"
      aria-labelledby="story-title"
      aria-describedby="story-description"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          dismiss();
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          const controls = event.currentTarget.querySelectorAll(
            'button:not([disabled]), a[href], [tabindex="0"]',
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
          return;
        }
        if (
          !["ArrowLeft", "ArrowRight"].includes(event.key) ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey
        )
          return;
        event.preventDefault();
        step(event.key === "ArrowRight" ? 1 : -1);
      }}
    >
      <div className="story-topbar">
        <span className="mono" aria-live="polite">
          FRAME {String(active + 1).padStart(2, "0")} /{" "}
          {String(activities.length).padStart(2, "0")}
        </span>
        <button type="button" onClick={dismiss} aria-label="Close photo story">
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      <div className="story-spread">
        <StoryImageViewer key={activity.slug} activity={activity} index={active} />
        <article className="story-copy">
          <p className="story-category mono">
            {activity.category} / {formatDate(activity.date)}
          </p>
          <h2 id="story-title">{activity.title}</h2>
          <p id="story-description">{activity.description}</p>
          {activity.content.map((section) => (
            <section key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </section>
          ))}
          {activity.kind === "certificate" && activity.live && (
            <TextLink href={activity.live} external>
              View certificate
            </TextLink>
          )}
        </article>
      </div>
      <div className="story-bottom-bar">
        <span className="mono">KAXURIX / LIFE</span>
        <div>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous story"
          >
            <ArrowLeft size={19} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next story">
            <ArrowRight size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
    </dialog>
  );
}
