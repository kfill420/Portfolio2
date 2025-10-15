import { useScroll } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import * as THREE from "three";

export function CameraController({ activeScene }: { activeScene: number }) {
  const { camera, viewport, pointer, events } = useThree();
  const scroll = useScroll();

  const previousScene = useRef(activeScene);
  const animationProgress = useRef(1);
  const settlingProgress = useRef(1);

  useFrame((_state, delta) => {
    const isTransitioning = animationProgress.current < 1;
    const isSettling = settlingProgress.current < 1;

    // Détection du changement de scène
    if (previousScene.current !== activeScene) {
      animationProgress.current = 0;
      settlingProgress.current = 0;
      previousScene.current = activeScene;
    }

    // Animation de transition vers position neutre
    if (isTransitioning) {
      animationProgress.current += delta * 1.5;
      const t = Math.min(animationProgress.current, 1);

      const neutralTarget = new THREE.Vector3();
      if (activeScene === 0) neutralTarget.set(0, 0, 15);
      else if (activeScene === 1) neutralTarget.set(0, 1.4, 18);
      else if (activeScene === 2) neutralTarget.set(0, 2, 16);

      camera.position.lerpVectors(camera.position, neutralTarget, t);
      camera.lookAt(0, 0, 0);
      return;
    }

    // Phase de "settling" : interpolation douce vers la position dynamique
    if (isSettling) {
      settlingProgress.current += delta * 1.5;

      if (activeScene === 0) {
        const target = new THREE.Vector3(
          (pointer.x * viewport.width) / 12,
          (1 + pointer.y) / 2,
          3.5
        );
        easing.damp3(camera.position, target, 0.3, delta);
        camera.lookAt(0, 0, 0);
        return;
      }

      if (activeScene === 1) {
        const scrollOffset = scroll?.scrollYProgress?.get() ?? 0;
        if (events?.update) events.update();
        const target = new THREE.Vector3(0, 1.5, 10 + scrollOffset * 5);
        easing.damp3(camera.position, target, 0.3, delta);
        camera.lookAt(0, 0, 0);
        return;
      }

      if (activeScene === 2) {
        const target = new THREE.Vector3(0, 2, 6);
        easing.damp3(camera.position, target, 0.3, delta);
        camera.lookAt(0, 0, 0);
        return;
      }
    }

    // Comportement dynamique complet
    if (activeScene === 0) {
      const target = new THREE.Vector3(
        (pointer.x * viewport.width) / 52,
        (1 + pointer.y) / 2,
        3
      );
      easing.damp3(camera.position, target, 0.3, delta);
      camera.lookAt(0, 0, 0);

    }

    if (activeScene === 1) {
      const scrollOffset = scroll?.scrollYProgress?.get() ?? 0;
      if (events?.update) events.update();
      const target = new THREE.Vector3(0, 1.5, 10 + scrollOffset * 5);
      easing.damp3(camera.position, target, 0.2, delta);
      camera.lookAt(0, 0, 0);
    }

    if (activeScene === 2) {
      const target = new THREE.Vector3(0, 2, 6);
      easing.damp3(camera.position, target, 0.5, delta);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}