import React, { Component } from "react";
import { hot } from "react-hot-loader";
import axios from "axios";
import { benitoHost } from "../../config";
import ProjectInfo, { ProjectData } from "./ProjectInfo";
import Header from "../Header/index"
import "./styles.scss";

//let proy : Project = {id: "2", title:"un proyecto", description:"la descripcion del proyecto", posterUrl:"www.url.com", authors:[]}

class ViewProject extends Component<{}, { projectId: String, project: ProjectData } > {

    constructor(props: {}, ctx: any) {
      super(props, ctx);
      this.state = { projectId: "5f1a0a7e3552040017fd532d", project: {id:"", title:"", description:"",
        posterUrl:"", authors:[], creationDate:null, tags:[] } };
    }

    componentDidMount() {
      axios.get(`${benitoHost}/benito/projects/${this.state.project.id}`).then((res) => {
        const project = res.data;
        this.setState({ project });
      });
    }
  
    render() {
      return (
        <div>
          <Header/>
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

export default hot(module)(ViewProject);