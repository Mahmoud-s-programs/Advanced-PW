import { useEffect, useRef } from 'react';
import { useJourney } from '../world/useJourney';

export default function CustomCursor() {
  const ref = useRef();
  const { touch, reducedMotion } = useJourney();
  useEffect(() => {
    if (touch || reducedMotion) return;
    const cursor = ref.current;
    const move = (event) => {
      const target = event.target;
      const project = target.closest('[data-cursor="project"]');
      const interactive = target.closest('a, button, summary, select');
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.dataset.kind = project ? 'project' : interactive ? 'link' : 'default';
      cursor.firstElementChild.textContent = project?.dataset.cursorLabel || 'View source ↗';
      cursor.dataset.visible = target.closest('input, textarea, select') ? 'false' : 'true';
    };
    const hide = () => { cursor.dataset.visible = 'false'; };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    window.addEventListener('keydown', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      window.removeEventListener('keydown', hide);
    };
  }, [touch, reducedMotion]);
  if (touch || reducedMotion) return null;
  return <div ref={ref} className="custom-cursor" data-visible="false" aria-hidden="true"><span>View source ↗</span></div>;
}
