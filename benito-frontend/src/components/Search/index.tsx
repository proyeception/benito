import React from "react";
import { hot } from "react-hot-loader";
import ProjectSummary from "./ProjectSummary";
import SearchBox from "./SearchBox";

const Search = (_: any) => (
  <div className="row">
    <div className="col-md-2 qui-searchbox-md">
      <SearchBox />
    </div>
    <div className="col-md-10">
      <div className="qui-search-header p-2 pl-4 qui-font-title">
        <div>Proyectos</div>
      </div>
      <div className=""></div>
      <ProjectSummary />
      <hr />
      <ProjectSummary />
    </div>
  </div>
);

export default hot(module)(Search);
