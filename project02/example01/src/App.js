import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Model(props) {
  const glb = useGLTF("/models/earth.glb");
  console.log(glb);

  return (
    <mesh {...props}>
      <primitive object={glb.scene} />
    </mesh>
  );
}

function Lights() {
  return <directionalLight position={[1, 3, -1]} intensity={3} />;
}

function App() {
  return (
    <Canvas camera={{ position: [0, 1, 5] }}>
      <color attach="background" args={[100, 200, 100]}></color>
      <Lights />
      <Model position={[0, -2, 0]} />
    </Canvas>
  );
}

export default App;
