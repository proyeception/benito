import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";

type Props = {
  project: Project;
};

const RemarkableProject = (props: Props) => (
  <img
    className="w-100 img-fluid qui-remarkable-project d-none"
    src={props.project.posterUrl}
    alt={props.project.title.valueOf()}
  />
);

export default hot(module)(RemarkableProject);
