/**
 * Shared shapes for every piece of résumé data.
 *
 * Everything the site and the PDF render comes from these types — there is no
 * second template. Add a field here first, then use it in the components.
 */

/** A month, `YYYY-MM`. Days are never relevant on a résumé. */
export type YearMonth = `${number}-${number}`;

export interface Link {
  /** What the reader sees, e.g. `alex-boulanger`. */
  label: string;
  /** Where it goes, e.g. `https://github.com/alex-boulanger`. */
  href: string;
  /** Short name used in the print stylesheet, e.g. `GitHub`. */
  kind: string;
}

export interface Profile {
  name: string;
  /** Headline under the name. Kept short — it is the first thing scanned. */
  title: string;
  /** Free text, e.g. `Brussels (relocating)`. */
  location: string;
  email: string;
  phone: string;
  links: Link[];
  /** One paragraph. Two at most. */
  summary: string;
  /** Canonical URL of the published CV. */
  siteUrl: string;
  /** Filename of the generated PDF, served from the site root. */
  pdfFileName: string;
}

export interface Experience {
  company: string;
  role: string;
  start: YearMonth;
  /** `null` means the role is current. */
  end: YearMonth | null;
  location: string;
  /** One line each, achievement first. Aim for four to seven. */
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
  /** e.g. `Product`, `Engineering`, `AI & Innovation`. */
  label: string;
  items: string[];
}

export interface Language {
  name: string;
  /** e.g. `Native`, `Professional`. */
  level: string;
  /** BCP 47 tag, used in the structured data. */
  code: string;
}
