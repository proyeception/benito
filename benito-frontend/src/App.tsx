import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProjectPage from "./views/ProjectPage/ProjectPage";
import SearchPage from "./views/SearchPage/SearchPage";
import AuthorPage from "./views/ProfilePage/AuthorPage";
import SupervisorPage from "./views/ProfilePage/SupervisorPage";
import LoginPage from "./views/LoginPage/LoginPage";
import Components from "./views/Components/Components";
import withCategories from "./hooks/withCategories";
import { ERROR, PENDING, SUCCESS } from "./hooks/withFetch";
import store from "./store";
import { updateCategories } from "./actions/common";
import axios from "axios";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { openLocalStoredSession } from "./functions/session";
import { AxiosRequestConfig } from "axios";
import { benitoHost } from "./config";
import { Category } from "./types";

const App = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  useEffect(() => {
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/categories`,
    };

    openLocalStoredSession(() => setIsLoggingIn(false));

    axios
      .request<Array<Category>>(config)
      .then((res) => res.data)
      .then((categories) => store.dispatch(updateCategories(categories)))
      .catch(console.error);
  }, []);

  if (isLoggingIn) {
    return <div id="login" />;
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BrowserRouter>
        <Switch>
          <Route path="/projects/:id" component={ProjectPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/authors/:id" component={AuthorPage} />
          <Route path="/supervisors/:id" component={SupervisorPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={Components} />
        </Switch>
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  );
};

export default App;
