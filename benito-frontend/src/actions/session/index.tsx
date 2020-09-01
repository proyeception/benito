import {
  SessionAction,
  UPDATE_TOKEN as UPDATE_SESSION_TOKEN,
  UPDATE_USER_ID,
  UPDATE_PROFILE_PICTURE as UPDATE_USER_PROFILE_PICTURE,
  UPDATE_IS_LOGGED_IN,
  INVALIDATE_SESSION,
} from "../../store/session/types";

export function updateSessionToken(token: String): SessionAction {
  return {
    type: UPDATE_SESSION_TOKEN,
    payload: token,
  };
}

export function updateUserId(id: String): SessionAction {
  return {
    type: UPDATE_USER_ID,
    payload: id,
  };
}

export function updateUserProfilePicture(url: String): SessionAction {
  return {
    type: UPDATE_USER_PROFILE_PICTURE,
    payload: url,
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
