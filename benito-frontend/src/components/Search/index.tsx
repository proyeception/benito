import React from "react";
import { hot } from "react-hot-loader";
import ProjectSummary from "./ProjectSummary";

const Search = (_: any) => (
  <div>
    <div>Proyectos</div>
    <ProjectSummary />
    <hr />
    <ProjectSummary />
  </div>
);

export default hot(module)(Search);
