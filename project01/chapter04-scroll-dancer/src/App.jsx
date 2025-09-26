import { RecoilRoot } from "recoil";
import styled from "styled-components";
import { FixedDOM } from "./components/dom/FixedDOM";
import { MainCanvas } from "./components/MainCanvas";

function App() {
  return (
    <RecoilRoot>
      <Wrapper>
        <MainCanvas />
        <FixedDOM />
      </Wrapper>
    </RecoilRoot>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
