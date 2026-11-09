// The original portfolio is the source for published facts. Null means unknown,
// never a date, result, or link inferred by the interface. See CONTENT.md.
import { newestFirst } from "../utils/collectionOrder.js";
export const person = {
  name: "Kautsar Rifqi Aditya",
  preferredName: "Kautsar",
  username: "kaxurix",
  role: "Full-stack web developer & IT explorer",
  assistantRole: "Database Lab Assistant",
  assistantAt: "Informatika UNSOED",
  location: "Purwokerto, Indonesia",
  email: "kautsarrifqi1@gmail.com",
  github: "https://github.com/kaxurix",
  whatsapp: "https://wa.me/6282133454277",
  cv: "https://drive.google.com/file/d/1dLXqYTMm-l_fJqWkHl2Pr0HXmpoJUmU5/view?usp=drive_link",
  portrait: "/images/kautsar.webp",
  heroPortrait: "/images/kautsar-cutout.webp",
  education: [
    {
      title: "Universitas Jenderal Soedirman",
      description: "S1 Informatika",
      date: "2025 — present",
    },
    {
      title: "SMK Telkom Purwokerto",
      description: "Rekayasa Perangkat Lunak",
      date: "2021 — 2024",
    },
  ],
};

export const projects = [
  {
    title: "Idealibs",
    slug: "idealibs",
    description:
      "A digital asset platform for discovering and downloading visual references.",
    date: "2024-05",
    category: "Digital asset platform",
    coverImage: "/images/idealibs.webp",
    images: [],
    imageAlt:
      "Idealibs homepage with its creative ideas introduction and digital asset preview",
    tags: ["Next.js"],
    status: "From the archive",
    github: null,
    live: "https://idealibs.vercel.app/",
    coverStyle: "idealibs",
    coverTitle: ["ideas,", "filed."],
    content: {
      problem:
        "Finding and downloading visual references can be scattered across different sources.",
      approach:
        "Bring discovery and downloads into one digital asset platform, inspired by the utility of an asset library.",
      implementation:
        "Built with Next.js. Detailed implementation notes have not been added yet.",
      challenges: null,
      results: null,
      lessons: null,
    },
  },
  {
    title: "Im Home Kontraktor",
    slug: "imhomekontraktor",
    description:
      "A company website presenting construction services and project information.",
    date: "2025-02",
    category: "Company website",
    coverImage: "/images/imhome.webp",
    images: [],
    imageAlt:
      "Im Home Kontraktor website with its Design and Build introduction",
    tags: ["WordPress"],
    status: "From the archive",
    github: null,
    live: "https://imhomekontraktor.com",
    coverStyle: "imhome",
    coverTitle: ["A place", "to begin."],
    content: {
      problem:
        "A contractor needs an online introduction to its business and services.",
      approach:
        "A company profile website as a central place for prospective customers to learn about the business.",
      implementation:
        "Built with WordPress. Design and implementation notes have not been added yet.",
      challenges: null,
      results: null,
      lessons: null,
    },
  },
  {
    title: "Catalyst",
    slug: "catalyst",
    description:
      "A community website introducing Catalyst, its people, and its work.",
    date: "2026-07",
    category: "Community website",
    coverImage: "/images/catalyst.webp",
    images: [],
    imageAlt:
      "Catalyst community homepage with its purple introduction and community and project links",
    tags: ["Laravel", "Inertia.js", "Vue.js"],
    status: "Project showcase",
    github: null,
    live: "https://catalyst.or.id",
    content: {
      problem: null,
      approach: null,
      implementation: null,
      challenges: null,
      results: null,
      lessons: null,
    },
  },
  {
    title: "Ngudi Laras",
    slug: "ngudi-laras",
    description:
      "A website introducing Sanggar Tari Ngudi Laras, its dances, performances, and activities.",
    date: "2026-09",
    category: "Cultural website",
    coverImage: "/images/ngudilaras.webp",
    images: [],
    imageAlt:
      "Sanggar Tari Ngudi Laras homepage featuring a traditional dance performance",
    tags: ["Laravel", "Inertia.js", "Vue.js"],
    status: "Project showcase",
    github: null,
    live: "https://ngudilaras.id",
    content: {
      problem: null,
      approach: null,
      implementation: null,
      challenges: null,
      results: null,
      lessons: null,
    },
  },
  {
    title: "Soedirman Technophoria",
    slug: "soedirman-technophoria",
    description:
      "An event website for Soedirman Technophoria ’26, introducing its web development competition and national seminar.",
    date: "2026-09",
    category: "Event website",
    coverImage: "/images/stech.webp",
    images: [],
    imageAlt:
      "Soedirman Technophoria 26 event homepage with blue and gold lettering and registration links",
    tags: ["Laravel", "Inertia.js", "Vue.js"],
    status: "Project showcase",
    github: null,
    live: "https://stech.ft.unsoed.ac.id",
    content: {
      problem: null,
      approach: null,
      implementation: null,
      challenges: null,
      results: null,
      lessons: null,
    },
  },
];

