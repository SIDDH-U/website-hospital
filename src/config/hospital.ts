export interface Doctor {
  id: string;
  slug: string;
  name: string;
  speciality: string;
  departmentId: string;
  qualifications: string;
  experience: string;
  shortBio: string;
  opdTimings: string;
  image: string;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: "cardiology" | "orthopedics" | "pediatrics" | "neurology" | "gynecology" | "general-medicine";
  conditionsTreat: string[];
  treatmentsFacilities: string[];
  features: string[];
  headDoctor: string;
}

export interface ApproachCard {
  id: string;
  title: string;
  description: string;
  theme: "white" | "mint" | "teal";
  href: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  author: string;
  readTime: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  icon: string;
  image: string;
}

export const CALLBACK_TEXT = "We'll call you shortly to confirm";
export const DEFAULT_SITE_URL = "https://website-hospital-nine.vercel.app";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
}

export function isProductionDomain(): boolean {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL) === "https://lifecarehospital-nanded.com";
}

export interface HospitalConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  fullDescription: string;
  callbackText: string;
  city: string;
  state: string;
  pincode: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    fullAddress: string;
    mapUrl: string;
  };
  contact: {
    display: string;
    tel: string;
    whatsapp: string;
    phone: string;
    phoneRaw: string;
    emergencyPhone: string;
    emergencyPhoneRaw: string;
    email: string;
  };
  hours: {
    regular: string;
    emergency: string;
    display: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  hero: {
    badgeRating: string;
    badgePatients: string;
    headingPrefix: string;
    headingRest: string;
    subtext: string;
    desktopSubtext: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  approach: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    cards: ApproachCard[];
  };
  about: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    paragraph: string;
    buttonText: string;
    yearsOfCare: string;
    ratingScore: string;
    ratingMax: string;
    ratingCount: string;
    medicalDirector: {
      name: string;
      role: string;
      image: string;
    };
    specialties: string[];
  };
  departments: Department[];
  doctors: Doctor[];
  blogArticles: BlogArticle[];
  services: ServiceItem[];
  ctaBanner: {
    title: string;
    subtext: string;
    buttonText: string;
  };
  footer: {
    description: string;
    quickLinksCol1: { name: string; href: string }[];
    quickLinksCol2: { name: string; href: string }[];
    legalLinks: { name: string; href: string }[];
    copyright: string;
  };
}

