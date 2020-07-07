import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import store from "../../store";
import { loadLogin, finishLogin } from "../../actions/login";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type ProjectRef = {
  name: String;
  url: String;
};

type Social = {
  name: String;
  url: String;
};

type User = {
  session: String;
  name: String;
  lastName: String;
  profilePicUrl: String;
  email: String;
  organization: String;
  projectRefs: Array<ProjectRef>;
  socials: Array<Social>;
};

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

  setTimeout(() => {
    axios(config)
      .then((response: AxiosResponse<User>) => response.data)
      .then((user) => console.log(user))
      .catch((e) => console.log(e.message))
      .finally(() => store.dispatch(finishLogin()));
  }, 5000);
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
