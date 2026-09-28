import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { world } from './config';

gsap.registerPlugin(ScrollTrigger);

export function journeyScrollTo(target, { immediate = false, offset = 0 } = {}) {
  if (world.lenis) world.lenis.scrollTo(target, { immediate, offset, duration: 1.1 });
  else {
    const top = typeof target === 'number' ? target : document.querySelector(target)?.getBoundingClientRect().top + window.scrollY;
    if (Number.isFinite(top)) window.scrollTo({ top: top + offset, behavior: immediate ? 'instant' : 'smooth' });
  }
}

export { gsap, ScrollTrigger };
