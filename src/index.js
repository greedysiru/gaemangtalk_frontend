import React from 'react';
import ReactDOM from 'react-dom';
import App from './shared/App';
import reportWebVitals from './reportWebVitals';

// redux store
import { Provider } from 'react-redux';
import store from './redux/configureStore';

// CSS reset
import './styles/reset.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider >,
  document.getElementById('root')
);


reportWebVitals();
