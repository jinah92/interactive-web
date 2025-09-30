import { useHelper } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Lights() {
  const ref = useRef();
  useHelper(ref, THREE.DirectionalLightHelper, 1, "red");

  return <directionalLight ref={ref} position={[1, 3, -1]} intensity={3} />;
}

function Box(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1]} />
      <meshStandardMaterial color={"hotpink"} wireframe />
    </mesh>
  );
}

function App() {
  return (
    <Canvas camera={{ position: [0, 1, 2] }}>
      <color attach="background" args={[100, 200, 100]}></color>
      <Box rotation-y={1} />
      <Box position={[0, 0, -1.5]} rotation-y={1} />
      <Lights />
    </Canvas>
  );
}

export default App;
