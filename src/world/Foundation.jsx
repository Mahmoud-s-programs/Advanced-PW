import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { Color, FogExp2, Vector3 } from 'three';
import { useJourney } from './useJourney';
import { world } from './config';
import { AmberSculpture, CausticHalo } from './ObservatoryObjects';
import GroundDetails from './GroundDetails';

export default function Foundation() {
  const {reducedMotion,quality}=useJourney();
  const sun=useRef(), rim=useRef();
  const fog=useMemo(()=>new FogExp2('#6a5140',.026),[]);
  const destination=useMemo(()=>new Vector3(),[]);
  const look=useMemo(()=>new Vector3(0,2.3,-3),[]);
  const colors=useMemo(()=>[new Color('#6a5140'),new Color('#202936'),new Color('#9c6853')],[]);
  useFrame(({camera},delta)=>{
    const t=reducedMotion?0:world.time;
    const r=world.route;
    const drift=r.z>0?Math.min(1,r.z/12):0;
    if(!world.debugCamera){
      destination.set(r.x+(Math.sin(t*.13)*.18+world.pointer.x*.35)*drift,r.y+(Math.sin(t*.19)*.075+world.pointer.y*.12)*drift,r.z+Math.cos(t*.12)*.1*drift);
      camera.position.lerp(destination,reducedMotion?1:1-Math.exp(-delta*2));
      look.set(r.tx,r.ty,r.tz);camera.lookAt(look);
      world.cameraTarget=look.toArray();
    }
    sun.current.intensity=world.debugLight??r.key;
    rim.current.intensity=(world.debugLight??r.key)*.45;
    sun.current.position.set(8,14,camera.position.z-11);
    sun.current.target.position.set(0,0,camera.position.z-15);sun.current.target.updateMatrixWorld();
    fog.color.copy(colors[0]).lerp(colors[1],Math.min(1,r.mood*1.25));
    fog.color.lerp(colors[2],Math.max(0,(r.mood-.88)/.12));fog.density=r.fog;
    world.sequence.arrival=Math.min(1,Math.max(0,(16-r.z)/19));
  });
  return <>
    <primitive object={fog} attach='fog' />
    <ambientLight intensity={.26} color='#aebcc2' />
    <hemisphereLight args={['#c5b599','#171821',.65]} />
    <directionalLight ref={sun} position={[8,14,5]} color='#ffdfac' intensity={3.5} castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-18} shadow-camera-right={18} shadow-camera-top={18} shadow-camera-bottom={-18} shadow-camera-far={70} shadow-bias={-.001} shadow-normalBias={.06} />
    <directionalLight ref={rim} position={[-9,8,-12]} color='#ed853b' intensity={1.5} />
    <pointLight position={[3,3,2]} color='#ffd6a1' intensity={18} distance={14} />
    <Environment resolution={quality==='low'?64:128} frames={1}>
      <Lightformer position={[0,8,4]} scale={[10,3,1]} intensity={3} color='#fff3d7' />
      <Lightformer position={[-6,2,0]} rotation={[0,Math.PI/2,0]} scale={[2,9,1]} intensity={2} color='#eab57a' />
    </Environment>
    <group position={[3,2.4,0]}>
      <AmberSculpture scale={1.03} interactive />
      <CausticHalo y={-3.32} scale={.85} />
    </group>
    <group position={[3,-.65,0]}>
      <mesh castShadow receiveShadow><cylinderGeometry args={[3.25,3.6,.8,64]} /><meshStandardMaterial color='#252628' roughness={.48} metalness={.55} /></mesh>
      <mesh position={[0,.43,0]} rotation={[-Math.PI/2,0,0]}><torusGeometry args={[3.08,.025,8,100]} /><meshStandardMaterial color='#ecc27b' metalness={.85} roughness={.24} emissive='#995623' emissiveIntensity={.4} /></mesh>
      <mesh position={[0,.46,0]}><cylinderGeometry args={[2.85,2.85,.05,64]} /><meshStandardMaterial color='#4b4036' roughness={.27} metalness={.68} /></mesh>
    </group>
    <GroundDetails />
    <mesh position={[-5.4,4.8,10]} rotation={[0,0,-.13]}><cylinderGeometry args={[.38,.72,13,9]} /><meshStandardMaterial color='#231c18' roughness={1} /></mesh>
    <mesh position={[7,5,8]} rotation={[0,0,.18]}><cylinderGeometry args={[.4,.85,14,9]} /><meshStandardMaterial color='#30231d' roughness={1} /></mesh>
  </>;
}
