import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiImage,
  FiCheck,
  FiTrash2,
  FiCheckSquare,
  FiSquare,
  FiVideo,
  FiEdit,
  FiX,
} from "react-icons/fi";

type FolderType = "videos" | "images";

interface MyFilesSectionProps {
  uploads: any[];
  loadingUploads: boolean;
  selectedUploads: number[];
  setSelectedUploads: React.Dispatch<React.SetStateAction<number[]>>;
  handleDeleteUploads: () => Promise<void>;
}

export const MyFilesSection: React.FC<MyFilesSectionProps> = ({
  uploads = [],
  loadingUploads = false,
  selectedUploads = [],
  setSelectedUploads,
  handleDeleteUploads,
}) => {
  const navigate = useNavigate();
  const [currentFolder, setCurrentFolder] = useState<FolderType>("videos");
  const [deleting, setDeleting] = useState(false);
  const [isFileSelectMode, setIsFileSelectMode] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<any | null>(null);
  const [videoDurations, setVideoDurations] = useState<Record<number, number>>({});

  const [mediaSearchQuery, setMediaSearchQuery] = useState("");
  const [mediaSourceFilter, setMediaSourceFilter] = useState<"all" | "uploads" | "stock">("all");
  const [mediaSortBy, setMediaSortBy] = useState<"date" | "size" | "name">("date");

  // const isWithinDateRange = (date: Date, range: string) => {
  //   const now = new Date();
  //   const diffTime = now.getTime() - date.getTime();
  //   const diffDays = diffTime / (1000 * 60 * 60 * 24);

  //   switch (range) {
  //     case "today":
  //       return diffDays < 1;
  //     case "week":
  //       return diffDays < 7;
  //     case "month":
  //       return diffDays < 30;
  //     case "year":
  //       return diffDays < 365;
  //     default:
  //       return true;
  //   }
  // };

  // const getSizeCategory = (bytes: number) => {
  //   const mb = bytes / (1024 * 1024);
  //   if (mb < 1) return "small";
  //   if (mb < 10) return "medium";
  //   return "large";
  // };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "Unknown";
    const mb = bytes / (1024 * 1024);
    if (mb < 1) {
      const kb = bytes / 1024;
      return `${kb.toFixed(2)} KB`;
    }
    return `${mb.toFixed(2)} MB`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredUploads = useMemo(() => {
    if (!uploads || uploads.length === 0) return [];

    let filtered = uploads;

    // Filter by current tab (videos or images)
    if (currentFolder === "videos") {
      filtered = filtered.filter((u) => u.type === "video");
    } else if (currentFolder === "images") {
      filtered = filtered.filter((u) => u.type === "image");
    }

    if (mediaSearchQuery.trim()) {
      filtered = filtered.filter((u) => {
        const fileName = u.url.split('/').pop()?.toLowerCase() || '';
        return fileName.includes(mediaSearchQuery.toLowerCase());
      });
    }

    if (mediaSourceFilter !== "all") {
      filtered = filtered.filter((u) => {
        if (mediaSourceFilter === "uploads") return u.source === "upload" || u.url?.includes("cloudinary");
        if (mediaSourceFilter === "stock") return u.source === "stock";
        return true;
      });
    }

    filtered = [...filtered].sort((a, b) => {
      switch (mediaSortBy) {
        case "date":
          const dateA = a.uploadedAt ? new Date(a.uploadedAt).getTime() : 0;
          const dateB = b.uploadedAt ? new Date(b.uploadedAt).getTime() : 0;
          return dateB - dateA;
        case "size":
          return (b.size || 0) - (a.size || 0);
        case "name":
          const nameA = a.url.split('/').pop()?.toLowerCase() || '';
          const nameB = b.url.split('/').pop()?.toLowerCase() || '';
          return nameA.localeCompare(nameB);
        default:
          return 0;
      }
    });

    return filtered;
  }, [uploads, currentFolder, mediaSearchQuery, mediaSourceFilter, mediaSortBy]);

  const startDelete = async () => {
    setDeleting(true);
    try {
      await handleDeleteUploads();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelFileSelection = () => {
    setSelectedUploads([]);
    setIsFileSelectMode(false);
  };

  const handleMediaClick = (media: any) => {
    if (isFileSelectMode) {
      setSelectedUploads((prev) =>
        prev.includes(media.id)
          ? prev.filter((id) => id !== media.id)
          : [...prev, media.id]
      );
    } else {
      setPreviewMedia(media);
    }
  };

  const handleMediaRightClick = (media: any, e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFileSelectMode) {
      setIsFileSelectMode(true);
    }
    setSelectedUploads((prev) =>
      prev.includes(media.id)
        ? prev.filter((id) => id !== media.id)
        : [...prev, media.id]
    );
  };

  const clearMediaFilters = () => {
    setMediaSearchQuery("");
    setMediaSourceFilter("all");
    setMediaSortBy("date");
  };


  const handleEdit = (media: any) => {
  navigate('/editor', {
    state: {
      fromMyFiles: true,
      mediaData: {
        url: media.url,
        type: media.type,
        name: media.url?.split('/').pop() || 'media',
        id: media.id,
      }
    }
  });
};

  const hasActiveMediaFilters = mediaSearchQuery || mediaSourceFilter !== "all" || mediaSortBy !== "date";

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Category Tabs and Select Button (Fixed at top) */}
      <div className="flex-shrink-0 bg-white px-6 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentFolder("videos")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                currentFolder === "videos"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiVideo size={16} />
              Videos
            </button>
            <button
              onClick={() => setCurrentFolder("images")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                currentFolder === "images"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiImage size={16} />
              Images
            </button>
          </div>
          <button
            onClick={() => {
              if (isFileSelectMode) {
                handleCancelFileSelection();
              } else {
                setIsFileSelectMode(true);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              isFileSelectMode
                ? "text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isFileSelectMode ? <FiCheckSquare size={16} /> : <FiSquare size={16} />}
            {isFileSelectMode ? "Cancel Select" : "Select"}
          </button>
        </div>

        {/* MEDIA FILTERS */}
        {(currentFolder === "videos" || currentFolder === "images") && (
          <div className="space-y-3">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
              <div className="relative w-full lg:w-auto lg:min-w-[280px]">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search media files..."
                  value={mediaSearchQuery}
                  onChange={(e) => setMediaSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>
             <select
                value={mediaSourceFilter}
                onChange={(e) => setMediaSourceFilter(e.target.value as "all" | "uploads" | "stock")}
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              >
                <option value="all">{currentFolder === "videos" ? "All Videos" : "All Images"}</option>
                <option value="uploads">User Uploads</option>
                <option value="stock">{currentFolder === "videos" ? "Stock Videos" : "Stock Images"}</option>
              </select>
              <select
                value={mediaSortBy}
                onChange={(e) => setMediaSortBy(e.target.value as "date" | "size" | "name")}
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              >
                <option value="date">Sort: Date</option>
                <option value="size">Sort: Size</option>
                <option value="name">Sort: Name</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-6 pb-20">
        {/* MEDIA (Videos and Images) */}
        {(currentFolder === "videos" || currentFolder === "images") && (
          <div className="py-6">
            {loadingUploads ? (
              <p className="text-indigo-500">Loading uploads...</p>
            ) : filteredUploads.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <FiImage className="mx-auto text-4xl mb-2 opacity-50" />
                {hasActiveMediaFilters ? (
                  <>
                    <p className="mb-2">No files match your filters</p>
                    <button
                      onClick={clearMediaFilters}
                      className="text-indigo-600 hover:text-indigo-700 text-sm underline"
                    >
                      Clear filters
                    </button>
                  </>
                ) : (
                  <p>No uploads yet.</p>
                )}
              </div>
            ) : (
              <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                {filteredUploads.map((u) => {
                  const selected = selectedUploads.includes(u.id);
                  return (
                    <div
  key={u.id}
  onClick={() => handleMediaClick(u)}
  onContextMenu={(e) => handleMediaRightClick(u, e)}
  className={`relative rounded-xl border transition-all cursor-pointer bg-white hover:shadow-md overflow-hidden ${
                        selected
                          ? "border-indigo-400 ring-2 ring-indigo-200"
                          : "border-gray-200"
                      }`}
                    >
                      {isFileSelectMode && selected && (
                        <div className="absolute top-2 right-2 bg-indigo-500 text-white rounded-full p-1 shadow z-10">
                          <FiCheck size={14} />
                        </div>
                      )}
                      <div className="w-full bg-gray-200 overflow-hidden relative rounded-2xl">
                        {u.type === "image" ? (
                          <img
                            src={u.url}
                            alt="Media"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <video
                              src={u.url}
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                              onLoadedMetadata={(e) => {
                                const duration = e.currentTarget.duration;
                                setVideoDurations((prev) => ({ ...prev, [u.id]: duration }));
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.play();
                                e.currentTarget.playbackRate = 2;
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.pause();
                                e.currentTarget.currentTime = 0;
                              }}
                            />
                            {videoDurations[u.id] && (
                              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                                {formatDuration(videoDurations[u.id])}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Bar for Files */}
      {selectedUploads.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded-full px-6 py-2 flex items-center gap-4 z-50">
          <span className="text-sm font-medium text-gray-700">
            {selectedUploads.length} selected
          </span>
          <button
            onClick={handleCancelFileSelection}
            disabled={deleting}
            className="text-sm text-gray-500 hover:text-gray-800 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => startDelete()}
            disabled={deleting}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:opacity-90 transition disabled:opacity-50 font-semibold"
          >
            <FiTrash2 size={14} />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}

      {/* Preview Media Modal with Download */}
      {previewMedia && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewMedia(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-[90vw] max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 truncate max-w-md">
  {previewMedia.url?.split('/').pop() || 'File Preview'}
</h3>
                <p className="text-sm text-gray-500">
                  {formatDate(previewMedia.uploadedAt)} • {formatFileSize(previewMedia.size)}
                </p>
              </div>
              <button
                onClick={() => setPreviewMedia(null)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <FiX size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Media Content */}
            <div className="p-2 bg-gray-50">
              <div className="flex items-center justify-center overflow-hidden rounded-lg">
                {previewMedia.type === "image" ? (
                  <img
                    src={previewMedia.url}
                    alt="Preview"
                    className="max-w-[80vw] max-h-[70vh] object-contain rounded-lg"
                  />
                ) : (
                  <video
                    src={previewMedia.url}
                    controls
                    autoPlay
                    className="max-w-[80vw] max-h-[70vh] object-contain rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Footer with Download Button */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              
               <button
  onClick={() => {
    setPreviewMedia(null);
    handleEdit(previewMedia);
  }}
  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition shadow-md"
>
  <FiEdit size={18} />
  Edit
</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFilesSection;
