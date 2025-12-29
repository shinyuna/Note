export interface Worry {
  id: string;
  text: string;
  timestamp: number;
}

export type WorryFlowPhase =
  | 'idle'
  | 'writing'
  | 'crumpling'
  | 'readyToThrow'
  | 'throwing'
  | 'burning'
  | 'done';

export interface CampfireHandle {
  boostFire: () => void;
  getFireCenter: () => { x: number; y: number };
}

export interface FireState {
  particles: Particle[];
  time: number;
  intensity: number;
  effectiveIntensity: number;
  fireBoostWave: number;
  soundEnabled: boolean;
}

export interface Particle {
  type: 'flame' | 'core' | 'spark' | 'smoke' | 'ember';
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  seed: number;
  size?: number;
  scale?: number;
  spriteIdx?: number;
  angle?: number;
  rotationSpeed?: number;
  depth?: number;
}


