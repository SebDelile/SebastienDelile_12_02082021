import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App.jsx';
import reportWebVitals from './utils/reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import robotoRegular1 from './fonts/roboto-regular-webfont.woff';
import robotoRegular2 from './fonts/roboto-regular-webfont.woff2';
import robotoMedium1 from './fonts/roboto-medium-webfont.woff';
import robotoMedium2 from './fonts/roboto-medium-webfont.woff2';
import robotoBold1 from './fonts/roboto-bold-webfont.woff';
import robotoBold2 from './fonts/roboto-bold-webfont.woff2';

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

@font-face {
  font-family: 'Roboto';
  src:
    local('Roboto'),
    url(${robotoRegular2}) format('woff2'),
    url(${robotoRegular1}) format('woff');
  font-weight: 400;
}

@font-face {
  font-family: 'Roboto';
  src:
    local('Roboto'),
    url(${robotoMedium2}) format('woff2'),
    url(${robotoMedium1}) format('woff');
  font-weight: 500;
}

@font-face {
  font-family: 'Roboto';
  src:
    local('Roboto'),
    url(${robotoBold2}) format('woff2'),
    url(${robotoBold1}) format('woff');
  font-weight: 700;
}

html {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
}

/* --------------------------------------------------
--------------------- Variables ---------------------
-------------------------------------------------- */

:root {
  --nav-left-width: 7.5rem;
  --main-padding: 5%;

  @media only screen and (min-width: 90rem) {
    --main-padding: calc((100% - 90rem * 0.9) / 2);
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
