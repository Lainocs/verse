"use client";

import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import {
  SiReact,
  SiTypescript,
  SiThreedotjs,
  SiNextdotjs,
  SiDiscord,
  SiNodedotjs,
  SiSpotify,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { useZoneVisibility } from "./useZoneVisibility";

const EMAIL = "ndegarrigues@gmail.com";

const STACK = [
  "TypeScript",
  "Svelte",
  "Vue.js",
  "React",
  "Node.js",
  "GraphQL",
  "PHP",
  "Python",
  "Go",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Terraform",
  "Three.js",
];

function TechIcons({ icons }: { icons: IconType[] }) {
  return (
    <div className="mt-3 flex items-center justify-end gap-3">
      {icons.map((Icon, i) => (
        <Icon key={i} className="h-4 w-4 text-mute" />
      ))}
    </div>
  );
}

export default function ContentLayer() {
  const zoneRef = useZoneVisibility();

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {/* HERO */}
      <div
        ref={zoneRef("hero")}
        className="absolute inset-0 flex flex-col justify-end px-6 pb-16 opacity-0 md:px-14 md:pb-20"
      >
        <p className="hud-label mb-3 text-red">FREELANCE SOFTWARE ENGINEER</p>
        <h1 className="font-display text-[15vw] leading-[0.82] tracking-tight text-bone md:text-[8vw]">
          NICOLAS
          <br />
          <span className="text-stroke-red">DE GARRIGUES</span>
        </h1>
        <p className="hud-label mt-6 text-bone/50">SCROLL ↓</p>
      </div>

      {/* ABOUT */}
      <div
        ref={zoneRef("about")}
        className="absolute inset-0 flex flex-col items-end justify-center px-6 text-right opacity-0 md:px-16"
      >
        <p className="hud-label mb-4 text-red">À PROPOS</p>
        <h2 className="max-w-xl font-display text-4xl leading-[0.95] text-bone md:text-6xl">
          OPÉRATEUR
          <br />
          FREELANCE
        </h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-bone/65 md:text-lg">
          Frontend (Svelte, Vue, React) et backend (Node.js, GraphQL, PHP),
          avec un passif cybersécurité, enseignement et associatif. Basé à
          Paris.
        </p>
      </div>

      {/* PARCOURS — bottom-left log entries, captions under the 3D name */}
      <div
        ref={zoneRef("parcours-1")}
        className="absolute inset-x-0 bottom-0 flex flex-col px-6 pb-[18vh] opacity-0 md:px-16"
      >
        <p className="hud-label mb-2 text-mute">10/2024 — PRÉSENT · PARIS</p>
        <p className="max-w-md text-sm leading-relaxed text-bone/70 md:text-base">
          <span className="text-red">Escape (YC W23)</span> — Software
          Engineer, détection de vulnérabilités API pour une SaaS de
          cybersécurité, R&amp;D sécurité pilotée par IA.
        </p>
      </div>

      <div
        ref={zoneRef("parcours-2")}
        className="absolute inset-x-0 bottom-0 flex flex-col px-6 pb-[18vh] opacity-0 md:px-16"
      >
        <p className="hud-label mb-2 text-mute">2020 — 2024 · NANTERRE</p>
        <p className="max-w-md text-sm leading-relaxed text-bone/70 md:text-base">
          <span className="text-red">IIM Digital School</span> — Professeur
          (PHP, JS) et Student Ambassador, jurys de soutenance, promotion de
          l&apos;école.
        </p>
      </div>

      <div
        ref={zoneRef("parcours-3")}
        className="absolute inset-x-0 bottom-0 flex flex-col px-6 pb-[18vh] opacity-0 md:px-16"
      >
        <p className="hud-label mb-2 text-mute">2021 — 2023 · COURBEVOIE</p>
        <p className="max-w-md text-sm leading-relaxed text-bone/70 md:text-base">
          <span className="text-red">La 404 DeVinci</span> — Président
          fondateur, association web dev du Pôle Léonard de Vinci.
        </p>
      </div>

      {/* PROJECTS — bottom-right badges with tech icons */}
      <div
        ref={zoneRef("project-1")}
        className="absolute inset-x-0 bottom-0 flex flex-col items-end px-6 pb-[18vh] text-right opacity-0 md:px-16"
      >
        <p className="hud-label mb-2 text-red">MISSION 01</p>
        <p className="max-w-sm text-sm text-bone/70 md:text-base">
          Tracker de decks et de collection pour le TCG Riftbound.
        </p>
        <TechIcons icons={[SiReact, SiTypescript, SiThreedotjs]} />
      </div>

      <div
        ref={zoneRef("project-2")}
        className="absolute inset-x-0 bottom-0 flex flex-col items-end px-6 pb-[18vh] text-right opacity-0 md:px-16"
      >
        <p className="hud-label mb-2 text-red">MISSION 02</p>
        <p className="max-w-sm text-sm text-bone/70 md:text-base">
          Vidéoclub en ligne façon store 3D immersif, en WebGL.
        </p>
        <TechIcons icons={[SiThreedotjs, SiReact, SiNextdotjs]} />
      </div>

      <div
        ref={zoneRef("project-3")}
        className="absolute inset-x-0 bottom-0 flex flex-col items-end px-6 pb-[18vh] text-right opacity-0 md:px-16"
      >
        <p className="hud-label mb-2 text-red">MISSION 03</p>
        <p className="max-w-sm text-sm text-bone/70 md:text-base">
          Bot Discord qui relaie l&apos;activité Letterboxd d&apos;un serveur.
        </p>
        <TechIcons icons={[SiDiscord, SiNodedotjs, SiTypescript]} />
      </div>

      <div
        ref={zoneRef("project-4")}
        className="absolute inset-x-0 bottom-0 flex flex-col items-end px-6 pb-[18vh] text-right opacity-0 md:px-16"
      >
        <p className="hud-label mb-2 text-red">MISSION 04</p>
        <p className="max-w-sm text-sm text-bone/70 md:text-base">
          Dashboard de stats d&apos;écoute personnalisé, au-delà du Wrapped.
        </p>
        <TechIcons icons={[SiSpotify, SiNextdotjs, SiNodedotjs]} />
      </div>

      {/* SKILLS */}
      <div
        ref={zoneRef("skills")}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 md:px-24"
      >
        <p className="hud-label mb-6 text-red">STACK & OUTILS</p>
        <p className="max-w-3xl font-display text-3xl leading-tight text-bone/85 md:text-5xl">
          {STACK.map((s, i) => (
            <span key={s}>
              {s}
              {i < STACK.length - 1 && (
                <span className="text-red"> · </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* CONTACT */}
      <div
        ref={zoneRef("contact")}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0"
      >
        <p className="hud-label mb-4 text-red">— TRANSMISSION</p>
        <h2 className="font-display text-6xl leading-[0.85] text-bone md:text-8xl">
          OUVRIR
          <br />
          <span className="text-stroke-red">LE CANAL</span>
        </h2>
        <a
          href={`mailto:${EMAIL}`}
          data-cursor-hover
          className="mt-8 flex items-center gap-3 border-b border-red pb-1 font-display text-xl text-bone transition-colors hover:text-red md:text-3xl"
        >
          <FiMail /> {EMAIL}
        </a>
        <div className="mt-8 flex items-center gap-6">
          <a
            href="https://github.com/lainocs"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="flex items-center gap-2 text-sm uppercase tracking-wider text-bone/70 transition-colors hover:text-red"
          >
            <FiGithub /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/nicolasdegarrigues"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="flex items-center gap-2 text-sm uppercase tracking-wider text-bone/70 transition-colors hover:text-red"
          >
            <FiLinkedin /> LinkedIn
          </a>
        </div>
        <p className="hud-label mt-14 text-mute">
          © 2026 NICOLAS DE GARRIGUES — PARIS, FR
        </p>
      </div>
    </div>
  );
}
