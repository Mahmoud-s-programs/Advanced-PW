import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line, useTexture } from '@react-three/drei';
import { CatmullRomCurve3, MathUtils, SRGBColorSpace, TubeGeometry, Vector3 } from 'three';
import { experiences, resumeLink, technologies } from '../constants';
import { galleryProjects, skillNodes, skillDisplayName } from './spatialData';
import { world, seededRandom } from './config';
import { useJourney } from './useJourney';
import { setContent, useContent, goToProject } from './contentStore';
import { AmberCore } from './ObservatoryObjects';

const portal=()=>({current:document.getElementById('spatial-content')});

function ProjectDisplay({project,index}){
 const texture=useTexture(project.image);const group=useRef();const frame=useRef();
 const {project:selected}=useContent();const {spatial,active}=useJourney();
 texture.colorSpace=SRGBColorSpace;
 const ratio=project.image_size[0]/project.image_size[1];
 const width=Math.min(6.2,3.8*ratio),height=width/ratio;
 const position=[3.8,3,-56-index*8];
 useFrame(({camera},delta)=>{
  group.current.visible=Math.abs(camera.position.z-position[2])<42;
  const angle=Math.atan2(camera.position.x-position[0],camera.position.z-position[2]);
  group.current.rotation.y=MathUtils.damp(group.current.rotation.y,selected===index?Math.max(-.45,Math.min(.15,angle)):-.13,3,delta);
  frame.current.emissiveIntensity=selected===index?.16:.015;
 });
 const href=project.source_code_link||resumeLink+'#page=1';
 return <group ref={group} position={position} rotation={[0,-.13,0]}>
  <mesh castShadow onClick={event=>{event.stopPropagation();goToProject(index);}} onPointerOver={()=>{world.projectHover=1;world.projectTint=project.tint;}} onPointerOut={()=>{world.projectHover=0;}}>
   <boxGeometry args={[6.55,4.15,.22]} /><meshStandardMaterial ref={frame} color='#2e2925' metalness={.8} roughness={.28} emissive='#db984a' emissiveIntensity={.05} />
  </mesh>
  <mesh position={[0,0,.13]}><planeGeometry args={[6.25,3.85]} /><meshStandardMaterial color='#141b20' roughness={.7} /></mesh>
  <mesh position={[0,0,.145]} userData={{project:index,title:project.name}}><planeGeometry args={[width,height]} /><meshStandardMaterial map={texture} emissiveMap={texture} emissive='#ffffff' emissiveIntensity={.3} roughness={.65} toneMapped={false} /></mesh>
  {[-2.5,2.5].map(x=><mesh key={x} position={[x,-2.7,0]}><boxGeometry args={[.07,1.5,.1]} /><meshStandardMaterial color='#bc8f59' metalness={.8} roughness={.3} /></mesh>)}
  <mesh position={[0,-2.09,.13]}><boxGeometry args={[6.3,.026,.04]} /><meshStandardMaterial color='#ffdb9b' emissive='#ffb64d' emissiveIntensity={selected===index?1:.1} /></mesh>
  {spatial&&active==='projects'&&selected===index&&<Html portal={portal()} position={[0,-2.48,.2]} center zIndexRange={[5,1]}>
   <a className='world-project-link' data-cursor='project' data-cursor-label={project.source_code_link?'Explore source ↗':'Read brief ↗'} href={href} target='_blank' rel='noopener noreferrer' onClick={event=>event.stopPropagation()}><span>{project.image_credit||'Original project screenshot'}</span><strong>{project.source_code_link?'Explore source':'Read project brief'} ↗</strong></a>
  </Html>}
 </group>;
}

function SkillNode({node,index}){
 const mesh=useRef();const {skill,skillHover,group}=useContent();const {active,spatial,reducedMotion}=useJourney();
 const current=skillHover||skill;const selected=current?.name===node.name;
 const relevant=group==='All connections'||node.group===group;
 const position=[1.7+(node.x-50)/10.3,3.4+(50-node.y)/13,-34+Math.sin(index*2.1)*1.4];
 const icon=technologies.find(item=>item.name===node.name)?.icon;
 useFrame(()=>{mesh.current.rotation.y=reducedMotion?0:world.time*.18+index;mesh.current.rotation.z=index*.3;});
 return <group position={position}>
  <Line points={[[0,0,0],[(1.7-position[0])*.5,-.3,(-34-position[2])*.5],[1.7-position[0],3.2-position[1],-34-position[2]]]} color={selected?'#f5d598':'#998260'} lineWidth={selected?1.4:.5} transparent opacity={relevant?.65:.14} />
  <mesh ref={mesh} userData={{skill:node.name}} scale={selected?1.35:1}><icosahedronGeometry args={[.16,1]} /><meshStandardMaterial color={selected?'#ffe0a2':'#bf914f'} metalness={.7} roughness={.22} emissive='#d99842' emissiveIntensity={selected?.85:.15} /></mesh>
  {active==='skills'&&spatial&&<Html portal={portal()} position={[0,.25,0]} center zIndexRange={[5,1]}>
   <button className={`world-skill skill-node ${relevant?'':'is-dimmed'} ${selected?'is-active':''}`} aria-pressed={skill?.name===node.name} onClick={e=>{e.stopPropagation();setContent({skill:node});}} onPointerEnter={()=>setContent({skillHover:node})} onPointerLeave={()=>setContent({skillHover:null})} onFocus={()=>setContent({skillHover:node})} onBlur={()=>setContent({skillHover:null})}>
    {icon&&<img src={icon} width='16' height='16' alt='' />}<span>{skillDisplayName(node.name)}</span>
   </button>
  </Html>}
 </group>;
}

