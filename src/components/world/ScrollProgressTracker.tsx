"use client";

import { useEffect } from "react";
import { scrollState } from "@/lib/scrollProgress";

export default function ScrollProgressTracker() {
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      scrollState.progress = max > 0 ? doc.scrollTop / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
