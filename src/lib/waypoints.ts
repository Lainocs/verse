import * as THREE from "three";

export type Waypoint = {
  t: number;
  pos: [number, number, number];
  look: [number, number, number];
};

// One continuous camera flight path through the whole piece. `t` runs 0→1
// across the entire page scroll — content zones below reuse the same scale.
export const WAYPOINTS: Waypoint[] = [
  { t: 0.0, pos: [0, 0, 8], look: [0, 0, 0] },
  { t: 0.14, pos: [1.6, 0.4, 5.5], look: [0, 0.1, 0] },
  { t: 0.3, pos: [-2.6, 0.9, 2.6], look: [-0.6, 0.3, -1] },
  { t: 0.46, pos: [2.4, -0.6, -0.8], look: [0.4, -0.1, -3] },
  { t: 0.63, pos: [-2.8, 1.1, -4], look: [-0.3, 0.4, -6.2] },
  { t: 0.8, pos: [2.6, -0.8, -7.6], look: [0.3, -0.2, -9.6] },
  { t: 1.0, pos: [0, 0.4, -11], look: [0, 0.1, -14] },
];

const posCurve = new THREE.CatmullRomCurve3(
  WAYPOINTS.map((w) => new THREE.Vector3(...w.pos)),
  false,
  "catmullrom",
  0.5
);
const lookCurve = new THREE.CatmullRomCurve3(
  WAYPOINTS.map((w) => new THREE.Vector3(...w.look)),
  false,
  "catmullrom",
  0.5
);

const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();

export function sampleCameraPath(progress: number) {
  const t = THREE.MathUtils.clamp(progress, 0, 1);
  posCurve.getPoint(t, _pos);
  lookCurve.getPoint(t, _look);
  return { position: _pos, lookAt: _look };
}

export type ContentZone = {
  id: string;
  center: number;
  halfWidth: number;
};

// Content fade windows — independent pacing from the camera path above,
// tuned so each block has room to breathe before the next arrives.
export const CONTENT_ZONES: ContentZone[] = [
  { id: "hero", center: 0.0, halfWidth: 0.07 },
  { id: "about", center: 0.22, halfWidth: 0.07 },
  { id: "parcours-1", center: 0.36, halfWidth: 0.045 },
  { id: "parcours-2", center: 0.44, halfWidth: 0.045 },
  { id: "parcours-3", center: 0.52, halfWidth: 0.045 },
  { id: "project-1", center: 0.62, halfWidth: 0.035 },
  { id: "project-2", center: 0.685, halfWidth: 0.035 },
  { id: "project-3", center: 0.75, halfWidth: 0.035 },
  { id: "project-4", center: 0.815, halfWidth: 0.035 },
  { id: "skills", center: 0.9, halfWidth: 0.055 },
  { id: "contact", center: 1.0, halfWidth: 0.06 },
];

// 0 at the edges of the zone, 1 at its center — smoothstep falloff.
export function zoneVisibility(progress: number, zone: ContentZone) {
  const d = Math.abs(progress - zone.center);
  const x = 1 - THREE.MathUtils.clamp(d / zone.halfWidth, 0, 1);
  return x * x * (3 - 2 * x);
}
