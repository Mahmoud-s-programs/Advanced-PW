import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, DoubleSide, Object3D, Vector3 } from 'three';
import { barkGeometry, mapleGeometry } from './geometry';
import { palette, seededRandom, world } from './config';

export default function AutumnEnvironment({ settings, reducedMotion }) {
  const trunks = useRef(), branches = useRef(), foliage = useRef(), forest = useRef();
  const [bark, maple] = useMemo(() => [barkGeometry(), mapleGeometry()], []);
  const trees = useMemo(() => {
    const random = seededRandom(51);
    return Array.from({ length: settings.trees }, (_, i) => {
      const side = i % 2 ? 1 : -1;
      const near = i < 4;
      return {
        x: side * (near ? 5.4 + random() * 2.2 : 4.2 + random() * 22),
        z: near ? 4 - i * 3.2 : -4 - random() * 57,
        height: near ? 12 + random() * 3 : 7 + random() * 8,
        radius: near ? 0.38 + random() * 0.2 : 0.14 + random() * 0.32,
        seed: random() * 100,
      };
    });
  }, [settings.trees]);

  useLayoutEffect(() => {
    const dummy = new Object3D(), axis = new Vector3(0,1,0);
    const random = seededRandom(64), color = new Color();
    const colors = [palette.ember, palette.orange, palette.gold, '#bd7937', '#76513a', '#a88747'];
    trees.forEach((tree, i) => {
      dummy.position.set(tree.x, tree.height / 2 - 1, tree.z);
      dummy.rotation.set(0, tree.seed, 0.03 * Math.sin(tree.seed));
      dummy.scale.set(tree.radius, tree.height, tree.radius);
      dummy.updateMatrix();
      trunks.current.setMatrixAt(i, dummy.matrix);
      for (let j = 0; j < 7; j++) {
        const angle = j * 2.4 + tree.seed;
        const start = new Vector3(tree.x, tree.height * (0.44 + j * 0.065) - 1, tree.z);
        const end = new Vector3(tree.x + Math.cos(angle) * (2 + random() * 2.5), start.y + 1.5 + random() * 2.7, tree.z + Math.sin(angle) * (2 + random() * 2.5));
        const direction = end.clone().sub(start);
        dummy.position.copy(start).add(end).multiplyScalar(0.5);
        dummy.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
        const radius = tree.radius * (0.26 - j * 0.02);
        dummy.scale.set(radius, direction.length(), radius);
        dummy.updateMatrix();
        branches.current.setMatrixAt(i * 7 + j, dummy.matrix);
      }
    });
    for (let i = 0; i < settings.canopy; i++) {
      const tree = trees[i % trees.length];
      const angle = random() * Math.PI * 2;
      const radius = Math.sqrt(random()) * (3.2 + Math.sin(tree.seed) * 0.9);
      const height = tree.height - 1.5 + (random() - 0.5) * 3.7;
      dummy.position.set(tree.x + Math.cos(angle) * radius, height, tree.z + Math.sin(angle) * radius);
      dummy.rotation.set(random() * Math.PI, random() * Math.PI, random() * Math.PI * 2);
      const size = 0.19 + random() * 0.39;
      dummy.scale.set(size, size, size);
      dummy.updateMatrix();
      foliage.current.setMatrixAt(i, dummy.matrix);
      color.set(colors[Math.floor(random() * colors.length)]).multiplyScalar(0.7 + random() * 0.55);
      foliage.current.setColorAt(i, color);
    }
    trunks.current.instanceMatrix.needsUpdate = true;
    branches.current.instanceMatrix.needsUpdate = true;
    foliage.current.instanceMatrix.needsUpdate = true;
    foliage.current.instanceColor.needsUpdate = true;
  }, [trees, settings.canopy]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    // The trees part at the final overlook, opening the horizon at contact.
    const opening = Math.max(0, (world.progress - 0.78) / 0.22);
    forest.current.scale.x += (1 + opening * 0.6 - forest.current.scale.x) * Math.min(delta * 2, 1);
    foliage.current.rotation.z = Math.sin(world.time * 0.11) * 0.002;
  });

  useEffect(() => () => { bark.dispose(); maple.dispose(); }, [bark, maple]);

  return <group ref={forest}>
    <instancedMesh ref={trunks} args={[bark, null, settings.trees]} frustumCulled={false}>
      <meshStandardMaterial vertexColors roughness={1} />
    </instancedMesh>
    <instancedMesh ref={branches} args={[bark, null, settings.trees * 7]} frustumCulled={false}>
      <meshStandardMaterial color="#3d281e" roughness={1} />
    </instancedMesh>
    <instancedMesh ref={foliage} args={[maple, null, settings.canopy]} frustumCulled={false}>
      <meshStandardMaterial side={DoubleSide} roughness={0.83} metalness={0.06} />
    </instancedMesh>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.05,-22]}>
      <planeGeometry args={[120,160,1,1]} />
      <meshStandardMaterial color="#30211a" roughness={1} />
    </mesh>
  </group>;
}

AutumnEnvironment.propTypes = { settings: PropTypes.shape({ trees: PropTypes.number.isRequired, canopy: PropTypes.number.isRequired }).isRequired, reducedMotion: PropTypes.bool.isRequired };
