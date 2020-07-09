import {
  LoginAction,
  UPDATE_LOGIN_USERNAME,
  UPDATE_LOGIN_PASSWORD,
  LoginState,
  LOAD_LOGIN,
  FINISH_LOAD_LOGIN,
  SET_LOGIN_TRUE,
  DISPEL_USERNAME_ERROR,
  SET_USERNAME_INVALID,
  DISPEL_PASSWORD_ERROR,
  SET_PASSWORD_INVALID,
} from "../../store/login/types";

const defaultLoginState = {
  username: "",
  password: "",
  displayLoader: false,
  isLoggedIn: false,
  usernameError: false,
  passwordError: false,
};

function loginReducer(
  state = defaultLoginState,
  action: LoginAction
): LoginState {
  switch (action.type) {
    case UPDATE_LOGIN_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case UPDATE_LOGIN_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case LOAD_LOGIN:
      return {
        ...state,
        displayLoader: true,
      };
    case FINISH_LOAD_LOGIN:
      return {
        ...state,
        displayLoader: false,
      };
    case SET_LOGIN_TRUE:
      return {
        ...state,
        isLoggedIn: true,
      };
    case DISPEL_USERNAME_ERROR:
      return {
        ...state,
        usernameError: false,
      };
    case SET_USERNAME_INVALID:
      return {
        ...state,
        usernameError: true,
      };
    case DISPEL_PASSWORD_ERROR:
      return {
        ...state,
        passwordError: false,
      };
    case SET_PASSWORD_INVALID:
      return {
        ...state,
        passwordError: true,
      };
    default:
      return state;
  }
}

export default loginReducer;
