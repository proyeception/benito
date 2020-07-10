import React from "react";
import { hot } from "react-hot-loader";
import ProjectSummary from "./ProjectSummary";

const Search = (_: any) => (
  <div>
    <div className="qui-search-header p-2 pl-4 qui-font-title">
      <div>Proyectos</div>
    </div>
    <div className=""></div>
    <ProjectSummary />
    <hr />
    <ProjectSummary />
  </div>
);

export default hot(module)(Search);
