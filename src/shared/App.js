import React from 'react';

// Redux

// Router
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

// Pages
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Chatting from '../pages/Chatting';
import Signup from '../pages/Signup';

// component
import AppLayout from '../components/AppLayout';
import Home from '../pages/Home';
import PasswordFind from '../pages/PasswordFind';
import UserInfo from '../pages/UserInfo';

function App() {
  return (
    <ConnectedRouter history={history}>
      <AppLayout>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login/kakao" exact component={Login} />
          <Route path="/chat" exact component={Chatting} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/userInfo" exact component={UserInfo} />
          <Route path="/findPassword" exact component={PasswordFind} />
          <Route component={NotFound} />
        </Switch>
      </AppLayout>
    </ConnectedRouter>
  );
}

export default App;
