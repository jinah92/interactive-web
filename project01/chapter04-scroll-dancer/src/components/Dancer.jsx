import { useAnimations, useGLTF, useScroll } from "@react-three/drei";

import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../stores";
import { Loader } from "./Lodaer";
import { useFrame } from "@react-three/fiber";

export const Dancer = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);

  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF("/models/dancer.glb");

  const { actions } = useAnimations(animations, dancerRef);

  const scroll = useScroll();

  useFrame(() => {
    console.log(scroll.offset);
  });

  useEffect(() => {
    if (!isEntered) return;
    actions["wave"].play();
  }, [actions, isEntered]);

  if (isEntered) {
    return (
      <>
        <ambientLight intensity={2} />
        <primitive ref={dancerRef} object={scene} scale={0.05} />
      </>
    );
  }

  return <Loader isCompleted />;
};
