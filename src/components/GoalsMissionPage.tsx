import React from 'react';
import { 
  Target, 
  Compass, 
  Sparkles, 
  Globe2, 
  TrendingUp, 
  Quote, 
  CheckCircle2,
  ArrowLeft,
  ArrowUp
} from 'lucide-react';
import { MissionSlogan, MissionPillar, Page, LanguageCode } from '../types';
import { getT } from '../lib/translations';

interface GoalsMissionPageProps {
  slogans: MissionSlogan[];
  pillars: MissionPillar[];
  page?: Page;
  onBackToHome?: () => void;
  currentLanguage?: LanguageCode;
}

export function GoalsMissionPage({ 
  slogans, 
  pillars, 
  page,
  onBackToHome,
  currentLanguage = 'en'
}: GoalsMissionPageProps) {
  const t = getT(currentLanguage);

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

      {/* Hero Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-inset text-xs font-bold text-[#2563EB] mb-4">
          <Target className="w-4 h-4" />
          <span>{t.goalsPageBadge}</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3D4852] tracking-tight">
          {t.goalsPageTitle}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#6B7280] max-w-3xl leading-relaxed">
          {t.goalsPageSubtitle}
        </p>
      </div>

      {/* 1. Slogans Banner Section */}
      <section className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#3D4852]">{t.slogansSectionTitle}</h2>
          <p className="text-sm text-[#6B7280]">
            {t.slogansSectionSubtitle} ({slogans.length} {currentLanguage === 'en' ? 'slogans' : ''})
          </p>
        </div>

        {slogans.length === 0 ? (
          <div className="p-8 rounded-3xl neu-inset text-center text-[#6B7280]">
            <p className="font-bold">{t.noSlogansListed}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {slogans.map((item, idx) => (
              <div 
                key={item.id}
                className="p-6 rounded-3xl neu-card flex flex-col justify-between relative overflow-hidden transition-all"
              >
                <div className="absolute top-4 right-4 text-[#2563EB]/10 pointer-events-none">
                  <Quote className="w-16 h-16" />
                </div>
                
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full neu-inset text-[#2563EB]">
                      {item.context}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-[#3D4852] tracking-tight">
                    "{item.quote}"
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E0E5EC] flex items-center justify-between text-xs font-bold text-[#3D4852]">
                  <span>{t.pillarPrefix} 0{idx + 1}</span>
                  <Sparkles className="w-4 h-4 text-[#2563EB]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. Strategic Pillars Section */}
      <section className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#3D4852]">{t.pillarsSectionTitle}</h2>
          <p className="text-sm text-[#6B7280]">
            {t.pillarsSectionSubtitle} ({pillars.length} {currentLanguage === 'en' ? 'pillars' : ''})
          </p>
        </div>

        {pillars.length === 0 ? (
          <div className="p-8 rounded-3xl neu-inset text-center text-[#6B7280]">
            <p className="font-bold">{t.noPillarsListed}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pillars.map((pillar, idx) => {
              const Icon = idx === 0 ? Compass : idx === 1 ? TrendingUp : Globe2;
              return (
                <div 
                  key={pillar.id} 
                  className="p-6 sm:p-8 rounded-3xl neu-card space-y-6 relative transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl neu-extruded flex items-center justify-center text-[#2563EB] shrink-0">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-xs font-bold px-2.5 py-1 bg-[#2563EB]/10 text-[#2563EB] rounded-full">
                          {pillar.badge}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#3D4852] mt-1">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {pillar.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl neu-inset">
                        <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#3D4852] font-medium leading-snug">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Global Impact Summary Bar */}
      <section className="p-8 rounded-3xl neu-card grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="font-display text-3xl font-extrabold text-[#2563EB]">{slogans.length}+</p>
          <p className="text-xs font-bold text-[#3D4852] mt-1">
            {currentLanguage === 'ar' ? 'شعارات أساسية' : currentLanguage === 'ku-badini' ? 'درووشمێن سەرەکی' : currentLanguage === 'ku-sorani' ? 'درووشمە سەرەکییەکان' : 'Core Mottos'}
          </p>
        </div>
        <div>
          <p className="font-display text-3xl font-extrabold text-[#2563EB]">100%</p>
          <p className="text-xs font-bold text-[#3D4852] mt-1">
            {currentLanguage === 'ar' ? 'إرشاد مخصص' : currentLanguage === 'ku-badini' ? 'رێنماییا تایبەت' : currentLanguage === 'ku-sorani' ? 'ڕێنمایی تایبەت' : 'Personal Guidance'}
          </p>
        </div>
        <div>
          <p className="font-display text-3xl font-extrabold text-[#2563EB]">Global</p>
          <p className="text-xs font-bold text-[#3D4852] mt-1">
            {currentLanguage === 'ar' ? 'شبكة جامعات دولية' : currentLanguage === 'ku-badini' ? 'تۆڕا زانکۆیێن جیهانی' : currentLanguage === 'ku-sorani' ? 'تۆڕی زانکۆ جیهانییەکان' : 'University Network'}
          </p>
        </div>
        <div>
          <p className="font-display text-3xl font-extrabold text-[#2563EB]">{pillars.length}</p>
          <p className="text-xs font-bold text-[#3D4852] mt-1">
            {currentLanguage === 'ar' ? 'ركائز استراتيجية' : currentLanguage === 'ku-badini' ? 'کۆڵەکێن ستراتیژی' : currentLanguage === 'ku-sorani' ? 'کۆڵەکە سەرەکییەکان' : 'Strategic Pillars'}
          </p>
        </div>
      </section>

      {/* Dynamic Sections */}
      {page?.sections && page.sections.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-[#E0E5EC]">
          <h2 className="font-display text-2xl font-extrabold text-[#3D4852]">Additional Mission Details</h2>
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

