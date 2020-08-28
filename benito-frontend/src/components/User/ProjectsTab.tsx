import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../types";
import Project from "./Project";
import Separator from "../Project/Separator";

type Props = {
  user: Person;
};

const ProjectsTab = (props: Props) => {
  return (
    <div>
      <Separator display="d-block d-md-none" color="light" />
      <div className="container">
        <div className="font-size-24 font-size-36-md mt-4 mt-md-0 mb-3 mb-md-5">
          Proyectos
        </div>
        <div className="row">
          {props.user.projects.map((p, idx) => (
            <Project project={p} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default hot(module)(ProjectsTab);
