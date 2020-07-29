import React, { Component } from "react";
import { hot } from "react-hot-loader";
import axios from "axios";
import { benitoHost } from "../../config";
import ProjectSummary, { Project } from "../Search/ProjectSummary";

let proy : Project = {id: "2", title:"un proyecto", description:"la descripcion del proyecto", posterUrl:"www.url.com", authors:[]}

class ViewProject extends Component<{}, { project: Project } > {

    constructor(props: {}, ctx: any) {
      super(props, ctx);
      this.state = { project: {} as Project };
    }
  
    componentDidMount() {
      axios.get(`${benitoHost}/benito/projects/${this.state.project.id}`).then((res) => {
        const project = res.data;
        this.setState({ project });
      });
    }
  
    render() {
      return (
        <div className="container-fluid sm-login-header"></div>
      )
    }
}