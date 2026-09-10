import { createClient } from '@supabase/supabase-js';
import { 
  BucketImage, 
  Page, 
  PageSection, 
  AboutUsData, 
  LanguageOffer, 
  SkillsTrainingModule, 
  NewsItem, 
  AcademicDepartment 
} from '../types';

// Configuration from environment variables with fallback to the user's project credentials
const metaEnv = (import.meta as unknown as { env?: Record<string, string> })?.env || {};

export const SUPABASE_URL = 
  metaEnv.VITE_SUPABASE_URL || 'https://wqjwacmufuzsjwuvucqo.supabase.co';

export const SUPABASE_ANON_KEY = 
  metaEnv.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxandhY211ZnV6c2p3dXZ1Y3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NDcwMjgsImV4cCI6MjEwNDUyMzAyOH0.4iIztftZS-u1o1Tzp0mHPesqibcg6M_Lvwunaq0QM2U';

export const STORAGE_BUCKET = 
  metaEnv.VITE_STORAGE_BUCKET || 'bucket';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Extracts storage object path from a Supabase public URL.
 * Example: "https://wqjwacmufuzsjwuvucqo.supabase.co/storage/v1/object/public/bucket/uploads/123.jpg" -> "uploads/123.jpg"
 */
export function extractStoragePath(urlOrPath: string): string | null {
  if (!urlOrPath) return null;
  if (!urlOrPath.startsWith('http://') && !urlOrPath.startsWith('https://')) {
    return urlOrPath.replace(/^\/+/, '');
  }

  const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
  const index = urlOrPath.indexOf(marker);
  if (index !== -1) {
    return decodeURIComponent(urlOrPath.substring(index + marker.length));
  }

  // Generic bucket fallback match
  const match = urlOrPath.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)$/);
  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }

  return null;
}

/**
 * Upload an image file directly to the Supabase Storage Bucket.
 * Optionally deletes previous image from the bucket to prevent wasting storage.
 * Returns the public URL of the uploaded image.
 */
export async function uploadImageToSupabase(
  file: File, 
  folder = 'uploads', 
  oldUrlToDelete?: string
): Promise<string> {
  // If an old image was previously uploaded to our bucket, remove it to save storage
  if (oldUrlToDelete) {
    try {
      await deleteImageFromSupabase(oldUrlToDelete);
    } catch (cleanupErr) {
      console.warn('Could not clean up old image from bucket:', cleanupErr);
    }
  }

  const rawExt = file.name.split('.').pop() || 'jpg';
  const cleanExt = rawExt.toLowerCase().replace(/[^a-z0-9]/g, '');
  const timestamp = Date.now();
  const rand = Math.random().toString(36).substring(2, 9);
  const fileName = `${folder}/${timestamp}_${rand}.${cleanExt}`;

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || undefined,
    });

  if (error) {
    console.error('Supabase upload error:', error);
    throw error;
  }

  // Retrieve public URL
  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

/**
 * Permanently deletes an image file from the Supabase Storage Bucket
 * to prevent taking storage for nothing.
 */
export async function deleteImageFromSupabase(urlOrPath: string): Promise<boolean> {
  const path = extractStoragePath(urlOrPath);
  if (!path) {
    console.warn('Cannot delete from bucket: invalid or external URL:', urlOrPath);
    return false;
  }

  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([path]);

    if (error) {
      console.error('Supabase storage delete error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to delete image from Supabase storage:', err);
    return false;
  }
}

/**
 * Lists all images currently in the Supabase storage bucket
 * (searches the 'uploads' folder and root) so the admin can inspect, preview,
 * or clean up any image they want.
 */
