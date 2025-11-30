import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiCheck,
  FiTrash2,
  FiGrid,
  FiList,
  FiFilm,
  FiCheckSquare,
  FiSquare,
} from "react-icons/fi";
import { templatesWithTheirIds } from "../../../../data/TemplateIds";
import { ViewMediaModal } from "../../modals/ViewMediaModal";

interface RenderItem {
  id: string;
  type: "mp4" | "gif" | "webm";
  outputUrl: string;
  templateId?: number;
  renderedAt?: string;
  aspectRatio?: number;
  [key: string]: any;
}

interface MyRendersSectionProps {
  renders?: RenderItem[];
  loadingRenders?: boolean;
  selectedRenders?: string[];
  setSelectedRenders?: React.Dispatch<React.SetStateAction<string[]>>;
  handleDeleteRenders?: () => Promise<void>;
}

export const MyRendersSection: React.FC<MyRendersSectionProps> = ({
  renders = [],
  loadingRenders = false,
  selectedRenders = [],
  setSelectedRenders = () => {},
  handleDeleteRenders = async () => {},
}) => {
  const [renderSearchQuery, setRenderSearchQuery] = useState("");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [previewRender, setPreviewRender] = useState<RenderItem | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | "all">("all");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

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

  const filteredRenders = useMemo(() => {
    if (!renders || renders.length === 0) return [];

    let filtered =
      selectedTemplateId === "all"
        ? renders
        : renders.filter((r) => r.templateId === selectedTemplateId);

    if (renderSearchQuery.trim()) {
      filtered = filtered.filter((render) => {
        const templateName =
          typeof render.templateId === "number" &&
          templatesWithTheirIds[String(render.templateId)]
            ? templatesWithTheirIds[String(render.templateId)]
            : "Unknown Template";
        return templateName.toLowerCase().includes(renderSearchQuery.toLowerCase());
      });
    }

    return filtered.slice().sort((a, b) => {
      const aDate = a.renderedAt ? new Date(a.renderedAt).getTime() : 0;
      const bDate = b.renderedAt ? new Date(b.renderedAt).getTime() : 0;
      return sortOrder === "latest" ? bDate - aDate : aDate - bDate;
    });
  }, [renders, selectedTemplateId, sortOrder, renderSearchQuery]);

  const handleSelectAllRenders = () => {
    if (!setSelectedRenders || !filteredRenders) return;
    if (selectedRenders.length === filteredRenders.length) {
      setSelectedRenders([]);
    } else {
      setSelectedRenders(filteredRenders.map((r) => r.id));
    }
  };

  const handleCancelRenders = () => {
    if (setSelectedRenders) {
      setSelectedRenders([]);
      setIsSelectMode(false);
    }
  };

  const toggleRenderSelection = (id: string) => {
    setSelectedRenders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleRenderClick = (render: RenderItem) => {
    if (isSelectMode) {
      toggleRenderSelection(render.id);
    } else {
      setPreviewRender(render);
    }
  };

  const handleRenderRightClick = (render: RenderItem, e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSelectMode) {
      setIsSelectMode(true);
    }
    toggleRenderSelection(render.id);
  };

  const getTemplateName = (render: RenderItem) => {
    if (typeof render.templateId === "number" && templatesWithTheirIds[String(render.templateId)]) {
      return templatesWithTheirIds[String(render.templateId)] as string;
    }
    return "Unknown Template";
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header (Fixed at top) */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
            My Renders
          </h2>
          <button
            onClick={() => {
              if (isSelectMode) {
                setSelectedRenders([]);
                setIsSelectMode(false);
              } else {
                setIsSelectMode(true);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              isSelectMode
                ? "text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isSelectMode ? <FiCheckSquare size={16} /> : <FiSquare size={16} />}
            {isSelectMode ? "Cancel Select" : "Select"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search renders..."
              value={renderSearchQuery}
              onChange={(e) => setRenderSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedTemplateId}
              onChange={(e) =>
                setSelectedTemplateId(
                  e.target.value === "all" ? "all" : Number(e.target.value)
                )
              }
              className="rounded-lg border border-gray-200 bg-white text-sm px-3 py-2 focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value="all">All Templates</option>
              {Object.entries(templatesWithTheirIds).map(([id, name]) => (
                <option key={id} value={id}>
                  {name as string}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "latest" | "oldest")}
              className="rounded-lg border border-gray-200 bg-white text-sm px-3 py-2 focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setLayout("grid")}
                className={`p-2 rounded-md ${
                  layout === "grid"
                    ? "bg-indigo-100 text-indigo-700 shadow-sm"
                    : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                <FiGrid size={17} />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`p-2 rounded-md ${
                  layout === "list"
                    ? "bg-indigo-100 text-indigo-700 shadow-sm"
                    : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                <FiList size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#f9fafc]">
        {loadingRenders ? (
          <div className="text-center text-gray-500 animate-pulse p-6">
            Loading renders...
          </div>
        ) : !renders || renders.length === 0 ? (
          <div className="text-center py-10 text-gray-500 p-6">
            <FiFilm className="mx-auto text-4xl mb-2 opacity-50" />
            No renders found.
          </div>
        ) : filteredRenders.length === 0 ? (
          <div className="text-center py-10 text-gray-500 p-6">
            <FiFilm className="mx-auto text-4xl mb-2 opacity-50" />
            No renders match your filter.
          </div>
        ) : layout === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRenders.map((render) => {
              const isSelected = selectedRenders.includes(render.id);
              const formattedDate = formatDate(render.renderedAt);
              const templateName = getTemplateName(render);

              return (
                <div
                  key={render.id}
                  onClick={() => handleRenderClick(render)}
                  onContextMenu={(e) => handleRenderRightClick(render, e)}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-lg transition-all duration-300 ${
                    isSelected
                      ? "ring-2 ring-indigo-500 border-indigo-500"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                    {render.type === "mp4" || render.type === "webm" ? (
                      <video
                        src={render.outputUrl}
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={render.outputUrl}
                        alt="Render preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  <div className="bg-white p-4 border-t border-gray-100">
                    <p className="font-semibold text-gray-800 truncate text-sm mb-1">
                      {templateName}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">{formattedDate}</p>
                      <span className="text-xs text-gray-400 uppercase font-medium">
                        {render.type}
                      </span>
                    </div>
                  </div>

                  {isSelectMode && (
                    <div className="absolute top-3 left-3 bg-white rounded-md p-1.5 shadow-md z-10">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-indigo-500 text-white"
                            : "border-2 border-gray-300"
                        }`}
                      >
                        {isSelected && <FiCheck size={14} />}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredRenders.map((render) => {
              const isSelected = selectedRenders.includes(render.id);
              const formattedDate = formatDate(render.renderedAt);
              const templateName = getTemplateName(render);

              return (
                <div
                  key={render.id}
                  onClick={() => handleRenderClick(render)}
                  onContextMenu={(e) => handleRenderRightClick(render, e)}
                  className={`flex items-center gap-4 p-3 rounded-xl bg-white border shadow-sm hover:shadow-md transition cursor-pointer ${
                    isSelected
                      ? "ring-2 ring-indigo-500 border-indigo-500"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  {isSelectMode && (
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? "bg-indigo-500 text-white"
                          : "border-2 border-gray-300"
                      }`}
                    >
                      {isSelected && <FiCheck size={14} />}
                    </div>
                  )}

                  <div className="w-28 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {render.type === "mp4" || render.type === "webm" ? (
                      <video
                        src={render.outputUrl}
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={render.outputUrl}
                        alt="Render preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate text-sm mb-1">
                      {templateName}
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-xs text-gray-500">{formattedDate}</p>
                      <span className="text-xs text-gray-400 uppercase font-medium">
                        {render.type}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating actions */}
      {selectedRenders.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded-full px-6 py-3 flex items-center gap-4 z-50">
          <span className="text-sm font-medium text-gray-700">
            {selectedRenders.length} selected
          </span>
          <button
            onClick={handleSelectAllRenders}
            className="text-sm px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition font-medium"
          >
            {selectedRenders.length === filteredRenders.length
              ? "Unselect All"
              : "Select All"}
          </button>
          <button
            onClick={handleCancelRenders}
            className="text-sm px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteRenders}
            className="text-sm px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:opacity-90 transition flex items-center gap-2 font-semibold"
          >
            <FiTrash2 size={14} />
            Delete
          </button>
        </div>
      )}

      {/* View Media Modal */}
      <ViewMediaModal
        isOpen={!!previewRender}
        onClose={() => setPreviewRender(null)}
        item={previewRender}
        itemType="render"
        templateName={previewRender ? getTemplateName(previewRender) : undefined}
        formattedDate={previewRender ? formatDate(previewRender.renderedAt) : undefined}
      />
    </div>
  );
};