import { useGLTF } from "@react-three/drei";

export function Earth(props) {
  const glb = useGLTF("/models/earth.glb");

  return (
    <mesh {...props}>
      <primitive object={glb.scene} />
    </mesh>
  );
}
