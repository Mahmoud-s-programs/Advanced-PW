// Original GLSL for the observatory's living amber core and caustic halo.
export const amberVertex = `
  uniform float uTime;
  uniform float uOpen;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPosition;
  void main() {
    vec3 p = position;
    float a = atan(p.z, p.x);
    float ripple = sin(a * 7.0 + p.y * 5.0 + uTime * 0.25);
    p += normal * (0.035 * ripple + uOpen * 0.035 * sin(p.y * 11.0));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    vPosition = p;
    gl_Position = projectionMatrix * mv;
  }
`;

export const amberFragment = `
  uniform float uTime;
  uniform float uOpen;
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPosition;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    vec3 light = normalize(vec3(-0.6, 0.8, 1.0));
    float fresnel = pow(1.0 - max(0.0, dot(n, v)), 2.5);
    float diffuse = max(0.0, dot(n, light));
    float specular = pow(max(0.0, dot(reflect(-light, n), v)), 28.0);
    float striae = sin(vPosition.y * 24.0 + sin(vPosition.x * 5.0 + uTime * 0.15) * 2.3);
    float veins = pow(0.5 + 0.5 * striae, 12.0);
    vec3 dark = vec3(0.09, 0.025, 0.009);
    vec3 color = mix(dark, uColor, 0.25 + diffuse * 0.6);
    color += vec3(1.0, 0.70, 0.28) * fresnel * 1.6;
    color += vec3(1.0, 0.94, 0.80) * specular * 2.2;
    color += vec3(1.0, 0.54, 0.13) * veins * (0.15 + uOpen * 0.16);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export const haloVertex = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

export const haloFragment = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uProgress;
  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float r = length(p);
    float a = atan(p.y, p.x);
    float waves = sin(r * 48.0 - uTime * 0.30 + sin(a * 8.0) * 1.8);
    float caustic = pow(0.5 + 0.5 * waves, 14.0);
    float ring = exp(-pow((r - 0.65) * 33.0, 2.0));
    float glow = exp(-r * r * 6.0) * 0.08;
    float alpha = (caustic * 0.065 + ring * 0.18 + glow) * (1.0 - smoothstep(0.35, 1.0, r));
    gl_FragColor = vec4(1.0, 0.59 + uProgress * 0.12, 0.24, alpha);
  }
`;
