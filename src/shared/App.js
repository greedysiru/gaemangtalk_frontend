import React from 'react';

// Redux

// Router
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

// Pages
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Chat from '../pages/Chat';


import AppLayout from '../components/AppLayout';

function App() {
  return (
    <ConnectedRouter history={history}>
      <AppLayout>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/chat" exact component={Chat} />
          <Route component={NotFound} />
        </Switch>
      </AppLayout>
    </ConnectedRouter>
  );
}

export default App;
