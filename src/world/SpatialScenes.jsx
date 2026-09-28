import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Line, PerspectiveCamera, QuadraticBezierLine, RoundedBox, useTexture } from '@react-three/drei';
import { SRGBColorSpace } from 'three';
import { experiences, technologies, resumeLink } from '../constants';
import { world } from './config';
import { useJourney } from './useJourney';
import { galleryProjects, skillNodes, skillDisplayName } from './spatialData';
import { StudioLight, AmberCore, AmberSculpture, CausticHalo, ObservatoryMotes } from './ObservatoryObjects';
import { orbitPoints } from './sculptureGeometry';
import { gsap } from './smoothScroll';

export function HeroScene() {
  const { reducedMotion } = useJourney();
  const camera = useThree(state => state.camera);
  useFrame(() => {
    camera.position.set(reducedMotion ? 0 : world.pointer.x * 0.15, 0.25, 10.5 - world.sequence.arrival * 1.4);
    camera.lookAt(0,0,0);
  });
  return <>
    <PerspectiveCamera makeDefault position={[0,0.25,10.5]} fov={43} />
    <StudioLight /><AmberSculpture interactive /><CausticHalo /><ObservatoryMotes />
  </>;
}

function SkillSatellite({ node, relevant, active, onSelect, onHover, portal, calculatePosition }) {
  const satellite = useRef();
  const { reducedMotion } = useJourney();
  const position = useMemo(() => [(node.x-50)/9.3, (50-node.y)/15, Math.sin(node.x)*0.5], [node]);
  const technology = technologies.find(item => item.name === node.name);
  useFrame(() => {
    const wave = reducedMotion ? 0 : Math.sin(world.time*0.6 + node.x)*0.035;
    satellite.current.position.y = position[1] + wave;
    satellite.current.rotation.y = reducedMotion ? 0 : world.time*0.08;
  });
  return <>
    <QuadraticBezierLine start={[0,0,-1]} end={position} mid={[position[0]*0.25,position[1]*1.2,-1.3]} color='#ce9e59' lineWidth={active?1.4:0.65} transparent opacity={relevant?0.32:0.05} />
    <group ref={satellite} position={position}>
      <mesh onClick={() => onSelect(node)}><icosahedronGeometry args={[active?0.17:0.12,1]} /><meshStandardMaterial color={relevant?'#e9c084':'#514334'} metalness={0.85} roughness={0.24} emissive={active?'#cb8132':'#35251b'} emissiveIntensity={active?0.5:0.15} /></mesh>
      <mesh rotation={[0.7,0.2,0]}><torusGeometry args={[0.22,0.006,4,28]} /><meshBasicMaterial color='#e4b67c' transparent opacity={relevant?0.65:0.1} /></mesh>
    </group>
    <Html position={[position[0],position[1]+0.32,position[2]]} portal={portal} calculatePosition={calculatePosition} center zIndexRange={[3,2]} className='spatial-skill-label'>
      <button className={`skill-node ${relevant?'':'is-dimmed'} ${active?'is-active':''}`} aria-pressed={active} onClick={() => onSelect(node)} onPointerEnter={() => onHover(node)} onPointerLeave={() => onHover(null)} onFocus={() => onHover(node)} onBlur={() => onHover(null)}>
        {technology && <img src={technology.icon} alt='' width='20' height='20' loading='lazy' />}<span>{skillDisplayName(node.name)}</span>
      </button>
    </Html>
  </>;
}

export function SkillsScene({ group, selected, onSelect, onHover, portal, calculatePosition }) {
  return <>
    <PerspectiveCamera makeDefault position={[0,0,10]} fov={40} />
    <StudioLight />
    <group position={[0,0,-0.7]}><AmberSculpture scale={0.43} /></group>
    <Line points={orbitPoints(2.1,1.1)} color='#cc9b5d' lineWidth={0.6} transparent opacity={0.15} />
    {skillNodes.map(node => <SkillSatellite key={node.name} node={node} relevant={group==='All connections'||group===node.group} active={selected?.name===node.name} onSelect={onSelect} onHover={onHover} portal={portal} calculatePosition={calculatePosition} />)}
  </>;
}

function ArchiveCard({ project, index, count, selected, onSelect, portal, calculatePosition }) {
  const texture = useTexture(project.image);
  const angle = index/count*Math.PI*2;
  const { quality } = useJourney();
  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = quality==='low'?1:4;
    texture.needsUpdate = true;
  }, [texture, quality]);
  const active = selected===index;
  return <group position={[Math.sin(angle)*3.25,0.08,Math.cos(angle)*3.25-1.8]} rotation={[0,angle,0]}>
    <RoundedBox args={[2.17,1.63,0.14]} radius={0.045} smoothness={quality==='low'?2:4} onClick={(event) => {event.stopPropagation();onSelect(index);}} onPointerOver={() => { document.body.style.cursor='pointer'; }} onPointerOut={() => { document.body.style.cursor=''; }}>
      <meshStandardMaterial color={active?'#d2a566':'#694c33'} metalness={0.8} roughness={0.23} />
    </RoundedBox>
    <mesh position={[0,0.03,0.076]} onClick={(event)=>{event.stopPropagation();onSelect(index);}}>
      <planeGeometry args={[2.02,1.35]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
    <mesh position={[0,-1.23,0]}><cylinderGeometry args={[0.16,0.27,0.11,16]} /><meshStandardMaterial color='#96744a' metalness={0.85} roughness={0.25} /></mesh>
    <Line points={[[0,-0.85,0],[0,-1.17,0]]} color='#b39568' lineWidth={0.75} transparent opacity={0.6} />
    {active && <Html position={[0,-0.98,0.12]} portal={portal} calculatePosition={calculatePosition} center zIndexRange={[3,2]} className='archive-label'>
      <a href={project.source_code_link || `${resumeLink}#page=1`} target='_blank' rel='noopener noreferrer' aria-label={`Open ${project.name} ${project.source_code_link?'source':'brief'}`}>{project.short_name || project.name}<span>↗</span></a>
    </Html>}
  </group>;
}

