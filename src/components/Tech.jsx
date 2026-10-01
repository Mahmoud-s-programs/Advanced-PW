import { technologies, additionalSkills } from '../constants';
import { useJourney } from '../world/useJourney';
import { skillNodes as nodes, skillDisplayName as displayName } from '../world/spatialData';
import { useContent, setContent } from '../world/contentStore';
import Reveal from './ui/Reveal';

const groups = ['All connections','Languages','Frontend','Backend & data','Machine learning','Cloud & tools','AI development tools','Creative development'];

export default function Tech() {
  const {group,skill:selected,skillHover:hovered}=useContent();
  const setGroup=value=>setContent({group:value});
  const setSelected=value=>setContent({skill:value});
  const setHovered=value=>setContent({skillHover:value});
  const { spatial } = useJourney();
  const current = hovered || selected;
  const highlightedGroup = current?.group || group;
  const toolkitGroups = groups.filter(item => item !== 'All connections' && (group === 'All connections' || item === group) && additionalSkills.some(skill => skill.group === item));
  const context=<div className='skill-context' role='status'><span className='eyebrow'>{current?.group || 'Follow a connection'}</span><p>{current ? current.context : 'Hover, focus, or select a technology to see where it fits.'}</p></div>;
  const staticMap = <div className='skills-map is-static'>
    <svg className='skill-connections' viewBox='0 0 1000 600' preserveAspectRatio='none' aria-hidden='true'>
      <ellipse cx='500' cy='288' rx='205' ry='152' fill='none' stroke='#caa36c' strokeOpacity='.1' strokeDasharray='2 8' />
      {nodes.map(node => <path key={node.name} d={`M500 288 Q${node.x*10} 288 ${node.x*10} ${node.y*6}`} className={highlightedGroup === 'All connections' || highlightedGroup === node.group ? 'is-connected' : ''} />)}
    </svg>
    <div className='ecosystem-center' aria-hidden='true'><span>Built to<br /><em>connect.</em></span></div>
    {nodes.map(node => {
      const technology = technologies.find(item => item.name === node.name);
      const relevant = highlightedGroup === 'All connections' || node.group === highlightedGroup;
      return <button className={`skill-node ${relevant?'':'is-dimmed'} ${current?.name===node.name?'is-active':''}`} key={node.name} style={{'--node-x':`${node.x}%`,'--node-y':`${node.y}%`}} aria-pressed={selected?.name===node.name} onClick={()=>setSelected(node)} onPointerEnter={()=>setHovered(node)} onPointerLeave={()=>setHovered(null)} onFocus={()=>setHovered(node)} onBlur={()=>setHovered(null)}>
        {technology && <img src={technology.icon} alt='' loading='lazy' width='20' height='20' />}<span>{displayName(node.name)}</span>
      </button>;
    })}
  </div>;
  return <section id='skills' className='chapter skills-section section-shell' aria-labelledby='skills-title'>
    <Reveal><h2 id='skills-title'>A connected<br /><em>way of thinking.</em></h2><p className='section-intro skills-intro'>Explore the tools behind the work. Select a satellite to follow its connection.</p></Reveal>
    <div className='skill-filters' role='group' aria-label='Filter technologies by category'>{groups.map(item => <button key={item} className={group===item?'is-selected':''} aria-pressed={group===item} onClick={()=>{setGroup(item);setSelected(null);setHovered(null);}}>{item}</button>)}</div>
    {spatial ? <>{context}<div className='skills-world-space' aria-hidden='true' /></> : staticMap}
    {toolkitGroups.length>0 && <div className='extended-toolkit'>
      <p className='eyebrow'>More connections</p>
      <div className='toolkit-groups'>{toolkitGroups.map(item=><div className='toolkit-group' key={item}>
        <h3>{item}</h3><ul>{additionalSkills.filter(skill=>skill.group===item).map(skill=><li key={skill.name}><button className={`skill-chip ${current?.name===skill.name?'is-active':''}`} aria-pressed={selected?.name===skill.name} onClick={()=>setSelected(skill)} onPointerEnter={()=>setHovered(skill)} onPointerLeave={()=>setHovered(null)} onFocus={()=>setHovered(skill)} onBlur={()=>setHovered(null)}>{skill.name}</button></li>)}</ul>
      </div>)}</div>
    </div>}
    {!spatial&&context}
  </section>;
}
