import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #F2F0E3;
    --secondary-color: #2E2E2E;
    --accent-color: #DC143C; /* Crimson Red */
    --success-color: #4CAF50;
    --warning-color: #FF9800;
    --error-color: #F44336;
    --background-color: #FFFFFF;
    --text-color: #2E2E2E;
    --border-radius: 4px;
    --font-family: 'Roboto', 'Arial', sans-serif;
    --transition-speed: 0.3s;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--font-family);
    background-color: var(--primary-color);
    color: var(--secondary-color);
    line-height: 1.6;
    min-height: 100vh;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  p {
    margin-bottom: 1rem;
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    outline: none;
  }

  button {
    cursor: pointer;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    border: none;
    border-radius: var(--border-radius);
    padding: 0.5rem 1rem;
    transition: background-color var(--transition-speed);

    &:hover {
      background-color: #3E3E3E;
    }

    &:active {
      transform: translateY(1px);
    }

    &.primary {
      background-color: var(--accent-color);
      &:hover {
        background-color: #B30F32;
      }
    }
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
    transition: color var(--transition-speed);

    &:hover {
      color: #B30F32;
    }
  }

  input, textarea, select {
    padding: 0.5rem;
    border: 1px solid var(--secondary-color);
    border-radius: var(--border-radius);
    width: 100%;
    background-color: var(--background-color);
    transition: border-color var(--transition-speed);

    &:focus {
      border-color: var(--accent-color);
    }
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default GlobalStyles; 