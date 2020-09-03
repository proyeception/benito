import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Header from "./components/Header/index";
import Footer from "./components/Footer";
import { Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import Home from "./components/Home";
import axios, { AxiosRequestConfig } from "axios";
import { benitoHost } from "./config";
import { Category } from "./types";
import store from "./store";
import { updateCategories } from "./actions/common";
import { AnimatePresence } from "framer-motion";
import HamburgerMenu from "./components/Header/HamburgerMenu";
import ViewProject from "./components/Project/index";
import NotFound from "./components/NotFound";
import Author from "./components/User/Author";
import Supervisor from "./components/User/Supervisor";
import SupervisorLogin from "./components/Login/SupervisorLogin";

const App = (_: any) => {
  useEffect(() => {
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/categories`,
    };

    axios
      .request<Array<Category>>(config)
      .then((res) => res.data)
      .then((categories) => store.dispatch(updateCategories(categories)))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-light-gray h-100">
      <HamburgerMenu />
      <Header />
      <AnimatePresence>
        <Switch>
          <Route exact path="/projects/:projectId" component={ViewProject} />
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/authors/:userId" component={Author} />
          <Route exact path="/supervisors/:userId" component={Supervisor} />
          <Route exact path="/supervisor/login" component={SupervisorLogin} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default hot(module)(App);
