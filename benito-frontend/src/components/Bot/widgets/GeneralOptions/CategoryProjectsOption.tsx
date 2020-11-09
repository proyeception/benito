import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ERROR, PENDING } from "../../../../hooks/withFetch";
import withTopProjectsByCategory from "../../../../hooks/withTopProjectsByCategpry";
import { RootState } from "../../../../reducers";
import { SessionState } from "../../../../store/session/types";
import { CategoryReference, ProjectReference } from "../../../../types";
import Spinner from "../../../Spinner/Spinner";

import Options from "../Options/Options";

interface GeneralOptionsProps extends RouteComponentProps {
  session?: SessionState;
  selectedCategory: string;
}

const CategoryProjectsOption = (props: GeneralOptionsProps | any) => {

  console.log(props.selectedCategory)

  const [projects, setProjects] = useState<Array<ProjectReference>>([]);

  function createOptionFromProject(project: ProjectReference){
    return {
      name: project.title,
      handler: props.actionProvider.handleCategory,
      id: project.projectId
    }
  }
  
  const res = withTopProjectsByCategory(props.selectedCategory, (result) => {
    setProjects(result.projects);
  })

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  if (res.type == PENDING || res.type == ERROR) {
    console.log(res);
    return <Spinner color={'#444444'}/>;
  }
  return  <Options options={projects.map(
    (p) => createOptionFromProject(p)
  )} color={color} {...props} />;
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(CategoryProjectsOption)));
