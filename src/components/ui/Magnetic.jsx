import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useJourney } from '../../world/useJourney';

export default function Magnetic({ as: Tag = 'a', children, className = '', ...props }) {
  const ref = useRef();
  const { touch, reducedMotion } = useJourney();
  const move = (event) => {
    if (touch || reducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--magnet-x', `${(event.clientX - rect.left - rect.width / 2) * 0.07}px`);
    ref.current.style.setProperty('--magnet-y', `${(event.clientY - rect.top - rect.height / 2) * 0.09}px`);
  };
  const reset = () => {
    ref.current.style.setProperty('--magnet-x', '0px');
    ref.current.style.setProperty('--magnet-y', '0px');
  };
  return <Tag ref={ref} className={`magnetic ${className}`} onPointerMove={move} onPointerLeave={reset} {...props}>{children}</Tag>;
}

Magnetic.propTypes = { as: PropTypes.elementType, children: PropTypes.node.isRequired, className: PropTypes.string };