// Lab screenshots and repositories supplied by Kautsar. Only verified stacks
// are listed; unavailable dates and deployment URLs remain unknown.
export const experiments = [
  {
    title: "Fuel Tracker",
    slug: "tracking-bbm",
    description:
      "A fuel tracking application for recording fill-ups, monthly spending, and vehicle efficiency.",
    date: null,
    category: "Fuel tracking",
    coverStyle: "fuel",
    coverImage: "/images/fuel-tracker.webp",
    imageAlt:
      "My Bahlil fuel tracker showing monthly spending, fuel efficiency, odometer readings, and fill-up history",
    images: [],
    github: "https://github.com/kaxurix/My-Bahlil",
    live: null,
    tags: ["React", "Vite", "Tailwind CSS"],
    status: "Eksplorasi",
    content: { tried: null, worked: null, failed: null, learned: null },
  },
  {
    title: "POS Warung",
    slug: "point-of-sale",
    description:
      "A point-of-sale application for small shops, with product search, stock information, and cash or credit transactions.",
    date: null,
    category: "Point of sale",
    coverStyle: "pos",
    coverImage: "/images/pos-warung.webp",
    imageAlt:
      "POS Warung checkout with product search, available stock, a shopping cart, and cash or credit payment options",
    images: [],
    github: "https://github.com/kaxurix/warung-pos",
    live: null,
    tags: [],
    status: "Eksplorasi",
    content: { tried: null, worked: null, failed: null, learned: null },
  },
  {
    title: "Riu Logistik",
    slug: "riu-logistik",
    description:
      "A logistics website with shipment tracking and a delivery timeline supported by photographs.",
    date: null,
    category: "Shipment tracking",
    coverStyle: "logistics",
    coverImage: "/images/logistik-tracking.webp",
    imageAlt:
      "Riu Logistik homepage with a shipment tracking number field and a delivery truck photograph",
    images: [],
    github: "https://github.com/kaxurix/compro-logistik",
    live: null,
    tags: ["React", "Vite", "Tailwind CSS", "Supabase"],
    status: "Eksplorasi",
    content: { tried: null, worked: null, failed: null, learned: null },
  },
];

