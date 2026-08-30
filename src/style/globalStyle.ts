'use client';
import { createGlobalStyle } from 'styled-components';

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
    color: var(--seed-color-fg-neutral);
    cursor: pointer;
  }

  main{
    min-height: calc(100vh - 120px);
  }


  body {
    min-height: 100vh;
    line-height: 1.6;
    max-width: 100%;
    background-color: var(--seed-color-bg-layer-default);
    color: var(--seed-color-fg-neutral);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    transition: background-color 0.2s ease-in, color 0.2s ease-in;
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
    color: var(--seed-color-fg-neutral);
  }

  ::selection {
    background: var(--seed-color-bg-brand-weak);
    color: var(--seed-color-fg-neutral);
  }

  :focus-visible {
    outline: 3px solid var(--seed-color-stroke-focus-ring);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }

`;
export default GlobalStyle;
