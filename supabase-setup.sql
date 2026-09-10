-- ==============================================================================
-- LET'S LERN ACADEMY - FULL SUPABASE DATABASE SETUP (RLS DISABLED)
-- Run this SQL in your Supabase Project -> SQL Editor to initialize all tables,
-- disable Row Level Security (RLS), grant full public read/write access,
-- and configure the 'bucket' storage bucket for asset uploads.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE: institute_settings (Hero, Logos, Academy Branding)
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

-- 3. TABLE: about_us (Contact Info, Address, Map, Instagram)
CREATE TABLE IF NOT EXISTS public.about_us (
    id TEXT PRIMARY KEY DEFAULT 'default',
    intro TEXT DEFAULT 'Let''s Lern Language Institute is a premier educational center dedicated to empowering learners with certified language proficiency, internationally recognized exam qualifications, and comprehensive study-abroad guidance.',
    phone_numbers TEXT[] DEFAULT ARRAY['+964 750 491 5066', '+964 750 178 8777']::TEXT[],
    address TEXT DEFAULT 'Duhok, Kurdistan Region, Iraq',
    instagram_url TEXT DEFAULT 'https://instagram.com/letslern',
    map_embed_url TEXT DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102148.56064975549!2d42.923838!3d36.862499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40088cb372f88365%3A0x6a09a56247c4e5ea!2sDuhok!5e0!3m2!1sen!2siq!4v1700000000000!5m2!1sen!2siq',
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 4. TABLE: pages (Dynamic and System Pages)
CREATE TABLE IF NOT EXISTS public.pages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    is_system BOOLEAN DEFAULT false,
    sections JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 5. TABLE: home_sections (Custom Content & Schedule Blocks on Homepage)
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

-- 6. TABLE: language_offers (Language Programs)
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

-- 7. TABLE: skills_training_modules (Skills & Training Programs)
CREATE TABLE IF NOT EXISTS public.skills_training_modules (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    points TEXT[] DEFAULT '{}'::TEXT[],
    display_order INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 8. TABLE: news_items (News & Announcements)
CREATE TABLE IF NOT EXISTS public.news_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT DEFAULT '',
    summary TEXT DEFAULT '',
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Fallback table alias 'news' for broad query compatibility
CREATE TABLE IF NOT EXISTS public.news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT DEFAULT '',
    summary TEXT DEFAULT '',
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 9. TABLE: academic_departments (Academic Departments & Curriculum)
CREATE TABLE IF NOT EXISTS public.academic_departments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    icon TEXT,
    display_order INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- DISABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- (Allows full direct read and write from anon key and client without permission errors)
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
-- GRANT PERMISSIONS TO ANON, AUTHENTICATED, AND SERVICE_ROLE
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
-- STORAGE BUCKET CONFIGURATION (Bucket: 'bucket')
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('bucket', 'bucket', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']::text[])
ON CONFLICT (id) DO UPDATE 
SET public = true, 
    file_size_limit = 52428800;

-- Drop old storage policies if any
DROP POLICY IF EXISTS "Public Full Access on Bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Select" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Update" ON storage.objects;

-- Create open public access policy for storage objects in bucket
CREATE POLICY "Public Full Access on Bucket" 
ON storage.objects 
FOR ALL 
TO public 
USING (bucket_id = 'bucket') 
WITH CHECK (bucket_id = 'bucket');

-- ==============================================================================
-- SEED INITIAL DEFAULT RECORDS (IF NOT ALREADY EXISTING)
-- ==============================================================================
INSERT INTO public.institute_settings (id, institution_name, hero_top_title, hero_top_subtitle, hero_bottom_title, hero_bottom_description)
VALUES (
    'default',
    'Let''s Lern',
    'World-Class Language Education & Career Mastery',
    'Certified multi-language programs, certified exam preparation, and global study pathway guidance.',
    'Language Academy & Global Pathways',
    'Comprehensive courses in 6 accredited languages, official test preparation (TOEFL, IELTS, Goethe, TÖMER), and international university advisory in Duhok.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.about_us (id, intro, phone_numbers, address, instagram_url)
VALUES (
    'default',
    'Let''s Lern Language Institute is a premier educational center dedicated to empowering learners with certified language proficiency, internationally recognized exam qualifications, and comprehensive study-abroad guidance.',
    ARRAY['+964 750 491 5066', '+964 750 178 8777']::TEXT[],
    'Duhok, Kurdistan Region, Iraq',
    'https://instagram.com/letslern'
)
ON CONFLICT (id) DO NOTHING;

-- Initial News Announcements
INSERT INTO public.news_items (id, title, date, summary, display_order)
VALUES 
    ('news-1', 'Fall Semester Enrollment Now Open', 'Oct 24, 2026', 'Registration is officially open for English, German, Turkish, and Arabic courses. Secure your seat today.', 1),
    ('news-2', 'Intensive IELTS & TOEFL Masterclass', 'Nov 02, 2026', 'Achieve your target test score with our intensive 6-week preparation program led by certified instructors.', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.news (id, title, date, summary, display_order)
VALUES 
    ('news-1', 'Fall Semester Enrollment Now Open', 'Oct 24, 2026', 'Registration is officially open for English, German, Turkish, and Arabic courses. Secure your seat today.', 1),
    ('news-2', 'Intensive IELTS & TOEFL Masterclass', 'Nov 02, 2026', 'Achieve your target test score with our intensive 6-week preparation program led by certified instructors.', 2)
ON CONFLICT (id) DO NOTHING;

-- Initial Academic Departments
INSERT INTO public.academic_departments (id, name, description, display_order)
VALUES
    ('dept-1', 'Department of European Languages', 'Accredited coursework in English, German, French, and Dutch ranging from beginner (A1) to professional proficiency (C2).', 1),
    ('dept-2', 'Department of Regional Languages', 'Comprehensive Arabic and Turkish curriculum tailored for conversational, academic, and business needs.', 2),
    ('dept-3', 'International Exam & Assessment Center', 'Official test preparation for IELTS, TOEFL iBT, Goethe-Zertifikat, and TÖMER.', 3),
    ('dept-4', 'Study Abroad & Career Counseling', 'Expert guidance on international university admissions, scholarship applications, and visa interview preparation.', 4)
ON CONFLICT (id) DO NOTHING;