export async function listStorageBucketImages(folder = 'uploads'): Promise<BucketImage[]> {
  try {
    const resultsMap = new Map<string, BucketImage>();

    // 1. Fetch from specific folder (default: 'uploads')
    const { data: folderData, error: folderError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list(folder, {
        limit: 200,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (!folderError && folderData) {
      folderData
        .filter(item => item.name && !item.name.startsWith('.') && item.name !== '.emptyFolderPlaceholder')
        .forEach(item => {
          const path = folder ? `${folder}/${item.name}` : item.name;
          const { data: urlData } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(path);

          resultsMap.set(path, {
            name: item.name,
            path,
            url: urlData.publicUrl,
            size: item.metadata?.size || (item as any).size || 0,
            updatedAt: item.updated_at || item.created_at || new Date().toISOString(),
          });
        });
    }

    // 2. Also check root if folder is 'uploads'
    if (folder === 'uploads') {
      const { data: rootData, error: rootError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .list('', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (!rootError && rootData) {
        rootData
          .filter(item => item.name && !item.name.startsWith('.') && item.name !== 'uploads' && item.name !== '.emptyFolderPlaceholder')
          .forEach(item => {
            const path = item.name;
            const { data: urlData } = supabase.storage
              .from(STORAGE_BUCKET)
              .getPublicUrl(path);

            if (!resultsMap.has(path)) {
              resultsMap.set(path, {
                name: item.name,
                path,
                url: urlData.publicUrl,
                size: item.metadata?.size || (item as any).size || 0,
                updatedAt: item.updated_at || item.created_at || new Date().toISOString(),
              });
            }
          });
      }
    }

    return Array.from(resultsMap.values()).sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch (err) {
    console.error('Failed to list images from Supabase storage:', err);
    return [];
  }
}

/**
 * Permanently deletes multiple image files from the Supabase Storage Bucket.
 */
export async function deleteMultipleImagesFromSupabase(paths: string[]): Promise<boolean> {
  if (!paths || paths.length === 0) return true;
  try {
    const cleanPaths = paths
      .map(p => extractStoragePath(p) || p)
      .filter(Boolean);

    if (cleanPaths.length === 0) return false;

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove(cleanPaths);

    if (error) {
      console.error('Batch delete error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Batch delete failed:', err);
    return false;
  }
}

/* ==========================================================================
   DATABASE CRUD FUNCTIONS
   ========================================================================== */

export interface InstituteSettingsRecord {
  id: string;
  institution_name: string;
  logo_url: string | null;
  hero_image_url: string | null;
  hero_top_title: string;
  hero_top_subtitle: string;
  hero_overlay_title: string;
  hero_overlay_subtitle: string;
  hero_bottom_title: string;
  hero_bottom_description: string;
}

/**
 * Fetches general institute settings (branding & hero configuration)
 */
export async function fetchInstituteSettings(): Promise<InstituteSettingsRecord | null> {
  try {
    const { data, error } = await supabase
      .from('institute_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.warn('Could not fetch institute settings:', error.message);
      return null;
    }
    return data as InstituteSettingsRecord;
  } catch (err) {
    console.warn('Fetch institute settings exception:', err);
    return null;
  }
}

/**
 * Saves/updates institute branding and hero settings in Supabase
 */
export async function saveInstituteSettings(
  settings: Partial<InstituteSettingsRecord>
): Promise<boolean> {
  try {
    const payload = {
      ...settings,
      id: 'default',
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('institute_settings')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.error('Error saving institute settings to Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception saving institute settings:', err);
    return false;
  }
}

/**
 * Fetches About Us information and phone numbers
 */
export async function fetchAboutUsData(): Promise<AboutUsData | null> {
  try {
    const { data, error } = await supabase
      .from('about_us')
      .select('*, about_us_phones(*)')
      .eq('id', 'default')
      .maybeSingle();

    if (error || !data) return null;

    const phones = (data.about_us_phones || [])
      .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
      .map((p: any) => p.phone_number);

    return {
      intro: data.intro || '',
      address: data.address || 'Duhok, Kurdistan Region',
      instagramUrl: data.instagram_url || 'https://www.instagram.com/letslern.institute/',
      mapEmbedUrl: data.map_embed_url || '',
      phoneNumbers: phones.length > 0 ? phones : ['07500062119', '07508423979'],
    };
  } catch (err) {
    console.warn('Could not fetch About Us data:', err);
    return null;
  }
}

/**
 * Saves About Us information and phone numbers
 */
export async function saveAboutUsData(aboutData: AboutUsData): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('about_us')
      .upsert({
        id: 'default',
        intro: aboutData.intro,
        address: aboutData.address,
        instagram_url: aboutData.instagramUrl,
        map_embed_url: aboutData.mapEmbedUrl,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (error) throw error;

    // Delete existing phones and re-insert
    await supabase.from('about_us_phones').delete().eq('about_id', 'default');
    if (aboutData.phoneNumbers && aboutData.phoneNumbers.length > 0) {
      const phonePayload = aboutData.phoneNumbers.map((num, i) => ({
        about_id: 'default',
        phone_number: num,
        display_order: i + 1,
      }));
      await supabase.from('about_us_phones').insert(phonePayload);
    }

    return true;
  } catch (err) {
    console.error('Error saving About Us data:', err);
    return false;
  }
}

/**
 * Fetches dynamic pages and their nested sections
 */
export async function fetchPagesData(): Promise<Page[]> {
  try {
    const { data: pages, error } = await supabase
      .from('pages')
      .select('*, page_sections(*)')
      .order('display_order', { ascending: true });

    if (error || !pages) return [];

    return pages.map((p: any) => ({
      id: p.id,
      name: p.name,
      sections: (p.page_sections || [])
        .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
        .map((s: any) => ({
          id: s.id,
          title: s.title,
          content: s.content,
          imageUrl: s.image_url || undefined,
          type: (s.section_type as 'text' | 'schedule') || 'text',
          scheduleItems: [],
        })),
    }));
  } catch (err) {
    console.warn('Could not fetch pages data:', err);
    return [];
  }
}

/**
 * Persists all pages and sections to Supabase
 */
export async function savePagesData(pages: Page[]): Promise<boolean> {
  try {
    // Delete existing page sections first, then upsert
    await supabase.from('page_sections').delete().neq('id', '');
    await supabase.from('pages').delete().neq('id', '');

    if (pages.length === 0) return true;

    const pagePayload = pages.map((p, idx) => ({
      id: p.id,
      name: p.name,
      display_order: idx + 1,
    }));
    await supabase.from('pages').insert(pagePayload);

    const sectionsPayload: any[] = [];
    pages.forEach((p) => {
      p.sections.forEach((s, sIdx) => {
        sectionsPayload.push({
          id: s.id,
          page_id: p.id,
          title: s.title,
          content: s.content,
          image_url: s.imageUrl || null,
          section_type: s.type || 'text',
          display_order: sIdx + 1,
        });
      });
    });

    if (sectionsPayload.length > 0) {
      await supabase.from('page_sections').insert(sectionsPayload);
    }

    return true;
  } catch (err) {
    console.error('Error saving pages data:', err);
    return false;
  }
}

/**
 * Fetches Home page custom sections
 */
export async function fetchHomeSectionsData(): Promise<PageSection[]> {
  try {
    const { data, error } = await supabase
      .from('home_sections')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data) return [];

    return data.map((s: any) => ({
      id: s.id,
      title: s.title,
      content: s.content,
      imageUrl: s.image_url || undefined,
      type: (s.section_type as 'text' | 'schedule') || 'text',
      scheduleItems: [],
    }));
  } catch (err) {
    console.warn('Could not fetch home sections:', err);
    return [];
  }
}

/**
 * Persists Home page custom sections
 */
export async function saveHomeSectionsData(sections: PageSection[]): Promise<boolean> {
  try {
    await supabase.from('home_sections').delete().neq('id', '');

    if (sections.length === 0) return true;

    const payload = sections.map((s, idx) => ({
      id: s.id,
      title: s.title,
      content: s.content,
      image_url: s.imageUrl || null,
      section_type: s.type || 'text',
      display_order: idx + 1,
    }));

    await supabase.from('home_sections').insert(payload);
    return true;
  } catch (err) {
    console.error('Error saving home sections:', err);
    return false;
  }
}

/**
 * Fetches Language Offerings
 */
export async function fetchLanguagesData(): Promise<LanguageOffer[]> {
  try {
    const { data, error } = await supabase
      .from('languages')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data) return [];

    return data.map((l: any) => ({
      id: l.id,
      name: l.name,
      native: l.native_name,
      code: l.code,
      description: l.description,
      levels: l.levels,
      focus: l.focus_areas || [],
    }));
  } catch (err) {
    console.warn('Could not fetch languages:', err);
    return [];
  }
}

/**
 * Persists Language Offerings
 */
export async function saveLanguagesData(languages: LanguageOffer[]): Promise<boolean> {
  try {
    await supabase.from('languages').delete().neq('id', '');

    if (languages.length === 0) return true;

    const payload = languages.map((l, idx) => ({
      id: l.id,
      name: l.name,
      native_name: l.native,
      code: l.code,
      description: l.description,
      levels: l.levels,
      focus_areas: l.focus,
      display_order: idx + 1,
    }));

    await supabase.from('languages').insert(payload);
    return true;
  } catch (err) {
    console.error('Error saving languages:', err);
    return false;
  }
}

/**
 * Fetches Training Modules
 */
export async function fetchTrainingModulesData(): Promise<SkillsTrainingModule[]> {
  try {
    const { data, error } = await supabase
      .from('training_modules')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data) return [];

    return data.map((m: any) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      points: m.points || [],
    }));
  } catch (err) {
    console.warn('Could not fetch training modules:', err);
    return [];
  }
}

/**
 * Persists Training Modules
 */
export async function saveTrainingModulesData(modules: SkillsTrainingModule[]): Promise<boolean> {
  try {
    await supabase.from('training_modules').delete().neq('id', '');

    if (modules.length === 0) return true;

    const payload = modules.map((m, idx) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      points: m.points,
      display_order: idx + 1,
    }));

    await supabase.from('training_modules').insert(payload);
    return true;
  } catch (err) {
    console.error('Error saving training modules:', err);
    return false;
  }
}

/**
 * Fetches News & Announcements from Supabase
 */
export async function fetchNewsData(): Promise<NewsItem[]> {
  try {
    const { data, error } = await supabase
      .from('news_items')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((n: any) => ({
        id: String(n.id),
        title: n.title || '',
        date: n.date || '',
        summary: n.summary || '',
        imageUrl: n.image_url || undefined,
      }));
    }

    // Try fallback table name 'news'
    const { data: altData, error: altError } = await supabase
      .from('news')
      .select('*')
      .order('display_order', { ascending: true });

    if (!altError && altData && altData.length > 0) {
      return altData.map((n: any) => ({
        id: String(n.id),
        title: n.title || '',
        date: n.date || '',
        summary: n.summary || '',
        imageUrl: n.image_url || undefined,
      }));
    }

    return [];
  } catch (err) {
    console.warn('Could not fetch news data:', err);
    return [];
  }
}

