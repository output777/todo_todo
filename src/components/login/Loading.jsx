import BeatLoader from "react-spinners/BeatLoader";
import styled from "styled-components";

function Loading() {
  return (
    <StLoadingContainer>
      <BeatLoader color="#FF8F27" size="20" />
    </StLoadingContainer>
  );
}

const StLoadingContainer = styled.div`
  position:fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100vh;
  display: flex;
  align-items:center;
  justify-content:center;

`

export default Loading;