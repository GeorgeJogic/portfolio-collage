export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Web Platforms' | 'Accessibility' | 'Core Python & Logic';
  liveUrl: string;
  repoUrl: string;
  imagePath: string;
  stack: string[];
  overview: string;
  architectureHighlights: string[];
  metrics: string;
  featuredSpan?: boolean;
}

export interface SkillGroup {
  id: 'languages' | 'ai-tools' | 'web-toolchain' | 'methodologies';
  title: string;
  subtitle: string;
  skills: {
    name: string;
    context: string;
  }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organizer: string;
  dateAndVenue: string;
  credentialId?: string;
  signatory?: string;
  summary: string;
  verificationTag: string;
}

export const STUDENT_PROFILE = {
  fullName: 'George Jogi Chittilappilly',
  monogram: 'GJ.',
  brandName: 'George Jogi',
  rollNumber: '2026BTAI069',
  section: 'Section A (Room 401)',
  sectionShort: 'Sec A-401',
  school: 'School of Computational Intelligence',
  department: 'Department of Computer Science & Engineering (AI / CSE AI)',
  departmentShort: 'CSE AI',
  university: 'Joy University, Kanyakumari (NIAT x Joy University)',
  universityShort: 'Joy University',
  degree: 'B.Tech in Artificial Intelligence & Machine Learning (AI & ML)',
  degreeShort: 'B.Tech AI & ML',
  timeline: '2026 – Expected 2030',
  standing: '1st Year Undergraduate · Active & Ongoing',
  scores: {
    classXII: '62%',
    classX: '90%',
  },
  location: 'Tirunelveli, Tamil Nadu, India',
  email: 'georgejogic@gmail.com',
  phone: '+91 94969 46515',
  phoneRaw: '+919496946515',
  web3FormsKey: 'b01da65d-614a-43e1-bab9-d6fa04be01c6',
  portraitImage: '/assets/aistudio/image_486018c1.png',
  links: {
    github: 'https://github.com/GeorgeJogic',
    linkedin: 'https://linkedin.com/in/george-jogi-chittilappilly',
    instagram: 'https://www.instagram.com/ft_george_notfound_',
    vercel: 'https://georgejogic.vercel.app',
  },
  headline: 'GEORGE JOGI CHITTILAPPILLY',
  subHeadline:
    'Vibe Coding & AI-Assisted Product Developer Trainee · First-year B.Tech (AI & ML) student at Joy University (2026 – Expected 2030)',
  bio: 'First-year B.Tech (AI & ML) student at Joy University who turns ideas into live, working products by directing AI coding tools end-to-end from prompt to deployment. Shipped multiple web platforms spanning hardware marketing, community tools, and campus accessibility.',
  focusAreas: [
    {
      index: '01',
      title: 'Vibe Coding & AI-Assisted Engineering',
      description:
        'Prompt-driven rapid full-stack app prototyping, end-to-end LLM orchestration, and rapid web shipping from initial architectural specification to live cloud deployment.',
      meta: 'Lovable · Google Gemini · Full-Stack Shipping',
    },
    {
      index: '02',
      title: 'Vision-Language & Multimodal Systems',
      description:
        'Exploring multimodal agent workflows, visual reasoning pipelines, and low-latency edge AI integration on single-board computers including Raspberry Pi 5.',
      meta: 'Multimodal Agents · Edge AI · Raspberry Pi 5',
    },
    {
      index: '03',
      title: 'Community & Accessibility Solutions',
      description:
        'Designing resilient offline campus navigation utilities, multilingual voice guidance systems, and sustainable commercial transit awareness platforms.',
      meta: 'Offline-First UX · Multilingual · Civic Utility',
    },
  ],
  careerGoals: {
    shortTerm: {
      label: 'Short-Term Academic & Engineering Goal',
      title: 'RAG Pipelines, Edge Quantization & API Architectures',
      description:
        'Master Retrieval-Augmented Generation (RAG) pipelines using LangChain and FAISS, low-power edge model quantization via Ollama, and resilient full-stack RESTful API architectures.',
    },
    longTerm: {
      label: 'Long-Term Career Vision',
      title: 'AI Solutions Architect & Product Developer',
      description:
        'Advance as an AI Solutions Architect & Product Developer, designing autonomous, accessible AI software systems that bridge edge hardware and cloud intelligence.',
    },
  },
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    title: '01. Programming Languages & Logic',
    subtitle: 'Foundational syntax, data structures, and algorithmic problem solving',
    skills: [
      { name: 'Python', context: 'Algorithmic scripting, conditional logic & AI workflows' },
      { name: 'JavaScript (ES6+)', context: 'Asynchronous DOM & client-side application state' },
      { name: 'TypeScript', context: 'Strict type-safe React components & API contracts' },
      { name: 'HTML5', context: 'Semantic document structure & WCAG accessibility' },
      { name: 'CSS3', context: 'Responsive layout geometry, Grid/Flexbox & animations' },
      { name: 'SQL', context: 'Relational schema design & structured data querying' },
      { name: 'Conditional Logic & Scripting', context: 'Mathematical evaluators & rule-based CLI utilities' },
    ],
  },
  {
    id: 'ai-tools',
    title: '02. AI-Assisted Development & AI/ML Tools',
    subtitle: 'End-to-end LLM orchestration, vector indexing, and vibe-coded product shipping',
    skills: [
      { name: 'Lovable', context: 'Full-stack AI-assisted web application generation' },
      { name: 'Google Gemini', context: 'Multimodal reasoning, structured outputs & system prompting' },
      { name: 'Prompt-Driven Full-Stack App Generation', context: 'Zero-to-production architecture specification' },
      { name: 'Rapid Prototyping & Deployment', context: 'Iterative validation & continuous cloud delivery' },
      { name: 'LangChain', context: 'Composable LLM chains & retrieval orchestration' },
      { name: 'FAISS', context: 'High-speed dense vector similarity search' },
      { name: 'Ollama', context: 'Local LLM execution & edge quantization workflows' },
    ],
  },
  {
    id: 'web-toolchain',
    title: '03. Web Engineering, Platforms & Hardware Toolchain',
    subtitle: 'Modern component frameworks, cloud hosting infrastructure, and edge AI hardware',
    skills: [
      { name: 'React', context: 'Modular hook-driven interactive interfaces' },
      { name: 'Next.js', context: 'Hybrid SSR/SSG routing & modern web architecture' },
      { name: 'Vite', context: 'High-speed ES module bundling & instant dev tooling' },
      { name: 'Tailwind CSS', context: 'Design-token utility styling & dark-mode systems' },
      { name: 'RESTful APIs', context: 'JSON payload integration, Web3Forms & backend proxies' },
      { name: 'Vercel', context: 'Zero-downtime edge deployment & preview environments' },
      { name: 'Git & GitHub', context: 'Version control, repository hygiene & open-source publishing' },
      { name: 'Linux', context: 'Command-line environment & system administration' },
      { name: 'Raspberry Pi 5', context: 'Single-board computer edge AI & multimodal experimentation' },
    ],
  },
  {
    id: 'methodologies',
    title: '04. Soft & Practical Methodologies',
    subtitle: 'Product execution discipline, interface ergonomics, and collaborative delivery',
    skills: [
      { name: 'Rapid Vibe Debugging', context: 'Root-cause isolation across AI-generated codebases' },
      { name: 'UI/UX Interaction Design', context: 'Obsidian Material 3 bento layouts & micro-interactions' },
      { name: 'Technical System Documentation', context: 'Clear specification writing & architectural diagrams' },
      { name: 'Agile Iterative Delivery', context: 'Fast feedback cycles from concept to live URL' },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'pureair-drive',
    title: 'PureAir Drive',
    subtitle: 'Hardware Marketing Platform · Live Deployment',
    category: 'Web Platforms',
    liveUrl: 'https://pureair-drive-zero-emissions.lovable.app',
    repoUrl: 'https://github.com/GeorgeJogic',
    imagePath: '/src/assets/images/project_pureair_drive_1794046769805.jpg',
    stack: ['Lovable', 'React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    overview:
      'Marketing and technical validation platform for a heavy-duty diesel emission-reduction hardware concept. Features a live fleet compliance & ROI calculator alongside real-time performance indicators.',
    architectureHighlights: [
      'Interactive Fleet Compliance & ROI Calculator computing projected fuel savings and NOx/PM reduction payback timelines.',
      'Real-time hardware telemetry visualization showcasing exhaust filtration stages and emission reduction thresholds.',
      'Responsive dark-mode engineering presentation tailored for commercial transport operators and sustainability evaluators.',
    ],
    metrics: 'Interactive ROI Calculator · Real-Time Telemetry UI · Zero-Emission Concept Validation',
    featuredSpan: true,
  },
  {
    id: 'campus-aid',
    title: 'CampusAid',
    subtitle: 'Accessibility & Navigation Web Utility · Live Deployment',
    category: 'Accessibility',
    liveUrl: 'https://campusaid-liard.vercel.app',
    repoUrl: 'https://github.com/GeorgeJogic',
    imagePath: '/src/assets/images/project_campus_aid_1794046770832.jpg',
    stack: ['Vite', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    overview:
      'Multilingual (English, Hindi, Tamil) offline campus navigation tool engineered for Joy University. Provides step-free route guidance, spoken directions, sign-reading, and an integrated emergency SOS module.',
    architectureHighlights: [
      'Tri-lingual localization engine supporting English, Hindi (हिन्दी), and Tamil (தமிழ்) for inclusive student and visitor navigation.',
      'Step-free barrier-aware routing designed specifically around Joy University academic blocks, ramps, and elevators.',
      'Spoken voice synthesis guidance, visual sign-reading utility, and 1-tap Emergency SOS dispatch module.',
    ],
    metrics: '3 Languages (EN / HI / TA) · Offline-Ready Routing · Integrated Emergency SOS',
    featuredSpan: true,
  },
  {
    id: 'grocery-check',
    title: 'GroceryCheck',
    subtitle: 'Community Data Web App · Live Deployment',
    category: 'Web Platforms',
    liveUrl: 'https://local-shelf-check.lovable.app',
    repoUrl: 'https://github.com/GeorgeJogic',
    imagePath: '/src/assets/images/project_grocery_check_1794046770278.jpg',
    stack: ['Lovable', 'React', 'Tailwind CSS'],
    overview:
      'Community-driven grocery price and availability tracker featuring category browsing, user sign-in flows, and dynamic order-tracking.',
    architectureHighlights: [
      'Crowdsourced local shelf stock verification and price comparison across neighborhood retail categories.',
      'Structured category filtering (Produce, Dairy, Staples) with user authentication states and live order tracking.',
      'Mobile-first ergonomic layout designed for rapid in-store price checks and household inventory planning.',
    ],
    metrics: 'Crowdsourced Price Index · Category Filtering · Dynamic Order Tracking',
  },
  {
    id: 'python-repositories',
    title: 'Algorithmic & Python Practice Repositories',
    subtitle: 'Core Logic & Computational Scripting · GitHub Open Source',
    category: 'Core Python & Logic',
    liveUrl: 'https://github.com/GeorgeJogic',
    repoUrl: 'https://github.com/GeorgeJogic',
    imagePath: '',
    stack: ['Python', 'Conditional Logic', 'Mathematical Modeling', 'GitHub'],
    overview:
      'Curated collection of core Python logic repositories including a Triangle area calculator (Heron’s formula & base-height validation), Indian driving-licence age-eligibility checker, procedural logo designer, and conditional script exercises.',
    architectureHighlights: [
      'Triangle Area & Geometry Validator: Computes exact area via base/height or 3-side Heron’s formula while verifying triangle inequality constraints.',
      'Indian Driving-Licence Eligibility Engine: Evaluates applicant age and vehicle class rules (MCWOG at 16+, LMV at 18+, Commercial Transport at 20+).',
      'Procedural Logo Designer & Conditional Scripts: Clean, modular Python scripts demonstrating control flow, input sanitization, and edge-case handling.',
    ],
    metrics: 'Triangle Area Calculator · Indian DL Eligibility Checker · Logo Designer Scripts',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'vibe-coding-2026',
    title: 'Vibe Coding Workshop 2026',
    organizer: 'StartupTN in collaboration with Google for Developers',
    dateAndVenue: '30 October 2026 · Noorul Islam Centre for Higher Education, Kanniyakumari',
    credentialId: 'VCW26-86235',
    signatory: 'M Senthil Kumar (Google Developer Expert)',
    summary:
      'Completed intensive hands-on training in AI-assisted full-stack engineering, prompt architecture, and rapid product deployment organized by StartupTN and Google for Developers.',
    verificationTag: 'Verified Certificate ID: VCW26-86235',
  },
  {
    id: 'quizoff-2026',
    title: "QuizOff 2026: India's Biggest AI Quiz",
    organizer: 'CampusCrew · Hosted on Unstop',
    dateAndVenue: 'July 2026 · National AI Assessment',
    summary:
      'Competed among 5,25,000+ student participants representing 48,500+ global educational institutions in a rigorous assessment of artificial intelligence principles and emerging technologies.',
    verificationTag: '5,25,000+ Competitors · 48,500+ Institutions',
  },
  {
    id: 'gemini-quizoff-100k',
    title: 'Google Gemini QuizOff – 100K Special Certificate',
    organizer: 'CampusCrew via Unstop (#TeamGemini)',
    dateAndVenue: '2026 · Special Certificate Distribution',
    summary:
      'Recognized in the Special Certificate Distribution of Google Gemini QuizOff 2026 (#TeamGemini) for demonstrated literacy in generative AI ecosystems and Google Gemini model capabilities.',
    verificationTag: '#TeamGemini · 100K Special Milestone Recognition',
  },
];

export const PRESET_AI_QUESTIONS = [
  {
    id: 'academic',
    question: "Tell me about George's academic background",
    answer:
      "George Jogi Chittilappilly is a 1st-year B.Tech undergraduate in Artificial Intelligence & Machine Learning (2026 – Expected 2030) at Joy University, Kanyakumari (NIAT x Joy University), within the School of Computational Intelligence (Department of CSE AI). His Roll Number is 2026BTAI069 in Section A (Room 401). Prior to university, he achieved 90% in Secondary (Class X) and 62% in Senior Secondary (Class XII), and is based in Tirunelveli, Tamil Nadu.",
  },
  {
    id: 'projects',
    question: 'What projects has George built?',
    answer:
      'George has shipped three live full-stack web applications and a suite of Python logic repositories:\n\n1. PureAir Drive (pureair-drive-zero-emissions.lovable.app) — A hardware marketing & fleet ROI compliance platform for heavy-duty diesel emission reduction.\n2. CampusAid (campusaid-liard.vercel.app) — A multilingual (English, Hindi, Tamil) offline campus navigation utility for Joy University with step-free routing and emergency SOS.\n3. GroceryCheck (local-shelf-check.lovable.app) — A community-driven grocery price and shelf availability tracker.\n4. Python Practice Repositories (github.com/GeorgeJogic) — Including a Triangle area calculator, Indian driving-licence age-eligibility checker, and logo designer.',
  },
  {
    id: 'certifications',
    question: 'What are his certifications?',
    answer:
      "George holds three verified credentials:\n\n1. Vibe Coding Workshop 2026 — Organized by StartupTN & Google for Developers (30 Oct 2026 at Noorul Islam Centre for Higher Education, Kanniyakumari), signed by Google Developer Expert M Senthil Kumar (Certificate ID: VCW26-86235).\n2. QuizOff 2026: India's Biggest AI Quiz — Hosted by CampusCrew on Unstop (July 2026), competing among 5,25,000+ students across 48,500+ institutions.\n3. Google Gemini QuizOff 100K Special Certificate — Awarded by CampusCrew via Unstop (#TeamGemini).",
  },
  {
    id: 'contact',
    question: 'How can I contact him?',
    answer:
      'You can reach George directly via:\n\n• Email: georgejogic@gmail.com\n• Phone: +91 94969 46515\n• Location: Tirunelveli, Tamil Nadu, India\n• GitHub: github.com/GeorgeJogic\n• LinkedIn: linkedin.com/in/george-jogi-chittilappilly\n• Direct Form: Use the Contact Transmission Hub on this page to send an instant message to his inbox.',
  },
];
