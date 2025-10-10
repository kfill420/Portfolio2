// import { Canvas, useFrame } from '@react-three/fiber';
// import { useMemo, useRef } from 'react';
// import { createBentPlaneGeometry } from '../utils/createBentPlaneGeometry';
// import { createSineMaterial } from '../utils/createSineMaterial';
// import * as THREE from 'three';

// export function Test() {
//   const meshRef = useRef<THREE.Mesh>(null);

//   useFrame((_, delta) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += delta;
//     }
//   });

//   return (
//     <mesh ref={meshRef}>
//       <planeGeometry args={[1, 1]} />
//       <meshBasicMaterial color="hotpink" />
//     </mesh>
//   );
// }
