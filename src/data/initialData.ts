import { 
  LanguageOffer, 
  SkillsTrainingModule, 
  LanguageArticle, 
  MissionSlogan, 
  MissionPillar,
  AboutUsData 
} from '../types';

export const initialLanguages: LanguageOffer[] = [
  {
    id: 'lang-1',
    name: 'English',
    native: 'English',
    code: 'EN',
    description: 'Comprehensive general, academic, and business English with focus on fluency and global communication.',
    levels: 'A1 to C2 & IELTS/TOEFL',
    focus: ['Conversation', 'Academic Writing', 'Exam Prep', 'Business English'],
  },
  {
    id: 'lang-2',
    name: 'German',
    native: 'Deutsch',
    code: 'DE',
    description: 'Structured German training tailored for university studies in Germany, Austria, and healthcare careers.',
    levels: 'A1 to C1 & Goethe-Zertifikat',
    focus: ['Grammar Mastery', 'Studienkolleg Prep', 'Medical German', 'TestDaF'],
  },
  {
    id: 'lang-3',
    name: 'Arabic',
    native: 'العربية',
    code: 'AR',
    description: 'Modern Standard Arabic (MSA) alongside communicative dialects with rich phonetics and syntactic structure.',
    levels: 'Beginner to Advanced',
    focus: ['MSA Standard', 'Reading & Script', 'Media & Literature', 'Business Arabic'],
  },
  {
    id: 'lang-4',
    name: 'Turkish',
    native: 'Türkçe',
    code: 'TR',
    description: 'Immersive Turkish language courses designed for university admission, daily living, and commerce in Turkey.',
    levels: 'A1 to C1 & TÖMER Prep',
    focus: ['Vowel Harmony & Suffixes', 'TÖMER Exam', 'Everyday Fluency', 'Commercial Turkish'],
  },
  {
    id: 'lang-5',
    name: 'French',
    native: 'Français',
    code: 'FR',
    description: 'Elegant French instruction covering spoken interaction, literary nuance, and official certification.',
    levels: 'A1 to B2 & DELF/DALF',
    focus: ['Pronunciation & Listening', 'DELF B2 Preparation', 'Francophone Culture', 'Academic French'],
  },
  {
    id: 'lang-6',
    name: 'Dutch',
    native: 'Nederlands',
    code: 'NL',
    description: 'Practical and conversational Dutch geared towards study programs in the Netherlands and civic integration.',
    levels: 'A1 to B2 & Inburgering',
    focus: ['Civic Integration (Inburgering)', 'NT2 Exam Prep', 'Daily Interaction', 'Workplace Dutch'],
  },
];

export const initialTrainingModules: SkillsTrainingModule[] = [
  {
    id: 'train-1',
    title: 'Exam Preparation & Career Skills',
    description: 'Targeted simulation courses for international exams including IELTS, TOEFL, Goethe-Zertifikat (B1-C1), DELF, and TÖMER. Master academic writing, public speaking, and professional interview techniques.',
    points: [
      'Standardized Test Strategies & Timed Practice',
      'Professional CV, Resume & Cover Letter Crafting',
      'Mock University & Consular Interviews',
    ],
  },
  {
    id: 'train-2',
    title: 'Translation & Consultation',
    description: 'Certified document and transcript translation recognized by international admissions offices. In-depth 1-on-1 consultations for degree verification, equivalency processes, and credit transfers.',
    points: [
      'Academic Records, Transcripts & Diplomas',
      'Legal Statements & Certified Sworn Translations',
      'University Matching & Admission Consultations',
    ],
  },
  {
    id: 'train-3',
    title: 'Specialized Training & Language Services',
    description: 'Bespoke language solutions for businesses, medical professionals, engineers, and researchers. Flexible hybrid schedules and custom curriculum pacing.',
    points: [
      'Corporate & Institutional Team Workshops',
      'Medical, Technical & Engineering Lexicons',
      '1-on-1 Executive Fluency Coaching',
    ],
  },
];

export const initialArticles: LanguageArticle[] = [];

export const initialSlogans: MissionSlogan[] = [
  {
    id: 'slogan-1',
    quote: 'Unlock your potential.',
    context: 'Discovery & Self-Belief',
    description: 'Every student possesses untapped capabilities waiting to be awakened with the right guidance and academic rigor.',
  },
  {
    id: 'slogan-2',
    quote: 'Build your future.',
    context: 'Action & Architecture',
    description: 'We do not wait for the future; we construct it step by step through disciplined study, language fluency, and real-world skills.',
  },
  {
    id: 'slogan-3',
    quote: 'Small Steps. Big Futures.',
    context: 'Perseverance & Growth',
    description: 'Consistent daily mastery of vocabulary, concepts, and interview practice yields life-altering international opportunities.',
  },
];

export const initialPillars: MissionPillar[] = [
  {
    id: 'pillar-1',
    title: 'Study Abroad & Global Guidance',
    badge: 'International Pathways',
    description: 'Assisting students with university enrollment, visa/admission support, international guidance, and career growth opportunities.',
    points: [
      'Personalized university matching and program selection across Europe, North America, and worldwide.',
      'End-to-end assistance with university enrollment, admissions essays, portfolio submissions, and document legalization.',
      'Rigorous visa consultation and mock consular interview simulations.',
      'Post-arrival orientation, international student accommodation guidance, and long-term career roadmaps.',
    ],
  },
  {
    id: 'pillar-2',
    title: 'Skill Development & Empowerment',
    badge: 'Holistic Growth',
    description: 'Slogans highlight "Unlock your potential," "Build your future," and "Small Steps. Big Futures." We foster self-efficacy, critical thinking, and career readiness.',
    points: [
      'Critical thinking, analytical reasoning, and international exam strategies (IELTS, TOEFL, Goethe, TÖMER).',
      'Executive communication, professional presentation, and CV tailoring for competitive global markets.',
      'Active mentorship pairing students with alumni studying and working internationally.',
      'Cultivating self-efficacy, academic autonomy, and cross-cultural adaptability.',
    ],
  },
  {
    id: 'pillar-3',
    title: 'Multilingual Fluency',
    badge: 'Cultural Bridges',
    description: 'Expanding academic, professional, and personal opportunities through foreign language acquisition and cultural immersion.',
    points: [
      'Comprehensive programs across 6 core languages: English, German, Arabic, Turkish, French, and Dutch.',
      'Bridging linguistic barriers to unlock international scholarships, internships, and global research.',
      'Immersive speaking clubs and cultural exchange seminars designed to build genuine speaking confidence.',
      'Empowering students to think, negotiate, and thrive in multilingual academic environments.',
    ],
  },
];

export const initialAboutUsData: AboutUsData = {
  intro: 'Welcome to our institute. We are located in Duhok.',
  phoneNumbers: ['07500062119', '07508423979'],
  address: 'Duhok, Kurdistan Region',
  instagramUrl: 'https://www.instagram.com/letslern.institute/',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3192.671279680684!2d42.945425!3d36.850348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDUxJzAxLjMiTiA0MsKwNTYnNDMuNSJF!5e0!3m2!1sen!2siq!4v1788882559231!5m2!1sen!2siq',
};
