import React from 'react';
import { Page } from '../types';
import { FileText } from 'lucide-react';

interface DynamicPageRendererProps {
  page: Page;
}

export function DynamicPageRenderer({ page }: DynamicPageRendererProps) {
  return (
    <section id={page.id} className="py-8 space-y-8">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-inset text-xs font-bold text-[#2563EB] mb-4">
          <FileText className="w-4 h-4" />
          <span>Page Document</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3D4852] tracking-tight">
          {page.name}
        </h1>
      </div>

      {/* Sections List */}
      {page.sections.length === 0 ? (
        <div className="p-12 rounded-3xl neu-card text-center space-y-4">
          <p className="text-[#6B7280] font-medium">No content published on this page yet.</p>
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
    </section>
  );
}
