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

  // --- Intro ---
  const introDone = useRef(false);
  const introProgress = useRef(0);

  useFrame((_state, delta) => {
    // --------------------
    // 1️⃣ Intro au premier chargement
    // --------------------
    if (!introDone.current) {
      if (introProgress.current === 0) {
        // première frame : placer la caméra loin pour l’animation
        camera.position.set(0, 0, 20);
        camera.lookAt(0, 0, 0);
      }

      // animation vers la scène 0
      introProgress.current += delta * 0.5; // vitesse ≈ 2 secondes
      const t = Math.min(introProgress.current, 1);
      camera.position.lerpVectors(
        new THREE.Vector3(0, 0, 60),
        new THREE.Vector3(0, 0, 15),
        t
      );
      camera.lookAt(0, 0, 0);

      if (t >= 1) introDone.current = true; // fin de l’intro
      return; // bloque le reste tant que l’intro n’est pas finie
    }

    // --------------------
    // 2️⃣ Transitions et Settling (fonctionnement normal)
    // --------------------
    const isTransitioning = animationProgress.current < 1;
    const isSettling = settlingProgress.current < 1;

    if (previousScene.current !== activeScene) {
      animationProgress.current = 0;
      settlingProgress.current = 0;
      previousScene.current = activeScene;
    }

    if (isTransitioning) {
      animationProgress.current += delta * 1.5;
      const t = Math.min(animationProgress.current, 1);
      const neutralTarget =
        activeScene === 0
          ? new THREE.Vector3(0, 0, 15)
          : activeScene === 1
            ? new THREE.Vector3(0, 1.4, 18)
            : new THREE.Vector3(0, 2, 16);

      camera.position.lerpVectors(camera.position, neutralTarget, t);
      camera.lookAt(0, 0, 0);
      return;
    }

    if (isSettling) {
      settlingProgress.current += delta * 1.5;
      let target: THREE.Vector3 | null = null;

      if (activeScene === 0) target = new THREE.Vector3((pointer.x * viewport.width) / 12, (1 + pointer.y) / 2, 3.5);
      else if (activeScene === 1) {
        const scrollOffset = scroll?.scrollYProgress?.get() ?? 0;
        if (events?.update) events.update();
        target = new THREE.Vector3(0, 1.5, 10 + scrollOffset * 5);
      } else target = new THREE.Vector3(0, 2, 6);

      if (target) easing.damp3(camera.position, target, 0.3, delta);
      camera.lookAt(0, 0, 0);
      return;
    }

    // --------------------
    // 3️⃣ Mouvement dynamique complet
    // --------------------
    let target: THREE.Vector3 | null = null;
    if (activeScene === 0) target = new THREE.Vector3((pointer.x * viewport.width) / 52, (1 + pointer.y) / 2, 3);
    else if (activeScene === 1) {
      const scrollOffset = scroll?.scrollYProgress?.get() ?? 0;
      if (events?.update) events.update();
      target = new THREE.Vector3(0, 1.5, 10 + scrollOffset * 5);
    } else target = new THREE.Vector3(0, 2, 6);

    if (target) easing.damp3(camera.position, target, 0.3, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
