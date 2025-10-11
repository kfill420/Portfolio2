import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import { Environment, ScrollControls } from '@react-three/drei';
import { Banner, Carousel, Rig } from "./components/ProjectsList/ProjectsList";

export function SceneGlobals({ activeScene, setFocusIndex }: { activeScene: number; setFocusIndex: (index: number) => void }) {
  const { scene, camera } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      if (activeScene === 0) {
        // Presentation
        scene.background = new THREE.Color('black');
        camera.position.set(-1.5, 1, 5.5);
        camera.fov = 45;
        camera.near = 1;
        camera.far = 20;
        camera.updateProjectionMatrix();
      } else if (activeScene === 1) {
        // ProjectsList
        scene.background = null;
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);

        camera.fov = 15;
        camera.updateProjectionMatrix();
      } else if (activeScene === 2) {
        // SkillsList
        scene.background = null;
        camera.position.set(0, 0, 0);
        camera.lookAt(3, -2.8, -18);

        camera.fov = 15;
        camera.updateProjectionMatrix();
      }
    }
  }, [activeScene, scene, camera]);

  return (null
    // <>
    //   {activeScene === 0 && (

    //   )}
    //   {activeScene === 1 || activeScene === 2 && (
    //     <Environment preset="apartment" background blur={0.5} />
    //   )}
    //   {activeScene === 1 && (
    //     <ScrollControls pages={4} infinite>
    //       <Rig rotation={[0, 0, 0.15]}>
    //         <Carousel setFocusIndex={setFocusIndex} />
    //       </Rig>
    //       <Banner position={[0, -0.15, 0]} />
    //     </ScrollControls>
    //   )}
    // </>
  );
}