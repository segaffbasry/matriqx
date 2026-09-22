// All copy is verbatim from https://www.matriqx.com/ (homepage). Do not rewrite.

const SITE = "https://www.matriqx.com";

export const site = {
  name: "MatriQx",
  url: SITE,
  email: "info@matriqx.com",
  address:
    "St John's Innovation Centre, Cowley Road, Cambridge, United Kingdom, CB4 0WS",
  mapUrl: "https://maps.app.goo.gl/XCFBVKkb27ewmsU28",
  linkedin: "https://www.linkedin.com/company/matriqxltd",
  youtube: "https://youtube.com/@matriqxltd",
  contact: `${SITE}/contact/`,
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  { label: "Professional Services", href: `${SITE}/services/` },
  { label: "Partners", href: `${SITE}/partnerships/` },
  {
    label: "Solutions",
    href: `${SITE}/products/`,
    children: [
      { label: "Solutions Overview", href: `${SITE}/products/` },
      { label: "Materials Science", href: `${SITE}/material-science/` },
      { label: "Discovery Science", href: `${SITE}/discovery-science/` },
      { label: "Data Engineering", href: `${SITE}/data-foundation/` },
    ],
  },
  {
    label: "About",
    href: `${SITE}/about/`,
    children: [
      { label: "About MatriQx", href: `${SITE}/about/` },
      { label: "Our Team", href: `${SITE}/our-team/` },
      { label: "News & Insights", href: `${SITE}/community/` },
    ],
  },
];

export const hero = {
  eyebrow: "AI-Native Innovation for the Future of Science.",
  // Split so the second half can render in the muted tone.
  titleLead: "Accelerating Drug Discovery & Life Science Innovation—",
  titleTail: "Powered by AI, Driven by People.",
  // [text, bold]
  body: [
    ["We combine the best of ", false],
    ["AI", true],
    [" and ", false],
    ["human insight", true],
    [" to accelerate scientific discovery. We help teams reduce friction, make better ", false],
    ["decisions", true],
    [", and unlock their ", false],
    ["full", true],
    [" innovative potential.", false],
  ] as [string, boolean][],
  primary: { label: "See How It Works", href: `${SITE}/products/` },
  secondary: { label: "Talk to Our Experts", href: `${SITE}/contact/` },
  video: "fBFR5HlxWds",
};

export const services = [
  {
    title: ["Digital Transformation"],
    text: "Achieve lasting impact with AI-native infrastructure, automation, and expert change support that scale discoveries from pilot to enterprise.",
    cta: "Our Services",
    href: `${SITE}/services/`,
    icon: "/images/TECW0004.png",
  },
  {
    title: ["Discovery", "Science"],
    text: "Accelerate time-to-insight by automating discovery workflows, freeing scientists to focus on breakthroughs and delivering faster, validated results.",
    cta: "Explore Solutions",
    href: `${SITE}/discovery-science/`,
    icon: "/images/TECW0002.png",
  },
  {
    title: ["Materials", "Science"],
    text: "Reduce development cycles and unlock new materials faster by aligning teams, unifying data, and ensuring measurable, repeatable innovation.",
    cta: "Unlock Insights",
    href: `${SITE}/material-science/`,
    icon: "/images/TECW0014.png",
  },
  {
    title: ["Federated Data Engineering"],
    text: "Enable cross-organization collaboration without sacrificing security, powering shared discoveries, expanding datasets, and driving collective progress in science.",
    cta: "See How It Works",
    href: `${SITE}/data-foundation/`,
    icon: "/images/TECW0116.png",
  },
];

export const about = {
  eyebrow: "The AI-Native Digital Intelligence Company",
  titleLead: "MatriQx is at the forefront of ",
  titleAccent: "AI-driven science",
  titleTail: ", turning complex data into meaningful insights",
  body1: [
    ["We specialize in ", false],
    ["advancing science", true],
    [
      " by combining the best of people, AI-driven solutions, automation, and a comprehensive digital business transformation framework.",
      false,
    ],
  ] as [string, boolean][],
  body2:
    "We empower biotech and life-science organizations to fully harness their data, automate discovery, and accelerate breakthroughs: transforming the way research becomes reality.",
  cta: { label: "Meet the MatriQx Team", href: `${SITE}/our-team/` },
};

export const statement =
  "Unlocking the full value of scientific data with AI, automation, and federated intelligence.";

