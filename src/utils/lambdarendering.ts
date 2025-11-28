import { backendPrefix } from "../config";

export const renderVideoUsingLambda = async (
  inputProps: any,
  compositionId: string,
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
          compositionId,
          format,
        }),
      }
    );
    if(!response.ok) throw new Error( `HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data.url;
  } catch (error: any) {
    console.error("Error encountered while rendering the video", error.message);
    return "error";
  }
};
