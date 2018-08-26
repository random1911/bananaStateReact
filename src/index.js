import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react'
import Store from './stores/main'
import {ThemeProvider} from 'styled-components'
import theme from './components/styles/theme'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = Store.create({})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
