import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const router = (
  <Router history={history}>
    <Switch>
      <Route exact path="/*" component={App} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById("root")
);
