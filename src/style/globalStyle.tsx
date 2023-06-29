'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'kyobo';
    src: url('../font/KyoboHandwriting2022khn.ttf');
    font-display: swap;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
  }


  body {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    line-height: 1.5;
    max-width: 100%;
    font-family: 'kyobo';
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 20px;
    font-family: 'kyobo', 'Helvetica', 'Arial', sans-serif;
  }

  pre {
    flex-wrap:wrap;
    border-radius: 10px;
    font-family: 'Monaco', monospace;
    padding: 0 1em;
    flex-direction: column;
    white-space: pre-wrap;
  }



code ,.language-javascript{
  
    white-space: pre-wrap;
    font-family: Monaco, monospace;
    font-size: 15px;
    padding: 0.2em;
    letter-spacing: -0.05em;
    word-break: normal;
  }

`;
export default GlobalStyle;
