import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";
import { Link } from "react-router-dom";
import { noImageAvailableVertical } from "../../constants";
import Dotdotdot from "react-clamp";

type Props = {
  project: Project;
};

const Project = (props: Props) => (
  <div className="card qui-user-profile-project-card">
    <div className="row no-gutters h-100">
      <div className="d-none d-md-block col-md-4">
        <div className="qui-user-profile-project-image-container text-center border-right">
          <img
            src={props.project.pictureUrl || noImageAvailableVertical}
            alt={props.project.title.valueOf()}
            className="qui-user-profile-project-image"
          />
        </div>
      </div>
      <div className="col-12 col-md-8">
        <div className="card-body">
          <Link className="normalize-link" to={`/projects/${props.project.id}`}>
            <div className="d-flex d-md-block align-items-center pb-3 mb-md-0">
              <div className="d-block d-md-none">
                <div className="qui-user-profile-project-image-container-sm mr-4">
                  <img
                    src={
                      props.project.pictureUrl?.valueOf() ||
                      noImageAvailableVertical
                    }
                    alt="avatar"
                    className="w-100 img-circle text-center"
                  />
                </div>
              </div>
              <h5 className="card-title text-truncate">
                {props.project.title}
              </h5>
            </div>
          </Link>
          <Dotdotdot clamp={3} className="card-text three-line-text-clamp">
            {props.project.description}
          </Dotdotdot>
          <div className="card-text position-absolute text-right bottom-1 right-1">
            <small className="text-muted">
              {props.project.organization.displayName}
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default hot(module)(Project);
