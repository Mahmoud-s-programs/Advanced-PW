import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, DoubleSide, Object3D } from 'three';
import { mapleGeometry } from './geometry';
import { palette, seededRandom, world } from './config';

export default function LeafSystem({ count, reducedMotion }) {
  const mesh = useRef();
  const geometry = useMemo(mapleGeometry, []);
  const dummy = useMemo(() => new Object3D(), []);
  const leaves = useMemo(() => {
    const random = seededRandom(118);
    return Array.from({ length: count }, (_, i) => ({
      x: (random() - 0.5) * 27,
      z: i < 12 ? random() * 35 - 23 : random() * 143 - 139,
      phase: random() * Math.PI * 2,
      speed: 0.18 + random() * 0.38,
      size: i === 0 ? 0.5 : 0.07 + random() * 0.18,
      offset: random() * 13,
    }));
  }, [count]);

  const positionLeaves = (time) => {
    const gust = Math.max(0, world.gustUntil - time) * 0.65;
    leaves.forEach((leaf, i) => {
      const t = time * leaf.speed;
      const nearbyWind = Math.exp(-Math.abs(leaf.x-world.pointer.x*8)*0.4) * world.pointer.x * 0.3;
      let x = leaf.x + Math.sin(t * 0.6 + leaf.phase) * (1.5 + gust) + nearbyWind;
      const y = 10 - ((t + leaf.offset) % 12) + Math.sin(t + leaf.phase) * 0.35;
      // Leave the central reading area clear. Edge leaves carry the atmosphere.
      if (Math.abs(x) < 2.8 && y > 2 && y < 7) x += x < 0 ? -3 : 3;
      dummy.position.set(x, y, leaf.z);
      if (i === 0 && time < 3.5) {
        dummy.position.set(-10 + time * 6, 7 - time * 0.4, 10);
      }
      dummy.rotation.set(t * 0.7 + leaf.phase, t * 0.4, Math.sin(t) * 0.5 + leaf.phase);
      const calm = world.progress > 0.85 && i % 3 !== 0 ? 0.001 : leaf.size;
      dummy.scale.setScalar(calm);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  };

  useLayoutEffect(() => {
    world.leafDepths = leaves.map(leaf => leaf.z);
    const color = new Color();
    leaves.forEach((_, i) => mesh.current.setColorAt(i, color.set(i % 5 === 0 ? palette.amber : i % 2 ? palette.orange : palette.ember)));
    mesh.current.instanceColor.needsUpdate = true;
    positionLeaves(4);
    // Instance initialization only; the render loop owns subsequent positions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaves]);
  useFrame(() => { if (!reducedMotion) positionLeaves(world.time); });
  useEffect(() => () => geometry.dispose(), [geometry]);

  return <instancedMesh ref={mesh} args={[geometry, null, count]} frustumCulled={false}>
    <meshStandardMaterial side={DoubleSide} roughness={0.7} metalness={0.12} />
  </instancedMesh>;
}

LeafSystem.propTypes = { count: PropTypes.number.isRequired, reducedMotion: PropTypes.bool.isRequired };
