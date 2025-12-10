import React, { useState } from "react";
import { FiFilm, FiFolder } from "react-icons/fi";
import { MyRendersSection } from "./MyRendersSection";
import { MyFilesSection } from "./MyFilesSection";

type MainTab = "renders" | "files";

interface RenderItem {
  id: string;
  type: "mp4" | "gif" | "webm";
  outputUrl: string;
  templateId?: number;
  renderedAt?: string;
  aspectRatio?: number;
  [key: string]: any;
}

interface SavedTemplatesSectionProps {
  uploads: any[];
  loadingUploads: boolean;
  selectedUploads: number[];
  setSelectedUploads: React.Dispatch<React.SetStateAction<number[]>>;
  handleDeleteUploads: () => Promise<void>;
  renders?: RenderItem[];
  loadingRenders?: boolean;
  selectedRenders?: string[];
  setSelectedRenders?: React.Dispatch<React.SetStateAction<string[]>>;
  handleDeleteRenders?: () => Promise<void>;
}

export const ProjectsSection: React.FC<SavedTemplatesSectionProps> = ({
  uploads = [],
  loadingUploads = false,
  selectedUploads = [],
  setSelectedUploads,
  handleDeleteUploads,
  renders = [],
  loadingRenders = false,
  selectedRenders = [],
  setSelectedRenders = () => {},
  handleDeleteRenders = async () => {},
}) => {
  const [activeTab, setActiveTab] = useState<MainTab>("renders");

  return (
    <div className="flex flex-col h-full text-gray-800 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Main Tabs (Fixed at top) */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white px-6 pt-4">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("renders")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-medium text-sm transition-all ${
              activeTab === "renders"
                ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <FiFilm size={18} />
            My Projects
          </button>
          <button
            onClick={() => setActiveTab("files")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-medium text-sm transition-all ${
              activeTab === "files"
                ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <FiFolder size={18} />
            My Assets
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "renders" ? (
        <MyRendersSection
          renders={renders}
          loadingRenders={loadingRenders}
          selectedRenders={selectedRenders}
          setSelectedRenders={setSelectedRenders}
          handleDeleteRenders={handleDeleteRenders}
        />
      ) : (
        <MyFilesSection
          uploads={uploads}
          loadingUploads={loadingUploads}
          selectedUploads={selectedUploads}
          setSelectedUploads={setSelectedUploads}
          handleDeleteUploads={handleDeleteUploads}
        />
      )}
    </div>
  );
};