import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";
import { Link } from "react-router-dom";

type Props = {
  project: Project;
};

const Project = (props: Props) => (
  <div className="col-12 col-md-6 mb-5">
    <div className="card">
      <div className="row no-gutters">
        <div className="col-4">
          <div className="qui-user-profile-project-image-container text-center border-right">
            <img
              src={props.project.posterUrl}
              alt={props.project.title.valueOf()}
              className="qui-user-profile-project-image"
            />
          </div>
        </div>
        <div className="col-8">
          <div className="card-body">
            <Link
              className="normalize-link"
              to={`/projects/${props.project.id}`}
            >
              <h5 className="card-title">{props.project.title}</h5>
            </Link>
            <div className="card-text text-truncate">
              {props.project.description}
            </div>
            <div className="card-text mt-5 text-right">
              <small className="text-muted">
                {props.project.organization.displayName}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default hot(module)(Project);
