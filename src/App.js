import "./App.css";
import Router from "./shared/Router";
import manSvg from './assets/img/manSvg.svg';
import todoSvg from './assets/img/todoSvg.svg';
import styled, { keyframes } from "styled-components";
import bg1 from './assets/img/bg/bg1.jpg';
import bg2 from './assets/img/bg/bg2.jpg';
import bg3 from './assets/img/bg/bg3.jpg';
import bg4 from './assets/img/bg/bg4.jpg';
import bg5 from './assets/img/bg/bg5.jpg';


function App() {

  return (
    <StContainer>
    <Router />

    <StTitleBox>
      <StImgBox1>
        <img src={todoSvg} alt='todoSvg' />
      </StImgBox1>
    </StTitleBox>
    </StContainer>
  );
}

const titleFade = keyframes`
  0% {
    display:block;
  }

  100% {
    display:none;
  }
`
const titleShow = keyframes`
  0% {
  }
  10% {
    bottom:500px;
  }
  20% {
    bottom:480px;
  }
  30% {
    bottom:500px;
  }
  40% {
    bottom:500px;
  }
  50% {
    bottom:500px;
  }
  60% {
    bottom:500px;
  }
  70% {
    bottom:500px;
  }
  80% {
    bottom:500px;
  }
  100% {
    bottom:1400px;
  }
`



const backgroundChange = keyframes`
  0% {
    opacity:1;
  }
  50% {
    background: #ccc;
    opacity:0;
  }
  75% {
    background: #ccc;
    opacity:0.5;
  }
  100% {
    background: #ccc;
    opacity:1;
  }
`



const StContainer = styled.div`
position:relative;
width:100vw;
/* height:auto; */
/* overflow:hidden; */
background: #FF8F27;
animation: ${backgroundChange} 1s 4s alternate both;
`

const StTitleBox = styled.div`
  animation: ${titleFade} 1s 4s alternate both;
`


const StImgBox1 = styled.div`
  position: absolute;
  width:400px;
  /* bottom: 0; */
  left:50%;
  bottom: -400px;;
  transform: translateX(-50%);
  display: flex;
  justify-content:flex-end;
  align-items:center;
  z-index:10;
  animation: ${titleShow} 3s .5s alternate ease-in both;


  & img {
    width:100%;
    /* animation: ${titleShow} 4s 1s alternate ease both; */
    /* background-size: contain; */
  }

  @media screen and (max-width:768px) {
    /* display:none; */
    width:300px;

  }
`




export default App;
