import store from "../../store";
import {
  invalidateSession,
  updateSessionToken,
  updateUserId,
  updateUserProfilePicture,
  setLoginTrue,
} from "../../actions/session";
import Cookies from "js-cookie";
import axios from "axios";
import { benitoHost } from "../../config";
import { SessionInfo } from "../../types";

const X_QUI_TOKEN = "x-qui-token";

export function startSession() {
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
      .then(({ userId, profilePic }) => {
        store.dispatch(updateUserId(userId));
        store.dispatch(updateUserProfilePicture(profilePic));
        store.dispatch(setLoginTrue());
      })
      .catch((e) => {
        console.error(e);
        localStorage.removeItem(X_QUI_TOKEN);
        Cookies.remove(quiTokenStorage);
      });
  }
}

export function clearSession(token: String) {
  axios.delete(`${benitoHost}/benito/session`, {
    headers: { "x-qui-token": token },
  });
  store.dispatch(invalidateSession());
  Cookies.remove(X_QUI_TOKEN);
  localStorage.removeItem(X_QUI_TOKEN);
}
