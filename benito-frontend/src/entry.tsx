import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import ViewProject from "./components/Project/index";

const router = (
  <Router>
    <Switch>
      <Route exact path="/project" component={ViewProject} />
      <Route exact path="/*" component={App} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById("root")
);
