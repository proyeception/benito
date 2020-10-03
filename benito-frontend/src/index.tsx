import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/material-kit-react.scss?v=1.9.0";
import "./utils.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
