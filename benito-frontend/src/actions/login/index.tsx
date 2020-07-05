import {
  UPDATE_LOGIN_USERNAME,
  UPDATE_LOGIN_PASSWORD,
  LoginAction,
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
