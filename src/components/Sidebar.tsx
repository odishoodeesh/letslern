import React, { useState } from 'react';
import { Home, Newspaper, BookOpen, LucideIcon, FileText, Info, Languages, Target, X, Check, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { Page, LanguageCode } from '../types';
import { APP_LANGUAGES, getTranslation } from '../lib/translations';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarItems: { name: string }[];
  pages: Page[];
  currentPageId: string;
  setCurrentPageId: (id: string) => void;
  currentLanguage?: LanguageCode;
  onSelectLanguage?: (code: LanguageCode) => void;
}

const IconMap: Record<string, LucideIcon> = {
  Home: Home,
  News: Newspaper,
  Academics: BookOpen,
  About: Info,
};

const PageIconMap: Record<string, LucideIcon> = {
  'subjects-languages': Languages,
  'goals-mission': Target,
};

export function Sidebar({ 
  isOpen, 
  onClose, 
  sidebarItems, 
  pages, 
  currentPageId, 
  setCurrentPageId,
  currentLanguage = 'en',
  onSelectLanguage 
}: SidebarProps) {
  const [isLangOpen, setIsLangOpen] = useState(true);

  const activeLangOption = APP_LANGUAGES.find(l => l.id === currentLanguage) || APP_LANGUAGES[0];

  return (
    <>
      {/* Dimmed backdrop overlay - closes sidebar when clicked outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Fixed right-side drawer: stays fixed in position and does not scroll with the page */}
      <aside 
        className={`fixed inset-y-0 right-0 z-50 w-80 sm:w-96 bg-[#E0E5EC] p-5 sm:p-6 shadow-[-8px_0_28px_rgba(163,177,198,0.45)] border-l border-white/40 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Sidebar navigation"
      >
        <div className="space-y-5">
          {/* Header of Sidebar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[#D1D5DB]">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xs text-[#3D4852] tracking-wider uppercase">
                {getTranslation('navigation', currentLanguage)}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-[#2563EB]">
                {activeLangOption.nativeName}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl neu-card text-[#6B7280] hover:text-[#2563EB] cursor-pointer transition-colors"
              title="Close navigation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Nav Links */}
          <nav className="flex flex-col gap-2">
            {sidebarItems.map((item) => {
              const Icon = IconMap[item.name] || Home;
              const isActive = currentPageId === item.name.toLowerCase();
              const translatedLabel = getTranslation(item.name.toLowerCase(), currentLanguage);
              
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setCurrentPageId(item.name.toLowerCase());
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    onClose();
                  }}
                  className={`flex items-center gap-3.5 p-3 rounded-2xl transition-all w-full text-left cursor-pointer ${
                    isActive
                      ? 'text-[#2563EB] neu-inset font-bold bg-[#E0E5EC]'
                      : 'text-[#6B7280] hover:text-[#2563EB] hover:bg-[#E0E5EC] neu-card-inset font-medium'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-[#6B7280]'}`} />
                  <div className="min-w-0 flex-1 flex items-center justify-between">
                    <span className="text-sm font-semibold truncate">{translatedLabel || item.name}</span>
                    {translatedLabel && translatedLabel !== item.name && (
                      <span className="text-[10px] text-[#9CA3AF] opacity-75">{item.name}</span>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Custom & Dynamic Pages */}
            {pages.length > 0 && (
              <div className="pt-3 mt-1 border-t border-[#D1D5DB] space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] px-2 block">
                  {getTranslation('curriculum', currentLanguage)}
                </span>
                {pages.map((page) => {
                  const Icon = PageIconMap[page.id] || FileText;
                  const isActive = currentPageId === page.id;
                  return (
                    <button
                      key={page.id}
                      onClick={() => {
                        setCurrentPageId(page.id);
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        document.documentElement.scrollTop = 0;
                        document.body.scrollTop = 0;
                        onClose();
                      }}
                      className={`flex items-center gap-3.5 p-2.5 rounded-2xl transition-all w-full text-left cursor-pointer ${
                        isActive
                          ? 'text-[#2563EB] neu-inset font-bold bg-[#E0E5EC]'
                          : 'text-[#6B7280] hover:text-[#2563EB] hover:bg-[#E0E5EC] neu-card-inset font-medium'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-[#6B7280]'}`} />
                      <span className="text-xs font-semibold truncate">{page.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </nav>

          {/* LANGUAGE SELECTION IN SIDE MENU */}
          <div className="pt-3.5 border-t border-[#D1D5DB] space-y-2.5">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#3D4852] px-1 py-1 hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-blue-50 text-[#2563EB] neu-inset">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <span>{getTranslation('selectLanguage', currentLanguage)}</span>
              </div>
              {isLangOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#6B7280]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
              )}
            </button>

            {isLangOpen && (
              <div className="space-y-1.5 p-2 rounded-2xl bg-[#E0E5EC] neu-inset">
                {APP_LANGUAGES.map((lang) => {
                  const isSelected = currentLanguage === lang.id;
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => {
                        if (onSelectLanguage) {
                          onSelectLanguage(lang.id);
                        }
                      }}
                      className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between text-left cursor-pointer group ${
                        isSelected
                          ? 'bg-white text-[#2563EB] shadow-xs font-bold border border-blue-200'
                          : 'hover:bg-white/60 text-[#4B5563] hover:text-[#2563EB]'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#3D4852] group-hover:text-[#2563EB]">
                            {lang.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[11px] font-medium ${isSelected ? 'text-[#2563EB]' : 'text-[#6B7280]'}`} dir={lang.direction}>
                            {lang.nativeName}
                          </span>
                          {lang.note && (
                            <span className="text-[10px] text-[#9CA3AF]">
                              • {lang.note}
                            </span>
                          )}
                        </div>
                      </div>

                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-400/40 group-hover:border-[#2563EB] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer info in sidebar */}
        <div className="pt-4 mt-4 border-t border-[#D1D5DB] text-center">
          <p className="text-[11px] font-bold text-[#6B7280]">{getTranslation('academyName', currentLanguage)}</p>
          <p className="text-[10px] text-[#9CA3AF]">© {new Date().getFullYear()} {getTranslation('rightsReserved', currentLanguage)}</p>
        </div>
      </aside>
    </>
  );
}



