"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import TacticalScene from "./TacticalScene";

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 55 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <TacticalScene />
      </Suspense>
    </Canvas>
  );
}
