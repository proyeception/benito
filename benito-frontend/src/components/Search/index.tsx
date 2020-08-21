import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import SearchBox from "./SearchBox";
import ProjectSummary from "./ProjectSummary";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { Project } from "../../types";
import store from "../../store";
import {
  updateCategory,
  updateName,
  updateDocumentation,
  updateFromDate,
  updateToDate,
  updateKeyword,
  emptyProjects,
  updateProjects,
} from "../../actions/search";
import { fetchProjects } from "../../functions/search";
import qs from "qs";
import { RouteChildrenProps } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "../Common/Loader";
import NoResultsFound from "./NoResultsFound";
import SlideIn from "../Common/SlideIn";
import SearchError from "./SearchError";

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
  name: String;
  category: String;
  fromDate: String;
  toDate: String;
  sortMethod: String;
}

function passQueryParamsToState(queryParams: MatchParams) {
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
  queryParams.keyword ? store.dispatch(updateKeyword(queryParams.keyword)) : {};
}

const Search = (props: Props) => {
  let queryParams: MatchParams = qs.parse(props.location.search, {
    ignoreQueryPrefix: true,
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(projects.length == 0);
  const [isError, setIsError] = useState(false);
  let index = 1;

  const timeout = 50;

  const search = (params?: MatchParams) => {
    fetchProjects(params ? params : props)
      .then((res) => res.data)
      .then((ps) => {
        store.dispatch(updateProjects(ps));
        const intervalId = setInterval(() => {
          setProjects(ps.slice(0, index));
          index++;
        }, 50);
        setTimeout(() => clearInterval(intervalId), (ps.length + 1) * timeout);
      })
      .then(() => setLoading(false))
      .catch((e) => {
        console.error(e);
        setIsError(true);
      });
  };

  useEffect(() => {
    passQueryParamsToState(queryParams);
    search(queryParams);

    return () => {
      store.dispatch(emptyProjects());
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 qui-searchbox-md d-none d-md-block">
          <SearchBox
            searchCallback={() => {
              setLoading(true);
              search();
            }}
          />
        </div>
        <div className="col-md-10 qui-box mt-md-5 min-h-240 min-h-720-md">
          <div className="qui-search-header p-2 pl-4 font-size-24 font-size-48-md un-ml-1 un-ml-md-0 un-mr-1 un-mr-0-md">
            Proyectos
          </div>
          {isError ? (
            <SearchError />
          ) : loading ? (
            <div className="center min-h-240 min-h-720-md">
              <Loader />
            </div>
          ) : props.projects.length == 0 ? (
            <NoResultsFound />
          ) : (
            <div className="pl-4 pr-2 un-ml-3 un-ml-md-0 un-mr-1 un-mr-md-0">
              {projects.map((p, idx) => (
                <SlideIn key={idx}>
                  <ProjectSummary project={p} />
                </SlideIn>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (root: RootState) => {
  return root.search;
};

export default hot(module)(connect(mapStateToProps)(Search));
