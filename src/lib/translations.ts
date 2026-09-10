import { LanguageCode, LanguageOption } from '../types';

export const APP_LANGUAGES: LanguageOption[] = [
  {
    id: 'en',
    name: 'English (Main)',
    nativeName: 'English',
    direction: 'ltr',
  },
  {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    direction: 'ltr',
  },
  {
    id: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
  },
  {
    id: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    direction: 'ltr',
  },
  {
    id: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
  },
  {
    id: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    direction: 'ltr',
  },
  {
    id: 'ku-badini',
    name: 'Kurdish Badini',
    nativeName: 'بادینی (دهۆک)',
    direction: 'rtl',
  },
  {
    id: 'ku-sorani',
    name: 'Kurdish Sorani',
    nativeName: 'کوردی سۆرانی',
    direction: 'rtl',
  },
];

export interface SiteTranslation {
  // Navigation & General UI
  navigation: string;
  selectLanguage: string;
  home: string;
  news: string;
  about: string;
  academics: string;
  curriculum: string;
  adminPanel: string;
  rightsReserved: string;
  academyName: string;
  instituteDuhok: string;
  activeBadge: string;
  menu: string;
  close: string;
  backToHome: string;
  backToTop: string;

  // Hero Section
  heroTopTitle: string;
  heroTopSubtitle: string;
  heroWelcomeTitle: string;
  heroWelcomeDesc: string;
  heroAboutButton: string;
  heroBadge: string;

  // Home Page Cards
  academicProgramsTitle: string;
  academicProgramsSubtitle: string;
  subjectsCardTag: string;
  subjectsCardTitle: string;
  subjectsCardDesc: string;
  subjectsCardBtn: string;

  goalsCardTag: string;
  goalsCardTitle: string;
  goalsCardDesc: string;
  goalsCardBtn: string;

  contactCardBadge: string;
  contactCardTitle: string;
  contactCardDesc: string;
  contactCardBtn: string;
  locationLabel: string;

  // Schedule Table
  dayCol: string;
  timeCol: string;
  activityCol: string;

  // News Section
  newsTitle: string;
  newsBadge: string;
  newsEmptyTitle: string;
  newsEmptyDesc: string;
  announcementSingular: string;
  announcementPlural: string;
  readMore: string;

  // Academics Section
  academicsTitle: string;
  academicsSubtitle: string;
  deptScience: string;
  deptScienceDesc: string;
  deptArts: string;
  deptArtsDesc: string;
  deptMath: string;
  deptMathDesc: string;

  // About Us Page
  aboutTitle: string;
  aboutBadge: string;
  aboutWelcomeDefault: string;
  contactUs: string;
  addressTitle: string;
  findOnMap: string;
  followUs: string;
  instagramProfile: string;

  // Subjects & Languages Page
  subjectsPageBadge: string;
  subjectsPageTitle: string;
  subjectsPageSubtitle: string;
  worldLanguagesTitle: string;
  worldLanguagesSubtitle: string;
  coreFocusAreas: string;
  trainingSectionTitle: string;
  trainingSectionSubtitle: string;
  articlesSectionTitle: string;
  articlesSectionSubtitle: string;
  noLanguagesListed: string;
  noTrainingListed: string;

  // Goals & Mission Page
  goalsPageBadge: string;
  goalsPageTitle: string;
  goalsPageSubtitle: string;
  slogansSectionTitle: string;
  slogansSectionSubtitle: string;
  pillarsSectionTitle: string;
  pillarsSectionSubtitle: string;
  noSlogansListed: string;
  noPillarsListed: string;
  pillarPrefix: string;

  // Dynamic Page
  pageDocumentBadge: string;
  noContentYet: string;
}

