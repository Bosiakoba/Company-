export interface Service {
  id: string;
  title: string;
  description: string;
  features: readonly string[];
}

export const services: Service[] = [
  {
    id: 'basic-web',
    title: 'Basic Web Apps',
    description: "Simple, effective, and high-performance digital presence for emerging businesses. We focus on speed, SEO, and accessibility to ensure your first step into the digital world is a strong one.",
    features: ['Responsive Design', 'SEO Optimization', 'Fast Loading Times', 'CMS Integration']
  },
  {
    id: 'brand-web',
    title: 'Brand Web Apps',
    description: "Custom, high-end digital experiences designed to elevate your brand's unique identity. We blend editorial design with cutting-edge technology to create immersive web applications.",
    features: ['Custom Animations', 'Interactive UI', 'Brand Storytelling', 'High-Performance Stack']
  },
  {
    id: 'mobile-desktop',
    title: 'Mobile & Desktop',
    description: "Native and cross-platform applications built with Flutter for seamless performance across all devices. From iOS and Android to Windows and macOS, we've got you covered.",
    features: ['Flutter Development', 'React Native', 'Native Performance', 'Cross-Platform Sync']
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    description: "Distinctive visual storytelling and UI/UX architecture that defines your market presence. We create cohesive brand systems that resonate with your audience.",
    features: ['Logo Design', 'Typography Systems', 'Color Palettes', 'Brand Guidelines']
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    description: "Intelligent workflows and task automation solutions to scale your company's efficiency. We leverage the latest AI models to automate repetitive tasks and provide data-driven insights.",
    features: ['Custom AI Agents', 'Workflow Automation', 'Data Analysis', 'API Integrations']
  }
];

export interface HomeService {
  number: string;
  title: string;
  description: string;
}

export const homeServices: HomeService[] = [
  {
    number: '01',
    title: 'Basic Web Apps',
    description: "Simple, effective, and high-performance digital presence for emerging businesses."
  },
  {
    number: '02',
    title: 'Brand Web Apps',
    description: "Custom, high-end digital experiences designed to elevate your brand's unique identity."
  },
  {
    number: '03',
    title: 'Mobile & Desktop',
    description: "Native and cross-platform applications built with Flutter for seamless performance across all devices."
  },
  {
    number: '04',
    title: 'Brand Identity',
    description: "Distinctive visual storytelling and UI/UX architecture that defines your market presence."
  },
  {
    number: '05',
    title: 'AI Automation',
    description: "Intelligent workflows and task automation solutions to scale your company's efficiency."
  }
];

export interface FeaturedProject {
  title: string;
  highlight: string;
  description: string;
  tags: string[];
  link: string;
  linkText: string;
  image: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: 'Easy Employ',
    highlight: 'Employ',
    description: "A dedicated employment platform bridging the gap between teachers and schools. Designed to streamline the recruitment process within the education sector through efficient matching and real-time communication.",
    tags: ['Web App', 'Recruitment', 'Education', 'Platform'],
    link: 'https://easyemploy.vercel.app/',
    linkText: 'VISIT PLATFORM',
    image: '/easyemploy.png'
  },
  {
    title: 'School Management',
    highlight: 'Management',
    description: "A sophisticated, multi-tenant school management system designed for global educational institutions. Featuring powerful administrative tools, automated student tracking, and secure financial management modules.",
    tags: ['SaaS', 'Multi-Tenant', 'ERP', 'Education'],
    link: 'https://school-management-web-app.vercel.app/login',
    linkText: 'VISIT SAAS PLATFORM',
    image: '/school-mgmt.png'
  },
  {
    title: 'Open Audio Web App',
    highlight: 'Web',
    description: "The web-based counterpart to the Open Audio mobile platform. A fully responsive music streaming experience accessible from any browser, featuring high-fidelity playback and seamless library synchronization.",
    tags: ['Web App', 'React', 'Music Streaming', 'Responsive'],
    link: 'https://open-audio-mobile.vercel.app/',
    linkText: 'VISIT WEB APP',
    image: 'https://picsum.photos/seed/openaudio-web/800/1000'
  },
  {
    title: 'Open Audio',
    highlight: 'Audio',
    description: "A professional music streaming application developed with Flutter. Stream high-quality audio, create personalized playlists, and discover new tracks globally.",
    tags: ['Flutter', 'Music Streaming', 'Play Store', 'Cross-Platform'],
    link: 'https://play.google.com/store/apps/details?id=com.youngfuturetech.musicstreamapp',
    linkText: 'VIEW ON PLAY STORE',
    image: '/open-audio.png'
  },
  {
    title: 'Khadys Presale Palace',
    highlight: 'Palace',
    description: "A premium preorder e-commerce platform designed for exclusive collections. Features a high-end editorial interface with seamless preorder management.",
    tags: ['E-Commerce', 'Web App', 'Preorder', 'Premium'],
    link: 'https://khadyspresalepalace.com/',
    linkText: 'VISIT WEBSITE',
    image: '/khadys.png'
  }
];

export const commonCopy = {
  heroSubtitle: "Young Future Tech is a forward-thinking agency delivering basic and brand web apps, mobile and desktop solutions, and AI automation.",
  servicesHero: "A comprehensive suite of digital services designed to scale your business and elevate your brand's digital presence.",
  capabilities: [
    'Web Apps (Basic & Brand)',
    'Mobile & Desktop',
    'Brand Identity',
    'AI Automation'
  ] as const
} as const;

