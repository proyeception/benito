export const UPDATE_IS_LOGGED_IN = "UPDATE_IS_LOGGED_IN";
export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_USER_ID = "UPDATE_USER_ID";
export const UPDATE_PROFILE_PICTURE = "UPDATE_PROFILE_PICTURE";
export const RESET_USER_SESSION = "RESET_USER_SESSION";

interface UpdateIsLoggedInAction {
  type: typeof UPDATE_IS_LOGGED_IN;
  payload: Boolean;
}

interface UpdateTokenAction {
  type: typeof UPDATE_TOKEN;
  payload: String;
}

interface UpdateUserIdAction {
  type: typeof UPDATE_USER_ID;
  payload: String;
}

interface UpdateProfilePictureAction {
  type: typeof UPDATE_PROFILE_PICTURE;
  payload: String;
}

interface ResetUserSessionAction {
  type: typeof RESET_USER_SESSION;
}

export type SessionAction =
  | UpdateIsLoggedInAction
  | UpdateTokenAction
  | UpdateUserIdAction
  | UpdateProfilePictureAction
  | ResetUserSessionAction;

export type SessionState = {
  token?: String;
  userId?: String;
  profilePicture?: String;
  isLoggedIn: Boolean;
};
