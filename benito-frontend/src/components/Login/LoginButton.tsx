import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const LoginButton = (_: any) => (
  <div className="pt-3">
    <button type="button" className="btn btn-primary btn-block">
      Iniciar sesión
    </button>
  </div>
);

export default hot(module)(LoginButton);
