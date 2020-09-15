import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../../reducers";
import "./styles.scss";

type Props = {
  render: () => React.ReactNode;
  isLoggedIn: Boolean;
};

const LoginRequired = (props: Props) => {
  if (!props.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return <div>{props.render()}</div>;
};

const mapStateToProps = (rootState: RootState) => {
  return {
    isLoggedIn: rootState.session.isLoggedIn,
  };
};

export default hot(module)(connect(mapStateToProps)(LoginRequired));
