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



function App() {
  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/chat' exact component={Chat} />
          {/* NotFound */}
          <NotFound />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
