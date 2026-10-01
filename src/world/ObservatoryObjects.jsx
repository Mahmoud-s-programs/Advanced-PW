import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Line, Sparkles } from '@react-three/drei';
import { AdditiveBlending, Color, DoubleSide } from 'three';
import { useJourney } from './useJourney';
import { world } from './config';
import { createPetalGeometry, petalSpine, orbitPoints } from './sculptureGeometry';
import { amberVertex, amberFragment, haloVertex, haloFragment } from './shaders';

export function StudioLight() {
  const { quality } = useJourney();
  return <>
    <ambientLight intensity={0.55} color='#d8bf9e' />
    <directionalLight position={[-5,7,6]} intensity={3.2} color='#fff0d5' />
    <directionalLight position={[5,1,-4]} intensity={2.4} color='#ef9b45' />
    <pointLight position={[0,-2,3]} intensity={12} distance={15} color='#a98968' />
    <Environment resolution={quality === 'low' ? 64 : 128} frames={1}>
      <Lightformer intensity={4} position={[0,5,4]} scale={[8,3,1]} color='#fff7e9' />
      <Lightformer intensity={3} position={[-5,0,2]} rotation={[0,Math.PI/2,0]} scale={[2,8,1]} color='#ffd390' />
      <Lightformer intensity={2.5} position={[5,1,-2]} rotation={[0,-Math.PI/2,0]} scale={[2,6,1]} color='#d5ded0' />
    </Environment>
  </>;
}

export function AmberCore({ scale = 1, color = '#eeaa4e' }) {
  const { reducedMotion, quality } = useJourney();
  const material = useRef();
  const uniforms = useMemo(() => ({ uTime:{value:0}, uOpen:{value:0}, uColor:{value:new Color(color)} }), [color]);
  useFrame(() => {
    material.current.uniforms.uTime.value = reducedMotion ? 0 : world.time;
    material.current.uniforms.uOpen.value = world.unfolded ? 1 : world.sequence.arrival;
  });
  return <mesh scale={[scale * 0.82, scale * 1.12, scale * 0.82]}>
    <sphereGeometry args={[1,quality === 'low' ? 24 : 48,quality === 'low' ? 20 : 48]} />
    <shaderMaterial ref={material} uniforms={uniforms} vertexShader={amberVertex} fragmentShader={amberFragment} />
  </mesh>;
}

export function CausticHalo({ y = -2.5, scale = 1 }) {
  const { reducedMotion } = useJourney();
  const material = useRef();
  const uniforms = useMemo(() => ({uTime:{value:0},uProgress:{value:0}}), []);
  useFrame(() => {
    material.current.uniforms.uTime.value = reducedMotion ? 0 : world.time;
    material.current.uniforms.uProgress.value = world.sequence.arrival;
  });
  return <mesh rotation={[-Math.PI/2,0,0]} position={[0,y,0]} scale={scale}>
    <planeGeometry args={[11,11]} />
    <shaderMaterial ref={material} uniforms={uniforms} vertexShader={haloVertex} fragmentShader={haloFragment} transparent blending={AdditiveBlending} depthWrite={false} side={DoubleSide} />
  </mesh>;
}

export function AmberSculpture({ scale = 1, interactive = false }) {
  const root = useRef(), petals = useRef([]), rings = useRef([]);
  const { reducedMotion, quality } = useJourney();
  const geometry = useMemo(() => createPetalGeometry(quality === 'low' ? 24 : 42), [quality]);
  const spine = useMemo(petalSpine, []);
  const open = useRef(0);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame((_, delta) => {
    const target = interactive && world.unfolded ? 1 : 0.32 + world.sequence.arrival * 0.35;
    open.current += (target - open.current) * (reducedMotion ? 1 : Math.min(1, delta * 4));
    root.current.rotation.y = (interactive ? world.orbit : 0) + world.sequence.arrival * 0.75 + (reducedMotion || world.time < world.dragUntil ? 0 : world.time * 0.065);
    root.current.rotation.z = -0.14 + (reducedMotion ? 0 : Math.sin(world.time * 0.22) * 0.025);
    root.current.position.y = reducedMotion ? 0 : Math.sin(world.time * 0.55) * 0.09;
    petals.current.forEach((petal, i) => {
      petal.rotation.x = -open.current * (0.55 + (i % 2) * 0.08);
      petal.position.z = 0.17 + open.current * 0.24;
    });
    rings.current.forEach((ring, i) => {
      ring.rotation.z = i * 0.7 + (reducedMotion ? 0 : world.time * (i % 2 ? -0.08 : 0.05));
    });
  });
  return <group ref={root} scale={scale}>
    <AmberCore scale={0.83} />
    {Array.from({length:6}, (_, i) => <group key={i} rotation={[0,i*Math.PI/3,0]} position={[0,-1.65,0]}>
      <group ref={el => { petals.current[i] = el; }}>
        <mesh castShadow geometry={geometry}>
          <meshPhysicalMaterial color={i % 2 ? '#b77938' : '#e6b473'} roughness={0.24} metalness={0.65} clearcoat={1} clearcoatRoughness={0.15} side={DoubleSide} envMapIntensity={1.5} />
        </mesh>
        <mesh><tubeGeometry args={[spine,42,0.013,5,false]} /><meshStandardMaterial color='#e5bf75' metalness={0.9} roughness={0.22} /></mesh>
      </group>
    </group>)}
    {[2.32,2.75,3.02].map((radius, i) => <group key={radius} rotation={[0.8+i*0.45,0.4+i*0.6,0]}>
      <group ref={el => { rings.current[i] = el; }}>
        <mesh><torusGeometry args={[radius,i===1?0.026:0.018,6,quality==='low'?72:120,Math.PI*1.8]} /><meshStandardMaterial color={i===1?'#e8c697':'#af7745'} metalness={0.94} roughness={0.2} /></mesh>
        <mesh position={[radius,0,0]}><sphereGeometry args={[0.09,16,16]} /><meshStandardMaterial color='#ffe2ab' metalness={0.7} roughness={0.15} emissive='#a85a16' emissiveIntensity={0.5} /></mesh>
      </group>
    </group>)}
    <Line points={orbitPoints(3.3,0.15)} color='#d4a15c' lineWidth={0.55} transparent opacity={0.22} />
  </group>;
}

export function ObservatoryMotes() {
  const { quality, reducedMotion } = useJourney();
  return <Sparkles count={quality==='low'?18:60} scale={[10,7,7]} size={quality==='low'?2:3} speed={reducedMotion?0:0.25} opacity={0.35} color='#e7c183' noise={[0.2,0.3,0.2]} />;
}

AmberCore.propTypes = { scale:PropTypes.number, color:PropTypes.string };
CausticHalo.propTypes = { y:PropTypes.number, scale:PropTypes.number };
AmberSculpture.propTypes = { scale:PropTypes.number, interactive:PropTypes.bool };
