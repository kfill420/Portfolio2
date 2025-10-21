import { animated } from "@react-spring/three";
import ProjectsList from "../../ProjectsList/ProjectsList";
import SkillsList from "../../SkillsList/SkillsList";
import Presentation from "../../Presentation/Presentation";
import { useSceneTransition } from "../../../../hooks/useSceneTransition.ts";
import { CameraController } from "../CameraController/CameraController.tsx";

interface SceneManagerProps {
  activeScene: number;
  deviceType:
  {
    device: 'mobile' | 'tablet' | 'desktop';
    orientation: 'portrait' | 'landscape';
  }
  selectedTech: string | null;
  setSelectedTech: (tech: string | null) => void;
  organizedView: boolean;
  radius: number;
  speed: number;
  setFocusIndex: (index: number) => void;
  onComposerReady?: () => void;
}

export function SceneManager({ activeScene, deviceType, selectedTech, setSelectedTech, organizedView, radius, speed, setFocusIndex, onComposerReady }: SceneManagerProps) {
  const { position } = useSceneTransition(activeScene);


  return (
    <animated.group position={position.to((x, y, z) => [x, y, z])}>
      <CameraController activeScene={activeScene} />
      {
        activeScene === 0 && (
          <Presentation activeScene={activeScene} position={[0, 0, 0]} onComposerReady={onComposerReady} />
        )
      }
      {
        activeScene === 1 && (
          <ProjectsList activeScene={activeScene} position={[40, 1.4, 12]} setFocusIndex={setFocusIndex} />
        )
      }
      {
        activeScene === 2 && (
          <SkillsList position={[80, 0, 0]} deviceType={deviceType} selectedTech={selectedTech} setSelectedTech={setSelectedTech} organizedView={organizedView} radius={radius} speed={speed} />
        )
      }
    </animated.group>
  );
}