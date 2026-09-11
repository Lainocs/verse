"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const STATS = [
  { label: "ROLE", value: "FULL-STACK DEV" },
  { label: "FOCUS", value: "WEB / 3D / TOOLING" },
  { label: "STACK", value: "TS · NEXT · NODE" },
  { label: "STATUS", value: "AVAILABLE" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: -60, rotateY: 12 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
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
                src="/images/agent-portrait.png"
                alt="Portrait de Nicolas Degarrigues, traitement graphique duotone rouge et noir façon carte d'agent"
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
                DEGARRIGUES, N.
              </p>
              <p className="hud-label text-mute">DEVELOPER CLASS</p>
            </div>
          </div>
        </div>

        {/* Text block */}
        <div ref={textRef} className="text-left">
          <p className="about-line hud-label mb-4 text-red">— À PROPOS</p>
          <h2 className="about-line font-display text-5xl leading-[0.9] text-bone md:text-6xl">
            OPERATEUR
            <br />
            FULL-STACK
          </h2>
          <p className="about-line mt-6 max-w-lg text-base leading-relaxed text-bone/75 md:text-lg">
            Développeur passionné par les interfaces qui sortent du cadre :
            expériences web immersives, outils sur-mesure et side-projects
            construits pour le plaisir de la technique — d&apos;un bot Discord à
            un tracker de jeu de cartes, en passant par des sites 3D.
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
