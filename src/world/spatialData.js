import { projects } from '../constants';

export const galleryProjects = [projects[0], projects[1], projects[2], projects[4], projects[3], projects[5], projects[8], projects[6], projects[7]];

export const skillNodes = [
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
  { name:'Three JS', group:'Creative development', x:49, y:6, context:'Interactive 3D on the web, including the observatory around you.' },
];

export const skillDisplayName = (name) => ({ docker:'Docker', git:'Git', 'Three JS':'Three.js', 'Node JS':'Node.js', 'React JS':'React', 'HTML 5':'HTML5', 'CSS 3':'CSS3' }[name] || name);
