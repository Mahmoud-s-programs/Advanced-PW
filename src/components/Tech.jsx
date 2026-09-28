import { useState } from 'react';
import { technologies, additionalSkills } from '../constants';
import Reveal from './ui/Reveal';

const nodes = [
  { name:'JavaScript', group:'Languages', x:24, y:13, context:'The language connecting my browser interfaces and applications.' },
  { name:'React JS', group:'Frontend', x:10, y:29, context:'Component-based interfaces for my web projects and this portfolio.' },
  { name:'HTML 5', group:'Frontend', x:35, y:29, context:'Semantic structure for accessible, readable web experiences.' },
  { name:'CSS 3', group:'Frontend', x:21, y:45, context:'Layout, styling, and the details that give an interface character.' },
  { name:'Tailwind CSS', group:'Frontend', x:9, y:59, context:'Utility-based styling in my React development workflow.' },
  { name:'Node JS', group:'Backend & data', x:73, y:13, context:'JavaScript on the server, beyond the browser.' },
  { name:'MongoDB', group:'Backend & data', x:89, y:29, context:'Document-based storage for application data.' },
  { name:'SQL Server', group:'Backend & data', x:78, y:45, context:'Relational data, queries, and structured application storage.' },
  { name:'Java', group:'Languages', x:90, y:59, context:'The language behind my Java 3D solar-system project.' },
  { name:'Python', group:'Languages', x:63, y:70, context:'LADy at Fani’s Lab, voice synthesis at Vosyn, and my research-agent pipeline.' },
  { name:'TensorFlow', group:'Machine learning', x:79, y:81, context:'A machine learning framework in my broader toolkit.' },
  { name:'PyTorch', group:'Machine learning', x:63, y:93, context:'Part of the machine learning stack used by our Vosyn team.' },
  { name:'GCP', group:'Cloud & tools', x:34, y:92, context:'GCP is part of my cloud development toolkit.' },
  { name:'docker', group:'Cloud & tools', x:13, y:81, context:'Containerized releases in my end-to-end MLOps pipeline.' },
  { name:'git', group:'Cloud & tools', x:23, y:66, context:'Version control and collaboration across my projects.' },
  { name:'Three JS', group:'Creative development', x:49, y:6, context:'Interactive 3D on the web, including the forest around you.' },
];
const groups = ['All connections','Languages','Frontend','Backend & data','Machine learning','Cloud & tools','AI development tools','Creative development'];
const displayName = (name) => ({'docker':'Docker','git':'Git','Three JS':'Three.js','Node JS':'Node.js','React JS':'React','HTML 5':'HTML5','CSS 3':'CSS3'}[name] || name);

export default function Tech() {
  const [group, setGroup] = useState('All connections');
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const current = hovered || selected;
  const highlightedGroup = current?.group || group;
  const toolkitGroups = groups.filter((item) => item !== 'All connections' && (group === 'All connections' || item === group) && additionalSkills.some((skill) => skill.group === item));
  return <section id='skills' className='chapter skills-section section-shell' aria-labelledby='skills-title'>
    <Reveal className='chapter-label'><span>03 / A LIVING ECOSYSTEM</span><span className='fine-line' /></Reveal>
    <div className='section-heading-row'><Reveal><h2 id='skills-title'>Everything<br />is <em>connected.</em></h2></Reveal><Reveal><p className='section-intro'>From the interface to the intelligence behind it.<br />Explore the tools I build with.</p></Reveal></div>
    <div className='skill-filters' role='group' aria-label='Filter technologies by category'>{groups.map((item) => <button key={item} className={group === item ? 'is-selected' : ''} aria-pressed={group === item} onClick={() => { setGroup(item); setSelected(null); setHovered(null); }}>{item}</button>)}</div>
    <Reveal className='skills-map'>
      <svg className='skill-connections' viewBox='0 0 1000 600' preserveAspectRatio='none' aria-hidden='true'>
        <ellipse cx='500' cy='288' rx='205' ry='152' fill='none' stroke='#caa36c' strokeOpacity='.1' strokeDasharray='2 8' />
        <ellipse cx='500' cy='288' rx='390' ry='245' fill='none' stroke='#caa36c' strokeOpacity='.07' />
        {nodes.map((node) => <path key={node.name} d={`M500 288 Q${node.x*10} 288 ${node.x*10} ${node.y*6}`} className={highlightedGroup === 'All connections' || highlightedGroup === node.group ? 'is-connected' : ''} />)}
      </svg>
      <div className='ecosystem-center' aria-hidden='true'><span className='ember-dot' /><span>Built to<br /><em>connect.</em></span></div>
      {nodes.map((node) => {
        const technology = technologies.find((item) => item.name === node.name);
        const relevant = highlightedGroup === 'All connections' || node.group === highlightedGroup;
        return <button className={`skill-node ${relevant ? '' : 'is-dimmed'} ${current?.name === node.name ? 'is-active' : ''}`} key={node.name} style={{'--node-x':`${node.x}%`,'--node-y':`${node.y}%`}} aria-pressed={selected?.name === node.name} onClick={() => setSelected(node)} onPointerEnter={() => setHovered(node)} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered(node)} onBlur={() => setHovered(null)}>
          {technology && <img src={technology.icon} alt='' loading='lazy' width='20' height='20' />}<span>{displayName(node.name)}</span><span className='node-dot' />
        </button>;
      })}
    </Reveal>
    {toolkitGroups.length > 0 && <div className='extended-toolkit'>
      <p className='eyebrow'>More connections</p>
      <div className='toolkit-groups'>{toolkitGroups.map((item) => <div className='toolkit-group' key={item}>
        <h3>{item}</h3>
        <ul>{additionalSkills.filter((skill) => skill.group === item).map((skill) => <li key={skill.name}><button className={`skill-chip ${current?.name === skill.name ? 'is-active' : ''}`} aria-pressed={selected?.name === skill.name} onClick={() => setSelected(skill)} onPointerEnter={() => setHovered(skill)} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered(skill)} onBlur={() => setHovered(null)}>{skill.name}<span className='node-dot' /></button></li>)}</ul>
      </div>)}</div>
    </div>}
    <div className='skill-context' role='status'><span className='eyebrow'>{current?.group || 'Follow a connection'}</span><p>{current ? current.context : 'Hover, focus, or select a technology to see where it fits.'}</p></div>
  </section>;
}
