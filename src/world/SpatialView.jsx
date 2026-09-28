import PropTypes from 'prop-types';
import { Suspense, useCallback, useRef, useState } from 'react';
import { View } from '@react-three/drei';
import { Vector3 } from 'three';
import { useJourney } from './useJourney';
import { world } from './config';
import { HeroScene, SkillsScene, ProjectsScene, ExperienceScene } from './SpatialScenes';

export default function SpatialView({ kind, className = '', fallback, ...props }) {
  const portal = useRef();
  const drag = useRef(null);
  const vector = useRef(new Vector3());
  const { webgl, spatialReady, reducedMotion } = useJourney();
  const [unfolded, setUnfolded] = useState(world.unfolded);
  const calculatePosition = useCallback((object,camera,size) => {
    vector.current.setFromMatrixPosition(object.matrixWorld).project(camera);
    const rect = portal.current?.getBoundingClientRect() || size;
    return [vector.current.x*rect.width/2+rect.width/2,-vector.current.y*rect.height/2+rect.height/2];
  }, []);
  const start = (event) => {
    if (kind!=='hero' || event.target.closest('a,button') || event.button!==0) return;
    drag.current={x:event.clientX,y:event.clientY,pointer:event.pointerId};
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event) => {
    if (!drag.current) return;
    const dx=event.clientX-drag.current.x;
    const dy=event.clientY-drag.current.y;
    if(event.pointerType==='touch' && Math.abs(dy)>Math.abs(dx)) return;
    world.orbit+=dx*0.009;
    world.dragUntil=world.time+2;
    drag.current.x=event.clientX;
    drag.current.y=event.clientY;
    world.invalidate?.();
  };
  const stop = () => { drag.current=null; };
  if (!webgl) return <div className={`spatial-stage spatial-fallback ${className}`} data-spatial-kind={kind}>{fallback}</div>;
  const shared={portal,calculatePosition};
  return <div className={`spatial-stage ${className}`} data-spatial-kind={kind} data-ready={spatialReady}>
    {!spatialReady && <div className='spatial-loading'>{fallback}<span>Preparing the sculpture…</span></div>}
    <View ref={portal} className='spatial-track' index={kind==='hero'?1:kind==='skills'?2:kind==='projects'?3:4} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop}>
      <Suspense fallback={null}>
        {kind==='hero' && <HeroScene />}
        {kind==='skills' && <SkillsScene {...props} {...shared} />}
        {kind==='projects' && <ProjectsScene {...props} {...shared} />}
        {kind==='experience' && <ExperienceScene {...props} {...shared} />}
      </Suspense>
    </View>
    {kind==='hero' && <div className='sculpture-controls'>
      <button className='sculpture-toggle' aria-label={unfolded?'Fold the amber sculpture':'Unfold the amber sculpture'} aria-pressed={unfolded} onClick={()=>{
        world.unfolded=!unfolded;
        setUnfolded(!unfolded);
        world.invalidate?.();
      }}>{unfolded?'Fold sculpture':'Unfold sculpture'}</button><span>{reducedMotion?'Drag to inspect':'Drag to rotate'}</span>
    </div>}
  </div>;
}

SpatialView.propTypes = {kind:PropTypes.oneOf(['hero','skills','projects','experience']).isRequired,className:PropTypes.string,fallback:PropTypes.node};
