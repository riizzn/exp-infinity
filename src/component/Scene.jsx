// Scene.jsx
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { TouchTexture } from "./TouchTexture";
import { GradientPlane } from "./GradientPlane";
import { TouchController } from "./TouchController";

export default function Scene() {
  const touchTexture = useMemo(() => new TouchTexture(), []);

  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 45 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#0a0e27"]} />
      <GradientPlane touchTexture={touchTexture.texture} />
      <TouchController touch={touchTexture} />
    </Canvas>
  );
}
