import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Header from "./Header";
import LoginButton from "./LoginButton";
import store from "../../store";
import { updateLoginUsername, updateLoginPassword } from "../../actions/login";
import { Redirect } from "react-router-dom";
import { RootState } from "../../reducers";
import { connect } from "react-redux";

const redirectHome = () => <Redirect to="/" />;

const Login = (props: { isLoggedIn: Boolean }) =>
  props.isLoggedIn ? (
    redirectHome()
  ) : (
    <div className="container-fluid sm-login">
      <Header />
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de usuario"
          aria-label="Nombre de usuario"
          aria-describedby="basic-addon1"
          onChange={(it) =>
            store.dispatch(updateLoginUsername(it.currentTarget.value))
          }
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Contraseña"
          aria-label="Contraseña"
          aria-describedby="basic-addon1"
          onChange={(it) =>
            store.dispatch(updateLoginPassword(it.currentTarget.value))
          }
        />
      </div>
      <LoginButton />
    </div>
  );

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.login.isLoggedIn,
});

export default hot(module)(connect(mapStateToProps)(Login));
