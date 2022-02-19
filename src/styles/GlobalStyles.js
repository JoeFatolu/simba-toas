import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  html {
    box-sizing: border-box;
    font-size: 16px;
  }
  *, *:before, *:after {
  outline: none;
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    border: 0;
    font-family: inherit;
    font-size: 100%;
    font-style: inherit;
    font-weight: inherit;
    line-height: 1;
    vertical-align: baseline;
  }
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  width: 100%;
	overflow: hidden;


  }
  button{
    cursor: pointer;
  }

  html, body{
    height: 100%;

  }
  a{
    text-decoration: none;
    color: #7A7A9D;

    .text{
        color: #4C6FFF;
    }
  }
  .logologo{

  }
  #root{
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    height: 100%;
    overflow: hidden;
  }

  [data-reach-dialog-overlay] {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background: rgba(20, 19, 29, 0.7);
  z-index: 100;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(12px);
}

[data-reach-dialog-content] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
}



.card{
  background-color: rgb(255, 255, 255);
box-shadow: rgba(0, 0, 0, 0.09) 0rem 1.75rem 4rem 0rem;
width: fit-content;
padding: 32px;
border-radius: 12px;
font-size: 16px;
max-width: 440px;
width: 100%;
height: 150px;
/* display: flex;
align-items:center; */
}
`;
