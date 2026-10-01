import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import { useJourney } from './useJourney';
import { qualityTiers, world } from './config';
import AutumnEnvironment from './AutumnEnvironment';
import LeafSystem from './LeafSystem';
import Atmosphere from './Atmosphere';
import Foundation from './Foundation';
import JourneyLandmarks from './JourneyLandmarks';
import PortfolioWorld from './PortfolioWorld';

function FrameManager() {
  const { reducedMotion, setSpatialReady, quality, qualityPreference, degrade } = useJourney();
  const frameTime=useRef(16), samples=useRef(0);
  const { gl, invalidate, camera, scene } = useThree();
  useEffect(() => {
    world.invalidate = invalidate;
    window.__AUTUMN_SCENE__ = {
      snapshot: () => {
        const projects=[],skills=[];
        scene.traverse(object=>{
          if(object.userData.project!==undefined)projects.push({index:object.userData.project,title:object.userData.title,position:object.getWorldPosition(new Vector3()).toArray(),textureWidth:object.material.map?.image?.width||0,textureHeight:object.material.map?.image?.height||0,visible:object.parent.visible});
          if(object.userData.skill)skills.push({name:object.userData.skill,position:object.getWorldPosition(new Vector3()).toArray()});
        });
        return {frames:world.frames,metrics:world.metrics,camera:camera.position.toArray(),target:world.cameraTarget,progress:world.progress,quality,orbit:world.orbit,unfolded:world.unfolded,projects,skills,fog:{color:scene.fog?.color.getHexString(),density:scene.fog?.density},leafDepths:world.leafDepths};
      },
      setCamera: (position, target=[2,2.4,0]) => {world.debugCamera=true; camera.position.fromArray(position);camera.lookAt(...target);invalidate();},
      setLight: (value) => {world.debugLight=value;invalidate();},
      resumeCamera: () => {world.debugCamera=false;invalidate();},
      measureParallax: () => {
        const original=camera.position.clone();
        const points=[new Vector3(-2,2,8),new Vector3(-2,2,-35)];
        const before=points.map(p=>p.clone().project(camera).x);
        camera.position.x+=.5;camera.updateMatrixWorld();
        const shift=points.map((p,i)=>Math.abs(p.clone().project(camera).x-before[i]));
        camera.position.copy(original);camera.updateMatrixWorld();return {near:shift[0],far:shift[1]};
      },
    };
    setSpatialReady(true);
    invalidate();
    return () => {world.invalidate=null;delete window.__AUTUMN_SCENE__;};
  }, [camera,gl,invalidate,quality,scene,setSpatialReady]);
  useFrame((_,delta) => {
    world.frames++;
    if (!reducedMotion) world.time+=Math.min(delta,.05);
    if(delta<.5){frameTime.current=frameTime.current*.96+delta*1000*.04;samples.current++;}
    if(!reducedMotion&&qualityPreference==='auto'&&quality!=='low'&&samples.current>120&&frameTime.current>36){degrade();samples.current=0;frameTime.current=16;}
    world.metrics={drawCalls:gl.info.render.calls,triangles:gl.info.render.triangles,geometries:gl.info.memory.geometries,textures:gl.info.memory.textures,frameMs:frameTime.current};
  }, -100);
  return null;
}

function World() {
  const {quality,reducedMotion}=useJourney();
  const settings=qualityTiers[quality];
  const debug=new URLSearchParams(location.search).has('orbit');
  return <>
    <FrameManager />
    <Foundation />
    <JourneyLandmarks />
    <PortfolioWorld />
    <AutumnEnvironment settings={settings} reducedMotion={reducedMotion} />
    <LeafSystem count={settings.leaves} reducedMotion={reducedMotion} />
    <Atmosphere settings={settings} reducedMotion={reducedMotion} />
    {debug && <OrbitControls domElement={document.getElementById('root')} target={[2,2.4,0]} enableDamping onStart={()=>{world.debugCamera=true;}} />}
  </>;
}

export default function ForestCanvas() {
  const { reducedMotion, quality, visible, reportSceneFailure }=useJourney();
  return <Canvas shadows className='forest-canvas' dpr={[1,qualityTiers[quality].dpr]}
    frameloop={reducedMotion||!visible?'demand':'always'}
    camera={{position:[0,3.4,16],fov:46,near:.1,far:420}}
    eventSource={document.getElementById('root')} eventPrefix='client'
    gl={{alpha:false,antialias:quality!=='low',powerPreference:'high-performance'}}
    onCreated={({gl})=>{gl.setClearColor('#805c40');gl.domElement.addEventListener('webglcontextlost',reportSceneFailure,{once:true});}}>
    <Suspense fallback={null}><World /></Suspense>
  </Canvas>;
}
