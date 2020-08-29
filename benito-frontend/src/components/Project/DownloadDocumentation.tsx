import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Documentation } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { benitoHost } from "../../config";

type Props = {
  documentation: Documentation;
};

const DownloadDocumentation = (props: Props) => {
  const downloadLink = `${benitoHost}/benito/documents/${props.documentation.driveId}`;
  return (
    <div className="qui-font-text qui-summary mt-3 cursor-pointer pl-md-3 pr-md-3 font-size-11 font-size-16-md">
      <a href={downloadLink}>
        <FontAwesomeIcon icon={faDownload} className="qui-icon" />{" "}
        {props.documentation.fileName}
      </a>
    </div>
  );
};

export default hot(module)(DownloadDocumentation);
