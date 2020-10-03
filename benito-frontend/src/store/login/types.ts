export const UPDATE_LOGIN_USERNAME = "UPDATE_LOGIN_USERNAME";
export const UPDATE_LOGIN_PASSWORD = "UPDATE_LOGIN_PASSWORD";
export const LOAD_LOGIN = "LOAD_LOGIN";
export const FINISH_LOAD_LOGIN = "FINISH_LOAD_LOGIN";
export const SET_LOGIN_TRUE = "SET_LOGIN_TRUE";
export const DISPEL_USERNAME_ERROR = "DISPEL_USERNAME_ERROR";
export const SET_USERNAME_INVALID = "SET_USERNAME_INVALID";
export const DISPEL_PASSWORD_ERROR = "DISPEL_PASSWORD_ERROR";
export const SET_PASSWORD_INVALID = "SET_PASSWORD_INVALID";

interface UpdateUsernameAction {
  type: typeof UPDATE_LOGIN_USERNAME;
  payload: string;
}

interface UpdatePasswordAction {
  type: typeof UPDATE_LOGIN_PASSWORD;
  payload: string;
}

interface LoadLoginAction {
  type: typeof LOAD_LOGIN;
}

interface FinishLoadLoginAction {
  type: typeof FINISH_LOAD_LOGIN;
}

interface SetLoginTrueAction {
  type: typeof SET_LOGIN_TRUE;
}

interface SetUsernameInvalidAction {
  type: typeof SET_USERNAME_INVALID;
}

interface SetUsernameValidAction {
  type: typeof DISPEL_USERNAME_ERROR;
}

interface SetPasswordValidAction {
  type: typeof DISPEL_PASSWORD_ERROR;
}

interface SetPasswordInvalidAction {
  type: typeof SET_PASSWORD_INVALID;
}

export type LoginAction =
  | UpdateUsernameAction
  | UpdatePasswordAction
  | LoadLoginAction
  | FinishLoadLoginAction
  | SetLoginTrueAction
  | SetUsernameValidAction
  | SetUsernameInvalidAction
  | SetPasswordValidAction
  | SetPasswordInvalidAction;

export type LoginState = {
  username: string;
  password: string;
  displayLoader: Boolean;
  isLoggedIn: Boolean;
  usernameError: Boolean;
  passwordError: Boolean;
};
