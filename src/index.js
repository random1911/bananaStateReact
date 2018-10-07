import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { I18nextProvider } from "react-i18next";
import Store from "./stores/main";
import { ThemeProvider } from "styled-components";
import theme from "./components/styles/theme";
import App from "./App";
import i18n from "./i18n";
import registerServiceWorker from "./registerServiceWorker";

const store = Store.create({});

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </I18nextProvider>,
  document.getElementById("root")
);
registerServiceWorker();
