import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import { OrbitControls } from "@react-three/drei";
import { Meshs } from "./Meshs";
import { Lights } from "./Lights";
import * as THREE from "three";

export const MainCanvas = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      //   shadows={"soft"}
      //   shadows={{ enabled: true, type: THREE.PCFSoftShadowMap }}
      shadows
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
