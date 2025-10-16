import * as THREE from 'three';
import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { Image, ScrollControls, useScroll, useTexture } from '@react-three/drei';
import { easing } from 'maath';
import './utils.ts';
import { BentPlaneGeometry, MeshSineMaterial } from "./utils.ts";


interface ProjectsListProps {
  activeScene: number;
  position?: [number, number, number];
  setFocusIndex: (index: number) => void;
}

export default function ProjectsList({ activeScene, position = [0, 0, 0], setFocusIndex }: ProjectsListProps) {

  return (
    <group position={position}>
      {/* <fog attach="fog" args={['#a79', 9.5, 12]} /> */}
      {
        <ScrollControls pages={activeScene == 1 ? 4 : 0} enabled={activeScene == 1} infinite style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE
        }}
        >
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel setFocusIndex={setFocusIndex} />
          </Rig>
          <Banner position={[0, -0.15, 0]} />
        </ScrollControls>
      }

      {/* {activeScene == 1 && <Environment preset="night" background blur={0.5} />} */}
    </group>
  );
}

type RigProps = React.JSX.IntrinsicElements['group'];
export function Rig(props: RigProps) {

  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll()
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
    if (state.events?.update)
      state.events.update()

  })
  return <group ref={ref} {...props} />
}

export function Carousel({ radius = 1.2, count = 6, setFocusIndex }: { radius?: number; count?: number; setFocusIndex: (index: number) => void }) {
  const links = ["https://spiecraft.vercel.app",
    "https://kfill420.github.io/Github-Searcher",
    "https://kfill420.github.io/Todolist",
    "https://casalinkk.vercel.app/#/landingpage",
    "https://dtk-shop.vercel.app",
    "nop"];

  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame(({ camera }) => {
    let closest = 0;
    let minDist = Infinity;

    groupRefs.current.forEach((group, index) => {
      if (!group) return;
      const worldPos = new THREE.Vector3();
      group.getWorldPosition(worldPos);
      const dist = camera.position.distanceTo(worldPos);
      if (dist < minDist) {
        minDist = dist;
        closest = index;
      }
    });

    setFocusIndex(closest);
  });

  return (
    Array.from({ length: count }, (_, i) => (
      <Card
        key={i}
        ref={(el) => {
          groupRefs.current[i] = el;
        }}
        projectUrl={links[i]}
        url={`images/project${Math.floor(i % 10) + 1}.webp`}
        position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
        rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
      />
    ))
  );
}

type GroupProps = React.JSX.IntrinsicElements['group'];
type CardProps = {
  projectUrl: string;
  url: string;
} & GroupProps;

type ZoomableMaterial = THREE.Material & {
  radius: number;
  zoom: number;
};

const Card = React.forwardRef<THREE.Group, CardProps>(({ projectUrl, url, ...props }, ref) => {

  const groupRef = useRef<THREE.Group>(null);
  const imageRef = useRef<THREE.Mesh>(null);
  const [hovered, hover] = useState(false);

  const pointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(true);
  };

  const pointerOut = () => hover(false);

  const viewWebsite = () => {
    if (projectUrl === "nop") return;
    window.open(projectUrl, '_blank');
  }

  React.useEffect(() => {
    if (typeof ref === 'function') ref(groupRef.current);
    else if (ref) (ref as React.MutableRefObject<THREE.Group | null>).current = groupRef.current;
  }, [ref]);


  useFrame((_state, delta) => {
    const mesh = imageRef.current;
    if (!mesh || !mesh.material) return;

    easing.damp3(mesh.scale, hovered ? 1.15 : 1, 0.1, delta);

    const mat = mesh.material as ZoomableMaterial;
    easing.damp(mat, 'radius', hovered ? 0.45 : 0.1, 0.2, delta);
    easing.damp(mat, 'zoom', hovered ? 1 : 1.4, 0.2, delta);
  });

  return (
    <group ref={groupRef} {...props} onClick={() => viewWebsite()}>
      <Image
        ref={imageRef}
        url={url}
        transparent
        side={THREE.DoubleSide}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
      >
        <primitive object={new BentPlaneGeometry(0.1, 1, 1, 20, 20)} attach="geometry" />
      </Image>
    </group>
  );
});


type BannerProps = React.JSX.IntrinsicElements['mesh'];

export function Banner(props: BannerProps) {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useTexture('images/bannerCarousel.png');
  const scroll = useScroll();

  // Configure texture
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;
  texture.repeat.set(10, 1);

  // Create material
  const material = useMemo(() => {
    return new MeshSineMaterial({
      map: texture,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
  }, [texture]);

  useFrame((_state, delta) => {
    const mesh = ref.current;
    if (!mesh || !mesh.material) return;
    const mat = mesh.material as MeshSineMaterial;
    if (!mat.map) return;
    mat.time.value += Math.abs(scroll.delta) * 4;
    mat.map.offset.x += delta / 4;
  });

  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.4, 1.4, 0.14, 128, 16, true]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
