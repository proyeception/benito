import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../types";
import Project from "./Project";

type Props = {
  user: Person;
};

const ProjectsTab = (props: Props) => (
  <div>
    <div className="font-size-36-md">Proyectos</div>
    <div className="container mt-5">
      <div className="row">
        {props.user.projects.map((p, idx) => (
          <Project project={p} key={idx} />
        ))}
      </div>
    </div>
  </div>
);

export default hot(module)(ProjectsTab);
