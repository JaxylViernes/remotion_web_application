import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

// ============================================================================
// TYPES
// ============================================================================

export interface CollageLayout {
  id: string;
  name: string;
  description: string;
  slots: CollageSlot[];
  category: "grid" | "creative" | "split" | "polaroid" | "magazine";
}

export interface CollageSlot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  width: number; // percentage
  height: number; // percentage
  rotation?: number; // degrees
  borderRadius?: number; // percentage
  zIndex?: number;
  shadow?: boolean;
}

interface CollagePanelProps {
  onLayoutSelect?: (layout: CollageLayout) => void;
  selectedLayoutId?: string;
}

// ============================================================================
// TRENDY COLLAGE LAYOUTS
// ============================================================================

const COLLAGE_LAYOUTS: CollageLayout[] = [

  // ORIGINAL TEMPLATE LAYOUT (3 photos top, text space, 3 photos bottom)
  {
    id: "original-3x2",
    name: "Original Layout",
    description: "Template default",
    category: "grid",
    slots: [
      // Top row (3 photos at 16.67% from top)
      { id: "top-left", x: 0, y: 0, width: 33.33, height: 33.33 },
      { id: "top-center", x: 33.33, y: 0, width: 33.33, height: 33.33 },
      { id: "top-right", x: 66.66, y: 0, width: 33.34, height: 33.33 },
      
      // Bottom row (3 photos at 83.33% from top)
      { id: "bottom-left", x: 0, y: 66.67, width: 33.33, height: 33.33 },
      { id: "bottom-center", x: 33.33, y: 66.67, width: 33.33, height: 33.33 },
      { id: "bottom-right", x: 66.66, y: 66.67, width: 33.34, height: 33.33 },
    ],
  },
  // GRID LAYOUTS
  {
    id: "grid-2x1",
    name: "Split Screen",
    description: "Classic 50/50 split",
    category: "grid",
    slots: [
      { id: "top", x: 0, y: 0, width: 100, height: 50 },
      { id: "bottom", x: 0, y: 50, width: 100, height: 50 },
    ],
  },
  {
    id: "grid-2x2",
    name: "Quad Grid",
    description: "4 equal squares",
    category: "grid",
    slots: [
      { id: "tl", x: 0, y: 0, width: 50, height: 25 },
      { id: "tr", x: 50, y: 0, width: 50, height: 25 },
      { id: "bl", x: 0, y: 25, width: 50, height: 25 },
      { id: "br", x: 50, y: 25, width: 50, height: 25 },
    ],
  },
  {
    id: "grid-3x3",
    name: "Instagram Grid",
    description: "9 photo grid",
    category: "grid",
    slots: [
      { id: "1", x: 0, y: 0, width: 33.33, height: 16.67 },
      { id: "2", x: 33.33, y: 0, width: 33.33, height: 16.67 },
      { id: "3", x: 66.66, y: 0, width: 33.33, height: 16.67 },
      { id: "4", x: 0, y: 16.67, width: 33.33, height: 16.67 },
      { id: "5", x: 33.33, y: 16.67, width: 33.33, height: 16.67 },
      { id: "6", x: 66.66, y: 16.67, width: 33.33, height: 16.67 },
      { id: "7", x: 0, y: 33.34, width: 33.33, height: 16.67 },
      { id: "8", x: 33.33, y: 33.34, width: 33.33, height: 16.67 },
      { id: "9", x: 66.66, y: 33.34, width: 33.33, height: 16.67 },
    ],
  },

  // CREATIVE ASYMMETRIC LAYOUTS
  {
    id: "creative-hero",
    name: "Hero Focus",
    description: "One big, two small",
    category: "creative",
    slots: [
      { id: "hero", x: 0, y: 0, width: 100, height: 60 },
      { id: "left", x: 0, y: 60, width: 50, height: 40 },
      { id: "right", x: 50, y: 60, width: 50, height: 40 },
    ],
  },
  {
    id: "creative-spotlight",
    name: "Spotlight",
    description: "Center stage focus",
    category: "creative",
    slots: [
      { id: "left", x: 0, y: 0, width: 25, height: 100 },
      { id: "center", x: 25, y: 10, width: 50, height: 80, zIndex: 2, shadow: true },
      { id: "right", x: 75, y: 0, width: 25, height: 100 },
    ],
  },
  {
    id: "creative-sidebar",
    name: "Sidebar Stack",
    description: "Vertical thumbnails",
    category: "creative",
    slots: [
      { id: "main", x: 0, y: 0, width: 70, height: 100 },
      { id: "thumb1", x: 72, y: 5, width: 26, height: 20 },
      { id: "thumb2", x: 72, y: 27, width: 26, height: 20 },
      { id: "thumb3", x: 72, y: 49, width: 26, height: 20 },
      { id: "thumb4", x: 72, y: 71, width: 26, height: 20 },
    ],
  },
  {
    id: "creative-dynamic",
    name: "Dynamic Mix",
    description: "Varied sizes",
    category: "creative",
    slots: [
      { id: "large", x: 0, y: 0, width: 60, height: 50 },
      { id: "medium", x: 60, y: 0, width: 40, height: 30 },
      { id: "small1", x: 60, y: 30, width: 40, height: 20 },
      { id: "wide", x: 0, y: 50, width: 100, height: 25 },
      { id: "small2", x: 0, y: 75, width: 50, height: 25 },
      { id: "small3", x: 50, y: 75, width: 50, height: 25 },
    ],
  },

  // SPLIT SCREEN VARIATIONS
  {
    id: "split-diagonal",
    name: "Diagonal Split",
    description: "Trendy diagonal cut",
    category: "split",
    slots: [
      { id: "top", x: 0, y: 0, width: 100, height: 48 },
      { id: "bottom", x: 0, y: 52, width: 100, height: 48 },
    ],
  },
  {
    id: "split-thirds",
    name: "Rule of Thirds",
    description: "Professional thirds",
    category: "split",
    slots: [
      { id: "top", x: 0, y: 0, width: 100, height: 33.33 },
      { id: "middle", x: 0, y: 33.33, width: 100, height: 33.33 },
      { id: "bottom", x: 0, y: 66.66, width: 100, height: 33.33 },
    ],
  },
  {
    id: "split-leftright",
    name: "Left Right",
    description: "Vertical split",
    category: "split",
    slots: [
      { id: "left", x: 0, y: 0, width: 50, height: 100 },
      { id: "right", x: 50, y: 0, width: 50, height: 100 },
    ],
  },

  // POLAROID STYLE
  {
    id: "polaroid-stack",
    name: "Polaroid Stack",
    description: "Vintage photo stack",
    category: "polaroid",
    slots: [
      { id: "photo1", x: 10, y: 5, width: 80, height: 28, rotation: -3, shadow: true, borderRadius: 2 },
      { id: "photo2", x: 12, y: 35, width: 76, height: 28, rotation: 2, shadow: true, borderRadius: 2 },
      { id: "photo3", x: 8, y: 65, width: 84, height: 28, rotation: -1, shadow: true, borderRadius: 2 },
    ],
  },
  {
    id: "polaroid-scattered",
    name: "Scattered Pics",
    description: "Casual photo spread",
    category: "polaroid",
    slots: [
      { id: "photo1", x: 5, y: 10, width: 45, height: 30, rotation: -8, shadow: true, borderRadius: 2 },
      { id: "photo2", x: 50, y: 5, width: 45, height: 25, rotation: 5, shadow: true, borderRadius: 2 },
      { id: "photo3", x: 10, y: 45, width: 35, height: 25, rotation: 3, shadow: true, borderRadius: 2 },
      { id: "photo4", x: 50, y: 35, width: 45, height: 35, rotation: -4, shadow: true, borderRadius: 2 },
    ],
  },
  {
    id: "polaroid-overlap",
    name: "Overlapping",
    description: "Layered memories",
    category: "polaroid",
    slots: [
      { id: "back", x: 15, y: 20, width: 70, height: 35, rotation: 5, shadow: true, borderRadius: 2, zIndex: 1 },
      { id: "front", x: 20, y: 40, width: 65, height: 38, rotation: -3, shadow: true, borderRadius: 2, zIndex: 2 },
    ],
  },

  // MAGAZINE STYLE
  {
    id: "magazine-cover",
    name: "Magazine Cover",
    description: "Editorial style",
    category: "magazine",
    slots: [
      { id: "hero", x: 0, y: 0, width: 100, height: 70 },
      { id: "strip1", x: 0, y: 70, width: 33.33, height: 15 },
      { id: "strip2", x: 33.33, y: 70, width: 33.33, height: 15 },
      { id: "strip3", x: 66.66, y: 70, width: 33.33, height: 15 },
      { id: "footer", x: 0, y: 85, width: 100, height: 15 },
    ],
  },
  {
    id: "magazine-feature",
    name: "Feature Story",
    description: "Article layout",
    category: "magazine",
    slots: [
      { id: "header", x: 0, y: 0, width: 100, height: 35 },
      { id: "inset", x: 60, y: 35, width: 38, height: 25, zIndex: 2, shadow: true },
      { id: "body", x: 0, y: 37, width: 100, height: 38 },
      { id: "footer", x: 0, y: 75, width: 100, height: 25 },
    ],
  },
  {
    id: "magazine-mosaic",
    name: "Editorial Mosaic",
    description: "Modern magazine",
    category: "magazine",
    slots: [
      { id: "large", x: 0, y: 0, width: 65, height: 45 },
      { id: "tall", x: 67, y: 0, width: 33, height: 60 },
      { id: "wide", x: 0, y: 47, width: 65, height: 30 },
      { id: "square", x: 0, y: 78, width: 48, height: 22 },
      { id: "rect", x: 50, y: 62, width: 50, height: 38 },
    ],
  },
];

