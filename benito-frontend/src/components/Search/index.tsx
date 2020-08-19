import React, { useEffect, useState } from "react";
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
import { fetchProjects } from "../../functions/search";
import qs from "qs";
import { RouteChildrenProps } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "../Common/Loader";
import NoResultsFound from "./NoResultsFound";
import FadeIn from "../Common/FadeIn";
import SlideIn from "../Common/SlideIn";

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

const Search = (props: Props) => {
  let queryParams: MatchParams = qs.parse(props.location.search, {
    ignoreQueryPrefix: true,
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(projects.length == 0);
  let index = 1;

  const search = () => {
    fetchProjects(queryParams)
      .then((res) => res.data)
      .then((ps) => {
        store.dispatch(updateProjects(ps));
        setInterval(() => {
          setProjects(ps.slice(0, index));
          index++;
        }, 50);
      })
      .then(() => setLoading(false))
      .catch(console.error);
  };

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

    if (projects.length == 0) {
      search();
    }

    return () => {
      store.dispatch(emptyProjects());
    };
  }, []);

  return (
    <FadeIn className="container-fluid">
      <div className="row">
        <div className="col-md-2 qui-searchbox-md d-none d-lg-block">
          <SearchBox
            searchCallback={() => {
              setLoading(true);
              search();
            }}
          />
        </div>
        <div className="col-md-10 qui-box mt-md-5">
          <div className="qui-search-header p-2 pl-4 qui-font-title uncol-sm-l-1 uncol-sm-r-1">
            Proyectos
          </div>
          {loading ? (
            <div className="center">
              <Loader />
            </div>
          ) : store.getState().search.projects.length == 0 ? (
            <NoResultsFound />
          ) : (
            <div className="pl-4 pr-2 uncol-sm-l-3 uncol-sm-r-1">
              {projects.map((p, idx) => (
                <SlideIn key={idx}>
                  <ProjectSummary project={p} />
                </SlideIn>
              ))}
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

const mapStateToProps = (root: RootState) => {
  return root.search;
};

export default hot(module)(connect(mapStateToProps)(Search));
