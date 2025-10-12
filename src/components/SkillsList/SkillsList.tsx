import './SkillsList.scss';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Image, useTexture, Html, Environment } from '@react-three/drei';
import { frontendIcons, backendIcons, gestionIcons, descriptions } from './SkillsData';


interface SkillsListProps {
  activeScene: number;
  position?: [number, number, number];
  device: 'mobile' | 'tablet' | 'desktop';
  selectedTech: string | null;
  setSelectedTech: (tech: string | null) => void;
  organizedView: boolean;
  radius: number;
  speed: number;
}

export default function SkillsList({
  activeScene,
  position = [0, 0, 0],
  device,
  selectedTech,
  setSelectedTech,
  organizedView,
  radius,
  speed
}: SkillsListProps) {

  return (
    <group position={position}>
      {
        activeScene === 2 && (
          <>
            {/* <CameraFocus target={[0, 0, 3]} /> */}
            {/* <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} /> */}
            <Environment preset="night" background blur={0.5} />
          </>
        )}

      <group position={device === 'desktop' ? [-3.5, 1.5, 0] : [0, 3, 0]}>
        <SphereTitle text="Frontend" />
        <IconSphere icons={frontendIcons} setSelectedTech={setSelectedTech} organizedView={organizedView} radius={radius} speed={speed} />
      </group>

      <group position={device === 'desktop' ? [3.5, 1.5, 0] : [0, 0, 0]}>
        <SphereTitle text="Backend" />
        <IconSphere icons={backendIcons} setSelectedTech={setSelectedTech} organizedView={organizedView} radius={radius} speed={speed} />
      </group>

      <group position={device === 'desktop' ? [0, -2, 0] : [0, -3, 0]}>
        <SphereTitle text="Gestion" />
        <IconSphere icons={gestionIcons} setSelectedTech={setSelectedTech} organizedView={organizedView} radius={radius} speed={speed} />
      </group>

      {selectedTech && (
        <Html center>
          <div className="tech-info-panel">
            <button className="close-btn" onClick={() => setSelectedTech(null)}>×</button>
            <h2>{selectedTech}</h2>
            <p>{descriptions[selectedTech]}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

// export function CameraFocus({ target }: { target: [number, number, number] }) {
//   const { camera } = useThree();
//   const targetVec = new THREE.Vector3(...target);

//   useFrame(() => {
//     camera.lookAt(targetVec);
//   });

//   return null;
// }


export function SphereTitle({ text }: { text: string }) {
  return (
    <group position={[0, 0, 0]}>
      <Html position={[0, 0, 0]} center>
        <div className="sphere-title">{text}</div>
      </Html>
    </group>
  );
}

function IconSphere({
  icons,
  radius = 1,
  speed = 0.3,
  setSelectedTech,
  organizedView,
}: {
  icons: { url: string; label: string }[];
  radius?: number;
  speed?: number;
  setSelectedTech: (tech: string) => void;
  organizedView: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const axis = useRef<THREE.Vector3>(
    new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize()
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      if (!organizedView) {
        groupRef.current.rotateOnAxis(axis.current, delta * speed);
      }
      else {
        groupRef.current.rotation.set(0, 0, 0);
        groupRef.current.rotateOnAxis(axis.current, 0);
      }

    }
  });

  return (
    <group ref={groupRef}>

      {icons.map(({ url, label }, i) => {
        const phi = Math.acos(-1 + (2 * i) / icons.length);
        const theta = Math.sqrt(icons.length * Math.PI) * phi;
        const x0 = radius * Math.cos(theta) * Math.sin(phi);
        const y0 = radius * Math.sin(theta) * Math.sin(phi);
        const z0 = radius * Math.cos(phi);

        // Fonction de trajectoire orbitale
        const orbitFn = (): [number, number, number] => {
          return [x0, y0, z0];
        };

        const staticPosition: [number, number, number] = (() => {
          const angle = (2 * Math.PI * i) / icons.length;
          const r = radius;
          return [r * Math.cos(angle), r * Math.sin(angle), 0];
        })();


        return (
          <IconImage
            key={i}
            url={url}
            label={label}
            orbitFn={orbitFn}
            setSelectedTech={setSelectedTech}
            staticPosition={staticPosition}
            organizedView={organizedView}

          />
        );
      })}
    </group>
  );
}

function IconImage({
  url,
  label,
  orbitFn,
  setSelectedTech,
  staticPosition,
  organizedView,
}: {
  url: string;
  label: string;
  orbitFn: (t: number) => [number, number, number];
  setSelectedTech: (tech: string) => void;
  staticPosition: [number, number, number];
  organizedView: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const texture = useTexture(url);
  const [opacity, setOpacity] = useState(0);
  const [hovered, setHovered] = useState(false);

  const baseSize = 0.5;
  const ratio = texture.image.width / texture.image.height;
  const scale: [number, number] = [baseSize * ratio, baseSize];

  // ✅ Appel unique du hook
  const morphRef = useRef({
    position: staticPosition,
    scale: 1,
    localTime: 0,
    displayedTime: 0,
  });

  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.lookAt(camera.position);

    // ✅ Mise à jour manuelle du morphing
    const morph = morphRef.current;

    if (!organizedView) {
      morph.localTime += delta;
      const targetTime = hovered ? morph.displayedTime : morph.localTime;
      morph.displayedTime = THREE.MathUtils.lerp(
        morph.displayedTime,
        targetTime,
        hovered ? 0.05 : 0.2
      );
    }

    const targetPos = organizedView
      ? staticPosition
      : orbitFn(morph.displayedTime);

    const [cx, cy, cz] = morph.position;
    const [tx, ty, tz] = targetPos;
    const lerpFactor = 0.1;

    morph.position = [
      THREE.MathUtils.lerp(cx, tx, lerpFactor),
      THREE.MathUtils.lerp(cy, ty, lerpFactor),
      THREE.MathUtils.lerp(cz, tz, lerpFactor),
    ];

    const targetScale = hovered ? 1.3 : 1;
    morph.scale = THREE.MathUtils.lerp(morph.scale, targetScale, 0.1);

    ref.current.position.set(...morph.position);
    ref.current.scale.setScalar(morph.scale);

    if (opacity < 1) setOpacity(Math.min(1, opacity + delta * 0.5));
  });

  return (
    <group
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setSelectedTech(label)}
    >
      <Image
        url={url}
        scale={scale}
        transparent
        toneMapped={false}
        opacity={opacity}
      />
    </group>
  );
}