import { motion } from 'framer-motion';
import { useJourney } from '../world/useJourney';
import Magnetic from './ui/Magnetic';
import { Icon } from './ui/Icon';
import SpatialStage from './ui/SpatialStage';

export default function Hero() {
  const { reducedMotion, discover } = useJourney();
  const entrance = (delay) => ({ initial: reducedMotion ? false : { y: 38, opacity: 0, filter: 'blur(5px)' }, animate: { y: 0, opacity: 1, filter: 'blur(0px)' }, transition: { duration: reducedMotion ? 0 : 1.2, delay: reducedMotion ? 0 : delay, ease: [0.22,1,0.36,1] } });
  return <section id='home' className='hero' aria-labelledby='hero-title'>
    <SpatialStage kind='hero' className='hero-3d-stage' fallback={<div className='hero-sculpture-fallback' />} />
    <div className='hero-content'>
      <motion.p className='eyebrow hero-eyebrow' {...entrance(0.15)}>Software & machine learning engineer</motion.p>
      <h1 id='hero-title' className='hero-name'><motion.span {...entrance(0.25)}>Mahmoud</motion.span><motion.span className='surname' {...entrance(0.4)}>Alkwisem<span className='name-period'>.</span></motion.span></h1>
      <motion.p className='hero-description' {...entrance(0.65)}>I turn complex ideas into intelligent systems<br className='desktop-break' /> and experiences you can explore.</motion.p>
      <motion.div className='hero-actions' {...entrance(0.85)}>
        <Magnetic className='button button-primary' href='#projects'>Explore my work <Icon name='northeast' /></Magnetic>
        <a className='text-link' href='#about'>Meet the person behind it <Icon /></a>
      </motion.div>
    </div>
    <div className='hero-bottom'>
      <a className='scroll-invitation' href='#about'><span className='scroll-stem' /><span>Scroll to wander</span><Icon name='down' /></a>
      <div className='world-caption'><span>THE AUTUMN OBSERVATORY</span><span>Ideas in orbit</span></div>
      <button className='golden-leaf' aria-label='Catch the golden leaf' onClick={() => discover('You caught a little golden hour. Take it with you.')}><Icon name='leaf' width='28' height='28' /></button>
    </div>
  </section>;
}