export const activities = [
  {
    title: "GitHub at Catalyst",
    slug: "catalyst-github-for-maba",
    description:
      "A Catalyst weekly meeting introducing GitHub to new students at Universitas Jenderal Soedirman.",
    date: null,
    category: "Community / Catalyst UNSOED",
    coverImage: "/images/catalyst-github-for-maba.webp",
    imageAlt:
      "Group photograph of participants at the Catalyst GitHub weekly meet for new students",
    tags: ["Community", "GitHub", "Learning"],
    status: "From the archive",
    live: null,
    content: [
      {
        title: "Introduction to GitHub",
        text: "A community learning session introducing GitHub to new students through Catalyst at Universitas Jenderal Soedirman.",
      },
      {
        title: "Session documentation",
        text: "A group photograph with participants from the weekly meeting.",
      },
    ],
  },
  {
    title: "Ruijie Switch Hands-On",
    slug: "ruijie-switch-hands-on",
    kind: "certificate",
    description:
      "Course completion for Partner PoP Hands On Switch Product, issued by Ruijie Network Indonesia.",
    date: "2026-08-05",
    category: "Certificate",
    coverImage: "/images/ruijie-switch-hands-on.webp",
    imageAlt:
      "Ruijie course completion certificate for Kautsar Rifqi Aditya, Partner PoP Hands On Switch Product, dated 5 August 2026",
    tags: ["Networking", "Switching"],
    status: "Course completion",
    issuer: "Ruijie Network Indonesia",
    credentialId: null,
    live: "/sertif%20ruijie%20kautsar.jpeg",
    content: [
      {
        title: "Learning through hands-on practice.",
        text: "A course completion certificate for Partner PoP Hands On Switch Product, awarded by Ruijie Network Indonesia on 5 August 2026.",
      },
    ],
  },
  {
    title: "BNSP — Software Development",
    slug: "bnsp-software-development",
    kind: "certificate",
    description:
      "A software development competency certificate with the KKNI Level II qualification in Software Engineering.",
    date: "2024-06-28",
    category: "Certificate",
    coverImage: "/images/bnsp-software-dev.webp",
    imageAlt:
      "BNSP software development competency certificate for Kautsar Rifqi Aditya, KKNI Level II in Software Engineering, issued 28 June 2024",
    tags: ["Software Development", "Software Engineering"],
    status: "Certificate of competence",
    issuer: "BNSP / LSP SMK Telkom Sandhy Putra Purwokerto",
    credentialId: "6201 2512 2 00092 2024",
    live: "/bnsp%20kautsar%20software%20dev.pdf",
    content: [
      {
        title: "A foundation in software engineering.",
        text: "Certified competent in Pengembangan Perangkat Lunak, with the qualification KKNI Level II Kompetensi Keahlian Rekayasa Perangkat Lunak. Issued in Purwokerto on 28 June 2024 by LSP SMK Telkom Sandhy Putra Purwokerto on behalf of BNSP.",
      },
    ],
  },
  {
    title: "BNSP — Telecommunications",
    slug: "bnsp-telecommunications",
    kind: "certificate",
    description:
      "A telecommunications competency certificate for the Installation and Activation Technician qualification.",
    date: "2024-04-25",
    category: "Certificate",
    coverImage: "/images/bnsp-telekomunikasi.webp",
    imageAlt:
      "BNSP telecommunications competency certificate for Kautsar Rifqi Aditya, Teknisi Instalasi dan Aktivasi, issued 25 April 2024",
    tags: ["Telecommunications", "Networking"],
    status: "Certificate of competence",
    issuer: "BNSP / LSP Teknologi Digital",
    credentialId: "61100 7422 4 0088125 2024",
    live: "/bnsp%20kautsar%20Telekomunikasi.pdf",
    content: [
      {
        title: "Understanding the connections underneath.",
        text: "Certified competent in Telekomunikasi with the qualification Teknisi Instalasi & Aktivasi. Issued in Yogyakarta on 25 April 2024 by LSP Teknologi Digital on behalf of BNSP.",
      },
    ],
  },
  {
    title: "Oracle Database Foundations",
    slug: "oracle-database-foundations",
    kind: "certificate",
    description:
      "Final exam completion for the Oracle Academy Database Foundations course.",
    date: "2023-12-12",
    category: "Certificate",
    coverImage: "/images/oracle-database-foundations.webp",
    imageAlt:
      "Oracle Academy Database Foundations final exam completion award presented to Kautsar Rifqi Aditya on 12 December 2023",
    tags: ["Databases", "Oracle Academy"],
    status: "Final exam completion",
    issuer: "Oracle Academy",
    credentialId: null,
    live: "/oracle-kauri.pdf",
    content: [
      {
        title: "Starting with the foundations.",
        text: "An Award of Final Exam Completion from Oracle Academy for satisfactory completion of the Database Foundations course final exam, dated 12 December 2023.",
      },
    ],
  },
  {
    title: "ISC — Database Speaker",
    slug: "isc-database-speaker",
    kind: "certificate",
    description:
      "Speaker certificate for the Informatics Study Club session on databases for Computer Engineering students.",
    date: "2026-10-05",
    category: "Certificate",
    coverImage: "/images/isc-database-speaker.webp",
    imageAlt:
      "Certificate awarded to Kautsar Rifqi Aditya as a speaker at Informatics Study Club for Basis Data — Teknik Komputer, dated 5 October 2026",
    tags: ["Databases", "Teaching", "Informatics Study Club"],
    status: "Speaker certificate",
    issuer: "HMIF UNSOED",
    credentialId: "329/STF/PB/ISC/HMIF/X/2026",
    live: "/sertif%20isc%20kautsar.pdf",
    content: [
      {
        title: "Sharing database fundamentals.",
        text: "Recognized as a speaker (pemateri) for Informatics Study Club, covering the Basis Data course for Teknik Komputer on 5 October 2026. Issued by HMIF UNSOED.",
      },
    ],
  },
];

export const collections = {
  work: newestFirst(projects),
  lab: experiments,
  life: newestFirst(activities),
};
export const routes = [
  "/",
  "/work",
  "/lab",
  "/life",
  "/about",
  ...Object.entries(collections).flatMap(([type, items]) =>
    items.map((item) => `/${type}/${item.slug}`),
  ),
];

export function getPage(path) {
  const clean = path.replace(/\/+$/, "") || "/";
  const [type, slug, extra] = clean.split("/").slice(1);
  if (extra)
    return {
      type: "404",
      title: "Page not found",
      description: "This corner of the internet does not exist yet.",
    };
  if (slug) {
    const item = collections[type]?.find((entry) => entry.slug === slug);
    return item
      ? { type, item, title: item.title, description: item.description }
      : {
          type: "404",
          title: "Page not found",
          description: "This corner of the internet does not exist yet.",
        };
  }
  const meta = {
    "": [
      "home",
      person.name,
      "Kautsar Rifqi Aditya, full-stack web developer in Purwokerto. Selected websites, applications, and project explorations.",
    ],
    work: [
      "work",
      "Work",
      "Selected websites and web applications by Kautsar Rifqi Aditya, including Ngudi Laras, Soedirman Technophoria, and Catalyst.",
    ],
    lab: [
      "lab",
      "The Lab",
      "Explore Fuel Tracker, POS Warung, and Riu Logistik: practical web development experiments by Kautsar Rifqi Aditya.",
    ],
    life: [
      "life",
      "Life lately",
      "Community activities, professional certificates, and life outside the terminal with Kautsar Rifqi Aditya.",
    ],
    about: [
      "about",
      "About Kautsar",
      "Meet Kautsar Rifqi Aditya, a full-stack web developer and IT explorer in Purwokerto, Indonesia.",
    ],
  }[type];
  return meta
    ? { type: meta[0], title: meta[1], description: meta[2] }
    : {
        type: "404",
        title: "Page not found",
        description: "This corner of the internet does not exist yet.",
      };
}
