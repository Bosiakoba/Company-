/**
 * Company-first ordering: flagship multi-tenant SaaS → B2B platforms → commerce → consumer products.
 * Keep this file in sync across Home (featured) and Portfolio (full grid).
 */
export const YFT_SCHOOL_SYSTEM_URL = 'https://yft-school-system.vercel.app/';

export type ShowcaseProject = {
  id: string;
  title: string;
  /** Word in the title to style with the primary accent */
  highlight: string;
  category: string;
  description: string;
  tags: string[];
  link: string;
  linkText: string;
  image: string;
  /** Lower numbers appear first on the homepage */
  featuredOrder: number;
};

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: 'yft-school-system',
    title: 'YFT School System',
    highlight: 'School',
    category: 'MULTI-TENANT SAAS / EDUCATION',
    description:
      'A multi-tenant school management platform delivered on Flutter for the web: isolated tenants, administrative depth, and workflows built for real institutions. Mobile, Windows, macOS, and Linux clients are in development; the production web app is live today.',
    tags: ['Flutter Web', 'Multi-Tenant', 'SaaS', 'Education ERP'],
    link: YFT_SCHOOL_SYSTEM_URL,
    linkText: 'OPEN LIVE WEB APP',
    image: '/school-mgmt.png',
    featuredOrder: 1,
  },
  {
    id: 'easy-employ',
    title: 'Easy Employ',
    highlight: 'Employ',
    category: 'RECRUITMENT PLATFORM',
    description:
      'An employment platform connecting teachers and schools—matching, messaging, and a recruitment flow tuned for education so hiring teams move faster with less friction.',
    tags: ['Web App', 'Recruitment', 'Education', 'Platform'],
    link: 'https://easyemploy.vercel.app/',
    linkText: 'VISIT PLATFORM',
    image: '/easyemploy.png',
    featuredOrder: 2,
  },
  {
    id: 'learnix',
    title: 'Learnix',
    highlight: 'Learnix',
    category: 'E-LEARNING',
    description:
      'A higher-education e-learning ecosystem: course delivery, academic workflows, and tooling that keeps administrators and learners aligned.',
    tags: ['E-Learning', 'Web App', 'Education'],
    link: 'https://learnix-one.vercel.app/',
    linkText: 'VISIT PLATFORM',
    image: '/learnix.png',
    featuredOrder: 3,
  },
  {
    id: 'khadys-presale-palace',
    title: 'Khadys Presale Palace',
    highlight: 'Palace',
    category: 'E-COMMERCE WEB APP',
    description:
      'A premium preorder commerce experience—editorial presentation, preorder mechanics, and a checkout journey suited to exclusive drops.',
    tags: ['E-Commerce', 'Web App', 'Preorder', 'Premium'],
    link: 'https://khadyspresalepalace.com/',
    linkText: 'VISIT WEBSITE',
    image: '/khadys.png',
    featuredOrder: 4,
  },
  {
    id: 'open-audio-web',
    title: 'Open Audio Web App',
    highlight: 'Web',
    category: 'WEB APPLICATION',
    description:
      'The browser companion to Open Audio: responsive streaming, library sync, and playback tuned for everyday use across devices.',
    tags: ['Web App', 'Music Streaming', 'Responsive'],
    link: 'https://open-audio-mobile.vercel.app/',
    linkText: 'VISIT WEB APP',
    image: 'https://picsum.photos/seed/openaudio-web/800/1000',
    featuredOrder: 5,
  },
  {
    id: 'open-audio-mobile',
    title: 'Open Audio',
    highlight: 'Audio',
    category: 'MUSIC STREAMING APP',
    description:
      'A Flutter music streaming app on the Play Store—high-quality playback, playlists, and discovery in a product-ready consumer shell.',
    tags: ['Flutter', 'Music Streaming', 'Play Store', 'Cross-Platform'],
    link: 'https://play.google.com/store/apps/details?id=com.youngfuturetech.musicstreamapp',
    linkText: 'VIEW ON PLAY STORE',
    image: '/open-audio.png',
    featuredOrder: 6,
  },
];

export const featuredProjectsHome = [...showcaseProjects].sort((a, b) => a.featuredOrder - b.featuredOrder);
