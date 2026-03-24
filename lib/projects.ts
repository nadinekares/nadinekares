// ═══════════════════════════════════════════════════════════════
// Project Data — Single Source of Truth
// ═══════════════════════════════════════════════════════════════

export interface Project {
  title: string;
  slug: string;
  category: string;
  year: string;
  description: string;
  thumbnail: string;
  images: string[];
  stats: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    title: "Talentir",
    slug: "talentir",
    category: "UX/UI Design",
    year: "2025",
    description:
      "A comprehensive UX/UI design for a talent management platform. From user research to final interface, every interaction was designed to streamline workflows and empower creators — delivering a seamless experience across web and mobile.",
    thumbnail: "/images/projects/talentir.jpg",
    images: [
      "/images/projects/talentir-01.jpg",
      "/images/projects/talentir-02.jpg",
      "/images/projects/talentir-03.jpg",
      "/images/projects/talentir-04.jpg",
    ],
    stats: [
      { label: "Client", value: "Talentir" },
      { label: "Scope", value: "UX/UI Design" },
      { label: "Year", value: "2025" },
      { label: "Deliverables", value: "User Research, Wireframes, UI Design, Prototyping" },
    ],
  },
  {
    title: "Hotelpartner Booking Engine",
    slug: "hotelpartner-booking-engine",
    category: "Digital Product Design",
    year: "2024",
    description:
      "A redesigned booking engine for a leading hospitality technology provider. The product balances conversion optimization with intuitive usability — guiding guests through a frictionless reservation flow with clarity and confidence.",
    thumbnail: "/images/projects/hotelpartner-booking.jpeg",
    images: [
      "/images/projects/hotelpartner-booking-01.jpg",
      "/images/projects/hotelpartner-booking-02.jpg",
      "/images/projects/hotelpartner-booking-03.jpg",
      "/images/projects/hotelpartner-booking-04.jpg",
    ],
    stats: [
      { label: "Client", value: "Hotelpartner" },
      { label: "Scope", value: "Digital Product Design" },
      { label: "Year", value: "2024" },
      { label: "Deliverables", value: "UX Strategy, UI Design, Design System, Prototyping" },
    ],
  },
  {
    title: "Janet Brantschen",
    slug: "janet-brantschen",
    category: "Branding & Webflow",
    year: "2025",
    description:
      "A complete brand identity and Webflow website for a personal brand. The work bridges personal storytelling with polished design — expressing authenticity through considered typography, a warm color palette, and a responsive, hand-crafted website.",
    thumbnail: "/images/projects/janet-brantschen.jpeg",
    images: [
      "/images/projects/janet-brantschen-01.jpg",
      "/images/projects/janet-brantschen-02.jpg",
      "/images/projects/janet-brantschen-03.jpg",
      "/images/projects/janet-brantschen-04.jpg",
    ],
    stats: [
      { label: "Client", value: "Janet Brantschen" },
      { label: "Scope", value: "Branding & Webflow" },
      { label: "Year", value: "2025" },
      { label: "Deliverables", value: "Brand Identity, Webflow Development, Content Strategy" },
    ],
  },
  {
    title: "VVO Event Logo & Print",
    slug: "vvo-event-logo-print",
    category: "Branding & Print",
    year: "2024",
    description:
      "Event branding and print design for VVO's anniversary celebration. The visual identity captures the occasion's significance through bold graphic elements and refined print collateral — from logo to invitations, programs, and signage.",
    thumbnail: "/images/projects/vvo-125.jpeg",
    images: [
      "/images/projects/vvo-125-01.jpg",
      "/images/projects/vvo-125-02.jpg",
      "/images/projects/vvo-125-03.jpg",
      "/images/projects/vvo-125-04.jpg",
    ],
    stats: [
      { label: "Client", value: "VVO" },
      { label: "Scope", value: "Branding & Print" },
      { label: "Year", value: "2024" },
      { label: "Deliverables", value: "Event Logo, Print Collateral, Signage, Invitations" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
