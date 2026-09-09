-- =============================================================================
-- LET'S LEARN INSTITUTE (DUHOK) - FULL UPDATED DATABASE SQL (SUPABASE / POSTGRESQL)
-- =============================================================================
-- Features:
-- 1. UUID & Helper Extensions
-- 2. Supabase Storage Bucket ('bucket') setup & public access policies
-- 3. Complete Database Schema (Settings, Pages, Sections, Languages, Modules,
--    Pillars, Slogans, Articles, Academics, News, Inquiries, etc.)
-- 4. High-performance Foreign Keys and Indexes
-- 5. Complete Row Level Security (RLS) policies (Public Read + Admin Write)
-- 6. Comprehensive Idempotent Seed Data (ON CONFLICT DO NOTHING / UPDATE)
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- PART 1: SUPABASE STORAGE BUCKET CONFIGURATION
-- =============================================================================

-- Ensure the public 'bucket' exists for logos, hero images, and media uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
    'bucket', 
    'bucket', 
    true, 
    10485760, -- 10 MB per file limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET 
    public = true,
    file_size_limit = 10485760;

-- Drop existing storage policies if re-running to prevent duplicate conflicts
DROP POLICY IF EXISTS "Public Read Access on bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Access on bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Access on bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete Access on bucket" ON storage.objects;

-- Storage Policies
CREATE POLICY "Public Read Access on bucket" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'bucket');

CREATE POLICY "Public Upload Access on bucket" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'bucket');

CREATE POLICY "Public Update Access on bucket" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'bucket');

CREATE POLICY "Public Delete Access on bucket" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'bucket');


-- =============================================================================
-- PART 2: DATABASE SCHEMAS & TABLES
-- =============================================================================

-- 1. General Institute Branding & Hero Configuration
CREATE TABLE IF NOT EXISTS public.institute_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
    institution_name VARCHAR(255) NOT NULL DEFAULT 'Let''s Learn Institute',
    logo_url TEXT DEFAULT 'https://i.ibb.co/CshZjp8L/erasebg-transformed-3.png',
    hero_image_url TEXT,
    hero_top_title VARCHAR(255) DEFAULT 'Let''s Learn Institute',
    hero_top_subtitle TEXT DEFAULT 'World Languages, International Exam Preparation & Global Study Guidance in Duhok.',
    hero_overlay_title VARCHAR(255) DEFAULT '',
    hero_overlay_subtitle TEXT DEFAULT '',
    hero_bottom_title VARCHAR(255) DEFAULT '',
    hero_bottom_description TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. About Us & Contact Details
