import React from 'react';
import { Languages, GraduationCap, Globe, Compass, Award } from 'lucide-react';
import { LanguageCode } from '../types';
import { getT } from '../lib/translations';

interface HeroSectionProps {
  heroImageUrl: string;
  topTitle?: string;
  topSubtitle?: string;
  overlayTitle?: string;
  overlaySubtitle?: string;
  bottomTitle?: string;
  bottomDescription?: string;
  onNavigate?: (pageId: string) => void;
  currentLanguage?: LanguageCode;
}

export function HeroSection({
  heroImageUrl,
  topTitle,
  topSubtitle,
  overlayTitle = '',
  overlaySubtitle = '',
  bottomTitle = '',
  bottomDescription = '',
  onNavigate,
  currentLanguage = 'en'
}: HeroSectionProps) {
  const t = getT(currentLanguage);

  const displayTopTitle = topTitle?.trim() || t.heroTopTitle;
  const displayTopSubtitle = topSubtitle?.trim() || t.heroTopSubtitle;

  const hasTopContent = Boolean(displayTopTitle || displayTopSubtitle);
  const hasOverlay = Boolean(overlayTitle?.trim() || overlaySubtitle?.trim());
  const hasBottomContent = Boolean(bottomTitle?.trim() || bottomDescription?.trim());
  const hasValidImage = Boolean(heroImageUrl && heroImageUrl.trim());

  return (
    <section id="home" className="pt-2 pb-10">
      {/* Text on top of hero image (between header and hero image, directly on page, not in a box) */}
      {hasTopContent && (
        <div className="mb-6 sm:mb-8">
          {displayTopTitle && (
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3D4852] tracking-tight leading-tight">
              {displayTopTitle}
            </h1>
          )}
          {displayTopSubtitle && (
            <p className="mt-3 text-base sm:text-lg text-[#6B7280] max-w-3xl leading-relaxed">
              {displayTopSubtitle}
            </p>
          )}
        </div>
      )}

      {/* Hero Container */}
      <div className="rounded-[40px] neu-card overflow-hidden">
        {hasValidImage ? (
          <div className="relative w-full h-80 sm:h-96 md:h-[440px] overflow-hidden">
            <img
              src={heroImageUrl}
              alt="Let's Lern Institute"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {hasOverlay && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
                {overlayTitle?.trim() && (
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-md tracking-tight">
                    {overlayTitle}
                  </h2>
                )}
                {overlaySubtitle?.trim() && (
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/90 max-w-2xl drop-shadow leading-relaxed">
                    {overlaySubtitle}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Clean tactile brand banner when no image is uploaded */
          <div className="p-8 sm:p-12 md:p-14 bg-gradient-to-br from-[#E0E5EC] via-[#E8EDF4] to-[#DEE4ED]">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-inset text-xs font-bold text-[#2563EB]">
                <Award className="w-4 h-4" />
                <span>{t.heroBadge}</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3D4852] tracking-tight leading-tight">
                {t.heroWelcomeTitle}
              </h2>

              <p className="text-base text-[#6B7280] leading-relaxed">
                {t.heroWelcomeDesc}
              </p>

              {onNavigate && (
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => onNavigate('about')}
                    className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer shadow-sm"
                  >
                    {t.heroAboutButton}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {hasBottomContent && (
          <div className="p-8 border-t border-[#E0E5EC]">
            {bottomTitle?.trim() && (
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#3D4852]">
                {bottomTitle}
              </h3>
            )}
            {bottomDescription?.trim() && (
              <p className="mt-3 text-[#6B7280] max-w-2xl leading-relaxed">
                {bottomDescription}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}



