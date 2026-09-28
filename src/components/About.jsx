import { services } from '../constants';
import Reveal from './ui/Reveal';
import { Icon } from './ui/Icon';
import { useJourney } from '../world/useJourney';

function RootStudy() {
  return <figure className='root-study'>
    <div className='root-code root-code-top'><span>01</span> curiosity.seed()</div>
    <svg viewBox='0 0 480 480' className='root-diagram' aria-hidden='true'>
      <defs><radialGradient id='root-glow'><stop stopColor='#f0a43b' stopOpacity='.13' /><stop offset='1' stopColor='#f0a43b' stopOpacity='0' /></radialGradient></defs>
      <circle cx='240' cy='235' r='200' fill='url(#root-glow)' />
      <g fill='none' stroke='#b58953' strokeWidth='1'>
        <circle cx='240' cy='235' r='156' opacity='.14' strokeDasharray='2 9' /><circle cx='240' cy='235' r='100' opacity='.18' />
        <path d='M240 70v270m0-220-68-42-54 17m122 52 58-47 67 5M240 176l-95-34-52 26m147 32 72-41 67 31M240 233l-64 28-45-8m109 17 76 25 48-15M240 309l-54 62-75 35m129-83 72 74 56 19M240 350l-19 60m19-44 34 64' />
        <path d='m145 142 8-52m159 69 16-42m-152 144-45 53m185-19 25 46m-155 30-12-40' opacity='.4' />
      </g>
      {[ [240,70],[118,95],[365,105],[93,168],[379,190],[131,253],[364,280],[111,406],[368,416],[221,410],[274,430] ].map(([x,y],i) => <g key={i}><circle cx={x} cy={y} r='6' fill='#f0a43b' opacity='.08' /><circle cx={x} cy={y} r='2' fill='#d8aa69' /></g>)}
      <circle cx='240' cy='235' r='9' fill='#f0a43b' opacity='.1' /><circle cx='240' cy='235' r='3' fill='#ffc66d' />
    </svg>
    <div className='root-code root-code-bottom'><span>02</span> ideas.grow()</div>
    <figcaption>Rooted in logic. Growing through curiosity.</figcaption>
  </figure>;
}

export default function About() {
  const { discover } = useJourney();
  return <section id='about' className='chapter about-section section-shell' aria-labelledby='about-title'>
    <Reveal className='chapter-label'><span>02 / BENEATH THE CANOPY</span><span className='fine-line' /></Reveal>
    <div className='about-layout'>
      <div className='about-copy'>
        <Reveal><h2 id='about-title'>Curiosity<br />takes <em>root.</em></h2></Reveal>
        <Reveal delay={0.12}><p className='lead'>A software engineer who likes to explore what comes next.</p><p>I work with Python and JavaScript, building with React, Node.js, and Three.js. I’m constantly experimenting with AI, and I’m drawn to ambitious projects that ask me to think a little differently.</p></Reveal>
        <Reveal className='practice-list' delay={0.2}>
          <p className='eyebrow'>Where my ideas grow</p>
          {services.map((service,index) => <div className='practice' key={service.title}><span className='practice-number'>0{index+1}</span><span>{service.title}</span><Icon name='northeast' /></div>)}
        </Reveal>
      </div>
      <Reveal className='about-visual' delay={0.25}><RootStudy /><button className='forest-sign' onClick={() => discover('No bugs here. Only the occasional feature in the undergrowth.')} aria-label='Read the little forest sign'><span>↟</span> git checkout -- forest</button></Reveal>
    </div>
  </section>;
}
