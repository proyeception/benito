import React, { Component } from "react";
import { hot } from "react-hot-loader";
import axios from "axios";
import { benitoHost } from "../../config";
import ProjectInfo, { ProjectData } from "./ProjectInfo";
import "./styles.scss";

//let proy : Project = {id: "2", title:"un proyecto", description:"la descripcion del proyecto", posterUrl:"www.url.com", authors:[]}

class ViewProject extends Component<{}, { projectId: String, project?: ProjectData }> {

  constructor(props: any, ctx: any) {
    super(props, ctx);
    this.state = { projectId: props.match.params.projectId }
  };

  componentDidMount() {
    console.log('el estado es')
    console.log(this.state)

    axios.get(`${benitoHost}/benito/projects/${this.state.projectId}`).then((res) => {
      const project = res.data;

      this.setState({ project });
    }).catch(console.error);
  }

  render() {
    if (this.state.project === undefined) {
      return <div> cargando </div>
    } else {
      return (
        <div>
          <div className="container-fluid qui-container">
            <div>
              <ProjectInfo project={this.state.project} />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default hot(module)(ViewProject);