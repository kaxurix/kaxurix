import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { person } from "../data/content";
import CopyEmail from "./CopyEmail";

const navigation = [
  ["Home", "/"],
  ["Work", "/work"],
  ["Lab", "/lab"],
  ["Life", "/life"],
  ["About", "/about"],
];

export function Wordmark({ footer = false }) {
  return (
    <a
      className={`wordmark${footer ? " wordmark-footer" : ""}`}
      href="/"
      aria-label="kaxurix — home"
    >
      kaxurix<span aria-hidden="true">
        <svg className="wordmark-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" focusable="false">
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93" />
        </svg>
      </span>
    </a>
  );
}

export function Header({ active }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const menu = useRef(null);

  useEffect(() => {
    const compact = matchMedia("(max-width: 760px)");
    // Some browsers blur a control as soon as responsive CSS hides it,
    // before dispatching the media-query change event.
    let lastFocused = document.activeElement;
    const rememberFocus = (event) => { lastFocused = event.target; };
    const clearOutsideFocus = (event) => {
      if (!event.target.closest(".site-header")) lastFocused = null;
    };
    const resetNavigation = () => {
      const focused = document.activeElement === document.body
        ? lastFocused : document.activeElement;
      if (compact.matches && menu.current?.contains(focused)) {
        toggle.current?.focus();
      } else if (!compact.matches && focused === toggle.current) {
        const destination = menu.current?.querySelector('[aria-current="page"]')
          || menu.current?.querySelector("a");
        destination?.focus();
      }
      setOpen(false);
    };
    document.addEventListener("focusin", rememberFocus);
    document.addEventListener("pointerdown", clearOutsideFocus);
    compact.addEventListener("change", resetNavigation);
    return () => {
      document.removeEventListener("focusin", rememberFocus);
      document.removeEventListener("pointerdown", clearOutsideFocus);
      compact.removeEventListener("change", resetNavigation);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector("a")?.focus();
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const handleOutside = (event) => {
      if (
        !menu.current?.contains(event.target) &&
        !toggle.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handleOutside);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handleOutside);
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className="site-header wrap"
        id="top"
        onBlur={(event) => {
          if (open && !event.currentTarget.contains(event.relatedTarget))
            setOpen(false);
        }}
      >
        <Wordmark />
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          ref={menu}
          id="main-navigation"
          className={`navigation${open ? " is-open" : ""}`}
          aria-label="Main navigation"
          data-lenis-prevent
        >
          {navigation.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={
                (href === "/" ? active === "home" : href === `/${active}`)
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            className="contact-link"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
    </>
  );
}

export function TextLink({ href, children, className = "", external = false }) {
  return (
    <a
      href={href}
      className={`text-link ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export function SectionLabel({ children, light = false }) {
  return (
    <p className={`section-label mono${light ? " light" : ""}`}>{children}</p>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" id="contact" data-scroll-section="Contact">
      <div className="wrap">
        <div className="footer-intro">
          <SectionLabel>05 / CONTACT</SectionLabel>
        </div>
        <div className="footer-main">
          <h2>
            Have a project
            <br />
            <span>in mind?</span>
          </h2>
          <a
            className="contact-orbit"
            href={`mailto:${person.email}`}
            aria-label="Email Kautsar"
          >
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="footer-contact">
          <p>
            For project enquiries and collaboration, get in touch.
          </p>
          <div className="footer-email">
            <TextLink href={`mailto:${person.email}`}>{person.email}</TextLink>
            <CopyEmail email={person.email} />
          </div>
        </div>
        <div className="footer-bottom">
          <Wordmark footer />
          <div className="social-links">
            <TextLink href={person.github} external>
              GitHub
            </TextLink>
            <TextLink href={person.whatsapp} external>
              WhatsApp
            </TextLink>
          </div>
          <span className="copyright">
            © {new Date().getFullYear()} Kautsar Rifqi Aditya
          </span>
          <a className="back-top mono" href="#top">
            BACK TO TOP <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
