import { useState, useRef } from "react";
import isEqual from "lodash/isEqual";
import { backendPrefix } from "../config";
import toast from "react-hot-toast";

type SaveStatus = "idle" | "saving" | "success" | "error";

interface UseProjectSave2Options<T> {
  templateId: number;
  buildProps: () => T;
  filterRenderProps?: (props: T) => Partial<T>; 
  compositionId: string;
}

export function useProjectSave2<T>({
  templateId,
  buildProps,
  filterRenderProps, 
  compositionId
}: UseProjectSave2Options<T>) {
  const [projectId, setProjectId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const lastSavedProps = useRef<T | null>(null);

  const handleSave = async () => {
    const currentProps = buildProps();
    const renderProps = filterRenderProps ? filterRenderProps(currentProps) : currentProps;

    if (projectId) {
      if (lastSavedProps.current && isEqual(lastSavedProps.current, currentProps)) {
        toast.success("Your project has already been saved");
        return;
      }

      setIsSaving(true);
      setSaveStatus("saving");
      try {
        const exportRes = await fetch(`${backendPrefix}/generatevideo/render-video`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inputProps: renderProps,
            format: "mp4",
            compositionId
          }),
        });

        if (!exportRes.ok) throw new Error(await exportRes.text());
        const exportResult = await exportRes.json();
        const projectVidUrl = exportResult.url;

        const response = await fetch(`${backendPrefix}/projects/update/${projectId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            props: currentProps,
            projectVidUrl,
          }),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error ?? (await response.text()));
        }

        const result = await response.json();
        lastSavedProps.current = currentProps;
        setProjectId(result.project.id);
        localStorage.setItem("projectId", result.project.id.toString());

        setSaveStatus("success");
        alert("✅ Project updated successfully!");
      } catch (err: any) {
        console.error(err);
        setSaveStatus("error");
        alert(`❌ Save failed: ${err?.message ?? err}`);
      } finally {
        setIsSaving(false);
      }
    } else {
      setShowSaveModal(true);
    }
  };

  const saveNewProject = async (
    titleFromModal: string,
    setStatus: (s: string) => void
  ) => {
    try {
      setStatus("Saving project...");
      const currentProps = buildProps();
      const renderProps = filterRenderProps ? filterRenderProps(currentProps) : currentProps;

      const exportRes = await fetch(`${backendPrefix}/generatevideo/render-video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputProps: renderProps,
          format: "mp4",
          compositionId
        }),
      });

      if (!exportRes.ok) throw new Error(await exportRes.text());
      const exportResult = await exportRes.json();
      const projectVidUrl = exportResult.url;

      const response = await fetch(`${backendPrefix}/projects/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: titleFromModal,
          templateId,
          props: currentProps, // save full props
          projectVidUrl,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? (await response.text()));
      }

      const result = await response.json();
      setProjectId(result.project.id);
      lastSavedProps.current = currentProps;
      localStorage.setItem("projectId", result.project.id.toString());

      setStatus("Saved!");
    } catch (err) {
      console.error("saveNewProject error", err);
      throw err;
    }
  };

  return {
    projectId,
    setProjectId,
    isSaving,
    saveStatus,
    showSaveModal,
    setShowSaveModal,
    handleSave,
    saveNewProject,
    lastSavedProps,
  };
}
