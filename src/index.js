import React from 'react';
import ReactDOM from 'react-dom';
import App from './shared/App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import theme from './shared/theme';
// redux store
import { Provider } from 'react-redux';
import store from './redux/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
