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
  newsAg,
  apw,
  chatapp,
  threejs,
  sql,
  python,
  java,
  calc,
  basicportfolio,
  solarsystem,
  ragPipeline,
  multiAgentPipeline,
  mlopsPipeline,
} from "../assets";

export const resumeLink = '/Mahmoud-Alkwisem-Resume-2026.pdf';

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

const additionalSkills = [
  { name: "Go", group: "Languages", context: "Go is part of my software engineering language toolkit." },
  { name: "C", group: "Languages", context: "C is part of my software engineering language toolkit." },
  { name: "SQL", group: "Languages", context: "Queries and relational data across SQL Server, PostgreSQL and MySQL." },
  { name: "XGBoost", group: "Machine learning", context: "The model stack for my end-to-end fraud detection pipeline." },
  { name: "Transformers", group: "Machine learning", context: "Integrated with Llama 2 during voice synthesis development at Vosyn." },
  { name: "LlamaIndex", group: "Machine learning", context: "Retrieval orchestration across 10,000+ pages in my RAG pipeline." },
  { name: "LangGraph", group: "Machine learning", context: "Guarded state transitions and orchestration for four research agents." },
  { name: "Ragas", group: "Machine learning", context: "Automated faithfulness and hallucination evaluation for my RAG pipeline." },
  { name: "MLflow", group: "Machine learning", context: "Experiment tracking and monitoring in my MLOps pipeline." },
  { name: "Spring Boot", group: "Backend & data", context: "Spring Boot is part of my backend development toolkit." },
  { name: "Qdrant", group: "Backend & data", context: "Vector retrieval in my production-grade RAG pipeline." },
  { name: "PostgreSQL", group: "Backend & data", context: "PostgreSQL is part of my relational database toolkit." },
  { name: "MySQL", group: "Backend & data", context: "MySQL is part of my relational database toolkit." },
  { name: "DVC", group: "Cloud & tools", context: "Versioned data across 50+ training iterations in my MLOps pipeline." },
  { name: "GitHub Actions", group: "Cloud & tools", context: "Automated Docker releases in under 12 minutes for my MLOps pipeline." },
  { name: "Azure", group: "Cloud & tools", context: "Azure is part of my cloud development toolkit." },
  { name: "Claude Code", group: "AI development tools", context: "An AI development tool in my engineering workflow." },
  { name: "OpenAI Codex", group: "AI development tools", context: "An AI development tool in my engineering workflow." },
];

const experiences = [
  {
    title: "Machine Learning Developer",
    company_name: "Fani's Lab",
    date: "September 2024 - Present",
    points: [
      "Co-developed LADy, a Python toolkit for latent aspect detection in online reviews using NLP techniques.",
      "Integrated LDA, CTM and neural models for topic modeling; helped design an Arabic review dataset for model training.",
    ],
  },
  {
    title: "Software Development Team Lead",
    company_name: "Vosyn",
    date: "July 2023 - October 2023",
    points: [
      "Led a 12+ person team delivering a voice synthesis platform with Python, PyTorch and Tortoise TTS.",
      "Integrated Llama 2 and Transformers; presented engineering progress weekly to 5+ stakeholders.",
      "Introduced Jira task tracking and workflows, contributing to a reported 20% productivity increase.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Mahmoud has helped me immensely during the winter of 2022 when we built projects together",
    name: "Ali Alsalkhadi ",
    designation: "Software developer",
    company: "University of Windsor",
    image: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
  },
  {
    testimonial:
      "I cannot thank Mahmoud enough for the beautiful portfolio he built for me",
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
    name: "Production-Grade RAG Pipeline",
    short_name: "RAG Pipeline",
    category: "Retrieval / Applied AI",
    description: "Built retrieval over 10,000+ pages of financial and medical PDFs. Hybrid BM25/dense search with Cohere reranking improved precision 34%. Automated evaluation reached 92% average faithfulness and under 3% hallucinations; parent-child chunking reduced token use 25%.",
    tags: [{ name: "LlamaIndex" }, { name: "Qdrant" }, { name: "Ragas" }],
    image: ragPipeline,
    image_size: [1440, 960],
    image_alt: "Concept artwork: document fragments pass through an index and retrieval lens into an answer core.",
    image_credit: "AI-generated concept artwork",
    tint: "#92b5ad",
  },
  {
    name: "Multi-Agent Autonomous Pipeline",
    short_name: "Multi-Agent Pipeline",
    category: "Agent systems / Research",
    description: "Orchestrated four research agents with guarded state transitions, asynchronous execution and human review, reducing manual research time 85%. Enforced structured outputs with Pydantic, achieving a reported 99.8% successful execution rate across API model updates.",
    tags: [{ name: "LangGraph" }, { name: "Python" }, { name: "Pydantic" }],
    image: multiAgentPipeline,
    image_size: [1440, 960],
    image_alt: "Concept artwork: four specialized research modules connect to a central coordination hub and review gate.",
    image_credit: "AI-generated concept artwork",
    tint: "#d0a285",
  },
  {
    name: "End-to-End MLOps Pipeline",
    short_name: "MLOps Pipeline",
    category: "Machine learning / Operations",
    description: "Built a fraud detection pipeline for streaming transactions, with DVC versioning data across 50+ training iterations. Automated Docker/GitHub Actions releases to under 12 minutes; MLflow tracking and drift checks triggered retraining.",
    tags: [{ name: "XGBoost" }, { name: "DVC" }, { name: "MLflow" }],
    image: mlopsPipeline,
    image_size: [1440, 960],
    image_alt: "Concept artwork: transaction blocks move through a model, verification gate and monitoring feedback loop.",
    image_credit: "AI-generated concept artwork",
    tint: "#a2ba92",
  },
  {
    name: "News Aggregator",
    category: "Web application",
    image_size: [1440, 653],
    tint: "#ddbd84",
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
    short_name: "3D Portfolio",
    category: "Interactive web / 3D",
    image_size: [1440, 679],
    tint: "#bfa8d6",
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
    category: "Communication / Web",
    image_size: [1014, 807],
    tint: "#8eafae",
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
    category: "Web utility",
    image_size: [839, 863],
    tint: "#d7a782",
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
    name: "Basic Portfolio",
    category: "Portfolio / Web",
    image_size: [1440, 647],
    tint: "#ccb991",
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
    category: "Creative coding / 3D",
    image_size: [1271, 855],
    tint: "#9c9bc1",
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

export { services, technologies, additionalSkills, experiences, testimonials, projects };
