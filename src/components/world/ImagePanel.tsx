"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollProgress";
import { zoneVisibility, type ContentZone } from "@/lib/waypoints";

export default function ImagePanel({
  src,
  position,
  width,
  zone,
}: {
  src: string;
  position: [number, number, number];
  width: number;
  zone: ContentZone;
}) {
  const texture = useTexture(src);
  const meshRef = useRef<THREE.Mesh>(null);

  const image = texture.image as { width: number; height: number } | undefined;
  const aspect = image ? image.width / image.height : 0.75;
  const height = width / aspect;

  useFrame(() => {
    const v = zoneVisibility(scrollState.progress, zone);
    const mat = meshRef.current?.material as THREE.MeshBasicMaterial | undefined;
    if (mat) mat.opacity = v * 0.95;
  });

  return (
    <Billboard position={position}>
      <mesh ref={meshRef}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>
    </Billboard>
  );
}
