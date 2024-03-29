import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from '../pages/Dashboard.jsx';
import NavTop from '../global_layouts/NavTop.jsx';
import NavLeft from '../global_layouts/NavLeft.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';

/**
 * The main component. It contains the router
 * @memberof app
 * @extends Component
 * @hideconstructor
 */
class App extends Component {
  render() {
    return (
      <AppContainer>
        <BrowserRouter>
          <NavTop />
          <NavLeft />
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/user/:userId" component={Dashboard} />
            <Route path="/errorpage">
              <ErrorPage />
            </Route>
            <Route>
              <ErrorPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </AppContainer>
    );
  }
}

/**
 * The style for the App component
 * @memberof App
 */
const AppContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

export default App;
