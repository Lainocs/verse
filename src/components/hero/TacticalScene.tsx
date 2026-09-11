"use client";

/* eslint-disable react-hooks/purity, react-hooks/immutability --
 * this file is an imperative three.js/R3F render loop: procedural geometry
 * seeding and per-frame object mutation are the intended pattern, not a
 * React render concern.
 */

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1400;

  const [positions, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 8;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius - 4;
      seed[i] = Math.random() * Math.PI * 2;
    }
    return [pos, seed];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = t * 0.02;

    const geom = pointsRef.current.geometry as THREE.BufferGeometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const baseY = positions[i * 3 + 1];
      posAttr.setY(i, baseY + Math.sin(t * 0.6 + seeds[i]) * 0.15);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff4655"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.75}
      />
    </points>
  );
}

function TacticalGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  useFrame((state) => {
    if (!gridRef.current) return;
    const mat = gridRef.current.material as THREE.Material & {
      opacity: number;
    };
    mat.opacity = 0.12 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.03;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, "#ff4655", "#26292e"]}
      position={[0, -3, 0]}
    />
  );
}

function CoreShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={[0, 0.4, -3]}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#ff4655" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function MouseParallaxRig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    target.current.x += (pointer.x * 1.1 - target.current.x) * 0.04;
    target.current.y += (pointer.y * 0.6 - target.current.y) * 0.04;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, -3);
  });

  return null;
}

export default function TacticalScene() {
  return (
    <>
      <MouseParallaxRig />
      <ParticleField />
      <TacticalGrid />
      <CoreShape />
      <fog attach="fog" args={["#08090b", 8, 22]} />
    </>
  );
}
