import React from 'react';
import { AboutUsData, LanguageCode } from '../types';
import { Phone, MapPin, Instagram, Map, Info, ArrowLeft, ArrowUp } from 'lucide-react';
import { getT } from '../lib/translations';

interface AboutUsPageProps {
  logoUrl: string;
  aboutData: AboutUsData;
  onBackToHome?: () => void;
  currentLanguage?: LanguageCode;
}

export function AboutUsPage({ logoUrl, aboutData, onBackToHome, currentLanguage = 'en' }: AboutUsPageProps) {
  const t = getT(currentLanguage);

  // If intro is empty or standard default, use localized default
  const introText = aboutData.intro?.trim() || t.aboutWelcomeDefault;

  return (
    <section className="py-6 space-y-6 max-w-4xl mx-auto">
      {onBackToHome && (
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl neu-card text-xs font-bold text-[#3D4852] hover:text-[#2563EB] cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {t.backToHome.replace('← ', '')}
        </button>
      )}

      {/* Main Card */}
      <div className="p-8 sm:p-12 rounded-3xl neu-card flex flex-col items-center text-center relative">
        <img src={logoUrl} alt="Logo" className="w-40 h-40 mb-6 object-contain" referrerPolicy="no-referrer" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-inset text-xs font-bold text-[#2563EB] mb-3">
          <Info className="w-4 h-4" />
          <span>{t.aboutBadge}</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#3D4852] mb-6">{t.aboutTitle}</h1>
        
        <div className="space-y-8 w-full max-w-xl text-[#6B7280]">
          {/* Welcome Intro */}
          {introText && (
            <div className="p-5 rounded-2xl neu-inset bg-[#E0E5EC] text-base text-[#3D4852] leading-relaxed">
              <p>{introText}</p>
            </div>
          )}

          {/* Contact Information */}
          {aboutData.phoneNumbers && aboutData.phoneNumbers.length > 0 && (
            <div className="p-6 rounded-2xl neu-card space-y-3">
              <div className="flex items-center justify-center gap-2 text-[#3D4852] font-bold text-lg">
                <Phone className="w-5 h-5 text-[#2563EB]" />
                <span>{t.contactUs}</span>
              </div>
              
              <div className="space-y-2">
                {aboutData.phoneNumbers.map((phone, idx) => (
                  <div key={idx} className="flex items-center justify-center gap-2 text-sm font-semibold text-[#3D4852]">
                    <a href={`tel:${phone}`} className="hover:text-[#2563EB] transition-colors">{phone}</a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Address */}
          {aboutData.address && (
            <div className="p-6 rounded-2xl neu-card space-y-2">
              <div className="flex items-center justify-center gap-2 text-[#3D4852] font-bold text-lg">
                <MapPin className="w-5 h-5 text-[#2563EB]" />
                <span>{t.addressTitle}</span>
              </div>
              <p className="text-sm font-semibold text-[#3D4852]">{aboutData.address}</p>
            </div>
          )}

          {/* Map Embed */}
          {aboutData.mapEmbedUrl && (
            <div className="p-4 rounded-3xl neu-inset bg-[#E0E5EC] space-y-2">
              <div className="flex items-center justify-center gap-2 text-[#3D4852] font-bold text-sm mb-2">
                <Map className="w-4 h-4 text-[#2563EB]" />
                <span>{t.findOnMap}</span>
              </div>
              <div className="flex justify-center overflow-hidden rounded-2xl">
                <iframe 
                  src={aboutData.mapEmbedUrl} 
                  width="100%" 
                  height="260" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="rounded-2xl max-w-lg shadow-inner"
                  title="Google Map location"
                ></iframe>
              </div>
            </div>
          )}

          {/* Instagram / Social */}
          {aboutData.instagramUrl && (
            <div className="p-6 rounded-2xl neu-card space-y-2">
              <div className="flex items-center justify-center gap-2 text-[#3D4852] font-bold text-lg">
                <Instagram className="w-5 h-5 text-[#2563EB]" />
                <span>{t.followUs}</span>
              </div>
              <div>
                <a 
                  href={aboutData.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#2563EB] hover:underline font-bold text-sm"
                >
                  {t.instagramProfile}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center pt-2 pb-6">
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

