export const BASE = "/templates/multi-lawyer-1/preview";

export const FIRM = {
  name: "Morrison & Grant LLP",
  tagline: "Trusted Legal Counsel. Proven Results.",
  established: 1998,
  address: "425 Park Avenue, Suite 2800, New York, NY 10022",
  phone: "(212) 555-0190",
  email: "info@morrisongrantlaw.com",
  hours: "Mon–Fri: 8:00 AM – 7:00 PM",
  description:
    "Morrison & Grant LLP is a premier multi-practice law firm serving clients across New York and nationally. With over 26 years of experience, our attorneys bring deep expertise, strategic thinking, and unwavering commitment to every case we handle.",
};

export type Attorney = {
  slug: string;
  name: string;
  title: string;
  specialty: string;
  yearsExp: number;
  education: string[];
  admissions: string[];
  bio: string;
  shortBio: string;
  phone: string;
  email: string;
  caseTypes: string[];
};

export const ATTORNEYS: Attorney[] = [
  {
    slug: "james-morrison",
    name: "James R. Morrison",
    title: "Managing Partner",
    specialty: "Business & Corporate Law",
    yearsExp: 28,
    education: ["J.D., Harvard Law School", "B.A., Yale University"],
    admissions: [
      "New York State Bar",
      "U.S. District Court, SDNY",
      "U.S. Court of Appeals, 2nd Circuit",
    ],
    bio: "James R. Morrison is the founding Managing Partner of Morrison & Grant LLP. With nearly three decades of experience in corporate and business law, James has guided hundreds of businesses through complex transactions, mergers, acquisitions, and commercial disputes. His strategic counsel has helped clients ranging from emerging startups to Fortune 500 corporations navigate the most challenging legal landscapes. James is recognized by Chambers USA, Best Lawyers in America, and The Legal 500 as one of New York's leading corporate attorneys.",
    shortBio:
      "Founding Managing Partner with 28 years in corporate law. Guided hundreds of businesses through complex transactions and disputes.",
    phone: "(212) 555-0191",
    email: "jmorrison@morrisongrantlaw.com",
    caseTypes: [
      "Corporate Mergers & Acquisitions",
      "Commercial Contracts",
      "Business Disputes",
      "Joint Ventures",
    ],
  },
  {
    slug: "eleanor-grant",
    name: "Eleanor T. Grant",
    title: "Senior Partner",
    specialty: "Family Law & Estate Planning",
    yearsExp: 24,
    education: [
      "J.D., Columbia Law School",
      "B.S., Georgetown University",
    ],
    admissions: [
      "New York State Bar",
      "New Jersey State Bar",
      "U.S. District Court, SDNY",
    ],
    bio: "Eleanor T. Grant leads the Family Law and Estate Planning practice at Morrison & Grant LLP. Over 24 years, she has provided compassionate yet strategic counsel to clients navigating divorce, custody disputes, adoption, and complex estate planning matters. Eleanor is known for her ability to handle sensitive family matters with both legal rigor and human understanding. She has been recognized by Super Lawyers as a Top 50 Women Attorneys in New York for five consecutive years.",
    shortBio:
      "Senior Partner with 24 years in family law. Known for compassionate yet strategic counsel in sensitive family matters.",
    phone: "(212) 555-0192",
    email: "egrant@morrisongrantlaw.com",
    caseTypes: [
      "Divorce & Separation",
      "Child Custody",
      "Estate Planning",
      "Adoption",
    ],
  },
  {
    slug: "rafael-montoya",
    name: "Rafael A. Montoya",
    title: "Partner",
    specialty: "Criminal Defense",
    yearsExp: 18,
    education: [
      "J.D., NYU School of Law",
      "B.A., Columbia University",
    ],
    admissions: [
      "New York State Bar",
      "U.S. District Court, SDNY",
      "U.S. District Court, EDNY",
    ],
    bio: "Rafael A. Montoya is a seasoned criminal defense attorney with 18 years of experience defending clients against federal and state criminal charges. A former Assistant District Attorney, Rafael brings an insider's perspective to every defense strategy. He has successfully defended clients in cases ranging from white-collar crime to serious felony charges. His trial record and pre-trial motion practice are widely respected in the New York criminal defense bar.",
    shortBio:
      "Partner with 18 years in criminal defense. Former ADA bringing an insider's perspective to every defense strategy.",
    phone: "(212) 555-0193",
    email: "rmontoya@morrisongrantlaw.com",
    caseTypes: [
      "Federal Criminal Defense",
      "White-Collar Crime",
      "DUI/DWI Defense",
      "Appeals",
    ],
  },
  {
    slug: "sarah-chen",
    name: "Sarah L. Chen",
    title: "Partner",
    specialty: "Real Estate Law",
    yearsExp: 16,
    education: [
      "J.D., Fordham University School of Law",
      "B.B.A., Baruch College",
    ],
    admissions: ["New York State Bar", "Connecticut State Bar"],
    bio: "Sarah L. Chen leads the Real Estate practice at Morrison & Grant LLP. With 16 years of focused experience in real estate transactions, Sarah has represented buyers, sellers, developers, and lenders in billions of dollars of real estate transactions across New York and Connecticut. Her expertise spans commercial acquisitions, residential closings, development projects, and complex landlord-tenant disputes.",
    shortBio:
      "Partner with 16 years in real estate law. Represented clients in billions of dollars of real estate transactions across NY and CT.",
    phone: "(212) 555-0194",
    email: "schen@morrisongrantlaw.com",
    caseTypes: [
      "Commercial Real Estate",
      "Residential Closings",
      "Real Estate Litigation",
      "Landlord-Tenant",
    ],
  },
  {
    slug: "marcus-williams",
    name: "Marcus D. Williams",
    title: "Partner",
    specialty: "Personal Injury",
    yearsExp: 20,
    education: [
      "J.D., Brooklyn Law School",
      "B.A., Syracuse University",
    ],
    admissions: [
      "New York State Bar",
      "U.S. District Court, SDNY",
      "U.S. District Court, EDNY",
    ],
    bio: "Marcus D. Williams has dedicated his 20-year career to fighting for personal injury victims. His relentless advocacy and meticulous case preparation have resulted in millions of dollars in verdicts and settlements for clients injured in accidents, medical malpractice, and workplace incidents. Marcus is a member of the American Association for Justice and the New York State Trial Lawyers Association.",
    shortBio:
      "Partner with 20 years fighting for personal injury victims. Has secured millions in verdicts and settlements.",
    phone: "(212) 555-0195",
    email: "mwilliams@morrisongrantlaw.com",
    caseTypes: [
      "Auto Accidents",
      "Medical Malpractice",
      "Workplace Injuries",
      "Slip & Fall",
    ],
  },
  {
    slug: "priya-sharma",
    name: "Priya K. Sharma",
    title: "Associate",
    specialty: "Immigration Law",
    yearsExp: 8,
    education: [
      "J.D., Cardozo School of Law",
      "B.A., New York University",
    ],
    admissions: [
      "New York State Bar",
      "U.S. Court of Appeals, 2nd Circuit",
    ],
    bio: "Priya K. Sharma focuses her practice on U.S. immigration law, helping individuals, families, and businesses navigate complex immigration processes. In 8 years of practice, Priya has helped hundreds of clients secure visas, green cards, and citizenship, and has represented clients in removal defense proceedings before immigration courts and the Board of Immigration Appeals.",
    shortBio:
      "Associate with 8 years in immigration law. Helped hundreds of clients with visas, green cards, and citizenship.",
    phone: "(212) 555-0196",
    email: "psharma@morrisongrantlaw.com",
    caseTypes: [
      "Work Visas",
      "Family Immigration",
      "Removal Defense",
      "Citizenship Applications",
    ],
  },
];

