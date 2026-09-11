"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import type * as THREE from "three";
import { scrollState } from "@/lib/scrollProgress";
import { zoneVisibility, type ContentZone } from "@/lib/waypoints";

const FONT = "/fonts/BebasNeue-Regular.ttf";

export default function SceneText({
  children,
  position,
  zone,
  color = "#ece8e1",
  outlineColor,
  outlineWidth = 0,
  fontSize = 0.6,
  maxWidth = 6,
  anchorX = "center",
  letterSpacing = 0,
}: {
  children: string;
  position: [number, number, number];
  zone: ContentZone;
  color?: string;
  outlineColor?: string;
  outlineWidth?: number;
  fontSize?: number;
  maxWidth?: number;
  anchorX?: "left" | "center" | "right";
  letterSpacing?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const v = zoneVisibility(scrollState.progress, zone);
    const obj = meshRef.current;
    if (!obj) return;
    obj.visible = v > 0.01;
    const mat = obj.material as THREE.Material & { opacity: number };
    if (mat) mat.opacity = v;
  });

  return (
    <Billboard position={position}>
      <Text
        ref={meshRef}
        font={FONT}
        fontSize={fontSize}
        maxWidth={maxWidth}
        color={color}
        outlineColor={outlineColor}
        outlineWidth={outlineWidth}
        anchorX={anchorX}
        anchorY="middle"
        letterSpacing={letterSpacing}
        material-transparent
        material-opacity={0}
      >
        {children}
      </Text>
    </Billboard>
  );
}
