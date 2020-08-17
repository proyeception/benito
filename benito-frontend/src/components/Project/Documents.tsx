import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";

type Props = {
  project: Project;
};

const Documents = (_: Props) => {
  return (
    <div className="col-md-6">
      <div className="qui-project-subtitle">Documentación</div>
    </div>
  );
};

export default hot(module)(Documents);
