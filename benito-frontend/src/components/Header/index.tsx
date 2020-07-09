import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { NavLink } from "react-router-dom";

const Header = (_: any) => (
  <div className="qui-header">
    <NavLink to="/search">
      <div className="d-block d-lg-none qui-search">Lupita</div>
    </NavLink>
    <NavLink to="/">
      <div className="qui-brand-name">Proyectate</div>
    </NavLink>
    <NavLink to="/login">
      <div className="qui-session">Fotito del usuario</div>
    </NavLink>
  </div>
);

export default hot(module)(Header);
