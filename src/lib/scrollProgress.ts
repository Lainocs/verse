// Mutable, non-reactive scroll state read every frame by the persistent
// R3F world scene. Deliberately not React state — avoids re-rendering the
// component tree 60x/sec while scrolling.
export const scrollState = {
  progress: 0,
};
