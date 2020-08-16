import React, { Component } from "react";
import { hot } from "react-hot-loader";
import axios from "axios";
import { benitoHost } from "../../config";
import ProjectInfo from "./ProjectInfo";
import "./styles.scss";
import { RouteComponentProps } from "react-router";
import { Project } from "../Search/ProjectSummary";

//let proy : Project = {id: "2", title:"un proyecto", description:"la descripcion del proyecto", posterUrl:"www.url.com", authors:[]}

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
    this.state = { projectId: props.match.params.projectId };
  }

  componentDidMount() {
    console.log("el estado es");
    console.log(this.state);

    axios
      .get(`${benitoHost}/benito/projects/${this.state.projectId}`)
      .then((res) => {
        const project = res.data;

        this.setState({ project });
      })
      .catch(console.error);
  }

  render() {
    if (this.state.project === undefined) {
      return <div> cargando </div>;
    } else {
      return (
        <div>
          <div className="d-block d-md-none">
            <ProjectInfo project={this.state.project} />
          </div>
          <div className="d-none d-md-block container-fluid">
            <ProjectInfo project={this.state.project} />
          </div>
        </div>
      );
    }
  }
}

export default hot(module)(ViewProject);
