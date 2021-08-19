import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App.jsx';
import reportWebVitals from './utils/reportWebVitals';
import { createGlobalStyle } from 'styled-components';

function initializeApp() {
  ReactDOM.render(
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

const GlobalStyle = createGlobalStyle`
/* --------------------------------------------------
----------------------- Fonts -----------------------
-------------------------------------------------- */

* {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
}

/* --------------------------------------------------
--------------------- Variables ---------------------
-------------------------------------------------- */

:root {
  --nav-left-width: 6rem;
  --main-padding-no-unit: 0.065;
  --main-padding: calc(100% * var(--main-padding-no-unit));

  @media only screen and (min-width: 80rem) {
    --nav-left-width: 7.5rem;
  }

  @media only screen and (min-width: 90rem) {
    --main-padding: calc((100% - 90rem * (1 - 2 * var(--main-padding-no-unit))) / 2);
  }
}

/* --------------------------------------------------
--------------------- CSS reset ---------------------
-------------------------------------------------- */

*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html,
body,
#root {
  height: 100%;
}

a {
  text-decoration: inherit;
  color: inherit;
}

button {
  background: inherit;
  border: inherit;
  cursor: pointer;
}

/* --------------------------------------------------
------------------- Screen-reader -------------------
-------------------------------------------------- */

.sr-only {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
`;

initializeApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
