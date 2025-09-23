import { useRecoilState } from "recoil";
import { IsEnteredAtom } from "../stores";

export const Loader = () => {
  const [isEntered, setIsEntered] = useRecoilState(IsEnteredAtom);

  return null;
};
