import { ProjectionDragLab } from "../ProjectionDragLab";
import { QuaternionDragLab } from "./QuaternionDragLab";
import { ReconstructionDragLab } from "./ReconstructionDragLab";
import { SlamChainDragLab } from "./SlamChainDragLab";

export function SpatialPanelInteraction({ panelId }: { panelId: string }) {
  if (panelId === "slam") {
    return (
      <>
        <ProjectionDragLab />
        <SlamChainDragLab />
      </>
    );
  }

  if (panelId === "reconstruction") {
    return <ReconstructionDragLab />;
  }

  if (panelId === "quaternion") {
    return <QuaternionDragLab />;
  }

  return null;
}
