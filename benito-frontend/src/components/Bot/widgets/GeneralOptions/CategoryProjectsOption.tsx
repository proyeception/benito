import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ERROR, PENDING } from "../../../../hooks/withFetch";
import withTopProjectsByCategory from "../../../../hooks/withTopProjectsByCategory";
import { RootState } from "../../../../reducers";
import { SessionState } from "../../../../store/session/types";
import { CategoryReference, ProjectReference } from "../../../../types";
import Spinner from "../../../Spinner/Spinner";

import Options from "../Options/Options";
import ChatBotError from "./ChatBotError";

interface GeneralOptionsProps extends RouteComponentProps {
  session?: SessionState;
  selectedCategory: string;
}

const CategoryProjectsOption = (props: GeneralOptionsProps | any) => {

  const [projects, setProjects] = useState<Array<ProjectReference>>([]);
  const [mappedProjects, setMappedProjects] = useState<Array<any>>([]);

  function createOptionFromProject(project: ProjectReference){
    return {
      name: project.name,
      handler: props.actionProvider.handleProjectSelected,
      id: project.id
    }
  }

  let viewMoreProjects = {
    name: "Ver más proyectos",
    handler: props.actionProvider.handleViewMoreProjectsOfCategory,
    id: "1"
  }
  
  const res = withTopProjectsByCategory(props.selectedCategory, (result) => {
    setProjects(result.projects);
    setMappedProjects(result.projects.map(
      (p) => createOptionFromProject(p)))
  })

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  if (res.type == PENDING) {
    return <Spinner color={color}/>;
  }

  if ( res.type == ERROR) {
    //props.actionProvider.error()
    return <div></div>;
  }
  
  if(mappedProjects.length > 0){
    return (
      <Options options={...mappedProjects.concat(viewMoreProjects)} cropped={true} color={color} {...props} />
    );
  } else {
    return <Spinner color={color}/>;
  }
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(CategoryProjectsOption)));
