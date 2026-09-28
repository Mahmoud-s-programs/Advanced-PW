import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { testimonials } from '../constants';
import { useJourney } from '../world/useJourney';
import Reveal from './ui/Reveal';

export default function Feedbacks() {
  const [index, setIndex] = useState(0);
  const { reducedMotion } = useJourney();
  const testimonial = testimonials[index];
  return <section className='testimonials-section section-shell' aria-labelledby='testimonials-title'>
    <Reveal className='testimonials-inner'><p className='eyebrow' id='testimonials-title'>Good company along the way</p><span className='quote-mark' aria-hidden='true'>“</span><div className='quote-stage' aria-live='polite'><AnimatePresence mode='wait' initial={false}><motion.figure key={index} initial={reducedMotion ? false : {opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reducedMotion ? 0 : .25}}><blockquote>{testimonial.testimonial}</blockquote><figcaption><span>{testimonial.name.trim()}</span><span>{testimonial.designation} · {testimonial.company}</span></figcaption></motion.figure></AnimatePresence></div><div className='quote-nav' role='group' aria-label='Choose a testimonial'>{testimonials.map((item,i) => <button key={item.name} aria-label={`Read testimonial from ${item.name.trim()}`} aria-pressed={index === i} className={index === i ? 'is-active' : ''} onClick={() => setIndex(i)}><span>{item.name.trim().split(' ').map((part) => part[0]).slice(0,2).join('')}</span></button>)}</div></Reveal>
  </section>;
}
