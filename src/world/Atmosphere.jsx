import PropTypes from 'prop-types';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, Color, DoubleSide } from 'three';
import { seededRandom, world } from './config';

const skyVertex = `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const skyFragment = `
  varying vec2 vUv; uniform float dusk;
  void main(){
    vec3 top=mix(vec3(.20,.13,.10),vec3(.055,.065,.10),dusk);
    vec3 horizon=mix(vec3(.66,.40,.20),vec3(.33,.15,.17),dusk);
    float light=exp(-length((vUv-vec2(.67,.43))*vec2(2.,2.8))*5.);
    vec3 color=mix(horizon,top,smoothstep(.25,.88,vUv.y));
    color+=vec3(.55,.32,.14)*light*(1.-dusk*.55);
    gl_FragColor=vec4(color,1.);
  }`;
const rayFragment = `varying vec2 vUv; void main(){float a=pow(sin(vUv.x*3.14159),2.)*pow(vUv.y,.7)*.08; gl_FragColor=vec4(1.,.69,.33,a);}`;

export default function Atmosphere({ settings, reducedMotion }) {
  const sky = useRef(), dust = useRef(), rays = useRef();
  const uniforms = useMemo(() => ({ dusk: { value: 0 } }), []);
  const dustPositions = useMemo(() => {
    const random = seededRandom(814);
    return new Float32Array(Array.from({ length: settings.dust * 3 }, (_, i) => i % 3 === 0 ? (random()-.5)*34 : i % 3 === 1 ? random()*12 : random()*40-28));
  }, [settings.dust]);
  useFrame((_, delta) => {
    const progress = Math.sin(world.route.mood*Math.PI)*.85;
    sky.current.uniforms.dusk.value += (progress - sky.current.uniforms.dusk.value) * Math.min(delta,0.1);
    if (!reducedMotion) {
      dust.current.rotation.y = Math.sin(world.time * 0.025) * 0.06;
      dust.current.position.y = Math.sin(world.time * 0.15) * 0.12;
      if (rays.current) rays.current.rotation.z = Math.sin(world.time * 0.045) * 0.03;
    }
  });
  return <>
    <mesh position={[0,45,-280]}>
      <planeGeometry args={[700,350]} />
      <shaderMaterial ref={sky} uniforms={uniforms} vertexShader={skyVertex} fragmentShader={skyFragment} depthWrite={false} />
    </mesh>
    <mesh position={[22,24,-235]}>
      <circleGeometry args={[9,64]} />
      <meshBasicMaterial color="#ffdba5" transparent opacity={0.65} fog={false} />
    </mesh>
    <group ref={rays}>
      {Array.from({length:settings.rays}, (_, i) => <mesh key={i} position={[4+i*2.4,8,-15-i*3]} rotation={[0,0,-0.44]}>
        <planeGeometry args={[1.2+i*.35,27]} />
        <shaderMaterial vertexShader={skyVertex} fragmentShader={rayFragment} transparent side={DoubleSide} depthWrite={false} blending={AdditiveBlending} />
      </mesh>)}
    </group>
    <points ref={dust}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={settings.dust} array={dustPositions} itemSize={3} /></bufferGeometry>
      <pointsMaterial color={new Color('#ffd391')} size={0.027} transparent opacity={0.7} depthWrite={false} sizeAttenuation />
    </points>
  </>;
}

Atmosphere.propTypes = { settings: PropTypes.shape({ dust: PropTypes.number.isRequired, rays: PropTypes.number.isRequired }).isRequired, reducedMotion: PropTypes.bool.isRequired };
