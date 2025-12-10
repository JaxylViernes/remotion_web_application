import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiImage,
  FiCheck,
  FiTrash2,
  FiCheckSquare,
  FiSquare,
  FiVideo,
} from "react-icons/fi";
import { ViewMediaModal } from "../../modals/ViewMediaModal";

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
  const [currentFolder, setCurrentFolder] = useState<FolderType>("videos");
  const [deleting, setDeleting] = useState(false);
  const [isFileSelectMode, setIsFileSelectMode] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<any | null>(null);

  const [mediaSearchQuery, setMediaSearchQuery] = useState("");
  const [mediaDateFilter, setMediaDateFilter] = useState<"all" | "today" | "week" | "month" | "year">("all");
  const [mediaSizeFilter, setMediaSizeFilter] = useState<"all" | "small" | "medium" | "large">("all");
  const [mediaSortBy, setMediaSortBy] = useState<"date" | "size" | "name">("date");

  const isWithinDateRange = (date: Date, range: string) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    switch (range) {
      case "today":
        return diffDays < 1;
      case "week":
        return diffDays < 7;
      case "month":
        return diffDays < 30;
      case "year":
        return diffDays < 365;
      default:
        return true;
    }
  };

  const getSizeCategory = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    if (mb < 1) return "small";
    if (mb < 10) return "medium";
    return "large";
  };

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

    if (mediaDateFilter !== "all") {
      filtered = filtered.filter((u) => {
        if (!u.uploadedAt) return false;
        const date = new Date(u.uploadedAt);
        return isWithinDateRange(date, mediaDateFilter);
      });
    }

    if (mediaSizeFilter !== "all") {
      filtered = filtered.filter((u) => {
        if (!u.size) return false;
        return getSizeCategory(u.size) === mediaSizeFilter;
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
  }, [uploads, currentFolder, mediaSearchQuery, mediaDateFilter, mediaSizeFilter, mediaSortBy]);

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
    setMediaDateFilter("all");
    setMediaSizeFilter("all");
    setMediaSortBy("date");
  };

  const hasActiveMediaFilters = mediaSearchQuery || mediaDateFilter !== "all" || mediaSizeFilter !== "all" || mediaSortBy !== "date";

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
              <div className="flex flex-wrap items-center gap-2 flex-1">
                <select
                  value={mediaDateFilter}
                  onChange={(e) => setMediaDateFilter(e.target.value as "all" | "today" | "week" | "month" | "year")}
                  className="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
                <select
                  value={mediaSizeFilter}
                  onChange={(e) => setMediaSizeFilter(e.target.value as "all" | "small" | "medium" | "large")}
                  className="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option value="all">All Sizes</option>
                  <option value="small">Small (&lt; 1MB)</option>
                  <option value="medium">Medium (1-10MB)</option>
                  <option value="large">Large (&gt; 10MB)</option>
                </select>
                <select
                  value={mediaSortBy}
                  onChange={(e) => setMediaSortBy(e.target.value as "date" | "size" | "name")}
                  className="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option value="date">Sort: Date</option>
                  <option value="size">Sort: Size</option>
                  <option value="name">Sort: Name</option>
                </select>
                {hasActiveMediaFilters && (
                  <button
                    onClick={clearMediaFilters}
                    className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium whitespace-nowrap"
                  >
                    Clear filters
                  </button>
                )}
                <span className="hidden lg:block ml-auto text-sm text-gray-600 whitespace-nowrap">
                  {filteredUploads.length} of {uploads.length}
                </span>
              </div>
            </div>
            <div className="lg:hidden text-sm text-gray-600 text-right">
              {filteredUploads.length} of {uploads.length} files
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                      <div className="w-full h-40 bg-gray-100 overflow-hidden relative">
                        {u.type === "image" ? (
                          <img
                            src={u.url}
                            alt="Media"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={u.url}
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            onMouseOver={(e) => {
                              e.currentTarget.play();
                              e.currentTarget.playbackRate = 2;
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                        )}
                      </div>
                      <div className="p-3 border-t border-gray-100 bg-white">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-800 uppercase">
                            {u.type}
                          </span>
                          {u.size && (
                            <span className="text-xs text-gray-500">
                              {formatFileSize(u.size)}
                            </span>
                          )}
                        </div>
                        {u.uploadedAt && (
                          <p className="text-xs text-gray-400">
                            {formatDate(u.uploadedAt)}
                          </p>
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

      {/* View Media Modal */}
      <ViewMediaModal
        isOpen={!!previewMedia}
        onClose={() => setPreviewMedia(null)}
        item={previewMedia ? {
          id: previewMedia.id,
          type: previewMedia.type === "image" ? "gif" : "mp4",
          outputUrl: previewMedia.url,
          projectVidUrl: previewMedia.url,
          aspectRatio: previewMedia.aspectRatio,
        } : null}
        itemType="render"
        templateName={previewMedia?.type?.toUpperCase() || "MEDIA"}
        formattedDate={previewMedia ? formatDate(previewMedia.uploadedAt) : undefined}
      />
    </div>
  );
};

export default MyFilesSection;
