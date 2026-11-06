import { useRef } from "react";
import { person } from "../data/content";
import usePortraitMotion from "../hooks/usePortraitMotion";
import "../hero-portrait.css";

const satellites = [
  { name: "Next.js", icon: "nextjs", x: 26, y: 14, size: 38, depth: -8, layer: "back", color: "#44493c" },
  { name: "PostgreSQL", icon: "postgresql", x: 73, y: 13, size: 34, depth: -9, layer: "back", color: "#608ba4" },
  { name: "React", icon: "react", x: 86, y: 33, size: 46, depth: 18, layer: "front", color: "#61dafb" },
  { name: "Go", icon: "go", x: 9, y: 31, size: 46, depth: -7, layer: "back", color: "#00acd7" },
  { name: "Laravel", icon: "laravel", x: 15, y: 54, size: 42, depth: 13, layer: "front", color: "#ee6857" },
  { name: "JavaScript", icon: "javascript", x: 84, y: 54, size: 34, depth: 11, layer: "front", color: "#e0c748" },
  { name: "MySQL", icon: "mysql", x: 23, y: 76, size: 42, depth: -6, layer: "back", color: "#3997b4" },
  { name: "Vue.js", icon: "vuejs", x: 88, y: 76, size: 38, depth: 15, layer: "front", color: "#64ab86" },
  { name: "Git", icon: "git", x: 37, y: 92, size: 32, depth: 10, layer: "front", color: "#dd7756" },
  { name: "Python", icon: "python", x: 67, y: 93, size: 36, depth: 16, layer: "front", color: "#79a7c5" },
];

export default function HeroPortrait() {
  const scene = useRef(null);
  usePortraitMotion(scene);
  return (
    <div className="hero-portrait-scene" ref={scene}>
      <div className="portrait-studio-light" aria-hidden="true" />
      <div className="portrait-contact-shadow" aria-hidden="true" />
      <ul className="portrait-stack" aria-label="Tech stack">
        {satellites.map((tech, index) => (
          <li className={`portrait-satellite portrait-satellite--${tech.icon} is-${tech.layer}`} key={tech.icon}
            style={{ "--satellite-x": `${tech.x}%`, "--satellite-y": `${tech.y}%`, "--satellite-size": `${tech.size}px`, "--satellite-depth": `${tech.depth}px`, "--satellite-color": tech.color, "--satellite-delay": `${index * 55}ms`, "--satellite-launch-x": `${50 - tech.x}px`, "--satellite-launch-y": `${(55 - tech.y) * 0.8}px` }}>
            <div className="portrait-satellite-reveal">
              <div className="portrait-satellite-float" data-float-index={index}>
                <div className="portrait-satellite-art">
                  <img src={`/icons/tech/${tech.icon}.svg`} alt={tech.name} width={tech.size} height={tech.size} draggable={false} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <figure className="hero-portrait">
        <div className="portrait-motion-layer">
          <img src={person.heroPortrait} alt={person.name} width="1000" height="1921" loading="eager" fetchPriority="high" decoding="async" />
        </div>
      </figure>
    </div>
  );
}
