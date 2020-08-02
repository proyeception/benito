import React, { Component } from "react";
import { hot } from "react-hot-loader";
import axios from "axios";
import { benitoHost } from "../../config";
import ProjectInfo, { ProjectData } from "./ProjectInfo";
import "./styles.scss";

//let proy : Project = {id: "2", title:"un proyecto", description:"la descripcion del proyecto", posterUrl:"www.url.com", authors:[]}

class ViewProject extends Component<{projectId: String}, { project?: ProjectData } > {

    constructor(props: {projectId: String}, ctx: any) {
      super(props, ctx);
      this.state = {};
    }

    componentDidMount() {
      axios.get(`${benitoHost}/benito/projects/${this.props.projectId}`).then((res) => {
        const project = res.data;
        this.setState({ project });
      }).catch(console.error);
    }
  
    render() {
      if(this.state.project === undefined){
        return <div> cargando </div>
      } else {
      return (
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="qui-proyect-title">
                  hoal
                  <ProjectInfo project={this.state.project}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default hot(module)(ViewProject);