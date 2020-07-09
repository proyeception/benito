import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Header from "./Header";
import LoginButton from "./LoginButton";
import { updateLoginUsername, updateLoginPassword } from "../../actions/login";
import { Redirect } from "react-router-dom";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import Input from "./Input";

const redirectHome = () => <Redirect to="/" />;

const Login = (props: {
  isLoggedIn: Boolean;
  usernameError: Boolean;
  passwordError: Boolean;
}) =>
  props.isLoggedIn ? (
    redirectHome()
  ) : (
    <div className="container-fluid sm-login">
      <Header />
      <form
        className={`needs-validation ${
          props.usernameError || props.passwordError ? "was-validated" : ""
        }`}
        noValidate
      >
        <Input
          inputType="text"
          placeHolder="Nombre de usuario"
          onChange={(it) => updateLoginUsername(it.currentTarget.value)}
          onErrorFeedback="Ingrese un nombre de usuario válido"
        />
        <Input
          inputType="password"
          placeHolder="Contraseña"
          onChange={(it) => updateLoginPassword(it.currentTarget.value)}
          onErrorFeedback="Ingrese una contraseña válida"
        />
        <LoginButton />
      </form>
    </div>
  );

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.login.isLoggedIn,
  usernameError: state.login.usernameError,
  passwordError: state.login.passwordError,
});

export default hot(module)(connect(mapStateToProps)(Login));
