import store from "../../store";
import {
  updateSessionToken,
  updateUserId,
  updateUserProfilePicture,
  setLoginTrue,
} from "../../actions/session";
import Cookies from "js-cookie";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import { SessionInfo } from "../../types";

const X_QUI_TOKEN = "x-qui-token";

export function openLocalStoredSession() {
  const quiTokenCookie = Cookies.get(X_QUI_TOKEN);

  if (quiTokenCookie) {
    localStorage.setItem(X_QUI_TOKEN, quiTokenCookie);
  }

  const quiTokenStorage = localStorage.getItem(X_QUI_TOKEN);

  if (quiTokenStorage) {
    store.dispatch(updateSessionToken(quiTokenStorage));
    axios
      .request<SessionInfo>({
        url: `${benitoHost}/benito/session`,
        headers: { "x-qui-token": quiTokenStorage },
        method: "GET",
      })
      .then((res) => res.data)
      .then(({ userId, profilePicUrl }) => {
        store.dispatch(updateUserId(userId));
        store.dispatch(updateUserProfilePicture(profilePicUrl));
        store.dispatch(setLoginTrue());
      })
      .catch((e: AxiosError) => {
        console.error(e);
        clearLocalSession();
      });
  }
}

export function startLogin() {
  let config: AxiosRequestConfig = {
    method: "GET",
    url: `${benitoHost}/benito/auth`,
  };
  axios
    .request<String>(config)
    .then((res) => res.data)
    .then((url) => (window.location.href = url.valueOf()))
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
