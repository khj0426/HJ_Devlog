"use client";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    height:100%;
  }

  a {
    text-decoration: none;
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
    background-color: ${({ theme }) => theme.currentTheme.background};
    color: ${({ theme }) => theme.currentTheme.text};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 20px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }

  pre {
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    border-radius: 10px;
    padding: 0 1em;
    white-space: pre-wrap;
    font-family: inherit;
    word-wrap: break-word;
  }

  a{
    color:${({ theme }) => theme.currentTheme.text};
  }

`;
export default GlobalStyle;
