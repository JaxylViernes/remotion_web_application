import { useCallback, useRef } from "react";
import toast from "react-hot-toast";
import {
  type Layer,
  type TextLayer,
  type ImageLayer,
  type AudioLayer,
  type VideoLayer,
  isImageLayer,
} from "../../components/remotion_compositions/DynamicLayerComposition";
import { generateId } from "../../utils/layerHelper";
// import { FPS } from "../constants";

interface UseLayerManagementProps {
  layers: Layer[];
  pushState: (layers: Layer[]) => void;
  currentFrame: number;
  totalFrames: number;
  setSelectedLayerId: (id: string | null) => void;
  setActiveTab?: (tab: string | null) => void;
}

export const useLayerManagement = ({
  layers,
  pushState,
  currentFrame,
  totalFrames,
  setSelectedLayerId,
  setActiveTab,
}: UseLayerManagementProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const addTextLayer = useCallback(() => {
    const newLayer: TextLayer = {
      id: generateId(),
      type: "text",
      name: `Text ${layers.filter((l) => l.type === "text").length + 1}`,
      visible: true,
      locked: false,
      startFrame: currentFrame,
      endFrame: Math.min(currentFrame + 90, totalFrames),
      position: { x: 50, y: 50 },
      size: { width: 70, height: 15 },
      rotation: 0,
      opacity: 1,
      content: "New Text",
      fontFamily: "Roboto, sans-serif",
      fontSize: 4,
      fontColor: "#ffffff",
      fontWeight: "normal",
      fontStyle: "normal",
      textAlign: "center",
      lineHeight: 1.4,
      textOutline: false,
      outlineColor: "#000000",
      textShadow: false,
      shadowColor: "#000000",
      shadowX: 0,
      shadowY: 0,
      shadowBlur: 0,
      animation: { entrance: "fade", entranceDuration: 30 },
    };
    pushState([...layers, newLayer]);
    setSelectedLayerId(newLayer.id);
  }, [currentFrame, totalFrames, layers, pushState, setSelectedLayerId]);

  const addImageLayer = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newLayer: ImageLayer = {
            id: generateId(),
            type: "image",
            name: `Image ${layers.filter((l) => l.type === "image").length + 1}`,
            visible: true,
            locked: false,
            startFrame: currentFrame,
            endFrame: Math.min(currentFrame + 90, totalFrames),
            position: { x: 50, y: 50 },
            size: { width: 40, height: 25 },
            rotation: 0,
            opacity: 1,
            src: event.target?.result as string,
            isBackground: false,
            objectFit: "contain",
          };
          pushState([...layers, newLayer]);
          setSelectedLayerId(newLayer.id);
        };
        reader.readAsDataURL(file);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [currentFrame, totalFrames, layers, pushState, setSelectedLayerId]
  );

  const addAudioLayer = useCallback(() => {
    audioInputRef.current?.click();
  }, []);

  const handleAudioUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newLayer: AudioLayer = {
            id: generateId(),
            type: "audio",
            name: file.name.replace(/\.[^/.]+$/, "") || `Audio ${layers.filter((l) => l.type === "audio").length + 1}`,
            visible: true,
            locked: false,
            startFrame: currentFrame,
            endFrame: Math.min(currentFrame + 150, totalFrames),
            position: { x: 50, y: 50 },
            size: { width: 100, height: 10 },
            rotation: 0,
            opacity: 1,
            src: event.target?.result as string,
            volume: 1,
            loop: false,
            fadeIn: 0,
            fadeOut: 0,
          };
          pushState([...layers, newLayer]);
          setSelectedLayerId(newLayer.id);
          toast.success("Audio added");
        };
        reader.readAsDataURL(file);
      }
      if (audioInputRef.current) {
        audioInputRef.current.value = "";
      }
    },
    [currentFrame, totalFrames, layers, pushState, setSelectedLayerId]
  );

  const addVideoLayer = useCallback(() => {
    videoInputRef.current?.click();
  }, []);

  const handleVideoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newLayer: VideoLayer = {
            id: generateId(),
            type: "video",
            name: file.name.replace(/\.[^/.]+$/, "") || `Video ${layers.filter((l) => l.type === "video").length + 1}`,
            visible: true,
            locked: false,
            startFrame: currentFrame,
            endFrame: Math.min(currentFrame + 150, totalFrames),
            position: { x: 50, y: 50 },
            size: { width: 60, height: 45 },
            rotation: 0,
            opacity: 1,
            src: event.target?.result as string,
            volume: 0.8,
            loop: false,
            playbackRate: 1,
            objectFit: "contain",
            filter: "",
            fadeIn: 0,
            fadeOut: 0,
            animation: {
              entrance: "fade",
              entranceDuration: 30,
            },
          };
          pushState([newLayer, ...layers]);
          setSelectedLayerId(newLayer.id);
          setActiveTab?.("video");
          toast.success("Video added");
        };
        reader.readAsDataURL(file);
      }
      if (videoInputRef.current) {
        videoInputRef.current.value = "";
      }
    },
    [currentFrame, totalFrames, layers, pushState, setSelectedLayerId, setActiveTab]
  );

 const updateLayer = useCallback(
  (layerId: string, updates: Partial<Layer>) => {
    console.log('📝 updateLayer called:', { layerId, updates });
    
    const newLayers = layers.map((layer): Layer => {
      if (layer.id !== layerId) return layer;
      const updated = { ...layer, ...updates } as Layer;
      console.log('  ↳ Layer updated:', layer.name, updated);
      return updated;
    });
    
    console.log('📝 Pushing new state with', newLayers.length, 'layers');
    pushState(newLayers);
  },
  [layers, pushState]
);

  const deleteLayer = useCallback(
    (layerId: string) => {
      const layer = layers.find((l) => l.id === layerId);
      if (layer && isImageLayer(layer) && layer.isBackground) {
        toast.error("Cannot delete background layer");
        return;
      }
      const newLayers = layers.filter((l) => l.id !== layerId);
      pushState(newLayers);
      setSelectedLayerId(null);
      toast.success("Layer deleted");
    },
    [layers, pushState, setSelectedLayerId]
  );

  const splitLayer = useCallback(
    (layerId: string, frame: number) => {
      const layer = layers.find((l) => l.id === layerId);
      
      if (!layer) {
        toast.error("Layer not found");
        return;
      }

      // Check if layer is locked
      if (layer.locked) {
        toast.error("Cannot split locked layer");
        return;
      }

      // Check if frame is within layer bounds
      if (frame <= layer.startFrame || frame >= layer.endFrame) {
        toast.error("Split point must be within layer duration");
        return;
      }

      // Check if it's a background layer
      if (isImageLayer(layer) && layer.isBackground) {
        toast.error("Cannot split background layer");
        return;
      }

      // Create the first part (from start to split point)
      const firstPart: Layer = {
        ...layer,
        id: generateId(),
        name: `${layer.name} (1)`,
        endFrame: frame,
      };

      // Create the second part (from split point to end)
      const secondPart: Layer = {
        ...layer,
        id: generateId(),
        name: `${layer.name} (2)`,
        startFrame: frame,
      };

      // Replace the original layer with the two new parts
      const newLayers = layers.map((l) => {
        if (l.id === layerId) {
          return firstPart;
        }
        return l;
      });

      // Insert the second part right after the first
      const originalIndex = layers.findIndex((l) => l.id === layerId);
      newLayers.splice(originalIndex + 1, 0, secondPart);

      pushState(newLayers);
      setSelectedLayerId(secondPart.id);
      toast.success("Layer split successfully");
    },
    [layers, pushState, setSelectedLayerId]
  );

  const reorderLayers = useCallback(
    (startIndex: number, endIndex: number) => {
      console.log('🎯 reorderLayers called:', { startIndex, endIndex, totalLayers: layers.length });
      
      // Prevent reordering if indices are invalid
      if (
        startIndex < 0 ||
        endIndex < 0 ||
        startIndex >= layers.length ||
        endIndex >= layers.length ||
        startIndex === endIndex
      ) {
        console.log('❌ Invalid indices, returning:', {
          startIndex,
          endIndex,
          layersLength: layers.length,
          reason: startIndex < 0 || endIndex < 0 ? 'negative' :
                  startIndex >= layers.length || endIndex >= layers.length ? 'out of bounds' :
                  'same index'
        });
        return;
      }

      // Check if the layer being moved is locked
      const layerToMove = layers[startIndex];
      console.log('  Layer to move:', layerToMove?.name, 'locked:', layerToMove?.locked);
      
      if (layerToMove.locked) {
        console.log('  ❌ Layer is locked');
        toast.error("Cannot reorder locked layer");
        return;
      }

      // Check if it's a background layer
      if (isImageLayer(layerToMove) && layerToMove.isBackground) {
        console.log('  ❌ Layer is background');
        toast.error("Cannot reorder background layer");
        return;
      }

      // Create new array with reordered layers
      const newLayers = [...layers];
      const [removed] = newLayers.splice(startIndex, 1);
      newLayers.splice(endIndex, 0, removed);

      console.log('  ✅ Reordering complete');
      console.log('  Old order:', layers.map(l => l.name));
      console.log('  New order:', newLayers.map(l => l.name));
      console.log('  Calling pushState with', newLayers.length, 'layers');
      
      pushState(newLayers);
      
      console.log('  ✅ pushState called');
    },
    [layers, pushState]
  );

  const moveLayerUp = useCallback(
    (layerId: string) => {
      const index = layers.findIndex((l) => l.id === layerId);
      if (index > 0) {
        reorderLayers(index, index - 1);
      }
    },
    [layers, reorderLayers]
  );

  const moveLayerDown = useCallback(
    (layerId: string) => {
      const index = layers.findIndex((l) => l.id === layerId);
      if (index < layers.length - 1) {
        reorderLayers(index, index + 1);
      }
    },
    [layers, reorderLayers]
  );

  return {
    fileInputRef,
    audioInputRef,
    videoInputRef,
    addTextLayer,
    addImageLayer,
    handleImageUpload,
    addAudioLayer,
    handleAudioUpload,
    addVideoLayer,
    handleVideoUpload,
    updateLayer,
    deleteLayer,
    splitLayer,
    reorderLayers,
    moveLayerUp,
    moveLayerDown,
  };
};