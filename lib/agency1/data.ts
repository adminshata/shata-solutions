export const agency1Brand = {
  name: "Shata Agency One",
  tagline: "AI Agency & Intelligent Solutions",
  email: "hello@shataagencyone.com",
  phone: "+1 (762) 768 0763",
  address: "25 Elm Drive, Riverside, TX",
  logo: "",
  footerLogo: "",
  founded: "2018",
  yearsOfExcellence: 7,
  clientsCount: "25K+",
  projectsCount: "500+",
  teamCount: "50+",
  awardsCount: "30+",
};

export const agency1Nav = [
  { label: "About Us", href: "/templates/agency-1/preview/about" },
  {
    label: "Service",
    href: "#",
    children: [
      { label: "Services", href: "/templates/agency-1/preview/services" },
      { label: "Service Details", href: "/templates/agency-1/preview/services/custom-ai-solutions" },
    ],
  },
  {
    label: "Blog",
    href: "#",
    children: [
      { label: "Blog Grid", href: "/templates/agency-1/preview/blog" },
      { label: "Blog Details", href: "/templates/agency-1/preview/blog/ai-future-of-technology" },
    ],
  },
  {
    label: "Pages",
    href: "#",
    children: [
      { label: "Portfolio Grid", href: "/templates/agency-1/preview/portfolio" },
      { label: "Portfolio Details", href: "/templates/agency-1/preview/portfolio/deepvision-ai" },
      { label: "Team", href: "/templates/agency-1/preview/team" },
      { label: "FAQ", href: "/templates/agency-1/preview/faq" },
      { label: "404 Error", href: "/templates/agency-1/preview/not-found" },
    ],
  },
  { label: "Contact", href: "/templates/agency-1/preview/contact" },
];

export const agency1Services = [
  {
    id: "custom-ai-solutions",
    number: "01.",
    title: "Custom AI Driven Solutions",
    description:
      "We design and build custom AI systems tailored to your business. From intelligent automation to advanced data pipelines, our solutions scale with your needs.",
    icon: "/templates/agency1/imgs/icon/service-icon-1.png",
    image: "/templates/agency1/imgs/service/service-3_01.jpg",
    slug: "custom-ai-solutions",
  },
  {
    id: "ai-strategy-consulting",
    number: "02.",
    title: "AI Strategy and Consulting",
    description:
      "Our strategic consulting helps you identify the right AI opportunities, build a roadmap, and align technology with your business goals for measurable outcomes.",
    icon: "/templates/agency1/imgs/icon/service-icon-2.png",
    image: "/templates/agency1/imgs/service/service-3_01.jpg",
    slug: "ai-strategy-consulting",
  },
  {
    id: "machine-learning-solutions",
    number: "03.",
    title: "Machine Learning Solutions",
    description:
      "From predictive models to recommendation engines, we develop and deploy machine learning solutions that deliver real-time intelligence to your operations.",
    icon: "/templates/agency1/imgs/icon/service-icon-3.png",
    image: "/templates/agency1/imgs/service/service-3_01.jpg",
    slug: "machine-learning-solutions",
  },
  {
    id: "nlp-language-ai",
    number: "04.",
    title: "NLP & Language AI",
    description:
      "Harness the power of language models for chatbots, document processing, sentiment analysis, and content generation that transforms customer experiences.",
    icon: "/templates/agency1/imgs/icon/service-icon-1.png",
    image: "/templates/agency1/imgs/service/service-3_01.jpg",
    slug: "nlp-language-ai",
  },
  {
    id: "computer-vision",
    number: "05.",
    title: "Computer Vision",
    description:
      "Build intelligent vision systems that detect, classify, and analyze visual data — from quality control automation to real-time surveillance and medical imaging.",
    icon: "/templates/agency1/imgs/icon/service-icon-2.png",
    image: "/templates/agency1/imgs/service/service-3_01.jpg",
    slug: "computer-vision",
  },
  {
    id: "ai-automation",
    number: "06.",
    title: "AI-Powered Automation",
    description:
      "Eliminate repetitive work with intelligent automation. We integrate AI agents into your workflows to reduce costs, minimize errors, and accelerate output.",
    icon: "/templates/agency1/imgs/icon/service-icon-3.png",
    image: "/templates/agency1/imgs/service/service-3_01.jpg",
    slug: "ai-automation",
  },
];

