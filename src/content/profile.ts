import type { Profile } from "./types";

export const profile: Profile = {
  name: "Alex Boulanger",
  title: "Full-Stack Engineer · Product Engineer",
  location: "Brussels (Relocating)",
  email: "alexbakerdeveloper@gmail.com",
  phone: "+33 6 65 04 79 84",
  links: [
    {
      kind: "LinkedIn",
      label: "linkedin.com/in/alex-boulanger",
      href: "https://www.linkedin.com/in/alex-boulanger",
    },
    {
      kind: "GitHub",
      label: "github.com/alex-boulanger",
      href: "https://github.com/alex-boulanger",
    },
  ],

  summary:
    "Product Engineer with 6+ years of experience building digital products from concept to production. Experienced across frontend, backend and product delivery, working closely with Product Managers, Designers and Engineers to transform business needs into scalable software. Passionate about developer experience, AI-assisted workflows and building products that create measurable value for users.",

  primarySiteUrl: "https://alex-boulanger.dev",
  siteUrl: "https://cv.alex-boulanger.dev",
  pdfFileName: "alex-boulanger-resume.pdf",
};
