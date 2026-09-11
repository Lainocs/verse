"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LINES = [
  "ESTABLISHING UPLINK...",
  "AUTHENTICATING AGENT: N. DE GARRIGUES",
  "LOADING TACTICAL PROFILE...",
  "CALIBRATING RETICULE...",
  "ACCESS GRANTED",
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const lineTimer = setInterval(() => {
      setVisibleLines((v) => {
        if (v >= LINES.length) {
          clearInterval(lineTimer);
          return v;
        }
        return v + 1;
      });
    }, 260);

    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 14));
    }, 90);

    return () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
    };
  }, []);

  useEffect(() => {
    if (visibleLines < LINES.length || progress < 100 || doneRef.current) return;
    doneRef.current = true;

    const tl = gsap.timeline({
      delay: 0.35,
      onComplete: () => {
        document.body.style.overflow = "";
        onDone();
      },
    });

    tl.to(rootRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.7,
      ease: "power4.inOut",
    }).set(rootRef.current, { display: "none" });
  }, [visibleLines, progress, onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-void px-6"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="absolute inset-0 scanline-overlay" />
      <div className="w-full max-w-md">
        <div className="hud-label mb-4 flex items-center justify-between text-mute">
          <span>SYS//BOOT</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="mb-6 h-px w-full bg-line">
          <div
            className="h-px bg-red transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <ul className="space-y-2 font-tactical text-sm tracking-wide text-bone/80">
          {LINES.slice(0, visibleLines).map((line, i) => (
            <li key={line} className="flex gap-3">
              <span className="text-red">
                {i === LINES.length - 1 ? ">>" : "::"}
              </span>
              <span className={i === LINES.length - 1 ? "text-red" : ""}>
                {line}
              </span>
            </li>
          ))}
        </ul>
        {visibleLines >= LINES.length && (
          <span className="blink-caret ml-6 mt-2 inline-block h-4 w-2 bg-red" />
        )}
      </div>
    </div>
  );
}
