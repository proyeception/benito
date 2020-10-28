import { Documentation } from "../../../types";
import { benitoHost } from "../../../config";
import React from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import { makeStyles } from "@material-ui/core";
import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/documentsStyle";
import withDownloadLink from "../../../hooks/withDownloadLink";
import { PENDING, ERROR } from "../../../hooks/withFetch";
import Spinner from "../../../components/Spinner/Spinner";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(styles);

type DownloadDocumentProps = {
  document: Documentation;
  idx: number;
};

export default function DownloadDocument({ document, idx }: DownloadDocumentProps) {
  const classes = useStyles();

  const downloadLink = withDownloadLink(document.driveId);

  console.log(downloadLink)

  if (downloadLink.type == PENDING) {
    return <Spinner />;
  }

  console.log(downloadLink)

  if (downloadLink.type == ERROR) {
    return <Redirect to={{ pathname: "/error" }} />;
  }

  console.log(downloadLink)

  return (              
  <a
    key={idx}
    href={downloadLink.value}
    className={classes.document}
  >
    <div>
      <GetAppIcon />
    </div>
    <div>{document.fileName}</div>
  </a>
  )
}