import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RootState } from "../../../../reducers";
import { SessionState } from "../../../../store/session/types";

import Options from "../Options/Options";

interface QuestionOptionsProps extends RouteComponentProps {
  session?: SessionState;
}

const QuestionOptions = (props: QuestionOptionsProps | any) => {

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  const options = [
    {
      name: "¿Qué es proyectate?",
      handler: props.actionProvider.handleProyectateQuestion,
    },
    {
      name: "¿Qué es proyectabot?",
      handler: props.actionProvider.handleProyectabotQuestion,
    },
    {
      name: "¿Cómo cargo un proyecto?",
      handler: props.actionProvider.handleProjectUploadQuestion,
    } 
  ];
  return <Options options={options} color={color} {...props} />;
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(QuestionOptions)));