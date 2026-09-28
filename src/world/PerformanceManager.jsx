import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { world } from './config';

export default function PerformanceManager({ automatic, degrade, reducedMotion }) {
  const sample = useRef({ time:0, frames:0, cooldown:5 });
  useFrame(({ gl }, delta) => {
    if (!reducedMotion) world.time += Math.min(delta, 0.06);
    world.frames++;
    if (world.frames % 30 === 0) {
      world.metrics = {
        drawCalls: gl.info.render.calls,
        triangles: gl.info.render.triangles,
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
      };
    }
    if (!automatic || reducedMotion) return;
    const current = sample.current;
    if (current.cooldown > 0) { current.cooldown -= delta; return; }
    current.time += delta;
    current.frames++;
    if (current.time > 3) {
      if (current.frames/current.time < 32) degrade();
      current.time = 0; current.frames = 0; current.cooldown = 8;
    }
  });
  return null;
}

PerformanceManager.propTypes = { automatic: PropTypes.bool.isRequired, degrade: PropTypes.func.isRequired, reducedMotion: PropTypes.bool.isRequired };
