import store from "../../store";
import { updateSessionState } from "../../actions/session";
import Cookies from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import { LoginData, Organization, Person, Session } from "../../types";
import { fetchUser, mapRoleToCollection } from "../user";

const X_QUI_TOKEN = "x-qui-token";
export const X_CUSTOMIZATION_TOKEN = "x-customization-token";

export async function openLocalStoredSession(cb?: () => void) {
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

      const person = await axios
        .request<Person>({
          url: `${benitoHost}/benito/${session.role.toLocaleLowerCase()}s/${
            session.userId
          }`,
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
          organizations: person.organizations,
          selectedOrganization: person.organizations[0],
        })
      );
    } catch (e) {
      console.error(e);
      clearLocalSession();
    }
  }

  if (cb) {
    cb();
  }
}

export function startLogin(
  login: LoginData,
  loginPath: "author" | "supervisor",
  onError: () => void
) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${benitoHost}/benito/${loginPath}/login`,
    data: login,
    withCredentials: true,
  };
  axios
    .request(config)
    .then(() => openLocalStoredSession())
    .catch(onError);
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
