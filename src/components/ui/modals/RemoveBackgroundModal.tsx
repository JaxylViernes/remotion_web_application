import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { backendPrefix } from "../../../config";

interface RemoveBackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProcess: (processedImageUrl: string) => void;
  selectedLayerId: string | null;
  currentImageUrl?: string | null; // selected layer src (can be blob: URL)
}

export const RemoveBackgroundModal: React.FC<RemoveBackgroundModalProps> = ({
  isOpen,
  onClose,
  onProcess,
  selectedLayerId,
  currentImageUrl,
}) => {
  const [quality, setQuality] = useState<"fast" | "balanced" | "high">("high");
  const [edgeSmoothing, setEdgeSmoothing] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [theme, setTheme] = useState<string>("light");

  // Listen for theme changes
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = localStorage.getItem("editor-theme") || "light";
      setTheme(currentTheme);
    };

    updateTheme();
    window.addEventListener("storage", updateTheme);
    const interval = setInterval(updateTheme, 100);

    return () => {
      window.removeEventListener("storage", updateTheme);
      clearInterval(interval);
    };
  }, []);

  // Theme-based colors
  const isDark = theme === "dark";
  const colors = {
    overlay: isDark ? "rgba(0, 0, 0, 0.75)" : "rgba(0, 0, 0, 0.6)",
    modalBg: isDark ? "#1a1a1a" : "#ffffff",
    border: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    titleColor: isDark ? "#e5e5e5" : "#1a1a1a",
    subtitleColor: isDark ? "#888" : "#666",
    labelColor: isDark ? "#e5e5e5" : "#1a1a1a",
    warningBg: isDark ? "rgba(6, 182, 212, 0.1)" : "rgba(6, 182, 212, 0.08)",
    warningBorder: isDark ? "rgba(6, 182, 212, 0.3)" : "rgba(6, 182, 212, 0.2)",
    qualityButtonBg: isDark ? "#0f0f0f" : "#f5f5f5",
    qualityButtonText: isDark ? "#888" : "#666",
    sliderBg: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    cancelButtonBg: isDark ? "transparent" : "#f5f5f5",
    cancelButtonText: isDark ? "#888" : "#666",
    cancelButtonBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
  };

  const styles: Record<string, React.CSSProperties> = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.overlay,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px",
      transition: "background-color 0.3s ease",
    },
    modal: {
      backgroundColor: colors.modalBg,
      borderRadius: "16px",
      width: "100%",
      maxWidth: "480px",
      maxHeight: "90vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      border: `1px solid ${colors.border}`,
      transition: "background-color 0.3s ease, border-color 0.3s ease",
    },
    header: {
      padding: "24px 24px 20px",
      borderBottom: `1px solid ${colors.border}`,
      transition: "border-color 0.3s ease",
    },
    title: {
      fontSize: "20px",
      fontWeight: 600,
      color: colors.titleColor,
      margin: "0 0 8px 0",
    },
    subtitle: {
      fontSize: "13px",
      color: colors.subtitleColor,
      margin: 0,
    },
    content: {
      padding: "24px",
      overflowY: "auto",
      flex: 1,
    },
    section: { marginBottom: "20px" },
    label: {
      display: "block",
      fontSize: "13px",
      fontWeight: 600,
      color: colors.labelColor,
      marginBottom: "8px",
    },
    warning: {
      padding: "12px 16px",
      backgroundColor: colors.warningBg,
      border: `1px solid ${colors.warningBorder}`,
      borderRadius: "8px",
      color: "#06b6d4",
      fontSize: "13px",
      marginBottom: "20px",
      transition: "background-color 0.3s ease, border-color 0.3s ease",
    },
    qualityGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "8px",
    },
    qualityButton: {
      padding: "12px",
      backgroundColor: colors.qualityButtonBg,
      border: `1px solid ${colors.border}`,
      borderRadius: "8px",
      color: colors.qualityButtonText,
      fontSize: "13px",
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.2s",
      textAlign: "center",
    },
    qualityButtonActive: {
      backgroundColor: "rgba(6, 182, 212, 0.2)",
      borderColor: "#06b6d4",
      color: "#06b6d4",
    },
    sliderContainer: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    slider: {
      flex: 1,
      height: "4px",
      borderRadius: "2px",
      appearance: "none",
      backgroundColor: colors.sliderBg,
      cursor: "pointer",
      outline: "none",
      transition: "background-color 0.3s ease",
    },
    sliderValue: {
      fontSize: "13px",
      fontWeight: 600,
      color: "#06b6d4",
      minWidth: "30px",
      textAlign: "center",
    },
    footer: {
      padding: "16px 24px",
      borderTop: `1px solid ${colors.border}`,
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
      transition: "border-color 0.3s ease",
    },
    button: {
      padding: "12px 24px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s",
      border: "none",
      outline: "none",
    },
    cancelButton: {
      backgroundColor: colors.cancelButtonBg,
      border: `1px solid ${colors.cancelButtonBorder}`,
      color: colors.cancelButtonText,
    },
    processButton: {
      background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      color: "white",
    },
    processingButton: {
      background: "linear-gradient(135deg, #666 0%, #555 100%)",
      cursor: "not-allowed",
      opacity: 0.6,
    },
  };

  const handleProcess = async () => {
    if (!selectedLayerId) {
      toast.error("Please select a layer first");
      return;
    }

    if (!currentImageUrl) {
      toast.error("No image URL found for the selected layer");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Download current image (including blob: URL) as Blob
      const imageResponse = await fetch(currentImageUrl);
      if (!imageResponse.ok) {
        throw new Error("Failed to download image from currentImageUrl");
      }
      const blob = await imageResponse.blob();

      // 2. Wrap Blob as a File for multer (upload.single("image"))
      const file = new File([blob], "layer-image.png", {
        type: blob.type || "image/png",
      });

      // 3. Build FormData
      const formData = new FormData();
      formData.append("image", file);
      formData.append("quality", quality);
      formData.append("edgeSmoothing", String(edgeSmoothing));

      // 4. Call backend: /api/picture/remove-background
      const res = await fetch(`${backendPrefix}/api/picture/remove-background`, {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }

      if (!res.ok) {
        console.error("remove-bg error response:", data);
        const msg =
          data?.error ||
          data?.message ||
          data?.details ||
          `Background removal API error (${res.status})`;
        throw new Error(msg);
      }

      console.log("remove-bg success response:", data);

      // Try common keys in case backend changed
      const processedUrl =
        data?.imageUrl || data?.secure_url || data?.url || null;

      if (!processedUrl) {
        console.error("remove-bg missing imageUrl-like field:", data);
        throw new Error(
          data?.message ||
            data?.error ||
            "No imageUrl in remove-background response"
        );
      }

      onProcess(processedUrl);
      toast.success("Background removed successfully!");
      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to remove background");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  const disabled = isProcessing || !selectedLayerId || !currentImageUrl;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Remove Background</h2>
          <p style={styles.subtitle}>AI-powered background removal</p>
        </div>

        <div style={styles.content}>
          {!selectedLayerId && (
            <div style={styles.warning}>
              ⚠️ Please select an image or video layer before using this tool
            </div>
          )}
          {selectedLayerId && !currentImageUrl && (
            <div style={styles.warning}>
              ⚠️ Selected layer has no image URL. Try another layer.
            </div>
          )}

          <div style={styles.section}>
            <label style={styles.label}>Quality</label>
            <div style={styles.qualityGrid}>
              {["fast", "balanced", "high"].map((q) => (
                <button
                  key={q}
                  style={{
                    ...styles.qualityButton,
                    ...(quality === q ? styles.qualityButtonActive : {}),
                  }}
                  onClick={() => setQuality(q as any)}
                  disabled={disabled}
                >
                  {q === "fast"
                    ? "Fast"
                    : q === "balanced"
                    ? "Balanced"
                    : "High"}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <label style={styles.label}>Edge Smoothing</label>
            <div style={styles.sliderContainer}>
              <input
                type="range"
                min={0}
                max={10}
                value={edgeSmoothing}
                onChange={(e) => setEdgeSmoothing(Number(e.target.value))}
                style={styles.slider}
                disabled={disabled}
              />
              <span style={styles.sliderValue}>{edgeSmoothing}</span>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <button
            style={{ ...styles.button, ...styles.cancelButton }}
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            style={{
              ...styles.button,
              ...(disabled
                ? styles.processingButton
                : styles.processButton),
            }}
            onClick={handleProcess}
            disabled={disabled}
          >
            {isProcessing ? "Processing..." : "Remove Background"}
          </button>
        </div>
      </div>
    </div>
  );
};