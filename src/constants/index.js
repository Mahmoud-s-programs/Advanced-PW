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
  kp,
  topline,
  psg,
  uber,
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
    title: "Driver",
    company_name: "Uber",
    icon: uber,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Providing excellent customer service by addressing passenger inquiries and resolving any issues.",
      "Regular vehicle maintenance checks to ensure optimal performance and safety.",
      "Effcient route planning and navigation using GPS technology.",
    ],
  },
  {
    title: "CEO",
    company_name: "TBD",
    icon: seeSpace,
    iconBg: "#E6DEDD",
    date: "TBD",
    points: [
      "TBD",
    ],
  },
  {
    title: "Warehouse Associate",
    company_name: "Topline",
    icon: topline,
    iconBg: "#383E56",
    date: "Jun 2019 - August 2019",
    points: [
      "Enhanced operational efficiency by maintaining equipment and reporting any malfunctions.",
      "Responded promptly to management's requests and adapted quickly to changing demands.",
      "Assisted in maintaining warehouse organization and cleanliness to provide a safe and efficient work environment.",
      "Efficiently processed incoming stock and materials, ensuring accurate inventory control.",
    ],
  },
  {
    title: "Molding Machine Operator",
    company_name: "Kp Components",
    icon: kp,
    iconBg: "#E6DEDD",
    date: "April 2023 - July 2023",
    points: [
      "Proficiently operated and maintained a variety of molding machines to ensure efficient production.",
      "Performed regular checks and measurements on produced parts to ensure adherence to specifications",
      "Kept detailed records of production data, machine maintenance, and quality control checks.",
      "Utilized strong problem-solving skills to effectively address machine issues and minimize production disruptions.",
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