export type PracticeArea = {
  id: string;
  name: string;
  description: string;
  details: string;
  keyServices: string[];
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "business-law",
    name: "Business Law",
    description:
      "Comprehensive legal support for businesses at every stage of growth.",
    details:
      "Our Business Law practice provides full-cycle legal support to companies from startup formation through complex M&A transactions. We advise on corporate governance, commercial contracts, partnerships, and business disputes with a strategic, business-minded approach.",
    keyServices: [
      "Entity Formation & Structuring",
      "Mergers & Acquisitions",
      "Commercial Contracts",
      "Corporate Governance",
      "Business Disputes & Litigation",
      "Joint Ventures & Partnerships",
    ],
  },
  {
    id: "family-law",
    name: "Family Law",
    description:
      "Compassionate counsel through life's most sensitive legal matters.",
    details:
      "Family legal matters require both legal expertise and human sensitivity. Our Family Law attorneys guide clients through divorce, custody, adoption, and estate planning with care, discretion, and strategic strength.",
    keyServices: [
      "Divorce & Separation",
      "Child Custody & Support",
      "Spousal Support / Alimony",
      "Adoption",
      "Prenuptial Agreements",
      "Domestic Violence Protection Orders",
    ],
  },
  {
    id: "real-estate-law",
    name: "Real Estate Law",
    description:
      "Expert guidance for residential and commercial property matters.",
    details:
      "Our Real Estate practice represents buyers, sellers, developers, landlords, and tenants in all aspects of real estate transactions and disputes. From closings to complex development deals, we protect your property interests.",
    keyServices: [
      "Commercial Transactions",
      "Residential Closings",
      "Real Estate Development",
      "Landlord-Tenant Disputes",
      "Title Insurance",
      "Zoning & Land Use",
    ],
  },
  {
    id: "immigration-law",
    name: "Immigration Law",
    description:
      "Navigating U.S. immigration with precision and personal care.",
    details:
      "We assist individuals, families, and businesses with all aspects of U.S. immigration law. From employment-based visas and family petitions to removal defense, we guide clients through a complex system with expertise and compassion.",
    keyServices: [
      "Employment Visas (H-1B, O-1, L-1)",
      "Family-Based Immigration",
      "Green Card Applications",
      "Naturalization & Citizenship",
      "Removal Defense",
      "DACA & Temporary Status",
    ],
  },
  {
    id: "criminal-defense",
    name: "Criminal Defense",
    description:
      "Aggressive, experienced defense for state and federal criminal charges.",
    details:
      "Being charged with a crime is one of the most serious situations a person can face. Our Criminal Defense team provides aggressive, strategic representation at every stage of the criminal process — from investigation through trial and appeal.",
    keyServices: [
      "Federal Criminal Defense",
      "State Criminal Charges",
      "White-Collar Crime",
      "DUI / DWI Defense",
      "Drug Offense Defense",
      "Post-Conviction Appeals",
    ],
  },
  {
    id: "personal-injury",
    name: "Personal Injury",
    description:
      "Fighting for maximum compensation for accident and injury victims.",
    details:
      "When you've been injured through someone else's negligence, you deserve a team that will fight tirelessly for the compensation you're owed. Our Personal Injury attorneys have a proven track record of successful verdicts and settlements.",
    keyServices: [
      "Auto & Truck Accidents",
      "Medical Malpractice",
      "Workplace Injuries",
      "Slip & Fall Accidents",
      "Product Liability",
      "Wrongful Death",
    ],
  },
  {
    id: "employment-law",
    name: "Employment Law",
    description: "Protecting employee and employer rights in the workplace.",
    details:
      "Our Employment Law practice represents both employees and employers in all workplace legal matters. We handle discrimination claims, wrongful termination, wage disputes, and help businesses build compliant HR frameworks.",
    keyServices: [
      "Discrimination & Harassment",
      "Wrongful Termination",
      "Wage & Hour Disputes",
      "Non-Compete Agreements",
      "Employment Contracts",
      "HR Policy Compliance",
    ],
  },
  {
    id: "estate-planning",
    name: "Estate Planning",
    description:
      "Securing your legacy and protecting your family's future.",
    details:
      "Proper estate planning is essential for protecting your assets and ensuring your wishes are honored. Our Estate Planning attorneys create customized plans that minimize tax exposure, avoid probate complications, and provide for your loved ones.",
    keyServices: [
      "Wills & Trusts",
      "Powers of Attorney",
      "Healthcare Directives",
      "Estate Administration & Probate",
      "Asset Protection Planning",
      "Special Needs Trusts",
    ],
  },
];

