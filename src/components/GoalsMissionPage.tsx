import React from 'react';
import { 
  Target, 
  Compass, 
  Sparkles, 
  Globe2, 
  TrendingUp, 
  Quote, 
  CheckCircle2 
} from 'lucide-react';
import { MissionSlogan, MissionPillar, Page } from '../types';

interface GoalsMissionPageProps {
  slogans: MissionSlogan[];
  pillars: MissionPillar[];
  page?: Page;
}

export function GoalsMissionPage({ 
  slogans, 
  pillars, 
  page 
}: GoalsMissionPageProps) {
  return (
    <div className="py-6 space-y-12">
      {/* Hero Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-inset text-xs font-bold text-[#2563EB] mb-4">
          <Target className="w-4 h-4" />
          <span>Our Vision & Guiding Principles</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3D4852] tracking-tight">
          Goals & Mission
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#6B7280] max-w-3xl leading-relaxed">
          Dedicated to transforming ambitious learners into globally empowered, multilingual scholars equipped for top international universities and rewarding careers.
        </p>
      </div>

      {/* 1. Slogans Banner Section */}
      <section className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#3D4852]">Our Core Slogans & Mottos</h2>
          <p className="text-sm text-[#6B7280]">
            The foundational philosophies that motivate our teachers, students, and mentors ({slogans.length} slogans).
          </p>
        </div>

        {slogans.length === 0 ? (
          <div className="p-8 rounded-3xl neu-inset text-center text-[#6B7280]">
            <p className="font-bold">No slogans currently listed.</p>
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
                  <span>Pillar 0{idx + 1}</span>
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
          <h2 className="font-display text-2xl font-extrabold text-[#3D4852]">Strategic Pillars of Our Mission</h2>
          <p className="text-sm text-[#6B7280]">
            Focused commitments driving our academic excellence and student success ({pillars.length} pillars).
          </p>
        </div>

        {pillars.length === 0 ? (
          <div className="p-8 rounded-3xl neu-inset text-center text-[#6B7280]">
            <p className="font-bold">No pillars currently listed.</p>
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
          <p className="text-xs font-bold text-[#3D4852] mt-1">Core Mottos</p>
          <p className="text-[11px] text-[#6B7280]">Daily Inspiration</p>
        </div>
        <div>
          <p className="font-display text-3xl font-extrabold text-[#2563EB]">100%</p>
          <p className="text-xs font-bold text-[#3D4852] mt-1">Personal Guidance</p>
          <p className="text-[11px] text-[#6B7280]">Admissions & Visa</p>
        </div>
        <div>
          <p className="font-display text-3xl font-extrabold text-[#2563EB]">Global</p>
          <p className="text-xs font-bold text-[#3D4852] mt-1">University Network</p>
          <p className="text-[11px] text-[#6B7280]">Europe, UK & Beyond</p>
        </div>
        <div>
          <p className="font-display text-3xl font-extrabold text-[#2563EB]">{pillars.length}</p>
          <p className="text-xs font-bold text-[#3D4852] mt-1">Strategic Pillars</p>
          <p className="text-[11px] text-[#6B7280]">Actionable Focus</p>
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
    </div>
  );
}
