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
      "Simplifying Talentir's complex blockchain technology into an intuitive user experience. Through streamlined layouts and accessible language, the redesign transformed intricate payout systems into a trustworthy interface — serving diverse users from independent creators to larger agencies with a professional yet welcoming approach to creator economy tools.",
    thumbnail: "/images/projects/talentir.jpg",
    images: [
      "/images/projects/talentir-01.png",
      "/images/projects/talentir-02.png",
      "/images/projects/talentir-03.png",
      "/images/projects/talentir-04.png",
    ],
    stats: [
      { label: "Client", value: "Talentir" },
      { label: "Scope", value: "UX/UI Design, Web Redesign" },
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
      "A flexible booking interface system — a digital chameleon using design variables to adapt to different hotel brands. Balancing rapid conversion with deep brand storytelling, the interface is so intuitive it disappears, while each booking experience becomes an extension of the hotel's identity.",
    thumbnail: "/images/projects/hotelpartner-booking.jpeg",
    images: [
      "/images/projects/hotelpartner-booking-01.png",
      "/images/projects/hotelpartner-booking-02.png",
      "/images/projects/hotelpartner-booking-03.png",
      "/images/projects/hotelpartner-booking-04.png",
    ],
    stats: [
      { label: "Client", value: "HotelPartner" },
      { label: "Scope", value: "UX/UI Design, Digital Product" },
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
      "Translating the textures of the Swiss mountains into a digital space. The visual centerpiece is a custom-crafted monogram where the curves of the letter B transform into a silhouette of Janet's favorite mountain and its glacier. A color scheme of moss green and autumn yellow reflects the seasonal changes of larch trees, deployed through Webflow with custom CMS capabilities.",
    thumbnail: "/images/projects/janet-brantschen.jpeg",
    images: [
      "/images/projects/janet-brantschen-01.png",
      "/images/projects/janet-brantschen-02.png",
      "/images/projects/janet-brantschen-03.png",
      "/images/projects/janet-brantschen-04.png",
      "/images/projects/janet-brantschen-05.png",
    ],
    stats: [
      { label: "Client", value: "Janet Brantschen" },
      { label: "Scope", value: "Branding, Iconography & Webflow" },
      { label: "Year", value: "2025" },
      { label: "Deliverables", value: "Custom Monogram, Color Palette, Webflow Development, CMS" },
    ],
  },
  {
    title: "VVO Event Logo & Print",
    slug: "vvo-event-logo-print",
    category: "Branding & Print",
    year: "2024",
    description:
      "For the VVO's 125th anniversary, a logo that serves as a handshake between the past and the future — keeping the classic, proud feeling of a long history while fitting perfectly with their new, minimal brand style. The design came to life across the entire event at the Palais Niederösterreich, from high-end paper invitations and event programs to large banners.",
    thumbnail: "/images/projects/vvo-125.jpeg",
    images: [
      "/images/projects/vvo-125-01.jpg",
      "/images/projects/vvo-125-02.jpg",
      "/images/projects/vvo-125-03.jpg",
    ],
    stats: [
      { label: "Client", value: "VVO Austria" },
      { label: "Scope", value: "Logo & Print Design" },
      { label: "Year", value: "2024" },
      { label: "Deliverables", value: "Anniversary Logo, Invitations, Programs, Banners, Signage" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
