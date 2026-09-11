"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const STATS = [
  { label: "ROLE", value: "FREELANCE ENGINEER" },
  { label: "FOCUS", value: "FULLSTACK & DEVOPS" },
  { label: "STACK", value: "SVELTE · TS · GRAPHQL" },
  { label: "BASE", value: "PARIS, FR" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: -120, rotateY: -78, transformPerspective: 1200 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          transformPerspective: 1200,
          transformOrigin: "left center",
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".about-line",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-void-raised py-28 md:py-36"
    >
      <div className="absolute inset-0 opacity-40">
        <div className="scanline-overlay" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-[0.85fr_1.15fr] md:px-10">
        {/* Agent card */}
        <div ref={cardRef} className="mx-auto w-full max-w-sm [perspective:1000px]">
          <div className="clip-notch panel-frame relative aspect-[3/4] w-full overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/agent-portrait-art.webp"
                alt="Illustration de Nicolas de Garrigues façon carte de personnage tactique, palette rouge et noir"
                fill
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
              <div className="scanline-overlay" />
              <div className="noise-grain" />
            </div>

            <div className="absolute left-0 top-0 border-b border-r border-red/60 bg-void/70 px-3 py-1.5">
              <span className="hud-label text-red">AGENT-01</span>
            </div>
            <div className="absolute bottom-0 w-full border-t border-red/60 bg-void/80 px-4 py-3">
              <p className="font-display text-2xl tracking-wide text-bone">
                DE GARRIGUES, N.
              </p>
              <p className="hud-label text-mute">ENGINEER CLASS</p>
            </div>
          </div>
        </div>

        {/* Text block */}
        <div ref={textRef} className="text-left">
          <p className="about-line hud-label mb-4 text-red">— À PROPOS</p>
          <h2 className="about-line font-display text-5xl leading-[0.9] text-bone md:text-6xl">
            OPÉRATEUR
            <br />
            FREELANCE
          </h2>
          <p className="about-line mt-6 max-w-lg text-base leading-relaxed text-bone/75 md:text-lg">
            Software Engineer freelance, après un an et demi chez Escape
            (YC W23) à concevoir des interfaces de détection de
            vulnérabilités API et l&apos;architecture backend qui les fait
            tourner — entre Svelte, Node.js et GraphQL. Ancien prof à
            l&apos;IIM Digital School et fondateur d&apos;une asso dev étudiante, je
            garde toujours un pied dans des side-projects qui sortent du
            cadre : bot Discord, tracker de jeu de cartes, sites 3D.
          </p>

          <div className="about-line mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-void-raised px-4 py-4">
                <p className="hud-label text-mute">{stat.label}</p>
                <p className="mt-1 font-tactical text-sm font-semibold tracking-wide text-bone">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