export type CaseResult = {
  id: string;
  type: string;
  verdict: string;
  description: string;
};

export const CASE_RESULTS: CaseResult[] = [
  {
    id: "cr-1",
    type: "Personal Injury — Auto Accident",
    verdict: "$4.2M Settlement",
    description:
      "Client was seriously injured in a multi-vehicle highway accident caused by a negligent commercial truck driver. Our team secured a $4.2 million settlement covering medical expenses, lost wages, and pain and suffering.",
  },
  {
    id: "cr-2",
    type: "Business Dispute — Breach of Contract",
    verdict: "$8.7M Verdict",
    description:
      "Represented a mid-size technology company in a complex commercial dispute involving breach of a multi-year service contract. After a three-week trial, the jury returned a verdict of $8.7 million in favor of our client.",
  },
  {
    id: "cr-3",
    type: "Criminal Defense — Federal Charges",
    verdict: "All Charges Dismissed",
    description:
      "Client faced serious federal financial fraud charges carrying potential prison time of up to 20 years. Through rigorous pre-trial motions and a strategic defense, all charges were dismissed prior to trial.",
  },
  {
    id: "cr-4",
    type: "Employment Law — Wrongful Termination",
    verdict: "$1.9M Settlement",
    description:
      "Represented a senior executive wrongfully terminated after reporting internal compliance violations. Reached a $1.9 million settlement including back pay, lost benefits, and damages for reputational harm.",
  },
  {
    id: "cr-5",
    type: "Real Estate — Commercial Dispute",
    verdict: "$3.1M Award",
    description:
      "Represented a commercial property developer in a dispute with a contractor over construction defects and project delays. An arbitration panel awarded our client $3.1 million in damages and remediation costs.",
  },
  {
    id: "cr-6",
    type: "Medical Malpractice",
    verdict: "$6.5M Settlement",
    description:
      "Represented a family in a surgical malpractice case resulting in permanent disability. After extensive expert testimony and discovery, secured a $6.5 million settlement prior to trial.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-llc-formation",
    title: "Understanding LLC Formation: A Guide for New Business Owners",
    category: "Business Law",
    date: "May 15, 2026",
    readTime: "6 min read",
    excerpt:
      "Forming an LLC is one of the most important steps a new business owner can take. This guide covers the key benefits, requirements, and considerations for LLC formation in New York.",
  },
  {
    slug: "child-custody-basics",
    title: "Child Custody in New York: What Parents Need to Know",
    category: "Family Law",
    date: "May 8, 2026",
    readTime: "8 min read",
    excerpt:
      "Child custody disputes are among the most emotionally difficult legal proceedings. Understanding how New York courts determine custody arrangements can help parents navigate this process.",
  },
  {
    slug: "h1b-visa-guide-2026",
    title: "H-1B Visa 2026: Key Changes and What Employers Should Know",
    category: "Immigration Law",
    date: "April 28, 2026",
    readTime: "7 min read",
    excerpt:
      "The H-1B visa process has seen significant regulatory changes. Here's what employers and prospective employees need to understand for the 2026 application cycle.",
  },
  {
    slug: "real-estate-due-diligence",
    title: "Real Estate Due Diligence: 10 Things Every Buyer Should Check",
    category: "Real Estate Law",
    date: "April 18, 2026",
    readTime: "5 min read",
    excerpt:
      "Skipping due diligence in a real estate transaction can be a costly mistake. Here are ten critical areas every buyer should investigate before closing.",
  },
  {
    slug: "personal-injury-timeline",
    title: "The Personal Injury Lawsuit Timeline: What to Expect Step by Step",
    category: "Personal Injury",
    date: "April 5, 2026",
    readTime: "9 min read",
    excerpt:
      "Many personal injury claimants are uncertain about how the legal process works from initial consultation through settlement or verdict. This guide walks through each stage.",
  },
  {
    slug: "estate-planning-mistakes",
    title: "5 Estate Planning Mistakes That Can Devastate Your Family",
    category: "Estate Planning",
    date: "March 22, 2026",
    readTime: "6 min read",
    excerpt:
      "Many people delay or rush through estate planning, leaving their families vulnerable. This article outlines the five most common — and costly — mistakes to avoid.",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Michael T.",
    case: "Business Law",
    quote:
      "Morrison & Grant guided our company through a complex acquisition that three other firms told us would take years. They closed it in four months. Exceptional team.",
  },
  {
    id: 2,
    name: "Sandra K.",
    case: "Family Law",
    quote:
      "Going through a divorce was the hardest thing I've ever faced. Eleanor Grant's team handled everything with genuine care while protecting my children's best interests.",
  },
  {
    id: 3,
    name: "David R.",
    case: "Criminal Defense",
    quote:
      "When I was facing federal charges I thought my life was over. Rafael Montoya's strategy was masterful. The charges were dropped. He literally saved my future.",
  },
  {
    id: 4,
    name: "Jennifer L.",
    case: "Personal Injury",
    quote:
      "After my accident, I didn't think I could afford a serious law firm. Marcus and his team worked tirelessly and won far more than I expected. Truly outstanding advocates.",
  },
];

export const STATS = [
  { value: "26+", label: "Years of Practice" },
  { value: "4,500+", label: "Cases Handled" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "$200M+", label: "Recovered for Clients" },
];

export const VALUES = [
  {
    title: "Integrity",
    desc: "We hold ourselves to the highest ethical standards. Our clients trust us with their most sensitive matters — that trust is never taken lightly.",
  },
  {
    title: "Excellence",
    desc: "We pursue the best possible outcome in every matter we handle. Mediocrity is not an option when our clients' futures are on the line.",
  },
  {
    title: "Accessibility",
    desc: "Premium legal counsel should not be a mystery. We communicate clearly, keep clients informed, and make ourselves available when they need us.",
  },
  {
    title: "Results",
    desc: "We are measured by outcomes. Our track record of successful verdicts, settlements, and resolutions speaks for itself.",
  },
];
