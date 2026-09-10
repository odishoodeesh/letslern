import { 
  LanguageOffer, 
  SkillsTrainingModule, 
  LanguageArticle, 
  MissionSlogan, 
  MissionPillar,
  AboutUsData,
  NewsItem,
  AcademicDepartment
} from '../types';

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Spring 2026 Language Course Registrations Open',
    date: 'Apr 15, 2026',
    summary: 'Enrollment is now officially open for English, German (A1-C1), Turkish, and French intensive batches. Limited seats per group for personalized learning.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'news-2',
    title: 'IELTS & TOEFL Masterclass Batches Starting Soon',
    date: 'Apr 02, 2026',
    summary: 'Accelerate your academic score with certified instructors, mock exam simulations, and personalized speaking and writing assessments.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'news-3',
    title: 'Study in Germany & Europe: Free Student Advisory Sessions',
    date: 'Mar 20, 2026',
    summary: 'Book your free one-on-one session with our academic advisors for university admissions in Germany, Austria, and the UK, including visa guidance.',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
  }
];

export const initialLanguages: LanguageOffer[] = [
  {
    id: 'lang-en',
    name: 'English',
    native: 'English',
    code: 'EN',
    description: 'Comprehensive general, academic, and business English tracks structured to achieve full fluency and high test scores.',
    levels: 'A1 - C2',
    focus: ['IELTS / TOEFL Prep', 'Academic Writing', 'Conversational Fluency', 'Business English'],
  },
  {
    id: 'lang-de',
    name: 'German',
    native: 'Deutsch',
    code: 'DE',
    description: 'Specialized German language instruction tailored for study visas, nursing jobs, and higher education in Germany, Austria, and Switzerland.',
    levels: 'A1 - C1',
    focus: ['Goethe-Zertifikat', 'ÖSD Exam Prep', 'Medical/Nursing German', 'Visa Interview Practice'],
  },
  {
    id: 'lang-ar',
    name: 'Arabic',
    native: 'العربية',
    code: 'AR',
    description: 'Modern Standard Arabic (Fusha) and conversational dialects with emphasis on grammar, formal literature, and regional communication.',
    levels: 'All Levels',
    focus: ['Grammar & Morphology', 'Professional Translation', 'Media Arabic', 'Interactive Dialogue'],
  },
  {
    id: 'lang-tr',
    name: 'Turkish',
    native: 'Türkçe',
    code: 'TR',
    description: 'Interactive Turkish courses aligned with the Common European Framework, preparing students for TÖMER certification and Turkish university entry.',
    levels: 'A1 - C1',
    focus: ['TÖMER Exam Prep', 'University Admissions', 'Daily Conversation', 'Grammar Synthesis'],
  },
  {
    id: 'lang-fr',
    name: 'French',
    native: 'Français',
    code: 'FR',
    description: 'Refined French language curriculum covering phonetics, DELF/DALF diploma preparation, and cultural immersion.',
    levels: 'A1 - B2',
    focus: ['DELF / DALF', 'Pronunciation & Phonetics', 'Diplomatic & Academic French', 'Cultural Nuances'],
  },
  {
    id: 'lang-nl',
    name: 'Dutch',
    native: 'Nederlands',
    code: 'NL',
    description: 'Essential Dutch language training for integration exams (Inburgeringsexamen), higher education, and migration pathways.',
    levels: 'A1 - B2',
    focus: ['Inburgering Exam', 'Civic Integration', 'Grammar Essentials', 'Everyday Communication'],
  },
];

export const initialTrainingModules: SkillsTrainingModule[] = [
  {
    id: 'train-1',
    title: 'International Exam Preparation',
    description: 'Intensive prep for IELTS, TOEFL iBT, Goethe-Zertifikat, and TÖMER with targeted exam strategies and practice test banks.',
    points: ['Diagnostic scoring & personalized study plan', 'Certified examiners with proven student track record', 'Weekly simulated mock exams & timed sections'],
  },
  {
    id: 'train-2',
    title: 'Study Abroad & University Advisory',
    description: 'End-to-end guidance for securing university admissions in Europe, UK, Turkey, and North America.',
    points: ['University program matching & application handling', 'Statement of Purpose (SOP) & CV editing', 'Student visa preparation & interview training'],
  },
  {
    id: 'train-3',
    title: 'Certified Translation & Professional Skills',
    description: 'Official academic and legal document translations, corporate business language training, and public speaking coaching.',
    points: ['Accredited document translations for embassies', 'Executive workplace communication workshops', 'Accent reduction and confidence building'],
  },
];

