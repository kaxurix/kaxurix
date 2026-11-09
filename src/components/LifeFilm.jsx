import { useCallback, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import PhotoRail from "./PhotoRail";
import StoryLightbox from "./StoryLightbox";
import { JournalImage } from "./Visuals";
import { formatDate } from "../utils/formatDate";

export default function LifeFilm({ activities }) {
  const [active, setActive] = useState(null);
  const opener = useRef(null);
  const dismiss = useCallback(() => {
    setActive(null);
    // Native dialog restores focus; keep a fallback for a clicked loop copy.
    opener.current?.focus({ preventScroll: true });
  }, []);
  const open = (event, index) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    opener.current = event.currentTarget;
    setActive(index);
  };
  return (
    <>
      <PhotoRail label="Life" theme="life" autoRoll suspended={active !== null}>
        {activities.map((activity, index) => (
          <article
            className={`journal-item gallery-entry${activity.isPlaceholder ? " journal-slot" : ""}`}
            key={activity.slug}
          >
            <a
              className="journal-image-link film-frame"
              href={`/life/${activity.slug}`}
              aria-haspopup="dialog"
              onClick={(event) => open(event, index)}
              aria-label={
                activity.isPlaceholder
                  ? `Unpublished ${activity.kind === "certificate" ? "certificate" : "photo and story"} slot: ${activity.title}`
                  : `Read ${activity.title}`
              }
            >
              <JournalImage activity={activity} index={index} />
              <span className="film-frame-edge mono" aria-hidden="true">
                <span className="film-frame-number">{String(index + 1).padStart(2, "0")} <Play size={8} fill="currentColor" aria-hidden="true" /></span>
                <span>{formatDate(activity.date)} / LIFE</span>
              </span>
              <span className="film-open-label mono" aria-hidden="true">
                View frame <ArrowUpRight size={15} />
              </span>
            </a>
            <p className="gallery-meta mono">
              {activity.isPlaceholder
                ? activity.kind === "certificate"
                  ? "Certificate to add"
                  : "Foto & cerita menyusul"
                : activity.category}
            </p>
            <h3>
              <a href={`/life/${activity.slug}`}>
                {activity.title}
                {!activity.isPlaceholder && (
                  <ArrowUpRight size={22} aria-hidden="true" />
                )}
              </a>
            </h3>
          </article>
        ))}
      </PhotoRail>
      {active !== null && (
        <StoryLightbox
          activities={activities}
          active={active}
          onChange={setActive}
          onDismiss={dismiss}
        />
      )}
    </>
  );
}
