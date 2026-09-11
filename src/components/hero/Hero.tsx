"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.15,
        }
      );
    }, headlineRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        characterRef.current,
        { opacity: 0, x: 60, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          x: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power4.out",
          delay: 0.35,
        }
      );
    }, characterRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-void"
    >
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>

      <div
        ref={characterRef}
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46vw] max-w-[620px] md:block"
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/agent-fullbody-art.webp"
            alt="Illustration tactique de Nicolas Degarrigues, pose agent en pied"
            fill
            sizes="(max-width: 1024px) 40vw, 620px"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-void to-transparent" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
      <div className="absolute inset-0 scanline-overlay opacity-60" />
      <div className="noise-grain" />

      {/* Corner HUD */}
      <div className="hud-label absolute left-6 top-6 flex items-center gap-2 text-mute md:left-10 md:top-10">
        <span className="h-1.5 w-1.5 animate-flicker rounded-full bg-red" />
        AGENT DOSSIER // LIVE
      </div>
      <div className="hud-label absolute right-6 top-6 text-right text-mute md:right-10 md:top-10">
        SEC. 04 — PORTFOLIO
        <br />
        BUILD 2026.09
      </div>

      <div ref={headlineRef} className="relative z-10 px-6 pb-20 md:px-10 md:pb-28">
        <p className="hero-reveal hud-label mb-3 text-red">
          FREELANCE SOFTWARE ENGINEER
        </p>
        <h1 className="hero-reveal font-display text-[16vw] leading-[0.82] tracking-tight text-bone md:text-[9vw]">
          NICOLAS
          <br />
          <span className="text-stroke-red">DE GARRIGUES</span>
        </h1>
        <div className="hero-reveal mt-8 flex flex-wrap items-center gap-6">
          <a
            href="#projets"
            data-cursor-hover
            className="clip-notch-sm group relative inline-flex items-center gap-3 border border-red bg-red/10 px-6 py-3 font-tactical text-sm font-semibold uppercase tracking-[0.2em] text-bone transition-colors hover:bg-red hover:text-void"
          >
            Voir les projets
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#about"
            data-cursor-hover
            className="hud-label text-bone/70 transition-colors hover:text-red"
          >
            SCROLL // ABOUT ↓
          </a>
        </div>
      </div>
    </section>
  );
}
