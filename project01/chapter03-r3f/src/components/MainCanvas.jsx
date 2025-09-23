import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import { Meshs } from "./Meshs";
import { Lights } from "./Lights";
import { Controls } from "./Controls";
import { Dancer } from "./Dancer";
import { PostProcessor } from "./PostProcessor";
import { Physics } from "@react-three/cannon";

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
      <Physics
        gravity={[0, -9, 0]}
        defaultContactMaterial={{ restitution: 1, friction: 0.5 }}
      >
        <Lights />
        <Meshs />
      </Physics>
      <Controls />
      {/* <GlbModel /> */}
      {/* <PostProcessor>
        <Dancer />
      </PostProcessor> */}
    </Canvas>
  );
};
