import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";
import { Link } from "react-router-dom";
import FadeIn from "../Common/FadeIn";

type Props = {
  project: Project;
};

const FeaturedProject = ({ project }: Props) => {
  return (
    <FadeIn className="card qui-featured-card">
      <img
        className="card-img-top qui-card-image"
        src={project.posterUrl.valueOf()}
      />
      <div className="card-body">
        <h5 className="card-title font-size-18">{project.title}</h5>
        <div className="sidebar-box">
          <p className="qui-card-text font-size-14">{project.description}</p>
          <p className="qui-read-more"></p>
        </div>
        <Link to={`/projects/${project.id}`}>
          <div className="btn btn-primary">Ver más</div>
        </Link>
      </div>
    </FadeIn>
  );
};

export default hot(module)(FeaturedProject);