function RootSculpture(){
 const root=useRef();const {reducedMotion}=useJourney();
 const branches=useMemo(()=>{
  const random=seededRandom(981);
  return Array.from({length:15},(_,i)=>{
   const y=-1.9+i*.24;const side=i%2?1:-1;
   const end=new Vector3(side*(.8+random()*1.1),y+.45,Math.sin(i*1.8)*.9);
   const curve=new CatmullRomCurve3([new Vector3(0,y-.7,0),new Vector3(side*.4,y,0),end]);
   return {geometry:new TubeGeometry(curve,20,.018,5,false),end};
  });
 },[]);
 useEffect(()=>()=>branches.forEach(b=>b.geometry.dispose()),[branches]);
 useFrame(()=>{root.current.rotation.y=reducedMotion?0:Math.sin(world.time*.15)*.24;});
 return <group ref={root} position={[2,3,-18]}>
  <mesh><cylinderGeometry args={[.035,.1,5.3,9]} /><meshStandardMaterial color='#e3ad61' metalness={.8} roughness={.23} /></mesh>
  {branches.map((branch,i)=><group key={i}><mesh geometry={branch.geometry}><meshStandardMaterial color='#b78b52' metalness={.8} roughness={.25} /></mesh><mesh position={branch.end}><octahedronGeometry args={[.11,0]} /><meshStandardMaterial color='#ffc579' emissive='#bd752f' emissiveIntensity={.5} metalness={.5} roughness={.25} /></mesh></group>)}
 </group>;
}

function ExperienceMarkers(){
 const {experience:selected}=useContent();const {spatial,active}=useJourney();
 const points=[[1.5,.2,-134],[4,1,-137]];
 return <>
  <Line points={[[1.5,-.5,-134],[1.7,-.3,-135],[2.8,.1,-136],[4,.35,-137]]} color='#f0b76d' lineWidth={2.5} />
  {experiences.map((experience,index)=><group key={experience.company_name} position={points[index]}>
   <mesh position={[0,1,0]}><octahedronGeometry args={[selected===index?.42:.3,0]} /><meshStandardMaterial color='#d3a975' metalness={.7} roughness={.2} emissive='#edaa57' emissiveIntensity={selected===index?.7:.12} /></mesh>
   <mesh rotation={[-Math.PI/2,0,0]}><torusGeometry args={[.8,.03,8,64]} /><meshStandardMaterial color='#eabe85' metalness={.8} roughness={.2} /></mesh>
   <mesh position={[0,-.35,0]}><cylinderGeometry args={[.9,1,.3,32]} /><meshStandardMaterial color='#37312a' roughness={.4} metalness={.5} /></mesh>
   {spatial&&active==='work'&&<Html portal={portal()} position={[0,1.7,0]} center zIndexRange={[5,1]}><button className='world-milestone' aria-pressed={selected===index} onClick={e=>{e.stopPropagation();setContent({experience:index});}}><span>{experience.date}</span><strong>{experience.company_name}</strong><span>Explore experience ↗</span></button></Html>}
  </group>)}
 </>;
}

export default function PortfolioWorld(){
 return <>
  <RootSculpture />
  <group position={[1.7,3.2,-34]}><AmberCore scale={.7} /><mesh rotation={[.7,.5,.3]}><torusGeometry args={[1.2,.025,8,100]} /><meshStandardMaterial color='#e9bd7b' metalness={.9} roughness={.2} /></mesh></group>
  {skillNodes.map((node,index)=><SkillNode key={node.name} node={node} index={index} />)}
  {galleryProjects.map((project,index)=><ProjectDisplay key={project.name} project={project} index={index} />)}
  <ExperienceMarkers />
 </>;
}

ProjectDisplay.propTypes={project:PropTypes.object.isRequired,index:PropTypes.number.isRequired};
SkillNode.propTypes={node:PropTypes.object.isRequired,index:PropTypes.number.isRequired};
