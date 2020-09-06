import React, { Component } from "react";
import { hot } from "react-hot-loader";
import axios, { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import ProjectInfo from "./ProjectInfo";
import "./styles.scss";
import { RouteComponentProps } from "react-router";
import { Project, Role } from "../../types";
import FadeIn from "../Common/FadeIn";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import store from "../../store";
import { setProjectAuthor, setProjectVisitor } from "../../actions/project";

type MatchParams = {
  projectId: string;
};

interface Props extends RouteComponentProps<MatchParams> {
  userId?: String;
  role?: Role;
}

type State = {
  projectId: String;
  project?: Project;
};

class ViewProject extends Component<Props, State> {
  constructor(props: Props, ctx: any) {
    super(props, ctx);
    this.state = {
      projectId: props.match.params.projectId,
    };
  }

  componentDidMount() {
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/projects/${this.state.projectId}`,
    };

    axios
      .request<Project>(config)
      .then((res) => res.data)
      .then((project) => {
        this.setState({ project: project });
        if (
          this.props.userId &&
          this.props.role == "AUTHOR" &&
          project.authors.some((a) => a.id == this.props.userId)
        ) {
          store.dispatch(setProjectAuthor());
        } else {
          store.dispatch(setProjectVisitor());
        }
      })
      .catch(console.error);
  }

  render() {
    return (
      <FadeIn>
        <div className="d-block d-md-none">
          <ProjectInfo project={this.state.project} />
        </div>
        <div className="d-none d-md-block container-fluid">
          <ProjectInfo project={this.state.project} />
        </div>
      </FadeIn>
    );
  }
}

const mapStateToProps = (rootState: RootState) => {
  return {
    userId: rootState.session?.userId,
    role: rootState.session?.role,
  };
};

export default hot(module)(connect(mapStateToProps)(ViewProject));
