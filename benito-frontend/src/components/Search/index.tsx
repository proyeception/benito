import React, { Component } from "react";
import { hot } from "react-hot-loader";
import SearchBox from "./SearchBox";
import ProjectSummary from "./ProjectSummary";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { Project } from "../../types";
import store from "../../store";
import { SortMethod } from "../../store/search/types";
import { updateProjects } from "../../actions/search";
import { fetchProjects } from "../../functions/search";

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
    if (this.state.projects.length == 0) {
      this.search();
    }
  }

  search() {
    fetchProjects(store.getState().search)
      .then((res) => {
        const projects = res.data;
        store.dispatch(updateProjects(projects));
      })
      .catch(console.error);
  }

  render() {
    console.log(this.props);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 qui-searchbox-md d-none d-lg-block">
            <SearchBox searchCallback={() => this.search()} />
          </div>
          <div className="col-md-10 qui-box mt-5">
            <div className="container-fluid">
              <div className="qui-search-header p-2 pl-4 qui-font-title">
                Proyectos
              </div>
              <div className=""></div>
              {this.props.projects.map((p, idx) => (
                <ProjectSummary project={p} key={idx} />
              ))}
            </div>
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
