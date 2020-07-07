export const UPDATE_LOGIN_USERNAME = "UPDATE_LOGIN_USERNAME";
export const UPDATE_LOGIN_PASSWORD = "UPDATE_LOGIN_PASSWORD";
export const LOAD_LOGIN = "LOAD_LOGIN";
export const FINISH_LOAD_LOGIN = "FINISH_LOAD_LOGIN";
export const SET_LOGIN_TRUE = "SET_LOGIN_TRUE";

interface UpdateUsernameAction {
  type: typeof UPDATE_LOGIN_USERNAME;
  payload: String;
}

interface UpdatePasswordAction {
  type: typeof UPDATE_LOGIN_PASSWORD;
  payload: String;
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

export type LoginAction =
  | UpdateUsernameAction
  | UpdatePasswordAction
  | LoadLoginAction
  | FinishLoadLoginAction
  | SetLoginTrueAction;

export type LoginState = {
  username: String;
  password: String;
  displayLoader: Boolean;
  isLoggedIn: Boolean;
};