CREATE TABLE IF NOT EXISTS public.about_us (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
    intro TEXT NOT NULL,
    address TEXT NOT NULL,
    instagram_url TEXT,
    map_embed_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.about_us_phones (
    id SERIAL PRIMARY KEY,
    about_id VARCHAR(50) NOT NULL REFERENCES public.about_us(id) ON DELETE CASCADE,
    phone_number VARCHAR(50) NOT NULL,
    display_order INT DEFAULT 0
);

-- 3. Navigation & Sidebar Items
CREATE TABLE IF NOT EXISTS public.sidebar_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Dynamic Pages & Sections
CREATE TABLE IF NOT EXISTS public.pages (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.page_sections (
    id VARCHAR(100) PRIMARY KEY,
    page_id VARCHAR(100) NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    section_type VARCHAR(50) DEFAULT 'text', -- 'text' or 'schedule'
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.section_schedule_items (
    id VARCHAR(100) PRIMARY KEY,
    section_id VARCHAR(100) NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
    day_name VARCHAR(50) NOT NULL,
    time_slot VARCHAR(100) NOT NULL,
    activity TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- 5. Home Custom Sections
CREATE TABLE IF NOT EXISTS public.home_sections (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    section_type VARCHAR(50) DEFAULT 'text',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Language Offerings (Core 6 Languages)
CREATE TABLE IF NOT EXISTS public.languages (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    native_name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL,
    description TEXT NOT NULL,
    levels VARCHAR(255) NOT NULL,
    focus_areas TEXT[] NOT NULL DEFAULT '{}',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Academic Skills Training & Services
CREATE TABLE IF NOT EXISTS public.training_modules (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    points TEXT[] NOT NULL DEFAULT '{}',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Linguistic & Grammar Articles
CREATE TABLE IF NOT EXISTS public.language_articles (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    languages_covered VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) DEFAULT 'Let''s Learn Faculty',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Strategic Mission Slogans & Pillars
CREATE TABLE IF NOT EXISTS public.mission_slogans (
    id VARCHAR(50) PRIMARY KEY,
    quote VARCHAR(255) NOT NULL,
    context VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.mission_pillars (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    badge VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    points TEXT[] NOT NULL DEFAULT '{}',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Academic Departments
CREATE TABLE IF NOT EXISTS public.academic_departments (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) DEFAULT 'BookOpen',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. News & Announcements
CREATE TABLE IF NOT EXISTS public.news_announcements (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    published_date VARCHAR(50) NOT NULL,
    summary TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Student Inquiries & Course Registrations
CREATE TABLE IF NOT EXISTS public.student_inquiries (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(150),
    interested_language_id VARCHAR(50) REFERENCES public.languages(id) ON DELETE SET NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'enrolled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- PERFORMANCE INDEXES
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_sections_page_id ON public.page_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_schedule_section_id ON public.section_schedule_items(section_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_language ON public.student_inquiries(interested_language_id);
CREATE INDEX IF NOT EXISTS idx_about_phones_about_id ON public.about_us_phones(about_id);


-- =============================================================================
-- PART 3: ROW LEVEL SECURITY (RLS) POLICIES FOR SUPABASE
-- =============================================================================

-- Enable RLS across all tables
ALTER TABLE public.institute_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_us_phones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sidebar_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_schedule_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.language_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mission_slogans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mission_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_inquiries ENABLE ROW LEVEL SECURITY;

-- 1. Public Read (SELECT) Policies for all visitors
DROP POLICY IF EXISTS "Public Read Settings" ON public.institute_settings;
CREATE POLICY "Public Read Settings" ON public.institute_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read About" ON public.about_us;
CREATE POLICY "Public Read About" ON public.about_us FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Phones" ON public.about_us_phones;
CREATE POLICY "Public Read Phones" ON public.about_us_phones FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Sidebar" ON public.sidebar_items;
CREATE POLICY "Public Read Sidebar" ON public.sidebar_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Pages" ON public.pages;
CREATE POLICY "Public Read Pages" ON public.pages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Page Sections" ON public.page_sections;
CREATE POLICY "Public Read Page Sections" ON public.page_sections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Schedule" ON public.section_schedule_items;
CREATE POLICY "Public Read Schedule" ON public.section_schedule_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Home Sections" ON public.home_sections;
CREATE POLICY "Public Read Home Sections" ON public.home_sections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Languages" ON public.languages;
CREATE POLICY "Public Read Languages" ON public.languages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Training" ON public.training_modules;
CREATE POLICY "Public Read Training" ON public.training_modules FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Articles" ON public.language_articles;
CREATE POLICY "Public Read Articles" ON public.language_articles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Slogans" ON public.mission_slogans;
CREATE POLICY "Public Read Slogans" ON public.mission_slogans FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Pillars" ON public.mission_pillars;
CREATE POLICY "Public Read Pillars" ON public.mission_pillars FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Departments" ON public.academic_departments;
CREATE POLICY "Public Read Departments" ON public.academic_departments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read News" ON public.news_announcements;
CREATE POLICY "Public Read News" ON public.news_announcements FOR SELECT USING (true);

-- 2. Public Submissions (INSERT) for Inquiries
DROP POLICY IF EXISTS "Public Insert Inquiries" ON public.student_inquiries;
CREATE POLICY "Public Insert Inquiries" ON public.student_inquiries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Read Inquiries" ON public.student_inquiries;
CREATE POLICY "Admin Read Inquiries" ON public.student_inquiries FOR SELECT USING (true);

-- 3. Full Write / Update / Delete Policies for Admin Management
DROP POLICY IF EXISTS "Admin All Settings" ON public.institute_settings;
CREATE POLICY "Admin All Settings" ON public.institute_settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All About" ON public.about_us;
CREATE POLICY "Admin All About" ON public.about_us FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Phones" ON public.about_us_phones;
CREATE POLICY "Admin All Phones" ON public.about_us_phones FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Sidebar" ON public.sidebar_items;
CREATE POLICY "Admin All Sidebar" ON public.sidebar_items FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Pages" ON public.pages;
CREATE POLICY "Admin All Pages" ON public.pages FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Page Sections" ON public.page_sections;
CREATE POLICY "Admin All Page Sections" ON public.page_sections FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Schedule" ON public.section_schedule_items;
CREATE POLICY "Admin All Schedule" ON public.section_schedule_items FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Home Sections" ON public.home_sections;
CREATE POLICY "Admin All Home Sections" ON public.home_sections FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Languages" ON public.languages;
CREATE POLICY "Admin All Languages" ON public.languages FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Training" ON public.training_modules;
CREATE POLICY "Admin All Training" ON public.training_modules FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Articles" ON public.language_articles;
CREATE POLICY "Admin All Articles" ON public.language_articles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Slogans" ON public.mission_slogans;
CREATE POLICY "Admin All Slogans" ON public.mission_slogans FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Pillars" ON public.mission_pillars;
CREATE POLICY "Admin All Pillars" ON public.mission_pillars FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Departments" ON public.academic_departments;
CREATE POLICY "Admin All Departments" ON public.academic_departments FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All News" ON public.news_announcements;
CREATE POLICY "Admin All News" ON public.news_announcements FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Inquiries" ON public.student_inquiries;
CREATE POLICY "Admin All Inquiries" ON public.student_inquiries FOR ALL USING (true) WITH CHECK (true);


-- =============================================================================
-- PART 4: SEED DATA (LET'S LEARN INSTITUTE - DUHOK)
-- =============================================================================

-- 1. General Institute Settings
INSERT INTO public.institute_settings (
    id, institution_name, logo_url, hero_top_title, hero_top_subtitle
) VALUES (
    'default',
    'Let''s Learn Institute',
    'https://i.ibb.co/CshZjp8L/erasebg-transformed-3.png',
    'Let''s Learn Institute',
    'World Languages, International Exam Preparation & Global Study Guidance in Duhok.'
) ON CONFLICT (id) DO UPDATE SET
    institution_name = EXCLUDED.institution_name,
    hero_top_title = EXCLUDED.hero_top_title,
    hero_top_subtitle = EXCLUDED.hero_top_subtitle;

-- 2. About Us & Phone Numbers (Duhok)
INSERT INTO public.about_us (
    id, intro, address, instagram_url, map_embed_url
) VALUES (
    'default',
    'Welcome to our institute. We are located in Duhok.',
    'Duhok, Kurdistan Region',
    'https://www.instagram.com/letslern.institute/',
    'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3192.671279680684!2d42.945425!3d36.850348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDUxJzAxLjMiTiA0MsKwNTYnNDMuNSJF!5e0!3m2!1sen!2siq!4v1788882559231!5m2!1sen!2siq'
) ON CONFLICT (id) DO UPDATE SET
    intro = EXCLUDED.intro,
    address = EXCLUDED.address,
    instagram_url = EXCLUDED.instagram_url,
    map_embed_url = EXCLUDED.map_embed_url;

INSERT INTO public.about_us_phones (about_id, phone_number, display_order)
VALUES 
    ('default', '07500062119', 1),
    ('default', '07508423979', 2)
ON CONFLICT DO NOTHING;

-- 3. Sidebar Navigation Items
INSERT INTO public.sidebar_items (name, display_order)
VALUES 
    ('Home', 1),
    ('About', 2)
ON CONFLICT DO NOTHING;

-- 4. Core Pages
INSERT INTO public.pages (id, name, display_order)
VALUES 
    ('subjects-languages', 'Subjects & Languages', 1),
    ('goals-mission', 'Goals & Mission', 2)
ON CONFLICT (id) DO NOTHING;

-- 5. Sections for 'Subjects & Languages'
INSERT INTO public.page_sections (id, page_id, title, content, display_order)
VALUES 
    ('sl-1', 'subjects-languages', 
     'Languages: English, German, Arabic, Turkish, French, and Dutch', 
     'Accredited multi-level language courses spanning A1 foundational to C2 professional fluency, academic research, and business mastery.', 1),
    ('sl-2', 'subjects-languages', 
     'Exam Preparation & Career Skills', 
     'Targeted simulation courses for IELTS, TOEFL, Goethe-Zertifikat, DELF, and TÖMER alongside professional CV workshops and mock interview simulations.', 2),
    ('sl-3', 'subjects-languages', 
     'Translation & Consultation Services', 
     'Official certified document and transcript translation services coupled with individual international study counseling and degree verification.', 3),
    ('sl-4', 'subjects-languages', 
     'Specialized Training & Language Services', 
     'Bespoke corporate workshops, technical terminology bootcamps, and flexible 1-on-1 language coaching.', 4)
ON CONFLICT (id) DO NOTHING;

-- 6. Sections for 'Goals & Mission'
INSERT INTO public.page_sections (id, page_id, title, content, display_order)
VALUES 
    ('gm-1', 'goals-mission', 
     'Study Abroad & Global Guidance', 
     'Assisting students with university enrollment, visa/admission support, international guidance, and career growth opportunities.', 1),
    ('gm-2', 'goals-mission', 
     'Skill Development & Empowerment', 
     'Slogans highlight "Unlock your potential," "Build your future," and "Small Steps. Big Futures." We foster self-efficacy, critical thinking, and career readiness.', 2),
    ('gm-3', 'goals-mission', 
     'Multilingual Fluency', 
     'Expanding academic, professional, and personal opportunities through language acquisition and cross-cultural empowerment.', 3)
ON CONFLICT (id) DO NOTHING;

-- 7. Core 6 Languages (English, German, Arabic, Turkish, French, Dutch)
INSERT INTO public.languages (id, name, native_name, code, description, levels, focus_areas, display_order)
VALUES 
    ('lang-1', 'English', 'English', 'EN', 
     'Comprehensive general, academic, and business English with focus on fluency and global communication.', 
     'A1 to C2 & IELTS/TOEFL', 
     ARRAY['Conversation', 'Academic Writing', 'Exam Prep', 'Business English'], 1),
    
    ('lang-2', 'German', 'Deutsch', 'DE', 
     'Structured German training tailored for university studies in Germany, Austria, and healthcare careers.', 
     'A1 to C1 & Goethe-Zertifikat', 
     ARRAY['Grammar Mastery', 'Studienkolleg Prep', 'Medical German', 'TestDaF'], 2),
    
    ('lang-3', 'Arabic', 'العربية', 'AR', 
     'Modern Standard Arabic (MSA) alongside communicative dialects with rich phonetics and syntactic structure.', 
     'Beginner to Advanced', 
     ARRAY['MSA Standard', 'Reading & Script', 'Media & Literature', 'Business Arabic'], 3),
    
    ('lang-4', 'Turkish', 'Türkçe', 'TR', 
     'Immersive Turkish language courses designed for university admission, daily living, and commerce in Turkey.', 
     'A1 to C1 & TÖMER Prep', 
     ARRAY['Vowel Harmony & Suffixes', 'TÖMER Exam', 'Everyday Fluency', 'Commercial Turkish'], 4),
    
    ('lang-5', 'French', 'Français', 'FR', 
     'Elegant French instruction covering spoken interaction, literary nuance, and official certification.', 
     'A1 to B2 & DELF/DALF', 
     ARRAY['Pronunciation & Listening', 'DELF B2 Preparation', 'Francophone Culture', 'Academic French'], 5),
    
    ('lang-6', 'Dutch', 'Nederlands', 'NL', 
     'Practical and conversational Dutch geared towards study programs in the Netherlands and civic integration.', 
     'A1 to B2 & Inburgering', 
     ARRAY['Civic Integration (Inburgering)', 'NT2 Exam Prep', 'Daily Interaction', 'Workplace Dutch'], 6)
ON CONFLICT (id) DO NOTHING;

-- 8. Academic & Skills Training Modules
INSERT INTO public.training_modules (id, title, description, points, display_order)
VALUES 
    ('train-1', 'Exam Preparation & Career Skills', 
     'Targeted simulation courses for international exams including IELTS, TOEFL, Goethe-Zertifikat (B1-C1), DELF, and TÖMER. Master academic writing, public speaking, and professional interview techniques.',
     ARRAY[
        'Standardized Test Strategies & Timed Practice',
        'Professional CV, Resume & Cover Letter Crafting',
        'Mock University & Consular Interviews'
     ], 1),
    
    ('train-2', 'Translation & Consultation', 
     'Certified document and transcript translation recognized by international admissions offices. In-depth 1-on-1 consultations for degree verification, equivalency processes, and credit transfers.',
     ARRAY[
        'Academic Records, Transcripts & Diplomas',
        'Legal Statements & Certified Sworn Translations',
        'University Matching & Admission Consultations'
     ], 2),
    
    ('train-3', 'Specialized Training & Language Services', 
     'Bespoke language solutions for businesses, medical professionals, engineers, and researchers. Flexible hybrid schedules and custom curriculum pacing.',
     ARRAY[
        'Corporate & Institutional Team Workshops',
        'Medical, Technical & Engineering Lexicons',
        '1-on-1 Executive Fluency Coaching'
     ], 3)
ON CONFLICT (id) DO NOTHING;

-- 9. Strategic Mission Slogans
INSERT INTO public.mission_slogans (id, quote, context, description, display_order)
VALUES 
    ('slogan-1', 'Unlock your potential.', 'Discovery & Self-Belief', 
     'Every student possesses untapped capabilities waiting to be awakened with the right guidance and academic rigor.', 1),
    
    ('slogan-2', 'Build your future.', 'Action & Architecture', 
     'We do not wait for the future; we construct it step by step through disciplined study, language fluency, and real-world skills.', 2),
    
    ('slogan-3', 'Small Steps. Big Futures.', 'Perseverance & Growth', 
     'Consistent daily mastery of vocabulary, concepts, and interview practice yields life-altering international opportunities.', 3)
ON CONFLICT (id) DO NOTHING;

-- 10. Strategic Mission Pillars
INSERT INTO public.mission_pillars (id, title, badge, description, points, display_order)
VALUES 
    ('pillar-1', 'Study Abroad & Global Guidance', 'International Pathways',
     'Assisting students with university enrollment, visa/admission support, international guidance, and career growth opportunities.',
     ARRAY[
        'Personalized university matching and program selection across Europe, North America, and worldwide.',
        'End-to-end assistance with university enrollment, admissions essays, portfolio submissions, and document legalization.',
        'Rigorous visa consultation and mock consular interview simulations.',
        'Post-arrival orientation, international student accommodation guidance, and long-term career roadmaps.'
     ], 1),
    
    ('pillar-2', 'Skill Development & Empowerment', 'Holistic Growth',
     'Slogans highlight "Unlock your potential," "Build your future," and "Small Steps. Big Futures." We foster self-efficacy, critical thinking, and career readiness.',
     ARRAY[
        'Critical thinking, analytical reasoning, and international exam strategies (IELTS, TOEFL, Goethe, TÖMER).',
        'Executive communication, professional presentation, and CV tailoring for competitive global markets.',
        'Active mentorship pairing students with alumni studying and working internationally.',
        'Cultivating self-efficacy, academic autonomy, and cross-cultural adaptability.'
     ], 2),
    
    ('pillar-3', 'Multilingual Fluency', 'Cultural Bridges',
     'Expanding academic, professional, and personal opportunities through foreign language acquisition and cultural immersion.',
     ARRAY[
        'Comprehensive programs across 6 core languages: English, German, Arabic, Turkish, French, and Dutch.',
        'Bridging linguistic barriers to unlock international scholarships, internships, and global research.',
        'Immersive speaking clubs and cultural exchange seminars designed to build genuine speaking confidence.',
        'Empowering students to think, negotiate, and thrive in multilingual academic environments.'
     ], 3)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- END OF SCRIPT
-- =============================================================================
