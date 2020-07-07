import {
  LoginAction,
  UPDATE_LOGIN_USERNAME,
  UPDATE_LOGIN_PASSWORD,
  LoginState,
  LOAD_LOGIN,
  FINISH_LOAD_LOGIN,
  SET_LOGIN_TRUE,
} from "../../store/login/types";

const defaultLoginState = {
  username: "",
  password: "",
  displayLoader: false,
  isLoggedIn: false,
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
        isLoggedIn: state.isLoggedIn,
      };
    case UPDATE_LOGIN_PASSWORD:
      return {
        username: state.username,
        password: action.payload,
        displayLoader: state.displayLoader,
        isLoggedIn: state.isLoggedIn,
      };
    case LOAD_LOGIN:
      return {
        username: state.password,
        password: state.password,
        displayLoader: true,
        isLoggedIn: state.isLoggedIn,
      };
    case FINISH_LOAD_LOGIN:
      return {
        username: state.password,
        password: state.password,
        displayLoader: false,
        isLoggedIn: state.isLoggedIn,
      };
    case SET_LOGIN_TRUE:
      return {
        username: state.password,
        password: state.password,
        displayLoader: state.displayLoader,
        isLoggedIn: true,
      };
    default:
      return state;
  }
}

export default loginReducer;
