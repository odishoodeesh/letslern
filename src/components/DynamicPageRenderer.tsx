import React from 'react';
import { Page, LanguageCode } from '../types';
import { FileText, ArrowLeft, ArrowUp } from 'lucide-react';
import { getT } from '../lib/translations';

interface DynamicPageRendererProps {
  page: Page;
  onBackToHome?: () => void;
  currentLanguage?: LanguageCode;
}

export function DynamicPageRenderer({ page, onBackToHome, currentLanguage = 'en' }: DynamicPageRendererProps) {
  const t = getT(currentLanguage);

  return (
    <section id={page.id} className="py-6 space-y-8">
      {/* Top Return to Home */}
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
          <FileText className="w-4 h-4" />
          <span>{t.pageDocumentBadge}</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3D4852] tracking-tight">
          {page.name}
        </h1>
      </div>

      {/* Sections List */}
      {page.sections.length === 0 ? (
        <div className="p-12 rounded-3xl neu-card text-center space-y-4">
          <p className="text-[#6B7280] font-medium">{t.noContentYet}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {page.sections.map((section) => (
            <div 
              key={section.id} 
              className="p-6 sm:p-8 rounded-3xl neu-card space-y-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-[#3D4852]">{section.title}</h3>

              {section.imageUrl && (
                <img 
                  src={section.imageUrl} 
                  alt={section.title} 
                  className="w-full max-h-96 object-cover rounded-2xl shadow-sm" 
                />
              )}

              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
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
    </section>
  );
}

