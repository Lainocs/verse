"use client";

import { useState } from "react";
import BootSequence from "@/components/intro/BootSequence";

const SCROLL_LENGTH_VH = 650;

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <main style={{ height: `${SCROLL_LENGTH_VH}vh` }} />
    </>
  );
}
