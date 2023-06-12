'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'kyobo';
    src: url('../font/KyoboHandwriting2022khn.ttf');
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
    font-family: 'kyobo';
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    margin: 0;
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    font-size: 20px;
    font-family: 'kyobo', 'Helvetica', 'Arial', sans-serif;
  }

  code {
    background-color: #848484;
    color: #333;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9em;
    font-family: 'Consolas', 'Courier New', monospace;
  }
`;

export default GlobalStyle;