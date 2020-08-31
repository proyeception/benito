import {
  SessionAction,
  UPDATE_TOKEN,
  UPDATE_USER_ID,
  UPDATE_PROFILE_PICTURE,
  UPDATE_IS_LOGGED_IN,
  RESET_USER_SESSION,
} from "../../store/session/types";

export function updateToken(token: String): SessionAction {
  return {
    type: UPDATE_TOKEN,
    payload: token,
  };
}

export function updateUserId(id: String): SessionAction {
  return {
    type: UPDATE_USER_ID,
    payload: id,
  };
}

export function updateProfilePicture(url: String): SessionAction {
  return {
    type: UPDATE_PROFILE_PICTURE,
    payload: url,
  };
}

export function logIn(): SessionAction {
  return {
    type: UPDATE_IS_LOGGED_IN,
    payload: true,
  };
}

export function logOut(): SessionAction {
  return {
    type: UPDATE_IS_LOGGED_IN,
    payload: false,
  };
}

export function resetUserSession(): SessionAction {
  return {
    type: RESET_USER_SESSION,
  };
}