export const agency1Portfolio = [
  {
    id: "deepvision-ai",
    slug: "deepvision-ai",
    category: "AI Consulting",
    title: "DeepVision: Enhancing Image Recognition with AI",
    description:
      "A custom computer vision pipeline that identifies defects in manufacturing at 99.7% accuracy, reducing quality control costs by 60%.",
    year: "2025",
    image: "/templates/agency1/imgs/project/project-img-1.jpg",
    tags: ["Computer Vision", "Machine Learning", "Python"],
  },
  {
    id: "precision-predictor",
    slug: "precision-predictor",
    category: "Machine Learning",
    title: "From Pixels to Precision – AI Image Recognition Reinvented",
    description:
      "A SaaS platform built for retail brands to automate product tagging, visual search, and inventory classification using deep neural networks.",
    year: "2025",
    image: "/templates/agency1/imgs/project/project-img-2.jpg",
    tags: ["NLP", "SaaS", "API"],
  },
  {
    id: "smartflow-automation",
    slug: "smartflow-automation",
    category: "AI Automation",
    title: "SmartFlow: Intelligent Process Automation Platform",
    description:
      "End-to-end workflow automation with AI decision engines. Reduced human intervention by 80% for a logistics enterprise with 2M+ daily transactions.",
    year: "2024",
    image: "/templates/agency1/imgs/inner/portfolio/portfolio-grid-thumb1_1.jpg",
    tags: ["Automation", "Workflow", "Enterprise"],
  },
  {
    id: "neural-commerce",
    slug: "neural-commerce",
    category: "AI Consulting",
    title: "NeuralCommerce: AI-Driven E-Commerce Personalization",
    description:
      "Personalization engine that increased conversion rates by 34% for a major e-commerce brand using real-time behavioral analysis.",
    year: "2024",
    image: "/templates/agency1/imgs/inner/portfolio/portfolio-grid-thumb1_2.jpg",
    tags: ["E-Commerce", "Personalization", "ML"],
  },
  {
    id: "langbridge-nlp",
    slug: "langbridge-nlp",
    category: "NLP",
    title: "LangBridge: Multilingual AI Communication Platform",
    description:
      "A real-time translation and sentiment analysis tool deployed across 14 languages for a global customer support operation.",
    year: "2024",
    image: "/templates/agency1/imgs/inner/portfolio/portfolio-grid-thumb1_3.jpg",
    tags: ["NLP", "Translation", "Real-Time"],
  },
  {
    id: "guardian-cyber",
    slug: "guardian-cyber",
    category: "AI Security",
    title: "Guardian: Predictive Cybersecurity Intelligence",
    description:
      "AI threat detection system that identifies anomalies 3x faster than traditional SIEM tools, protecting critical infrastructure.",
    year: "2023",
    image: "/templates/agency1/imgs/inner/portfolio/portfolio-grid-thumb1_4.jpg",
    tags: ["Security", "Anomaly Detection", "Real-Time"],
  },
];

export const agency1Testimonials = [
  {
    id: 1,
    quote:
      "Shata Agency One helped us streamline our operations with AI. The team delivered faster than expected and the ROI was clear within the first quarter.",
    author: "Jonathan Kim",
    role: "CEO, NovaTech Solutions",
    avatar: "/templates/agency1/imgs/testimonials/testimonials-author-img-1.png",
  },
  {
    id: 2,
    quote:
      "The AI strategy consulting sessions transformed how we think about automation. We now have a clear roadmap and the results speak for themselves.",
    author: "Sophia Rahman",
    role: "Digital Marketing Lead, VibeTech",
    avatar: "/templates/agency1/imgs/testimonials/testimonials-author-img-2.png",
  },
  {
    id: 3,
    quote:
      "World-class machine learning team. They built our recommendation engine in 6 weeks and it outperformed our in-house model by 40%.",
    author: "Alex Morgan",
    role: "Chief Operating Officer, DataEdge",
    avatar: "/templates/agency1/imgs/testimonials/testimonials-author-img-3.png",
  },
  {
    id: 4,
    quote:
      "From the first discovery call to final deployment, the experience was seamless. They understand AI and they understand business.",
    author: "David Kwon",
    role: "Tech Consultant, Paragon Group",
    avatar: "/templates/agency1/imgs/testimonials/testimonials-author-img-4.png",
  },
  {
    id: 5,
    quote:
      "Highly professional team with deep expertise. Our computer vision pipeline went live on time and already exceeded performance targets.",
    author: "Amina Chowdhury",
    role: "Product Manager, VisionCore",
    avatar: "/templates/agency1/imgs/testimonials/testimonials-author-img-5.png",
  },
];

