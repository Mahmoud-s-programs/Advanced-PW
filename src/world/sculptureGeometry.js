import { BufferGeometry, Float32BufferAttribute, CatmullRomCurve3, Vector3 } from 'three';

export function createPetalGeometry(segments = 42) {
  const geometry = new BufferGeometry();
  const positions = [], uvs = [], indices = [];
  const across = 14;
  for (let y = 0; y <= segments; y++) {
    const v = y / segments;
    const width = Math.pow(Math.sin(v * Math.PI), 0.7) * (0.76 + 0.06 * Math.sin(v * Math.PI * 8));
    for (let x = 0; x <= across; x++) {
      const u = x / across * 2 - 1;
      positions.push(u * width, v * 3.6, Math.sin(v * Math.PI) * 0.88 + u * u * width * 0.3 + Math.sin(u * Math.PI) * 0.08);
      uvs.push(x / across, v);
      if (y < segments && x < across) {
        const i = y * (across + 1) + x;
        indices.push(i, i + across + 1, i + 1, i + 1, i + across + 1, i + across + 2);
      }
    }
  }
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function petalSpine() {
  return new CatmullRomCurve3(Array.from({length:18}, (_, i) => {
    const v = i / 17;
    return new Vector3(0, v * 3.6, Math.sin(v * Math.PI) * 0.88 + 0.018);
  }));
}

export function orbitPoints(radius, tilt = 0, segments = 100) {
  return Array.from({length:segments + 1}, (_, i) => {
    const angle = i / segments * Math.PI * 2;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius * Math.sin(tilt), Math.sin(angle) * radius * Math.cos(tilt)];
  });
}
