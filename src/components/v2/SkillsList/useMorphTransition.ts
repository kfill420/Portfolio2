import { useRef } from 'react';
import * as THREE from 'three';


export function useMorphTransition({
  orbitFn,
  staticPosition,
  organizedView,
  hovered,
  delta,
}: {
  orbitFn: (t: number) => [number, number, number];
  staticPosition: [number, number, number];
  organizedView: boolean;
  hovered: boolean;
  delta: number;
}) {
  const localTime = useRef(0);
  const displayedTime = useRef(0);
  const currentPosition = useRef<[number, number, number]>(staticPosition);
  const currentScale = useRef(1);

  // Time interpolation
  if (!organizedView) {
    localTime.current += delta;
    const targetTime = hovered ? displayedTime.current : localTime.current;
    displayedTime.current = THREE.MathUtils.lerp(
      displayedTime.current,
      targetTime,
      hovered ? 0.05 : 0.2
    );
  }

  // Position interpolation
  const targetPos = organizedView
    ? staticPosition
    : orbitFn(displayedTime.current);

  const [cx, cy, cz] = currentPosition.current;
  const [tx, ty, tz] = targetPos;
  const lerpFactor = 0.1;

  currentPosition.current = [
    THREE.MathUtils.lerp(cx, tx, lerpFactor),
    THREE.MathUtils.lerp(cy, ty, lerpFactor),
    THREE.MathUtils.lerp(cz, tz, lerpFactor),
  ];

  // Scale interpolation
  const targetScale = hovered ? 1.3 : 1;
  currentScale.current = THREE.MathUtils.lerp(
    currentScale.current,
    targetScale,
    0.1
  );

  return {
    position: currentPosition.current,
    scale: currentScale.current,
  };
}
