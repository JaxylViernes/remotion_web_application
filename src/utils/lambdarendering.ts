import toast from "react-hot-toast";
import { backendPrefix } from "../config";
import { saveRender } from "./RenderSaver";

export const renderVideoUsingLambda = async (
  inputProps: any,
  templateId: number,
  format: string
) => {
  try {
    const response = await fetch(
      `${backendPrefix}/generatevideo/render-video/lambda`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputProps,
          format,
        }),
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const saveResponse = await saveRender(templateId, data.url, format);
    if (saveResponse === "error") {
      toast.error("There was an error saving your export...");
    } else {
      toast.success("Export saved to your renders");
    }

    return data.url as string;
  } catch (error: any) {
    console.error("Error encountered while rendering the video", error.message);
    return "error";
  }
};
