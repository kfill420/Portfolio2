import { useRef, useState } from 'react';
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import '@react-three/fiber';

type SpinningBoxProps = JSX.IntrinsicElements['mesh'] & {
  scale: number;
};

export function SpinningBox({ scale, ...props }: SpinningBoxProps) {
  // Référence directe vers l'objet THREE.Mesh
  const ref = useRef<THREE.Mesh>(null);

  // États pour le survol et le clic
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Change le curseur selon l'état de survol
  useCursor(hovered);

  // Rotation continue à chaque frame
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta;
    }
  });

  // Rendu du mesh
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? scale * 1.8 : scale * 1.4}
      onClick={() => setClicked(!clicked)
      }
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      < meshStandardMaterial color={hovered ? 'hotpink' : 'indianred'} />
    </mesh>
  );
}