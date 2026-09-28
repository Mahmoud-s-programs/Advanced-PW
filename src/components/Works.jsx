import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, resumeLink } from '../constants';
import { world } from '../world/config';
import { useJourney } from '../world/useJourney';
import Magnetic from './ui/Magnetic';
import Reveal from './ui/Reveal';
import { Icon } from './ui/Icon';

const collection = [projects[0], projects[1], projects[2], projects[4], projects[3], projects[5], projects[8], projects[6], projects[7]];
const number = (value) => String(value).padStart(2, '0');

function ProjectExhibit({ project, index, compact = false }) {
  const frame = useRef();
  const { reducedMotion, touch } = useJourney();
  const [width,height] = project.image_size;
  const href = project.source_code_link || `${resumeLink}#page=1`;
  const action = project.source_code_link ? 'View source' : 'Read project brief';
  const move = (event) => {
    if (reducedMotion || touch) return;
    const rect = frame.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    frame.current.style.setProperty('--tilt-x', `${-y*3}deg`);
    frame.current.style.setProperty('--tilt-y', `${x*3}deg`);
    frame.current.style.setProperty('--light-x', `${(x+.5)*100}%`);
    frame.current.style.setProperty('--light-y', `${(y+.5)*100}%`);
  };
  const reset = () => {
    frame.current?.style.setProperty('--tilt-x', '0deg');
    frame.current?.style.setProperty('--tilt-y', '0deg');
    world.projectHover = 0;
  };
  useEffect(() => () => { world.projectHover = 0; }, []);
  return <article className={`project-exhibit ${compact ? 'is-compact' : ''}`}>
    <a ref={frame} className='project-frame' href={href} target='_blank' rel='noopener noreferrer' aria-label={project.source_code_link ? `View ${project.name} source on GitHub` : `Read ${project.name} in my resume`} data-cursor='project' data-cursor-label={project.source_code_link ? 'View source ↗' : 'Read brief ↗'} onPointerMove={move} onPointerEnter={() => { world.projectHover = 1; world.projectTint = project.tint; }} onPointerLeave={reset}>
      <div className='frame-toolbar'><span className='window-dots'><i /><i /><i /></span><span>{project.category}</span><Icon name='northeast' /></div>
      <div className={`project-image ${width/height >= 1.6 ? 'is-landscape' : ''}`} style={{'--image-ratio':width/height}}><img src={project.image} alt={project.image_alt || `${project.name} interface screenshot`} loading='lazy' decoding='async' width={width} height={height} /><span className='image-light' /><span className='image-cta'>{action} <Icon name='northeast' /></span></div>
      <span className='frame-footnote'>{project.image_credit || 'An idea, made real.'} <span>{number(index+1)} / {number(collection.length)}</span></span>
    </a>
    <div className='project-copy'><p className='eyebrow'>{number(index+1)} / SELECTED WORK</p><h3>{project.name}</h3><p>{project.description}</p><ul className='tech-tags' aria-label='Project technologies'>{project.tags.map((tag) => <li key={tag.name}>{tag.name}</li>)}</ul><Magnetic href={href} target='_blank' rel='noopener noreferrer' className='text-link'>{action} <Icon name='northeast' /></Magnetic></div>
  </article>;
}

export default function Works() {
  const section = useRef();
  const { reducedMotion } = useJourney();
  const [mobile, setMobile] = useState(() => window.innerWidth < 900 || window.innerHeight < 680);
  const [index, setIndex] = useState(0);
  const simple = mobile || reducedMotion;
  useEffect(() => {
    const media = window.matchMedia('(max-width: 899px), (max-height: 679px)');
    const change = () => setMobile(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    if (simple) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!section.current) return;
      const rect = section.current.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      setIndex(Math.min(collection.length-1, Math.max(0, Math.floor((-rect.top / distance) * collection.length))));
    };
    const scroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', scroll, {passive:true});
    window.addEventListener('resize', scroll);
    update();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', scroll); };
  }, [simple]);
  const select = (next) => {
    const desired = Math.max(0,Math.min(collection.length-1,next));
    setIndex(desired);
    const start = section.current.getBoundingClientRect().top + window.scrollY;
    const travel = section.current.offsetHeight - window.innerHeight;
    window.scrollTo({top:start + travel / collection.length * (desired+.22), behavior:reducedMotion ? 'instant' : 'smooth'});
  };
  return <section ref={section} id='projects' className={`chapter projects-section ${simple ? 'gallery-simple' : 'gallery-immersive'}`} style={{'--gallery-length':collection.length}} aria-labelledby='projects-title'>
    <div className={`gallery-inner section-shell ${simple ? '' : 'gallery-sticky'}`} onKeyDown={(event) => {
      if (simple || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
      event.preventDefault(); select(index+(event.key === 'ArrowRight' ? 1 : -1));
    }}>
      <div className='chapter-label'><span>04 / THE GALLERY CLEARING</span><span className='fine-line' /><span>SELECTED WORK — {number(collection.length)}</span></div>
      <div className='gallery-heading'><h2 id='projects-title'>Ideas, brought <em>to life.</em></h2><p>{simple ? 'A collection of things I’ve made.' : 'Scroll through the clearing.'}</p></div>
      {simple ? <div className='project-list'>{collection.map((project,i) => <Reveal key={project.name}><ProjectExhibit project={project} index={i} compact /></Reveal>)}</div> : <>
        <div className='gallery-stage'>
          <AnimatePresence mode='wait' initial={false}>
            <motion.div key={index} className='exhibit-motion' initial={{opacity:0, x:35, scale:.94, rotateY:3}} animate={{opacity:1, x:0, scale:1, rotateY:0}} exit={{opacity:0, x:-25, scale:1.04, rotateY:-3}} transition={{duration:.4,ease:[.22,1,.36,1]}}><ProjectExhibit project={collection[index]} index={index} /></motion.div>
          </AnimatePresence>
        </div>
        <div className='gallery-controls'>
          <div className='gallery-project-nav' role='group' aria-label='Choose a project'>{collection.map((project,i) => <button key={project.name} aria-label={`Show ${project.name}`} aria-pressed={index === i} className={index === i ? 'is-active' : ''} onClick={() => select(i)}><span>{number(i+1)}</span><span>{project.short_name || project.name}</span></button>)}</div>
          <div className='gallery-arrows'><button className='icon-button' aria-label='Previous project' disabled={index === 0} onClick={() => select(index-1)}><Icon className='arrow-reverse' /></button><span className='gallery-count' aria-live='polite'>{number(index+1)} / {number(collection.length)}</span><button className='icon-button' aria-label='Next project' disabled={index === collection.length-1} onClick={() => select(index+1)}><Icon /></button></div>
        </div>
      </>}
    </div>
  </section>;
}

ProjectExhibit.propTypes = { project: PropTypes.shape({ name: PropTypes.string.isRequired, description: PropTypes.string.isRequired, category: PropTypes.string.isRequired, image: PropTypes.string.isRequired, image_size: PropTypes.arrayOf(PropTypes.number).isRequired, image_alt: PropTypes.string, image_credit: PropTypes.string, tint: PropTypes.string.isRequired, source_code_link: PropTypes.string, tags: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired })).isRequired }).isRequired, index: PropTypes.number.isRequired, compact: PropTypes.bool };
