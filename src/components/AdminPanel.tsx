import React, { useState } from 'react';
import { 
  NewsItem, 
  AcademicDepartment, 
  Page, 
  PageSection, 
  LanguageOffer, 
  SkillsTrainingModule, 
  LanguageArticle, 
  MissionSlogan, 
  MissionPillar,
  AboutUsData 
} from '../types';
import { Trash2, Plus, Edit3, Image as ImageIcon, X, Loader2, CloudUpload, Check } from 'lucide-react';
import { uploadImageToSupabase, STORAGE_BUCKET } from '../lib/supabase';

interface AdminPanelProps {
  onClose: () => void;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  heroImageUrl: string;
  setHeroImageUrl: (url: string) => void;
  heroTopTitle: string;
  setHeroTopTitle: (title: string) => void;
  heroTopSubtitle: string;
  setHeroTopSubtitle: (subtitle: string) => void;
  heroOverlayTitle: string;
  setHeroOverlayTitle: (title: string) => void;
  heroOverlaySubtitle: string;
  setHeroOverlaySubtitle: (subtitle: string) => void;
  heroBottomTitle: string;
  setHeroBottomTitle: (title: string) => void;
  heroBottomDescription: string;
  setHeroBottomDescription: (desc: string) => void;
  newsItems: NewsItem[];
  setNewsItems: (items: NewsItem[]) => void;
  academicDepartments: AcademicDepartment[];
  setAcademicDepartments: (deps: AcademicDepartment[]) => void;
  pages: Page[];
  setPages: (pages: Page[]) => void;
  currentPageId: string;
  setCurrentPageId: (id: string) => void;
  setSidebarItems: (items: { name: string }[]) => void;
  sidebarItems: { name: string }[];
  homeSections: PageSection[];
  setHomeSections: (sections: PageSection[]) => void;
  // Extended page states
  languages: LanguageOffer[];
  setLanguages: (languages: LanguageOffer[]) => void;
  trainingModules: SkillsTrainingModule[];
  setTrainingModules: (modules: SkillsTrainingModule[]) => void;
  articles: LanguageArticle[];
  setArticles: (articles: LanguageArticle[]) => void;
  slogans: MissionSlogan[];
  setSlogans: (slogans: MissionSlogan[]) => void;
  pillars: MissionPillar[];
  setPillars: (pillars: MissionPillar[]) => void;
  aboutData: AboutUsData;
  setAboutData: (data: AboutUsData) => void;
}

const ImageUploader = ({ onUpload, currentUrl }: { onUpload: (url: string) => void, currentUrl: string }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('Uploading to Supabase bucket...');

    try {
      const publicUrl = await uploadImageToSupabase(file);
      onUpload(publicUrl);
      setUploadStatus('Uploaded to Supabase bucket!');
      setTimeout(() => setUploadStatus(null), 3000);
    } catch (err: any) {
      console.warn('Direct bucket upload failed, using local preview:', err?.message || err);
      // Fallback
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
        setUploadStatus('Local preview saved (verify bucket public RLS policy)');
        setTimeout(() => setUploadStatus(null), 4000);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input 
          type="file" 
          disabled={isUploading}
          onChange={handleFileChange} 
          className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#2563EB] file:text-white hover:file:bg-[#1D4ED8] cursor-pointer disabled:opacity-50" 
        />
        {isUploading && (
          <div className="flex items-center gap-1.5 text-xs text-[#2563EB] shrink-0">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Uploading...</span>
          </div>
        )}
      </div>

      {uploadStatus && (
        <p className="text-[11px] font-semibold text-[#2563EB] flex items-center gap-1">
          <CloudUpload className="w-3 h-3" />
          {uploadStatus}
        </p>
      )}

      {currentUrl && (
        <div className="relative inline-block mt-1">
          <img src={currentUrl} alt="Preview" className="h-16 rounded-xl object-cover neu-inset" />
          <button
            type="button"
            onClick={() => onUpload('')}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

// Safe In-UI Deletion Button with Confirmation (Never blocked by iframe or browser alerts)
const DeleteButton = ({ 
  onDelete, 
  title = "Delete item", 
  label 
}: { 
  onDelete: () => void; 
  title?: string; 
  label?: string; 
}) => {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="inline-flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
            setConfirming(false);
          }}
          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1 transition-all"
        >
          <Check className="w-3.5 h-3.5" /> Confirm
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setConfirming(false);
          }}
          className="px-2.5 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs font-semibold transition-all"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setConfirming(true);
      }}
      className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold shrink-0 border border-red-200 hover:border-transparent"
      title={title}
    >
      <Trash2 className="w-4 h-4" />
      {label && <span>{label}</span>}
    </button>
  );
};

