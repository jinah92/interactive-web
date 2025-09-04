import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const GlbModel = () => {
  const three = useThree();
  console.log(three);

  const { scene, animations } = useGLTF("/dancer.glb");
  const ref = useRef(null);

  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    actions["wave"].play();
  }, [scene, actions]);

  useFrame((state, delta) => {
    // ref.current.rotation.y += 0.02;
  });

  return <primitive ref={ref} scale={0.01} position-y={0.8} object={scene} />;
};
