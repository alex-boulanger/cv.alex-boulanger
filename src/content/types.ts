export type YearMonth = `${number}-${number}`;

export interface Link {
  label: string;
  href: string;
  kind: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  links: Link[];
  summary: string;
  siteUrl: string;
  pdfFileName: string;
}

export interface Experience {
  company: string;
  role: string;
  start: YearMonth;
  end: YearMonth | null;
  location: string;
  highlights: string[];
}

export interface Education {
  school: string;
  degree: string;
  start: YearMonth;
  end: YearMonth | null;
  location: string;
  highlights: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Language {
  name: string;
  level: string;
  code: string;
}
