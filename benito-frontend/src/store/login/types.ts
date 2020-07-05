export const UPDATE_LOGIN_USERNAME = "UPDATE_LOGIN_USERNAME";
export const UPDATE_LOGIN_PASSWORD = "UPDATE_LOGIN_PASSWORD";

interface UpdateUsernameAction {
  type: typeof UPDATE_LOGIN_USERNAME;
  payload: String;
}

interface UpdatePasswordAction {
  type: typeof UPDATE_LOGIN_PASSWORD;
  payload: String;
}

export type LoginAction = UpdateUsernameAction | UpdatePasswordAction;
export type LoginState = {
  username: String;
  password: String;
};
