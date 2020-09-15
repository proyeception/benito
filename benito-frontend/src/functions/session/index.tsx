import store from "../../store";
import {
  updateSessionToken,
  updateSessionInfo,
  startFetching,
  finishFetching,
  setLoginTrue,
  updateSessionProfilePicture,
} from "../../actions/session";
import Cookies from "js-cookie";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import { SessionInfo, LoginData } from "../../types";
import { History } from "history";
import { fetchUser, mapRoleToCollection } from "../user";

const X_QUI_TOKEN = "x-qui-token";

export async function openLocalStoredSession(
  finishLogin: React.Dispatch<React.SetStateAction<boolean>>
) {
  const quiTokenCookie = Cookies.get(X_QUI_TOKEN);

  if (quiTokenCookie) {
    localStorage.setItem(X_QUI_TOKEN, quiTokenCookie);
  }

  const quiTokenStorage = localStorage.getItem(X_QUI_TOKEN);

  if (quiTokenStorage) {
    store.dispatch(updateSessionToken(quiTokenStorage));
    store.dispatch(startFetching());
    await axios
      .request<SessionInfo>({
        url: `${benitoHost}/benito/session`,
        headers: { "x-qui-token": quiTokenStorage },
        method: "GET",
      })
      .then((res) => res.data)
      .then((s) => {
        store.dispatch(updateSessionInfo(s));
        store.dispatch(setLoginTrue());
        return fetchUser(mapRoleToCollection(s.role), s.userId);
      })
      .then((p) => store.dispatch(updateSessionProfilePicture(p.profilePicUrl)))
      .catch((e: AxiosError) => {
        console.error(e);
        clearLocalSession();
      })
      .then(() => store.dispatch(finishFetching()));
  }

  finishLogin(false);
}

export function startLogin(
  login: LoginData,
  history: History,
  loginPath: String
) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${benitoHost}/benito/${loginPath}/login`,
    data: login,
    withCredentials: true,
  };
  axios
    .request(config)
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
