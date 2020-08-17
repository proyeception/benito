import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Link } from "react-router-dom";

export type Project = {
  id: String;
  title: String;
  description: String;
  extraContent: string;
  posterUrl: string;
  authors: Array<Person>;
  creationDate: Date;
  tags: Array<String>;
  documentation: Array<Documentation>;
};

export type Person = {
  username: String;
  profileUrl: String;
  fullName: String;
};

export type Documentation = {
  fileName: String;
  id: String;
}

type Props = {
  project: Project;
};

const ProjectSummary = (props: Props) => (
  <div className="row container-fluid mt-3 ml-0">
    <div className="col-sm-12 col-md-10">
      <div className="qui-summary-title qui-font-title">
        <Link to={{ pathname: `/projects/${props.project.id}` }}>
          {props.project.title}
        </Link>
      </div>
      <div className="d-sm-block d-md-none">
        <img className="qui-summary-image-sm" src={props.project.posterUrl} />
      </div>
      <div className="qui-summary qui-font-text mt-3">
        {props.project.description}
      </div>
      <div className="qui-authors">
        {props.project.authors.map((a) => a.fullName).join(", ")}
      </div>
    </div>
    <div className="col-md-2 d-none d-lg-block">
      <img className="qui-summary-image-md" src={props.project.posterUrl} />
    </div>
  </div>
);

export default hot(module)(ProjectSummary);
