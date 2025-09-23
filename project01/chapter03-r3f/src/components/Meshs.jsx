import { useBox, useSphere } from "@react-three/cannon";
import { Box, Sphere } from "@react-three/drei";
import { useEffect } from "react";

export const Meshs = () => {
  const [planRef] = useBox(() => ({
    type: "Static",
    args: [50, 1, 50],
    mass: 1,
    position: [0, 0, 0],
    material: { restitution: 1, friction: 0.5 },
    onCollide: () => console.log("바닥에 충돌"),
  }));
  const [boxRef, api] = useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    position: [-1, 2, 0],
    material: { restitution: 0.4, friction: 0.2 },
  }));

  const [sphreRef1, sphereApi] = useSphere(() => ({
    mass: 5,
    position: [0.5, 8, 0],
    material: { restitution: 0.4, friction: 0.1 },
  }));

  const [sphreRef2] = useSphere(() => ({
    mass: 0.2,
    position: [1, 5, 0],
    material: { restitution: 0.2, friction: 0.1 },
  }));

  useEffect(() => {
    api.applyForce([555, 50, 0], [1, 0, 0]);
    sphereApi.applyLocalForce([-2000, 0, 0], [1, 0, 0]);
  }, [api, sphereApi]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      api.applyLocalImpulse([0, 20, 0], [1, 0, 0]);
      sphereApi.applyImpulse([200, 10, 0], [0, 0, 0]);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [api, sphereApi]);

  return (
    <>
      <Box ref={planRef} args={[50, 1, 50]}>
        <meshStandardMaterial
          color={0xfefefe}
          roughness={0.3}
          metalness={0.8}
        />
      </Box>
      <Box ref={boxRef} args={[1, 1, 1]}>
        <meshStandardMaterial
          color={0xff0000}
          roughness={0.3}
          metalness={0.8}
        />
      </Box>
      <Sphere ref={sphreRef1}>
        <meshStandardMaterial
          color={0x9000ff}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
      <Sphere ref={sphreRef2}>
        <meshStandardMaterial
          color={0xff00ff}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
    </>
  );
};
