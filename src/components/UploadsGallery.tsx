import React, { useState, useEffect, useMemo } from 'react';
import { 
  HardDrive, 
  CloudUpload, 
  RefreshCw, 
  Trash2, 
  Loader2, 
  Check, 
  X, 
  ExternalLink, 
  Copy, 
  Search, 
  Eye, 
  AlertTriangle, 
  CheckSquare, 
  Square, 
  Sparkles,
  Layers,
  ArrowUpDown,
  Download
} from 'lucide-react';
import { BucketImage } from '../types';
import { 
  STORAGE_BUCKET, 
  listStorageBucketImages, 
  uploadImageToSupabase, 
  deleteImageFromSupabase,
  deleteMultipleImagesFromSupabase 
} from '../lib/supabase';

interface UploadsGalleryProps {
  onSetHeroImage?: (url: string) => Promise<void>;
  onSetLogoImage?: (url: string) => Promise<void>;
  currentHeroUrl?: string;
  currentLogoUrl?: string;
  onSelectImage?: (url: string) => void;
  isModalMode?: boolean;
}

export function UploadsGallery({
  onSetHeroImage,
  onSetLogoImage,
  currentHeroUrl,
  currentLogoUrl,
  onSelectImage,
  isModalMode = false
}: UploadsGalleryProps) {
  const [images, setImages] = useState<BucketImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingPath, setDeletingPath] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | 'info'>('info');

  // Search, sort, selection, and lightbox
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'size-desc' | 'size-asc' | 'name'>('newest');
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
  const [previewImage, setPreviewImage] = useState<BucketImage | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<{
    isOpen: boolean;
    imagesToDelete: BucketImage[];
    isBatch?: boolean;
  }>({ isOpen: false, imagesToDelete: [] });

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const items = await listStorageBucketImages('uploads');
      setImages(items);
    } catch (err) {
      console.error('Failed to load bucket images:', err);
      showStatus('Failed to load storage files.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const showStatus = (msg: string, type: 'success' | 'error' | 'info' = 'info') => {
    setActionStatus(msg);
    setStatusType(type);
    setTimeout(() => setActionStatus(null), 4000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    showStatus(`Uploading ${files.length} file(s) to Supabase Storage bucket...`, 'info');

    let uploadedCount = 0;
    try {
      for (let i = 0; i < files.length; i++) {
        await uploadImageToSupabase(files[i], 'uploads');
        uploadedCount++;
      }
      showStatus(`Successfully uploaded ${uploadedCount} image(s) to storage bucket!`, 'success');
      await loadImages();
    } catch (err: any) {
      console.error('Upload error:', err);
      showStatus('Some files could not be uploaded. Check your connection.', 'error');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleConfirmDelete = async () => {
    const toDelete = confirmDeleteModal.imagesToDelete;
    if (toDelete.length === 0) return;

    setConfirmDeleteModal({ isOpen: false, imagesToDelete: [] });
    
    if (toDelete.length === 1) {
      const img = toDelete[0];
      setDeletingPath(img.path);
      try {
        const ok = await deleteImageFromSupabase(img.path);
        if (ok) {
          setImages(prev => prev.filter(i => i.path !== img.path));
          setSelectedPaths(prev => {
            const next = new Set(prev);
            next.delete(img.path);
            return next;
          });
          if (previewImage?.path === img.path) {
            setPreviewImage(null);
          }
          showStatus(`Permanently deleted "${img.name}" from Supabase storage!`, 'success');
        } else {
          showStatus('Could not delete image. Please try again.', 'error');
        }
      } catch (err) {
        showStatus('Error deleting image from bucket.', 'error');
      } finally {
        setDeletingPath(null);
      }
    } else {
      // Batch deletion
      setIsLoading(true);
      try {
        const paths = toDelete.map(i => i.path);
        const ok = await deleteMultipleImagesFromSupabase(paths);
        if (ok) {
          const pathSet = new Set(paths);
          setImages(prev => prev.filter(i => !pathSet.has(i.path)));
          setSelectedPaths(new Set());
          if (previewImage && pathSet.has(previewImage.path)) {
            setPreviewImage(null);
          }
          showStatus(`Permanently deleted ${toDelete.length} images from Supabase storage!`, 'success');
        } else {
          showStatus('Failed to delete selected images.', 'error');
        }
      } catch (err) {
        showStatus('Error deleting selected images.', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const toggleSelect = (path: string) => {
    setSelectedPaths(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const selectAll = () => {
    if (selectedPaths.size === filteredImages.length) {
      setSelectedPaths(new Set());
    } else {
      setSelectedPaths(new Set(filteredImages.map(i => i.path)));
    }
  };

  // Filter & sort images
  const filteredImages = useMemo(() => {
    let result = [...images];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(img => img.name.toLowerCase().includes(q) || img.path.toLowerCase().includes(q));
    }

    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      }
      if (sortBy === 'size-desc') {
        return (b.size || 0) - (a.size || 0);
      }
      if (sortBy === 'size-asc') {
        return (a.size || 0) - (b.size || 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [images, searchQuery, sortBy]);

  const totalBytes = images.reduce((sum, img) => sum + (img.size || 0), 0);
  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);

  return (
    <section className="bg-white p-4 sm:p-7 rounded-3xl neu-card space-y-6">
      {/* Header with Title & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB] neu-inset">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#3D4852] flex items-center gap-2">
                Supabase Uploads Gallery
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 neu-inset">
                  Bucket: {STORAGE_BUCKET}
                </span>
              </h2>
              <p className="text-xs text-[#6B7280]">
                Admin-only storage browser. Inspect, select, preview, or permanently delete any image from your Supabase bucket.
              </p>
            </div>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <label className="cursor-pointer px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-95">
            <CloudUpload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload Image(s)'}</span>
            <input 
              type="file" 
              accept="image/*"
              multiple
              disabled={isUploading}
              onChange={handleUpload} 
              className="sr-only"
            />
          </label>

          <button
            type="button"
            onClick={loadImages}
            disabled={isLoading}
            className="px-3.5 py-2 bg-[#E0E5EC] hover:bg-gray-200 text-[#3D4852] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh bucket contents from server"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#2563EB]' : ''}`} />
            <span>Refresh</span>
          </button>

          {selectedPaths.size > 0 && (
            <button
              type="button"
              onClick={() => {
                const toDel = images.filter(i => selectedPaths.has(i.path));
                setConfirmDeleteModal({
                  isOpen: true,
                  imagesToDelete: toDel,
                  isBatch: true,
                });
              }}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected ({selectedPaths.size})</span>
            </button>
          )}
        </div>
      </div>

      {/* Storage Metrics & Folder Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#E0E5EC] neu-inset flex items-center gap-3">
          <HardDrive className="w-5 h-5 text-[#2563EB]" />
          <div>
            <p className="text-[11px] font-semibold text-[#6B7280]">Total Bucket Files</p>
            <p className="text-sm font-extrabold text-[#3D4852]">{images.length} images</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#E0E5EC] neu-inset flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <div>
            <p className="text-[11px] font-semibold text-[#6B7280]">Storage Consumed</p>
            <p className="text-sm font-extrabold text-[#3D4852]">{totalMB} MB</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#E0E5EC] neu-inset flex items-center gap-3">
          <div className="p-1 rounded-lg bg-blue-100 text-blue-700">
            <Eye className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-[#6B7280]">Folder Path</p>
            <p className="text-xs font-mono font-bold text-[#3D4852] truncate">uploads/ + root</p>
          </div>
        </div>
      </div>

      {/* Action status notification */}
      {actionStatus && (
        <div className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
          statusType === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : statusType === 'error'
            ? 'bg-red-50 border-red-200 text-red-900'
            : 'bg-blue-50 border-blue-200 text-blue-900'
        }`}>
          <span className="flex items-center gap-2">
            {statusType === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : statusType === 'error' ? (
              <AlertTriangle className="w-4 h-4 text-red-600" />
            ) : (
              <Check className="w-4 h-4 text-blue-600" />
            )}
            {actionStatus}
          </span>
          <button 
            onClick={() => setActionStatus(null)} 
            className="text-gray-500 hover:text-gray-800 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Search, Filter & Bulk Select Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#E0E5EC] p-3 rounded-2xl neu-inset">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search images in Supabase bucket..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="text-xs font-bold text-[#3D4852] bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="size-desc">Largest Size</option>
              <option value="size-asc">Smallest Size</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          {filteredImages.length > 0 && (
            <button
              type="button"
              onClick={selectAll}
              className="px-3 py-1.5 bg-white hover:bg-gray-100 text-[#3D4852] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              title={selectedPaths.size === filteredImages.length ? "Deselect all" : "Select all"}
            >
              {selectedPaths.size === filteredImages.length ? (
                <CheckSquare className="w-3.5 h-3.5 text-[#2563EB]" />
              ) : (
                <Square className="w-3.5 h-3.5 text-gray-500" />
              )}
              <span className="hidden sm:inline">
                {selectedPaths.size === filteredImages.length ? 'Deselect All' : 'Select All'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Images Grid */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-[#2563EB]">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-xs font-bold">Scanning Supabase Storage bucket...</span>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-[#F9FAFB] rounded-3xl border-2 border-dashed border-gray-300 p-8">
          <HardDrive className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="text-base font-bold text-[#3D4852]">
            {searchQuery ? 'No images match your search' : 'Supabase Storage Bucket is empty'}
          </h3>
          <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
            {searchQuery 
              ? 'Try changing your search query or clear the filter.'
              : 'Upload images using the button above, or add pictures to any page section to manage them here.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredImages.map((img) => {
            const isHero = currentHeroUrl === img.url;
            const isLogo = currentLogoUrl === img.url;
            const isSelected = selectedPaths.has(img.path);
            const isDeleting = deletingPath === img.path;

            return (
              <div 
                key={img.path}
                className={`bg-[#E0E5EC] p-3.5 rounded-3xl neu-card flex flex-col justify-between space-y-3 border transition-all duration-200 hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-[#2563EB] border-[#2563EB]' : 'border-gray-200'
                }`}
              >
                {/* Image Thumbnail with Overlay Badges */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-white shadow-inner flex items-center justify-center group">
                  <img 
                    src={img.url} 
                    alt={img.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Top-left Select Checkbox */}
                  <button
                    type="button"
                    onClick={() => toggleSelect(img.path)}
                    className="absolute top-2.5 left-2.5 z-10 p-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-white backdrop-blur-xs transition-colors cursor-pointer"
                    title={isSelected ? "Unselect" : "Select"}
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Square className="w-4 h-4 text-white" />
                    )}
                  </button>

                  {/* Status Badges */}
                  <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end z-10">
                    {isHero && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[9px] font-extrabold shadow uppercase tracking-wide">
                        Active Hero
                      </span>
                    )}
                    {isLogo && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-extrabold shadow uppercase tracking-wide">
                        Active Logo
                      </span>
                    )}
                  </div>

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewImage(img)}
                      className="p-2 rounded-xl bg-white/90 text-[#3D4852] hover:bg-white hover:text-[#2563EB] shadow-md transition-colors cursor-pointer"
                      title="Preview full image"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {onSelectImage && (
                      <button
                        type="button"
                        onClick={() => onSelectImage(img.url)}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-md transition-colors cursor-pointer"
                      >
                        Choose
                      </button>
                    )}
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-1">
                  <p className="text-xs font-mono font-bold text-[#3D4852] truncate" title={img.name}>
                    {img.name}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>{img.size ? `${(img.size / 1024).toFixed(1)} KB` : 'Uploaded'}</span>
                    {img.updatedAt && (
                      <span>{new Date(img.updatedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2 pt-2 border-t border-gray-300">
                  {/* Quick Application Assignment (if handlers provided) */}
                  {(onSetHeroImage || onSetLogoImage) && (
                    <div className="grid grid-cols-2 gap-1.5">
                      {onSetHeroImage && (
                        <button
                          type="button"
                          onClick={async () => {
                            await onSetHeroImage(img.url);
                            showStatus(`Set "${img.name}" as active Hero Banner & saved to live website!`, 'success');
                          }}
                          className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                            isHero 
                              ? 'bg-blue-600 text-white shadow-sm' 
                              : 'bg-white hover:bg-blue-50 text-[#2563EB] neu-inset'
                          }`}
                        >
                          {isHero ? '✓ Hero' : 'Use as Hero'}
                        </button>
                      )}

                      {onSetLogoImage && (
                        <button
                          type="button"
                          onClick={async () => {
                            await onSetLogoImage(img.url);
                            showStatus(`Set "${img.name}" as active Logo & saved to live website!`, 'success');
                          }}
                          className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                            isLogo 
                              ? 'bg-emerald-600 text-white shadow-sm' 
                              : 'bg-white hover:bg-emerald-50 text-emerald-700 neu-inset'
                          }`}
                        >
                          {isLogo ? '✓ Logo' : 'Use as Logo'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Bottom Action Row: Copy URL, View External, Delete */}
                  <div className="flex items-center justify-between gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(img.url)}
                      className="px-2 py-1 text-[11px] font-semibold text-gray-700 hover:text-[#2563EB] hover:bg-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                      title="Copy public image URL"
                    >
                      {copiedUrl === img.url ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => {
                        setConfirmDeleteModal({
                          isOpen: true,
                          imagesToDelete: [img],
                          isBatch: false,
                        });
                      }}
                      className="px-2.5 py-1 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                      title="Permanently delete from Supabase storage"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Confirmation Modal for Permanent Delete */}
      {confirmDeleteModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto neu-inset">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-[#3D4852]">
                Permanently Delete {confirmDeleteModal.imagesToDelete.length === 1 ? 'Image' : `${confirmDeleteModal.imagesToDelete.length} Images`}?
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                This will delete {confirmDeleteModal.imagesToDelete.length === 1 ? 'the file' : 'the selected files'} directly from your Supabase storage bucket (<code className="font-mono text-[#3D4852]">{STORAGE_BUCKET}</code>). This action cannot be undone.
              </p>
              {confirmDeleteModal.imagesToDelete.length === 1 && (
                <div className="p-2 bg-gray-50 rounded-xl text-[11px] font-mono text-gray-700 truncate border border-gray-200">
                  {confirmDeleteModal.imagesToDelete[0].name}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteModal({ isOpen: false, imagesToDelete: [] })}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="min-w-0 flex-1 pr-4">
                <h3 className="text-sm font-bold text-[#3D4852] truncate">
                  {previewImage.name}
                </h3>
                <p className="text-[11px] text-[#6B7280]">
                  {previewImage.size ? `${(previewImage.size / 1024).toFixed(1)} KB` : 'Image'} • {new Date(previewImage.updatedAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview Body */}
            <div className="flex-1 overflow-auto p-4 bg-[#1E293B] flex items-center justify-center min-h-[300px]">
              <img 
                src={previewImage.url} 
                alt={previewImage.name} 
                className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Modal Footer with Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => copyToClipboard(previewImage.url)}
                className="px-3.5 py-2 bg-white hover:bg-gray-100 text-[#3D4852] text-xs font-bold rounded-xl border border-gray-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedUrl === previewImage.url ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">URL Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-600" />
                    <span>Copy Public URL</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={previewImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-white hover:bg-gray-100 text-[#3D4852] text-xs font-bold rounded-xl border border-gray-200 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Tab</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const img = previewImage;
                    setConfirmDeleteModal({
                      isOpen: true,
                      imagesToDelete: [img],
                      isBatch: false,
                    });
                  }}
                  className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
