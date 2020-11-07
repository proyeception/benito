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

const GeneralOptions = (props: GeneralOptionsProps | any) => {

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  const options = [
    {
      name: "Estoy buscando un proyecto",
      handler: props.actionProvider.handleCategoriesChoice,
      id: 1,
    },
    {
      name: "¿Qué es proyectate?",
      handler: props.actionProvider.handleProyectateQuestion,
      id: 2
    },
    {
      name: "¿Qué es proyectabot?",
      handler: props.actionProvider.handleProyectabotQuestion,
      id: 3
    },
    {
      name: "Quiero reportar un error",
      handler: props.actionProvider.handleBugNotification,
      id: 4
    },
    {
      name: "¿Cómo cargo un proyecto?",
      handler: props.actionProvider.handleProjectUploadQuestion,
      id: 5,
    } 
  ];
  return <Options options={options} color={color} {...props} />;
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(GeneralOptions)));