import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import axios from "axios";
import { benitoHost } from "../../config";
import SearchBox from "./SearchBox";
import ProjectSummary, { Project } from "./ProjectSummary";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
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

function search(props: Props) {
  axios
    .get(`${benitoHost}/benito/projects${buildQueryParams(props)}`)
    .then((res) => {
      const projects = res.data;
      store.dispatch(updateProjects(projects));
    })
    .catch(console.error);
}

function buildQueryParams({
  name,
  category,
  fromDate,
  toDate,
  sortMethod,
}: Props) {
  let params = "?";

  params = params.concat(buildQueryParamProperty("name", name.valueOf()));
  params = params.concat(buildQueryParamProperty("tags", category.valueOf()));
  params = params.concat(buildQueryParamProperty("from", fromDate.valueOf()));
  params = params.concat(buildQueryParamProperty("to", toDate.valueOf()));
  params = params.concat(buildQueryParamProperty("orderBy", sortMethod));
  //TODO
  //params = params.concat(this.buildQueryParamProperty("keyword", this.state.keyword))
  //params = params.concat(this.buildQueryParamProperty("documentation", this.state.documentation))
  return params.slice(0, -1);
}

function buildQueryParamProperty(key: string, value: string) {
  return value ? key + "=" + value + "&" : "";
}

const Search = (props: Props) => {
  useEffect(() => {
    search(props);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 qui-searchbox-md d-none d-lg-block qui-box">
          <SearchBox searchCallback={() => search(props)} />
        </div>
        <div className="col-md-10 qui-box">
          <div className="qui-search-header p-2 pl-4 qui-font-title">
            Proyectos
          </div>
          <div className=""></div>
          {props.projects.map((p, index) => (
            <ProjectSummary project={p} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (root: RootState) => {
  return root.search;
};

export default hot(module)(connect(mapStateToProps)(Search));
