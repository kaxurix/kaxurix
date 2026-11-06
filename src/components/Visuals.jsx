import { Camera, Check } from "lucide-react";
import { person } from "../data/content";

export function Portrait({ className = "", priority = false }) {
  return (
    <div className={`portrait ${className}`}>
      {person.portrait ? (
        <img
          src={person.portrait}
          alt={person.name}
          width="1280"
          height="1920"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      ) : (
        <div className="portrait-placeholder">
          <Camera size={42} strokeWidth={1.2} aria-hidden="true" />
          <span>Foto Kautsar</span>
          <small className="mono">Portrait belum ditambahkan</small>
        </div>
      )}
    </div>
  );
}

export function ProjectCover({ project, className = "" }) {
  if (project.coverImage)
    return (
      <div className={`project-cover project-cover--screenshot ${className}`}>
        <img
          src={project.coverImage}
          alt={project.imageAlt || `${project.title} screenshot`}
          width="1200"
          height="800"
          loading="lazy"
        />
      </div>
    );
  return (
    <div
      className={`project-cover cover-${project.coverStyle} ${className}`}
      role="img"
      aria-label={`${project.title}: editorial cover placeholder, screenshot to be added`}
    >
      <span className="cover-top mono">{project.category}</span>
      <span className="cover-type">
        {project.coverTitle.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
      {project.coverStyle === "voting" && (
        <span className="ballot-mark" aria-hidden="true">
          <Check strokeWidth={3} />
        </span>
      )}
      {project.coverStyle === "idealibs" && (
        <span className="file-tab" aria-hidden="true">
          .idea
        </span>
      )}
      {project.coverStyle === "imhome" && (
        <svg
          className="house-outline"
          viewBox="0 0 120 130"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 60 60 10 110 60v60H10V60Zm30 60V75h40v45M10 60h100"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      )}
      <span className="cover-bottom mono">SCREENSHOT TO ADD</span>
    </div>
  );
}

export function ExperimentCover({ experiment, className = "" }) {
  return (
    <div
      className={`experiment-cover experiment-cover--${experiment.coverStyle} ${className}`}
    >
      {experiment.coverImage ? (
        <img
          src={experiment.coverImage}
          alt={experiment.imageAlt || `${experiment.title} screenshot`}
          width="1200"
          height="900"
          loading="lazy"
        />
      ) : (
        <>
          <span className="experiment-visual-label mono">
            SCREENSHOT PLACEHOLDER
          </span>
          <svg
            className="experiment-art"
            viewBox="0 0 360 250"
            fill="none"
            aria-hidden="true"
          >
            {experiment.coverStyle === "pos" ? (
              <>
                <path
                  d="M72 54h174v112H72z"
                  fill="#f6f4ec"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path d="M90 73h80v72H90z" fill="#c9c3f4" />
                <path
                  d="M185 76h42M185 94h42M185 112h27M143 166v27m-29 0h70"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M219 139h66v83l-8-5-8 5-8-5-9 5-8-5-8 5-8-5-9 5v-83Z"
                  fill="#ffb497"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  d="M234 158h36m-36 15h36m-36 15h22M52 203h146"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="m286 58 8-15m11 32 16-5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </>
            ) : experiment.coverStyle === "fuel" ? (
              <>
                <path
                  d="M96 207V67a14 14 0 0 1 14-14h73a14 14 0 0 1 14 14v140"
                  fill="#f6f4ec"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  d="M112 73h69v53h-69z"
                  fill="#c9f64a"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  d="M83 207h128m-88-48h47m27-67h17l27 35v53a14 14 0 0 0 28 0v-68l-29-35m-8-8 23-14 23 29-22 16"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m282 169 9 11 22-26"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            ) : (
              <>
                <rect
                  x="79"
                  y="49"
                  width="170"
                  height="151"
                  rx="2"
                  transform="rotate(-6 79 49)"
                  fill="#f6f4ec"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="119"
                  y="72"
                  width="170"
                  height="151"
                  rx="2"
                  transform="rotate(5 119 72)"
                  fill="#e6e3d9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M198 123v48m-24-24h48"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
          <span className="experiment-visual-caption mono">
            {experiment.coverStyle === "next"
              ? "IDE BERIKUTNYA"
              : "VISUAL SEMENTARA / BUKAN TAMPILAN APLIKASI"}
          </span>
        </>
      )}
    </div>
  );
}

export function JournalImage({ activity, index = 0, className = "" }) {
  return (
    <div
      className={`journal-image journal-image-${index % 3}${activity.kind === "certificate" ? " journal-image--certificate" : ""} ${className}`}
    >
      {activity.coverImage ? (
        <img
          src={activity.coverImage}
          alt={activity.imageAlt || activity.title}
          loading="lazy"
          width="1200"
          height="800"
        />
      ) : activity.kind === "certificate" ? (
        <>
          <span className="mono photo-slot-label">CERTIFICATE PLACEHOLDER</span>
          <svg
            className="certificate-art"
            viewBox="0 0 320 220"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="36"
              y="28"
              width="248"
              height="164"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="46"
              y="38"
              width="228"
              height="144"
              stroke="currentColor"
              strokeOpacity=".3"
            />
            <path
              d="M108 72h104M88 96h144m-130 17h116m-98 17h76M63 160h60"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="240"
              cy="154"
              r="16"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="m232 168-4 28 12-8 12 8-4-28"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <span className="photo-slot-caption">Certificate to be added.</span>
        </>
      ) : (
        <>
          <span className="mono photo-slot-label">PHOTO PLACEHOLDER</span>
          <span className="photo-slot-type" aria-hidden="true">
            {index % 2 ? "offline." : "small\nthings."}
          </span>
          <span className="photo-slot-caption">Foto & cerita menyusul.</span>
        </>
      )}
    </div>
  );
}
