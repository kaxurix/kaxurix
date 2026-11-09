import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { collections } from "../data/content";
import ProjectGallery from "./ProjectGallery";
import { formatDate } from "../utils/formatDate";

export default function ProjectDetail({ project, collection = "work" }) {
  const siblings = collections[collection] || [];
  const index = siblings.findIndex((item) => item.slug === project.slug);
  const previous = siblings[(index - 1 + siblings.length) % siblings.length];
  const next = siblings[(index + 1) % siblings.length];
  return (
    <article className="work-detail wrap" data-scroll-section="Project">
      <a className="breadcrumb mono" href={`/${collection}`}>
        <ArrowLeft size={15} aria-hidden="true" /> BACK TO{" "}
        {collection === "lab" ? "THE LAB" : "WORK"}
      </a>
      <div className="work-detail-spread">
        <header className="work-detail-copy">
          <h1>{project.title}</h1>
          <p className="work-detail-description">{project.description}</p>
          <dl className="work-detail-facts">
            <div>
              <dt className="mono">Date</dt>
              <dd>
                {project.date ? (
                  <time dateTime={project.date}>
                    {formatDate(project.date)}
                  </time>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div>
              <dt className="mono">URL</dt>
              <dd>
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.live
                      .replace(/^https?:\/\//, "")
                      .replace(/\/$/, "")}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div>
              <dt className="mono">Tech stack</dt>
              <dd>{project.tags.length ? project.tags.join(" / ") : "—"}</dd>
            </div>
            {project.github && (
              <div>
                <dt className="mono">Source</dt>
                <dd>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </header>
        <ProjectGallery
          key={project.slug}
          project={project}
          collection={collection}
        />
      </div>
      {index >= 0 && siblings.length > 1 && (
        <nav
          className="project-pagination"
          aria-label={collection === "work" ? "More projects" : "More experiments"}
        >
          {[
            ["Previous", previous, <ArrowLeft size={16} aria-hidden="true" />],
            ["Next", next, <ArrowRight size={16} aria-hidden="true" />],
          ].map(([direction, item, icon]) => (
            <a
              key={direction}
              href={`/${collection}/${item.slug}`}
              className={`project-pagination-${direction.toLowerCase()}`}
            >
              <span className="mono">
                {icon}
                {direction} {collection === "work" ? "project" : "experiment"}
              </span>
              <strong>{item.title}</strong>
              <span className="project-pagination-category">{item.category}</span>
            </a>
          ))}
        </nav>
      )}
    </article>
  );
}
