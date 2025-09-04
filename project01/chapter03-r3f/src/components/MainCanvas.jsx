import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import { OrbitControls } from "@react-three/drei";
import { Meshs } from "./Meshs";
import { Lights } from "./Lights";

export const MainCanvas = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      shadows={"soft"}
      camera={{
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
        position: [5, 5, 5],
      }}
      scene={{ background: new Color(0x000000) }}
    >
      <OrbitControls />
      <Lights />
      <Meshs />
    </Canvas>
  );
};
