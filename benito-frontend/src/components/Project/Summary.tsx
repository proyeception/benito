import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";
import Separator from "./Separator";

type Props = {
  project: Project;
};

const Summary = (props: Props) => {
  return (
    <div className="col-md-12 mt-3 mt-md-5 mb-md-4">
      <div className="qui-project-subtitle font-size-13 font-size-24-md d-flex">
        Resumen
      </div>
      <div className="pl-md-3 pr-md-3">
        <div className="qui-summary font-size-11 font-size-16-md qui-font-text mt-2 mt-md-3 font-weight-light">
          {props.project.description}
        </div>
      </div>
      <Separator display="d-block d-md-none" />
    </div>
  );
};

export default hot(module)(Summary);
