import { createContext, type ReactNode } from 'react';
import type { Mesh } from "three";
import * as THREE from 'three';

export interface GLTFNodes {
  Object_4: Mesh;
  Object_16: Mesh;
  Object_18: Mesh;
  Object_24: Mesh;
  Object_52: Mesh;
  Object_140: Mesh;
  Object_142: Mesh;
  Object_144: Mesh;
  Object_146: Mesh;
  Object_148: Mesh;
  Object_150: Mesh;
  Object_152: Mesh;
  Object_154: Mesh;
  Object_156: Mesh;
  Object_158: Mesh;
  Object_160: Mesh;
  Object_162: Mesh;
  Object_164: Mesh;
  Object_166: Mesh;
  Object_168: Mesh;
  Object_170: Mesh;
  Object_176: Mesh;
  Object_180: Mesh;
  Object_182: Mesh;
  Object_184: Mesh;
  Object_186: Mesh;
  Object_188: Mesh;
  Object_190: Mesh;
  Object_192: Mesh;
  Object_194: Mesh;
  Object_200: Mesh;
  Object_204: Mesh;
  Object_172: Mesh;
  Object_174: Mesh;
  Object_22: Mesh;
  Object_26: Mesh;
  Object_178: Mesh;
  Object_28: Mesh;
  Object_206: Mesh;
  Object_207: Mesh;
  Object_215: Mesh;
  Object_216: Mesh;
  Sphere: Mesh;
}


export type KnownInstances = {
  Object: unknown;
  Object1: unknown;
  Object3: unknown;
  Object13: unknown;
  Object14: unknown;
  Object23: unknown;
  Object24: unknown;
  Object32: unknown;
  Object36: unknown;
  Object45: unknown;
  Object46: unknown;
  Object47: unknown;
  Object48: unknown;
  Sphere: unknown;
};

export interface ObjectProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number | [number, number, number];
  color?: THREE.ColorRepresentation | [number, number, number];
}

export type InstancedComponents = React.ComponentType<ObjectProps> & Record<string, React.ComponentType<ObjectProps>>;

export interface InstancesProps {
  children?: ReactNode;
  castShadow?: boolean;
  receiveShadow?: boolean;
}


export const InstancesContext = createContext<InstancedComponents | null>(null);
