import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import "./responsive.css";
import "./gallery.css";
import "./film.css";
import "./collections.css";
import "./refinements.css";
import App from "./App.jsx";
import { getSeo, renderSeoHead } from "./utils/seo";

const seo = getSeo(window.location.pathname);
document.title = seo.title;
document.querySelector('meta[name="description"]').content = seo.description;
document.head.querySelectorAll("[data-seo]").forEach((element) => element.remove());
const head = document.createElement("template");
head.innerHTML = renderSeoHead(seo);
document.head.append(head.content);
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
