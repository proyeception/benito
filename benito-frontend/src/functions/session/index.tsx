import store from "../../store";
import {
  updateSessionToken,
  updateSessionInfo,
  startFetching,
  finishFetching,
  setLoginTrue,
} from "../../actions/session";
import Cookies from "js-cookie";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import { SessionInfo, LoginData } from "../../types";
import { History } from "history";

const X_QUI_TOKEN = "x-qui-token";

export function openLocalStoredSession() {
  const quiTokenCookie = Cookies.get(X_QUI_TOKEN);
  console.log(quiTokenCookie);

  if (quiTokenCookie) {
    localStorage.setItem(X_QUI_TOKEN, quiTokenCookie);
  }

  const quiTokenStorage = localStorage.getItem(X_QUI_TOKEN);

  if (quiTokenStorage) {
    store.dispatch(updateSessionToken(quiTokenStorage));
    store.dispatch(startFetching());
    axios
      .request<SessionInfo>({
        url: `${benitoHost}/benito/session`,
        headers: { "x-qui-token": quiTokenStorage },
        method: "GET",
      })
      .then((res) => res.data)
      .then((s) => {
        store.dispatch(updateSessionInfo(s));
        store.dispatch(setLoginTrue());
      })
      .catch((e: AxiosError) => {
        console.error(e);
        clearLocalSession();
      })
      .then(() => store.dispatch(finishFetching()));
  }
}

export function startLogin(login: LoginData, _: History) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${benitoHost}/benito/login`,
    data: login,
    withCredentials: true,
  };
  axios
    .request(config)
    .then(() => console.log(Cookies.get()))
    .then(() => history.go(0))
    .catch(console.error);
}

export function clearSession(token: String) {
  axios.delete(`${benitoHost}/benito/session`, {
    headers: { "x-qui-token": token },
  });
  clearLocalSession();
}

function clearLocalSession() {
  Cookies.remove(X_QUI_TOKEN);
  localStorage.removeItem(X_QUI_TOKEN);
}
