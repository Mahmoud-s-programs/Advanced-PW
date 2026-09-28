import { CylinderGeometry, Float32BufferAttribute, Shape, ShapeGeometry } from 'three';

export function mapleGeometry() {
  const shape = new Shape();
  const outline = [[0,-0.75],[-0.08,-0.36],[-0.44,-0.43],[-0.35,-0.16],[-0.72,0.04],[-0.48,0.11],[-0.57,0.48],[-0.26,0.35],[-0.24,0.65],[-0.1,0.53],[0,1],[0.1,0.53],[0.24,0.65],[0.26,0.35],[0.57,0.48],[0.48,0.11],[0.72,0.04],[0.35,-0.16],[0.44,-0.43],[0.08,-0.36]];
  outline.forEach(([x,y], i) => i ? shape.lineTo(x,y) : shape.moveTo(x,y));
  shape.closePath();
  const geometry = new ShapeGeometry(shape);
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i), y = positions.getY(i);
    positions.setZ(i, Math.abs(x) * 0.17 + Math.sin(y * 3) * 0.06);
  }
  geometry.computeVertexNormals();
  return geometry;
}

export function barkGeometry() {
  const geometry = new CylinderGeometry(0.52, 1, 1, 9, 7);
  const positions = geometry.attributes.position;
  const colors = [];
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i);
    const ridge = 1 + 0.035 * Math.sin(y * 31 + Math.atan2(x,z) * 5);
    positions.setXYZ(i, x * ridge, y, z * ridge);
    const light = 0.5 + (Math.sin(Math.atan2(x,z) * 9) + 1) * 0.18;
    colors.push(light * 0.35, light * 0.25, light * 0.18);
  }
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
}
