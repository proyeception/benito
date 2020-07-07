import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import store from "../../store";
import { loadLogin, finishLogin } from "../../actions/login";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { UserSession } from "../../store/user/types";

function login() {
  store.dispatch(loadLogin());

  let data = {
    username: store.getState().login.username,
    password: store.getState().login.password,
    usertype: "student",
  };

  let config: AxiosRequestConfig = {
    method: "POST",
    url: "http://localhost:9290/benito/login",
    data: data,
  };

  axios(config)
    .then((response: AxiosResponse<UserSession>) => response.data)
    .then((user) => console.log(user))
    .catch((e) => console.log(e.message))
    .finally(() => store.dispatch(finishLogin()));
}

const LoginButton = (props: { displayLogin: Boolean }) => (
  <div>
    <button
      className="btn btn-primary btn-block"
      type="button"
      disabled={props.displayLogin.valueOf()}
      onClick={() => login()}
    >
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
        hidden={!props.displayLogin.valueOf()}
      />
      <span hidden={props.displayLogin.valueOf()}>Iniciar sesión</span>
    </button>
  </div>
);

const mapStateToProps = (state: RootState) => {
  return {
    displayLogin: state.login.displayLoader,
  };
};

export default hot(module)(connect(mapStateToProps)(LoginButton));
