import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RootState } from "../../../../reducers";
import { SessionState } from "../../../../store/session/types";


interface InitialOptionsProps extends RouteComponentProps {
  session?: SessionState;
}

const InitialOptions = (props: InitialOptionsProps | any) => {
  const [showMessage, setShowMessage] = useState(true);

  let color: string = "#c41234"
  
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  if(showMessage && props.session.chatBotOpen){
    setShowMessage(false)
    props.actionProvider.initial()
  }

  return <div></div>;
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(InitialOptions)));