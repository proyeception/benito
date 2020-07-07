import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Redirect } from "react-router-dom";
import { RootState } from "./reducers";
import { connect } from "react-redux";

const App = (props: { isLoggedIn: Boolean }) =>
  props.isLoggedIn ? <div>Home</div> : <Redirect to="/login" />;

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.login.isLoggedIn,
});

export default hot(module)(connect(mapStateToProps)(App));
