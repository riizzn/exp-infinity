import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

export default function GradientPlane({ touchTexture }) {
  const material = useRef();
  const { size, viewport } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uTouchTexture: { value: touchTexture },
    uColor1: { value: new THREE.Vector3(0.945, 0.353, 0.133) },
    uColor2: { value: new THREE.Vector3(0.039, 0.055, 0.153) },
    uSpeed: { value: 1.5 },
    uIntensity: { value: 1.8 },
    uGrainIntensity: { value: 0.08 }
  }), [size, touchTexture]);

  useFrame((_, delta) => {
    material.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
