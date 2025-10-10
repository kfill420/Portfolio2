import * as THREE from 'three';

type SineMaterial = THREE.MeshBasicMaterial & {
  time: { value: number };
};

export function createSineMaterial(params: THREE.MeshBasicMaterialParameters = {}): SineMaterial {
  const material = new THREE.MeshBasicMaterial(params) as SineMaterial;
  const time = { value: 0 };

  material.onBeforeCompile = (shader) => {
    shader.uniforms.time = time;
    shader.vertexShader = `
      uniform float time;
      ${shader.vertexShader}
    `;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `vec3 transformed = vec3(position.x, position.y + sin(time + uv.x * PI * 4.0) / 4.0, position.z);`
    );
  };

  material.time = time;

  return material;
}