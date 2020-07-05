import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login/index";

const router = (
  <Router>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={App} />
  </Router>
);

ReactDOM.render(router, document.getElementById("root"));
