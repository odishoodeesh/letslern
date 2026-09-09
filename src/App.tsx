import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SchoolHeader } from './components/SchoolHeader';
import { HeroSection } from './components/HeroSection';
import { NewsSection } from './components/NewsSection';
import { AcademicsSection } from './components/AcademicsSection';
import { Sidebar } from './components/Sidebar';
import { AdminPanel } from './components/AdminPanel';
import { NewsItem, AcademicDepartment, Page, PageSection, LanguageOffer, SkillsTrainingModule, LanguageArticle, MissionSlogan, MissionPillar, AboutUsData } from './types';
import { DynamicPageRenderer } from './components/DynamicPageRenderer';
import { AboutUsPage } from './components/AboutUsPage';
import { SubjectsLanguagesPage } from './components/SubjectsLanguagesPage';
import { GoalsMissionPage } from './components/GoalsMissionPage';
import { Languages, Compass, ArrowRight, Phone, MapPin, Sparkles } from 'lucide-react';
import { 
  initialLanguages, 
  initialTrainingModules, 
  initialArticles, 
  initialSlogans, 
  initialPillars, 
  initialAboutUsData 
} from './data/initialData';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  const [logoUrl, setLogoUrl] = useState('https://i.ibb.co/CshZjp8L/erasebg-transformed-3.png');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [heroTopTitle, setHeroTopTitle] = useState("Let's Learn Institute");
  const [heroTopSubtitle, setHeroTopSubtitle] = useState('World Languages, International Exam Preparation & Global Study Guidance in Duhok.');
  const [heroOverlayTitle, setHeroOverlayTitle] = useState('');
  const [heroOverlaySubtitle, setHeroOverlaySubtitle] = useState('');
  const [heroBottomTitle, setHeroBottomTitle] = useState('');
  const [heroBottomDescription, setHeroBottomDescription] = useState('');

  // Extended page data state
  const [languages, setLanguages] = useState<LanguageOffer[]>(initialLanguages);
  const [trainingModules, setTrainingModules] = useState<SkillsTrainingModule[]>(initialTrainingModules);
  const [articles, setArticles] = useState<LanguageArticle[]>(initialArticles);
  const [slogans, setSlogans] = useState<MissionSlogan[]>(initialSlogans);
  const [pillars, setPillars] = useState<MissionPillar[]>(initialPillars);
  const [aboutData, setAboutData] = useState<AboutUsData>(initialAboutUsData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 750);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  
  const [academicDepartments, setAcademicDepartments] = useState<AcademicDepartment[]>([]);

  const [sidebarItems, setSidebarItems] = useState([
    { name: 'Home' },
    { name: 'About' },
  ]);

  const [pages, setPages] = useState<Page[]>([
    {
      id: 'subjects-languages',
      name: 'Subjects & Languages',
      sections: [
        {
          id: 'sl-1',
          title: 'Languages: English, German, Arabic, Turkish, French, and Dutch',
          content: 'Accredited multi-level language courses spanning A1 foundational to C2 professional fluency, academic research, and business mastery.',
        },
        {
          id: 'sl-2',
          title: 'Exam Preparation & Career Skills',
          content: 'Targeted simulation courses for IELTS, TOEFL, Goethe-Zertifikat, DELF, and TÖMER alongside professional CV workshops and mock interview simulations.',
        },
        {
          id: 'sl-3',
          title: 'Translation & Consultation Services',
          content: 'Official certified document and transcript translation services coupled with individual international study counseling and degree verification.',
        },
        {
          id: 'sl-4',
          title: 'Specialized Training & Language Services',
          content: 'Bespoke corporate workshops, technical terminology bootcamps, and flexible 1-on-1 language coaching.',
        },
      ],
    },
    {
      id: 'goals-mission',
      name: 'Goals & Mission',
      sections: [
        {
          id: 'gm-1',
          title: 'Study Abroad & Global Guidance',
          content: 'Assisting students with university enrollment, visa/admission support, international guidance, and career growth opportunities.',
        },
        {
          id: 'gm-2',
          title: 'Skill Development & Empowerment',
          content: 'Slogans highlight "Unlock your potential," "Build your future," and "Small Steps. Big Futures." We foster self-efficacy, critical thinking, and career readiness.',
        },
        {
          id: 'gm-3',
          title: 'Multilingual Fluency',
          content: 'Expanding academic, professional, and personal opportunities through language acquisition and cross-cultural empowerment.',
        },
      ],
    },
  ]);
  
  const [homeSections, setHomeSections] = useState<PageSection[]>([]);
  const [currentPageId, setCurrentPageId] = useState<string>('home');

  const handleYearClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 7) {
      setIsAdminOpen(true);
      setClickCount(0);
    }
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-[#E0E5EC] flex items-center justify-center z-50 overflow-hidden">
        <motion.img 
          src={logoUrl} 
          alt="Logo" 
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.88, 1, 1, 0.96]
          }} 
          transition={{ 
            duration: 3, 
            times: [0, 0.28, 0.72, 1],
            ease: "easeInOut"
          }}
          className="w-64 h-64 object-contain select-none pointer-events-none" 
        />
      </div>
    );
  }

  if (isAdminOpen) {
    return (
      <AdminPanel 
        onClose={() => setIsAdminOpen(false)} 
        logoUrl={logoUrl} setLogoUrl={setLogoUrl} 
        heroImageUrl={heroImageUrl} setHeroImageUrl={setHeroImageUrl}
        heroTopTitle={heroTopTitle} setHeroTopTitle={setHeroTopTitle}
        heroTopSubtitle={heroTopSubtitle} setHeroTopSubtitle={setHeroTopSubtitle}
        heroOverlayTitle={heroOverlayTitle} setHeroOverlayTitle={setHeroOverlayTitle}
        heroOverlaySubtitle={heroOverlaySubtitle} setHeroOverlaySubtitle={setHeroOverlaySubtitle}
        heroBottomTitle={heroBottomTitle} setHeroBottomTitle={setHeroBottomTitle}
        heroBottomDescription={heroBottomDescription} setHeroBottomDescription={setHeroBottomDescription}
        newsItems={newsItems} setNewsItems={setNewsItems}
        academicDepartments={academicDepartments} setAcademicDepartments={setAcademicDepartments}
        sidebarItems={sidebarItems} setSidebarItems={setSidebarItems}
        pages={pages} setPages={setPages} 
        currentPageId={currentPageId} setCurrentPageId={setCurrentPageId}
        homeSections={homeSections} setHomeSections={setHomeSections}
        languages={languages} setLanguages={setLanguages}
        trainingModules={trainingModules} setTrainingModules={setTrainingModules}
        articles={articles} setArticles={setArticles}
        slogans={slogans} setSlogans={setSlogans}
        pillars={pillars} setPillars={setPillars}
        aboutData={aboutData} setAboutData={setAboutData}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#E0E5EC] text-[#3D4852] font-sans selection:bg-[#2563EB] selection:text-white flex relative">
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            key="theme-color-flash"
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed inset-0 bg-[#2563EB] z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        sidebarItems={sidebarItems} 
        pages={pages} 
        currentPageId={currentPageId} 
        setCurrentPageId={setCurrentPageId} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <SchoolHeader 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
          isOpen={isSidebarOpen}
          logoUrl={logoUrl} 
          onLogoClick={() => setCurrentPageId('home')} 
        />
        
        {/* Main Content Viewport */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
          {currentPageId === 'home' ? (
            <>
              <HeroSection
                heroImageUrl={heroImageUrl}
                topTitle={heroTopTitle}
                topSubtitle={heroTopSubtitle}
                overlayTitle={heroOverlayTitle}
                overlaySubtitle={heroOverlaySubtitle}
                bottomTitle={heroBottomTitle}
                bottomDescription={heroBottomDescription}
                onNavigate={(pageId) => setCurrentPageId(pageId)}
              />

              {/* Core Offerings Overview */}
              <section className="py-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="font-display text-2xl font-extrabold text-[#3D4852]">
                      Academic & Language Programs
                    </h2>
                    <p className="text-sm text-[#6B7280]">
                      Explore our certified language courses, career skills, and international guidance.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Subjects & Languages Card */}
                  <div 
                    onClick={() => setCurrentPageId('subjects-languages')}
                    className="p-6 sm:p-8 rounded-3xl neu-card flex flex-col justify-between space-y-4 hover:shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(163,177,198,0.6)] transition-all cursor-pointer group"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl neu-extruded flex items-center justify-center text-[#2563EB]">
                        <Languages className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full neu-inset text-[#2563EB]">
                        Curriculum & Training
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#3D4852] group-hover:text-[#2563EB] transition-colors">
                        Subjects & Language Offerings
                      </h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        6 accredited languages (English, German, Arabic, Turkish, French, Dutch), specialized exam preparation (IELTS, TOEFL, Goethe, TÖMER), and official translations.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E0E5EC] flex items-center justify-between text-xs font-bold text-[#2563EB]">
                      <span>View All Languages & Training</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Goals & Mission Card */}
                  <div 
                    onClick={() => setCurrentPageId('goals-mission')}
                    className="p-6 sm:p-8 rounded-3xl neu-card flex flex-col justify-between space-y-4 hover:shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(163,177,198,0.6)] transition-all cursor-pointer group"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl neu-extruded flex items-center justify-center text-[#2563EB]">
                        <Compass className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full neu-inset text-[#2563EB]">
                        Vision & Pathways
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#3D4852] group-hover:text-[#2563EB] transition-colors">
                        Goals & Mission
                      </h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        Study abroad & global university guidance, visa support, skill development, and empowerment under our guiding motto: "Unlock your potential."
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E0E5EC] flex items-center justify-between text-xs font-bold text-[#2563EB]">
                      <span>Discover Our Mission & Guidance</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Real Contact & Duhok Location Strip */}
              <section className="p-6 sm:p-8 rounded-3xl neu-card flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#2563EB]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Visit Our Academy in Duhok</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#3D4852]">Have Questions or Ready to Enroll?</h3>
                  <p className="text-sm text-[#6B7280]">
                    Reach our admissions advisors by phone or visit our center in Duhok.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#3D4852] pt-1">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#2563EB]" /> 07500062119 / 07508423979
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#2563EB]" /> Duhok, Kurdistan Region
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPageId('about')}
                  className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer shrink-0 shadow-sm"
                >
                  Contact & Location Details
                </button>
              </section>

              {newsItems.length > 0 && <NewsSection newsItems={newsItems} />}
              {academicDepartments.length > 0 && <AcademicsSection academicDepartments={academicDepartments} />}
              
              {homeSections.map((section, hIdx) => (
                <section key={section.id} className="mt-8 bg-white p-6 sm:p-8 rounded-3xl neu-card relative">
                  {section.imageUrl && (
                    <img 
                      src={section.imageUrl} 
                      alt={section.title} 
                      className="w-full h-64 object-cover rounded-2xl mb-4" 
                    />
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-[#3D4852]">{section.title}</h3>
                  </div>
                  {section.type === 'schedule' ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-[#E0E5EC]">
                            <th className="p-3 text-xs font-bold uppercase tracking-wider text-[#2563EB]">Day</th>
                            <th className="p-3 text-xs font-bold uppercase tracking-wider text-[#2563EB]">Time</th>
                            <th className="p-3 text-xs font-bold uppercase tracking-wider text-[#2563EB]">Activity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.scheduleItems?.map(item => (
                            <tr key={item.id} className="border-t border-[#E0E5EC] hover:bg-[#F3F4F6] transition-colors">
                              <td className="p-3 font-semibold text-[#3D4852]">{item.day}</td>
                              <td className="p-3 text-[#6B7280]">{item.time}</td>
                              <td className="p-3 text-[#3D4852]">{item.activity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-[#6B7280] whitespace-pre-line leading-relaxed">{section.content}</p>
                  )}
                </section>
              ))}

              <div className="flex justify-center mt-12 mb-8">
                <img src={logoUrl} alt="Logo" className="w-44 h-44 object-contain" />
              </div>
            </>
          ) : currentPageId === 'about' ? (
            <AboutUsPage 
              logoUrl={logoUrl} 
              aboutData={aboutData}
            />
          ) : currentPageId === 'subjects-languages' ? (
            <SubjectsLanguagesPage 
              languages={languages}
              trainingModules={trainingModules}
              articles={articles}
              page={pages.find(p => p.id === 'subjects-languages')}
            />
          ) : currentPageId === 'goals-mission' ? (
            <GoalsMissionPage 
              slogans={slogans}
              pillars={pillars}
              page={pages.find(p => p.id === 'goals-mission')}
            />
          ) : currentPageId === 'news' ? (
            <div className="py-6"><NewsSection newsItems={newsItems} /></div>
          ) : currentPageId === 'academics' ? (
            <div className="py-6"><AcademicsSection academicDepartments={academicDepartments} /></div>
          ) : (
            <DynamicPageRenderer 
              page={pages.find(p => p.id === currentPageId) || { id: currentPageId, name: 'Page', sections: [] }} 
            />
          )}
        </main>

        {/* Tactile Neumorphic Footer */}
        <footer className="w-full bg-[#E0E5EC] py-10 px-4 sm:px-8 border-t border-transparent shadow-[0_-4px_12px_rgba(163,177,198,0.2)]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="font-display font-extrabold text-sm text-[#3D4852]">
              Let's Learn
            </p>
            <div className="flex items-center gap-2 text-xs text-[#6B7280] font-semibold">
              <span 
                onClick={handleYearClick} 
                className="cursor-pointer hover:text-[#2563EB] transition-colors select-none"
                title="Admin access"
              >
                © {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
