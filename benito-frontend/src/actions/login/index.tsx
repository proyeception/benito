import {
  UPDATE_LOGIN_USERNAME,
  UPDATE_LOGIN_PASSWORD,
  LoginAction,
  LOAD_LOGIN,
  FINISH_LOAD_LOGIN,
  SET_LOGIN_TRUE,
  DISPEL_PASSWORD_ERROR,
  SET_PASSWORD_INVALID,
  SET_USERNAME_INVALID,
  DISPEL_USERNAME_ERROR,
} from "../../store/login/types";

export function updateLoginUsername(newUsername: String): LoginAction {
  return {
    type: UPDATE_LOGIN_USERNAME,
    payload: newUsername,
  };
}

export function updateLoginPassword(newPassword: String): LoginAction {
  return {
    type: UPDATE_LOGIN_PASSWORD,
    payload: newPassword,
  };
}

export function loadLogin(): LoginAction {
  return {
    type: LOAD_LOGIN,
  };
}

export function finishLogin(): LoginAction {
  return {
    type: FINISH_LOAD_LOGIN,
  };
}

export function setLoginTrue(): LoginAction {
  return {
    type: SET_LOGIN_TRUE,
  };
}

export function setUsernameError(): LoginAction {
  return {
    type: SET_USERNAME_INVALID,
  };
}

export function dispelUsernameError(): LoginAction {
  return {
    type: DISPEL_USERNAME_ERROR,
  };
}

export function setPasswordError(): LoginAction {
  return {
    type: SET_PASSWORD_INVALID,
  };
}

export function dispelPasswordError(): LoginAction {
  return {
    type: DISPEL_PASSWORD_ERROR,
  };
}
