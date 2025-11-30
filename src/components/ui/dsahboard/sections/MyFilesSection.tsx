import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiImage,
  FiCheck,
  FiTrash2,
  FiDownload,
  FiDatabase,
  FiX,
  FiCheckSquare,
  FiSquare,
  FiFile,
} from "react-icons/fi";
import { ViewMediaModal } from "../../modals/ViewMediaModal";

type FolderType = "media" | "datasets";

interface MyFilesSectionProps {
  uploads: any[];
  uploadFilter: "all" | "image" | "video";
  setUploadFilter: React.Dispatch<React.SetStateAction<"all" | "image" | "video">>;
  loadingUploads: boolean;
  selectedUploads: number[];
  setSelectedUploads: React.Dispatch<React.SetStateAction<number[]>>;
  handleDeleteUploads: () => Promise<void>;
  userDatasets: any[];
  selectedDatasets: number[];
  setSelectedDatasets: React.Dispatch<React.SetStateAction<number[]>>;
  loadingDatasets: boolean;
  handleDeleteDataset: () => Promise<void>;
}

export const MyFilesSection: React.FC<MyFilesSectionProps> = ({
  uploads = [],
  uploadFilter,
  setUploadFilter,
  loadingUploads = false,
  selectedUploads = [],
  setSelectedUploads,
  handleDeleteUploads,
  userDatasets = [],
  selectedDatasets = [],
  setSelectedDatasets,
  loadingDatasets = false,
  handleDeleteDataset,
}) => {
  const [currentFolder, setCurrentFolder] = useState<FolderType>("media");
  const [deleting, setDeleting] = useState(false);
  const [isFileSelectMode, setIsFileSelectMode] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<any | null>(null);
  const [previewDataset, setPreviewDataset] = useState<any | null>(null);

  const [mediaSearchQuery, setMediaSearchQuery] = useState("");
  const [mediaDateFilter, setMediaDateFilter] = useState<"all" | "today" | "week" | "month" | "year">("all");
  const [mediaSizeFilter, setMediaSizeFilter] = useState<"all" | "small" | "medium" | "large">("all");
  const [mediaSortBy, setMediaSortBy] = useState<"date" | "size" | "name">("date");

  const [datasetSearchQuery, setDatasetSearchQuery] = useState("");
  const [datasetTypeFilter, setDatasetTypeFilter] = useState<"all" | "json" | "xlsx" | "csv" | "pdf">("all");
  const [datasetDateFilter, setDatasetDateFilter] = useState<"all" | "today" | "week" | "month" | "year">("all");
  const [datasetSizeFilter, setDatasetSizeFilter] = useState<"all" | "small" | "medium" | "large">("all");
  const [datasetSortBy, setDatasetSortBy] = useState<"date" | "size" | "name">("date");

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

    if (uploadFilter !== "all") {
      filtered = filtered.filter((u) => u.type === uploadFilter);
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
  }, [uploads, uploadFilter, mediaSearchQuery, mediaDateFilter, mediaSizeFilter, mediaSortBy]);

  const filteredDatasets = useMemo(() => {
    if (!userDatasets || userDatasets.length === 0) return [];

    let filtered = userDatasets;

    if (datasetSearchQuery.trim()) {
      filtered = filtered.filter((dataset: any) => {
        const fileName = dataset.url.replace(/.*\/datasets\//, "").toLowerCase();
        return fileName.includes(datasetSearchQuery.toLowerCase());
      });
    }

    if (datasetTypeFilter !== "all") {
      filtered = filtered.filter((dataset: any) =>
        dataset.type === datasetTypeFilter
      );
    }

    if (datasetDateFilter !== "all") {
      filtered = filtered.filter((dataset: any) => {
        if (!dataset.uploadedAt) return false;
        const date = new Date(dataset.uploadedAt);
        return isWithinDateRange(date, datasetDateFilter);
      });
    }

    if (datasetSizeFilter !== "all") {
      filtered = filtered.filter((dataset: any) => {
        if (!dataset.size) return false;
        return getSizeCategory(dataset.size) === datasetSizeFilter;
      });
    }

    filtered = [...filtered].sort((a: any, b: any) => {
      switch (datasetSortBy) {
        case "date":
          const dateA = a.uploadedAt ? new Date(a.uploadedAt).getTime() : 0;
          const dateB = b.uploadedAt ? new Date(b.uploadedAt).getTime() : 0;
          return dateB - dateA;
        case "size":
          return (b.size || 0) - (a.size || 0);
        case "name":
          const nameA = a.url.replace(/.*\/datasets\//, "").toLowerCase();
          const nameB = b.url.replace(/.*\/datasets\//, "").toLowerCase();
          return nameA.localeCompare(nameB);
        default:
          return 0;
      }
    });

    return filtered;
  }, [userDatasets, datasetSearchQuery, datasetTypeFilter, datasetDateFilter, datasetSizeFilter, datasetSortBy]);

  const startDelete = async (type: "uploads" | "datasets") => {
    setDeleting(true);
    try {
      await (type === "uploads" ? handleDeleteUploads() : handleDeleteDataset());
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelFileSelection = () => {
    setSelectedUploads([]);
    setSelectedDatasets([]);
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

  const handleDatasetClick = (dataset: any, idx: number) => {
    if (isFileSelectMode) {
      setSelectedDatasets((prev) =>
        prev.includes(dataset.id || idx)
          ? prev.filter((id) => id !== (dataset.id || idx))
          : [...prev, dataset.id || idx]
      );
    } else {
      setPreviewDataset(dataset);
    }
  };

  const handleDatasetRightClick = (dataset: any, idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFileSelectMode) {
      setIsFileSelectMode(true);
    }
    setSelectedDatasets((prev) =>
      prev.includes(dataset.id || idx)
        ? prev.filter((id) => id !== (dataset.id || idx))
        : [...prev, dataset.id || idx]
    );
  };

  const canPreviewInBrowser = (url: string, type?: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    const previewableTypes = ['pdf', 'json', 'txt', 'csv', 'xlsx'];
    return previewableTypes.includes(extension || '') ||
           previewableTypes.includes(type || '');
  };

  const clearMediaFilters = () => {
    setMediaSearchQuery("");
    setMediaDateFilter("all");
    setMediaSizeFilter("all");
    setMediaSortBy("date");
    setUploadFilter("all");
  };

  const clearDatasetFilters = () => {
    setDatasetSearchQuery("");
    setDatasetTypeFilter("all");
    setDatasetDateFilter("all");
    setDatasetSizeFilter("all");
    setDatasetSortBy("date");
  };

  const hasActiveMediaFilters = mediaSearchQuery || mediaDateFilter !== "all" || mediaSizeFilter !== "all" || uploadFilter !== "all" || mediaSortBy !== "date";
  const hasActiveDatasetFilters = datasetSearchQuery || datasetTypeFilter !== "all" || datasetDateFilter !== "all" || datasetSizeFilter !== "all" || datasetSortBy !== "date";

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Category Tabs and Select Button (Fixed at top) */}
      <div className="flex-shrink-0 bg-white px-6 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentFolder("media")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                currentFolder === "media"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiImage size={16} />
              Media
            </button>
            <button
              onClick={() => setCurrentFolder("datasets")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                currentFolder === "datasets"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiDatabase size={16} />
              Datasets
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
        {currentFolder === "media" && (
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
                  value={uploadFilter}
                  onChange={(e) => setUploadFilter(e.target.value as "all" | "image" | "video")}
                  className="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                </select>
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

        {/* DATASET FILTERS */}
        {currentFolder === "datasets" && (
          <div className="space-y-3">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
              <div className="relative w-full lg:w-auto lg:min-w-[280px]">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search datasets..."
                  value={datasetSearchQuery}
                  onChange={(e) => setDatasetSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 flex-1">
                <select
                  value={datasetTypeFilter}
                  onChange={(e) => setDatasetTypeFilter(e.target.value as "all" | "json" | "xlsx" | "csv" | "pdf")}
                  className="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="json">JSON</option>
                  <option value="xlsx">XLSX</option>
                  <option value="csv">CSV</option>
                  <option value="pdf">PDF</option>
                </select>
                <select
                  value={datasetDateFilter}
                  onChange={(e) => setDatasetDateFilter(e.target.value as "all" | "today" | "week" | "month" | "year")}
                  className="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
                <select
                  value={datasetSizeFilter}
                  onChange={(e) => setDatasetSizeFilter(e.target.value as "all" | "small" | "medium" | "large")}
                  className="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option value="all">All Sizes</option>
                  <option value="small">Small (&lt; 1MB)</option>
                  <option value="medium">Medium (1-10MB)</option>
                  <option value="large">Large (&gt; 10MB)</option>
                </select>
                <select
                  value={datasetSortBy}
                  onChange={(e) => setDatasetSortBy(e.target.value as "date" | "size" | "name")}
                  className="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option value="date">Sort: Date</option>
                  <option value="size">Sort: Size</option>
                  <option value="name">Sort: Name</option>
                </select>
                {hasActiveDatasetFilters && (
                  <button
                    onClick={clearDatasetFilters}
                    className="px-3 py-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium whitespace-nowrap"
                  >
                    Clear filters
                  </button>
                )}
                <span className="hidden lg:block ml-auto text-sm text-gray-600 whitespace-nowrap">
                  {filteredDatasets.length} of {userDatasets.length}
                </span>
              </div>
            </div>
            <div className="lg:hidden text-sm text-gray-600 text-right">
              {filteredDatasets.length} of {userDatasets.length} datasets
            </div>
          </div>
        )}
      </div>

      {/* Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-6 pb-20">
        {/* MEDIA */}
        {currentFolder === "media" && (
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

        {/* DATASETS */}
        {currentFolder === "datasets" && (
          <div className="py-6">
            {loadingDatasets ? (
              <p className="text-indigo-500">Loading datasets...</p>
            ) : filteredDatasets.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <FiDatabase className="mx-auto text-4xl mb-2 opacity-50" />
                {hasActiveDatasetFilters ? (
                  <>
                    <p className="mb-2">No datasets match your filters</p>
                    <button
                      onClick={clearDatasetFilters}
                      className="text-indigo-600 hover:text-indigo-700 text-sm underline"
                    >
                      Clear filters
                    </button>
                  </>
                ) : (
                  <p>No datasets found.</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredDatasets.map((dataset, idx) => {
                  const isSelected = selectedDatasets.includes(dataset.id || idx);
                  const fileName = dataset.url.replace(/^.*\/datasets\//, "");
                  const iconSrc =
                    dataset.type === "json"
                      ? "https://res.cloudinary.com/dnxc1lw18/image/upload/v1761045051/json_n749ko.png"
                      : dataset.type === "xlsx"
                      ? "https://res.cloudinary.com/dnxc1lw18/image/upload/v1761045053/xlsx_uvojck.png"
                      : "/images/file.png";

                  return (
                    <div
                      key={dataset.id || idx}
                      onClick={() => handleDatasetClick(dataset, idx)}
                      onContextMenu={(e) => handleDatasetRightClick(dataset, idx, e)}
                      className={`relative rounded-xl border transition-all cursor-pointer bg-white hover:shadow-md ${
                        isSelected
                          ? "border-indigo-400 ring-2 ring-indigo-200"
                          : "border-gray-200"
                      }`}
                    >
                      {isFileSelectMode && isSelected && (
                        <div className="absolute top-2 right-2 bg-indigo-500 text-white rounded-full p-1 shadow z-10">
                          <FiCheck size={14} />
                        </div>
                      )}
                      <div className="flex items-center justify-center h-32 bg-gradient-to-br from-gray-50 to-gray-100">
                        <img
                          src={iconSrc}
                          alt={dataset.type}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <div className="p-3 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-800 truncate mb-2" title={fileName}>
                          {fileName}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-600 uppercase">
                            {dataset.type}
                          </span>
                          {dataset.size && (
                            <span className="text-xs text-gray-500">
                              {formatFileSize(dataset.size)}
                            </span>
                          )}
                        </div>
                        {dataset.uploadedAt && (
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(dataset.uploadedAt)}
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
      {(selectedUploads.length > 0 || selectedDatasets.length > 0) && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded-full px-6 py-2 flex items-center gap-4 z-50">
          <span className="text-sm font-medium text-gray-700">
            {selectedUploads.length > 0
              ? `${selectedUploads.length} selected`
              : `${selectedDatasets.length} selected`}
          </span>
          <button
            onClick={handleCancelFileSelection}
            disabled={deleting}
            className="text-sm text-gray-500 hover:text-gray-800 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              startDelete(selectedUploads.length > 0 ? "uploads" : "datasets")
            }
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

      {/* Preview Modal for Datasets */}
      {previewDataset && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewDataset(null)}
        >
          {/* Mobile Layout */}
          <div
            className="lg:hidden bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex-1 min-w-0 pr-3">
                <h3 className="text-base font-semibold text-gray-800 truncate">
                  {previewDataset.url.replace(/^.*\/datasets\//, "")}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {previewDataset.type.toUpperCase()} File
                  {previewDataset.size && ` • ${formatFileSize(previewDataset.size)}`}
                </p>
              </div>
              <button
                onClick={() => setPreviewDataset(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition flex-shrink-0"
              >
                <FiX size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-gray-50 p-4">
              {canPreviewInBrowser(previewDataset.url, previewDataset.type) ? (
                previewDataset.type === "pdf" ? (
                  <iframe
                    src={previewDataset.url}
                    className="w-full h-full min-h-[50vh] rounded-lg"
                    title="PDF Preview"
                  />
                ) : (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <FiFile className="text-indigo-500" size={24} />
                      <div>
                        <p className="font-medium text-gray-800 text-sm">File Preview</p>
                        <p className="text-xs text-gray-500">
                          This file can be viewed in your browser
                        </p>
                      </div>
                    </div>
                    <a
                      href={previewDataset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 underline text-xs"
                    >
                      Open in new tab →
                    </a>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[40vh] text-center px-4">
                  <FiFile className="text-gray-400 mb-4" size={40} />
                  <p className="text-gray-600 font-medium mb-2 text-sm">
                    Preview not available
                  </p>
                  <p className="text-gray-500 text-xs mb-6">
                    This file type cannot be previewed in the browser.
                    <br />
                    Please download it to view the contents.
                  </p>
                  <a
                    href={previewDataset.url}
                    download
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition"
                  >
                    <FiDownload size={16} />
                    Download File
                  </a>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <a
                href={previewDataset.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition"
              >
                <FiDownload size={16} />
                Download
              </a>
              <button
                onClick={() => setPreviewDataset(null)}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium text-xs"
              >
                Close
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div
            className="hidden lg:flex bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-200 flex-shrink-0">
              <div className="flex-1 min-w-0 pr-3">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {previewDataset.url.replace(/^.*\/datasets\//, "")}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {previewDataset.type.toUpperCase()} File
                  {previewDataset.size && ` • ${formatFileSize(previewDataset.size)}`}
                </p>
              </div>
              <button
                onClick={() => setPreviewDataset(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition flex-shrink-0"
              >
                <FiX size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-gray-50 p-6">
              {canPreviewInBrowser(previewDataset.url, previewDataset.type) ? (
                previewDataset.type === "pdf" ? (
                  <iframe
                    src={previewDataset.url}
                    className="w-full h-full min-h-[60vh] rounded-lg"
                    title="PDF Preview"
                  />
                ) : (
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <FiFile className="text-indigo-500" size={24} />
                      <div>
                        <p className="font-medium text-gray-800">File Preview</p>
                        <p className="text-sm text-gray-500">
                          This file can be viewed in your browser
                        </p>
                      </div>
                    </div>
                    <a
                      href={previewDataset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 underline text-sm"
                    >
                      Open in new tab →
                    </a>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[40vh] text-center">
                  <FiFile className="text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 font-medium mb-2">
                    Preview not available
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    This file type cannot be previewed in the browser.
                    <br />
                    Please download it to view the contents.
                  </p>
                  <a
                    href={previewDataset.url}
                    download
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition"
                  >
                    <FiDownload size={16} />
                    Download File
                  </a>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <a
                href={previewDataset.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition"
              >
                <FiDownload size={16} />
                Download
              </a>
              <button
                onClick={() => setPreviewDataset(null)}
                className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};