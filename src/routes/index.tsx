import * as React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from '../components/home';

export class Routes extends React.Component<{}, {}> {
  static root = '/';

  render() {
    return (
      <Switch>
        <Route
          path={Routes.root}
          render={() => <Home />} />
        <Route
          render={() => <Redirect to={Routes.root} />} />
      </Switch>
    );
  }
}

export default Routes;