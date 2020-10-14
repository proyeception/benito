import store from "../../store";
import { updateSessionState } from "../../actions/session";
import Cookies from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import { LoginData, Session } from "../../types";
import { History } from "history";
import { fetchUser, mapRoleToCollection } from "../user";

const X_QUI_TOKEN = "x-qui-token";

export async function openLocalStoredSession(cb: () => void) {
  const quiTokenCookie = Cookies.get(X_QUI_TOKEN);

  if (quiTokenCookie) {
    localStorage.setItem(X_QUI_TOKEN, quiTokenCookie);
  }

  const quiTokenStorage = localStorage.getItem(X_QUI_TOKEN);

  if (quiTokenStorage) {
    try {
      const session = await axios
        .request<Session>({
          url: `${benitoHost}/benito/session`,
          headers: { "x-qui-token": quiTokenStorage },
          method: "GET",
        })
        .then((res) => res.data);
      const user = await fetchUser(
        mapRoleToCollection(session.role),
        session.userId
      );
      store.dispatch(
        updateSessionState({
          fullName: user.fullName,
          profilePicture: user.profilePicUrl,
          role: session.role,
          userId: session.userId,
          token: quiTokenStorage,
          username: user.username,
          isLoggedIn: true,
        })
      );
    } catch (e) {
      console.error(e);
      clearLocalSession();
    }
  }

  cb();
}

export function startLogin(
  login: LoginData,
  history: History,
  loginPath: "author" | "supervisor"
) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${benitoHost}/benito/${loginPath}/login`,
    data: login,
    withCredentials: true,
  };
  axios
    .request(config)
    .then(() => {
      history.go(0);
    })
    .catch(console.error);
}

export function clearSession(token: string) {
  axios.delete(`${benitoHost}/benito/session`, {
    headers: { "x-qui-token": token },
  });
  clearLocalSession();
}

function clearLocalSession() {
  Cookies.remove(X_QUI_TOKEN);
  localStorage.removeItem(X_QUI_TOKEN);
}
