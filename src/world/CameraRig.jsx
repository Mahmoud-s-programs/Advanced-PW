import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { world } from './config';

export default function CameraRig({ reducedMotion, low }) {
  const target = useMemo(() => new Vector3(), []);
  useFrame(({ camera }, delta) => {
    if (reducedMotion) return;
    const travel = low ? 0.35 : 1;
    target.set(Math.sin(world.progress * Math.PI * 2) * 0.8 * travel + world.pointer.x * 0.17 * travel,
      3.7 + world.pointer.y * 0.09 * travel + world.progress * 0.3,
      14 - world.progress * 3.4 * travel);
    camera.position.lerp(target, 1 - Math.exp(-delta * 2.3));
    camera.lookAt(0,4.5,-18);
  });
  return null;
}

CameraRig.propTypes = { reducedMotion: PropTypes.bool.isRequired, low: PropTypes.bool.isRequired };
