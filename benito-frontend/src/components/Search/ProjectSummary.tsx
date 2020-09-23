import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";
import { Link } from "react-router-dom";
import { noImageAvailableVertical } from "../../constants";

type Props = {
  project: Project;
};

const ProjectSummary = (props: Props) => (
  <div className="row container-fluid mt-3 ml-0">
    <div className="col-sm-12 col-md-10">
      <div className="qui-summary-title font-size-13 font-size-24-md">
        <Link
          to={{ pathname: `/projects/${props.project.id}` }}
          style={{ color: "black" }}
        >
          {props.project.title}
        </Link>
      </div>
      <div className="d-sm-block d-md-none">
        <img
          className="qui-summary-image-sm"
          src={props.project.pictureUrl || noImageAvailableVertical}
        />
      </div>
      <div className="font-weight-lighter qui-font-text font-size-11 font-size-16-md mt-3 ml-md-3">
        {props.project.description}
      </div>
      <div className="font-size-10 font-size-16-md text-right text-muted font-weight-light">
        {props.project.authors.map((a) => a.fullName).join(", ")}
      </div>
    </div>
    <div className="col-md-2 d-none d-md-flex align-items-center">
      <img
        className="qui-summary-image-md"
        src={props.project.pictureUrl || noImageAvailableVertical}
      />
    </div>
  </div>
);

export default hot(module)(ProjectSummary);
