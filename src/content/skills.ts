import type { SkillGroup } from './types';

/**
 * Grouped so a human reads three themes and an ATS reads the keywords.
 * Keep each group to a single line's worth of terms.
 */
export const skillGroups: SkillGroup[] = [
  {
    label: 'Product',
    items: [
      'Product Development',
      'Cross-functional Collaboration',
      'User-Centered Design',
      'Agile Delivery',
      'Feature Ownership',
    ],
  },
  {
    label: 'Engineering',
    items: [
      'TypeScript',
      'React',
      'Node.js',
      'NestJS',
      'REST APIs',
      'PostgreSQL',
      'Nx Monorepo',
    ],
  },
  {
    label: 'AI & Innovation',
    items: [
      'LLM Integration',
      'AI-assisted Development',
      'Developer Experience',
      'Engineering Productivity',
    ],
  },
];
