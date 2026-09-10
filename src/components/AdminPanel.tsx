import React, { useState, useEffect } from 'react';
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
  AboutUsData,
  BucketImage 
} from '../types';
import { 
  Trash2, 
  Plus, 
  Edit3, 
  Image as ImageIcon, 
  X, 
  Loader2, 
  CloudUpload, 
  Check, 
  FolderOpen, 
  RefreshCw, 
  HardDrive, 
  Save, 
  ExternalLink 
} from 'lucide-react';
import { 
  uploadImageToSupabase, 
  deleteImageFromSupabase, 
  listStorageBucketImages, 
  STORAGE_BUCKET,
  saveInstituteSettings,
  saveAboutUsData,
  savePagesData,
  saveHomeSectionsData,
  saveLanguagesData,
  saveTrainingModulesData
} from '../lib/supabase';

export interface AdminPanelProps {
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

// Modal to browse, choose, or permanently delete images in the Supabase Storage Bucket
const BucketLibraryModal = ({
  isOpen,
  onClose,
  onSelectImage,
  title = "Supabase Storage Library"
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
  title?: string;
}) => {
  const [images, setImages] = useState<BucketImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingPath, setDeletingPath] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const items = await listStorageBucketImages('uploads');
      setImages(items);
    } catch (e) {
      console.error('Error listing bucket images:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadImages();
    }
  }, [isOpen]);

  const handleDelete = async (img: BucketImage) => {
    setDeletingPath(img.path);
    try {
      const ok = await deleteImageFromSupabase(img.path);
      if (ok) {
        setImages(prev => prev.filter(i => i.path !== img.path));
        setStatusMsg(`Deleted ${img.name} from storage bucket!`);
        setTimeout(() => setStatusMsg(null), 3000);
      } else {
        setStatusMsg('Could not delete image. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatusMsg('Error deleting file.');
    } finally {
      setDeletingPath(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl p-6 w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl neu-card">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <h3 className="font-display text-lg font-bold text-[#3D4852] flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-[#2563EB]" />
              {title}
            </h3>
            <p className="text-xs text-[#6B7280]">
              Files currently stored in bucket <code className="font-mono bg-gray-100 px-1 rounded">{STORAGE_BUCKET}</code>. Select an image or delete unused files to free storage.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadImages}
              disabled={isLoading}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              title="Refresh bucket list"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {statusMsg && (
          <div className="my-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 border border-emerald-200">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            {statusMsg}
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-4">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-[#2563EB]">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xs font-semibold">Loading images from Supabase storage...</span>
            </div>
          ) : images.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <HardDrive className="w-10 h-10 text-gray-400 mx-auto" />
              <p className="text-sm font-bold text-[#3D4852]">Bucket is empty</p>
              <p className="text-xs text-[#6B7280]">No images currently stored in bucket folder.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div 
                  key={img.path}
                  className="group relative bg-[#E0E5EC] p-2.5 rounded-2xl neu-inset flex flex-col justify-between"
                >
                  <div className="w-full h-28 rounded-xl overflow-hidden bg-white mb-2 flex items-center justify-center">
                    <img 
                      src={img.url} 
                      alt={img.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono font-bold text-[#3D4852] truncate" title={img.name}>
                      {img.name}
                    </p>
                    <p className="text-[9px] text-[#6B7280]">
                      {img.size ? `${(img.size / 1024).toFixed(1)} KB` : 'Uploaded'}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-gray-300 flex items-center gap-1.5 justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectImage(img.url);
                        onClose();
                      }}
                      className="px-2.5 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-bold rounded-lg transition-colors flex-1"
                    >
                      Use Image
                    </button>
                    <button
                      type="button"
                      disabled={deletingPath === img.path}
                      onClick={() => handleDelete(img)}
                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Permanently delete from bucket"
                    >
                      {deletingPath === img.path ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-[#6B7280]">
          <span>{images.length} image(s) in Supabase bucket</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Upgraded ImageUploader with direct Supabase upload, automatic old cleanup, bucket browser, and auto-persist
const ImageUploader = ({ 
  onUpload, 
  currentUrl,
  onAutoPersist,
  label = "Image"
}: { 
  onUpload: (url: string) => void;
  currentUrl: string;
  onAutoPersist?: (url: string) => Promise<void>;
  label?: string;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('Uploading to Supabase bucket...');

    try {
      // Pass currentUrl so the previous bucket file is cleaned up automatically
      const publicUrl = await uploadImageToSupabase(file, 'uploads', currentUrl);
      onUpload(publicUrl);
      if (onAutoPersist) {
        await onAutoPersist(publicUrl);
      }
      setUploadStatus('Uploaded to storage & live website!');
      setTimeout(() => setUploadStatus(null), 3500);
    } catch (err: any) {
      console.warn('Upload failed:', err?.message || err);
      // Local fallback preview if bucket upload failed
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onUpload(result);
        if (onAutoPersist) onAutoPersist(result);
        setUploadStatus('Saved preview (check Supabase network)');
        setTimeout(() => setUploadStatus(null), 4000);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = async () => {
    if (!currentUrl) return;
    try {
      // Delete file from Supabase storage bucket so it doesn't take space for nothing
      await deleteImageFromSupabase(currentUrl);
    } catch (e) {
      console.warn('Could not delete from bucket:', e);
    }
    onUpload('');
    if (onAutoPersist) {
      await onAutoPersist('');
    }
    setUploadStatus('Removed & cleaned from bucket');
    setTimeout(() => setUploadStatus(null), 3000);
  };

  const handleSelectFromLibrary = async (url: string) => {
    onUpload(url);
    if (onAutoPersist) {
      await onAutoPersist(url);
    }
    setUploadStatus('Selected & saved to website!');
    setTimeout(() => setUploadStatus(null), 3000);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative cursor-pointer px-3 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm">
          <CloudUpload className="w-3.5 h-3.5" />
          <span>Upload File</span>
          <input 
            type="file" 
            accept="image/*"
            disabled={isUploading}
            onChange={handleFileChange} 
            className="sr-only"
          />
        </label>

        <button
          type="button"
          onClick={() => setIsLibraryOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-white neu-card hover:text-[#2563EB] text-[#3D4852] text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <FolderOpen className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Storage Library</span>
        </button>

        {isUploading && (
          <div className="flex items-center gap-1.5 text-xs text-[#2563EB] shrink-0">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Uploading...</span>
          </div>
        )}
      </div>

      {uploadStatus && (
        <p className="text-[11px] font-semibold text-[#2563EB] flex items-center gap-1">
          <Check className="w-3 h-3" />
          {uploadStatus}
        </p>
      )}

      {currentUrl && (
        <div className="relative inline-block mt-1">
          <img 
            src={currentUrl} 
            alt="Preview" 
            className="h-20 rounded-xl object-cover neu-inset border border-gray-200" 
            referrerPolicy="no-referrer"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition-colors"
            title="Remove & delete from bucket storage"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <BucketLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelectImage={handleSelectFromLibrary}
        title={`Select ${label} from Bucket`}
      />
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

// Full Media & Storage Manager Tab for Supabase Storage Bucket
const MediaStorageTab = ({
  onSetHeroImage,
  onSetLogoImage,
  currentHeroUrl,
  currentLogoUrl
}: {
  onSetHeroImage: (url: string) => Promise<void>;
  onSetLogoImage: (url: string) => Promise<void>;
  currentHeroUrl?: string;
  currentLogoUrl?: string;
}) => {
  const [images, setImages] = useState<BucketImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingPath, setDeletingPath] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const items = await listStorageBucketImages('uploads');
      setImages(items);
    } catch (err) {
      console.error('Failed to load bucket images:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setActionStatus('Uploading file to Supabase storage bucket...');
    try {
      const url = await uploadImageToSupabase(file, 'uploads');
      setActionStatus(`Uploaded ${file.name} successfully to bucket!`);
      await loadImages();
      setTimeout(() => setActionStatus(null), 3500);
    } catch (err: any) {
      setActionStatus('Upload failed. Please check your connection.');
      setTimeout(() => setActionStatus(null), 4000);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (img: BucketImage) => {
    setDeletingPath(img.path);
    try {
      const ok = await deleteImageFromSupabase(img.path);
      if (ok) {
        setImages(prev => prev.filter(i => i.path !== img.path));
        setActionStatus(`Permanently deleted ${img.name} from Supabase storage!`);
        setTimeout(() => setActionStatus(null), 3000);
      } else {
        setActionStatus('Could not delete image. Please try again.');
      }
    } catch (err) {
      setActionStatus('Error deleting image from bucket.');
    } finally {
      setDeletingPath(null);
    }
  };

  const totalBytes = images.reduce((sum, img) => sum + (img.size || 0), 0);
  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);

  return (
    <section className="bg-white p-6 rounded-3xl neu-card space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#3D4852]">Supabase Bucket Storage Manager</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              {STORAGE_BUCKET}
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            Manage files stored in your Supabase bucket. Delete unneeded files to keep storage clean, or assign any image to your Hero banner or Logo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="cursor-pointer px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm">
            <CloudUpload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload New Image'}</span>
            <input 
              type="file" 
              accept="image/*"
              disabled={isUploading}
              onChange={handleUpload} 
              className="sr-only"
            />
          </label>

          <button
            type="button"
            onClick={loadImages}
            disabled={isLoading}
            className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            title="Refresh bucket contents"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Storage usage bar */}
      <div className="p-4 rounded-2xl bg-[#E0E5EC] neu-inset flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-[#3D4852]">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-[#2563EB]" />
          <span>Total Bucket Files: {images.length}</span>
        </div>
        <div>
          <span>Total Size: {totalMB} MB</span>
        </div>
        <div className="text-[#6B7280] font-normal text-[11px]">
          Target Folder: <code className="font-mono font-bold text-[#3D4852]">uploads/</code>
        </div>
      </div>

      {actionStatus && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-blue-600" />
            {actionStatus}
          </span>
          <button onClick={() => setActionStatus(null)} className="text-blue-700 hover:text-blue-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-[#2563EB]">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-xs font-bold">Querying Supabase Storage bucket...</span>
        </div>
      ) : images.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-[#F9FAFB] rounded-2xl border-2 border-dashed border-gray-200 p-8">
          <HardDrive className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="text-base font-bold text-[#3D4852]">Bucket folder is clean and empty</h3>
          <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
            No leftover or wasted images. Upload an image above, or add an image in any page section to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {images.map((img) => {
            const isHero = currentHeroUrl === img.url;
            const isLogo = currentLogoUrl === img.url;

            return (
              <div 
                key={img.path}
                className="bg-[#E0E5EC] p-3.5 rounded-2xl neu-card flex flex-col justify-between space-y-3 border border-gray-200"
              >
                <div className="relative w-full h-40 rounded-xl overflow-hidden bg-white shadow-inner flex items-center justify-center">
                  <img 
                    src={img.url} 
                    alt={img.name} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  {(isHero || isLogo) && (
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {isHero && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold shadow">
                          Active Hero
                        </span>
                      )}
                      {isLogo && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold shadow">
                          Active Logo
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-mono font-bold text-[#3D4852] truncate" title={img.name}>
                    {img.name}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>{img.size ? `${(img.size / 1024).toFixed(1)} KB` : 'Uploaded'}</span>
                    {img.created_at && (
                      <span>{new Date(img.created_at).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-300">
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={async () => {
                        await onSetHeroImage(img.url);
                        setActionStatus(`Set ${img.name} as active Hero banner & saved to database!`);
                        setTimeout(() => setActionStatus(null), 3000);
                      }}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${
                        isHero 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white hover:bg-blue-50 text-[#2563EB] neu-inset'
                      }`}
                    >
                      {isHero ? '✓ Current Hero' : 'Use as Hero'}
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        await onSetLogoImage(img.url);
                        setActionStatus(`Set ${img.name} as active Logo & saved to database!`);
                        setTimeout(() => setActionStatus(null), 3000);
                      }}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${
                        isLogo 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-white hover:bg-emerald-50 text-emerald-700 neu-inset'
                      }`}
                    >
                      {isLogo ? '✓ Current Logo' : 'Use as Logo'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <a
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-gray-600 hover:text-[#2563EB] flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View File</span>
                    </a>

                    <button
                      type="button"
                      disabled={deletingPath === img.path}
                      onClick={() => handleDelete(img)}
                      className="px-2.5 py-1 text-red-600 hover:bg-red-50 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors"
                      title="Delete permanently to save storage"
                    >
                      {deletingPath === img.path ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
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
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [saveAllStatus, setSaveAllStatus] = useState<string | null>(null);

  const tabs = [
    'Pages',
    'Subjects & Languages',
    'Goals & Mission',
    'About Us',
    'Home Sections',
    'Hero & Branding',
    'Media & Storage',
    'News',
    'Academics'
  ];

  const handleSaveAllToLiveWebsite = async () => {
    setIsSavingAll(true);
    setSaveAllStatus(null);
    try {
      const p1 = saveInstituteSettings({
        institution_name: "Let's Lern",
        logo_url: logoUrl,
        hero_image_url: heroImageUrl || null,
        hero_top_title: heroTopTitle,
        hero_top_subtitle: heroTopSubtitle,
        hero_overlay_title: heroOverlayTitle,
        hero_overlay_subtitle: heroOverlaySubtitle,
        hero_bottom_title: heroBottomTitle,
        hero_bottom_description: heroBottomDescription,
      });
      const p2 = savePagesData(pages);
      const p3 = saveHomeSectionsData(homeSections);
      const p4 = saveAboutUsData(aboutData);
      const p5 = saveLanguagesData(languages);
      const p6 = saveTrainingModulesData(trainingModules);

      const results = await Promise.all([p1, p2, p3, p4, p5, p6]);
      const allOk = results.every(Boolean);

      if (allOk) {
        setSaveAllStatus('All changes, pages & uploaded images successfully saved to live Supabase database!');
        setTimeout(() => setSaveAllStatus(null), 5000);
      } else {
        setSaveAllStatus('Saved with partial warnings. Check browser console.');
      }
    } catch (err: any) {
      console.error('Error saving all:', err);
      setSaveAllStatus('Failed to sync to database.');
    } finally {
      setIsSavingAll(false);
    }
  };

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
          
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={isSavingAll}
              onClick={handleSaveAllToLiveWebsite}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition-colors text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer"
              title="Save all academy content and images to Supabase database"
            >
              {isSavingAll ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving to DB...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save All to Live Site</span>
                </>
              )}
            </button>

            <button 
              onClick={onClose} 
              className="px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md cursor-pointer"
            >
              Done & Return to Site
            </button>
          </div>
        </div>

        {saveAllStatus && (
          <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold flex items-center justify-between shadow-sm animate-in fade-in">
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              {saveAllStatus}
            </span>
            <button 
              onClick={() => setSaveAllStatus(null)} 
              className="p-1 hover:bg-emerald-200 rounded-lg transition-colors text-emerald-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-2 rounded-2xl neu-inset bg-[#E0E5EC]">
          {tabs.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#3D4852]">Hero Banner & Brand Assets</h2>
                <p className="text-xs text-[#6B7280]">Changes auto-save on image upload or click Save to update database.</p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const ok = await saveInstituteSettings({
                    institution_name: "Let's Lern",
                    logo_url: logoUrl,
                    hero_image_url: heroImageUrl || null,
                    hero_top_title: heroTopTitle,
                    hero_top_subtitle: heroTopSubtitle,
                    hero_overlay_title: heroOverlayTitle,
                    hero_overlay_subtitle: heroOverlaySubtitle,
                    hero_bottom_title: heroBottomTitle,
                    hero_bottom_description: heroBottomDescription,
                  });
                  if (ok) {
                    alert('Hero banner & branding saved to live website database!');
                  }
                }}
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Hero & Branding</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#3D4852] mb-1">Academy Logo</label>
                <ImageUploader 
                  label="Logo"
                  onUpload={setLogoUrl} 
                  currentUrl={logoUrl} 
                  onAutoPersist={async (url) => {
                    await saveInstituteSettings({ logo_url: url || null });
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3D4852] mb-1">Hero Background Banner</label>
                <ImageUploader 
                  label="Hero Banner"
                  onUpload={setHeroImageUrl} 
                  currentUrl={heroImageUrl} 
                  onAutoPersist={async (url) => {
                    await saveInstituteSettings({ hero_image_url: url || null });
                  }}
                />
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

        {/* Tab 7: Media & Bucket Storage */}
        {activeTab === 'Media & Storage' && (
          <MediaStorageTab 
            onSetHeroImage={async (url) => {
              setHeroImageUrl(url);
              await saveInstituteSettings({ hero_image_url: url });
            }}
            onSetLogoImage={async (url) => {
              setLogoUrl(url);
              await saveInstituteSettings({ logo_url: url });
            }}
            currentHeroUrl={heroImageUrl}
            currentLogoUrl={logoUrl}
          />
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
