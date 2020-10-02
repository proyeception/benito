import { Role } from "../../types";

export const INVALIDATE_SESSION = "INVALIDATE_SESSION";
export const UPDATE_SESSION_STATE = "UPDATE_SESSION_STATE";

interface InvalidateSessionAction {
  type: typeof INVALIDATE_SESSION;
}

interface UpdateSessionStateAction {
  type: typeof UPDATE_SESSION_STATE;
  payload: SessionState;
}

export type SessionAction = InvalidateSessionAction | UpdateSessionStateAction;

export interface LoggedInState {
  token: string;
  userId: string;
  profilePicture?: string;
  role: Role;
  fullName: string;
  username?: string;
  isLoggedIn: true;
}

export interface NotLoggedInState {
  isLoggedIn: false;
}

export type SessionState = LoggedInState | NotLoggedInState;
