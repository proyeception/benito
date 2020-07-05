import {
  LoginAction,
  UPDATE_LOGIN_USERNAME,
  UPDATE_LOGIN_PASSWORD,
  LoginState,
} from "../../store/login/types";

const defaultLoginState = {
  username: "",
  password: "",
};

function loginReducer(
  state = defaultLoginState,
  action: LoginAction
): LoginState {
  switch (action.type) {
    case UPDATE_LOGIN_USERNAME:
      return {
        username: action.payload,
        password: state.password,
      };
    case UPDATE_LOGIN_PASSWORD:
      return {
        username: state.username,
        password: action.payload,
      };
    default:
      return state;
  }
}

export default loginReducer;
