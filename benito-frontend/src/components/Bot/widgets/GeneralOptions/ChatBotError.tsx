import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RootState } from "../../../../reducers";
import { SessionState } from "../../../../store/session/types";


interface ChatBotErrorProps extends RouteComponentProps {
  session?: SessionState;
}

const ChatBotError = (props: ChatBotErrorProps | any) => {

  let color: string = "#c41234"
  
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  props.actionProvider.error()
  

  return <div></div>;
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(ChatBotError)));