import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { world, seededRandom } from './config';
import { useJourney } from './useJourney';
import { Shape, ExtrudeGeometry } from 'three';

const waterVertex=`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const waterFragment=`varying vec2 vUv;uniform float uTime;
void main(){
 float wave=sin(vUv.y*620.+sin(vUv.x*86.+uTime*.15)*2.5)*.5+.5;
 float shimmer=pow(wave,6.)*exp(-pow((vUv.x-.60)*12.,2.));
 vec3 color=mix(vec3(.065,.08,.09),vec3(.26,.16,.12),vUv.y);
 color+=vec3(.75,.40,.18)*shimmer*.55;
 color+=sin(vUv.x*125.+vUv.y*600.+uTime*.2)*.012;
 gl_FragColor=vec4(color,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`;

export default function JourneyLandmarks(){
 const water=useRef();const {reducedMotion}=useJourney();
 const uniforms=useMemo(()=>({uTime:{value:0}}),[]);
 const mountains=useMemo(()=>{const rng=seededRandom(58);return Array.from({length:3},(_,i)=>{
   const shape=new Shape();shape.moveTo(-150,-8);
   for(let x=-150;x<=150;x+=5){const y=5+Math.abs(Math.sin(x*.043+i*2))*15+Math.abs(Math.sin(x*.12+i))*5+rng()*3;shape.lineTo(x,y);}
   shape.lineTo(150,-8);shape.closePath();
   return new ExtrudeGeometry(shape,{depth:12,bevelEnabled:true,bevelSize:2,bevelThickness:4,bevelSegments:1,steps:1});
 });},[]);
 useEffect(()=>()=>mountains.forEach(geometry=>geometry.dispose()),[mountains]);
 useFrame(()=>{water.current.uniforms.uTime.value=reducedMotion?0:world.time;});
 return <>
  <group position={[2,3,-18]} rotation={[0,-.15,.12]}>
   <mesh><torusGeometry args={[3.4,.23,12,80]} /><meshStandardMaterial color='#79583b' metalness={.7} roughness={.28} /></mesh>
   <mesh rotation={[.4,.6,0]}><torusGeometry args={[2.9,.06,8,80]} /><meshStandardMaterial color='#c29154' metalness={.8} roughness={.22} /></mesh>
  </group>
  <group position={[0,-.7,-34]}>
   <mesh><cylinderGeometry args={[5.7,6,.45,64]} /><meshStandardMaterial color='#252b2d' metalness={.5} roughness={.5} /></mesh>
   <mesh rotation={[-Math.PI/2,0,0]} position={[0,.24,0]}><torusGeometry args={[5.3,.035,8,100]} /><meshStandardMaterial color='#d8b975' emissive='#c08b35' emissiveIntensity={.65} /></mesh>
  </group>
  {Array.from({length:9},(_,i)=><group key={i} position={[0,0,-56-i*8]} rotation={[0,0,i>5?(i-5)*.07:0]}>
   {[-1,1].map(side=><mesh key={side} position={[side*6.3,2.3,0]} castShadow><boxGeometry args={[.28,6.5,.35]} /><meshStandardMaterial color='#393c38' metalness={.7} roughness={.3} /></mesh>)}
   <mesh position={[0,5.55,0]}><boxGeometry args={[12.9,.18,.35]} /><meshStandardMaterial color='#50432e' metalness={.7} roughness={.3} /></mesh>
   <mesh position={[0,5.43,0]}><boxGeometry args={[12,.025,.12]} /><meshStandardMaterial color='#f0c78b' emissive='#e5aa68' emissiveIntensity={1.2} /></mesh>
  </group>)}
  <group position={[0,4.2,-83]} rotation={[0,.15,.3]}>
   {[0,1,2].map(i=><mesh key={i} rotation={[i*.27,i*.35,0]}><torusGeometry args={[6+i*.6,.11,8,90,Math.PI*1.8]} /><meshStandardMaterial color='#916f4d' metalness={.85} roughness={.28} /></mesh>)}
  </group>
  {[-1,1].map(side=><group key={side} position={[side*4.8,0,-122]} rotation={[0,side*.15,0]}>
   <mesh position={[0,3,0]}><boxGeometry args={[1.3,8,1.5]} /><meshStandardMaterial color='#27252b' metalness={.5} roughness={.4} /></mesh>
   <mesh position={[-side*.66,3.2,.76]}><boxGeometry args={[.025,6,.035]} /><meshStandardMaterial color='#ffd1a1' emissive='#ed9952' emissiveIntensity={2} /></mesh>
  </group>)}
  <group position={[0,-.6,-151]}>
   <mesh receiveShadow><cylinderGeometry args={[9,10,1,64]} /><meshStandardMaterial color='#403e39' roughness={.65} metalness={.25} /></mesh>
   <mesh rotation={[-Math.PI/2,0,0]} position={[0,.51,0]}><torusGeometry args={[8.4,.055,8,100,Math.PI*1.65]} /><meshStandardMaterial color='#c99c68' metalness={.8} roughness={.26} /></mesh>
  </group>
  <mesh position={[0,-.85,-204]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[240,90]} /><shaderMaterial ref={water} uniforms={uniforms} vertexShader={waterVertex} fragmentShader={waterFragment} /></mesh>
  {mountains.map((geometry,i)=><mesh key={i} geometry={geometry} scale={[1,.4+i*.12,1]} position={[0,-2-i*2,-218-i*23]}><meshStandardMaterial color={['#30373b','#4d444b','#68545a'][i]} roughness={1} /></mesh>)}
  {Array.from({length:16},(_,i)=><mesh key={i} position={[0,-.25,-151-i*.85]}><boxGeometry args={[4.5,.23,.8]} /><meshStandardMaterial color={i%2?'#513b2b':'#674c35'} roughness={.8} /></mesh>)}
  {[-1,1].map(side=><group key={side} position={[side*2.4,0,-160]}>
   <mesh position={[0,1.4,0]}><boxGeometry args={[.12,.12,12]} /><meshStandardMaterial color='#33251d' roughness={.5} metalness={.3} /></mesh>
   {[-5,0,5].map(z=><mesh key={z} position={[0,.55,z]}><boxGeometry args={[.18,2,.18]} /><meshStandardMaterial color='#39291d' roughness={.6} /></mesh>)}
  </group>)}
 </>;
}