// ============================================================================
// COLLAGE PANEL COMPONENT
// ============================================================================

export const CollagePanel: React.FC<CollagePanelProps> = ({
  onLayoutSelect,
  selectedLayoutId,
}) => {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Layouts" },
    { id: "grid", label: "Grid" },
    { id: "creative", label: "Creative" },
    { id: "split", label: "Split" },
    { id: "polaroid", label: "Polaroid" },
    { id: "magazine", label: "Magazine" },
  ];

  const filteredLayouts =
    selectedCategory === "all"
      ? COLLAGE_LAYOUTS
      : COLLAGE_LAYOUTS.filter((layout) => layout.category === selectedCategory);

  const styles: Record<string, React.CSSProperties> = {
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    header: {
      padding: "20px",
      borderBottom: `1px solid ${colors.border}`,
    },
    title: {
      fontSize: "18px",
      fontWeight: 600,
      color: colors.textPrimary,
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "13px",
      color: colors.textSecondary,
      marginBottom: "16px",
    },
    categoryButtons: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
    },
    categoryButton: {
      padding: "6px 12px",
      fontSize: "12px",
      fontWeight: 500,
      border: `1px solid ${colors.border}`,
      borderRadius: "6px",
      backgroundColor: colors.bgSecondary,
      color: colors.textSecondary,
      cursor: "pointer",
      transition: "all 0.2s",
    },
    categoryButtonActive: {
      backgroundColor: colors.accent,
      color: "white",
      borderColor: colors.accent,
    },
    content: {
      flex: 1,
      overflowY: "auto",
      padding: "20px",
    },
   layoutGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
  gap: "12px",
},
layoutCard: {
  position: "relative",
  aspectRatio: "9 / 16",
  borderRadius: "8px",
  overflow: "hidden",
  cursor: "pointer",
  border: `2px solid ${colors.border}`,
  backgroundColor: colors.bgSecondary,
  transition: "all 0.2s",
},
    layoutCardSelected: {
      borderColor: colors.accent,
      boxShadow: `0 0 0 3px ${colors.accent}33`,
    },
    layoutPreview: {
      width: "100%",
      height: "100%",
      position: "relative",
      backgroundColor: "#0a0a0a",
    },
    slot: {
      position: "absolute",
      backgroundColor: "#1a1a1a",
      border: "1px solid #333",
      transition: "all 0.2s",
    },
    slotHover: {
      backgroundColor: "#252525",
    },
    layoutInfo: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "8px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(10px)",
    },
    layoutName: {
      fontSize: "11px",
      fontWeight: 600,
      color: "white",
      marginBottom: "2px",
    },
    layoutDesc: {
      fontSize: "9px",
      color: "#aaa",
    },
  };

  const renderLayoutPreview = (layout: CollageLayout, isSelected: boolean) => {
    return (
      <div
        key={layout.id}
        style={{
          ...styles.layoutCard,
          ...(isSelected ? styles.layoutCardSelected : {}),
        }}
        onClick={() => onLayoutSelect?.(layout)}
        onMouseOver={(e) => {
          if (!isSelected) {
            e.currentTarget.style.borderColor = colors.textMuted;
            e.currentTarget.style.transform = "scale(1.02)";
          }
        }}
        onMouseOut={(e) => {
          if (!isSelected) {
            e.currentTarget.style.borderColor = colors.border;
            e.currentTarget.style.transform = "scale(1)";
          }
        }}
      >
        <div style={styles.layoutPreview}>
          {layout.slots.map((slot) => (
            <div
              key={slot.id}
              style={{
                ...styles.slot,
                left: `${slot.x}%`,
                top: `${slot.y}%`,
                width: `${slot.width}%`,
                height: `${slot.height}%`,
                transform: slot.rotation ? `rotate(${slot.rotation}deg)` : undefined,
                borderRadius: slot.borderRadius ? `${slot.borderRadius}%` : undefined,
                zIndex: slot.zIndex || 1,
                boxShadow: slot.shadow
                  ? "0 4px 12px rgba(0, 0, 0, 0.5)"
                  : undefined,
              }}
            />
          ))}
        </div>
        <div style={styles.layoutInfo}>
          <div style={styles.layoutName}>{layout.name}</div>
          <div style={styles.layoutDesc}>{layout.description}</div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Collage Layouts</h2>
        <p style={styles.subtitle}>
          Choose a trendy layout for your photos and videos
        </p>
        <div style={styles.categoryButtons}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              style={{
                ...styles.categoryButton,
                ...(selectedCategory === cat.id
                  ? styles.categoryButtonActive
                  : {}),
              }}
              onClick={() => setSelectedCategory(cat.id)}
              onMouseOver={(e) => {
                if (selectedCategory !== cat.id) {
                  e.currentTarget.style.backgroundColor = colors.bgHover;
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== cat.id) {
                  e.currentTarget.style.backgroundColor = colors.bgSecondary;
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.layoutGrid}>
          {filteredLayouts.map((layout) =>
            renderLayoutPreview(layout, layout.id === selectedLayoutId)
          )}
        </div>
      </div>
    </div>
  );
};

export default CollagePanel;