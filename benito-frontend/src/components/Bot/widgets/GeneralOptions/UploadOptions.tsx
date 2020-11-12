import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RootState } from "../../../../reducers";
import { SessionState } from "../../../../store/session/types";

import Options from "../Options/Options";

interface GeneralOptionsProps extends RouteComponentProps {
  session?: SessionState;
}

const UploadOptions = (props: GeneralOptionsProps | any) => {

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }
  const options = [
    {
      name: "Autor",
      handler: props.actionProvider.handleAuthorUploadQuestion,
      id: 1
    },
    {
      name: "Supervisor",
      handler: props.actionProvider.handleSupervisorUploadQuestion,
      id: 2
    }, 
  ];
  return <Options options={options} color={color} {...props} />;
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(UploadOptions)));
