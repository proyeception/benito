import {
  SessionAction,
  INVALIDATE_SESSION,
  UPDATE_SESSION_STATE,
  LoggedInState,
  UPDATE_SESSION_FULL_NAME,
} from "../../store/session/types";

export function updateSessionState(loginState: LoggedInState): SessionAction {
  return {
    type: UPDATE_SESSION_STATE,
    payload: loginState,
  };
}

export function invalidateSession(): SessionAction {
  return {
    type: INVALIDATE_SESSION,
  };
}

export function updateSessionFullName(n: string): SessionAction {
  return {
    type: UPDATE_SESSION_FULL_NAME,
    payload: n,
  };
}
