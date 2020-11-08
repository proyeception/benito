import React, { useEffect, useState } from "react";
import "./App.css";
import { Router, Route, Switch, useHistory } from "react-router-dom";
import ProjectPage from "./views/ProjectPage/ProjectPage";
import SearchPage from "./views/SearchPage/SearchPage";
import AuthorPage from "./views/ProfilePage/AuthorPage";
import SupervisorPage from "./views/ProfilePage/SupervisorPage";
import LoginPage from "./views/LoginPage/LoginPage";
import store from "./store";
import {
  toggleLoading,
  updateCategories,
  updateOrganizations,
} from "./actions/common";
import axios from "axios";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { openLocalStoredSession } from "./functions/session";
import { AxiosRequestConfig } from "axios";
import { benitoHost } from "./config";
import { Category } from "./types";
import { fetchOrganizations } from "./functions/organization";
import MePage from "./views/MePage/MePage";
import HomePage from "./views/HomePage/HomePage";
import StatsPage from "./views/StatsPage/StatsPage";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import NotFoundPage from "./views/NotFoundPage/NotFoundPage";
import EditProjectPage from "./views/EditProjectPage/EditProjectPage";
import ComingSoon from "./views/ComingSoon/ComingSoon";
import CreateProjectPage from "./views/CreateProjectPage/CreateProjectPage";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Spinner from "./components/Spinner/Spinner";
import { RootState } from "./reducers";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import { pushRoute } from "./actions/routes";

type AppProps = {
  loading: boolean;
};

const App = (props: AppProps) => {
  const browserHistory = createBrowserHistory();
  useEffect(() => {
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/categories`,
    };

    openLocalStoredSession(() => store.dispatch(toggleLoading(false)));

    axios
      .request<Array<Category>>(config)
      .then((res) => res.data)
      .then((categories) => store.dispatch(updateCategories(categories)))
      .catch(console.error);

    fetchOrganizations()
      .then((res) => res.data)
      .then((orgs) => store.dispatch(updateOrganizations(orgs)))
      .catch(console.error);
  }, []);

  if (props.loading) {
    return (
      <div id="login">
        <Spinner />
      </div>
    );
  }

  const theme = createMuiTheme({
    palette: {
      primary: grey,
    },
  });

  browserHistory.listen((location, action) => {
    store.dispatch(pushRoute(location.pathname + location.search));
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router history={browserHistory}>
          <Switch>
            <Route path="/projects/create" component={CreateProjectPage} />
            <Route path="/projects/:id/edit" component={EditProjectPage} />
            <Route path="/projects/:id" component={ProjectPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/authors/:id" component={AuthorPage} />
            <Route path="/supervisors/:id" component={SupervisorPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/error" component={ErrorPage} />
            <Route path="/stats" component={StatsPage} />
            <Route path="/comingSoon" component={ComingSoon} />
            <Route path="/me/:tab" component={MePage} />
            <Route path="/" exact component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    loading: rootState.common.loading,
  };
};

export default hot(module)(connect(mapStateToProps)(App));
