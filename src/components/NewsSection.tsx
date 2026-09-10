import React from 'react';
import { Newspaper, Calendar, Bell } from 'lucide-react';
import { NewsItem, LanguageCode } from '../types';
import { getT } from '../lib/translations';

interface NewsSectionProps {
  newsItems: NewsItem[];
  currentLanguage?: LanguageCode;
}

export function NewsSection({ newsItems, currentLanguage = 'en' }: NewsSectionProps) {
  const t = getT(currentLanguage);

  if (!newsItems || newsItems.length === 0) {
    return (
      <section id="news" className="py-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl neu-card text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto neu-inset">
            <Newspaper className="w-7 h-7" />
          </div>
          <h2 className="font-display text-2xl font-extrabold text-[#3D4852]">{t.newsEmptyTitle}</h2>
          <p className="text-sm text-[#6B7280] max-w-md mx-auto">
            {t.newsEmptyDesc}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D1D5DB] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#2563EB] mb-1.5">
            <Bell className="w-3.5 h-3.5" />
            <span>{t.newsBadge}</span>
          </div>
          <h2 className="font-display text-2xl font-extrabold text-[#3D4852]">{t.newsTitle}</h2>
        </div>
        <span className="text-xs font-semibold text-[#6B7280]">
          {newsItems.length} {newsItems.length === 1 ? t.announcementSingular : t.announcementPlural}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsItems.map((item) => (
          <article 
            key={item.id} 
            className="p-6 rounded-3xl bg-white neu-card flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow"
          >
            <div className="space-y-3">
              {item.imageUrl && (
                <div className="w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-[#E0E5EC] neu-inset shadow-inner">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date || t.announcementSingular}</span>
              </div>

              <h3 className="text-lg font-bold text-[#3D4852] leading-snug">
                {item.title}
              </h3>

              {item.summary && (
                <p className="text-sm text-[#6B7280] leading-relaxed whitespace-pre-line">
                  {item.summary}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

