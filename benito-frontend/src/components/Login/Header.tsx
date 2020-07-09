import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const logoUrl = "https://i.imgur.com/wUA9tbs.jpg";

// TODO: refactorizar esto para afuera del login; que no sea solo para mobile
const Header = (_: any) => (
  <div>
    <div className="sm-login-header mb-3">
      <img src={logoUrl} className="sm-login-logo" />
    </div>
  </div>
);

export default hot(module)(Header);
