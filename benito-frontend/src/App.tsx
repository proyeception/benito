import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Badge from "./components/Badge/Badge";
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

const App = () => {
  const categories = withCategories();

  if (categories.type == PENDING) {
    return <div></div>;
  }

  if (categories.type == ERROR) {
    return <div>Uh se rompió algo</div>;
  }

  if (categories.type == SUCCESS) {
    store.dispatch(updateCategories(categories.value));
  }

  return (
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
  );
};

export default App;
