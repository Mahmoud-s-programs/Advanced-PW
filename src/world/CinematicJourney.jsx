import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useJourney } from './useJourney';
import { world } from './config';
import { gsap, ScrollTrigger, journeyScrollTo } from './smoothScroll';

export default function CinematicJourney() {
  const {reducedMotion,touch,visible,spatial}=useJourney();
  useEffect(()=>{
    let lenis;
    const tick=time=>lenis?.raf(time*1000);
    if(!reducedMotion&&!touch){
      lenis=new Lenis({autoRaf:false,smoothWheel:true,lerp:.085,anchors:false});
      world.lenis=lenis;lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(tick);
    }
    const navigate=event=>{
      const anchor=event.target.closest('a[href^="#"]');
      if(!anchor||anchor.hash==='#main'||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      if(!document.querySelector(anchor.hash))return;
      event.preventDefault();history.pushState(null,'',anchor.hash);
      journeyScrollTo(anchor.hash,{immediate:reducedMotion,offset:-86});
    };
    document.addEventListener('click',navigate);
    let timeline;
    const build=()=>{
      timeline?.scrollTrigger?.kill();timeline?.kill();
      const max=document.documentElement.scrollHeight-innerHeight;
      const top=id=>Math.max(0,document.getElementById(id).offsetTop-100);
      const project=document.getElementById('projects');
      const galleryStart=top('projects'),galleryTravel=project.offsetHeight-innerHeight;
      const points=[
        {at:0,x:0,y:3.4,z:16,tx:0,ty:2.3,tz:-3,mood:0,fog:.026,key:3.5},
        {at:top('about'),x:1,y:3.4,z:-3,tx:0,ty:3,tz:-18,mood:.25,fog:.038,key:2.6},
        {at:top('skills'),x:-1,y:4,z:-21,tx:0,ty:3,tz:-34,mood:.4,fog:.036,key:2.2},
        ...Array.from({length:9},(_,i)=>({at:galleryStart+100+galleryTravel*(i+.22)/9,x:Math.sin(i*.8)*.5,y:3.4+Math.sin(i*.6)*.18,z:-42-i*8,tx:0,ty:3,tz:-57-i*8,mood:.45+i*.045,fog:.025+i*.002,key:2.1-i*.12})),
        {at:top('work'),x:0,y:3.4,z:-122,tx:1,ty:2.5,tz:-137,mood:.88,fog:.044,key:1.4},
        {at:top('contact'),x:0,y:5,z:-144,tx:0,ty:4.6,tz:-186,mood:1,fog:.018,key:2.8},
        {at:max,x:1.5,y:5.6,z:-154,tx:0,ty:5.5,tz:-205,mood:1,fog:.014,key:3.2},
      ].sort((a,b)=>a.at-b.at);
      if(!spatial){points[0].x=3;points[0].y=5.4;points[0].tx=3;points[0].ty=4.4;}
      for(const [id,next] of [['about','skills'],['skills','projects'],['work','contact']]){
        const source=points.find(p=>p.at===top(id));
        const hold=Math.max(source.at+1,top(next)-innerHeight*.65);
        points.push({...source,at:hold});
      }
      points.sort((a,b)=>a.at-b.at);
      world.waypoints=points;
      Object.assign(world.route,points[0]);
      timeline=gsap.timeline({scrollTrigger:{start:0,end:()=>document.documentElement.scrollHeight-innerHeight,scrub:reducedMotion?true:.8,onUpdate:()=>world.invalidate?.()}});
      points.slice(1).forEach((p,i)=>{
        const {at,...values}=p;
        timeline.to(world.route,{...values,duration:Math.max(1,at-points[i].at),ease:'sine.inOut'},points[i].at);
      });
      ScrollTrigger.refresh();
    };
    let timer=setTimeout(build,150);
    const resize=()=>{clearTimeout(timer);timer=setTimeout(build,180);};
    window.addEventListener('resize',resize);
    document.fonts.ready.then(()=>{if(timer!==null)resize();});
    return ()=>{
      clearTimeout(timer);timer=null;window.removeEventListener('resize',resize);
      timeline?.scrollTrigger?.kill();timeline?.kill();
      document.removeEventListener('click',navigate);gsap.ticker.remove(tick);lenis?.destroy();world.lenis=null;
    };
  },[reducedMotion,touch,spatial]);
  useEffect(()=>{if(visible)world.lenis?.start();else world.lenis?.stop();},[visible]);
  return null;
}