/**
 * Persists News & Announcements to Supabase
 */
export async function saveNewsData(newsItems: NewsItem[]): Promise<boolean> {
  try {
    // Delete existing records first
    const { error: delError } = await supabase.from('news_items').delete().neq('id', '');
    
    if (!delError) {
      if (newsItems.length === 0) return true;
      const payload = newsItems.map((item, idx) => ({
        id: item.id,
        title: item.title,
        date: item.date || new Date().toLocaleDateString(),
        summary: item.summary,
        image_url: item.imageUrl || null,
        display_order: idx + 1,
      }));
      const { error: insError } = await supabase.from('news_items').insert(payload);
      if (!insError) return true;
    }

    // Fallback if table name is 'news'
    const { error: altDelError } = await supabase.from('news').delete().neq('id', '');
    if (!altDelError) {
      if (newsItems.length === 0) return true;
      const payload = newsItems.map((item, idx) => ({
        id: item.id,
        title: item.title,
        date: item.date || new Date().toLocaleDateString(),
        summary: item.summary,
        image_url: item.imageUrl || null,
        display_order: idx + 1,
      }));
      const { error: altInsError } = await supabase.from('news').insert(payload);
      if (!altInsError) return true;
    }

    return true;
  } catch (err) {
    console.error('Error saving news items:', err);
    return false;
  }
}

