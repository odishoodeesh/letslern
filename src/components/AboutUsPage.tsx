import React from 'react';
import { AboutUsData } from '../types';
import { Phone, MapPin, Instagram, Map, Info } from 'lucide-react';

interface AboutUsPageProps {
  logoUrl: string;
  aboutData: AboutUsData;
}

export function AboutUsPage({ logoUrl, aboutData }: AboutUsPageProps) {
  return (
    <section className="py-8 space-y-8 max-w-4xl mx-auto">
      {/* Main Card */}
      <div className="p-8 sm:p-12 rounded-3xl neu-card flex flex-col items-center text-center relative">
        <img src={logoUrl} alt="Logo" className="w-40 h-40 mb-6 object-contain" referrerPolicy="no-referrer" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-inset text-xs font-bold text-[#2563EB] mb-3">
          <Info className="w-4 h-4" />
          <span>Academy Information</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#3D4852] mb-6">About Us</h1>
        
        <div className="space-y-8 w-full max-w-xl text-[#6B7280]">
          {/* Welcome Intro */}
          {aboutData.intro && (
            <div className="p-5 rounded-2xl neu-inset bg-[#E0E5EC] text-base text-[#3D4852] leading-relaxed">
              <p>{aboutData.intro}</p>
            </div>
          )}

          {/* Contact Information */}
          {aboutData.phoneNumbers && aboutData.phoneNumbers.length > 0 && (
            <div className="p-6 rounded-2xl neu-card space-y-3">
              <div className="flex items-center justify-center gap-2 text-[#3D4852] font-bold text-lg">
                <Phone className="w-5 h-5 text-[#2563EB]" />
                <span>Contact Us</span>
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
                <span>Address</span>
              </div>
              <p className="text-sm font-semibold text-[#3D4852]">{aboutData.address}</p>
            </div>
          )}

          {/* Map Embed */}
          {aboutData.mapEmbedUrl && (
            <div className="p-4 rounded-3xl neu-inset bg-[#E0E5EC] space-y-2">
              <div className="flex items-center justify-center gap-2 text-[#3D4852] font-bold text-sm mb-2">
                <Map className="w-4 h-4 text-[#2563EB]" />
                <span>Find Us on Map</span>
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
                <span>Follow Us</span>
              </div>
              <div>
                <a 
                  href={aboutData.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#2563EB] hover:underline font-bold text-sm"
                >
                  Instagram Profile
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
