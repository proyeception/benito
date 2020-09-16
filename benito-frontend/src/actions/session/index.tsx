import {
  SessionAction,
  UPDATE_SESSION_TOKEN,
  UPDATE_IS_LOGGED_IN,
  INVALIDATE_SESSION,
  UPDATE_SESSION_INFO,
  UPDATE_IS_FETCHING,
  UPDATE_SESSION_PROFILE_PICTURE,
} from "../../store/session/types";
import { SessionInfo } from "../../types";

export function updateSessionToken(token: String): SessionAction {
  return {
    type: UPDATE_SESSION_TOKEN,
    payload: token,
  };
}

export function updateSessionInfo(s: SessionInfo): SessionAction {
  return {
    type: UPDATE_SESSION_INFO,
    payload: s,
  };
}

export function setLoginTrue(): SessionAction {
  return {
    type: UPDATE_IS_LOGGED_IN,
    payload: true,
  };
}

export function invalidateSession(): SessionAction {
  return {
    type: INVALIDATE_SESSION,
  };
}

export function startFetching(): SessionAction {
  return {
    type: UPDATE_IS_FETCHING,
    payload: true,
  };
}

export function finishFetching(): SessionAction {
  return {
    type: UPDATE_IS_FETCHING,
    payload: false,
  };
}

export function updateSessionProfilePicture(
  profilePicUrl?: String
): SessionAction {
  return {
    type: UPDATE_SESSION_PROFILE_PICTURE,
    payload: profilePicUrl,
  };
}