/**
 * Fetches Academic Departments from Supabase
 */
export async function fetchAcademicsData(): Promise<AcademicDepartment[]> {
  try {
    const { data, error } = await supabase
      .from('academic_departments')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((d: any) => ({
        id: String(d.id),
        name: d.name || '',
        description: d.description || '',
        icon: d.icon || undefined,
      }));
    }
    return [];
  } catch (err) {
    console.warn('Could not fetch academic departments:', err);
    return [];
  }
}

/**
 * Persists Academic Departments to Supabase
 */
export async function saveAcademicsData(departments: AcademicDepartment[]): Promise<boolean> {
  try {
    const { error: delError } = await supabase.from('academic_departments').delete().neq('id', '');
    if (!delError) {
      if (departments.length === 0) return true;
      const payload = departments.map((d, idx) => ({
        id: d.id,
        name: d.name,
        description: d.description,
        icon: d.icon || null,
        display_order: idx + 1,
      }));
      const { error: insError } = await supabase.from('academic_departments').insert(payload);
      if (!insError) return true;
    }
    return true;
  } catch (err) {
    console.error('Error saving academic departments:', err);
    return false;
  }
}

/**
 * Complete Supabase SQL Script to create all tables, disable RLS,
 * grant full read/write permissions, configure storage, and seed default records.
 */
