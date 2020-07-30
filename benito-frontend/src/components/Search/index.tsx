import React, { Component } from "react";
import { hot } from "react-hot-loader";
import axios from "axios";
import { benitoHost } from "../../config";
import SearchBox from "./SearchBox";
import ProjectSummary from "./ProjectSummary";
import { Project } from "../../types";

class Search extends Component<{}, { projects: Array<Project>, name: string, category: string, fromDate: string, toDate: string, keyword: string, documentation: string }> {
  constructor(props: {}, ctx: any) {
    super(props, ctx);
    this.state = { projects: [], name: "", category: "", fromDate: "", toDate: "", keyword: "", documentation: "" };

    this.search = this.search.bind(this)
  }

  componentDidMount() {
    axios.get(`${benitoHost}/benito/projects`).then((res) => {
      const projects = res.data;
      this.setState({ projects });
    });
  }

  search() {
    axios.get(`${benitoHost}/benito/projects` + this.buildQueryParams()).then((res) => {
      const projects = res.data;
      this.setState({ projects });
    });
  }

  buildQueryParams() {
    let params = "?"
    params = params.concat(this.buildQueryParamProperty("name", this.state.name))
    params = params.concat(this.buildQueryParamProperty("tags", this.state.category))
    params = params.concat(this.buildQueryParamProperty("from", this.state.fromDate))
    params = params.concat(this.buildQueryParamProperty("to", this.state.toDate))
    //TODO
    //params = params.concat(this.buildQueryParamProperty("keyword", this.state.keyword))
    //params = params.concat(this.buildQueryParamProperty("documentation", this.state.documentation))
    return params.slice(0, -1);
  }

  buildQueryParamProperty(key: string, value: string) {
    return value ? key + "=" + value + "&" : ""
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 qui-searchbox-md d-none d-lg-block qui-box">
            <SearchBox 
            searchCallback={() => this.search()} 
            nameCallback={(name) => this.setName(name)} 
            categoryCallback={(category) => this.setCategory(category)} 
            fromDateCallback={(fromDate) => this.setFromDate(fromDate)} 
            toDateCallback={(toDate) => this.setToDate(toDate)}
            keywordCallback={(keyword) => this.setKeyword(keyword)}
            documentationCallback={(documentation) => this.setDocumentation(documentation)} />
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

  setName(name: string): void {
    this.setState({ name: name })
  }
  setCategory(category: string): void {
    this.setState({ category: category })
  }

  setFromDate(fromDate: string): void {
    this.setState({ fromDate: fromDate })
  }

  setToDate(toDate: string): void {
    this.setState({ toDate: toDate })
  }

  setKeyword(keyword: string): void {
    this.setState({ keyword: keyword })
  }

  setDocumentation(documentation: string): void {
    this.setState({ documentation: documentation })
  }
}

export default hot(module)(Search);
