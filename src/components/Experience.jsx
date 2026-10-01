import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { experiences, resumeLink } from '../constants';
import { useJourney } from '../world/useJourney';
import Reveal from './ui/Reveal';
import { Icon } from './ui/Icon';
import { setContent, useContent } from '../world/contentStore';

export default function Experience() {
  const { reducedMotion } = useJourney();
  const {experience:selected}=useContent();
  const setSelected=value=>setContent({experience:value});
  const details = useRef([]);
  useEffect(()=>{details.current.forEach((item,i)=>{if(item)item.open=i===selected;});},[selected]);
  return <section id='work' className='chapter experience-section section-shell' aria-labelledby='experience-title'>
    <Reveal className='chapter-label'><span>05 / ALONG THE TRAIL</span><span className='fine-line' /></Reveal>
    <div className='experience-layout'>
      <div className='experience-heading'><Reveal><h2 id='experience-title'>Experience,<br />in <em>perspective.</em></h2><p>Research, engineering, and the teams<br />that shape how I work.</p></Reveal><div className='experience-world-space' aria-hidden='true' /><a className='text-link resume-download' href={resumeLink} download>Download resume <Icon name='northeast' /></a></div>
      <div className='experience-trail'>
        <svg className='trail-path' viewBox='0 0 100 1200' preserveAspectRatio='none' aria-hidden='true'><motion.path initial={reducedMotion ? false : {pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true,amount:.1}} transition={{duration:reducedMotion ? 0 : 3,ease:[.22,1,.36,1]}} d='M48 0 C48 100 85 100 48 200 S15 300 48 400 S85 500 48 600 S15 700 48 800 S85 900 48 1000 S15 1100 48 1200' /></svg>
        {experiences.map((experience,index) => <motion.article key={`${experience.company_name}-${experience.date}`} className={`milestone milestone-${index}`} initial={false} whileInView={{'--marker-opacity':1}} viewport={{once:true,amount:.2}} transition={{duration:reducedMotion ? 0 : .8}}>
          <span className='trail-marker' aria-hidden='true' />
          <div className='milestone-meta'><span>{experience.date}</span><span>0{index+1}</span></div>
          <details ref={el=>{details.current[index]=el;}} className='experience-details' open={index === 0 ? true : undefined} onToggle={event=>{if(event.currentTarget.open)setSelected(index);}}>
            <summary><span><span className='company-name'>{experience.company_name}</span><h3>{experience.title}</h3></span><span className='details-icon'><Icon name='down' /></span></summary>
            <ul>{experience.points.map((point,i) => <li key={i}>{point}</li>)}</ul>
          </details>
        </motion.article>)}
      </div>
    </div>
  </section>;
}
