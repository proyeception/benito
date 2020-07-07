export const SET_USER = "SET_USER";

type ProjectRef = {
  name: String;
  url: String;
};

type Social = {
  name: String;
  url: String;
};

export type UserSession = {
  name: String;
  lastName: String;
  profilePicUrl: String;
  email: String;
  organization: String;
  projectRefs: Array<ProjectRef>;
  socials: Array<Social>;
};

interface SetUserAction {
  type: typeof SET_USER;
  sessionToken: String;
  payload: UserSession;
}

export type UserAction = SetUserAction;

export type UserState = {
  session: String;
  data: UserSession;
};
