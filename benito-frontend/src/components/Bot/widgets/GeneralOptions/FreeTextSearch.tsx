import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ERROR, PENDING } from "../../../../hooks/withFetch";
import withTopCategories from "../../../../hooks/withTopCategories";
import { RootState } from "../../../../reducers";
import { SessionState } from "../../../../store/session/types";
import { CategoryReference, ProjectReference, RecommendedProjects } from "../../../../types";
import Spinner from "../../../Spinner/Spinner";

import Options from "../Options/Options";
import ChatBotError from "./ChatBotError";
import withRecommendedProjectsByText from "../../../../hooks/withRecommendedProjectsByText";

interface GeneralOptionsProps extends RouteComponentProps {
  session?: SessionState;
}

const FreeTextSearch = (props: GeneralOptionsProps | any) => {

    const [projects, setProjects] = useState<Array<ProjectReference>>([]);
    const [mappedProjects, setMappedProjects] = useState<Array<any>>([]);

  function createOptionFromRecommendedProjectsByText(project: ProjectReference){
    return {
      name: project.name,
      handler: props.actionProvider.handleProjectSelected,
      id: project.id
    }
  }  

  let textSearch: string = props.textSearch
  console.log('text search: ', textSearch)

  const res = withRecommendedProjectsByText(textSearch, (result) => {
    setProjects(result.projects);
    setMappedProjects(result.projects.map(
      (p) => createOptionFromRecommendedProjectsByText(p)))
  })

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  if (res.type == PENDING) {
    return <Spinner color={color}/>;
  }

  if ( res.type == ERROR) {
    return <ChatBotError/>;
  }
  
  return  <Options options={mappedProjects} color={color} {...props}/>;
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(FreeTextSearch)));