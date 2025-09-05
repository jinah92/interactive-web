import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export const GlbModel = () => {
  const { scene, animations } = useGLTF("/dancer.glb");
  const ref = useRef(null);
  const [currentAnimation, setCurrentAnimation] = useState("wave");

  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene, actions]);

  useEffect(() => {
    actions[currentAnimation].fadeIn(0.5).play();

    return () => {
      actions[currentAnimation].fadeOut(0.5).stop();
    };
  }, [actions, currentAnimation]);

  return (
    <primitive
      ref={ref}
      onClick={() => {
        setCurrentAnimation((prev) => {
          if (prev === "wave") {
            return "windmill";
          }
          return "wave";
        });
      }}
      scale={0.01}
      position-y={0.8}
      object={scene}
    />
  );
};
