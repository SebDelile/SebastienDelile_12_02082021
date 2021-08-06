import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Dashboard } from './Dashboard.jsx';
import { NavTop } from './NavTop.jsx';
import { NavLeft } from './NavLeft.jsx';
import { ErrorPage } from './ErrorPage.jsx';

export class App extends Component {
  render() {
    return (
      <AppContainer>
        <BrowserRouter>
          <NavTop />
          <NavLeft />
          <Switch>
            <Route
              path="/:id"
              render={(routeProps) => <Dashboard props={{ ...routeProps }} />}
            />
            <Route>
              <ErrorPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;
