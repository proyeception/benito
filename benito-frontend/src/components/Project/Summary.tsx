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
      <div className="qui-project-subtitle font-size-13 font-size-30-md d-flex">
        Resumen
      </div>
      <div className="qui-summary qui-font-text mt-3">
        {props.project.description}
      </div>
      <Separator />
    </div>
  );
};

export default hot(module)(Summary);
