import { SessionInfo, Role } from "../../types";

export const UPDATE_SESSION_TOKEN = "UPDATE_SESSION_TOKEN";
export const UPDATE_IS_LOGGED_IN = "UPDATE_IS_LOGGED_IN";
export const INVALIDATE_SESSION = "INVALIDATE_SESSION";
export const UPDATE_SESSION_INFO = "UPDATE_SESSION_INFO";
export const UPDATE_IS_FETCHING = "UPDATE_IS_FETCHING";

interface UpdateSessionTokenAction {
  type: typeof UPDATE_SESSION_TOKEN;
  payload: String;
}
interface UpdateIsLoggedInAction {
  type: typeof UPDATE_IS_LOGGED_IN;
  payload: Boolean;
}

interface UpdateSessionInfoAction {
  type: typeof UPDATE_SESSION_INFO;
  payload: SessionInfo;
}

interface UpdateIsFetchingAction {
  type: typeof UPDATE_IS_FETCHING;
  payload: Boolean;
}

interface InvalidateSessionAction {
  type: typeof INVALIDATE_SESSION;
}

export type SessionAction =
  | UpdateSessionTokenAction
  | UpdateIsLoggedInAction
  | InvalidateSessionAction
  | UpdateSessionInfoAction
  | UpdateIsFetchingAction;

export type SessionState = {
  token?: String;
  userId?: String;
  profilePicture?: String;
  isLoggedIn: Boolean;
  fetching: Boolean;
  role?: Role;
};
