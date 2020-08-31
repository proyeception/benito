export const UPDATE_IS_LOGGED_IN = "UPDATE_IS_LOGGED_IN";
export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_USER_ID = "UPDATE_USER_ID";
export const UPDATE_PROFILE_PICTURE = "UPDATE_PROFILE_PICTURE";

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

export type SessionAction =
  | UpdateIsLoggedInAction
  | UpdateTokenAction
  | UpdateUserIdAction
  | UpdateProfilePictureAction;

export type SessionState = {
  token?: String;
  userId?: String;
  profilePicture?: String;
  isLoggedIn: Boolean;
};
