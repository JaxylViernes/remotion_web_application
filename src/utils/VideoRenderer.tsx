//main renderer of videos
import toast from "react-hot-toast";
import { backendPrefix } from "../config";
import { saveRender } from "./RenderSaver";

export async function renderVideo(
  inputProps: any,
  templateId: number,
  compositionId: string,
  format: string
) {
  try {
    const response = await fetch(
      `${backendPrefix}/generatevideo/render-video`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputProps,
          format,
          compositionId,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();
    const saveResponse = await saveRender(templateId, data.url, format);

    if(saveResponse==="error"){
        toast.error("There was an error saving your export...");
    }else{
        toast.success("Export saved to your renders")
    }

    return data.url;
  } catch (error: any) {
    console.log("Error rendering video", error.message);
    return "error";
  }
}
