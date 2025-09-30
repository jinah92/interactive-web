import { useGLTF } from "@react-three/drei";

export function Weather(props) {
  const { position, weather } = props;
  const glb = useGLTF("/models/weather.glb");

  return (
    <mesh position={position}>
      <primitive object={glb.nodes[weather]} />
    </mesh>
  );
}
