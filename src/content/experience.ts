import type { Experience } from './types';

/**
 * Reverse-chronological order — the page and the PDF render this array as-is.
 *
 * TODO: every `start`/`end` below except PulseLife's is a placeholder, and the
 * roles marked below are unconfirmed. Fix them before publishing; the tenure
 * bars on the page are computed from these dates.
 */
export const experiences: Experience[] = [
  {
    company: 'PulseLife',
    role: 'Full-Stack Engineer',
    start: '2024-10',
    end: null,
    location: 'Lyon, France',
    highlights: [
      'Delivered end-to-end product features across frontend and backend within a TypeScript ecosystem.',
      'Collaborated daily with Product Managers, Designers and Engineers to deliver healthcare solutions.',
      'Designed scalable backend services using Clean Architecture principles.',
      'Contributed to a shared Nx monorepo supporting multiple products.',
      'Led initiatives improving developer experience and engineering productivity.',
      'Designed AI-assisted development workflows using coding agents and reusable AI Skills.',
      'Explored LLM-powered capabilities to improve both internal engineering workflows and product features.',
    ],
  },
  {
    company: 'Lepermislibre',
    role: 'Full-Stack Engineer', // TODO: confirm official title
    start: '2022-09', // TODO: confirm
    end: '2024-09', // TODO: confirm
    location: 'Lyon, France', // TODO: confirm
    highlights: [
      'Delivered product features used daily by driving schools and learner drivers.',
      'Worked closely with Product, Design and QA from discovery to production.',
      'Improved application performance, accessibility and user experience.',
      'Contributed to roadmap execution within agile cross-functional teams.',
      'Helped evolve frontend architecture to improve maintainability.',
    ],
  },
  {
    company: 'Cyclofix',
    role: 'Full-Stack Engineer', // TODO: confirm official title
    start: '2021-01', // TODO: confirm
    end: '2022-08', // TODO: confirm
    location: 'Paris, France', // TODO: confirm
    highlights: [
      'Built customer-facing features for web and mobile products.',
      'Worked with product stakeholders to iterate rapidly on customer feedback.',
      'Improved frontend consistency and engineering practices.',
      'Participated in product discussions and technical decision-making.',
    ],
  },
  {
    company: 'Oyez',
    role: 'Full-Stack Engineer', // TODO: confirm official title
    start: '2019-06', // TODO: confirm
    end: '2020-12', // TODO: confirm
    location: 'Lyon, France', // TODO: confirm
    highlights: [
      'Developed web and mobile applications within an agile environment.',
      'Built and maintained backend microservices.',
      'Improved accessibility for senior-oriented digital products.',
      'Developed internal HR and recruitment tools.',
    ],
  },
  {
    company: 'Ismérie',
    role: 'Co-Founder & Operations Manager',
    start: '2016-01', // TODO: confirm
    end: '2019-05', // TODO: confirm
    location: 'France', // TODO: confirm
    highlights: [
      'Co-founded and managed a premium service business.',
      'Led daily operations, customer relationships and team coordination.',
      'Built long-term customer loyalty through service quality.',
      'Managed business operations in a fast-paced entrepreneurial environment.',
    ],
  },
];
