"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import TiltCard from "@/components/ui/TiltCard";
import {
  SiReact,
  SiTypescript,
  SiThreedotjs,
  SiNextdotjs,
  SiDiscord,
  SiNodedotjs,
  SiSpotify,
} from "react-icons/si";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import type { IconType } from "react-icons";

type Project = {
  id: string;
  title: string;
  tagline: string;
  tags: { label: string; icon: IconType }[];
  href: string;
};

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "RIFTBOUND TRACKER",
    tagline:
      "Tracker de decks et de collection pour le TCG Riftbound — cards 3D au survol, filtres avancés, suivi de progression.",
    tags: [
      { label: "React", icon: SiReact },
      { label: "TypeScript", icon: SiTypescript },
      { label: "Three.js", icon: SiThreedotjs },
    ],
    href: "https://github.com/lainocs",
  },
  {
    id: "02",
    title: "VIDÉOCLUB",
    tagline:
      "Vidéoclub en ligne façon store 3D immersif — navigation entre les rayonnages en WebGL, ambiance rétro-vidéoclub.",
    tags: [
      { label: "Three.js", icon: SiThreedotjs },
      { label: "React", icon: SiReact },
      { label: "Next.js", icon: SiNextdotjs },
    ],
    href: "https://github.com/lainocs",
  },
  {
    id: "03",
    title: "LETTERBOXD BOT",
    tagline:
      "Bot Discord qui relaie l'activité Letterboxd d'un serveur : notes, critiques et watchlists postées en direct.",
    tags: [
      { label: "Discord.js", icon: SiDiscord },
      { label: "Node.js", icon: SiNodedotjs },
      { label: "TypeScript", icon: SiTypescript },
    ],
    href: "https://github.com/lainocs",
  },
  {
    id: "04",
    title: "SPOTIFY STATS",
    tagline:
      "Dashboard de stats d'écoute personnalisé branché sur l'API Spotify — au-delà du Wrapped annuel.",
    tags: [
      { label: "Spotify API", icon: SiSpotify },
      { label: "Next.js", icon: SiNextdotjs },
      { label: "Node.js", icon: SiNodedotjs },
    ],
    href: "https://github.com/lainocs",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActive(
              Math.round(self.progress * (PROJECTS.length - 1))
            );
          },
        },
      });

      gsap.fromTo(
        ".project-index-watermark",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projets"
      ref={sectionRef}
      className="relative w-full bg-void/55 backdrop-blur-md"
    >
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 scanline-overlay opacity-40" />

        {/* pinned HUD chrome */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-6 pt-10 md:px-16 md:pt-14">
          <div>
            <p className="hud-label text-red">— DOSSIERS DE MISSION</p>
            <h2 className="mt-2 font-display text-4xl leading-[0.85] text-bone md:text-5xl">
              PROJETS
            </h2>
          </div>
          <div className="text-right">
            <p className="hud-label text-mute">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(PROJECTS.length).padStart(2, "0")}
            </p>
            <p className="mt-2 hidden hud-label text-mute/60 md:block">
              SCROLL POUR NAVIGUER →
            </p>
          </div>
        </div>

        <div ref={trackRef} className="flex h-full">
          {PROJECTS.map((project) => {
            const PrimaryIcon = project.tags[0].icon;
            return (
            <div
              key={project.id}
              className="relative flex h-full w-screen shrink-0 flex-col justify-center gap-10 overflow-hidden px-6 md:flex-row md:items-center md:gap-16 md:px-16"
            >
              <span className="project-index-watermark pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 select-none font-display text-[46vw] leading-none text-bone/[0.04] md:text-[26vw]">
                {project.id}
              </span>

              <div className="relative z-10 max-w-xl">
                <span className="hud-label text-red">MISSION {project.id}</span>
                <h3 className="mt-3 font-display text-6xl leading-[0.85] text-bone md:text-7xl">
                  {project.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-bone/70 md:text-lg">
                  {project.tagline}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-mute"
                    >
                      <tag.icon className="h-3.5 w-3.5" />
                      {tag.label}
                    </span>
                  ))}
                </div>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="clip-notch-sm group mt-8 inline-flex items-center gap-2 border border-red bg-red/10 px-5 py-2.5 font-tactical text-sm font-semibold uppercase tracking-[0.2em] text-bone transition-colors hover:bg-red hover:text-void"
                >
                  <FiGithub />
                  Voir le code
                  <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <TiltCard className="relative z-10 hidden aspect-square w-56 shrink-0 lg:block">
                <div className="clip-notch panel-frame flex h-full w-full items-center justify-center">
                  <PrimaryIcon className="h-20 w-20 text-red/70" />
                </div>
              </TiltCard>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
