import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";
import DownloadDocumentation from "./DownloadDocumentation";

type Props = {
  project: Project;
};

const Documents = (props: Props) => {
  const documentationProper =
    props.project.documentation.length == 0 ? (
      <div className="qui-font-text qui-summary mt-3 font-weight-light pl-md-3 pr-md-3">
        El proyecto todavía no cuenta con documentación 😧
      </div>
    ) : (
      <div className="font-weight-light pl-md-3 pr-md-3">
        {props.project.documentation.map((d, idx) => (
          <DownloadDocumentation documentation={d} key={idx} />
        ))}
      </div>
    );

  return (
    <div className="col-md-6">
      <div className="qui-project-subtitle font-size-13 font-size-24-md">
        Documentación
      </div>
      {documentationProper}
    </div>
  );
};

export default hot(module)(Documents);
