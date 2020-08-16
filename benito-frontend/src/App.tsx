import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Header from "./components/Header/index";
import Footer from "./components/Footer";
import { Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import ViewProject from "./components/Project/index";

const App = (_: any) => (
  <div className="qui-app">
    <Header />
    <Switch>
      <Route exact path="/projects/:projectId" component={ViewProject} />
      <Route exact path="/search" component={Search} />
    </Switch>
    <Footer />
  </div>
);

export default hot(module)(App);
