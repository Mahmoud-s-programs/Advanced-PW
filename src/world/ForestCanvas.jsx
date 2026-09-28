import { useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { View } from '@react-three/drei';
import { useJourney } from './useJourney';
import { qualityTiers, world } from './config';

function FrameManager() {
  const { reducedMotion, setSpatialReady, qualityPreference, degrade, quality } = useJourney();
  const { gl, invalidate } = useThree();
  useEffect(() => {
    gl.info.autoReset = false;
    world.invalidate = invalidate;
    window.__AUTUMN_SCENE__ = {
      snapshot: () => ({frames:world.frames,metrics:world.metrics,sequence:{...world.sequence},orbit:world.orbit,unfolded:world.unfolded,quality}),
    };
    setSpatialReady(true);
    invalidate();
    return () => { world.invalidate=null; delete window.__AUTUMN_SCENE__; };
  }, [gl, invalidate, setSpatialReady, quality]);
  useFrame((_,delta) => {
    world.metrics = { drawCalls:gl.info.render.calls, triangles:gl.info.render.triangles, geometries:gl.info.memory.geometries, textures:gl.info.memory.textures, shaders:gl.info.programs?.length || 0 };
    gl.info.reset();
    gl.setRenderTarget(null);
    gl.setScissorTest(false);
    gl.clear();
    world.frames++;
    if (!reducedMotion) world.time+=Math.min(delta,0.06);
    if(qualityPreference==='auto'&&!reducedMotion&&world.frames%240===0&&delta>0.06) degrade();
  }, -100);
  return null;
}

export default function ForestCanvas() {
  const { reducedMotion, quality, visible, reportSceneFailure } = useJourney();
  return <Canvas className='forest-canvas observatory-canvas' dpr={[1,qualityTiers[quality].dpr]}
    frameloop={reducedMotion||!visible?'demand':'always'}
    eventSource={document.getElementById('root')} eventPrefix='client'
    camera={{position:[0,0,10],fov:43,near:0.1,far:80}}
    gl={{alpha:true,antialias:quality!=='low',powerPreference:quality==='low'?'low-power':'high-performance'}}
    onCreated={({gl})=>{
      gl.setClearColor('#120d0b',0);
      gl.domElement.addEventListener('webglcontextlost',reportSceneFailure,{once:true});
    }}>
    <FrameManager /><View.Port />
  </Canvas>;
}
