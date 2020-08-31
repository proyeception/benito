import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import "./utils.scss";
import Cookies from "js-cookie";
import {
  updateToken,
  updateUserId,
  updateProfilePicture,
  logIn,
} from "./actions/session";
import axios from "axios";
import { benitoHost } from "./config";

type Role = "SUPERVISOR" | "AUTHOR";

type SessionInfo = {
  userId: String;
  role: Role;
  profilePic: String;
};

const X_QUI_TOKEN = "x-qui-token";
const quiTokenCookie = Cookies.get(X_QUI_TOKEN);

if (quiTokenCookie) {
  localStorage.setItem(X_QUI_TOKEN, quiTokenCookie);
}

const quiTokenStorage = localStorage.getItem(X_QUI_TOKEN);

if (quiTokenStorage) {
  store.dispatch(updateToken(quiTokenStorage));
  axios
    .request<SessionInfo>({
      url: `${benitoHost}/benito/session`,
      headers: { "x-qui-token": quiTokenStorage },
      method: "GET",
    })
    .then((res) => res.data)
    .then(({ userId, profilePic }) => {
      store.dispatch(updateUserId(userId));
      store.dispatch(updateProfilePicture(profilePic));
      store.dispatch(logIn());
    })
    .catch((e) => {
      console.error(e);
      localStorage.removeItem(X_QUI_TOKEN);
      Cookies.remove(quiTokenStorage);
    });
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
