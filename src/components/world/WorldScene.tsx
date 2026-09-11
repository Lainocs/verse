"use client";

/* eslint-disable react-hooks/purity, react-hooks/immutability --
 * this file is an imperative three.js/R3F render loop: procedural geometry
 * seeding and per-frame object/camera mutation are the intended pattern,
 * not a React render concern.
 */

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollProgress";
import { sampleCameraPath, getZone } from "@/lib/waypoints";
import ImagePanel from "./ImagePanel";
import SceneText from "./SceneText";

const RED = "#ff4655";
const BONE = "#ece8e1";

function CameraFlight() {
  const { camera, pointer } = useThree();
  const smoothedPos = useRef(new THREE.Vector3(0, 0, 8));
  const smoothedLook = useRef(new THREE.Vector3(0, 0, 0));
  const lastProgress = useRef(0);
  const lastTime = useRef(0);

  useFrame((state) => {
    const { position, lookAt } = sampleCameraPath(scrollState.progress);

    smoothedPos.current.lerp(position, 0.07);
    smoothedLook.current.lerp(lookAt, 0.09);

    camera.position.copy(smoothedPos.current);
    camera.position.x += pointer.x * 0.35;
    camera.position.y += pointer.y * 0.2;
    camera.lookAt(smoothedLook.current);

    const t = state.clock.getElapsedTime();
    const dt = t - lastTime.current || 1 / 60;
    lastTime.current = t;
    const instantVelocity =
      Math.abs(scrollState.progress - lastProgress.current) / dt;
    lastProgress.current = scrollState.progress;
    scrollState.velocity += (instantVelocity - scrollState.velocity) * 0.15;
  });

  return null;
}

function CentralBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<React.ComponentRef<typeof MeshDistortMaterial>>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.08;
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
    }
    const mat = materialRef.current as unknown as {
      distort: number;
      speed: number;
    } | null;
    if (mat) {
      const kick = Math.min(1, scrollState.velocity * 2.2);
      mat.distort = 0.32 + kick * 0.35;
      mat.speed = 1.2 + kick * 3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.5, 12]} />
      <MeshDistortMaterial
        ref={materialRef}
        color={RED}
        roughness={0.25}
        metalness={0.4}
        distort={0.32}
        speed={1.2}
        wireframe
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

function SatelliteCluster({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.12;
    groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.08;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh>
        <octahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color={RED} wireframe transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.9, 0.3, -0.4]} scale={0.35}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color={BONE} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh position={[-0.7, -0.4, 0.5]} scale={0.28}>
        <tetrahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color={RED} wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function ProjectRing({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.18;
  });

  const nodes = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        return [Math.cos(angle) * 1.6, Math.sin(angle) * 0.3, Math.sin(angle) * 1.6] as [
          number,
          number,
          number,
        ];
      }),
    []
  );

  return (
    <group ref={groupRef} position={position}>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <icosahedronGeometry args={[0.4, 0]} />
          <meshBasicMaterial color={RED} wireframe transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function FlightGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  useFrame((state) => {
    if (!gridRef.current) return;
    const mat = gridRef.current.material as THREE.Material & {
      opacity: number;
    };
    mat.opacity = 0.09 + Math.sin(state.clock.getElapsedTime() * 0.4) * 0.02;
  });
  return (
    <gridHelper
      ref={gridRef}
      args={[60, 60, RED, "#26292e"]}
      position={[0, -3.4, -6]}
    />
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2200;

  const [positions, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 14;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius * 0.6 - 4 - Math.random() * 14;
      seed[i] = Math.random() * Math.PI * 2;
    }
    return [pos, seed];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = t * 0.008;
    const geom = pointsRef.current.geometry as THREE.BufferGeometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const baseY = positions[i * 3 + 1];
      posAttr.setY(i, baseY + Math.sin(t * 0.5 + seeds[i]) * 0.12);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={RED}
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.55}
      />
    </points>
  );
}

function DepthFog() {
  const fogRef = useRef<THREE.Fog>(null);
  useFrame(() => {
    if (!fogRef.current) return;
    const p = scrollState.progress;
    fogRef.current.near = 5 + p * 2;
    fogRef.current.far = 16 + p * 6;
  });
  return <fog ref={fogRef} attach="fog" args={["#08090b", 6, 18]} />;
}

export default function WorldScene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 3, 6]} intensity={40} color={RED} />
      <pointLight position={[-4, -2, -4]} intensity={20} color={BONE} />

      <CameraFlight />
      <CentralBlob />
      <SatelliteCluster position={[-0.6, 0.3, -1]} scale={0.9} />
      <SatelliteCluster position={[0.4, -0.1, -6.2]} scale={0.7} />
      <ProjectRing position={[0.3, -0.2, -7.9]} />
      <FlightGrid />
      <ParticleField />
      <DepthFog />

      <ImagePanel
        src="/images/agent-fullbody-art.webp"
        position={[2.2, -0.3, 0.6]}
        width={1.9}
        zone={getZone("hero")}
      />
      <ImagePanel
        src="/images/agent-portrait-art.webp"
        position={[-0.6, 0.3, -0.85]}
        width={1.9}
        zone={getZone("about")}
      />

      {/* Experience — solid bone type, log-entry scale, no outline */}
      <SceneText
        position={[-0.7, 0.35, -1.3]}
        zone={getZone("parcours-1")}
        color={BONE}
        fontSize={0.42}
        maxWidth={3}
      >
        ESCAPE
      </SceneText>
      <SceneText
        position={[0.7, 0.5, -2.2]}
        zone={getZone("parcours-2")}
        color={BONE}
        fontSize={0.42}
        maxWidth={3}
        anchorX="center"
      >
        IIM DIGITAL SCHOOL
      </SceneText>
      <SceneText
        position={[-0.6, 0.15, -3.1]}
        zone={getZone("parcours-3")}
        color={BONE}
        fontSize={0.42}
        maxWidth={3}
      >
        LA 404 DEVINCI
      </SceneText>

      {/* Projects — big red outlined poster type */}
      <SceneText
        position={[-0.9, 0.3, -6.2]}
        zone={getZone("project-1")}
        color={RED}
        outlineColor="#08090b"
        outlineWidth={0.025}
        fontSize={0.62}
        maxWidth={3.4}
      >
        RIFTBOUND
      </SceneText>
      <SceneText
        position={[0.9, -0.2, -7.3]}
        zone={getZone("project-2")}
        color={RED}
        outlineColor="#08090b"
        outlineWidth={0.025}
        fontSize={0.62}
        maxWidth={3.4}
      >
        VIDÉOCLUB
      </SceneText>
      <SceneText
        position={[-0.5, 0.2, -8.4]}
        zone={getZone("project-3")}
        color={RED}
        outlineColor="#08090b"
        outlineWidth={0.025}
        fontSize={0.42}
        maxWidth={2.6}
      >
        LETTERBOXD BOT
      </SceneText>
      <SceneText
        position={[0.9, -0.3, -9.6]}
        zone={getZone("project-4")}
        color={RED}
        outlineColor="#08090b"
        outlineWidth={0.025}
        fontSize={0.5}
        maxWidth={3}
      >
        SPOTIFY STATS
      </SceneText>
    </>
  );
}
