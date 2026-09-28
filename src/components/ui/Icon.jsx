import PropTypes from 'prop-types';
export function Icon({ name = 'arrow', ...props }) {
  const paths = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    northeast: <><path d="M6 18 18 6M6 6h12v12" /></>,
    down: <><path d="M12 4v16M6 14l6 6 6-6" /></>,
    leaf: <><path d="m12 3 2.2 5 4-2-1 5 4 1-6 5 .6 3-3.8-1.3L8.2 20l.6-3-6-5 4-1-1-5 4 2L12 3Z" /><path d="M12 11v11m0-6-3-3m3 2 3-3" /></>,
    pause: <><path d="M9 6v12M15 6v12" /><circle cx="12" cy="12" r="10" /></>,
    play: <><path d="m10 7 7 5-7 5V7Z" /><circle cx="12" cy="12" r="10" /></>,
    github: <><path d="M9 19c-4 1-4-2-6-2m12 5v-4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.4 6a4.3 4.3 0 0 0-.1-3s-1-.3-3.3 1.3a11.5 11.5 0 0 0-6 0C6.7 2.7 5.7 3 5.7 3A4.3 4.3 0 0 0 5.6 6 4.7 4.7 0 0 0 4.3 9.7c0 4.7 2.8 5.7 5.5 6A3 3 0 0 0 9 18v4" /></>,
    menu: <><path d="M4 8h16M4 16h16" /></>,
    close: <><path d="m6 6 12 12M6 18 18 6" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}

Icon.propTypes = { name: PropTypes.string };
