import { Canvas } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import { useEffect } from 'react';
import { SceneManager } from "../SceneManager/SceneManager";

export function PreloadCanvas({ onReady }: { onReady: () => void }) {
  const { active } = useProgress();

  useEffect(() => {
    if (!active) {
      const timeout = setTimeout(() => onReady(), 100);
      return () => clearTimeout(timeout);
    }
  }, [active]);

  return (
    <Canvas style={{ display: 'none' }}>
      {/* Monte tous les composants qui déclenchent des loaders */}
      <SceneManager
        activeScene={0}
        deviceType={{ device: "desktop", orientation: "landscape" }}
        selectedTech={null}
        setSelectedTech={() => { }}
        organizedView={false}
        radius={0}
        speed={0}
        setFocusIndex={() => { }}
      />
    </Canvas>
  );
}