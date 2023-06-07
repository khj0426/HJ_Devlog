'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'kyobo';
        src: url('../font/KyoboHandwriting2022khn.ttf');
    }
    *, *::before, *::after {
    box-sizing: border-box;
  }

  
  body {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height:100vh;
    line-height: 1.5;
    font-family: 'kyobo';
    background-color: ${({ theme }) => theme.background};
    color:${({ theme }) => theme.text};
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-size: 16px;
    font-family: 'kyobo', 'Helvetica','Arial',sans-serif;
  }

`;
export default GlobalStyle;
