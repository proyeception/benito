import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const projectImage =
  "https://assets.pokemon.com/assets//cms2-es-es/img/video-games/_tiles/pokemon-cafe-mix/launch/pokemon-cafe-mix-169.jpg";

  export type Project = {
    id: String;
    title: String;
    description: String;
    posterUrl: String;
    authors: Array<Person>;
  };

  type Person = {
    user: String;
    profileUrl: String;
  };

  type Props = {
    project: Project
  }

const ProjectSummary = (props: Props) => (
  <div className="row container-fluid mt-3 ml-0">
    <div className="col-sm-12 col-md-10">
      <div className="qui-summary-title qui-font-title">
        {props.project.title}
      </div>
      <div className="d-sm-block d-md-none">
        <img className="qui-summary-image-sm" src={projectImage} />
      </div>
      <div className="qui-summary qui-font-text mt-3">
        {props.project.description}
      </div>
      <div className="qui-authors">
        {props.project.authors.map(a => a.user).join(", ")}
      </div>
    </div>
    <div className="col-md-2 d-none d-lg-block">
      <img src={projectImage} className="qui-summary-image-md" />
    </div>
  </div>
);

export default hot(module)(ProjectSummary);
