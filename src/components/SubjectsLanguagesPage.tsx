import React, { useState } from 'react';
import { 
  Languages, 
  GraduationCap, 
  FileCheck, 
  Briefcase, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Globe,
  ArrowLeft,
  ArrowUp
} from 'lucide-react';
import { LanguageOffer, SkillsTrainingModule, LanguageArticle, Page, LanguageCode } from '../types';
import { getT } from '../lib/translations';

interface SubjectsLanguagesPageProps {
  languages: LanguageOffer[];
  trainingModules: SkillsTrainingModule[];
  articles: LanguageArticle[];
  page?: Page;
  onBackToHome?: () => void;
  currentLanguage?: LanguageCode;
}

export function SubjectsLanguagesPage({ 
  languages, 
  trainingModules, 
  articles, 
  page,
  onBackToHome,
  currentLanguage = 'en'
}: SubjectsLanguagesPageProps) {
  const t = getT(currentLanguage);
  const [selectedArticleId, setSelectedArticleId] = useState<string>(articles[0]?.id || '');
  const activeArticle = articles.find(a => a.id === selectedArticleId) || articles[0];

  return (
    <div className="py-6 space-y-12">
      {/* Top Navigation */}
      {onBackToHome && (
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl neu-card text-xs font-bold text-[#3D4852] hover:text-[#2563EB] cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.backToHome.replace('← ', '')}
          </button>
        </div>
      )}

      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-inset text-xs font-bold text-[#2563EB] mb-4">
          <Languages className="w-4 h-4" />
          <span>{t.subjectsPageBadge}</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3D4852] tracking-tight">
          {t.subjectsPageTitle}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#6B7280] max-w-3xl leading-relaxed">
          {t.subjectsPageSubtitle}
        </p>
      </div>

      {/* 1. World Languages Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-[#3D4852]">{t.worldLanguagesTitle}</h2>
            <p className="text-sm text-[#6B7280]">
              {t.worldLanguagesSubtitle} ({languages.length} {currentLanguage === 'en' ? 'active languages' : ''})
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-white neu-card text-[#2563EB] rounded-full">
            <Globe className="w-3.5 h-3.5" /> {languages.length}
          </span>
        </div>

        {languages.length === 0 ? (
          <div className="p-8 rounded-3xl neu-inset text-center text-[#6B7280]">
            <p className="font-bold">{t.noLanguagesListed}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((lang) => (
              <div 
                key={lang.id}
                className="p-6 rounded-3xl neu-card flex flex-col justify-between transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center font-extrabold text-sm text-[#2563EB]">
                      {lang.code}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg text-[#3D4852]">{lang.name}</h3>
                      <p className="text-xs text-[#6B7280]">{lang.native}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold px-2 py-0.5 bg-white neu-card-inset text-[#2563EB] rounded-full">
                    {lang.levels}
                  </span>
                </div>

                <p className="text-sm text-[#6B7280] leading-relaxed mt-1">
                  {lang.description}
                </p>

                <div className="mt-5 pt-4 border-t border-[#E0E5EC]">
                  <p className="text-xs font-bold text-[#3D4852] uppercase tracking-wider mb-2">{t.coreFocusAreas}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {lang.focus.map((f, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-xl neu-inset text-[#3D4852]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. Academic & Skills Training Section */}
      <section className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#3D4852]">{t.trainingSectionTitle}</h2>
          <p className="text-sm text-[#6B7280]">{t.trainingSectionSubtitle}</p>
        </div>

        {trainingModules.length === 0 ? (
          <div className="p-8 rounded-3xl neu-inset text-center text-[#6B7280]">
            <p className="font-bold">{t.noTrainingListed}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainingModules.map((module, idx) => (
              <div 
                key={module.id} 
                className="p-6 rounded-3xl neu-card space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 rounded-2xl neu-extruded flex items-center justify-center text-[#2563EB]">
                      {idx % 3 === 0 ? <GraduationCap className="w-6 h-6" /> : idx % 3 === 1 ? <FileCheck className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#3D4852]">{module.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed mt-2">
                    {module.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-[#3D4852] font-semibold border-t border-[#E0E5EC]">
                  {module.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Language Learning Articles Section */}
      {articles && articles.length > 0 && (
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#2563EB] mb-2">
              <BookOpen className="w-3.5 h-3.5" /> <span>{t.articlesSectionTitle}</span>
            </div>
            <h2 className="font-display text-2xl font-extrabold text-[#3D4852]">
              {t.articlesSectionTitle}
            </h2>
            <p className="text-sm text-[#6B7280]">
              {t.articlesSectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Article Selector Column */}
            <div className="space-y-3">
              {articles.map((art) => {
                const isSelected = activeArticle?.id === art.id;
                return (
                  <button
                    key={art.id}
                    onClick={() => setSelectedArticleId(art.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected 
                        ? 'neu-inset text-[#2563EB] font-bold ring-2 ring-[#2563EB]/40 bg-[#E0E5EC]' 
                        : 'neu-card hover:text-[#3D4852] text-[#6B7280]'
                    }`}
                  >
                    <p className="text-xs font-semibold text-[#2563EB] mb-1">{art.languages}</p>
                    <h4 className="text-sm font-bold text-[#3D4852]">{art.title}</h4>
                    <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">{art.summary}</p>
                  </button>
                );
              })}
            </div>

            {/* Active Article Detail View */}
            <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl neu-card space-y-4">
              {activeArticle ? (
                <div>
                  <span className="text-xs font-bold px-3 py-1 bg-[#2563EB]/10 text-[#2563EB] rounded-full">
                    {t.articlesSectionTitle}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#3D4852] mt-3">
                    {activeArticle.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#2563EB] mt-1">
                    Featured: {activeArticle.languages}
                  </p>
                  <div className="mt-4 p-5 rounded-2xl neu-inset bg-[#E0E5EC] text-sm text-[#3D4852] leading-relaxed whitespace-pre-line">
                    {activeArticle.content}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* 4. Dynamic Custom Sections */}
      {page?.sections && page.sections.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-[#E0E5EC]">
          <h2 className="font-display text-2xl font-extrabold text-[#3D4852]">Additional Program Details</h2>
          <div className="space-y-6">
            {page.sections.map((section) => (
              <div key={section.id} className="p-6 sm:p-8 rounded-3xl neu-card">
                {section.imageUrl && (
                  <img src={section.imageUrl} alt={section.title} className="w-full max-h-96 object-cover rounded-2xl mb-4" />
                )}
                <h3 className="text-xl font-bold text-[#3D4852]">{section.title}</h3>
                <p className="text-sm sm:text-base text-[#6B7280] mt-2 whitespace-pre-line leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Back to Top */}
      <div className="flex justify-center pt-4 pb-4">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2.5 rounded-2xl neu-card text-xs font-bold text-[#6B7280] hover:text-[#2563EB] flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowUp className="w-4 h-4" /> {t.backToTop.replace('↑ ', '')}
        </button>
      </div>
    </div>
  );
}

