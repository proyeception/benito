import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { ProjectEditionRole, Project, Role } from "../../../types";
import { RootState } from "../../../reducers";
import { connect } from "react-redux";
import AuthorEdit from "./Author";
import Loader from "../../Common/Loader";
import { RouteComponentProps } from "react-router-dom";
import { fetchProject } from "../../../functions/search";
import { setProjectEditionRole } from "../../../functions/project";
import { updateCurrentProject } from "../../../actions/project";
import store from "../../../store";

type MatchParams = {
  projectId: string;
};

interface Props extends RouteComponentProps<MatchParams> {
  editionRole?: ProjectEditionRole;
  project?: Project;
  userId?: String;
  role?: Role;
  isLoggedIn: Boolean;
}

const ProjectEditor = (props: Props) => {
  useEffect(() => {
    if (!props.project) {
      fetchProject(props.match.params.projectId)
        .then((res) => res.data)
        .then((p) => {
          setProjectEditionRole({
            project: p,
            userId: props.userId,
            role: props.role,
          });
          store.dispatch(updateCurrentProject(p));
        });
    } else {
      setProjectEditionRole({
        project: props.project,
        userId: props.userId,
        role: props.role,
      });
    }
  }, []);

  if (!props.project) {
    return (
      <div className="center">
        <Loader />
      </div>
    );
  }

  if (props.project && props.editionRole == "AUTHOR") {
    return <AuthorEdit project={props.project} />;
  } else if (props.project && props.editionRole == "SUPERVISOR") {
    return <div>Bien ahí máquina</div>;
  }

  return <div>Rajá de acá capo</div>;
};

const mapStateToProps = (rootState: RootState) => {
  return {
    editionRole: rootState.project.editionRole,
    userId: rootState.session.userId,
    role: rootState.session.role,
    project: rootState.project.project,
    isLoggedIn: rootState.session.isLoggedIn,
  };
};

export default hot(module)(connect(mapStateToProps)(ProjectEditor));
