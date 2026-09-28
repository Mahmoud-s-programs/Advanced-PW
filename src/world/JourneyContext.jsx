import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { chapters, world } from './config';
import { supportsWebGL } from './graphics';
import { ScrollTrigger } from './smoothScroll';

import { JourneyContext } from './useJourney';

function useMedia(query) {
  const subscribe = useCallback((notify) => {
    const media = window.matchMedia(query);
    media.addEventListener('change', notify);
    return () => media.removeEventListener('change', notify);
  }, [query]);
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}

function readPreference(key, fallback) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}

function automaticQuality() {
  if (window.innerWidth < 700 || navigator.connection?.saveData || (navigator.deviceMemory && navigator.deviceMemory <= 2)) return 'low';
  if (window.innerWidth < 1100 || navigator.hardwareConcurrency <= 4) return 'medium';
  return 'high';
}

export function JourneyProvider({ children }) {
  const systemReduced = useMedia('(prefers-reduced-motion: reduce)');
  const touch = useMedia('(hover: none), (pointer: coarse)');
  const [paused, setPaused] = useState(() => readPreference('autumn-motion', 'on') === 'off');
  const [qualityPreference, setQualityPreference] = useState(() => {
    const stored = readPreference('autumn-quality', 'auto');
    return ['auto', 'high', 'medium', 'low'].includes(stored) ? stored : 'auto';
  });
  const [automaticTier, setAutomaticTier] = useState(automaticQuality);
  const [active, setActive] = useState('home');
  const [visible, setVisible] = useState(!document.hidden);
  const [discovery, setDiscovery] = useState('');
  const [webgl, setWebgl] = useState(supportsWebGL);
  const [spatialReady, setSpatialReady] = useState(false);
  const reportSceneFailure = useCallback(() => { setWebgl(false); setSpatialReady(false); }, []);
  const timeout = useRef();
  const reducedMotion = systemReduced || paused;
  const quality = qualityPreference === 'auto' ? automaticTier : qualityPreference;

  const discover = useCallback((message) => {
    world.gustUntil = world.time + 2.4;
    setDiscovery(message);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setDiscovery(''), 4200);
  }, []);

  const degrade = useCallback(() => {
    setAutomaticTier((tier) => tier === 'high' ? 'medium' : 'low');
  }, []);

  useEffect(() => {
    let raf = 0;
    let sequence = '';
    let clearingVisited = false;
    const update = () => {
      raf = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      world.progress = height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0;
      let current = chapters[0];
      chapters.forEach((chapter) => {
        const section = document.getElementById(chapter.id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.42) current = chapter;
      });
      world.chapter = chapters.indexOf(current);
      if (current.id === 'projects' && !clearingVisited) {
        world.gustUntil = world.time + 1.6;
        clearingVisited = true;
      }
      setActive(current.id);
      document.documentElement.style.setProperty('--journey-progress', world.progress);
      const readingShade = Math.min(0.68, Math.max(0, (window.scrollY / window.innerHeight - 0.35) * 0.8));
      const overlook = Math.max(0, (world.progress - 0.85) / 0.15);
      document.documentElement.style.setProperty('--reading-shade', readingShade * (1 - overlook * 0.2));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { setAutomaticTier(automaticQuality()); onScroll(); };
    const onPointer = (event) => {
      world.pointer.x = event.clientX / window.innerWidth * 2 - 1;
      world.pointer.y = -(event.clientY / window.innerHeight * 2 - 1);
    };
    const onVisibility = () => setVisible(!document.hidden);
    const onKey = (event) => {
      if (event.target.closest('input, textarea, select, [contenteditable]') || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key.length !== 1) return;
      sequence = (sequence + event.key.toLowerCase()).slice(-6);
      if (sequence === 'autumn') discover('A little change in the wind. You found the forestâ€™s secret.');
    };
    const scrollTrigger = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: onScroll, onRefresh: onScroll });
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', onVisibility);
    const observer = new ResizeObserver(onScroll);
    observer.observe(document.body);
    update();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout.current);
      observer.disconnect();
      scrollTrigger.kill();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [discover]);

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? 'reduced' : 'full';
    try {
      localStorage.setItem('autumn-motion', paused ? 'off' : 'on');
      localStorage.setItem('autumn-quality', qualityPreference);
    } catch { /* Storage can be unavailable in private browsing. */ }
  }, [paused, reducedMotion, qualityPreference]);

  return <JourneyContext.Provider value={{ active, reducedMotion, systemReduced, paused, setPaused, touch, quality, qualityPreference, setQualityPreference, visible, degrade, discover, webgl, spatialReady, setSpatialReady, reportSceneFailure }}>
    {children}
    <div className={`discovery-toast ${discovery ? 'is-visible' : ''}`} role="status">{discovery}</div>
  </JourneyContext.Provider>;
}


JourneyProvider.propTypes = { children: PropTypes.node.isRequired };
