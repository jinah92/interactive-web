import { useEffect } from "react";
import { getCurrentWeather } from "../utils/weatherApi";
import Earth from "./Earth";
import Weather from "./Weather";

const Scene = () => {
  useEffect(() => {
    getCurrentWeather(44.24, 10.99, process.env.REACT_APP_API_KEY);
  }, []);

  return (
    <>
      <Earth position={[0, -2, 0]} />
      <Weather position={[0.5, 0, 0]} weather={"rain"} />
      <Weather position={[0, 0, 0]} weather={"clear"} />
      <Weather position={[-0.5, 0, 0]} weather={"snow"} />
    </>
  );
};

export default Scene;
