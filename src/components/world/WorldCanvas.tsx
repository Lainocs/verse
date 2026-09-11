"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import WorldScene from "./WorldScene";

export default function WorldCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <WorldScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
