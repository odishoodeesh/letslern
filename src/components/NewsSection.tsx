import React from 'react';
import { NewsItem } from '../types';

interface NewsSectionProps {
  newsItems: NewsItem[];
}

export function NewsSection({ newsItems }: NewsSectionProps) {
  return (
    <section id="news" className="py-12">
      <h2 className="font-display text-2xl font-extrabold mb-8 text-[#3D4852]">Latest News</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {newsItems.map((item) => (
          <div key={item.id} className="p-6 rounded-3xl neu-card">
            <span className="text-xs text-[#2563EB] font-semibold">{item.date}</span>
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded-2xl mb-4" />
            )}
            <h3 className="text-lg font-bold mt-2 text-[#3D4852]">{item.title}</h3>
            <p className="text-sm text-[#6B7280] mt-2">{item.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
