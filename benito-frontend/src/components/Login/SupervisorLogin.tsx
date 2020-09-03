import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Login from ".";
import { RootState } from "../../reducers";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

type Props = {
  isLoggedIn: Boolean;
};

const SupervisorLogin = (props: Props) => {
  if (props.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="qui-supervisor-login qui-min-height center">
      <Login loginPath="supervisor" />
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => rootState.session;

export default hot(module)(connect(mapStateToProps)(SupervisorLogin));
