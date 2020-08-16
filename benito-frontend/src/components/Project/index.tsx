import React, { Component } from "react";
import { hot } from "react-hot-loader";
import axios, { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import ProjectInfo from "./ProjectInfo";
import "./styles.scss";
import { RouteComponentProps } from "react-router";
import { Project } from "../../types";
import { motion } from "framer-motion";

type MatchParams = {
  projectId: string;
};

interface Props extends RouteComponentProps<MatchParams> {}

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
    console.log("el estado es");
    console.log(this.state);

    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/projects/${this.state.projectId}`,
    };

    axios
      .request<Project>(config)
      .then((res) => res.data)
      .then((project) => this.setState({ project: project }))
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="d-block d-md-none">
          <ProjectInfo project={this.state.project} />
        </div>
        <div className="d-none d-md-block container-fluid">
          <ProjectInfo project={this.state.project} />
        </div>
      </motion.div>
    );
  }
}

export default hot(module)(ViewProject);
