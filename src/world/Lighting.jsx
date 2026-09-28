import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, FogExp2 } from 'three';
import { world } from './config';

export default function Lighting() {
  const sun = useRef(), fill = useRef();
  const fog = useMemo(() => new FogExp2('#765135', 0.021), []);
  const afternoon = useMemo(() => new Color('#765135'), []);
  const twilight = useMemo(() => new Color('#2d2330'), []);
  const dusk = useMemo(() => new Color('#c78780'), []);
  const gold = useMemo(() => new Color('#ffd099'), []);
  const projectColor = useMemo(() => new Color(), []);
  useFrame((_, delta) => {
    const p = world.progress;
    fog.color.copy(afternoon).lerp(twilight,p);
    fog.density = 0.021 + Math.sin(p*Math.PI) * 0.005;
    sun.current.color.copy(gold).lerp(dusk,p);
    sun.current.color.lerp(projectColor.set(world.projectTint), world.projectHover * 0.16);
    sun.current.intensity += (2.25-p*0.9+world.projectHover*.25-sun.current.intensity)*Math.min(1,delta*2);
    fill.current.intensity = 0.68 - p*0.2;
  });
  return <>
    <primitive object={fog} attach="fog" />
    <ambientLight intensity={0.24} color="#ccb3a0" />
    <hemisphereLight ref={fill} args={['#e8be7e','#38201c',0.68]} />
    <directionalLight ref={sun} position={[15,18,-10]} intensity={2.25} color="#ffd099" />
    <directionalLight position={[-9,5,8]} intensity={0.22} color="#bc8a6d" />
  </>;
}