export const agency1Team = [
  {
    id: 1,
    slug: "james-carter",
    name: "James Carter",
    role: "CEO & AI Strategist",
    bio: "15+ years leading AI transformation projects for Fortune 500 companies. Specializes in turning complex AI strategy into measurable business results.",
    image: "/templates/agency1/imgs/inner/team/team-thumb1_1.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 2,
    slug: "sara-thompson",
    name: "Sara Thompson",
    role: "Head of Machine Learning",
    bio: "PhD in Computer Science with a focus on deep learning architectures. Published researcher and open-source contributor.",
    image: "/templates/agency1/imgs/inner/team/team-thumb1_2.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 3,
    slug: "michael-wu",
    name: "Michael Wu",
    role: "Lead Computer Vision Engineer",
    bio: "Former research engineer at top-tier AI labs. Built vision systems deployed across healthcare, retail, and manufacturing sectors.",
    image: "/templates/agency1/imgs/inner/team/team-thumb1_3.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 4,
    slug: "priya-sharma",
    name: "Priya Sharma",
    role: "NLP & Conversational AI Lead",
    bio: "Expert in large language models, fine-tuning, and production-grade NLP pipelines. Fluent in Python, PyTorch, and HuggingFace.",
    image: "/templates/agency1/imgs/inner/team/team-thumb1_4.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 5,
    slug: "luca-ferrari",
    name: "Luca Ferrari",
    role: "AI Solutions Architect",
    bio: "Designs scalable AI infrastructure on AWS and GCP. Ensures every model ships with reliability, speed, and observability.",
    image: "/templates/agency1/imgs/inner/team/team-thumb1_5.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 6,
    slug: "anna-lee",
    name: "Anna Lee",
    role: "Client Success & Delivery Manager",
    bio: "Bridges the gap between technical teams and client expectations. Ensures every project delivers measurable outcomes on time.",
    image: "/templates/agency1/imgs/inner/team/team-thumb1_6.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
];

export const agency1Blog = [
  {
    id: 1,
    slug: "ai-future-of-technology",
    title: "Global Creativity Unlocked: The Role of Generative AI in Design, Content, and Media",
    excerpt:
      "Generative AI is reshaping how creative professionals produce work — from graphic design to video production. Here's what it means for your business.",
    date: "July 25, 2025",
    author: "James Carter",
    authorImage: "/templates/agency1/imgs/inner/blog-details/blog-details-mentor1_1.png",
    category: "AI Trends",
    image: "/templates/agency1/imgs/blog/blog.jpg",
    content:
      "Generative AI has moved from research labs into everyday creative workflows. Tools powered by models like GPT-4 and Stable Diffusion are enabling teams to produce content at unprecedented speed. For agencies and media companies, this isn't a threat — it's an amplifier. Teams that learn to direct AI tools well will outpace those who don't.",
  },
  {
    id: 2,
    slug: "machine-learning-business-growth",
    title: "How Machine Learning is Powering the Next Generation of Business Growth",
    excerpt:
      "From demand forecasting to churn prediction, ML models are generating measurable ROI across every sector. We break down five high-impact use cases.",
    date: "July 18, 2025",
    author: "Sara Thompson",
    authorImage: "/templates/agency1/imgs/inner/blog-details/blog-details-mentor1_2.png",
    category: "Machine Learning",
    image: "/templates/agency1/imgs/blog/blog-2.jpg",
    content:
      "Machine learning is no longer reserved for tech giants. Mid-market businesses are now deploying ML models to optimize pricing, predict demand, and reduce customer churn. The barrier to entry has dropped dramatically, and the ROI for well-executed ML projects can be measured in weeks rather than years.",
  },
  {
    id: 3,
    slug: "ai-automation-workflows",
    title: "5 Ways AI Automation is Transforming Enterprise Workflows in 2025",
    excerpt:
      "Intelligent automation is eliminating bottlenecks across finance, HR, customer support, and logistics. See how leading enterprises are deploying it.",
    date: "July 10, 2025",
    author: "Michael Wu",
    authorImage: "/templates/agency1/imgs/inner/blog-details/blog-details-mentor1_3.png",
    category: "Automation",
    image: "/templates/agency1/imgs/inner/blog/blog-5-img-01.jpg",
    content:
      "Enterprise automation has evolved beyond RPA. AI-powered workflows now make decisions, adapt to exceptions, and escalate intelligently. From invoice processing to onboarding automation, the 2025 enterprise stack is built on intelligent agents that reduce manual work by 70-90% in the right use cases.",
  },
  {
    id: 4,
    slug: "computer-vision-manufacturing",
    title: "Computer Vision in Manufacturing: Real Results from the Factory Floor",
    excerpt:
      "Quality control, predictive maintenance, and assembly line optimization are being transformed by computer vision. Real case studies inside.",
    date: "July 2, 2025",
    author: "Priya Sharma",
    authorImage: "/templates/agency1/imgs/inner/blog-details/blog-details-mentor1_4.png",
    category: "Computer Vision",
    image: "/templates/agency1/imgs/inner/blog/blog-5-img-02.jpg",
    content:
      "Computer vision is delivering factory-floor ROI that was unimaginable five years ago. Defect detection accuracy above 99%, 24/7 monitoring without fatigue, and real-time alerts that stop production errors before they cascade. Here's how three manufacturers deployed vision AI and what they learned.",
  },
  {
    id: 5,
    slug: "nlp-customer-support",
    title: "NLP is Reinventing Customer Support: What You Need to Know",
    excerpt:
      "Large language models are enabling support systems that understand, escalate, and resolve queries with near-human accuracy. Here's the state of the art.",
    date: "June 25, 2025",
    author: "Anna Lee",
    authorImage: "/templates/agency1/imgs/inner/blog-details/blog-details-mentor1_1.png",
    category: "NLP",
    image: "/templates/agency1/imgs/inner/blog/blog-5-img-03.jpg",
    content:
      "The customer support industry is being reshaped by NLP. AI-powered agents now handle 60-80% of tier-1 queries without human intervention. More importantly, they do so in a way that feels natural and helpful — not robotic. This article covers the technology, the deployment challenges, and the ROI.",
  },
  {
    id: 6,
    slug: "ai-strategy-roadmap",
    title: "Building an AI Strategy Roadmap: A Practical Guide for Non-Technical Leaders",
    excerpt:
      "You don't need to be an engineer to lead an AI transformation. Here's a framework for building a realistic, ROI-driven AI roadmap for your organization.",
    date: "June 17, 2025",
    author: "Luca Ferrari",
    authorImage: "/templates/agency1/imgs/inner/blog-details/blog-details-mentor1_2.png",
    category: "Strategy",
    image: "/templates/agency1/imgs/inner/blog/blog-5-img-04.jpg",
    content:
      "Most AI strategies fail not because of bad technology but because of misaligned expectations. The most successful AI transformations start with a clear business problem, not a technology mandate. This guide walks business leaders through the five stages of building an actionable AI roadmap.",
  },
];

export const agency1FAQs = [
  {
    id: 1,
    question: "What types of businesses do you work with?",
    answer:
      "We work with businesses of all sizes — from fast-growing startups to enterprise organizations. Our AI solutions are scoped to your specific goals, whether you need a single model or a full AI transformation strategy.",
  },
  {
    id: 2,
    question: "How long does a typical AI project take?",
    answer:
      "Timelines vary by scope. A focused ML proof-of-concept can take 4–6 weeks. A full custom AI platform typically requires 3–6 months. We define clear milestones in our discovery phase so you always know what to expect.",
  },
  {
    id: 3,
    question: "Do you offer ongoing maintenance and support after launch?",
    answer:
      "Yes. We offer retainer-based maintenance plans that include model monitoring, performance reporting, retraining schedules, and access to our engineering team for ongoing improvements.",
  },
  {
    id: 4,
    question: "Can you integrate AI into our existing systems and software?",
    answer:
      "Absolutely. We specialize in integrating AI models into existing workflows, CRMs, ERPs, and data platforms via APIs and microservices. We avoid disrupting what already works well.",
  },
  {
    id: 5,
    question: "What industries do you have experience in?",
    answer:
      "We have deep experience in healthcare, e-commerce, logistics, finance, manufacturing, and SaaS. Our cross-industry perspective often surfaces AI opportunities that domain-specific teams miss.",
  },
  {
    id: 6,
    question: "How do you price your services?",
    answer:
      "We offer project-based, retainer, and outcome-based pricing models. After a discovery session, we provide a detailed proposal with clear deliverables and pricing. No hidden fees.",
  },
  {
    id: 7,
    question: "Is my data safe with your team?",
    answer:
      "Data security is foundational to everything we do. We sign NDAs before any data sharing, follow SOC 2 practices, and can work within your existing data governance frameworks. We never use client data to train models without explicit permission.",
  },
  {
    id: 8,
    question: "Do you offer a free consultation?",
    answer:
      "Yes. We offer a complimentary 45-minute discovery call to understand your goals, challenges, and AI readiness. From there, we provide an honest assessment and a proposed approach.",
  },
];

export const agency1WorkProcess = [
  {
    step: "STEP 01",
    title: "Discover & Align Goals",
    description:
      "We start every engagement with a deep discovery session — mapping your business goals, data landscape, and AI readiness to define the right problem to solve.",
  },
  {
    step: "STEP 02",
    title: "Analyze Data & Choose Models",
    description:
      "Our data scientists audit your data, identify gaps, and select the most appropriate models and architectures for your specific use case and performance targets.",
  },
  {
    step: "STEP 03",
    title: "Develop Custom AI Solutions",
    description:
      "We build, fine-tune, and validate your AI system through iterative sprints — keeping you informed at every stage with demos and performance metrics.",
  },
  {
    step: "STEP 04",
    title: "Test, Deploy & Optimize",
    description:
      "Before launch, every model is rigorously tested against real-world edge cases. Post-launch, we monitor performance and continuously optimize for long-term results.",
  },
];
