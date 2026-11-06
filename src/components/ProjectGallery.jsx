import { useState } from "react";
import { ExperimentCover, ProjectCover } from "./Visuals";
import { getProjectImages } from "../utils/projectImages";

export default function ProjectGallery({ project, collection = "work" }) {
  const images = getProjectImages(project);
  const [active, setActive] = useState(0);
  if (!images.length)
    return collection === "lab" ? (
      <ExperimentCover
        experiment={project}
        className="work-detail-placeholder"
      />
    ) : (
      <ProjectCover project={project} className="work-detail-placeholder" />
    );
  const multiple = images.length > 1;
  const image = images[active];
  return (
    <div
      className="project-gallery"
      role="region"
      aria-label={`${project.title} screenshots`}
      tabIndex={multiple ? 0 : undefined}
      onKeyDown={(event) => {
        if (
          event.target !== event.currentTarget ||
          !multiple ||
          !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
        )
          return;
        event.preventDefault();
        setActive((current) =>
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? images.length - 1
              : (current +
                  (event.key === "ArrowRight" ? 1 : -1) +
                  images.length) %
                images.length,
        );
      }}
    >
      <div className="project-gallery-stage">
        <img
          src={image.src}
          alt={image.alt || `${project.title} screenshot ${active + 1}`}
          width="1600"
          height="900"
          loading="eager"
          decoding="async"
        />
      </div>
      {multiple && (
        <>
          <p className="sr-only" aria-live="polite">
            Screenshot {active + 1} of {images.length}
          </p>
          <div
            className="project-thumbnails"
            role="group"
            aria-label="Choose a screenshot"
          >
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                aria-label={`View screenshot ${index + 1} of ${images.length}`}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <img
                  src={image.src}
                  alt=""
                  width="160"
                  height="90"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
          <noscript>
            <div className="project-thumbnails">
              {images.slice(1).map((image, index) => (
                <a
                  key={`${image.src}-${index}`}
                  href={image.src}
                  aria-label={`View screenshot ${index + 2} of ${images.length}`}
                >
                  <img
                    src={image.src}
                    alt={
                      image.alt || `${project.title} screenshot ${index + 2}`
                    }
                    width="160"
                    height="90"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </noscript>
        </>
      )}
    </div>
  );
}