export function AdminPanel({
  onClose,
  logoUrl,
  setLogoUrl,
  heroImageUrl,
  setHeroImageUrl,
  heroTopTitle,
  setHeroTopTitle,
  heroTopSubtitle,
  setHeroTopSubtitle,
  heroOverlayTitle,
  setHeroOverlayTitle,
  heroOverlaySubtitle,
  setHeroOverlaySubtitle,
  heroBottomTitle,
  setHeroBottomTitle,
  heroBottomDescription,
  setHeroBottomDescription,
  newsItems,
  setNewsItems,
  academicDepartments,
  setAcademicDepartments,
  pages,
  setPages,
  currentPageId,
  setCurrentPageId,
  sidebarItems,
  setSidebarItems,
  homeSections,
  setHomeSections,
  languages,
  setLanguages,
  trainingModules,
  setTrainingModules,
  articles,
  setArticles,
  slogans,
  setSlogans,
  pillars,
  setPillars,
  aboutData,
  setAboutData,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('Pages');
  const tabs = [
    'Pages',
    'Subjects & Languages',
    'Goals & Mission',
    'About Us',
    'Home Sections',
    'Hero & Branding',
    'News',
    'Academics'
  ];

  return (
    <div className="min-h-screen bg-[#E0E5EC] p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-3xl font-extrabold text-[#3D4852]">Master Admin Panel</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Supabase Storage: bucket
              </span>
            </div>
            <p className="text-sm text-[#6B7280]">Full editing, image uploading to Supabase, and management for all academy sections</p>
          </div>
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors text-white rounded-2xl font-bold text-sm shadow-md"
          >
            Done & Return to Site
          </button>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-2 rounded-2xl neu-inset bg-[#E0E5EC]">
          {tabs.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab 
                  ? 'bg-[#2563EB] text-white shadow-md' 
                  : 'bg-white text-[#3D4852] neu-card hover:text-[#2563EB]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab 1: Pages Management */}
        {activeTab === 'Pages' && (
          <section className="bg-white p-6 rounded-3xl neu-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#3D4852]">All Pages & Custom Sections</h2>
                <p className="text-xs text-[#6B7280]">Edit names, add/remove sections, or delete whole pages.</p>
              </div>
              <button 
                onClick={() => {
                  const newCount = pages.length + 1;
                  const name = `Custom Page ${newCount}`;
                  const newId = `page-${Date.now()}`;
                  const newPage: Page = { id: newId, name, sections: [] };
                  setPages([...pages, newPage]);
                }} 
                className="px-3.5 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#1D4ED8]"
              >
                <Plus className="w-4 h-4" /> Add New Page
              </button>
            </div>

            <div className="space-y-6">
              {pages.map((page, pIdx) => (
                <div key={page.id} className="p-6 bg-[#E0E5EC] rounded-2xl space-y-4 relative border border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D1D5DB] pb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-xs font-bold px-2.5 py-1 bg-white neu-card rounded-lg text-[#2563EB]">
                        ID: {page.id}
                      </span>
                      <input 
                        type="text" 
                        value={page.name} 
                        onChange={(e) => {
                          const updated = [...pages];
                          updated[pIdx].name = e.target.value;
                          setPages(updated);
                        }} 
                        className="p-2 rounded-xl neu-extruded font-bold text-base text-[#3D4852] bg-white flex-1 max-w-sm" 
                        placeholder="Page Name"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setCurrentPageId(page.id);
                          onClose();
                        }} 
                        className="px-3 py-1.5 bg-white neu-card hover:text-[#2563EB] text-xs font-bold rounded-xl"
                      >
                        View Page
                      </button>
                      <DeleteButton
                        onDelete={() => setPages(pages.filter((_, i) => i !== pIdx))}
                        label="Delete Page"
                        title="Delete entire page"
                      />
                    </div>
                  </div>

                  {/* Sections of this page */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#3D4852]">
                      Sections ({page.sections.length})
                    </h3>

                    {page.sections.map((section, sIdx) => (
                      <div key={section.id} className="p-4 bg-white rounded-xl space-y-3 relative neu-card">
                        <div className="flex items-center justify-between gap-2">
                          <input 
                            type="text" 
                            value={section.title} 
                            onChange={(e) => {
                              const updated = [...pages];
                              updated[pIdx].sections[sIdx].title = e.target.value;
                              setPages(updated);
                            }} 
                            className="w-full p-2 rounded-lg neu-extruded text-sm font-bold" 
                            placeholder="Section Title" 
                          />
                          <DeleteButton
                            onDelete={() => {
                              const updated = [...pages];
                              updated[pIdx].sections = updated[pIdx].sections.filter((_, i) => i !== sIdx);
                              setPages(updated);
                            }}
                            title="Delete section"
                          />
                        </div>

                        <textarea 
                          rows={3}
                          value={section.content} 
                          onChange={(e) => {
                            const updated = [...pages];
                            updated[pIdx].sections[sIdx].content = e.target.value;
                            setPages(updated);
                          }} 
                          className="w-full p-2 rounded-lg neu-extruded text-xs" 
                          placeholder="Section Content" 
                        />

                        <div>
                          <label className="block text-[11px] font-bold text-[#6B7280] mb-1">Section Image (Optional)</label>
                          <ImageUploader 
                            onUpload={(url) => {
                              const updated = [...pages];
                              updated[pIdx].sections[sIdx].imageUrl = url || undefined;
                              setPages(updated);
                            }} 
                            currentUrl={section.imageUrl || ''} 
                          />
                        </div>
                      </div>
                    ))}

                    <button 
                      onClick={() => {
                        const updated = [...pages];
                        updated[pIdx].sections.push({
                          id: Date.now().toString(),
                          title: 'New Section',
                          content: ''
                        });
                        setPages(updated);
                      }} 
                      className="text-xs text-[#2563EB] font-bold inline-flex items-center gap-1 hover:underline pt-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Section to {page.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 2: Subjects & Languages */}
        {activeTab === 'Subjects & Languages' && (
          <section className="bg-white p-6 rounded-3xl neu-card space-y-8">
            {/* World Languages */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#3D4852]">World Language Offerings</h2>
                  <p className="text-xs text-[#6B7280]">Edit details or delete specific language programs.</p>
                </div>
                <button 
                  onClick={() => {
                    const newLang: LanguageOffer = {
                      id: `lang-${Date.now()}`,
                      name: 'New Language',
                      native: '',
                      code: 'NEW',
                      description: 'Course details...',
                      levels: 'A1 to C1',
                      focus: ['Conversation', 'Grammar'],
                    };
                    setLanguages([...languages, newLang]);
                  }} 
                  className="px-3 py-1.5 bg-[#2563EB] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#1D4ED8]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Language
                </button>
              </div>

              <div className="space-y-3">
                {languages.map((lang, idx) => (
                  <div key={lang.id} className="p-4 bg-[#E0E5EC] rounded-2xl space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                        <input 
                          type="text" 
                          value={lang.name} 
                          onChange={(e) => {
                            const updated = [...languages];
                            updated[idx].name = e.target.value;
                            setLanguages(updated);
                          }} 
                          placeholder="Name" 
                          className="p-2 rounded-xl neu-extruded bg-white text-xs font-bold"
                        />
                        <input 
                          type="text" 
                          value={lang.native} 
                          onChange={(e) => {
                            const updated = [...languages];
                            updated[idx].native = e.target.value;
                            setLanguages(updated);
                          }} 
                          placeholder="Native Script" 
                          className="p-2 rounded-xl neu-extruded bg-white text-xs"
                        />
                        <input 
                          type="text" 
                          value={lang.levels} 
                          onChange={(e) => {
                            const updated = [...languages];
                            updated[idx].levels = e.target.value;
                            setLanguages(updated);
                          }} 
                          placeholder="Levels (e.g. A1-C1)" 
                          className="p-2 rounded-xl neu-extruded bg-white text-xs"
                        />
                      </div>
                      <DeleteButton
                        onDelete={() => setLanguages(languages.filter((_, i) => i !== idx))}
                        title="Delete language"
                      />
                    </div>
                    <textarea 
                      rows={2}
                      value={lang.description} 
                      onChange={(e) => {
                        const updated = [...languages];
                        updated[idx].description = e.target.value;
                        setLanguages(updated);
                      }} 
                      placeholder="Course description" 
                      className="w-full p-2 rounded-xl neu-extruded bg-white text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Academic & Skills Modules */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#3D4852]">Academic & Skills Training Modules</h2>
                  <p className="text-xs text-[#6B7280]">Exam prep, translations, and career consulting programs.</p>
                </div>
                <button 
                  onClick={() => {
                    const newModule: SkillsTrainingModule = {
                      id: `train-${Date.now()}`,
                      title: 'New Training Program',
                      description: 'Description of program...',
                      points: ['Key benefit 1', 'Key benefit 2'],
                    };
                    setTrainingModules([...trainingModules, newModule]);
                  }} 
                  className="px-3 py-1.5 bg-[#2563EB] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#1D4ED8]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Module
                </button>
              </div>

              <div className="space-y-3">
                {trainingModules.map((m, idx) => (
                  <div key={m.id} className="p-4 bg-[#E0E5EC] rounded-2xl space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <input 
                        type="text" 
                        value={m.title} 
                        onChange={(e) => {
                          const updated = [...trainingModules];
                          updated[idx].title = e.target.value;
                          setTrainingModules(updated);
                        }} 
                        placeholder="Module Title" 
                        className="p-2 rounded-xl neu-extruded bg-white text-xs font-bold flex-1"
                      />
                      <DeleteButton
                        onDelete={() => setTrainingModules(trainingModules.filter((_, i) => i !== idx))}
                        title="Delete module"
                      />
                    </div>
                    <textarea 
                      rows={2}
                      value={m.description} 
                      onChange={(e) => {
                        const updated = [...trainingModules];
                        updated[idx].description = e.target.value;
                        setTrainingModules(updated);
                      }} 
                      placeholder="Module description" 
                      className="w-full p-2 rounded-xl neu-extruded bg-white text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Language Articles */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#3D4852]">Language Learning Articles</h2>
                  <p className="text-xs text-[#6B7280]">Comparative grammar and linguistic insights.</p>
                </div>
                <button 
                  onClick={() => {
                    const newArt: LanguageArticle = {
                      id: `art-${Date.now()}`,
                      title: 'New Article Title',
                      languages: 'English, German',
                      summary: 'Brief summary',
                      content: 'Full article body...',
                    };
                    setArticles([...articles, newArt]);
                  }} 
                  className="px-3 py-1.5 bg-[#2563EB] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#1D4ED8]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Article
                </button>
              </div>

              <div className="space-y-3">
                {articles.map((art, idx) => (
                  <div key={art.id} className="p-4 bg-[#E0E5EC] rounded-2xl space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <input 
                        type="text" 
                        value={art.title} 
                        onChange={(e) => {
                          const updated = [...articles];
                          updated[idx].title = e.target.value;
                          setArticles(updated);
                        }} 
                        placeholder="Article Title" 
                        className="p-2 rounded-xl neu-extruded bg-white text-xs font-bold flex-1"
                      />
                      <DeleteButton
                        onDelete={() => setArticles(articles.filter((_, i) => i !== idx))}
                        title="Delete article"
                      />
                    </div>
                    <input 
                      type="text" 
                      value={art.languages} 
                      onChange={(e) => {
                        const updated = [...articles];
                        updated[idx].languages = e.target.value;
                        setArticles(updated);
                      }} 
                      placeholder="Languages analyzed" 
                      className="w-full p-2 rounded-xl neu-extruded bg-white text-xs"
                    />
                    <textarea 
                      rows={3}
                      value={art.content} 
                      onChange={(e) => {
                        const updated = [...articles];
                        updated[idx].content = e.target.value;
                        setArticles(updated);
                      }} 
                      placeholder="Article content" 
                      className="w-full p-2 rounded-xl neu-extruded bg-white text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Goals & Mission */}
        {activeTab === 'Goals & Mission' && (
          <section className="bg-white p-6 rounded-3xl neu-card space-y-8">
            {/* Mottos & Slogans */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#3D4852]">Core Slogans & Mottos</h2>
                  <p className="text-xs text-[#6B7280]">Edit or delete slogans displayed on the mission page.</p>
                </div>
                <button 
                  onClick={() => {
                    const newSlogan: MissionSlogan = {
                      id: `slogan-${Date.now()}`,
                      quote: 'New Empowering Quote',
                      context: 'Vision & Progress',
                      description: 'Explain the deeper meaning...',
                    };
                    setSlogans([...slogans, newSlogan]);
                  }} 
                  className="px-3 py-1.5 bg-[#2563EB] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#1D4ED8]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Slogan
                </button>
              </div>

              <div className="space-y-3">
                {slogans.map((item, idx) => (
                  <div key={item.id} className="p-4 bg-[#E0E5EC] rounded-2xl space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <input 
                        type="text" 
                        value={item.quote} 
                        onChange={(e) => {
                          const updated = [...slogans];
                          updated[idx].quote = e.target.value;
                          setSlogans(updated);
                        }} 
                        placeholder="Quote / Motto" 
                        className="p-2 rounded-xl neu-extruded bg-white text-xs font-bold flex-1"
                      />
                      <input 
                        type="text" 
                        value={item.context} 
                        onChange={(e) => {
                          const updated = [...slogans];
                          updated[idx].context = e.target.value;
                          setSlogans(updated);
                        }} 
                        placeholder="Context / Badge" 
                        className="p-2 rounded-xl neu-extruded bg-white text-xs max-w-xs"
                      />
                      <DeleteButton
                        onDelete={() => setSlogans(slogans.filter((_, i) => i !== idx))}
                        title="Delete slogan"
                      />
                    </div>
                    <textarea 
                      rows={2}
                      value={item.description} 
                      onChange={(e) => {
                        const updated = [...slogans];
                        updated[idx].description = e.target.value;
                        setSlogans(updated);
                      }} 
                      placeholder="Description" 
                      className="w-full p-2 rounded-xl neu-extruded bg-white text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Pillars */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#3D4852]">Strategic Mission Pillars</h2>
                  <p className="text-xs text-[#6B7280]">Study abroad, skills empowerment, multilingual mastery.</p>
                </div>
                <button 
                  onClick={() => {
                    const newPillar: MissionPillar = {
                      id: `pillar-${Date.now()}`,
                      title: 'New Strategic Pillar',
                      badge: 'Focus Area',
                      description: 'Pillar description...',
                      points: ['Action point 1', 'Action point 2'],
                    };
                    setPillars([...pillars, newPillar]);
                  }} 
                  className="px-3 py-1.5 bg-[#2563EB] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#1D4ED8]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Pillar
                </button>
              </div>

              <div className="space-y-3">
                {pillars.map((pillar, idx) => (
                  <div key={pillar.id} className="p-4 bg-[#E0E5EC] rounded-2xl space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <input 
                        type="text" 
                        value={pillar.title} 
                        onChange={(e) => {
                          const updated = [...pillars];
                          updated[idx].title = e.target.value;
                          setPillars(updated);
                        }} 
                        placeholder="Pillar Title" 
                        className="p-2 rounded-xl neu-extruded bg-white text-xs font-bold flex-1"
                      />
                      <input 
                        type="text" 
                        value={pillar.badge} 
                        onChange={(e) => {
                          const updated = [...pillars];
                          updated[idx].badge = e.target.value;
                          setPillars(updated);
                        }} 
                        placeholder="Badge" 
                        className="p-2 rounded-xl neu-extruded bg-white text-xs max-w-xs"
                      />
                      <DeleteButton
                        onDelete={() => setPillars(pillars.filter((_, i) => i !== idx))}
                        title="Delete pillar"
                      />
                    </div>
                    <textarea 
                      rows={2}
                      value={pillar.description} 
                      onChange={(e) => {
                        const updated = [...pillars];
                        updated[idx].description = e.target.value;
                        setPillars(updated);
                      }} 
                      placeholder="Pillar description" 
                      className="w-full p-2 rounded-xl neu-extruded bg-white text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tab 4: About Us */}
        {activeTab === 'About Us' && (
          <section className="bg-white p-6 rounded-3xl neu-card space-y-4">
            <h2 className="text-xl font-bold text-[#3D4852]">About Us Details</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#3D4852] mb-1">Introductory Message</label>
                <textarea 
                  rows={3}
                  value={aboutData.intro}
                  onChange={(e) => setAboutData({ ...aboutData, intro: e.target.value })}
                  className="w-full p-3 rounded-xl neu-extruded bg-[#E0E5EC] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3D4852] mb-1">Contact Phone Numbers (comma separated)</label>
                <input 
                  type="text" 
                  value={aboutData.phoneNumbers.join(', ')}
                  onChange={(e) => setAboutData({ ...aboutData, phoneNumbers: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  className="w-full p-3 rounded-xl neu-extruded bg-[#E0E5EC] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3D4852] mb-1">Address</label>
                <input 
                  type="text" 
                  value={aboutData.address}
                  onChange={(e) => setAboutData({ ...aboutData, address: e.target.value })}
                  className="w-full p-3 rounded-xl neu-extruded bg-[#E0E5EC] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3D4852] mb-1">Instagram URL</label>
                <input 
                  type="text" 
                  value={aboutData.instagramUrl}
                  onChange={(e) => setAboutData({ ...aboutData, instagramUrl: e.target.value })}
                  className="w-full p-3 rounded-xl neu-extruded bg-[#E0E5EC] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3D4852] mb-1">Google Maps Embed URL</label>
                <input 
                  type="text" 
                  value={aboutData.mapEmbedUrl}
                  onChange={(e) => setAboutData({ ...aboutData, mapEmbedUrl: e.target.value })}
                  className="w-full p-3 rounded-xl neu-extruded bg-[#E0E5EC] text-sm"
                />
              </div>
            </div>
          </section>
        )}

        {/* Tab 5: Home Sections */}
        {activeTab === 'Home Sections' && (
          <section className="bg-white p-6 rounded-3xl neu-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#3D4852]">Home Dynamic Sections</h2>
                <p className="text-xs text-[#6B7280]">Add tables, schedules, or custom promotional blocks.</p>
              </div>
              <button 
                onClick={() => setHomeSections([...homeSections, { id: Date.now().toString(), title: 'New Home Section', content: '', type: 'text' }])} 
                className="px-3 py-1.5 bg-[#2563EB] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#1D4ED8]"
              >
                <Plus className="w-3.5 h-3.5" /> Add Section
              </button>
            </div>

            {homeSections.map((section, index) => (
              <div key={section.id} className="p-6 bg-[#E0E5EC] rounded-2xl space-y-3 relative">
                <div className="flex items-center justify-between gap-2">
                  <input 
                    type="text" 
                    value={section.title} 
                    onChange={(e) => {
                      const newSections = [...homeSections];
                      newSections[index].title = e.target.value;
                      setHomeSections(newSections);
                    }} 
                    className="w-full p-3 rounded-xl neu-extruded text-sm font-bold bg-white" 
                    placeholder="Title" 
                  />
                  <DeleteButton
                    onDelete={() => setHomeSections(homeSections.filter((_, i) => i !== index))}
                    title="Delete section"
                  />
                </div>

                <select 
                  value={section.type || 'text'} 
                  onChange={(e) => {
                    const newSections = [...homeSections];
                    newSections[index].type = e.target.value as 'text' | 'schedule';
                    setHomeSections(newSections);
                  }} 
                  className="w-full p-2.5 rounded-xl neu-extruded bg-white text-xs font-semibold"
                >
                  <option value="text">Text / Story Block</option>
                  <option value="schedule">Schedule / Timetable</option>
                </select>
                
                {section.type === 'schedule' ? (
                  <div className="space-y-2">
                    {section.scheduleItems?.map((item, sIndex) => (
                      <div key={item.id} className="flex gap-2">
                        <input 
                          type="text" 
                          value={item.day} 
                          onChange={(e) => {
                            const newSections = [...homeSections];
                            newSections[index].scheduleItems![sIndex].day = e.target.value;
                            setHomeSections(newSections);
                          }} 
                          className="p-2 rounded-xl neu-extruded w-full bg-white text-xs" 
                          placeholder="Day" 
                        />
                        <input 
                          type="text" 
                          value={item.time} 
                          onChange={(e) => {
                            const newSections = [...homeSections];
                            newSections[index].scheduleItems![sIndex].time = e.target.value;
                            setHomeSections(newSections);
                          }} 
                          className="p-2 rounded-xl neu-extruded w-full bg-white text-xs" 
                          placeholder="Time" 
                        />
                        <input 
                          type="text" 
                          value={item.activity} 
                          onChange={(e) => {
                            const newSections = [...homeSections];
                            newSections[index].scheduleItems![sIndex].activity = e.target.value;
                            setHomeSections(newSections);
                          }} 
                          className="p-2 rounded-xl neu-extruded w-full bg-white text-xs" 
                          placeholder="Activity" 
                        />
                        <button
                          onClick={() => {
                            const newSections = [...homeSections];
                            newSections[index].scheduleItems = newSections[index].scheduleItems?.filter((_, i) => i !== sIndex);
                            setHomeSections(newSections);
                          }}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        const newSections = [...homeSections];
                        if (!newSections[index].scheduleItems) newSections[index].scheduleItems = [];
                        newSections[index].scheduleItems!.push({ id: Date.now().toString(), day: '', time: '', activity: '' });
                        setHomeSections(newSections);
                      }} 
                      className="text-xs text-[#2563EB] font-bold mt-1"
                    >
                      + Add Row
                    </button>
                  </div>
                ) : (
                  <textarea 
                    value={section.content} 
                    onChange={(e) => {
                      const newSections = [...homeSections];
                      newSections[index].content = e.target.value;
                      setHomeSections(newSections);
                    }} 
                    className="w-full p-3 rounded-xl neu-extruded bg-white text-xs" 
                    placeholder="Content / Paragraph" 
                  />
                )}
                
                <ImageUploader 
                  onUpload={(url) => {
                    const newSections = [...homeSections];
                    newSections[index].imageUrl = url || undefined;
                    setHomeSections(newSections);
                  }} 
                  currentUrl={section.imageUrl || ''} 
                />
              </div>
            ))}
          </section>
        )}

        {/* Tab 6: Hero & Branding */}
        {activeTab === 'Hero & Branding' && (
          <section className="bg-white p-6 rounded-3xl neu-card space-y-6">
            <h2 className="text-xl font-bold text-[#3D4852]">Hero Banner & Brand Assets</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#3D4852] mb-1">Logo Image</label>
                <ImageUploader onUpload={setLogoUrl} currentUrl={logoUrl} />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3D4852] mb-1">Hero Background Banner</label>
                <ImageUploader onUpload={setHeroImageUrl} currentUrl={heroImageUrl} />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-bold text-[#3D4852]">Hero Text Customization</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  value={heroTopTitle} 
                  onChange={(e) => setHeroTopTitle(e.target.value)} 
                  className="p-2.5 rounded-xl neu-extruded bg-[#E0E5EC] text-xs font-bold" 
                  placeholder="Top Title" 
                />
                <input 
                  type="text" 
                  value={heroTopSubtitle} 
                  onChange={(e) => setHeroTopSubtitle(e.target.value)} 
                  className="p-2.5 rounded-xl neu-extruded bg-[#E0E5EC] text-xs" 
                  placeholder="Top Subtitle" 
                />
                <input 
                  type="text" 
                  value={heroOverlayTitle} 
                  onChange={(e) => setHeroOverlayTitle(e.target.value)} 
                  className="p-2.5 rounded-xl neu-extruded bg-[#E0E5EC] text-xs font-bold" 
                  placeholder="Overlay Title" 
                />
                <input 
                  type="text" 
                  value={heroOverlaySubtitle} 
                  onChange={(e) => setHeroOverlaySubtitle(e.target.value)} 
                  className="p-2.5 rounded-xl neu-extruded bg-[#E0E5EC] text-xs" 
                  placeholder="Overlay Subtitle" 
                />
                <input 
                  type="text" 
                  value={heroBottomTitle} 
                  onChange={(e) => setHeroBottomTitle(e.target.value)} 
                  className="p-2.5 rounded-xl neu-extruded bg-[#E0E5EC] text-xs font-bold" 
                  placeholder="Bottom Title" 
                />
              </div>

              <textarea 
                rows={2}
                value={heroBottomDescription} 
                onChange={(e) => setHeroBottomDescription(e.target.value)} 
                className="w-full p-2.5 rounded-xl neu-extruded bg-[#E0E5EC] text-xs" 
                placeholder="Bottom Description Paragraph" 
              />
            </div>
          </section>
        )}

        {/* Tab 7: News */}
        {activeTab === 'News' && (
          <section className="bg-white p-6 rounded-3xl neu-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#3D4852]">News & Announcements</h2>
                <p className="text-xs text-[#6B7280]">Publish or delete academy news items.</p>
              </div>
              <button 
                onClick={() => setNewsItems([...newsItems, { id: Date.now().toString(), title: 'New News Announcement', date: new Date().toLocaleDateString(), summary: '' }])} 
                className="px-3 py-1.5 bg-[#2563EB] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#1D4ED8]"
              >
                <Plus className="w-3.5 h-3.5" /> Add News Item
              </button>
            </div>

            {newsItems.map((item, index) => (
              <div key={item.id} className="p-4 bg-[#E0E5EC] rounded-2xl space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <input 
                    type="text" 
                    value={item.title} 
                    onChange={(e) => {
                      const newNews = [...newsItems];
                      newNews[index].title = e.target.value;
                      setNewsItems(newNews);
                    }} 
                    className="w-full p-2.5 rounded-xl neu-extruded bg-white text-xs font-bold" 
                    placeholder="News Title" 
                  />
                  <DeleteButton
                    onDelete={() => setNewsItems(newsItems.filter((_, i) => i !== index))}
                    title="Delete news item"
                  />
                </div>
                <textarea 
                  rows={2}
                  value={item.summary} 
                  onChange={(e) => {
                    const newNews = [...newsItems];
                    newNews[index].summary = e.target.value;
                    setNewsItems(newNews);
                  }} 
                  className="w-full p-2.5 rounded-xl neu-extruded bg-white text-xs" 
                  placeholder="Summary" 
                />
                <ImageUploader 
                  onUpload={(url) => {
                    const newNews = [...newsItems];
                    newNews[index].imageUrl = url;
                    setNewsItems(newNews);
                  }} 
                  currentUrl={item.imageUrl || ''} 
                />
              </div>
            ))}
          </section>
        )}

        {/* Tab 8: Academics */}
        {activeTab === 'Academics' && (
          <section className="bg-white p-6 rounded-3xl neu-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#3D4852]">Academic Departments</h2>
                <p className="text-xs text-[#6B7280]">Manage academy subject departments.</p>
              </div>
              <button 
                onClick={() => setAcademicDepartments([...academicDepartments, { id: Date.now().toString(), name: 'New Department', description: 'Department overview...' }])} 
                className="px-3 py-1.5 bg-[#2563EB] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#1D4ED8]"
              >
                <Plus className="w-3.5 h-3.5" /> Add Department
              </button>
            </div>

            {academicDepartments.map((dept, index) => (
              <div key={dept.id} className="p-4 bg-[#E0E5EC] rounded-2xl space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <input 
                    type="text" 
                    value={dept.name} 
                    onChange={(e) => {
                      const updated = [...academicDepartments];
                      updated[index].name = e.target.value;
                      setAcademicDepartments(updated);
                    }} 
                    className="w-full p-2.5 rounded-xl neu-extruded bg-white text-xs font-bold" 
                    placeholder="Department Name" 
                  />
                  <DeleteButton
                    onDelete={() => setAcademicDepartments(academicDepartments.filter((_, i) => i !== index))}
                    title="Delete department"
                  />
                </div>
                <textarea 
                  rows={2}
                  value={dept.description} 
                  onChange={(e) => {
                    const updated = [...academicDepartments];
                    updated[index].description = e.target.value;
                    setAcademicDepartments(updated);
                  }} 
                  className="w-full p-2.5 rounded-xl neu-extruded bg-white text-xs" 
                  placeholder="Department Description" 
                />
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
