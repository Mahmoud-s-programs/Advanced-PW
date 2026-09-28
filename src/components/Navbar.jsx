import { useEffect, useRef, useState } from 'react';
import { chapters } from '../world/config';
import { useJourney } from '../world/useJourney';
import Magnetic from './ui/Magnetic';
import { Icon } from './ui/Icon';

export default function Navbar() {
  const { active } = useJourney();
  const [open, setOpen] = useState(false);
  const toggle = useRef();
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    if (open) window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className={`site-header ${active !== 'home' ? 'is-scrolled' : ''}`}>
    <a href='#home' className='brand' aria-label='Mahmoud Alkwisem, back to the beginning'>
      <span className='brand-mark'>ma<span>.</span></span>
      <span className='brand-caption'>Code, with<br />a little wonder.</span>
    </a>
    <nav className='desktop-nav' aria-label='Main navigation'>
      {chapters.slice(1).map((chapter) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={active === chapter.id ? 'location' : undefined}>{chapter.name}</a>)}
    </nav>
    <div className='header-actions'>
      <Magnetic href='#contact' className='say-hello'>Let’s talk <Icon name='northeast' /></Magnetic>
      <button ref={toggle} className='menu-toggle icon-button' aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls='mobile-navigation' onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
    </div>
    <nav id='mobile-navigation' className='mobile-nav' aria-label='Mobile navigation' hidden={!open}>
      {chapters.slice(1).map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={active === chapter.id ? 'location' : undefined} onClick={() => setOpen(false)}><span>0{index+2}</span>{chapter.name}<Icon name='northeast' /></a>)}
    </nav>
  </header>;
}
