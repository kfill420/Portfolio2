import { useSpring, animated } from "@react-spring/three";
import ProjectsList from "../../ProjectsList/ProjectsList";
import SkillsList from "../../SkillsList/SkillsList";

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

  const spring = useSpring({
    position: [
      activeScene === 0 ? 0 : activeScene === 1 ? 10 : 20,
      0,
      5,
    ],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const animatedPosition = spring.position.to((xyz) => xyz as unknown as [number, number, number]);

  return (
    <animated.group position={animatedPosition}>

      <SkillsList position={[3, -2.8, -18]} device={device} selectedTech={selectedTech} setSelectedTech={setSelectedTech} organizedView={organizedView} radius={radius} speed={speed} />
      <ProjectsList position={[0, 0, 0]} setFocusIndex={setFocusIndex} />
      {/* <Projects4 /> */}
    </animated.group>
  );
}