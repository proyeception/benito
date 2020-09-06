import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { RouteComponentProps } from "react-router-dom";
import { Project } from "../../../types";
import { fetchProject } from "../../../functions/search";
import Loader from "../../Common/Loader";
import { RootState } from "../../../reducers";
import { connect } from "react-redux";

type MatchParams = {
  projectId: string;
};

interface Props extends RouteComponentProps<MatchParams> {
  project?: Project;
}

const AuthorEdit = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project>(null);

  if (props.project) {
    setProject(props.project);
  } else {
    setLoading(true);

    fetchProject(props.match.params.projectId)
      .then((res) => res.data)
      .then(setProject)
      .then(() => setLoading(false));
  }

  if (loading) {
    return <Loader />;
  }

  return <div>{project.title}</div>;
};

const mapStateToProps = (rootState: RootState) => {
  return rootState.project.project;
};

export default hot(module)(connect(mapStateToProps)(AuthorEdit));