export const solutions = {
  eyebrow: "Accelerate discovery. Scale innovation. Multiply impact.",
  title: "Our Solutions",
  items: [
    {
      title: ["Discovery", "Science"],
      text: "AI-driven platforms for molecular design, hypothesis generation, and rapid scientific exploration.",
      href: `${SITE}/discovery-science/`,
      image: "/images/precision-scaled.jpg",
    },
    {
      title: ["Materials", "Science"],
      text: "Digital twin technology, predictive modeling, and workflow automation for next-gen materials R&D.",
      href: `${SITE}/material-science/`,
      image: "/images/materials1.png",
    },
    {
      title: ["Data", "Engineering"],
      text: "Centralized data platforms, automation, and FAIR data practices for secure, collaborative research.",
      href: `${SITE}/data-foundation/`,
      image: "/images/data-engineering2.jpg",
    },
  ],
  moreLead: "Learn more about",
  more: { label: "MatriQx services", href: `${SITE}/services/` },
};

export const scaling = {
  eyebrow:
    "Scientific innovation under pressure: rising data, fragmented systems, and relentless expectations",
  title: "Scaling Science with Intelligence and Automation",
  slides: [
    {
      sub: "AI-Native Machine Learning",
      title: ["The MatriQx", "Core Platform"],
      text: "Transforming your biotech through AI-driven intelligence and digital transformation.",
      href: `${SITE}/products/`,
      image: "/images/data2-1.png",
    },
    {
      sub: "Data Structure",
      title: ["Federated", "Learning Models"],
      text: "Harnessing AI and big data to revolutionize biotech and pharma workflows.",
      href: `${SITE}/data-foundation/`,
      image: "/images/materials2.png",
    },
    {
      sub: "The Next Evolution in AI-Driven Biotech",
      title: ["The Fifth", "Paradigm of Technology"],
      text: "We harness this paradigm shift to redefine biotech, healthcare, and pharmaceutical innovation through cutting-edge AI, machine learning, and federated intelligence.",
      href: `${SITE}/products/`,
      image: "/images/discovery-science.png",
    },
    {
      sub: "Transforming Research Outcomes",
      title: ["Digital Intelligence", "for Life Science"],
      text: "Set clear expectations, align your team, and consistently achieve measurable impact in digital life sciences.",
      href: `${SITE}/services/`,
      image: "/images/materials-science.png",
    },
  ],
};

export const insights = {
  eyebrow:
    "Where AI, automation, and federated intelligence converge to transform life sciences.",
  title: "Innovation Powered by Intelligence",
  cta: "Read More",
  posts: [
    {
      title: "Digital Twins in the Lab: Beyond Buzzwords",
      href: `${SITE}/digital-twins-in-the-lab-beyond-buzzwords/`,
      image: "/images/precision.png",
    },
    {
      title: "From Hypothesis to Insight: How AI is Rewiring the Scientific Method",
      href: `${SITE}/from-hypothesis-to-insight-how-ai-is-rewiring-the-scientific-method/`,
      image: "/images/performance.png",
    },
    {
      title:
        "Rethinking the Scientific Method: AI, Hypotheses, and the New Cycle of Discovery",
      href: `${SITE}/rethinking-the-scientific-method-ai-hypotheses-and-the-new-cycle-of-discovery/`,
      image: "/images/camb2-2048x1357.jpeg",
    },
    {
      title:
        "Digital Transformation in Healthcare: How AI is Revolutionizing Patient Outcomes",
      href: `${SITE}/digital-transformation-in-healthcare-how-ai-is-revolutionizing-patient-outcomes/`,
      image: "/images/integrity.png",
    },
  ],
};

export const cta = {
  title: "Start a Conversation Today.",
  button: { label: "Contact Us", href: `${SITE}/contact/` },
  image: "/images/mail-call-to-action.png",
};

export const footer = {
  blurb:
    "At MatriQx, we advance science with technology and human insight: accelerating discovery through intelligent analytics, federated collaboration, and automation.",
  learnMore: { label: "Learn More", href: `${SITE}/about/` },
  columns: [
    {
      title: "Company",
      links: [
        { label: "Home", href: `${SITE}/` },
        { label: "Professional Services", href: `${SITE}/services/` },
        { label: "Solutions", href: `${SITE}/products/` },
        { label: "About Us", href: `${SITE}/about/` },
        { label: "Investors", href: `${SITE}/contact/` },
        { label: "Community", href: `${SITE}/community/` },
      ],
    },
    {
      title: "Policies",
      links: [
        { label: "Accessibility Statement", href: `${SITE}/accessibility-statement/` },
        { label: "Privacy Policy", href: `${SITE}/privacy-policy-2/` },
        { label: "Terms & Conditions", href: `${SITE}/term-conditions/` },
        { label: "Cookie Policy", href: `${SITE}/cookie-policy/` },
        { label: "AI Responsibility", href: `${SITE}/ai-responsibility/` },
        { label: "ESG & Sustainability", href: `${SITE}/esg-sustainability/` },
      ],
    },
  ],
  contactTitle: "Get in touch",
  copyright: "Copyright 2026 MatriQx All Rights Reserved",
};
