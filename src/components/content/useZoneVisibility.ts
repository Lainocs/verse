"use client";

import { useEffect, useRef } from "react";
import { scrollState } from "@/lib/scrollProgress";
import { CONTENT_ZONES, zoneVisibility } from "@/lib/waypoints";

export function useZoneVisibility() {
  const refs = useRef(new Map<string, HTMLElement>());

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      for (const zone of CONTENT_ZONES) {
        const el = refs.current.get(zone.id);
        if (!el) continue;
        const v = zoneVisibility(scrollState.progress, zone);
        el.style.opacity = String(v);
        el.style.transform = `translateY(${(1 - v) * 24}px)`;
        el.style.pointerEvents = v > 0.5 ? "auto" : "none";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (id: string) => (el: HTMLElement | null) => {
    if (el) refs.current.set(id, el);
    else refs.current.delete(id);
  };
}
