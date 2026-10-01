import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Color, DoubleSide, Object3D } from 'three';
import { mapleGeometry } from './geometry';
import { seededRandom } from './config';
import { useJourney } from './useJourney';

export default function GroundDetails(){
 const stones=useRef(),rocks=useRef(),leaves=useRef();
 const {quality}=useJourney();const count=quality==='low'?240:850;
 const maple=useMemo(mapleGeometry,[]);
 useEffect(()=>()=>maple.dispose(),[maple]);
 useLayoutEffect(()=>{
  const dummy=new Object3D(),color=new Color(),random=seededRandom(822);
  for(let i=0;i<48;i++){
   dummy.position.set(Math.sin(i*.27)*1.4-1,-.89,11-i*3.15);dummy.rotation.set(0,Math.sin(i)*.1,0);dummy.scale.set(2.7,.22,1.9);dummy.updateMatrix();stones.current.setMatrixAt(i,dummy.matrix);stones.current.setColorAt(i,color.set(i%3?'#5e5041':'#80705a'));
  }
  for(let i=0;i<70;i++){
   const size=.35+random()*1.4;
   dummy.position.set((i%2?1:-1)*(3+random()*13),-.9+size*.2,9-random()*147);dummy.rotation.set(.1,random()*6,.15);dummy.scale.set(size,size*.5,size*.8);dummy.updateMatrix();rocks.current.setMatrixAt(i,dummy.matrix);rocks.current.setColorAt(i,color.set(i%2?'#3c3c34':'#57513d'));
  }
  for(let i=0;i<count;i++){
   const x=(random()-.5)*22,z=12-random()*158;
   dummy.position.set(x,-1+random()*.035,z);dummy.rotation.set(-Math.PI/2,random()*.3,random()*6.28);dummy.scale.setScalar(.1+random()*.18);dummy.updateMatrix();leaves.current.setMatrixAt(i,dummy.matrix);leaves.current.setColorAt(i,color.set(['#9b602e','#b57b36','#854323','#b98b47'][i%4]));
  }
  [stones,rocks,leaves].forEach(ref=>{ref.current.instanceMatrix.needsUpdate=true;ref.current.instanceColor.needsUpdate=true;ref.current.computeBoundingSphere();});
 },[count]);
 return <>
  <instancedMesh ref={stones} args={[null,null,48]} receiveShadow><boxGeometry args={[1,1,1]} /><meshStandardMaterial roughness={.8} metalness={.12} /></instancedMesh>
  <instancedMesh ref={rocks} args={[null,null,70]} receiveShadow><dodecahedronGeometry args={[1,0]} /><meshStandardMaterial roughness={.87} /></instancedMesh>
  <instancedMesh ref={leaves} args={[maple,null,count]}><meshStandardMaterial side={DoubleSide} roughness={.9} /></instancedMesh>
 </>;
}
