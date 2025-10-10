import * as THREE from 'three';

export function createBentPlaneGeometry(
  radius: number,
  width: number,
  height: number,
  widthSegments = 1,
  heightSegments = 1
): THREE.PlaneGeometry {
  const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);

  const p = geometry.parameters;
  const hw = p.width * 0.5;

  const a = new THREE.Vector2(-hw, 0);
  const b = new THREE.Vector2(0, radius);
  const c = new THREE.Vector2(hw, 0);

  const ab = new THREE.Vector2().subVectors(a, b);
  const bc = new THREE.Vector2().subVectors(b, c);
  const ac = new THREE.Vector2().subVectors(a, c);

  const r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));
  const center = new THREE.Vector2(0, radius - r);

  const baseV = new THREE.Vector2().subVectors(a, center);
  const baseAngle = baseV.angle() - Math.PI * 0.5;
  const arc = baseAngle * 2;

  const uv = geometry.attributes.uv;
  const pos = geometry.attributes.position;
  const mainV = new THREE.Vector2();

  for (let i = 0; i < uv.count; i++) {
    const uvRatio = uv.getX(i);
    const y = pos.getY(i);
    mainV.copy(c).rotateAround(center, arc * uvRatio);
    pos.setXYZ(i, mainV.x, y, mainV.y);
  }

  for (let i = 0; i < uv.count; i++) {
    const uvRatio = uv.getX(i);
    const y = pos.getY(i);
    mainV.copy(c).rotateAround(center, arc * uvRatio);
    pos.setXYZ(i, -mainV.x, y, mainV.y);
  }

  pos.needsUpdate = true;
  uv.needsUpdate = true;

  geometry.rotateY(Math.PI);

  return geometry;
}