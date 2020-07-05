import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Header from "./Header";

const Login = (_: any) => (
  <div className="container-fluid sm-login">
    <Header />
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Nombre de usuario"
        aria-label="Nombre de usuario"
        aria-describedby="basic-addon1"
      />
    </div>
    <div className="input-group mb-3">
      <input
        type="password"
        className="form-control"
        placeholder="Contraseña"
        aria-label="Contraseña"
        aria-describedby="basic-addon1"
      />
    </div>
    <div className="pt-3">
      <button type="button" className="btn btn-primary btn-block">
        Iniciar sesión
      </button>
    </div>
  </div>
);

export default hot(module)(Login);
