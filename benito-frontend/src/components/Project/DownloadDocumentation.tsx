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
         <a onClick={()=> window.open("https://www.googleapis.com/drive/v3/files/1pbe2TPNv-rATrkOrf9XqCPkL3tSsONKMdFzSMTXVoNQ/export?key=AIzaSyCppSzyFRP0hpan563bk1OdAQnp3ZSK5Q8&mimeType=application/pdf", "_blank")}><FontAwesomeIcon icon={faDownload} className="qui-icon"/> {props.documentation.fileName}</a>
      </div>
    );
};

export default hot(module)(DownloadDocumentation);
