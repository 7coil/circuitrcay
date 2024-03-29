import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import ReduxProvider from './components/ReduxProvider';
import Home from './pages/Home';
import Index from './pages/Index';
import LogIn from './pages/LogIn';
import NotFound from './pages/NotFound';
import './scss/index.scss';

import * as serviceWorker from './serviceWorker';

class Main extends React.Component {
  render() {
    return (
      <ReduxProvider>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={LogIn} />
            <AuthenticatedRoute exact path="/home" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </HashRouter>
      </ReduxProvider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
serviceWorker.register();
