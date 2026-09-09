import { createClient } from '@supabase/supabase-js';

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
 * Upload an image file directly to the Supabase Storage Bucket
 * Returns the public URL of the uploaded image
 */
export async function uploadImageToSupabase(file: File, folder = 'uploads'): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
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
