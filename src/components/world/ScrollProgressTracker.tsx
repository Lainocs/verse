"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { scrollState } from "@/lib/scrollProgress";

export default function ScrollProgressTracker() {
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });
    return () => st.kill();
  }, []);

  return null;
}
