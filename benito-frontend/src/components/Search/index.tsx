import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import SearchBox from "./SearchBox";
import ProjectSummary from "./ProjectSummary";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { Project } from "../../types";
import store from "../../store";
import {
  updateProjects,
  updateCategory,
  updateName,
  updateDocumentation,
  updateFromDate,
  updateToDate,
  updateKeyword,
  emptyProjects,
} from "../../actions/search";
import { fetchProjects, buildQueryParams } from "../../functions/search";
import qs from "qs";
import { RouteChildrenProps } from "react-router-dom";
import { history } from "../../entry";
import { motion } from "framer-motion";

type MatchParams = {
  name?: string;
  category?: string;
  fromDate?: string;
  toDate?: string;
  keyword?: string;
  documentation?: string;
};

interface Props extends RouteChildrenProps<MatchParams> {
  projects: Array<Project>;
}

function search(params: MatchParams) {
  fetchProjects(params)
    .then((res) => res.data)
    .then((projects) => store.dispatch(updateProjects(projects)))
    .catch(console.error);
}

const Search = (props: Props) => {
  let queryParams: MatchParams = qs.parse(props.location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    queryParams.category
      ? store.dispatch(updateCategory(queryParams.category))
      : {};
    queryParams.name ? store.dispatch(updateName(queryParams.name)) : {};
    queryParams.documentation
      ? store.dispatch(updateDocumentation(queryParams.documentation))
      : {};
    queryParams.fromDate
      ? store.dispatch(updateFromDate(queryParams.fromDate))
      : {};
    queryParams.toDate ? store.dispatch(updateToDate(queryParams.toDate)) : {};
    queryParams.keyword
      ? store.dispatch(updateKeyword(queryParams.keyword))
      : {};

    if (props.projects.length == 0) {
      search(queryParams);
    }

    return () => {
      store.dispatch(emptyProjects());
    };
  }, []);

  return (
    <motion.div
      className="container-fluid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="row">
        <div className="col-md-2 qui-searchbox-md d-none d-lg-block">
          <SearchBox
            searchCallback={() => {
              history.push({
                pathname: "/search",
                search: `${buildQueryParams(queryParams)}`,
              });
              search(queryParams);
            }}
          />
        </div>
        <div className="col-md-10 qui-box mt-5">
          <div className="container-fluid">
            <div className="qui-search-header p-2 pl-4 qui-font-title">
              Proyectos
            </div>
            {props.projects.map((p, idx) => (
              <ProjectSummary project={p} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const mapStateToProps = (root: RootState) => {
  return root.search;
};

export default hot(module)(connect(mapStateToProps)(Search));
