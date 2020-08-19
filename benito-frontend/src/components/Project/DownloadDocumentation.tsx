import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Documentation } from "../../types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

type Props = {
  documentation: Documentation;
};

const DownloadDocumentation = (props: Props) => {
    return (
      <div className="qui-font-text qui-summary mt-3">
         <a onClick={()=> alert()}><FontAwesomeIcon icon={faDownload} className='qui-icon'/> {props.documentation.fileName}</a>
      </div>
    );
};

export default hot(module)(DownloadDocumentation);
