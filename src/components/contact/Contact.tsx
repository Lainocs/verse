"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { FiGithub, FiLinkedin, FiArrowUpRight, FiMail } from "react-icons/fi";

const EMAIL = "ndegarrigues@gmail.com";

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/lainocs",
    icon: FiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/nicolasdegarrigues",
    icon: FiLinkedin,
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-line",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-void/60 pb-16 pt-24 backdrop-blur-md md:pb-20 md:pt-32"
    >
      <div className="absolute inset-0 scanline-overlay opacity-40" />
      <div className="noise-grain" />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <p className="contact-line hud-label mb-5 flex items-center justify-center gap-2 text-red">
          <span className="h-1.5 w-1.5 animate-flicker rounded-full bg-red" />
          — TRANSMISSION
        </p>
        <h2 className="contact-line font-display text-6xl leading-[0.85] text-bone md:text-8xl">
          OUVRIR
          <br />
          <span className="text-stroke-red">LE CANAL</span>
        </h2>
        <p className="contact-line mx-auto mt-6 max-w-md text-base leading-relaxed text-bone/65 md:text-lg">
          Un projet, une idée, ou juste envie de parler code — le canal est
          ouvert.
        </p>

        <a
          href={`mailto:${EMAIL}`}
          data-cursor-hover
          className="contact-line group mt-10 inline-flex items-center gap-3 border-b-2 border-red pb-2 font-display text-2xl tracking-wide text-bone transition-colors hover:text-red md:text-4xl"
        >
          <FiMail className="h-6 w-6 text-red md:h-8 md:w-8" />
          {EMAIL}
        </a>

        <div className="contact-line mt-12 flex flex-wrap items-center justify-center gap-4">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="clip-notch-sm group inline-flex items-center gap-2 border border-line bg-panel px-5 py-3 font-tactical text-sm font-semibold uppercase tracking-[0.2em] text-bone/85 transition-colors hover:border-red hover:text-bone"
            >
              <link.icon className="h-4 w-4 text-red" />
              {link.label}
              <FiArrowUpRight className="h-3.5 w-3.5 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red" />
            </a>
          ))}
        </div>
      </div>

      <div className="contact-line relative mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-line px-6 pt-6 text-center md:flex-row md:px-10 md:text-left">
        <p className="hud-label text-mute">
          © 2026 NICOLAS DE GARRIGUES — PARIS, FR
        </p>
        <p className="hud-label text-mute">
          BUILT WITH NEXT.JS · THREE.JS · GSAP
        </p>
      </div>
    </section>
  );
}
