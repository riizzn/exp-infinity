import { useFrame, useThree } from "@react-three/fiber";

export default function TouchController({ touch }) {
  const { mouse } = useThree();

  useFrame(() => {
    touch.addTouch({
      x: (mouse.x + 1) / 2,
      y: (mouse.y + 1) / 2
    });
    touch.update();
  });

  return null;
}
