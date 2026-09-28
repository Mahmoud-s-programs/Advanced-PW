import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useJourney } from '../../world/useJourney';

export default function Reveal({ children, as = 'div', className = '', delay = 0 }) {
  const { reducedMotion } = useJourney();
  const Tag = motion[as];
  return <Tag className={className}
    initial={reducedMotion ? false : { opacity: 0, y: 28, clipPath: 'inset(0 0 18% 0)' }}
    whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: reducedMotion ? 0 : 0.85, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </Tag>;
}

Reveal.propTypes = { children: PropTypes.node.isRequired, as: PropTypes.string, className: PropTypes.string, delay: PropTypes.number };