export const FULL_SUPABASE_SCHEMA_DISABLE_RLS_SQL = `-- ==============================================================================
-- LET'S LERN ACADEMY - FULL SUPABASE DATABASE SETUP (RLS DISABLED)
-- Run this SQL in your Supabase Project -> SQL Editor
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE: institute_settings
CREATE TABLE IF NOT EXISTS public.institute_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    institution_name TEXT DEFAULT 'Let''s Lern',
    logo_url TEXT,
    hero_image_url TEXT,
    hero_top_title TEXT DEFAULT 'World-Class Language Education & Career Mastery',
    hero_top_subtitle TEXT DEFAULT 'Certified multi-language programs, certified exam preparation, and global study pathway guidance.',
    hero_overlay_title TEXT DEFAULT 'Welcome to Let''s Lern Institute',
    hero_overlay_subtitle TEXT DEFAULT 'Empowering learners with world languages and modern career skills.',
    hero_bottom_title TEXT DEFAULT 'Language Academy & Global Pathways',
    hero_bottom_description TEXT DEFAULT 'Comprehensive courses in 6 accredited languages, official test preparation (TOEFL, IELTS, Goethe, TÖMER), and international university advisory in Duhok.',
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 3. TABLE: about_us
CREATE TABLE IF NOT EXISTS public.about_us (
    id TEXT PRIMARY KEY DEFAULT 'default',
    intro TEXT DEFAULT 'Let''s Lern Language Institute is a premier educational center dedicated to empowering learners with certified language proficiency, internationally recognized exam qualifications, and comprehensive study-abroad guidance.',
    phone_numbers TEXT[] DEFAULT ARRAY['+964 750 491 5066', '+964 750 178 8777']::TEXT[],
    address TEXT DEFAULT 'Duhok, Kurdistan Region, Iraq',
    instagram_url TEXT DEFAULT 'https://instagram.com/letslern',
    map_embed_url TEXT DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102148.56064975549!2d42.923838!3d36.862499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40088cb372f88365%3A0x6a09a56247c4e5ea!2sDuhok!5e0!3m2!1sen!2siq!4v1700000000000!5m2!1sen!2siq',
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 4. TABLE: pages
CREATE TABLE IF NOT EXISTS public.pages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    is_system BOOLEAN DEFAULT false,
    sections JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 5. TABLE: home_sections
CREATE TABLE IF NOT EXISTS public.home_sections (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL DEFAULT 'text',
    title TEXT NOT NULL,
    content TEXT DEFAULT '',
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    schedule JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 6. TABLE: language_offers
CREATE TABLE IF NOT EXISTS public.language_offers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    native TEXT NOT NULL,
    code TEXT NOT NULL,
    description TEXT DEFAULT '',
    levels TEXT DEFAULT 'A1 - C2',
    focus TEXT[] DEFAULT '{}'::TEXT[],
    display_order INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 7. TABLE: skills_training_modules
CREATE TABLE IF NOT EXISTS public.skills_training_modules (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    points TEXT[] DEFAULT '{}'::TEXT[],
    display_order INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 8. TABLE: news_items & fallback table news
CREATE TABLE IF NOT EXISTS public.news_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT DEFAULT '',
    summary TEXT DEFAULT '',
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT DEFAULT '',
    summary TEXT DEFAULT '',
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 9. TABLE: academic_departments
CREATE TABLE IF NOT EXISTS public.academic_departments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    icon TEXT,
    display_order INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- DISABLE ROW LEVEL SECURITY (RLS) ON ALL LIVE TABLES
-- ==============================================================================
ALTER TABLE IF EXISTS public.institute_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.about_us DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.pages DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.home_sections DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.language_offers DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.skills_training_modules DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.news_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.news DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.academic_departments DISABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- GRANT OPEN ACCESS TO ANON, AUTHENTICATED, AND SERVICE_ROLE
-- ==============================================================================
GRANT ALL ON TABLE public.institute_settings TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.about_us TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.pages TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.home_sections TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.language_offers TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.skills_training_modules TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.news_items TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.news TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.academic_departments TO anon, authenticated, service_role;

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- ==============================================================================
-- CONFIGURE STORAGE BUCKET ('bucket') WITH PUBLIC ACCESS
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('bucket', 'bucket', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']::text[])
ON CONFLICT (id) DO UPDATE 
SET public = true, 
    file_size_limit = 52428800;

DROP POLICY IF EXISTS "Public Full Access on Bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Select" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Delete" ON storage.objects;

CREATE POLICY "Public Full Access on Bucket" 
ON storage.objects 
FOR ALL 
TO public 
USING (bucket_id = 'bucket') 
WITH CHECK (bucket_id = 'bucket');

-- ==============================================================================
-- SEED INITIAL DEFAULT RECORDS (IF EMPTY)
-- ==============================================================================
INSERT INTO public.institute_settings (id, institution_name)
VALUES ('default', 'Let''s Lern')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.about_us (id, intro)
VALUES ('default', 'Let''s Lern Language Institute is a premier educational center.')
ON CONFLICT (id) DO NOTHING;
`;