export function ProjectsScene({ selected = 0, onSelect, portal, calculatePosition }) {
  const ring = useRef();
  const { reducedMotion } = useJourney();
  const camera = useThree(state=>state.camera);
  useEffect(() => {
    const animation = gsap.to(ring.current.rotation, {y:-selected/galleryProjects.length*Math.PI*2, duration:reducedMotion?0:1.15, ease:'power3.inOut', overwrite:true, onUpdate:()=>world.invalidate?.()});
    return () => animation.kill();
  }, [selected, reducedMotion]);
  useFrame(() => {
    camera.position.set(0,1.45,10.9-world.sequence.archive*0.6);
    camera.lookAt(0,-0.05,-0.5);
  });
  return <>
    <PerspectiveCamera makeDefault position={[0,1.45,10.9]} fov={42} />
    <StudioLight />
    <group ref={ring}>
      {galleryProjects.map((project,i)=><ArchiveCard key={project.name} project={project} index={i} count={galleryProjects.length} selected={selected} onSelect={onSelect} portal={portal} calculatePosition={calculatePosition} />)}
    </group>
    <group position={[0,-0.15,-1.8]}>
      <AmberCore scale={0.46} />
      <mesh rotation={[Math.PI/2,0,0]} position={[0,-1.45,0]}><torusGeometry args={[3.25,0.025,8,120]} /><meshStandardMaterial color='#b8915d' metalness={0.9} roughness={0.22} /></mesh>
      <Line points={orbitPoints(3.5,0)} position={[0,-1.42,0]} color='#e2b877' lineWidth={0.6} transparent opacity={0.35} />
      <CausticHalo y={-1.5} scale={0.75} />
    </group>
    <ObservatoryMotes />
  </>;
}

export function ExperienceScene({ selected = 0, onSelect, portal, calculatePosition }) {
  const { reducedMotion } = useJourney();
  const group = useRef();
  useFrame(()=>{
    group.current.rotation.y = reducedMotion?0:Math.sin(world.time*0.23)*0.05;
    group.current.rotation.z = reducedMotion?0:Math.sin(world.time*0.2)*0.015;
  });
  return <>
    <PerspectiveCamera makeDefault position={[0,1,8]} fov={43} />
    <StudioLight />
    <group ref={group}>
      <QuadraticBezierLine start={[-1.5,0.15,0]} end={[1.5,0.6,-0.8]} mid={[0,2,-1.1]} color='#d3aa6e' lineWidth={1.1} transparent opacity={0.4} />
      {experiences.map((experience,i)=><group key={experience.company_name} position={i===0?[-1.5,0.15,0]:[1.5,0.6,-0.8]}>
        <mesh rotation={[0,0.5,0]} onClick={()=>onSelect(i)}><octahedronGeometry args={[selected===i?0.68:0.48,1]} /><meshPhysicalMaterial color={selected===i?'#e8b76e':'#896443'} metalness={0.7} roughness={0.2} clearcoat={1} emissive='#b27b35' emissiveIntensity={selected===i?0.25:0} /></mesh>
        <mesh rotation={[1.2,0.4,0]}><torusGeometry args={[0.95,0.012,5,70,Math.PI*1.85]} /><meshStandardMaterial color='#c79b61' metalness={0.9} roughness={0.2} /></mesh>
        <Html position={[0,-0.86,0]} portal={portal} calculatePosition={calculatePosition} center zIndexRange={[3,2]} className='experience-orbit-label'>
          <button aria-label={`Explore ${experience.company_name} experience`} aria-pressed={selected===i} onClick={()=>onSelect(i)}><span>{experience.company_name}</span><span>{i===0?'2024 - Present':'2023'}</span></button>
        </Html>
      </group>)}
    </group>
  </>;
}

const portalTypes = { portal:PropTypes.object.isRequired, calculatePosition:PropTypes.func.isRequired };
SkillSatellite.propTypes = { node:PropTypes.object.isRequired, relevant:PropTypes.bool.isRequired, active:PropTypes.bool.isRequired, onSelect:PropTypes.func.isRequired, onHover:PropTypes.func.isRequired, ...portalTypes };
SkillsScene.propTypes = { group:PropTypes.string.isRequired, selected:PropTypes.object, onSelect:PropTypes.func.isRequired, onHover:PropTypes.func.isRequired, ...portalTypes };
ArchiveCard.propTypes = { project:PropTypes.object.isRequired,index:PropTypes.number.isRequired,count:PropTypes.number.isRequired,selected:PropTypes.number.isRequired,onSelect:PropTypes.func.isRequired,...portalTypes };
ProjectsScene.propTypes = { selected:PropTypes.number,onSelect:PropTypes.func.isRequired,...portalTypes };
ExperienceScene.propTypes = { selected:PropTypes.number,onSelect:PropTypes.func.isRequired,...portalTypes };
