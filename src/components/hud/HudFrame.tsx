"use client";

import { useEffect, useRef } from "react";

export default function HudFrame() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      if (barRef.current) barRef.current.style.height = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-red/60" />
      <div className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-red/60" />
      <div className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-red/60" />
      <div className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-red/60" />

      <div className="absolute right-6 top-1/2 h-[30vh] w-px -translate-y-1/2 bg-line">
        <div
          ref={barRef}
          className="absolute bottom-0 w-px bg-red shadow-[0_0_6px_rgba(255,70,85,0.8)] transition-[height] duration-150"
          style={{ height: 0 }}
        />
      </div>
    </div>
  );
}
