'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

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

  main{
    min-height: calc(100vh - 120px);
  }


  body {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    line-height: 1.5;
    max-width: 100%;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 20px;
  }

  pre {
    flex-wrap:wrap;
    border-radius: 10px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 1em;
    flex-direction: column;
    white-space: pre-wrap;
  }


  code ,.language-javascript{
    white-space: pre-wrap;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    word-break: normal;
  }

`;
export default GlobalStyle;
