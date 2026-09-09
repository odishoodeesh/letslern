import React from 'react';
import { Menu, X } from 'lucide-react';

interface SchoolHeaderProps {
  onToggle: () => void;
  isOpen?: boolean;
  logoUrl: string;
  onLogoClick: () => void;
}

export function SchoolHeader({ onToggle, isOpen = false, logoUrl, onLogoClick }: SchoolHeaderProps) {
  return (
    <header className="sticky top-0 z-30 py-4 sm:py-5 px-4 sm:px-8 bg-[#E0E5EC] flex items-center justify-between border-b border-transparent shadow-[0_4px_12px_rgba(163,177,198,0.25)]">
      <div className="flex items-center gap-3">
        <button 
          onClick={onLogoClick} 
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl neu-extruded flex items-center justify-center overflow-hidden cursor-pointer hover:bg-[#d1d8e0] transition-colors p-1"
          title="Return to Home"
        >
          <img src={logoUrl} alt="Logo" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" referrerPolicy="no-referrer" />
        </button>
        <div>
          <span className="font-display font-extrabold text-lg sm:text-xl text-[#3D4852] block">
            Let's Learn
          </span>
          <span className="text-[11px] font-semibold text-[#6B7280] hidden sm:block">
            Excellence in Multilingual Education
          </span>
        </div>
      </div>
      
      {/* Three lines menu toggle button visible across PC, tablet, and mobile */}
      <button 
        onClick={onToggle} 
        className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center gap-2 ${
          isOpen 
            ? 'neu-inset text-[#2563EB] bg-[#E0E5EC]' 
            : 'neu-extruded text-[#3D4852] hover:text-[#2563EB] bg-[#E0E5EC]'
        }`}
        aria-label={isOpen ? "Close sidebar menu" : "Open sidebar menu"}
        title={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-[#2563EB]" />
        ) : (
          <Menu className="w-5 h-5 text-[#2563EB]" />
        )}
        <span className="text-xs font-bold text-[#3D4852] hidden sm:inline-block">
          {isOpen ? 'Close' : 'Menu'}
        </span>
      </button>
    </header>
  );
}

