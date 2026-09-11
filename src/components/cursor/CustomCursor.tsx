"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    document.body.classList.add("cursor-armed");

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;
    let hovering = false;
    let armed = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!armed) {
        armed = true;
        ringX = mouseX;
        ringY = mouseY;
        dotRef.current?.classList.remove("opacity-0");
        ringRef.current?.classList.remove("opacity-0");
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        "a, button, [data-cursor-hover]"
      );
      if (interactive !== hovering) {
        hovering = interactive;
        ringRef.current?.classList.toggle("scale-150", hovering);
        ringRef.current?.classList.toggle("border-red", hovering);
      }
    };

    const tick = () => {
      if (armed) {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-armed");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1 w-1 rounded-full bg-red opacity-0 transition-opacity duration-200"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 border border-bone/50 opacity-0 transition-[transform,border-color,opacity] duration-150 ease-out"
        style={{
          transform: "translate3d(-100px,-100px,0)",
          clipPath:
            "polygon(0 0, 30% 0, 30% 8%, 8% 8%, 8% 30%, 0 30%, 0 0, 70% 0, 70% 8%, 92% 8%, 92% 30%, 100% 30%, 100% 0, 100% 70%, 92% 70%, 92% 92%, 70% 92%, 70% 100%, 30% 100%, 30% 92%, 8% 92%, 8% 70%, 0 70%)",
        }}
      />
    </div>
  );
}
