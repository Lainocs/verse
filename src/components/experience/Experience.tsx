"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const TIMELINE = [
  {
    period: "10/2024 — PRÉSENT",
    role: "Software Engineer",
    org: "Escape (YC W23)",
    place: "Paris",
    desc: "Interfaces de détection de vulnérabilités API pour une SaaS de cybersécurité, architecture backend associée, et R&D sur des algorithmes de sécurité pilotés par IA.",
    tags: ["Svelte", "Node.js", "GraphQL", "Terraform"],
  },
  {
    period: "08/2022 — 08/2024",
    role: "Faculty Advisor / Professeur",
    org: "IIM Digital School",
    place: "Nanterre",
    desc: "Conception et animation de cours techniques (PHP, JS) pour les promos Bachelor, suivi de projets étudiants, jury de soutenance. En parallèle, Student Ambassador de 06/2020 à 08/2024.",
    tags: ["PHP", "JavaScript", "Pédagogie"],
  },
  {
    period: "06/2021 — 05/2023",
    role: "Président fondateur",
    org: "La 404 DeVinci",
    place: "Courbevoie",
    desc: "Création et gestion de l'association web dev officielle du Pôle Léonard de Vinci, pour fédérer les étudiants autour des technologies web.",
    tags: ["Leadership", "Communauté"],
  },
  {
    period: "08/2021 — 08/2022",
    role: "FullStack Developer (Alternance)",
    org: "Magnétis",
    place: "Courbevoie",
    desc: "Fonctionnalités sur une plateforme multi-API, outils front-office sur-mesure pour agences de communication et réseaux retail.",
    tags: ["Laravel", "Vue.js"],
  },
  {
    period: "05/2021 — 07/2021",
    role: "FullStack Developer (Stage)",
    org: "BGS Associés",
    place: "Paris",
    desc: "CMS sur-mesure développé from scratch, module de scraping LinkedIn automatisé, sites e-commerce et vitrine.",
    tags: ["Node.js", "Vue.js", "Prestashop"],
  },
];

const CREDENTIALS = [
  "Master — Web & Mobile Engineering, IIM",
  "Bachelor — Coding & Digital Innovation, IIM",
  "RNCP — Manager de l'ingénierie numérique",
  "Google Cloud Certified ×6",
  "Design Thinker — dthinking academy",
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-entry",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.4,
          ease: "power2.inOut",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".credential-chip",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".credentials-row",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="parcours"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-void/55 py-28 backdrop-blur-md md:py-36"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="scanline-overlay" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 md:px-10">
        <p className="hud-label mb-4 text-red">— LOG D&apos;OPÉRATIONS</p>
        <h2 className="mb-16 font-display text-5xl leading-[0.9] text-bone md:text-6xl">
          PARCOURS
        </h2>

        <div className="relative">
          <div className="timeline-line absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-red via-red/40 to-transparent md:left-[9px]" />

          <ul className="flex flex-col gap-12">
            {TIMELINE.map((item) => (
              <li
                key={item.org + item.period}
                className="timeline-entry relative pl-8 md:pl-10"
              >
                <span className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-red bg-void md:h-[18px] md:w-[18px]" />

                <p className="hud-label mb-2 text-mute">{item.period}</p>
                <h3 className="font-display text-2xl tracking-wide text-bone md:text-3xl">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-red">
                  {item.org} <span className="text-mute">— {item.place}</span>
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bone/70 md:text-base">
                  {item.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-line px-2.5 py-1 text-xs uppercase tracking-wider text-mute"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <p className="hud-label mb-4 text-mute">
            — FORMATION & CERTIFICATIONS
          </p>
          <div className="credentials-row flex flex-wrap gap-3">
            {CREDENTIALS.map((c) => (
              <span
                key={c}
                className="credential-chip clip-notch-sm border border-line bg-panel/70 px-3.5 py-2 text-xs text-bone/80"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
