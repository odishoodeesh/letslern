import React from 'react';
import { Home, Newspaper, BookOpen, LucideIcon, FileText, Info, Languages, Target, X } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarItems: { name: string }[];
  pages: Page[];
  currentPageId: string;
  setCurrentPageId: (id: string) => void;
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

export function Sidebar({ isOpen, onClose, sidebarItems, pages, currentPageId, setCurrentPageId }: SidebarProps) {
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
        className={`fixed inset-y-0 right-0 z-50 w-72 sm:w-80 bg-[#E0E5EC] p-6 shadow-[-8px_0_28px_rgba(163,177,198,0.45)] border-l border-white/40 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Sidebar navigation"
      >
        <div className="space-y-6">
          {/* Header of Sidebar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#D1D5DB]">
            <span className="font-display font-bold text-base text-[#3D4852] tracking-wide uppercase text-xs">
              Navigation
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl neu-card text-[#6B7280] hover:text-[#2563EB] cursor-pointer transition-colors"
              title="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Nav Links */}
          <nav className="flex flex-col gap-2.5">
            {sidebarItems.map((item) => {
              const Icon = IconMap[item.name] || Home;
              const isActive = currentPageId === item.name.toLowerCase();
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setCurrentPageId(item.name.toLowerCase());
                    onClose();
                  }}
                  className={`flex items-center gap-3.5 p-3.5 rounded-2xl transition-all w-full text-left cursor-pointer ${
                    isActive
                      ? 'text-[#2563EB] neu-inset font-bold bg-[#E0E5EC]'
                      : 'text-[#6B7280] hover:text-[#2563EB] hover:bg-[#E0E5EC] neu-card-inset font-medium'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-[#6B7280]'}`} />
                  <span className="text-sm font-semibold truncate">{item.name}</span>
                </button>
              );
            })}

            {/* Custom & Dynamic Pages */}
            {pages.length > 0 && (
              <div className="pt-4 mt-2 border-t border-[#D1D5DB] space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] px-2 block">
                  Curriculum & Pages
                </span>
                {pages.map((page) => {
                  const Icon = PageIconMap[page.id] || FileText;
                  const isActive = currentPageId === page.id;
                  return (
                    <button
                      key={page.id}
                      onClick={() => {
                        setCurrentPageId(page.id);
                        onClose();
                      }}
                      className={`flex items-center gap-3.5 p-3.5 rounded-2xl transition-all w-full text-left cursor-pointer ${
                        isActive
                          ? 'text-[#2563EB] neu-inset font-bold bg-[#E0E5EC]'
                          : 'text-[#6B7280] hover:text-[#2563EB] hover:bg-[#E0E5EC] neu-card-inset font-medium'
                      }`}
                    >
                      <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-[#6B7280]'}`} />
                      <span className="text-sm font-semibold truncate">{page.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </nav>
        </div>

        {/* Footer info in sidebar */}
        <div className="pt-6 mt-6 border-t border-[#D1D5DB] text-center">
          <p className="text-[11px] font-bold text-[#6B7280]">Let's Learn Academy</p>
          <p className="text-[10px] text-[#9CA3AF]">© {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </aside>
    </>
  );
}


