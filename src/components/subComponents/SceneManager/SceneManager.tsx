import { animated } from "@react-spring/three";
import ProjectsList from "../../ProjectsList/ProjectsList";
import SkillsList from "../../SkillsList/SkillsList";
import Presentation from "../../Presentation/Presentation";
import { useSceneTransition } from "../../../hooks/useSceneTransition.ts";

interface SceneManagerProps {
  activeScene: number;
  device: 'mobile' | 'tablet' | 'desktop';
  selectedTech: string | null;
  setSelectedTech: (tech: string | null) => void;
  organizedView: boolean;
  radius: number;
  speed: number;
  setFocusIndex: (index: number) => void;
}

export function SceneManager({ activeScene, device, selectedTech, setSelectedTech, organizedView, radius, speed, setFocusIndex }: SceneManagerProps) {
  const { position } = useSceneTransition(activeScene);


  return (
    <animated.group position={position.to((x, y, z) => [x, y, z])}>
      <SkillsList activeScene={activeScene} position={[40, 0, 0]} device={device} selectedTech={selectedTech} setSelectedTech={setSelectedTech} organizedView={organizedView} radius={radius} speed={speed} />
      <ProjectsList activeScene={activeScene} position={[20, 1, 7]} setFocusIndex={setFocusIndex} />
      <Presentation activeScene={activeScene} position={[0, 0, 0]} />
    </animated.group>
  );
}