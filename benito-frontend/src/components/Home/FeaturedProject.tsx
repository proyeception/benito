import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";
import { Link } from "react-router-dom";

type Props = {
  project: Project;
};

const FeaturedProject = ({ project }: Props) => {
  return (
    <div className="card qui-featured-card">
      <img
        className="card-img-top qui-card-image"
        src={project.posterUrl.valueOf()}
      />
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">
          {project.description.length > 100
            ? project.description.slice(0, 97) + "..."
            : project.description}
        </p>
        <Link to={`/projects/${project.id}`}>
          <div className="btn btn-primary">Ver más</div>
        </Link>
      </div>
    </div>
  );
};

export default hot(module)(FeaturedProject);
