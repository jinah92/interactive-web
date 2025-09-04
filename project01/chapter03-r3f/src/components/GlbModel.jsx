import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export const GlbModel = () => {
  const { scene } = useGLTF("/dancer.glb");
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive scale={0.01} position-y={0.8} object={scene} />;
};
