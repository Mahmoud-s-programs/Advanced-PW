import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  docker,
  psg,
  newsAg,
  apw,
  chatapp,
  threejs,
  vosyn,
  sql,
  python,
  java,
  calc,
  basicportfolio,
  solarsystem,
  imageconverter,
  seeSpace,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Game Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "AI Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "SQL Server",
    icon: sql,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Forklift Operator",
    company_name: "ProStaff",
    icon: psg,
    iconBg: "#383E56",
    date: "October 2025 - Present",
    points: [
      "Safely operated forklifts and material handling equipment to move, load, and organize pallets and materials throughout the production floor.",
      "Conducted daily equipment inspections and performed basic maintenance to ensure safe and efficient operation.",
      "Verified inventory movement against work orders, maintaining 99% accuracy in material tracking and documentation.",
      "Maintained accurate shipping and receiving logs to support efficient order fulfillment.",
    ],
  },
  {
    title: "General Labourer",
    company_name: "Cleveland-Cliffs",
    icon: psg,
    iconBg: "#E6DEDD",
    date: "July 2025 - October 2025",
    points: [
      "Performed part inspections to ensure compliance with quality standards and production requirements.",
      "Stacked and organized parts efficiently to maintain workflow, minimize delays, and optimize shop floor space.",
      "Operated laser machines to support production processes, maintaining precision and efficiency.",
      "Assisted with forklift operations when needed, safely transporting materials and supporting team productivity during high-demand periods.",
    ],
  },
  {
    title: "Production Associate",
    company_name: "The Job Shoppe",
    icon: psg,
    iconBg: "#383E56",
    date: "November 2023 - November 2024",
    points: [
      "Operated and monitored high-volume industrial digital printers to produce custom marketing materials, ensuring 100% adherence to job specifications.",
      "Consistently met or exceeded daily production targets in a fast-paced, lean manufacturing environment without compromising product quality.",
      "Verified order details against production tickets to ensure accuracy in quantity, paper stock, and finishing options.",
      "Contributed to a team that consistently hit 99% of production goals during peak holiday seasons.",
    ],
  },
  {
    title: "Software Development Team Lead",
    company_name: "Vosyn Inc",
    icon: vosyn,
    iconBg: "#E6DEDD",
    date: "July 2023 - October 2023",
    points: [
      "Led a 25-member team in developing a voice synthesis platform using Python, TensorFlow, and PyTorch.",
      "Built an MVP in 5 weeks using Python and Flask, exceeding industry speed benchmarks.",
      "Integrated PaLM2 Large Language Model, VALL-E TTS and Transformers into our voice synthesis platform.",
      "Maintained 100% transparency, providing weekly GCP and Git reports to 5+ stakeholders.",
      "Optimized workflow with Jira and Docker, boosting team output by 20% and using TensorBoard for monitoring.",
    ],
  },
  {
    title: "Machine Operator",
    company_name: "Accu-Staff",
    icon: psg,
    iconBg: "#383E56",
    date: "April 2023 - July 2023",
    points: [
      "Operated injection molding machines, producing 200+ plastic components daily for automotive clients.",
      "Assembled and inspected parts for visual and dimensional defects, maintaining 98% defect-free rate.",
      "Conducted daily equipment checks and minor fixes to avoid unscheduled production stops.",
      "Worked with team leads to meet shift targets and support JIT (just-in-time) manufacturing goals.",
    ],
  },
  {
    title: "General Labourer",
    company_name: "Personnel By Elsie",
    icon: psg,
    iconBg: "#E6DEDD",
    date: "May 2022 - September 2022",
    points: [
      "Loaded and aligned raw metal materials into hydraulic and mechanical stamping presses to maintain continuous production flow.",
      "Performed visual inspections on stamped parts to identify defects such as burrs, cracks, dents, or missed punches.",
      "Maintained a clean and organized work area (5S standards), removing metal shavings and oil to prevent slip-and-fall hazards.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Mahmoud has helped me emmensly during the winter of 2022 when we built projects together",
    name: "Ali Alsalkhadi ",
    designation: "Software developer",
    company: "University of Windsor",
    image: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
  },
  {
    testimonial:
      "I cannot thank Mahmoud enough for the beatiful portfolio he built for me",
    name: "Ahmad Kouaissem",
    designation: "Student",
    company: "University of Windsor",
    image: "https://cdn.dribbble.com/users/3734064/screenshots/14413405/media/6744f33319119e4db7637ba5b49e5d78.png?compress=1&resize=1200x900&vertical=top",
  },
  {
    testimonial:
      "Thanks to Mahmoud, I can confidently showcase the websites he and I developed",
    name: "Kareem Sawatri",
    designation: "Student",
    company: "University of Windsor",
    image: "https://freesvg.org/img/myAvatar.png",
  },
  {
    testimonial:
      "Mahmoud and I worked on a couple of projects together and I look forward to doing more.",
    name: "Hala",
    designation: "Student",
    company: "University of Windsor",
    image: "https://cdn4.vectorstock.com/i/1000x1000/21/63/avatar-a-young-woman-in-hijab-muslim-vector-29662163.jpg",
  },
];

const projects = [
  {
    name: "News Aggregator",
    description:
      "Discover the latest news on any topic, anytime with my News Aggregator platform. my advanced, user-friendly system provides instant, relevant articles from trusted global sources.",
    tags: [
      {
        name: "javascript",
        color: "blue-text-gradient",
      },
      {
        name: "css",
        color: "green-text-gradient",
      },
      {
        name: "html",
        color: "pink-text-gradient",
      },
    ],
    image: newsAg,
    source_code_link: "https://github.com/Mahmoud-s-programs/News-Aggregator-",
  },
  {
    name: "3D Portfolio Website",
    description:
      "Experience the future of portfolios with my 3D website built using ReactJS and ThreeJS. This innovative platform showcases projects in an immersive, interactive 3D environment, bringing every detail to life.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "threejs",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: apw,
    source_code_link: "https://github.com/Mahmoud-s-programs/Portfolio-Website?search=1",
  },
  {
    name: "Chat app",
    description:
      "Experience secure, worry-free communication with my chat app, built using ReactJS. This platform allows seamless interaction with anyone, safeguarded by robust data privacy measures.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "reactjs",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: chatapp,
    source_code_link: "https://github.com/Mahmoud-s-programs/Chat-App",
  },
  {
    name: "Web Calculator",
    description:
      "Do your math calculations on the web for free with an interesting animated background",
    tags: [
      {
        name: "css",
        color: "blue-text-gradient",
      },
      {
        name: "html",
        color: "green-text-gradient",
      },
    ],
    image: calc,
    source_code_link: "https://github.com/Mahmoud-s-programs/Web-Calculator",
  },
  {
    name: "Baisc Portfolio",
    description:
      "Use this template if you are not a developer or if you are a junior developer for, it is easy to modify",
    tags: [
      {
        name: "css",
        color: "blue-text-gradient",
      },
      {
        name: "html",
        color: "green-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      }
    ],
    image: basicportfolio,
    source_code_link: "https://github.com/Mahmoud-s-programs/basic-portfolio",
  },  
  {
    name: "Solar System",
    description:
      "Are you a space nerd like me? Well now you can have the entire solar system on your computer. Follow the steps in the readme file to run the program",
    tags: [
      {
        name: "java",
        color: "blue-text-gradient",
      },
      {
        name: "java3D",
        color: "green-text-gradient",
      },
    ],
    image: solarsystem,
    source_code_link: "https://github.com/Mahmoud-s-programs/Solar-System-using-java3D",
  },
];

export { services, technologies, experiences, testimonials, projects };
