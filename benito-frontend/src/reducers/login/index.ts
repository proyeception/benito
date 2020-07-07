import {
  LoginAction,
  UPDATE_LOGIN_USERNAME,
  UPDATE_LOGIN_PASSWORD,
  LoginState,
  LOAD_LOGIN,
  FINISH_LOAD_LOGIN,
} from "../../store/login/types";

const defaultLoginState = {
  username: "",
  password: "",
  displayLoader: false,
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
        displayLoader: state.displayLoader,
      };
    case UPDATE_LOGIN_PASSWORD:
      return {
        username: state.username,
        password: action.payload,
        displayLoader: state.displayLoader,
      };
    case LOAD_LOGIN:
      return {
        username: state.password,
        password: state.password,
        displayLoader: true,
      };
    case FINISH_LOAD_LOGIN:
      return {
        username: state.password,
        password: state.password,
        displayLoader: false,
      };
    default:
      return state;
  }
}

export default loginReducer;
