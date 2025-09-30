import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Lights from "../components/Lights";
import Scene from "../components/Scene";

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

function Home() {
  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 45 }}>
      <color attach="background" args={["rgb(67, 127, 240) 100%)"]} />
      <Suspense fallback={<Sphere />}>
        <Lights />
        <Scene />
      </Suspense>
    </Canvas>
  );
}

export default Home;
