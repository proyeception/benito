import { UserSession, UserAction, SET_USER } from "store/user/types";

export function setUserSession(
  sessionToken: String,
  userSession: UserSession
): UserAction {
  return {
    type: SET_USER,
    sessionToken: sessionToken,
    payload: userSession,
  };
}
