export const palette = {
  bark: '#120d0b', mahogany: '#261310', burgundy: '#401816',
  ember: '#a43f24', orange: '#d9672d', gold: '#f0a43b',
  amber: '#ffc66d', cream: '#f7e9d2', sage: '#74785c', dusk: '#292330',
};

export const qualityTiers = {
  high: { trees: 52, canopy: 8200, leaves: 44, dust: 100, rays: 7, dpr: 1.5 },
  medium: { trees: 34, canopy: 4400, leaves: 26, dust: 60, rays: 4, dpr: 1.25 },
  low: { trees: 20, canopy: 1600, leaves: 10, dust: 24, rays: 0, dpr: 1 },
};

export const chapters = [
  { id: 'home', name: 'Arrival', scene: 'The golden hour' },
  { id: 'about', name: 'About', scene: 'Beneath the canopy' },
  { id: 'skills', name: 'Skills', scene: 'A living ecosystem' },
  { id: 'projects', name: 'Projects', scene: 'The gallery clearing' },
  { id: 'work', name: 'Journey', scene: 'Along the trail' },
  { id: 'contact', name: 'Contact', scene: 'The last light' },
];

// Mutable frame inputs keep pointer/scroll updates out of React's render loop.
export const world = {
  progress: 0, pointer: { x: 0, y: 0 }, chapter: 0,
  projectHover: 0, projectTint: '#ffd099', gustUntil: 0, time: 0, frames: 0,
  orbit: 0, unfolded: false, dragUntil: 0,
  sequence: { arrival: 0, skills: 0, archive: 0, career: 0 },
  invalidate: null, lenis: null,
  route: {x:0,y:3.4,z:16,tx:0,ty:2.3,tz:-3,mood:0,fog:.026,key:3.5},
};

export function seededRandom(seed = 79) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}
