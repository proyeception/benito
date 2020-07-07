import { UserAction, UserState, SET_USER } from "../../store/user/types";

const defaultUserState: UserState = {
  session: null,
  data: null,
  username: null,
};

function userReducer(state = defaultUserState, action: UserAction): UserState {
  switch (action.type) {
    case SET_USER:
      return {
        session: action.sessionToken,
        data: action.payload,
        username: action.username,
      };
    default:
      return state;
  }
}

export default userReducer;
