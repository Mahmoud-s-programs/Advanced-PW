import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useJourney } from './useJourney';
import { world } from './config';
import { gsap, ScrollTrigger, journeyScrollTo } from './smoothScroll';

export default function CinematicJourney() {
  const { reducedMotion, touch, visible } = useJourney();
  useEffect(() => {
    let lenis;
    const tick = (time) => lenis?.raf(time * 1000);
    if (!reducedMotion && !touch) {
      lenis = new Lenis({ autoRaf: false, smoothWheel: true, syncTouch: false, lerp: 0.085, anchors: false });
      world.lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
    }
    const navigate = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor || anchor.hash === '#main' || anchor.hasAttribute('download') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = document.querySelector(anchor.hash);
      if (!target) return;
      event.preventDefault();
      history.pushState(null, '', anchor.hash);
      journeyScrollTo(anchor.hash, { immediate: reducedMotion, offset: -86 });
    };
    document.addEventListener('click', navigate);
    const context = gsap.context(() => {
      [['#home', 'arrival'], ['#skills', 'skills'], ['#work', 'career']].forEach(([selector, key]) => {
        gsap.fromTo(world.sequence, { [key]: 0 }, {
          [key]: 1, ease: 'none',
          scrollTrigger: {
            trigger: selector, start: selector === '#home' ? 'top top' : 'top bottom', end: 'bottom top',
            scrub: reducedMotion ? true : 0.7,
            onUpdate: () => world.invalidate?.(),
            onRefresh: () => world.invalidate?.(),
          },
        });
      });
    });
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refresh);
      document.removeEventListener('click', navigate);
      context.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy();
      world.lenis = null;
    };
  }, [reducedMotion, touch]);
  useEffect(() => {
    if (visible) world.lenis?.start();
    else world.lenis?.stop();
  }, [visible]);
  return null;
}
