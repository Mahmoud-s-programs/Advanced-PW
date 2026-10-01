import { useSyncExternalStore } from 'react';
import { journeyScrollTo } from './smoothScroll';

let state={skill:null,skillHover:null,group:'All connections',project:0,experience:0};
const listeners=new Set();
export const setContent=(patch)=>{state={...state,...patch};listeners.forEach(fn=>fn());};
const subscribe=fn=>{listeners.add(fn);return()=>listeners.delete(fn);};
export const useContent=()=>useSyncExternalStore(subscribe,()=>state,()=>state);
export function goToProject(index,immediate=false){
 const section=document.getElementById('projects');
 if(!section)return;
 const desired=Math.max(0,Math.min(8,index));
 setContent({project:desired});
 journeyScrollTo(section.offsetTop+(section.offsetHeight-innerHeight)*(desired+.22)/9,{immediate});
}