export const initialArticles: LanguageArticle[] = [
  {
    id: 'art-1',
    title: 'Grammar Harmony: Comparative Verb Structures in German & English',
    languages: 'German & English',
    summary: 'A structural exploration of modal verbs, separable prefixes, and word order differences between Germanic siblings.',
    content: 'Both English and German belong to the West Germanic language family, sharing deep cognates and historical roots. However, German maintains a synthetic case structure (Nominative, Accusative, Dative, Genitive) and strict verb-second (V2) syntax in main clauses, accompanied by verb-final positioning in subordinate clauses.\n\nUnderstanding these grammatical contrasts enables learners to rapidly master word order and avoid common literal translation traps.'
  },
  {
    id: 'art-2',
    title: 'Agglutination vs. Inflection: Turkish & Indo-European Languages',
    languages: 'Turkish, Kurdish & English',
    summary: 'How agglutinative suffixes allow Turkish to build entire descriptive phrases into a single word compared to analytic English syntax.',
    content: 'Turkish is a prime example of an agglutinative language, where grammatical relationships (tense, possession, negation, mood) are created by attaching regular suffixes to invariant root words without altering the stem.\n\nFor students coming from Kurdish or English backgrounds, recognizing vowel harmony and systematic affix stacking turns Turkish into a logical, highly predictable language to acquire.'
  }
];

export const initialSlogans: MissionSlogan[] = [
  {
    id: 'slogan-1',
    quote: 'Unlock your potential through global language mastery.',
    description: 'Our core philosophy that language proficiency is the ultimate catalyst for international academic and professional success.',
    context: 'Core Academic Motto',
  },
  {
    id: 'slogan-2',
    quote: 'Your trusted bridge to premier world universities.',
    description: 'Empowering students in Duhok and Kurdistan to reach world-class higher education institutions across Europe and beyond.',
    context: 'Global Vision',
  },
  {
    id: 'slogan-3',
    quote: 'Crafting confident communicators, not just grammar memorizers.',
    description: 'Dynamic immersion and active communicative methodology that guarantees real-world speaking confidence from day one.',
    context: 'Teaching Philosophy',
  },
];

export const initialPillars: MissionPillar[] = [
  {
    id: 'pillar-1',
    title: 'Academic Rigor & Certified Excellence',
    badge: 'Pillar 01',
    description: 'Every curriculum adheres strictly to the Common European Framework of Reference for Languages (CEFR).',
    points: [
      'Certified, experienced instructors with native proficiency',
      'Small interactive cohorts for individualized attention',
      'Comprehensive study materials and digital test libraries'
    ],
  },
  {
    id: 'pillar-2',
    title: 'Global University & Career Pathways',
    badge: 'Pillar 02',
    description: 'Bridging local ambitions with global opportunities through dedicated academic advisory and visa guidance.',
    points: [
      'Direct partnerships with European academic advisory networks',
      'Proven admissions support for German, UK, and European universities',
      'Scholarship application counseling and guidance'
    ],
  },
  {
    id: 'pillar-3',
    title: 'Supportive & Inspiring Learning Environment',
    badge: 'Pillar 03',
    description: 'A modern, welcoming institute in Duhok equipped with tactile learning spaces and supportive mentors.',
    points: [
      'State-of-the-art interactive classrooms in central Duhok',
      'Free language clubs and conversation speaking circles',
      'Continuous progress monitoring and constructive feedback'
    ],
  },
];

export const initialAcademicDepartments: AcademicDepartment[] = [
  {
    id: 'dept-1',
    name: 'School of World Languages',
    description: 'Specialized programs in English, German, Turkish, French, Arabic, and Dutch for beginners to advanced scholars.',
    icon: 'Languages'
  },
  {
    id: 'dept-2',
    name: 'International Exam & Testing Center',
    description: 'Comprehensive preparatory masterclasses for IELTS, TOEFL iBT, Goethe-Zertifikat, and TÖMER credentials.',
    icon: 'GraduationCap'
  },
  {
    id: 'dept-3',
    name: 'Study Abroad & University Advisory',
    description: 'Personalized student consulting, university admissions processing, and embassy visa interview readiness.',
    icon: 'Compass'
  }
];

export const initialAboutUsData: AboutUsData = {
  intro: "Let's Lern Institute is Duhok's premier academy for world languages, international exam preparation, and global university advisory. We empower learners with certified fluency in 6 world languages and guide scholars to top international educational destinations.",
  phoneNumbers: ['07500062119', '07508423979'],
  address: 'Duhok, Kurdistan Region, Iraq',
  instagramUrl: 'https://www.instagram.com/letslern.institute/',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3192.671279680684!2d42.945425!3d36.850348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDUxJzAxLjMiTiA0MsKwNTYnNDMuNSJF!5e0!3m2!1sen!2siq!4v1788882559231!5m2!1sen!2siq',
};


