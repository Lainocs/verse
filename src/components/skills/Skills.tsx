"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiSvelte,
  SiVuedotjs,
  SiReact,
  SiTailwindcss,
  SiGraphql,
  SiNextdotjs,
  SiThreedotjs,
  SiNodedotjs,
  SiPrisma,
  SiPhp,
  SiLaravel,
  SiPython,
  SiGo,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiGit,
} from "react-icons/si";
import { FiCloud } from "react-icons/fi";

type Skill = { label: string; icon: IconType };

const CATEGORIES: { id: string; title: string; skills: Skill[] }[] = [
  {
    id: "01",
    title: "FRONTEND",
    skills: [
      { label: "TypeScript", icon: SiTypescript },
      { label: "JavaScript", icon: SiJavascript },
      { label: "Svelte", icon: SiSvelte },
      { label: "Vue.js", icon: SiVuedotjs },
      { label: "React", icon: SiReact },
      { label: "Next.js", icon: SiNextdotjs },
      { label: "Tailwind CSS", icon: SiTailwindcss },
      { label: "Three.js", icon: SiThreedotjs },
    ],
  },
  {
    id: "02",
    title: "BACKEND",
    skills: [
      { label: "Node.js", icon: SiNodedotjs },
      { label: "GraphQL", icon: SiGraphql },
      { label: "Prisma", icon: SiPrisma },
      { label: "PHP", icon: SiPhp },
      { label: "Laravel", icon: SiLaravel },
      { label: "Python", icon: SiPython },
      { label: "Go", icon: SiGo },
      { label: "PostgreSQL", icon: SiPostgresql },
      { label: "MySQL", icon: SiMysql },
    ],
  },
  {
    id: "03",
    title: "DEVOPS & CLOUD",
    skills: [
      { label: "Docker", icon: SiDocker },
      { label: "Kubernetes", icon: SiKubernetes },
      { label: "AWS", icon: FiCloud },
      { label: "Terraform", icon: SiTerraform },
      { label: "Git", icon: SiGit },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        scanRef.current,
        { top: "0%", opacity: 1 },
        {
          top: "100%",
          opacity: 0,
          duration: 1.1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".skill-group").forEach((group, i) => {
        gsap.fromTo(
          group,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );

        gsap.fromTo(
          group.querySelectorAll(".skill-chip"),
          { opacity: 0, y: 14, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.04,
            delay: 0.2 + i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-void-raised/60 py-28 backdrop-blur-md md:py-36"
    >
      <div
        ref={scanRef}
        className="pointer-events-none absolute left-0 right-0 h-24 bg-gradient-to-b from-red/25 via-red/5 to-transparent"
        style={{ top: 0 }}
      />
      <div className="absolute inset-0 opacity-30">
        <div className="scanline-overlay" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <p className="hud-label mb-4 text-red">— LOADOUT</p>
        <h2 className="mb-16 font-display text-5xl leading-[0.9] text-bone md:text-6xl">
          STACK & OUTILS
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {CATEGORIES.map((cat, i) => (
          <div key={cat.id} className="skill-group">
            <div className="mx-auto mb-4 flex max-w-6xl items-center gap-3 px-6 md:px-10">
              <span className="hud-label text-red">{cat.id}</span>
              <span className="hud-label text-mute">{cat.title}</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="marquee-pause-hover relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
              <div
                className={`marquee-track flex w-max gap-3 ${i % 2 === 1 ? "marquee-reverse" : ""}`}
                style={{ animationDuration: `${cat.skills.length * 3.2}s` }}
              >
                {[...cat.skills, ...cat.skills].map((skill, si) => (
                  <div
                    key={`${skill.label}-${si}`}
                    className="skill-chip clip-notch-sm flex shrink-0 items-center gap-2 border border-line bg-panel px-4 py-2.5 text-sm text-bone/85 transition-colors hover:border-red hover:text-bone"
                  >
                    <skill.icon className="h-4 w-4 text-red" />
                    {skill.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
