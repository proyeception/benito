import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";

type Props = {
  project: Project;
};

const FeaturedProject = (props: Props) => (
  <div>
    <img
      className="w-100 img-fluid qui-remarkable-project d-none d-sm-block"
      src={props.project.posterUrl}
      alt={props.project.title.valueOf()}
    />
    <div className="d-block d-sm-none">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-uppercase">{props.project.title}</h5>
        </div>
        <img
          className="w-100 img-fluid qui-remarkable-project card-img-bottom qui-card-image"
          src={props.project.posterUrl}
          alt={props.project.title.valueOf()}
        />
        <div className="card-body">
          <p className="card-text">
            {props.project.description.slice(0, 103)}...
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default hot(module)(FeaturedProject);
