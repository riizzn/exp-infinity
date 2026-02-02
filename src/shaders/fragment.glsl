uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTouchTexture;

uniform vec3 uColor1;
uniform vec3 uColor2;

uniform float uSpeed;
uniform float uIntensity;
uniform float uGrainIntensity;

varying vec2 vUv;

#define PI 3.14159265359

/* ---------- Grain ---------- */
float grain(vec2 uv, float time) {
  vec2 p = uv * uResolution * 0.5;
  float g = fract(sin(dot(p + time, vec2(12.9898,78.233))) * 43758.5453);
  return g * 2.0 - 1.0;
}

/* ---------- Gradient ---------- */
vec3 gradient(vec2 uv, float time) {
  vec2 c1 = vec2(
    0.5 + sin(time * uSpeed * 0.6) * 0.4,
    0.5 + cos(time * uSpeed * 0.5) * 0.4
  );

  vec2 c2 = vec2(
    0.5 + cos(time * uSpeed * 0.4) * 0.45,
    0.5 + sin(time * uSpeed * 0.7) * 0.45
  );

  float d1 = length(uv - c1);
  float d2 = length(uv - c2);

  float i1 = 1.0 - smoothstep(0.0, 0.7, d1);
  float i2 = 1.0 - smoothstep(0.0, 0.7, d2);

  vec3 color = uColor1 * i1 + uColor2 * i2;
  color *= uIntensity;

  return color;
}

/* ---------- Main ---------- */
void main() {
  vec2 uv = vUv;

  /* Touch distortion */
  vec4 touch = texture2D(uTouchTexture, uv);
  float vx = (touch.r * 2.0 - 1.0);
  float vy = (touch.g * 2.0 - 1.0);
  float force = touch.b;

  uv += vec2(vx, vy) * 0.6 * force;

  /* Ripple */
  float dist = length(uv - 0.5);
  float ripple = sin(dist * 18.0 - uTime * 3.0) * 0.03 * force;
  uv += ripple;

  vec3 color = gradient(uv, uTime);

  /* Grain */
  color += grain(uv, uTime) * uGrainIntensity;

  /* Slight color breathing */
  color.r += sin(uTime * 0.6) * 0.02;
  color.b += cos(uTime * 0.7) * 0.02;

  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
