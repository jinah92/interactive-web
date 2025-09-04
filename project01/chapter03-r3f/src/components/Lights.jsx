import { useRef } from "react";

export const Lights = () => {
  const lightRef = useRef(null);

  return (
    <>
      <directionalLight
        ref={lightRef}
        args={[0xffffff, 5]}
        position={[4, 4, 4]}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={1000}
        shadow-mapSize-width={512} // 수치가 낮을수록 낮은 퀄리티의 그림자 생성
        shadow-mapSize-height={512}
        castShadow
      />
    </>
  );
};
