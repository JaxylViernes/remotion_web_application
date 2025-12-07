import { backendPrefix } from "../config";

export async function compareProjectProps(projectId: string, props: any) {
  try {
    const project = await fetch(`${backendPrefix}/projects/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await project.json();
    const dbprojectprops = {
        layers: data.props.layers,
        duration: data.props.duration,
        templateId: data.props.templateId,
    }

    // Remove currentFrame from props
    const { currentFrame, ...propsWithoutCurrentFrame } = props;

    console.log("Current props: ", propsWithoutCurrentFrame, "\nDB props: ", dbprojectprops)
    
    return JSON.stringify(dbprojectprops) === JSON.stringify(propsWithoutCurrentFrame);
  } catch (error: any) {
    console.log("error fetching project");
  }
}