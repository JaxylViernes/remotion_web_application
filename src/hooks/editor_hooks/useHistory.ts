import { useState, useCallback, useRef } from "react";
import { MAX_HISTORY_SIZE } from "../../data/editor_constants";
import type { Layer } from "../../components/remotion_compositions/DynamicLayerComposition";

export const useHistoryState = (initialLayers: Layer[]) => {
  const [layers, setLayers] = useState<Layer[]>(initialLayers);
  const [history, setHistory] = useState<Layer[][]>([initialLayers]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isUndoRedoAction = useRef(false);

  const pushState = useCallback((newLayers: Layer[]) => {
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      setLayers(newLayers);
      return;
    }

    // Clear any redo history when making a new change
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newLayers);
    
    let finalHistory = newHistory;
    let finalIndex = newHistory.length - 1;
    
    // Trim history if it exceeds max size
    if (newHistory.length > MAX_HISTORY_SIZE) {
      finalHistory = newHistory.slice(newHistory.length - MAX_HISTORY_SIZE);
      finalIndex = MAX_HISTORY_SIZE - 1;
    }
    
    setHistory(finalHistory);
    setHistoryIndex(finalIndex);
    setLayers(newLayers);
  }, [historyIndex, history]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setLayers(history[newIndex]);
    }
  }, [historyIndex, history]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setLayers(history[newIndex]);
    }
  }, [historyIndex, history]);

  const resetHistory = useCallback((newLayers: Layer[]) => {
    setLayers(newLayers);
    setHistory([newLayers]);
    setHistoryIndex(0);
    isUndoRedoAction.current = false;
  }, []);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    layers,
    pushState,
    undo,
    redo,
    resetHistory,
    canUndo,
    canRedo,
  };
};