import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { ERROR, PENDING } from "../../../../hooks/withFetch";
import withTopProjectsByCategory from "../../../../hooks/withTopProjectsByCategpry";
import { RootState } from "../../../../reducers";
import { SessionState } from "../../../../store/session/types";
import { CategoryReference, ProjectReference } from "../../../../types";

interface GeneralOptionsProps extends RouteComponentProps {
  session?: SessionState;
  selectedProject: string;
}

const RedirectToProject = (props: GeneralOptionsProps | any) => {

  console.log(props.selectedCategory)

  return <Redirect to={{ pathname: `/projects/${props.selectedProject}` }} />;
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(RedirectToProject)));