export const TRANSLATIONS: Record<LanguageCode, SiteTranslation> = {
  en: {
    navigation: 'Navigation',
    selectLanguage: 'Language Selection',
    home: 'Home',
    news: 'News',
    about: 'About Us',
    academics: 'Academics',
    curriculum: 'Curriculum & Pages',
    adminPanel: 'Admin Panel',
    rightsReserved: 'All Rights Reserved',
    academyName: "Let's Lern Institute",
    instituteDuhok: 'Institute • Duhok',
    activeBadge: 'Active',
    menu: 'Menu',
    close: 'Close',
    backToHome: '← Back to Home',
    backToTop: '↑ Back to Top',

    heroTopTitle: "Let's Lern Institute",
    heroTopSubtitle: 'Premier Language Training, Exam Preparation & Global Academic Guidance in Duhok.',
    heroWelcomeTitle: "Welcome to Let's Lern",
    heroWelcomeDesc: 'Dedicated to academic growth, certified language education, and global learning opportunities in Duhok.',
    heroAboutButton: 'About & Contact Details',
    heroBadge: "Let's Lern Institute • Duhok",

    academicProgramsTitle: 'Academic & Language Programs',
    academicProgramsSubtitle: 'Explore our certified language courses, career skills, and international guidance.',
    subjectsCardTag: 'Curriculum & Training',
    subjectsCardTitle: 'Subjects & Language Offerings',
    subjectsCardDesc: '6 accredited languages (English, German, Arabic, Turkish, French, Dutch), specialized exam preparation (IELTS, TOEFL, Goethe, TÖMER), and official translations.',
    subjectsCardBtn: 'View All Languages & Training',

    goalsCardTag: 'Vision & Pathways',
    goalsCardTitle: 'Goals & Mission',
    goalsCardDesc: 'Study abroad & global university guidance, visa support, skill development, and empowerment under our guiding motto: "Unlock your potential."',
    goalsCardBtn: 'Discover Our Mission & Guidance',

    contactCardBadge: 'Visit Our Academy in Duhok',
    contactCardTitle: 'Have Questions or Ready to Enroll?',
    contactCardDesc: 'Reach our admissions advisors by phone or visit our center in Duhok.',
    contactCardBtn: 'Contact & Location Details',
    locationLabel: 'Duhok, Kurdistan Region',

    dayCol: 'Day',
    timeCol: 'Time',
    activityCol: 'Activity',

    newsTitle: 'Latest News & Announcements',
    newsBadge: 'Institute Updates',
    newsEmptyTitle: 'Latest News & Announcements',
    newsEmptyDesc: 'Stay tuned! Exciting news, upcoming examination schedules, and institute events will be published here.',
    announcementSingular: 'Announcement',
    announcementPlural: 'Announcements',
    readMore: 'Read Full Article',

    academicsTitle: 'Academic Departments',
    academicsSubtitle: 'Comprehensive educational tracks designed for academic excellence.',
    deptScience: 'Natural Sciences & Research',
    deptScienceDesc: 'Rigorous foundation in biology, chemistry, and physics with practical lab experimentation.',
    deptArts: 'Humanities, Languages & Arts',
    deptArtsDesc: 'Cultivating critical analysis, global communication, linguistic proficiency, and creative expression.',
    deptMath: 'Mathematics & Computer Science',
    deptMathDesc: 'Applied problem solving, advanced calculus, statistics, logic, and digital programming.',

    aboutTitle: 'About Us',
    aboutBadge: 'Academy Information',
    aboutWelcomeDefault: "Welcome to Let's Lern Institute in Duhok. We are a premier educational academy committed to helping learners master international languages, achieve top standardized test scores, and secure international university admissions.",
    contactUs: 'Contact Us',
    addressTitle: 'Address & Campus Location',
    findOnMap: 'Find Us on Google Maps',
    followUs: 'Follow Us on Social Media',
    instagramProfile: 'Instagram Profile (@letslern.institute)',

    subjectsPageBadge: 'Curriculum & Language Programs',
    subjectsPageTitle: 'Subjects & Language Offerings',
    subjectsPageSubtitle: 'Unlock your global potential through certified multilingual courses, intensive exam preparations, and customized professional skills training.',
    worldLanguagesTitle: 'World Languages Offered',
    worldLanguagesSubtitle: 'Expert-led native and certified instruction across 6 major international languages.',
    coreFocusAreas: 'Core Focus Areas',
    trainingSectionTitle: 'Academic & Skills Training',
    trainingSectionSubtitle: 'Targeted career prep, certified translations, and tailored educational advisory.',
    articlesSectionTitle: 'Language Learning Articles & Insights',
    articlesSectionSubtitle: 'In-depth guidance and proven techniques from our certified instructors.',
    noLanguagesListed: 'No languages currently listed.',
    noTrainingListed: 'No training modules currently listed.',

    goalsPageBadge: 'Our Vision & Guiding Principles',
    goalsPageTitle: 'Goals & Mission',
    goalsPageSubtitle: 'Dedicated to transforming ambitious learners into globally empowered, multilingual scholars equipped for top international universities and rewarding careers.',
    slogansSectionTitle: 'Our Core Slogans & Mottos',
    slogansSectionSubtitle: 'The foundational philosophies that motivate our teachers, students, and mentors.',
    pillarsSectionTitle: 'Strategic Pillars of Our Mission',
    pillarsSectionSubtitle: 'Focused commitments driving our academic excellence and student success.',
    noSlogansListed: 'No slogans currently listed.',
    noPillarsListed: 'No pillars currently listed.',
    pillarPrefix: 'Pillar',

    pageDocumentBadge: 'Page Document',
    noContentYet: 'No content published on this page yet.',
  },

  de: {
    navigation: 'Navigation',
    selectLanguage: 'Sprachauswahl',
    home: 'Startseite',
    news: 'Nachrichten',
    about: 'Über uns',
    academics: 'Akademiker',
    curriculum: 'Lehrplan & Seiten',
    adminPanel: 'Admin-Bereich',
    rightsReserved: 'Alle Rechte vorbehalten',
    academyName: "Let's Lern Institut",
    instituteDuhok: 'Institut • Duhok',
    activeBadge: 'Aktiv',
    menu: 'Menü',
    close: 'Schließen',
    backToHome: '← Zurück zur Startseite',
    backToTop: '↑ Nach oben',

    heroTopTitle: "Let's Lern Institut",
    heroTopSubtitle: 'Erstklassiges Sprachtraining, Prüfungsvorbereitung und weltweite akademische Beratung in Duhok.',
    heroWelcomeTitle: "Willkommen bei Let's Lern",
    heroWelcomeDesc: 'Engagiert für akademisches Wachstum, zertifizierte Sprachausbildung und weltweite Bildungschancen in Duhok.',
    heroAboutButton: 'Über uns & Kontaktdaten',
    heroBadge: "Let's Lern Institut • Duhok",

    academicProgramsTitle: 'Akademische & Sprachprogramme',
    academicProgramsSubtitle: 'Entdecken Sie unsere zertifizierten Sprachkurse, Karrierekompetenzen und internationale Beratung.',
    subjectsCardTag: 'Lehrplan & Ausbildung',
    subjectsCardTitle: 'Fächer- & Sprachangebote',
    subjectsCardDesc: '6 akkreditierte Sprachen (Englisch, Deutsch, Arabisch, Türkisch, Französisch, Niederländisch), gezielte Prüfungsvorbereitung (IELTS, TOEFL, Goethe, TÖMER) und offizielle Übersetzungen.',
    subjectsCardBtn: 'Alle Sprachen & Kurse anzeigen',

    goalsCardTag: 'Vision & Perspektiven',
    goalsCardTitle: 'Ziele & Mission',
    goalsCardDesc: 'Auslandsstudium & Universitätsberatung, Visaunterstützung, Kompetenzförderung nach unserem Leitmotto: „Entfalte dein Potenzial.“',
    goalsCardBtn: 'Entdecken Sie unsere Mission',

    contactCardBadge: 'Besuchen Sie unser Institut in Duhok',
    contactCardTitle: 'Haben Sie Fragen oder möchten Sie sich anmelden?',
    contactCardDesc: 'Erreichen Sie unsere Studienberater telefonisch oder besuchen Sie unser Zentrum in Duhok.',
    contactCardBtn: 'Kontakt- & Standortdetails',
    locationLabel: 'Duhok, Region Kurdistan',

    dayCol: 'Tag',
    timeCol: 'Uhrzeit',
    activityCol: 'Aktivität',

    newsTitle: 'Aktuelle Nachrichten & Ankündigungen',
    newsBadge: 'Neuigkeiten des Instituts',
    newsEmptyTitle: 'Aktuelle Nachrichten & Ankündigungen',
    newsEmptyDesc: 'Bleiben Sie dran! Spannende Neuigkeiten, anstehende Prüfungstermine und Veranstaltungen werden hier veröffentlicht.',
    announcementSingular: 'Ankündigung',
    announcementPlural: 'Ankündigungen',
    readMore: 'Vollständigen Artikel lesen',

    academicsTitle: 'Akademische Fachbereiche',
    academicsSubtitle: 'Umfassende Bildungswege für höchste akademische Exzellenz.',
    deptScience: 'Naturwissenschaften & Forschung',
    deptScienceDesc: 'Fundierte Ausbildung in Biologie, Chemie und Physik mit praktischer Laborerfahrung.',
    deptArts: 'Geisteswissenschaften, Sprachen & Kunst',
    deptArtsDesc: 'Förderung von kritischem Denken, globaler Kommunikation und sprachlicher Meisterschaft.',
    deptMath: 'Mathematik & Informatik',
    deptMathDesc: 'Angewandte Problemlösung, höhere Analysis, Statistik, Logik und Softwareentwicklung.',

    aboutTitle: 'Über uns',
    aboutBadge: 'Instituts-Informationen',
    aboutWelcomeDefault: "Willkommen im Let's Lern Institut in Duhok. Wir sind eine führende Bildungsakademie, die Lernenden hilft, internationale Sprachen zu meistern, Bestnoten in Prüfungen zu erzielen und Studienplätze an weltweiten Universitäten zu sichern.",
    contactUs: 'Kontaktieren Sie uns',
    addressTitle: 'Adresse & Campus-Standort',
    findOnMap: 'Finden Sie uns auf Google Maps',
    followUs: 'Folgen Sie uns in den sozialen Medien',
    instagramProfile: 'Instagram-Profil (@letslern.institute)',

    subjectsPageBadge: 'Lehrplan & Sprachprogramme',
    subjectsPageTitle: 'Fächer & Sprachangebote',
    subjectsPageSubtitle: 'Erschließen Sie Ihr globales Potenzial durch zertifizierte mehrsprachige Kurse, intensive Prüfungsvorbereitungen und berufliche Qualifizierung.',
    worldLanguagesTitle: 'Angebotene Weltsprachen',
    worldLanguagesSubtitle: 'Von Experten und Muttersprachlern geleiteter Unterricht in 6 großen Weltsprachen.',
    coreFocusAreas: 'Schwerpunktbereiche',
    trainingSectionTitle: 'Akademische & berufliche Ausbildung',
    trainingSectionSubtitle: 'Gezielte Karrierevorbereitung, beglaubigte Übersetzungen und individuelle Studienberatung.',
    articlesSectionTitle: 'Artikel & Einblicke zum Sprachenlernen',
    articlesSectionSubtitle: 'Tiefgreifende Ratschläge und bewährte Techniken unserer zertifizierten Lehrkräfte.',
    noLanguagesListed: 'Derzeit sind keine Sprachen aufgeführt.',
    noTrainingListed: 'Derzeit sind keine Ausbildungsmodule aufgeführt.',

    goalsPageBadge: 'Unsere Vision & Leitprinzipien',
    goalsPageTitle: 'Ziele & Mission',
    goalsPageSubtitle: 'Wir begleiten ambitionierte Lernende auf ihrem Weg zu weltoffenen, mehrsprachigen Akademikern für internationale Spitzenuniversitäten.',
    slogansSectionTitle: 'Unsere Leitsprüche & Mottos',
    slogansSectionSubtitle: 'Die Grundwerte, die unsere Lehrkräfte, Schüler und Mentoren täglich inspirieren.',
    pillarsSectionTitle: 'Strategische Säulen unserer Mission',
    pillarsSectionSubtitle: 'Klare Schwerpunkte für herausragende akademische Ergebnisse und persönlichen Erfolg.',
    noSlogansListed: 'Derzeit sind keine Leitsprüche aufgeführt.',
    noPillarsListed: 'Derzeit sind keine Säulen aufgeführt.',
    pillarPrefix: 'Säule',

    pageDocumentBadge: 'Seitendokument',
    noContentYet: 'Auf dieser Seite wurden noch keine Inhalte veröffentlicht.',
  },

  ar: {
    navigation: 'التنقل',
    selectLanguage: 'اختيار اللغة',
    home: 'الرئيسية',
    news: 'الأخبار',
    about: 'من نحن',
    academics: 'الأكاديميات',
    curriculum: 'المناهج والصفحات',
    adminPanel: 'لوحة التحكم',
    rightsReserved: 'جميع الحقوق محفوظة',
    academyName: 'معهد ليتس ليرن',
    instituteDuhok: 'المعهد • دهوك',
    activeBadge: 'مفعل',
    menu: 'القائمة',
    close: 'إغلاق',
    backToHome: '← العودة إلى الرئيسية',
    backToTop: '↑ العودة إلى الأعلى',

    heroTopTitle: 'معهد ليتس ليرن',
    heroTopSubtitle: 'تدريب متميز على اللغات، تحضير للامتحانات الدولية واستشارات أكاديمية عالمية في دهوك.',
    heroWelcomeTitle: 'مرحباً بكم في ليتس ليرن',
    heroWelcomeDesc: 'ملتزمون بالنمو الأكاديمي، وتعليم اللغات المعتمد، وتوفير الفرص التعليمية العالمية في دهوك.',
    heroAboutButton: 'من نحن ومعلومات الاتصال',
    heroBadge: 'معهد ليتس ليرن • دهوك',

    academicProgramsTitle: 'البرامج الأكاديمية واللغات',
    academicProgramsSubtitle: 'استكشف دورات اللغات المعتمدة وتطوير المهارات المهنية والإرشاد الدولي.',
    subjectsCardTag: 'المناهج والتدريب',
    subjectsCardTitle: 'المناهج واللغات المقدمة',
    subjectsCardDesc: '6 لغات معتمدة (الإنجليزية، الألمانية، العربية، التركية، الفرنسية، الهولندية)، تحضير للامتحانات التخصصية (IELTS, TOEFL, Goethe, TÖMER) وترجمات رسمية.',
    subjectsCardBtn: 'عرض جميع اللغات والدورات',

    goalsCardTag: 'الرؤية والمسارات',
    goalsCardTitle: 'الأهداف والرسالة',
    goalsCardDesc: 'إرشاد للدراسة بالخارج والجامعات العالمية، دعم التأشيرات وتطوير المهارات تحت شعارنا: "أطلق العنان لإمكانياتك".',
    goalsCardBtn: 'اكتشف رسالتنا وإرشادنا',

    contactCardBadge: 'تفضل بزيارة معهدنا في دهوك',
    contactCardTitle: 'هل لديك استفسار أو ترغب في التسجيل؟',
    contactCardDesc: 'تواصل مع مستشاري القبول عبر الهاتف أو قم بزيارة مركزنا في دهوك.',
    contactCardBtn: 'تفاصيل الاتصال والموقع',
    locationLabel: 'دهوك، إقليم كوردستان',

    dayCol: 'اليوم',
    timeCol: 'الوقت',
    activityCol: 'النشاط',

    newsTitle: 'آخر الأخبار والإعلانات',
    newsBadge: 'تحديثات المعهد',
    newsEmptyTitle: 'آخر الأخبار والإعلانات',
    newsEmptyDesc: 'ترقبوا! سيتم نشر الأخبار المهمة ومواعيد الامتحانات وفعاليات المعهد هنا.',
    announcementSingular: 'إعلان',
    announcementPlural: 'إعلانات',
    readMore: 'قراءة المقال كاملاً',

    academicsTitle: 'الأقسام الأكاديمية',
    academicsSubtitle: 'مسارات تعليمية متكاملة مصممة لتحقيق التميز العلمي والمهني.',
    deptScience: 'العلوم الطبيعية والأبحاث',
    deptScienceDesc: 'تأسيس علمي متين في الأحياء والكيمياء والفيزياء مع تجارب مخبرية عملية.',
    deptArts: 'العلوم الإنسانية واللغات والفنون',
    deptArtsDesc: 'تنمية التفكير النقدي، والتواصل العالمي، وإتقان اللغات الأجنبية والتعبير الإبداعي.',
    deptMath: 'الرياضيات وعلوم الحاسوب',
    deptMathDesc: 'حل المشكلات التطبيقية، التفاضل والتكامل المتقدم، الإحصاء والبرمجة الرقمية.',

    aboutTitle: 'من نحن',
    aboutBadge: 'معلومات المعهد',
    aboutWelcomeDefault: 'أهلاً بكم في معهد ليتس ليرن في دهوك. نحن أكاديمية تعليمية رائدة تكرس جهودها لمساعدة الطلاب على إتقان اللغات الدولية، وتحقيق أعلى الدرجات في الاختبارات المعتمدة، وتأمين القبول في أرقى الجامعات العالمية.',
    contactUs: 'اتصل بنا',
    addressTitle: 'العنوان وموقع المعهد',
    findOnMap: 'موقعنا على خرائط جوجل',
    followUs: 'تابعنا على مواقع التواصل الاجتماعي',
    instagramProfile: 'حساب الإنستغرام (@letslern.institute)',

    subjectsPageBadge: 'المناهج وبرامج اللغات',
    subjectsPageTitle: 'المناهج واللغات المقدمة',
    subjectsPageSubtitle: 'أطلق العنان لقدراتك العالمية من خلال دورات لغوية معتمدة، وتحضير مكثف للاختبارات وتدريب مهني متخصص.',
    worldLanguagesTitle: 'اللغات العالمية المتوفرة',
    worldLanguagesSubtitle: 'تعليم بإشراف نخبة من الأساتذة والناطقين الأصليين لـ 6 لغات دولية رئيسية.',
    coreFocusAreas: 'المجالات والمحاور الأساسية',
    trainingSectionTitle: 'التدريب الأكاديمي والمهني',
    trainingSectionSubtitle: 'إعداد مهني موجه، ترجمة قانونية معتمدة واستشارات تعليمية مخصصة.',
    articlesSectionTitle: 'مقالات ورؤى تعلم اللغات',
    articlesSectionSubtitle: 'إرشادات متعمقة وأساليب تعليمية مجربة يقدمها مدربونا المعتمدون.',
    noLanguagesListed: 'لا توجد لغات مدرجة حالياً.',
    noTrainingListed: 'لا توجد وحدات تدريبية مدرجة حالياً.',

    goalsPageBadge: 'رؤيتنا والمبادئ التوجيهية',
    goalsPageTitle: 'الأهداف والرسالة',
    goalsPageSubtitle: 'ملتزمون بتمكين الطلاب الطموحين ليصبحوا باحثين متعددي اللغات مؤهلين للالتحاق بأعرق الجامعات العالمية.',
    slogansSectionTitle: 'شعاراتنا ورسائلنا الأساسية',
    slogansSectionSubtitle: 'الفلسفات والمبادئ التي تحفز أساتذتنا وطلابنا وموجهينا يومياً.',
    pillarsSectionTitle: 'الركائز الاستراتيجية لرسالتنا',
    pillarsSectionSubtitle: 'التزامات مركزة تقود تميزنا الأكاديمي ونجاح طلابنا.',
    noSlogansListed: 'لا توجد شعارات مدرجة حالياً.',
    noPillarsListed: 'لا توجد ركائز مدرجة حالياً.',
    pillarPrefix: 'الركيزة',

    pageDocumentBadge: 'مستند الصفحة',
    noContentYet: 'لم يتم نشر أي محتوى في هذه الصفحة بعد.',
  },

  tr: {
    navigation: 'Navigasyon',
    selectLanguage: 'Dil Seçimi',
    home: 'Ana Sayfa',
    news: 'Haberler',
    about: 'Hakkımızda',
    academics: 'Akademik',
    curriculum: 'Müfredat ve Sayfalar',
    adminPanel: 'Yönetici Paneli',
    rightsReserved: 'Tüm Hakları Saklıdır',
    academyName: "Let's Lern Enstitüsü",
    instituteDuhok: 'Enstitü • Duhok',
    activeBadge: 'Aktif',
    menu: 'Menü',
    close: 'Kapat',
    backToHome: '← Ana Sayfaya Dön',
    backToTop: '↑ Yukarı Çık',

    heroTopTitle: "Let's Lern Enstitüsü",
    heroTopSubtitle: "Duhok'ta üstün dil eğitimi, sınav hazırlığı ve küresel akademik danışmanlık.",
    heroWelcomeTitle: "Let's Lern'e Hoş Geldiniz",
    heroWelcomeDesc: "Duhok'ta akademik gelişim, sertifikalı dil eğitimi ve küresel öğrenim fırsatları sunuyoruz.",
    heroAboutButton: 'Hakkımızda ve İletişim',
    heroBadge: "Let's Lern Enstitüsü • Duhok",

    academicProgramsTitle: 'Akademik ve Dil Programları',
    academicProgramsSubtitle: 'Sertifikalı dil kurslarımızı, kariyer becerilerini ve uluslararası rehberliği keşfedin.',
    subjectsCardTag: 'Müfredat ve Eğitim',
    subjectsCardTitle: 'Dersler ve Dil Seçenekleri',
    subjectsCardDesc: '6 akredite dil (İngilizce, Almanca, Arapça, Türkçe, Fransızca, Felemenkçe), özel sınav hazırlığı (IELTS, TOEFL, Goethe, TÖMER) ve resmi tercüme.',
    subjectsCardBtn: 'Tüm Dilleri ve Eğitimleri Gör',

    goalsCardTag: 'Vizyon ve Yollar',
    goalsCardTitle: 'Hedefler ve Misyon',
    goalsCardDesc: 'Yurtdışı eğitim ve üniversite danışmanlığı, vize desteği ve "Potansiyelini Keşfet" sloganıyla yetkinlik geliştirme.',
    goalsCardBtn: 'Misyonumuzu Keşfedin',

    contactCardBadge: "Duhok'taki Merkezimizi Ziyaret Edin",
    contactCardTitle: 'Sorularınız mı var veya kayıt olmaya hazır mısınız?',
    contactCardDesc: "Telefonla danışmanlarımıza ulaşın veya Duhok'taki merkezimizi ziyaret edin.",
    contactCardBtn: 'İletişim ve Konum Detayları',
    locationLabel: 'Duhok, Kürdistan Bölgesi',

    dayCol: 'Gün',
    timeCol: 'Saat',
    activityCol: 'Etkinlik',

    newsTitle: 'Son Haberler ve Duyurular',
    newsBadge: 'Enstitü Güncellemeleri',
    newsEmptyTitle: 'Son Haberler ve Duyurular',
    newsEmptyDesc: 'Bizi takip edin! Önemli duyurular, sınav tarihleri ve etkinlikler burada yayınlanacaktır.',
    announcementSingular: 'Duyuru',
    announcementPlural: 'Duyurular',
    readMore: 'Makalenin Tamamını Oku',

    academicsTitle: 'Akademik Bölümler',
    academicsSubtitle: 'Akademik başarı için tasarlanmış kapsamlı eğitim programları.',
    deptScience: 'Doğa Bilimleri ve Araştırma',
    deptScienceDesc: 'Biyoloji, kimya ve fizik alanında pratik laboratuvar deneyleriyle güçlü temel.',
    deptArts: 'Beşeri Bilimler, Diller ve Sanat',
    deptArtsDesc: 'Eleştirel düşünme, küresel iletişim ve yabancı dil yetkinliği geliştirme.',
    deptMath: 'Matematik ve Bilgisayar Bilimleri',
    deptMathDesc: 'Uygulamalı problem çözme, ileri kalkülüs, istatistik ve yazılım geliştirme.',

    aboutTitle: 'Hakkımızda',
    aboutBadge: 'Enstitü Bilgileri',
    aboutWelcomeDefault: "Duhok'taki Let's Lern Enstitüsü'ne hoş geldiniz. Öğrencilerimizin uluslararası dillerde uzmanlaşması, sınavlarda yüksek başarı elde etmesi ve saygın üniversitelere kabul edilmesi için çalışıyoruz.",
    contactUs: 'Bize Ulaşın',
    addressTitle: 'Adres ve Konum',
    findOnMap: "Google Haritalar'da Bulun",
    followUs: 'Bizi Sosyal Medyada Takip Edin',
    instagramProfile: 'Instagram Profili (@letslern.institute)',

    subjectsPageBadge: 'Müfredat ve Dil Programları',
    subjectsPageTitle: 'Dersler ve Dil Seçenekleri',
    subjectsPageSubtitle: 'Sertifikalı çok dilli kurslar, yoğun sınav hazırlıkları ve özel mesleki eğitimlerle küresel potansiyelinizi açığa çıkarın.',
    worldLanguagesTitle: 'Sunulan Dünya Dilleri',
    worldLanguagesSubtitle: '6 ana dilde uzman ve anadili konuşan eğitmenler eşliğinde dersler.',
    coreFocusAreas: 'Temel Odak Alanları',
    trainingSectionTitle: 'Akademik ve Mesleki Eğitim',
    trainingSectionSubtitle: 'Hedefe yönelik kariyer hazırlığı, yeminli tercüme ve kişiselleştirilmiş eğitim danışmanlığı.',
    articlesSectionTitle: 'Dil Öğrenimi Makaleleri ve İpuçları',
    articlesSectionSubtitle: 'Sertifikalı eğitmenlerimizden derinlemesine rehberlik ve kanıtlanmış teknikler.',
    noLanguagesListed: 'Şu anda listelenen dil bulunmamaktadır.',
    noTrainingListed: 'Şu anda listelenen eğitim modülü bulunmamaktadır.',

    goalsPageBadge: 'Vizyonumuz ve İlkelerimiz',
    goalsPageTitle: 'Hedefler ve Misyon',
    goalsPageSubtitle: 'Azimli öğrencileri dünyanın en iyi üniversitelerine ve başarılı kariyerlere hazırlayan çok dilli bireylere dönüştürüyoruz.',
    slogansSectionTitle: 'Temel Sloganlarımız',
    slogansSectionSubtitle: 'Öğretmenlerimizi ve öğrencilerimizi her gün motive eden temel felsefeler.',
    pillarsSectionTitle: 'Misyonumuzun Stratejik Temelleri',
    pillarsSectionSubtitle: 'Akademik mükemmeliyet ve öğrenci başarısını sağlayan odak noktalarımız.',
    noSlogansListed: 'Şu anda slogan bulunmamaktadır.',
    noPillarsListed: 'Şu anda temel ilke bulunmamaktadır.',
    pillarPrefix: 'Temel',

    pageDocumentBadge: 'Sayfa Belgesi',
    noContentYet: 'Bu sayfada henüz içerik yayınlanmadı.',
  },

  fr: {
    navigation: 'Navigation',
    selectLanguage: 'Sélection de la langue',
    home: 'Accueil',
    news: 'Actualités',
    about: 'À propos',
    academics: 'Académique',
    curriculum: 'Programmes & Pages',
    adminPanel: 'Panneau Admin',
    rightsReserved: 'Tous droits réservés',
    academyName: "Institut Let's Lern",
    instituteDuhok: 'Institut • Duhok',
    activeBadge: 'Actif',
    menu: 'Menu',
    close: 'Fermer',
    backToHome: "← Retour à l'accueil",
    backToTop: '↑ Haut de page',

    heroTopTitle: "Institut Let's Lern",
    heroTopSubtitle: 'Formation linguistique d’excellence, préparation aux examens et orientation académique mondiale à Duhok.',
    heroWelcomeTitle: "Bienvenue à Let's Lern",
    heroWelcomeDesc: 'Dédié à l’épanouissement académique, à l’enseignement certifié des langues et aux opportunités mondiales à Duhok.',
    heroAboutButton: 'À propos & Coordonnées',
    heroBadge: "Institut Let's Lern • Duhok",

    academicProgramsTitle: 'Programmes académiques et linguistiques',
    academicProgramsSubtitle: 'Explorez nos cours de langues certifiés, nos compétences professionnelles et notre orientation internationale.',
    subjectsCardTag: 'Programmes & Formation',
    subjectsCardTitle: 'Matières & Offres linguistiques',
    subjectsCardDesc: '6 langues accréditées (anglais, allemand, arabe, turc, français, néerlandais), préparation aux examens (IELTS, TOEFL, Goethe, TÖMER) et traductions certifiées.',
    subjectsCardBtn: 'Voir toutes les langues & formations',

    goalsCardTag: 'Vision & Perspectives',
    goalsCardTitle: 'Objectifs & Mission',
    goalsCardDesc: 'Études à l’étranger, orientation universitaire, accompagnement visa sous notre devise : « Libérez votre potentiel ».',
    goalsCardBtn: 'Découvrir notre mission',

    contactCardBadge: 'Visitez notre institut à Duhok',
    contactCardTitle: 'Des questions ou prêt à vous inscrire ?',
    contactCardDesc: 'Contactez nos conseillers pédagogiques par téléphone ou visitez notre centre à Duhok.',
    contactCardBtn: 'Contact & Emplacement',
    locationLabel: 'Duhok, Région du Kurdistan',

    dayCol: 'Jour',
    timeCol: 'Heure',
    activityCol: 'Activité',

    newsTitle: 'Dernières nouvelles & annonces',
    newsBadge: 'Mises à jour de l’institut',
    newsEmptyTitle: 'Dernières nouvelles & annonces',
    newsEmptyDesc: 'Restez connectés ! Les dates d’examen et événements de l’institut seront publiés ici.',
    announcementSingular: 'Annonce',
    announcementPlural: 'Annonces',
    readMore: "Lire l'article complet",

    academicsTitle: 'Départements académiques',
    academicsSubtitle: 'Des parcours éducatifs complets conçus pour l’excellence académique.',
    deptScience: 'Sciences naturelles & Recherche',
    deptScienceDesc: 'Solide formation en biologie, chimie et physique avec travaux pratiques en laboratoire.',
    deptArts: 'Sciences humaines, Langues & Arts',
    deptArtsDesc: 'Développement de l’esprit critique, communication internationale et maîtrise des langues.',
    deptMath: 'Mathématiques & Informatique',
    deptMathDesc: 'Résolution de problèmes appliqués, calcul avancé, statistiques et programmation informatique.',

    aboutTitle: 'À propos de nous',
    aboutBadge: 'Informations sur l’institut',
    aboutWelcomeDefault: "Bienvenue à l'Institut Let's Lern à Duhok. Nous sommes une académie d’excellence dédiée à l’apprentissage des langues internationales et à l’admission dans les meilleures universités mondiales.",
    contactUs: 'Contactez-nous',
    addressTitle: 'Adresse & Emplacement',
    findOnMap: 'Trouvez-nous sur Google Maps',
    followUs: 'Suivez-nous sur les réseaux sociaux',
    instagramProfile: 'Profil Instagram (@letslern.institute)',

    subjectsPageBadge: 'Programmes & Langues',
    subjectsPageTitle: 'Matières & Offres linguistiques',
    subjectsPageSubtitle: 'Développez votre potentiel international grâce à des cours multilingues certifiés et des formations sur mesure.',
    worldLanguagesTitle: 'Langues internationales enseignées',
    worldLanguagesSubtitle: 'Enseignement dispensé par des professeurs certifiés et natifs dans 6 langues majeures.',
    coreFocusAreas: 'Axes prioritaires',
    trainingSectionTitle: 'Formation académique & compétences',
    trainingSectionSubtitle: 'Préparation ciblée aux carrières, traductions assermentées et conseils personnalisés.',
    articlesSectionTitle: 'Articles & Conseils d’apprentissage',
    articlesSectionSubtitle: 'Méthodes éprouvées et conseils d’experts de nos formateurs certifiés.',
    noLanguagesListed: 'Aucune langue répertoriée pour le moment.',
    noTrainingListed: 'Aucun module de formation répertorié pour le moment.',

    goalsPageBadge: 'Notre vision & Principes directeurs',
    goalsPageTitle: 'Objectifs & Mission',
    goalsPageSubtitle: 'Former des apprenants ambitieux pour intégrer les meilleures universités internationales et réussir leur carrière.',
    slogansSectionTitle: 'Nos devises & slogans',
    slogansSectionSubtitle: 'Les philosophies qui animent nos enseignants, élèves et mentors au quotidien.',
    pillarsSectionTitle: 'Piliers stratégiques de notre mission',
    pillarsSectionSubtitle: 'Nos engagements prioritaires pour la réussite et l’excellence de nos étudiants.',
    noSlogansListed: 'Aucun slogan répertorié pour le moment.',
    noPillarsListed: 'Aucun pilier répertorié pour le moment.',
    pillarPrefix: 'Pilier',

    pageDocumentBadge: 'Document de page',
    noContentYet: 'Aucun contenu n’a encore été publié sur cette page.',
  },

  nl: {
    navigation: 'Navigatie',
    selectLanguage: 'Taalkeuze',
    home: 'Startpagina',
    news: 'Nieuws',
    about: 'Over ons',
    academics: 'Academie',
    curriculum: 'Lesprogramma & Pagina\'s',
    adminPanel: 'Beheerderspaneel',
    rightsReserved: 'Alle rechten voorbehouden',
    academyName: "Let's Lern Instituut",
    instituteDuhok: 'Instituut • Duhok',
    activeBadge: 'Actief',
    menu: 'Menu',
    close: 'Sluiten',
    backToHome: '← Terug naar startpagina',
    backToTop: '↑ Naar boven',

    heroTopTitle: "Let's Lern Instituut",
    heroTopSubtitle: 'Hoogwaardige taaltrainingen, examenvorbereiding en academische begeleiding in Duhok.',
    heroWelcomeTitle: "Welkom bij Let's Lern",
    heroWelcomeDesc: 'Toegewijd aan academische groei, gecertificeerd taalonderwijs en wereldwijde kansen in Duhok.',
    heroAboutButton: 'Over ons & Contactgegevens',
    heroBadge: "Let's Lern Instituut • Duhok",

    academicProgramsTitle: 'Academische & Taalprogramma\'s',
    academicProgramsSubtitle: 'Ontdek onze gecertificeerde taalcursussen, loopbaanvaardigheden en internationale begeleiding.',
    subjectsCardTag: 'Lesprogramma & Training',
    subjectsCardTitle: 'Vakken & Taalaanbod',
    subjectsCardDesc: '6 geaccrediteerde talen (Engels, Duits, Arabisch, Turks, Frans, Nederlands), gerichte examenvorbereiding (IELTS, TOEFL, Goethe, TÖMER) en beëdigde vertalingen.',
    subjectsCardBtn: 'Bekijk alle talen en cursussen',

    goalsCardTag: 'Visie & Toekomst',
    goalsCardTitle: 'Doelen & Missie',
    goalsCardDesc: 'Studeren in het buitenland, universitaire toelating en visumbegeleiding onder ons motto: "Ontgrendel je potentieel."',
    goalsCardBtn: 'Ontdek onze missie & begeleiding',

    contactCardBadge: 'Bezoek ons instituut in Duhok',
    contactCardTitle: 'Vragen of direct inschrijven?',
    contactCardDesc: 'Neem telefonisch contact op met onze adviseurs of bezoek onze academie in Duhok.',
    contactCardBtn: 'Contact & Locatiedetails',
    locationLabel: 'Duhok, Koerdische Regio',

    dayCol: 'Dag',
    timeCol: 'Tijd',
    activityCol: 'Activiteit',

    newsTitle: 'Laatste nieuws & aankondigingen',
    newsBadge: 'Instituutsupdates',
    newsEmptyTitle: 'Laatste nieuws & aankondigingen',
    newsEmptyDesc: 'Blijf op de hoogte! Examenschema\'s en evenementen worden hier geplaatst.',
    announcementSingular: 'Aankondiging',
    announcementPlural: 'Aankondigingen',
    readMore: 'Lees het volledige artikel',

    academicsTitle: 'Academische Faculteiten',
    academicsSubtitle: 'Volledige onderwijsprogramma\'s ontworpen voor academische topkwaliteit.',
    deptScience: 'Natuurwetenschappen & Onderzoek',
    deptScienceDesc: 'Grondige basis in biologie, scheikunde en natuurkunde met praktijkgerichte laboratoriumlessen.',
    deptArts: 'Geesteswetenschappen, Talen & Kunst',
    deptArtsDesc: 'Ontwikkeling van kritisch denken, internationale communicatie en meertaligheid.',
    deptMath: 'Wiskunde & Informatica',
    deptMathDesc: 'Toegepaste wiskunde, statistiek, logica en computerprogrammering.',

    aboutTitle: 'Over ons',
    aboutBadge: 'Instituuts-informatie',
    aboutWelcomeDefault: "Welkom bij het Let's Lern Instituut in Duhok. Wij begeleiden studenten naar succes in internationale talen, examens en universitaire toelatingen wereldwijd.",
    contactUs: 'Neem contact op',
    addressTitle: 'Adres & Locatie',
    findOnMap: 'Vind ons op Google Maps',
    followUs: 'Volg ons op sociale media',
    instagramProfile: 'Instagram Profiel (@letslern.institute)',

    subjectsPageBadge: 'Lesprogramma & Talen',
    subjectsPageTitle: 'Vakken & Taalaanbod',
    subjectsPageSubtitle: 'Ontwikkel uw wereldwijde mogelijkheden met gecertificeerde taalcursussen en professionele vaardigheidstrainingen.',
    worldLanguagesTitle: 'Aangeboden wereldtalen',
    worldLanguagesSubtitle: 'Onderwijs door gekwalificeerde docenten en moedertaalsprekers in 6 grote wereldtalen.',
    coreFocusAreas: 'Hoofdfocusgebieden',
    trainingSectionTitle: 'Academische & loopbaantrainingen',
    trainingSectionSubtitle: 'Gerichte loopbaanvoorbereiding, beëdigde vertalingen en persoonlijk studieadvies.',
    articlesSectionTitle: 'Artikelen & Taalleerinzichten',
    articlesSectionSubtitle: 'Praktische tips en beproefde methoden van onze gecertificeerde docenten.',
    noLanguagesListed: 'Er zijn momenteel geen talen vermeld.',
    noTrainingListed: 'Er zijn momenteel geen trainingsmodules vermeld.',

    goalsPageBadge: 'Onze visie & Richtlijnen',
    goalsPageTitle: 'Doelen & Missie',
    goalsPageSubtitle: 'Het opleiden van ambitieuze studenten tot meertalige academici voor toonaangevende internationale universiteiten.',
    slogansSectionTitle: 'Onze kernslogans',
    slogansSectionSubtitle: 'De principes die onze docenten, studenten en mentoren dagelijks motiveren.',
    pillarsSectionTitle: 'Strategische pijlers van onze missie',
    pillarsSectionSubtitle: 'Gerichte toewijding voor academische topprestaties en studentensucces.',
    noSlogansListed: 'Er zijn momenteel geen slogans vermeld.',
    noPillarsListed: 'Er zijn momenteel geen pijlers vermeld.',
    pillarPrefix: 'Pijler',

    pageDocumentBadge: 'Paginadocument',
    noContentYet: 'Er is nog geen inhoud gepubliceerd op deze pagina.',
  },

  'ku-badini': {
    navigation: 'رێڤەبرن و ناڤەرۆک',
    selectLanguage: 'هەلبژارتنا زمانى',
    home: 'سەرەکی',
    news: 'نووچە',
    about: 'دەربارەی مە',
    academics: 'بەشێن ئەکادیمی',
    curriculum: 'پەرتووک و بەرنامە',
    adminPanel: 'پەنەلا رێڤەبەریێ',
    rightsReserved: 'هەمی ماف پاراستینە',
    academyName: 'پەیمانگەها لێتس لێرن',
    instituteDuhok: 'پەیمانگەهـ • دهۆک',
    activeBadge: 'چالاکە',
    menu: 'مێنیو',
    close: 'گرتن',
    backToHome: '← زڤرین بۆ سەرەکی',
    backToTop: '↑ زڤرین بۆ سەرێ لاپەری',

    heroTopTitle: 'پەیمانگەها لێتس لێرن',
    heroTopSubtitle: 'باشترین راهێنانێن فێربوونا زمانان، بەرهەڤکرنا ئەزموونان و رێنمایێن ئەکادیمی یێن جیهانی ل دهۆکێ.',
    heroWelcomeTitle: 'بخێربێن بۆ پەیمانگەها لێتس لێرن',
    heroWelcomeDesc: 'پابەندین ب پێشڤەبرنا ئاستێ ئەکادیمی، فێرکرنا زمانان ب شێوازەکێ باوەرپێکری و دابینکرنا دەلیڤەیێن خاندنێ ل دهۆکێ.',
    heroAboutButton: 'دەربارەی مە و پەیوەندی',
    heroBadge: 'پەیمانگەها لێتس لێرن • دهۆک',

    academicProgramsTitle: 'بەرنامەیێن ئەکادیمی و زمانان',
    academicProgramsSubtitle: 'خولێن مە یێن باوەرپێکری یێن زمانان، شیانێن پیشەیی و رێنمایێن نێڤدەولەتی ببینە.',
    subjectsCardTag: 'پەرتووک و راهێنان',
    subjectsCardTitle: 'بابەت و زمانێن بەردەست',
    subjectsCardDesc: '٦ زمانێن باوەرپێکری (ئینگلیزی، ئەلمانی، عەرەبی، تورکی، فرەنسی، هۆلەندی)، بەرهەڤکرنا ئەزموونێن نێڤدەولەتی (IELTS, TOEFL, Goethe, TÖMER) و وەرگێرانا فەرمی.',
    subjectsCardBtn: 'دیتنا هەمی زمان و خولان',

    goalsCardTag: 'دیتن و ئارمانج',
    goalsCardTitle: 'ئارمانج و پەیاما مە',
    goalsCardDesc: 'رێنماییکرن بۆ خاندنێ ل دەرڤەی وەلات و زانکۆیێن جیهانی، پشتەڤانیا ڤیزەیێ و پێشخستنا شیانان ل بن درووشمێ: "شیانێن خۆ ئاشکرا بکە".',
    goalsCardBtn: 'پەیام و رێنمایێن مە ببینە',

    contactCardBadge: 'سەردانا پەیمانگەها مە بکە ل دهۆکێ',
    contactCardTitle: 'پرسیارەک تە هەیە یان دێ ناڤێ خۆ تۆمار کەی؟',
    contactCardDesc: 'پەیوەندیێ ب راوێژکارێن مە یێن وەرگرتنێ بکە ب تەلەفۆنێ یان سەردانا سەنتەرێ مە بکە ل دهۆکێ.',
    contactCardBtn: 'پەیوەندی و زانیاریێن جهی',
    locationLabel: 'دهۆک، هەرێما کوردستانێ',

    dayCol: 'رۆژ',
    timeCol: 'دەم',
    activityCol: 'چالاکی',

    newsTitle: 'دوماهیک نووچە و ئاگەهداری',
    newsBadge: 'ئاگەهداریێن پەیمانگەهێ',
    newsEmptyTitle: 'دوماهیک نووچە و ئاگەهداری',
    newsEmptyDesc: 'ل هیڤیێ بن! نووچەیێن گرنگ، خشتەیێن ئەزموونان و چالاکیێن پەیمانگەهێ ل ڤێرێ دێ هێنە بەلاڤکرن.',
    announcementSingular: 'ئاگەهداری',
    announcementPlural: 'ئاگەهداری',
    readMore: 'خاندنا هەمی بابەتێ',

    academicsTitle: 'پشکێن ئەکادیمی',
    academicsSubtitle: 'پڕۆگرامێن فێرکاری یێن پێشکەفتی بۆ گەهشتن ب بلندترین ئاستێ زانستی.',
    deptScience: 'زانستێن سروشتی و ڤەکۆلین',
    deptScienceDesc: 'بنیاتەکێ بهێز د زیندەوەرزانی، کیمیا و فیزیکێ دا دگەل ئەزموونێن تاقیگەهێ یێن کرداری.',
    deptArts: 'زانستێن مرۆڤایەتی، زمان و هونەر',
    deptArtsDesc: 'پێشڤەبرنا هزرکرنا رەخنەگرانە، پەیوەندیێن جیهانی، شارەزایی د زمانێن بیانی دا و دەربڕینا داهێنەرانە.',
    deptMath: 'بیرکاری و زانستێ کۆمپیۆتەری',
    deptMathDesc: 'چارەسەرکرنا ئاریشەیێن کرداری، بیرکاریا پێشکەفتی، ئامار و بەرنامەسازییا دیجیتاڵی.',

    aboutTitle: 'دەربارەی مە',
    aboutBadge: 'زانیاریێن پەیمانگەهێ',
    aboutWelcomeDefault: 'بخێربێن بۆ پەیمانگەها لێتس لێرن ل دهۆکێ. ئەم ئەکادیمیایەکا فێرکاری یا پێشەنگین کو ئارمانجا مە هاریکاریکردنا فێرخوازانە بۆ فێربوونا زمانێن بیانی، بدەستڤەئینانا بلنترین نمرەیان د تاقیکرنێن نێڤدەولەتی دا و وەرگرتنا باوەرنامەیان ژ زانکۆیێن ناڤدارێن جیهانێ.',
    contactUs: 'پەیوەندی ب مە بکە',
    addressTitle: 'ناڤونیشان و جهێ مە',
    findOnMap: 'مە ل سەر نەخشەیێ گوگلی ببینە',
    followUs: 'ل سوشیال میدیایێ مە فۆلۆ بکە',
    instagramProfile: 'هەژمارا ئینستاگرامی (@letslern.institute)',

    subjectsPageBadge: 'بەرنامە و خولێن زمانان',
    subjectsPageTitle: 'بابەت و زمانێن بەردەست',
    subjectsPageSubtitle: 'شیانێن خۆ یێن جیهانی پێش بێخە ب رێکا خولێن باوەرپێکری یێن زمانان، بەرهەڤکرنا تاقیکرنان و راهێنانێن پیشەیی.',
    worldLanguagesTitle: 'زمانێن جیهانی یێن بەردەست',
    worldLanguagesSubtitle: 'فێرکرن ژ لایێ مامۆستایێن شارەزا و خەلکێ زمانێ دایکێ بۆ ٦ زمانێن سەرەکی یێن جیهانێ.',
    coreFocusAreas: 'تەوەرێن سەرەکی',
    trainingSectionTitle: 'راهێنانێن ئەکادیمی و پیشەیی',
    trainingSectionSubtitle: 'بەرهەڤکرنا کارامەییان، وەرگێرانا فەرمی و دادوەری و راوێژکاریێن پەروەردەیی.',
    articlesSectionTitle: 'گوتار و پێزانینێن فێربوونا زمانان',
    articlesSectionSubtitle: 'رێنمایێن کویر و رێکێن سەلماندی ژ مامۆستایێن مە یێن باوەرپێکری.',
    noLanguagesListed: 'نوکە چو زمان نەهاتینە تۆمارکرن.',
    noTrainingListed: 'نوکە چو خولێن راهێنانێ نەهاتینە تۆمارکرن.',

    goalsPageBadge: 'دیتن و رێسایێن مە',
    goalsPageTitle: 'ئارمانج و پەیام',
    goalsPageSubtitle: 'پەروەردەکرن و ئامادەکرنا فێرخوازان بۆ قەبیلکرن د باشترین زانکۆیێن جیهانێ و دەستڤەئینانا کارەکێ سەرکەفتی.',
    slogansSectionTitle: 'درووشم و پەیامێن مە یێن سەرەکی',
    slogansSectionSubtitle: 'ئەو فەلسەفە و پرەنسیپێن کو رۆژانە مامۆستا و قوتابیێن مە هان ددەن.',
    pillarsSectionTitle: 'کۆڵەکێن ستراتیژی یێن پەیاما مە',
    pillarsSectionSubtitle: 'پابەندبوونێن سەرەکی کو رێبەریا سەرکەفتن و سەرفەرازیا قوتابیێن مە دکەن.',
    noSlogansListed: 'نوکە چو درووشم نەهاتینە تۆمارکرن.',
    noPillarsListed: 'نوکە چو کۆڵەکە نەهاتینە تۆمارکرن.',
    pillarPrefix: 'کۆڵەکا',

    pageDocumentBadge: 'بەلگەنامەیا لاپەری',
    noContentYet: 'هێشتا چ ناڤەرۆک د ڤی لاپەری دا نەهاتیە بەلاڤکرن.',
  },

  'ku-sorani': {
    navigation: 'ڕێدۆزی و بەشەکان',
    selectLanguage: 'هەڵبژاردنی زمان',
    home: 'سەرەکی',
    news: 'هەواڵەکان',
    about: 'دەربارەی ئێمە',
    academics: 'بەشە ئەکادیمییەکان',
    curriculum: 'بەرنامە و پەڕەکان',
    adminPanel: 'پانێڵی بەڕێوەبەر',
    rightsReserved: 'هەموو مافەکان پارێزراون',
    academyName: 'پەیمانگای لێتس لێرن',
    instituteDuhok: 'پەیمانگە • دهۆک',
    activeBadge: 'چالاکە',
    menu: 'مێنۆ',
    close: 'داخستن',
    backToHome: '← گەڕانەوە بۆ سەرەکی',
    backToTop: '↑ گەڕانەوە بۆ سەرەوە',

    heroTopTitle: 'پەیمانگای لێتس لێرن',
    heroTopSubtitle: 'باشترین ڕاهێنانی زمان، ئامادەکاری بۆ تاقیکردنەوە نێودەوڵەتییەکان و ڕێنمایی ئەکادیمی لە دهۆک.',
    heroWelcomeTitle: 'بەخێربێن بۆ پەیمانگای لێتس لێرن',
    heroWelcomeDesc: 'پابەندین بە گەشەی ئەکادیمی، فێرکردنی زمانی باوەڕپێکراو و دابینکردنی دەرفەتی خوێندنی جیهانی لە دهۆک.',
    heroAboutButton: 'دەربارەی ئێمە و پەیوەندی',
    heroBadge: 'پەیمانگای لێتس لێرن • دهۆک',

    academicProgramsTitle: 'بەرنامە ئەکادیمییەکان و زمانەکان',
    academicProgramsSubtitle: 'خولە باوەڕپێکراوەکانی زمان، کارامەییە پیشەییەکان و ڕاوێژی نێودەوڵەتی ببینە.',
    subjectsCardTag: 'پرۆگرام و ڕاهێنان',
    subjectsCardTitle: 'بابەت و زمانە بەردەستەکان',
    subjectsCardDesc: '٦ زمانی باوەڕپێکراو (ئینگلیزی، ئەڵمانی، عەرەبی، تورکی، فەرەنسی، هۆڵەندی)، ئامادەکاری بۆ تاقیکردنەوەکان (IELTS, TOEFL, Goethe, TÖMER) و وەرگێڕانی باوەڕپێکراو.',
    subjectsCardBtn: 'بینینی هەموو زمان و خولەکان',

    goalsCardTag: 'دیدگا و ئاراستەکان',
    goalsCardTitle: 'ئامانج و پەیامی ئێمە',
    goalsCardDesc: 'ڕێنمایی بۆ خوێندن لە دەرەوە و زانکۆ جیهانییەکان، پشتگیری ڤیزە و پەرەپێدانی تواناکان لەژێر دروشمی: "تواناکانت دەربخە".',
    goalsCardBtn: 'پەیام و ڕێنماییەکانمان ببینە',

    contactCardBadge: 'سەردانی پەیمانگاکەمان بکەن لە دهۆک',
    contactCardTitle: 'پرسیارت هەیە یان دەتەوێت ناونووسی بکەیت؟',
    contactCardDesc: 'پەیوەندی بە ڕاوێژکارانی وەرگرتنمانەوە بکە یان سەردانی ناوەندەکەمان بکە لە دهۆک.',
    contactCardBtn: 'پەیوەندی و زانیاری شوێن',
    locationLabel: 'دهۆک، هەرێمی کوردستان',

    dayCol: 'ڕۆژ',
    timeCol: 'کات',
    activityCol: 'چالاکی',

    newsTitle: 'نوێترین هەواڵ و ئاگادارییەکان',
    newsBadge: 'ئاگادارییەکانی پەیمانگە',
    newsEmptyTitle: 'نوێترین هەواڵ و ئاگادارییەکان',
    newsEmptyDesc: 'چاوەڕوان بن! هەواڵی گرنگ و خشتەی تاقیکردنەوەکان و چالاکییەکانی پەیمانگە لێرە بڵاودەکرێنەوە.',
    announcementSingular: 'ئاگاداری',
    announcementPlural: 'ئاگادارییەکان',
    readMore: 'خوێندنەوەی تەواوی بابەتەکە',

    academicsTitle: 'بەشە ئەکادیمییەکان',
    academicsSubtitle: 'پڕۆگرامی فێرکاری گشتگیر کە بۆ گەیشتن بە بەرزترین ئاستی زانستی داڕێژراون.',
    deptScience: 'زانستە سروشتییەکان و توێژینەوە',
    deptScienceDesc: 'بناغەیەکی بەهێز لە بایۆلۆجی، کیمیا و فیزیک لەگەڵ تاقیکردنەوەی پراکتیکی لە تاقیگەدا.',
    deptArts: 'زانستە مرۆڤایەتییەکان، زمان و هونەر',
    deptArtsDesc: 'پەرەپێدانی بیرکردنەوەی ڕەخنەگرانە، پەیوەندی جیهانی و شارەزایی لە زمانە بیانییەکاندا.',
    deptMath: 'بیرکاری و زانستی کۆمپیوتەر',
    deptMathDesc: 'چارەسەرکردنی کێشەی پراکتیکی، بیرکاری پێشکەوتوو، ئامار و پرۆگرامسازی دیجیتاڵی.',

    aboutTitle: 'دەربارەی ئێمە',
    aboutBadge: 'زانیاری پەیمانگە',
    aboutWelcomeDefault: 'بەخێربێن بۆ پەیمانگای لێتس لێرن لە دهۆک. ئێمە ئەکادیمیایەکی پەروەردەیی پێشەنگین کە ئامانجمان یارمەتیدانی فێرخوازانە بۆ فێربوونی زمانی جیهانی، بەدەستهێنانی نمرەی بەرز لە تاقیکردنەوە نێودەوڵەتییەکاندا و وەرگرتن لە زانکۆ بەناوبانگەکانی جیهان.',
    contactUs: 'پەیوەندیمان پێوە بکەن',
    addressTitle: 'ناونیشان و شوێنی پەیمانگە',
    findOnMap: 'لەسەر نەخشەی گووگڵ بماندۆزەرەوە',
    followUs: 'لە تۆڕە کۆمەڵایەتییەکان فۆڵۆمان بکەن',
    instagramProfile: 'پڕۆفایلی ئینستاگرام (@letslern.institute)',

    subjectsPageBadge: 'بەرنامە و خولەکانی زمان',
    subjectsPageTitle: 'بابەت و زمانە بەردەستەکان',
    subjectsPageSubtitle: 'تواناکانت لەسەر ئاستی جیهان پێش بخە لە ڕێگەی خولی فرەزمانی باوەڕپێکراو، ئامادەکاری تاقیکردنەوە و ڕاهێنانی پیشەیی.',
    worldLanguagesTitle: 'زمانە جیهانییە بەردەستەکان',
    worldLanguagesSubtitle: 'فێرکردن لەلایەن مامۆستایانی شارەزا و خاوەن زمانی دایک بۆ ٦ زمانی سەرەکی جیهان.',
    coreFocusAreas: 'تەوەرە سەرەکییەکان',
    trainingSectionTitle: 'ڕاهێنانی ئەکادیمی و پیشەیی',
    trainingSectionSubtitle: 'ئامادەکاری بۆ کار، وەرگێڕانی یاسایی باوەڕپێکراو و ڕاوێژکاری پەروەردەیی تایبەت.',
    articlesSectionTitle: 'وتار و زانیارییەکانی فێربوونی زمان',
    articlesSectionSubtitle: 'ڕێنمایی قووڵ و شێوازی سەلمێنراو لە ڕاهێنەرە باوەڕپێکراوەکانمانەوە.',
    noLanguagesListed: 'لە ئێستادا هیچ زمانێک تۆمار نەکراوە.',
    noTrainingListed: 'لە ئێستادا هیچ خولێکی ڕاهێنان تۆمار نەکراوە.',

    goalsPageBadge: 'دیدگا و بنەماکانی ئێمە',
    goalsPageTitle: 'ئامانج و پەیام',
    goalsPageSubtitle: 'پەروەردەکردنی فێرخوازانی بەتوانا و ئامادەکردنیان بۆ وەرگیران لە باشترین زانکۆکانی جیهان و دەستکەوتنی کاری شایستە.',
    slogansSectionTitle: 'دروشمی سەرەکی و بنەماکانمان',
    slogansSectionSubtitle: 'ئەو فەلسەفەیەی کە مامۆستایان، خوێندکاران و ڕاوێژکارانمان هان دەدات ڕۆژانە.',
    pillarsSectionTitle: 'کۆڵەکە سەرەکییەکانی پەیاممان',
    pillarsSectionSubtitle: 'پابەندبوونە سەرەکییەکان کە سەرکەوتنی ئەکادیمی و گەشەی خوێندکارەکانمان مسۆگەر دەکەن.',
    noSlogansListed: 'لە ئێستادا هیچ دروشمێک تۆمار نەکراوە.',
    noPillarsListed: 'لە ئێستادا هیچ کۆڵەکەیەک تۆمار نەکراوە.',
    pillarPrefix: 'کۆڵەکەی',

    pageDocumentBadge: 'بەڵگەنامەی پەڕە',
    noContentYet: 'هێشتا هیچ ناوەڕۆکێک لەم پەڕەیەدا بڵاونەکراوەتەوە.',
  },
};

export function getT(lang: LanguageCode = 'en'): SiteTranslation {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}

export function getTranslation(key: string, lang: LanguageCode = 'en'): string {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return (dict as any)[key] || (TRANSLATIONS.en as any)[key] || key;
}
