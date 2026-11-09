import { ArrowUpRight } from "lucide-react";
import { collections, experiments, person } from "../data/content";
import { SectionLabel, TextLink } from "./Shell";
import {
  ExperimentCover,
  Portrait,
  ProjectCover,
} from "./Visuals";
import LifeFilm from "./LifeFilm";
import PhotoRail from "./PhotoRail";
import { formatDate } from "../utils/formatDate";
import HeroPortrait from "./HeroPortrait";

export function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-heading" data-scroll-section="Home">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="identity">
            <span>Full-stack web developer</span>
            <strong>{person.name}</strong>
          </p>
          <h1 id="hero-heading">
            <span className="hero-line"><span>Thoughtful work.</span></span>
            <span className="hero-line"><span className="highlight">Built for the web.</span></span>
          </h1>
          <p className="hero-description">Websites, applications, and practical exploration.</p>
          <div className="hero-actions">
            <a className="button button-ink" href="/work">
              View work <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <TextLink href="/about">More about me</TextLink>
          </div>
        </div>
        <HeroPortrait />
      </div>
    </section>
  );
}

export function Human() {
  return (
    <section
      className="human-section section-space wrap"
      id="human"
      data-scroll-section="About"
      aria-labelledby="human-heading"
    >
      <SectionLabel>01 / ABOUT</SectionLabel>
      <div className="human-layout">
        <h2 id="human-heading">
          Development,
          <br />
          with perspective.
        </h2>
        <div className="human-copy">
          <p>
            Six years of exploring IT, supported by six months of industry
            internship experience. I bring a practical approach to building
            websites and understanding the systems behind them.
          </p>
          <TextLink href="/about">About my background</TextLink>
        </div>
      </div>
    </section>
  );
}

export function ProjectCard({ project, index = 0, featured = false }) {
  return (
    <article className={`showcase-project${featured ? " showcase-project--featured" : ""}`}>
      <a
        className="showcase-visual"
        href={`/work/${project.slug}`}
        aria-label={`Read about ${project.title}`}
      >
        <span className="browser-bar" aria-hidden="true">
          <span className="browser-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="mono">{project.title}</span>
          <span className="browser-index mono">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
        <ProjectCover project={project} />
      </a>
      <div className="showcase-copy">
        {featured && <p className="showcase-selection mono">SELECTED PROJECT / {String(index + 1).padStart(2, "0")}</p>}
        <p className="showcase-kicker mono">{project.category}</p>
        <h3>
          <a href={`/work/${project.slug}`}>{project.title}</a>
        </h3>
        <p className="showcase-description">{project.description}</p>
        <div className="showcase-meta mono">
          {project.tags.length > 0 && <span>{project.tags.join(" / ")}</span>}
          <span>
            {project.status}
            {project.date
              ? ` / ${new Date(project.date).getUTCFullYear()}`
              : ""}
          </span>
        </div>
        <TextLink href={`/work/${project.slug}`}>View project</TextLink>
      </div>
    </article>
  );
}

export function WorkSection({ full = false }) {
  const visibleProjects = collections.work;
  return (
    <section
      className={`work-section wrap${full ? " collection-section" : " section-space"}`}
      id={full ? undefined : "projects"}
      data-scroll-section="Work"
      aria-label={full ? "Selected projects" : undefined}
      aria-labelledby={full ? undefined : "work-heading"}
    >
      {!full && (
        <>
          <SectionLabel>02 / WORK</SectionLabel>
          <div className="section-heading-row">
            <h2 id="work-heading">Selected work.</h2>
            <TextLink href="/work">All work</TextLink>
          </div>
        </>
      )}
      {!full && visibleProjects[0] && (
        <ProjectCard
          featured
          project={visibleProjects[0]}
          index={0}
        />
      )}
      {!full && <p className="work-continuation mono">MORE SELECTED WORK</p>}
      <PhotoRail label="Work" theme="work">
        {(full ? visibleProjects : visibleProjects.slice(1)).map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={collections.work.indexOf(project)}
          />
        ))}
      </PhotoRail>
    </section>
  );
}

export function LabSection({ full = false }) {
  const Heading = full ? "h1" : "h2";
  return (
    <section
      className={`lab-section${full ? " lab-full" : ""}`}
      data-scroll-section="Lab"
      aria-labelledby="lab-heading"
    >
      <div className="wrap">
        {!full && <SectionLabel light>03 / LAB</SectionLabel>}
        <div className="section-heading-row lab-heading-row">
          <Heading className="lab-title" id="lab-heading">
            Built to <span>learn.</span>
          </Heading>
          {!full && <TextLink href="/lab">All experiments</TextLink>}
        </div>
        <PhotoRail label="Lab" theme="lab">
          {experiments.map((experiment, index) => (
            <article className="research-paper" key={experiment.slug}>
              <div className="research-index mono">
                <span>EXP / {String(index + 1).padStart(2, "0")}</span>
                <span>{experiment.status}</span>
              </div>
              <a
                className="research-visual"
                href={`/lab/${experiment.slug}`}
                aria-label={`Explore ${experiment.title}`}
              >
                <ExperimentCover experiment={experiment} />
              </a>
              <div className="research-copy">
                <p className="research-category mono">{experiment.category}</p>
                <h3>
                  <a href={`/lab/${experiment.slug}`}>
                    {experiment.title}
                    <ArrowUpRight size={22} aria-hidden="true" />
                  </a>
                </h3>
                <p className="research-description">{experiment.description}</p>
                <div className="research-footer mono">
                  {experiment.date && <span>{formatDate(experiment.date)}</span>}
                  <a
                    href={`/lab/${experiment.slug}`}
                    aria-label={`Read notes: ${experiment.title}`}
                  >
                    Open notes <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </PhotoRail>
      </div>
    </section>
  );
}

export function LifeSection({ full = false }) {
  return (
    <section
      className={`life-section wrap${full ? " collection-section" : " section-space"}`}
      data-scroll-section="Life"
      aria-label={full ? "Personal journal" : undefined}
      aria-labelledby={full ? undefined : "life-heading"}
    >
      {!full && (
        <>
          <SectionLabel>04 / LIFE</SectionLabel>
          <div className="section-heading-row">
            <h2 id="life-heading">
              Beyond the work.
            </h2>
            <TextLink href="/life">All stories</TextLink>
          </div>
        </>
      )}
      <LifeFilm activities={collections.life} />
    </section>
  );
}

export function AboutPortrait() {
  return (
    <figure className="about-portrait">
      <Portrait />
      <figcaption className="mono">{person.name}</figcaption>
    </figure>
  );
}
