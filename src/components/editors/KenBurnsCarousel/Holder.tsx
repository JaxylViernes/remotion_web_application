import React, { useState, useRef, useEffect } from "react";
import { KenBurnsSideNav } from "./Sidenav";
import { KenBurnsCarouselPreview } from "../../layout/EditorPreviews/KenBurnsCarouselPreview";
import { KenBurnsImagesPanel } from "./sidenav_sections/Images";
import { ProportionsPanel } from "./sidenav_sections/Proportions";
import { defaultpanelwidth } from "../../../data/DefaultValues";
import { ExportModal } from "../../ui/modals/ExportModal";
import { TopNavWithSave } from "../../navigations/single_editors/WithSave";
import { SaveProjectModal } from "../../ui/modals/SaveModal";
import { LoadingOverlay } from "../../ui/modals/LoadingProjectModal";
import { useParams } from "react-router-dom";
import { backendPrefix } from "../../../config";
import { useProjectSave2 } from "../../../hooks/saveProjectVersion2";
import toast from "react-hot-toast";
import { renderVideo } from "../../../utils/VideoRenderer";

export const KenBurnsEditor: React.FC = () => {
  const { id } = useParams();

  // 🟢 Core States
  const [templateName, setTemplateName] = useState(
    "🎬 Ken Burns Swipe Template"
  );
  const [previewSize, setPreviewSize] = useState(1);
  const [images, setImages] = useState<string[]>([
    "https://res.cloudinary.com/dnxc1lw18/image/upload/v1761129583/landscape-placeholder_vmykjj.svg",
  ]);
  const [duration, setDuration] = useState<number>(15);
  const [cardWidthRatio, setCardWidthRatio] = useState<number>(0.75);
  const [cardHeightRatio, setCardHeightRatio] = useState<number>(0.75);
  const blurBgOpacity = 0.0;

  // 🟢 UI States
  const [showSafeMargins, setShowSafeMargins] = useState(true);
  const [previewBg, setPreviewBg] = useState<"dark" | "light" | "grey">("dark");
  const [activeSection, setActiveSection] = useState<"images" | "proportions">(
    "images"
  );
  const [collapsed, setCollapsed] = useState(false);

  // 🟢 Export
  const [isExporting, setIsExporting] = useState(false);
  const [exportUrl, setExportUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  // const [showUploadsModal, setShowUploadsModal] = useState<boolean>(false);
  const [userUploads, setUserUploads] = useState<any[]>();

  const fetchUploads = () => {
    fetch(`${backendPrefix}/useruploads/images`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch uploads");
        return res.json();
      })
      .then((data) => {
        console.log("fetched user uploads successfully");
        setUserUploads(data);
      })
      .catch((err) => console.error("❌ Failed to fetch uploads:", err));
  };

  // 🟢 Loading overlay
  const [isLoading, setIsLoading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "⏳ Preparing your template...",

    "🙇 Sorry for the wait, still working on it...",
    "🚀 Almost there, thanks for your patience!",
  ];
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(
      () => setMessageIndex((prev) => (prev + 1) % messages.length),
      10000
    );
    return () => clearInterval(interval);
  }, [isLoading]);

  // 🟢 Resizable Panel
  const [panelWidth, setPanelWidth] = useState(defaultpanelwidth);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth =
        e.clientX - (panelRef.current?.getBoundingClientRect().left || 0);
      if (newWidth > 200 && newWidth < 600) setPanelWidth(newWidth);
    };
    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // 🟢 Background cycle
  const cycleBg = () => {
    if (previewBg === "dark") setPreviewBg("light");
    else if (previewBg === "light") setPreviewBg("grey");
    else setPreviewBg("dark");
  };

  // 🟢 Export Handler
  const handleExport = async (format: string) => {
    const inputProps = {
      images,
      cardHeightRatio,
      cardWidthRatio,
      duration,
    };
    if (images.length <= 1) {
      alert("This template does not allow one image only");
    } else {
      setIsExporting(true);
      const response = await renderVideo(
        inputProps,
        8,
        "KenBurnsCarousel",
        format
      );
      if (response === "error") {
        toast.error("There was an error rendering your video");
      } else {
        setExportUrl(response);
      }
      setIsExporting(false);
      setShowModal(true);
    }
  };

  // 🟢 Project Save Hook
  const {
    setProjectId,
    isSaving,
    showSaveModal,
    setShowSaveModal,
    handleSave,
    saveNewProject,
    lastSavedProps,
  } = useProjectSave2({
    templateId: 8, // 👈 unique ID for Ken Burns
    buildProps: () => ({
      images,
      duration,
      cardWidthRatio,
      cardHeightRatio,
    }),
    compositionId: "KenBurnsCarousel",
  });

  // 🟢 Load project if editing existing
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`${backendPrefix}/projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load project");
          return res.json();
        })
        .then((data) => {
          setTemplateName(data.title);

          setProjectId(data.id);
          setImages(data.props.images);
          setDuration(data.props.duration);
          setCardHeightRatio(data.props.cardHeightRatio);
          setCardWidthRatio(data.props.cardWidthRatio);
          lastSavedProps.current = data.props;
        })
        .catch((err) => console.error("❌ Project load failed:", err))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  useEffect(() => {
    fetchUploads();
  }, []);

  return (
    <div style={{ display: "flex", height: "100%", flex: 1 }}>
      {isLoading && <LoadingOverlay message={messages[messageIndex]} />}

      {/* 🔹 Top Navigation */}
      <TopNavWithSave
        templateName={templateName}
        onSave={handleSave}
        onExport={handleExport}
        setTemplateName={setTemplateName}
        onOpenExport={() => setShowModal(true)}
        template={templateName}
        isSaving={isSaving}
      />

      {/* 🔹 Save Modal */}
      <SaveProjectModal
        open={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={saveNewProject}
      />

      <div style={{ display: "flex", flex: 1, marginTop: "60px" }}>
        {showModal && (
          <ExportModal
            showExport={showModal}
            setShowExport={setShowModal}
            isExporting={isExporting}
            exportUrl={exportUrl}
            onExport={handleExport}
          />
        )}

        {/* 🔹 Side Navigation */}
        <KenBurnsSideNav
          activeSection={activeSection}
          collapsed={collapsed}
          setActiveSection={setActiveSection}
          setCollapsed={setCollapsed}
        />

        {/* 🔹 Side Panel */}
        {!collapsed && (
          <div
            ref={panelRef}
            style={{
              width: `${panelWidth}px`,
              padding: "1rem",
              overflowY: "auto",
              background: "#fff",
              borderRight: "1px solid #eee",
              position: "relative",
              transition: isResizing ? "none" : "width 0.2s",
            }}
          >
            {/* Drag Handle */}
            <div
              onMouseDown={() => setIsResizing(true)}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "6px",
                cursor: "col-resize",
                background: "#ddd",
              }}
            />

            {activeSection === "images" && (
              <KenBurnsImagesPanel
                images={images}
                setImages={setImages}
                setDuration={setDuration}
                userUploads={userUploads}
              />
            )}

            {activeSection === "proportions" && (
              <ProportionsPanel
                cardHeightRatio={cardHeightRatio}
                cardWidthRatio={cardWidthRatio}
                setCardHeightRatio={setCardHeightRatio}
                setCardWidthRatio={setCardWidthRatio}
              />
            )}
          </div>
        )}

        {/* 🔹 Preview */}
        <KenBurnsCarouselPreview
          cycleBg={cycleBg}
          duration={duration}
          images={images}
          previewBg={previewBg}
          cardHeightRatio={cardHeightRatio}
          blurBgOpacity={blurBgOpacity}
          cardWidthRatio={cardWidthRatio}
          previewScale={previewSize}
          showSafeMargins={showSafeMargins}
          onPreviewScaleChange={setPreviewSize}
          onToggleSafeMargins={setShowSafeMargins}
        />
      </div>
    </div>
  );
};
