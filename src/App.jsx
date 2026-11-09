import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Header, Footer, SectionLabel, TextLink } from "./components/Shell";
import {
  AboutPortrait,
  Hero,
  Human,
  LabSection,
  LifeSection,
  WorkSection,
} from "./components/Sections";
import { JournalImage } from "./components/Visuals";
import { collections, getPage, person } from "./data/content";
import ProjectDetail from "./components/ProjectDetail";
import { formatDate } from "./utils/formatDate";
import AmbientBackground from "./components/AmbientBackground";
import SectionNavigation from "./components/SectionNavigation";
import useEditorialMotion from "./hooks/useEditorialMotion";

const collectionIntro = {
  work: {
    label: "THE WORK ARCHIVE",
    title: (
      <>
        Selected projects.
      </>
    ),
    description:
      "Websites and applications for businesses, communities, and events.",
  },
  life: {
    label: "LIFE / COMMUNITY & LEARNING",
    title: (
      <>
        Learning &
        <br />
        community.
      </>
    ),
    description:
      "Community activities, professional development, and certifications.",
  },
};

function CollectionPage({ type }) {
  if (type === "lab")
    return (
      <>
        <div className="wrap lab-page-label" data-scroll-section="Overview">
          <SectionLabel>THE LAB / PROJECT EXPLORATIONS</SectionLabel>
        </div>
        <LabSection full />
      </>
    );
  const intro = collectionIntro[type];
  return (
    <>
      <div className={`page-intro wrap intro-${type}`} data-scroll-section="Overview">
        <SectionLabel>{intro.label}</SectionLabel>
        <h1>{intro.title}</h1>
        <p>{intro.description}</p>
      </div>
      {type === "work" ? <WorkSection full /> : <LifeSection full />}
    </>
  );
}

function AboutPage() {
  return (
    <>
      <section className="about-intro wrap" data-scroll-section="About">
        <SectionLabel>ABOUT / KAUTSAR RIFQI ADITYA</SectionLabel>
        <div className="about-grid">
          <div>
            <p className="about-greeting">Based in Purwokerto, Indonesia</p>
            <h1>
              Full-stack
              <br />
              developer.
            </h1>
            <p className="about-full-name">
              {person.name}
            </p>
            <p className="about-lead">
              Informatics student at UNSOED and Database Lab Assistant.
              I build websites and applications.
            </p>
            <div className="about-actions">
              <a href={`mailto:${person.email}`} className="button button-ink">
                Say hello <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <TextLink href={person.cv} external>
                View my CV
              </TextLink>
            </div>
          </div>
          <AboutPortrait />
        </div>
      </section>
      <div className="about-history wrap section-space" data-scroll-section="Background">
      <section className="about-history-section" aria-labelledby="education-heading">
        <SectionLabel>EDUCATION</SectionLabel>
          <h2 id="education-heading">Education.</h2>
          <div className="education-list">
            {person.education.map((education) => (
              <div key={education.title}>
                <span className="mono">{education.date}</span>
                <h3>{education.title}</h3>
                <p>{education.description}</p>
              </div>
            ))}
          </div>
      </section>
      <section className="about-history-section" aria-labelledby="activities-heading">
        <SectionLabel>ACTIVITIES & EXPERIENCE</SectionLabel>
          <h2 id="activities-heading">Activities.</h2>
          <div className="education-list">
            <div>
              <span className="mono">{person.assistantAt}</span>
              <h3>{person.assistantRole}</h3>
              <p lang="id">Asisten Laboratorium Basis Data.</p>
            </div>
            <div>
              <span className="mono">Catalyst, UNSOED</span>
              <h3>Staff Software Development</h3>
            </div>
          </div>
      </section>
      </div>
    </>
  );
}

function DetailSections({ entries }) {
  return (
    <div className="detail-sections">
      {entries.map(([title, text], index) => (
        <section key={title} className={text ? undefined : "is-pending"}>
          <span className="mono detail-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h2>{title}</h2>
            <p className={text ? "" : "unpublished-note"}>
              {text || "Not documented yet."}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}

function DetailPage({ type, item }) {
  const isCertificate = type === "life" && item.kind === "certificate";
  const index = collections[type].indexOf(item);
  const next = collections[type][(index + 1) % collections[type].length];
  const entries = item.content.map((section) => [section.title, section.text]);
  return (
    <article className={`detail-page detail-${type} wrap`} data-scroll-section="Story">
      <a className="breadcrumb mono" href={`/${type}`}>
        <ArrowLeft size={15} aria-hidden="true" /> BACK TO {type.toUpperCase()}
      </a>
      <header className="detail-heading">
        <SectionLabel>
          {item.category} / {item.status}
        </SectionLabel>
        <h1>{item.title}</h1>
        <p className="detail-description">{item.description}</p>
        <div className="detail-meta mono">
          {item.date ? (
            <time dateTime={item.date}>{formatDate(item.date)}</time>
          ) : (
            <span>DATE NOT RECORDED</span>
          )}
          {item.tags.length > 0 && <span>{item.tags.join(" / ")}</span>}
          {isCertificate && item.issuer && <span>{item.issuer}</span>}
          {isCertificate && item.credentialId && (
            <span>ID / {item.credentialId}</span>
          )}
        </div>
      </header>
      <JournalImage activity={item} index={index} className="detail-cover" />
      <div className="detail-body">
        <aside className="detail-sidebar">
          <span className="mono">{isCertificate ? "THE CREDENTIAL" : "A PERSONAL NOTE"}</span>
          <p>{isCertificate ? item.issuer : "Community activities and shared learning."}</p>
          {item.github && (
            <TextLink href={item.github} external>
              Source on GitHub
            </TextLink>
          )}
          {item.live && (
            <TextLink href={item.live} external>
              {isCertificate ? "View certificate" : "Open the presentation"}
            </TextLink>
          )}
        </aside>
        <DetailSections entries={entries} />
      </div>
      <div className="next-entry">
        <span className="mono">KEEP EXPLORING / NEXT STORY</span>
        <TextLink href={`/${type}/${next.slug}`}>{next.title}</TextLink>
      </div>
    </article>
  );
}

function NotFound() {
  return (
    <section className="not-found wrap" data-scroll-section="Page">
      <SectionLabel>404 / A WRONG TURN</SectionLabel>
      <h1>
        Page not found.
        <br />
      </h1>
      <p>The page may have moved or is no longer available.</p>
      <TextLink href="/">Back to home</TextLink>
    </section>
  );
}

export default function App({ path = globalThis.location?.pathname || "/" }) {
  useEditorialMotion();
  const page = getPage(path);
  return (
    <>
      <AmbientBackground />
      <Header active={page.type} />
      <main id="main" tabIndex={-1} className={page.type === "home" ? "home-page" : undefined}>
        {page.item && ["work", "lab"].includes(page.type) ? (
          <ProjectDetail project={page.item} collection={page.type} />
        ) : page.item ? (
          <DetailPage type={page.type} item={page.item} />
        ) : page.type === "home" ? (
          <>
            <Hero />
            <div className="home-section home-section--about"><Human /></div>
            <div className="home-section home-section--work"><WorkSection /></div>
            <LabSection />
            <div className="home-section home-section--life"><LifeSection /></div>
          </>
        ) : page.type === "about" ? (
          <AboutPage />
        ) : collectionIntro[page.type] || page.type === "lab" ? (
          <CollectionPage type={page.type} />
        ) : (
          <NotFound />
        )}
      </main>
      <Footer />
      <SectionNavigation />
    </>
  );
}
