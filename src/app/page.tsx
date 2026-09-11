"use client";

import { useState } from "react";
import BootSequence from "@/components/intro/BootSequence";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <main className="flex flex-1 flex-col bg-void">
        <Hero />
        <About />
      </main>
    </>
  );
}
