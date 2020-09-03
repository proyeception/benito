import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Login from ".";

type Props = {};

const SupervisorLogin = (_: Props) => (
  <div className="qui-supervisor-login">
    <Login loginPath="supervisor" />
  </div>
);

export default hot(module)(SupervisorLogin);
