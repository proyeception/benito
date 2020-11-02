import { Organization, Role } from "../../types";

export const INVALIDATE_SESSION = "INVALIDATE_SESSION";
export const UPDATE_SESSION_STATE = "UPDATE_SESSION_STATE";
export const UPDATE_SESSION_FULL_NAME = "UPDATE_SESSION_FULL_NAME";

interface InvalidateSessionAction {
  type: typeof INVALIDATE_SESSION;
}

interface UpdateSessionStateAction {
  type: typeof UPDATE_SESSION_STATE;
  payload: SessionState;
}

interface UpdateSessionFullName {
  type: typeof UPDATE_SESSION_FULL_NAME;
  payload: string;
}

export type SessionAction =
  | InvalidateSessionAction
  | UpdateSessionStateAction
  | UpdateSessionFullName;

export interface LoggedInState {
  token: string;
  userId: string;
  profilePicture?: string;
  role: Role;
  fullName: string;
  username?: string;
  isLoggedIn: true;
  selectedOrganization: Organization;
  organizations: Array<Organization>;
}

export interface NotLoggedInState {
  isLoggedIn: false;
}

export type SessionState = LoggedInState | NotLoggedInState;