export const hospitalConfig: HospitalConfig = {
  name: "LifeCare Hospital",
  legalName: "LifeCare Multi-Speciality Hospital",
  tagline: "Healing Begins The Moment You Walk In",
  description: "Expert doctors, advanced treatment and compassionate care in Nanded, Maharashtra.",
  fullDescription: "At LifeCare Hospital, we combine clinical expertise with a human touch to deliver safe, effective and personalised care for every patient in Nanded and surrounding regions.",
  callbackText: CALLBACK_TEXT,
  city: "Nanded",
  state: "Maharashtra",
  pincode: "431601",
  location: {
    address: "123 Healthcare Road",
    city: "Nanded",
    state: "Maharashtra",
    pincode: "431601",
    fullAddress: "123 Healthcare Road, Nanded, Maharashtra 431601",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=LifeCare+Hospital+123+Healthcare+Road+Nanded+Maharashtra+431601",
  },
  contact: {
    display: "+91 80800 76322",
    tel: "+918080076322",
    whatsapp: "918080076322",
    phone: "+91 80800 76322",
    phoneRaw: "+918080076322",
    emergencyPhone: "+91 80800 76322",
    emergencyPhoneRaw: "+918080076322",
    email: "info@lifecarehospital.com",
  },
  hours: {
    regular: "Mon - Sat: 8 AM - 8 PM",
    emergency: "Emergency 24/7",
    display: "Mon - Sat: 8 AM - 8 PM · Emergency 24/7",
  },
  socials: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
  hero: {
    badgeRating: "4.9",
    badgePatients: "10K+ Happy Patients",
    headingPrefix: "Healing",
    headingRest: "Begins The Moment You Walk In",
    subtext: "Expert care. Modern treatment. A healthier tomorrow for you and your family.",
    desktopSubtext: "Expert doctors. Advanced treatment. Compassionate care for you and your loved ones.",
    ctaPrimary: "Book Appointment",
    ctaSecondary: "Call Us",
  },
  approach: {
    badge: "OUR APPROACH",
    titleStart: "Care that puts ",
    titleHighlight: "you first",
    description: "We combine clinical expertise, modern technology and a human touch to deliver safe, effective and personalized care for every patient.",
    cards: [
      {
        id: "expert-doctors",
        title: "Expert Doctors",
        description: "Highly qualified and experienced specialists dedicated to providing world-class medical care.",
        theme: "white",
        href: "/doctors",
      },
      {
        id: "patient-first",
        title: "Patient-First Care",
        description: "We listen, understand and create personalized treatment plans for better health outcomes.",
        theme: "mint",
        href: "/about#our-approach",
      },
      {
        id: "advanced-treatment",
        title: "Advanced Treatment",
        description: "Equipped with modern technology and latest medical advancements for accurate and effective care.",
        theme: "teal",
        href: "/services",
      },
    ],
  },
  about: {
    badge: "WHO WE ARE",
    titleStart: "Compassionate care for ",
    titleHighlight: "every family",
    paragraph: "At LifeCare Hospital, we combine clinical expertise with a human touch to deliver safe, effective and personalised care for every patient. With a dedicated team of experienced doctors and modern medical facilities in Nanded, we strive to make a positive difference in the lives of our patients and their families.",
    buttonText: "More About Us",
    yearsOfCare: "25+",
    ratingScore: "4.9",
    ratingMax: "5",
    ratingCount: "10,000+ reviews",
    medicalDirector: {
      name: "Dr. Rajesh Sharma",
      role: "Medical Director",
      image: "/images/dr-rajesh-sharma.webp",
    },
    specialties: ["Cardiology", "Pediatrics", "Orthopedics", "Neurology"],
  },
  departments: [
    {
      id: "cardiology",
      name: "Cardiology",
      slug: "cardiology",
      tagline: "Comprehensive Heart & Vascular Care",
      description: "Advanced cardiac care, non-invasive diagnostics, ECG, Echocardiography, angiography support, and round-the-clock emergency coronary care.",
      icon: "cardiology",
      conditionsTreat: [
        "Coronary Artery Disease (CAD)",
        "Hypertension & Heart Failure",
        "Arrhythmias & Palpitations",
        "Valvular Heart Conditions",
      ],
      treatmentsFacilities: [
        "24/7 Primary Angioplasty & Cath Lab",
        "Color Doppler 2D/3D Echocardiography",
        "Holter Monitoring & Stress ECG (TMT)",
        "Cardiac ICU & Post-Op Rehabilitation",
      ],
      features: [
        "24/7 Cardiac Emergency Unit",
        "State-of-the-Art Digital Cath Lab",
        "Non-Invasive Diagnostic Suite",
        "Heart Failure Specialty Clinic",
      ],
      headDoctor: "Dr. Rajesh Sharma, MD, DM (Cardiology)",
    },
    {
      id: "orthopedics",
      name: "Orthopedics",
      slug: "orthopedics",
      tagline: "Joint, Bone & Sports Trauma Care",
      description: "State-of-the-art joint replacement (knee & hip), complex trauma reconstruction, arthroscopy, and rehabilitative sports injury therapy.",
      icon: "orthopedics",
      conditionsTreat: [
        "Osteoarthritis & Rheumatoid Arthritis",
        "Complex Fractures & Trauma",
        "Spine Disc Disorders & Sciatica",
        "Sports Ligament Tears (ACL/PCL)",
      ],
      treatmentsFacilities: [
        "Computer-Navigated Joint Replacement",
        "Minimally Invasive Arthroscopic Surgery",
        "Dedicated Spine Surgery Unit",
        "Advanced Physiotherapy & Hydro-Gym",
      ],
      features: [
        "Total Knee & Hip Replacement",
        "Fracture & Trauma Surgery 24/7",
        "Keyhole Arthroscopic Repair",
        "Physiotherapy & Rehab Unit",
      ],
      headDoctor: "Dr. Amit Deshmukh, MS (Ortho)",
    },
    {
      id: "pediatrics",
      name: "Pediatrics",
      slug: "pediatrics",
      tagline: "Dedicated Newborn & Child Healthcare",
      description: "Comprehensive care for infants, children, and adolescents with modern NICU/PICU facilities, vaccination clinic, and growth monitoring.",
      icon: "pediatrics",
      conditionsTreat: [
        "Neonatal Jaundice & Prematurity",
        "Pediatric Respiratory Illnesses & Asthma",
        "Childhood Infections & Fevers",
        "Developmental Delay & Nutrition",
      ],
      treatmentsFacilities: [
        "Level III Tertiary NICU & PICU",
        "Daily Immunization & Vaccine Clinic",
        "Pediatric Emergency Resuscitation",
        "Growth & Pediatric Nutrition Center",
      ],
      features: [
        "Level III NICU & PICU Beds",
        "Well-Baby Vaccination Clinic",
        "Pediatric Emergency 24/7",
        "Child Development Assessment",
      ],
      headDoctor: "Dr. Sunita Kulkarni, MD (Pediatrics)",
    },
    {
      id: "neurology",
      name: "Neurology",
      slug: "neurology",
      tagline: "Brain, Spine & Nerve Specialists",
      description: "Specialized care for acute stroke management, epilepsy, migraines, neuropathies, neuro-rehabilitation, and spine care.",
      icon: "neurology",
      conditionsTreat: [
        "Acute Ischemic & Hemorrhagic Stroke",
        "Epilepsy, Seizures & Syncope",
        "Migraine & Chronic Headaches",
        "Parkinson's & Neuropathies",
      ],
      treatmentsFacilities: [
        "Stroke-Ready Rapid Thrombolysis Unit",
        "Digital EEG, EMG & Nerve Conduction Studies",
        "Neuro-ICU with ICP Monitoring",
        "Neuro-Rehabilitation & Speech Therapy",
      ],
      features: [
        "Acute Stroke Ready 24/7",
        "Digital Neurophysiology Lab",
        "Epilepsy & Migraine Clinic",
        "Cognitive & Speech Therapy",
      ],
      headDoctor: "Dr. Vikram Joshi, DM (Neurology)",
    },
    {
      id: "gynecology",
      name: "Gynecology",
      slug: "gynecology",
      tagline: "Complete Women's Health & Maternity",
      description: "Compassionate obstetric care, painless delivery suites, high-risk pregnancy monitoring, fertility consultations, and minimally invasive surgeries.",
      icon: "gynecology",
      conditionsTreat: [
        "High-Risk Pregnancies & Gestational Diabetes",
        "PCOD, Fibroids & Menstrual Irregularities",
        "Pelvic Floor & Incontinence Disorders",
        "Menopausal & Well-Woman Health",
      ],
      treatmentsFacilities: [
        "Private LDR (Labor-Delivery-Recovery) Rooms",
        "3D/4D Antenatal Ultrasound & NST",
        "Laparoscopic & Hysteroscopic Surgeries",
        "Infertility & Reproductive Health Guidance",
      ],
      features: [
        "Painless Normal Delivery Option",
        "High-Risk Obstetric Care",
        "Laparoscopic Gynec Surgery",
        "Well-Woman Preventive Screenings",
      ],
      headDoctor: "Dr. Priya Patel, MS (OBG)",
    },
    {
      id: "general-medicine",
      name: "General Medicine",
      slug: "general-medicine",
      tagline: "Primary Diagnosis & Chronic Illness Care",
      description: "Comprehensive adult medical diagnosis, diabetes management, hypertension control, infectious disease treatment, and preventive health checkups.",
      icon: "general-medicine",
      conditionsTreat: [
        "Type 1 & Type 2 Diabetes Complications",
        "Hypertension & Metabolic Syndrome",
        "Dengue, Malaria & Tropical Fevers",
        "Geriatric & Multimorbidity Care",
      ],
      treatmentsFacilities: [
        "Comprehensive Preventive Health Checkups",
        "Isolation Wards for Infectious Diseases",
        "Diabetic Foot & Chronic Wound Clinic",
        "24/7 Critical Care & Internal Medicine ICU",
      ],
      features: [
        "Diabetes & Hypertension Mastery",
        "Infectious Disease Isolation",
        "Executive Health Checkups",
        "Geriatric Care Support",
      ],
      headDoctor: "Dr. Sanjay Patil, MD (General Medicine)",
    },
  ],
  doctors: [
    {
      id: "dr-rajesh-sharma",
      slug: "dr-rajesh-sharma",
      name: "Dr. Rajesh Sharma",
      speciality: "Senior Cardiologist & Medical Director",
      departmentId: "cardiology",
      qualifications: "MD, DM (Cardiology), FACC",
      experience: "25+ Years of Clinical Excellence",
      shortBio: "Dr. Sharma is a renowned cardiologist in Maharashtra with over two decades of experience in interventional cardiology and cardiac emergency care.",
      opdTimings: "Mon - Sat: 10:00 AM - 02:00 PM",
      image: "/images/doctors/dr-rajesh-sharma.jpg",
    },
    {
      id: "dr-priya-patel",
      slug: "dr-priya-patel",
      name: "Dr. Priya Patel",
      speciality: "Chief Gynecologist & Obstetrician",
      departmentId: "gynecology",
      qualifications: "MS (OBG), FMAS, FICOG",
      experience: "18+ Years Experience",
      shortBio: "Expert in high-risk pregnancies, painless deliveries, and advanced laparoscopic gynecological surgeries with compassionate patient care.",
      opdTimings: "Mon - Sat: 11:00 AM - 03:00 PM",
      image: "/images/doctors/dr-priya-patel.jpg",
    },
    {
      id: "dr-amit-deshmukh",
      slug: "dr-amit-deshmukh",
      name: "Dr. Amit Deshmukh",
      speciality: "Joint Replacement & Spine Surgeon",
      departmentId: "orthopedics",
      qualifications: "MS (Ortho), Fellowship in Joint Replacement (Germany)",
      experience: "16+ Years Experience",
      shortBio: "Specialist in computer-navigated total knee and hip replacements, arthroscopy, and complex musculoskeletal trauma management.",
      opdTimings: "Mon - Fri: 09:30 AM - 01:30 PM",
      image: "/images/doctors/dr-amit-deshmukh.jpg",
    },
    {
      id: "dr-sunita-kulkarni",
      slug: "dr-sunita-kulkarni",
      name: "Dr. Sunita Kulkarni",
      speciality: "Senior Pediatrician & Neonatologist",
      departmentId: "pediatrics",
      qualifications: "MD (Pediatrics), Fellowship in Neonatology",
      experience: "15+ Years Experience",
      shortBio: "Dedicated to newborn intensive care, childhood immunization, and holistic developmental assessment for infants and adolescents.",
      opdTimings: "Mon - Sat: 10:00 AM - 02:00 PM",
      image: "/images/doctors/dr-sunita-kulkarni.jpg",
    },
    {
      id: "dr-vikram-joshi",
      slug: "dr-vikram-joshi",
      name: "Dr. Vikram Joshi",
      speciality: "Consultant Neurologist",
      departmentId: "neurology",
      qualifications: "MD (Medicine), DM (Neurology)",
      experience: "14+ Years Experience",
      shortBio: "Leading acute stroke care, epilepsy clinic, and neuro-rehabilitation protocols with cutting-edge diagnostic precision.",
      opdTimings: "Mon, Wed, Fri: 02:00 PM - 06:00 PM",
      image: "/images/doctors/dr-vikram-joshi.jpg",
    },
    {
      id: "dr-sanjay-patil",
      slug: "dr-sanjay-patil",
      name: "Dr. Sanjay Patil",
      speciality: "Chief Medical Specialist",
      departmentId: "general-medicine",
      qualifications: "MD (General Medicine)",
      experience: "20+ Years Experience",
      shortBio: "Expert diagnostician specializing in diabetes, hypertension, infectious disease treatment, and adult critical illness management.",
      opdTimings: "Mon - Sat: 09:00 AM - 01:00 PM",
      image: "/images/doctors/dr-sanjay-patil.jpg",
    },
    {
      id: "dr-ananya-iyer",
      slug: "dr-ananya-iyer",
      name: "Dr. Ananya Iyer",
      speciality: "Interventional Cardiologist",
      departmentId: "cardiology",
      qualifications: "MD, DNB (Cardiology)",
      experience: "12+ Years Experience",
      shortBio: "Pioneering radial angioplasties, cardiac pacemaker implants, and preventive cardiovascular wellness programs.",
      opdTimings: "Tue, Thu, Sat: 02:00 PM - 06:00 PM",
      image: "/images/doctors/dr-ananya-iyer.jpg",
    },
    {
      id: "dr-rohit-mehta",
      slug: "dr-rohit-mehta",
      name: "Dr. Rohit Mehta",
      speciality: "Sports Medicine & Arthroscopy",
      departmentId: "orthopedics",
      qualifications: "MS (Ortho), Fellowship in Sports Medicine",
      experience: "10+ Years Experience",
      shortBio: "Specialist in ligament reconstruction, shoulder rotator cuff repair, and modern athletic rehabilitation therapies.",
      opdTimings: "Mon - Fri: 03:00 PM - 07:00 PM",
      image: "/images/doctors/dr-rohit-mehta.jpg",
    },
  ],
  blogArticles: [
    {
      id: "heart-health-tips",
      slug: "heart-health-tips",
      title: "10 Daily Habits for a Healthy Heart: Cardiologist's Guide",
      excerpt: "Simple, evidence-backed lifestyle choices to protect your cardiovascular health and prevent heart conditions at any age.",
      content: [
        "Cardiovascular wellness starts with proactive daily choices. Heart specialists recommend at least 30 minutes of moderate aerobic exercise 5 days a week.",
        "Managing sodium intake, prioritizing sleep, and monitoring resting blood pressure can significantly lower the risk of coronary events.",
        "Annual screenings at LifeCare Hospital provide early detection of cholesterol imbalances and cardiac rhythm abnormalities.",
      ],
      date: "October 2026",
      author: "Dr. Rajesh Sharma",
      readTime: "4 min read",
      image: "/images/blog/heart-health-tips.jpg",
    },
    {
      id: "understanding-joint-pain",
      slug: "understanding-joint-pain",
      title: "Understanding Joint Pain: When to Consult an Orthopedic Surgeon",
      excerpt: "Learn how to differentiate common muscle fatigue from osteoarthritis, and explore modern non-invasive relief options.",
      content: [
        "Chronic knee and hip discomfort should never be ignored. When morning stiffness lasts beyond 30 minutes or prevents normal mobility, specialist evaluation is crucial.",
        "Modern orthopedic care emphasizes preserving cartilage through physiotherapy, targeted injections, and minimally invasive treatments before surgery.",
        "If joint replacement is needed, computer-assisted procedures ensure minimal blood loss and faster recovery times.",
      ],
      date: "September 2026",
      author: "Dr. Amit Deshmukh",
      readTime: "5 min read",
      image: "/images/blog/understanding-joint-pain.jpg",
    },
    {
      id: "pediatric-immunization",
      slug: "pediatric-immunization",
      title: "Child Vaccination Schedule: Essential Milestones for Parents",
      excerpt: "A complete walkthrough of essential pediatric immunizations from newborn to age 5, answered by our child health team.",
      content: [
        "Timely immunization creates a vital shield against preventable childhood diseases. Following the National Immunization Schedule ensures optimal immune defense.",
        "Our Well-Baby clinic offers temperature-monitored vaccines, gentle administration protocols, and post-vaccination monitoring.",
        "Consult our pediatric specialists to keep your child's vaccination card up-to-date and track overall physical development.",
      ],
      date: "August 2026",
      author: "Dr. Sunita Kulkarni",
      readTime: "4 min read",
      image: "/images/blog/pediatric-immunization.jpg",
    },
  ],
  services: [
    {
      id: "emergency-24-7",
      slug: "emergency-24-7",
      title: "24/7 Emergency & Casualty",
      shortDesc: "Round-the-clock emergency care with trauma surgeons, critical care specialists, and rapid response units.",
      fullDesc: "LifeCare Hospital's Emergency Department is ready 24 hours a day, 365 days a year to manage acute cardiac arrests, polytrauma, stroke, burns, and pediatric emergencies.",
      features: ["Immediate triage within 60 seconds", "On-site emergency minor & major OTs", "Dedicated ambulance bay with crash cart", "Direct access to Cath Lab and ICU"],
      icon: "emergency",
      image: "/images/services/emergency-24-7.jpg",
    },
    {
      id: "opd-consultations",
      slug: "opd-consultations",
      title: "Outpatient Department (OPD)",
      shortDesc: "Specialist consultation clinics across Cardiology, Orthopedics, Pediatrics, Neurology, and more.",
      fullDesc: "Comfortable and efficient OPD services with experienced senior consultants. Computerized token management and dedicated waiting lounges.",
      features: ["Same-day specialist appointments", "Digital prescription and record archival", "Executive consultation chambers", "Convenient morning and evening slots"],
      icon: "opd",
      image: "/images/services/opd-consultations.jpg",
    },
    {
      id: "diagnostics-lab",
      slug: "diagnostics-lab",
      title: "Diagnostics & Pathology Lab",
      shortDesc: "Accredited high-precision clinical pathology, biochemistry, microbiology, and digital radiology.",
      fullDesc: "Fully automated analyzers, 2D/3D Color Doppler ultrasound, high-resolution digital X-rays, ECG, and echocardiography for rapid diagnostic turnaround.",
      features: ["Accredited automated analyzers", "Digital reports available via SMS/WhatsApp", "Home sample collection in Nanded", "Emergency stat reports within 30 mins"],
      icon: "lab",
      image: "/images/services/diagnostics-lab.jpg",
    },
    {
      id: "pharmacy",
      slug: "pharmacy",
      title: "24/7 In-House Pharmacy",
      shortDesc: "Fully stocked pharmacy providing authentic prescription medicines, surgicals, and wellness products.",
      fullDesc: "Our round-the-clock pharmacy maintains strict cold-chain compliance and stocks all life-saving and chronic illness medications.",
      features: ["100% genuine guaranteed medicines", "Temperature-controlled vaccine storage", "Bedside medication delivery for inpatients", "24/7 counter availability"],
      icon: "pharmacy",
      image: "/images/services/pharmacy.jpg",
    },
    {
      id: "ambulance",
      slug: "ambulance",
      title: "Advanced ICU Ambulance",
      shortDesc: "GPS-enabled fleet equipped with ventilator, defibrillator, oxygen supply, and paramedic crew.",
      fullDesc: "Emergency mobile care equipped with transport ventilators, cardiac monitors, and trained paramedics for rapid patient retrieval anywhere in Nanded district.",
      features: ["Advanced Life Support (ALS) equipment", "On-board oxygen & syringe pumps", "Trained paramedic & nurse onboard", "GPS tracked rapid dispatch"],
      icon: "ambulance",
      image: "/images/services/ambulance.jpg",
    },
    {
      id: "health-checkups",
      slug: "health-checkups",
      title: "Health Checkup Packages",
      shortDesc: "Customized preventive master health checkups for individuals, executives, and senior citizens.",
      fullDesc: "Early diagnosis saves lives. Our comprehensive health packages screen vital organs including heart, kidney, liver, blood glucose, and thyroid.",
      features: ["Basic, Executive & Senior Citizen plans", "Same-day comprehensive review with doctor", "Discounted diagnostic bundles", "Personalized diet and lifestyle counsel"],
      icon: "checkup",
      image: "/images/services/health-checkups.jpg",
    },
  ],
  ctaBanner: {
    title: "Ready to feel better?",
    subtext: "Take the first step towards a healthier, happier you.",
    buttonText: "Book Appointment",
  },
  footer: {
    description: "Compassionate care. Advanced treatment. A healthier tomorrow for every family.",
    quickLinksCol1: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Departments", href: "/departments" },
      { name: "Our Doctors", href: "/doctors" },
    ],
    quickLinksCol2: [
      { name: "Services", href: "/services" },
      { name: "Patient Info", href: "/patient-info" },
      { name: "Health Blog", href: "/blog" },
      { name: "Contact Us", href: "/contact" },
    ],
    legalLinks: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms" },
    ],
    copyright: "© 2026 LifeCare Hospital. All rights reserved.",
  },
};

/**
 * Builds a direct WhatsApp click-to-chat URL using the centralized hospital WhatsApp number.
 */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${hospitalConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
