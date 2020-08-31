import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import "./utils.scss";
import Cookies from "js-cookie";
import { updateToken } from "./actions/session";

const quiTokenCookie = Cookies.get("x-qui-token");

if (quiTokenCookie) {
  localStorage.setItem("x-qui-token", quiTokenCookie);
}

const quiTokenStorage = localStorage.getItem("x-qui-token");

if (quiTokenStorage) {
  store.dispatch(updateToken(quiTokenStorage));
}

const router = (
  <Router>
    <Switch>
      <Route exact path="/*" component={App} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById("root")
);
