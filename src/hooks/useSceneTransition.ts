import { useSpring } from '@react-spring/three';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export function useSceneTransition(activeScene: number) {
  const { camera, scene } = useThree();

  const scenePositions: Record<number, [number, number, number]> = {
    0: [0, 0, 0],     // Presentation
    1: [-40, 0, 0],    // ProjectsList
    2: [-80, 0, 0],    // SkillsList
  };

  // Position du groupe principal
  const { position } = useSpring({
    position: scenePositions[activeScene],
    config: { mass: 1, tension: 170, friction: 30, clamp: true },
  });

  // Mise à jour de la caméra et du fond
  useEffect(() => {
    // const target = new THREE.Vector3(...scenePositions[activeScene]);
    // const desiredPosition = new THREE.Vector3(target.x, target.y + 1.5, target.z + 6);

    // camera.position.lerp(desiredPosition, 0.03); // interpolation douce

    // camera.lookAt(target);
    // camera.updateProjectionMatrix();

    scene.background = activeScene === 0 ? new THREE.Color('black') : null;

  }, [activeScene, camera, scene]);

  return { position };
}