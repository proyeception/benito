import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import { RootState } from "../../reducers";
import { connect } from "react-redux";

const Header = (props: { isLoggedIn: Boolean }) => (
  <div className="qui-header">
    <NavLink to="/search">
      <div className="d-block d-lg-none qui-search">Lupita</div>
    </NavLink>
    <NavLink to="/"></NavLink>
    <div className="qui-brand-name">Proyectate</div>
    <NavLink to="/login">
      <div className={props.isLoggedIn ? "qui-user-image-crop" : ""}>
        {props.isLoggedIn ? (
          <img src="https://avatars3.githubusercontent.com/u/66536459?s=200&v=4" />
        ) : (
          <div className="qui-login">Iniciar sesión</div>
        )}
      </div>
    </NavLink>
  </div>
);

const mapStateToProps = (state: RootState) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
  };
};

export default hot(module)(connect(mapStateToProps)(Header));
