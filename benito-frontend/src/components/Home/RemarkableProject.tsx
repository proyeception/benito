import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";

type Props = {
  project: Project;
};

const RemarkableProject = (props: Props) => (
  <div>
    <div>
      <img
        className="d-block w-100 img-fluid qui-remarkable-project"
        src={props.project.posterUrl}
        alt={props.project.title.valueOf()}
      />
    </div>
    <div>
      <div>{props.project.title}</div>
      <div>Por {props.project.authors.map((a) => a.username).join(", ")}</div>
    </div>
  </div>
);

export default hot(module)(RemarkableProject);
