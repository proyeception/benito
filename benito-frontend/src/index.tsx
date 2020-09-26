import React from "react";
import ReactDOM from "react-dom";
//import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./assets/scss/material-kit-react.scss?v=1.9.0";
import "./utils.scss";

// pages for this product
import Components from "./views/Components/Components";
import ProjectPage from "./views/ProjectPage/ProjectPage";
import LoginPage from "./views/LoginPage/LoginPage";
import AuthorPage from "./views/ProfilePage/AuthorPage";
import SupervisorPage from "./views/ProfilePage/SupervisorPage";

//var hist = createBrowserHistory();

ReactDOM.render(
  /* 
    Please read the following link to find the difference between the Hash and Browser Router.
    https://reactrouter.com/web/guides/primary-components#:~:text=At%20the%20core%20of%20every,BrowserRouter%3E%20uses%20regular%20URL%20paths.
  */
  //<HashRouter>
  <BrowserRouter>
    <Switch>
      <Route path="/projects/:id" component={ProjectPage} />
      <Route path="/authors/:id" component={AuthorPage} />
      <Route path="/supervisors/:id" component={SupervisorPage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/" component={Components} />
    </Switch>
  </BrowserRouter>,
  // </HashRouter>,
  document.getElementById("root")
);
