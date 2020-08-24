import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";
import DownloadDocumentation from "./DownloadDocumentation";

type Props = {
  project: Project;
};

const Documents = (props: Props) => {
  if (props.project.documentation.length > 0) {
    return (
      <div className="col-md-6">
        <div className="qui-project-subtitle">Documentación</div>
        {props.project.documentation.map((d, idx) => (
            <DownloadDocumentation documentation={d} key={idx} />)
          )
        }
      </div>
    );
  } else {
    return (
      <div className="col-md-6">
        <div className="qui-project-subtitle">Documentación</div>
        <div className="qui-font-text qui-summary mt-3">
          El proyecto todavía no cuenta con documentación 😧
        </div>
      </div>
    );
  }
};

export default hot(module)(Documents);
