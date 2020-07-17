import React, { Component } from "react";
import { hot } from "react-hot-loader";
import axios from "axios";
import { benitoHost } from "../../config";
import SearchBox from "./SearchBox";
import ProjectSummary, { Project } from "./ProjectSummary";

class Search extends Component<{}, { projects: Array<Project> }> {
  constructor(props: {}, ctx: any) {
    super(props, ctx);
    this.state = { projects: [] };
  }

  componentDidMount() {
    axios.get(`${benitoHost}/benito/projects`).then((res) => {
      const projects = res.data;
      this.setState({ projects });
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 qui-searchbox-md d-none d-lg-block qui-box">
            <SearchBox />
          </div>
          <div className="col-md-10 qui-box">
            <div className="qui-search-header p-2 pl-4 qui-font-title">
              Proyectos
            </div>
            <div className=""></div>
            {this.state.projects.map((p, index) => (
              <ProjectSummary project={p} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(Search);
