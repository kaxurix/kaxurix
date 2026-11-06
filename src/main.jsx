import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import "./responsive.css";
import "./gallery.css";
import "./film.css";
import "./collections.css";
import "./refinements.css";
import App from "./App.jsx";
import { getPage } from "./data/content";

const page = getPage(window.location.pathname);
document.title = page.type === "home" ? page.title : `${page.title} — kaxurix`;
document.querySelector('meta[name="description"]').content = page.description;
document.documentElement.classList.remove("no-js");

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
const root = document.getElementById("root");
const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
if (root.children.length && root.dataset.route === currentPath)
  hydrateRoot(root, app);
else createRoot(root).render(app);
