import React, { Component } from "react";
import { hot } from "react-hot-loader";
import axios from "axios";
import { benitoHost } from "../../config";
import SearchBox from "./SearchBox";
import ProjectSummary from "./ProjectSummary";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { Project } from "../../types";
import store from "../../store";
import { SortMethod } from "../../store/search/types";
import { updateProjects } from "../../actions/search";

type Props = {
  name: String;
  category: String;
  fromDate: String;
  toDate: String;
  keyword: String;
  documentation: String;
  projects: Array<Project>;
  sortMethod: SortMethod;
};

type State = {
  name: String;
  category: String;
  fromDate: String;
  toDate: String;
  keyword: String;
  documentation: String;
  projects: Array<Project>;
  sortMethod: SortMethod;
};

class Search extends Component<Props, State> {
  constructor(props: Props, ctx: any) {
    super(props, ctx);
    this.state = {
      projects: props.projects,
      name: props.name.valueOf(),
      category: props.category.valueOf(),
      fromDate: props.fromDate.valueOf(),
      toDate: props.toDate.valueOf(),
      keyword: props.keyword.valueOf(),
      documentation: props.documentation.valueOf(),
      sortMethod: props.sortMethod,
    };

    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  search() {
    axios
      .get(`${benitoHost}/benito/projects${this.buildQueryParams()}`)
      .then((res) => {
        const projects = res.data;
        store.dispatch(updateProjects(projects));
      })
      .catch((error) => console.error(error));
  }

  buildQueryParams() {
    let params = "?";

    params = params.concat(
      this.buildQueryParamProperty(
        "name",
        store.getState().search.name.valueOf()
      )
    );
    params = params.concat(
      this.buildQueryParamProperty(
        "category",
        store.getState().search.category.valueOf()
      )
    );
    params = params.concat(
      this.buildQueryParamProperty(
        "from",
        store.getState().search.fromDate.valueOf()
      )
    );
    params = params.concat(
      this.buildQueryParamProperty(
        "to",
        store.getState().search.toDate.valueOf()
      )
    );
    params = params.concat(
      this.buildQueryParamProperty(
        "orderBy",
        store.getState().search.sortMethod
      )
    );
    //TODO
    //params = params.concat(this.buildQueryParamProperty("keyword", this.state.keyword))
    //params = params.concat(this.buildQueryParamProperty("documentation", this.state.documentation))
    return params.slice(0, -1);
  }

  buildQueryParamProperty(key: string, value: string) {
    return value ? key + "=" + value + "&" : "";
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 qui-searchbox-md d-none d-lg-block qui-box">
            <SearchBox searchCallback={() => this.search()} />
          </div>
          <div className="col-md-10 qui-box">
            <div className="qui-search-header p-2 pl-4 qui-font-title">
              Proyectos
            </div>
            <div className=""></div>
            {store.getState().search.projects.map((p, index) => (
              <ProjectSummary project={p} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (root: RootState) => {
  return {
    name: root.search.name,
    projects: root.search.projects,
    category: root.search.category,
    fromDate: root.search.fromDate,
    toDate: root.search.toDate,
    keyword: root.search.keyword,
    documentation: root.search.documentation,
    sortMethod: root.search.sortMethod,
  };
};

export default hot(module)(connect(mapStateToProps)(Search));
