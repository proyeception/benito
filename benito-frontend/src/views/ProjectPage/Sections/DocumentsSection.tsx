import React from "react";
import { hot } from "react-hot-loader";
import { Project } from "../../../types";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/documentsStyle";
import { benitoHost } from "../../../config";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles(styles);

type DocumentsSectionProps = {
  project: Project;
};

const DocumentsSection = ({ project }: DocumentsSectionProps) => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <h2 className={classes.title} style={{ textAlign: "center" }}>
            Ficha técnica
          </h2>
        </GridItem>
        <GridItem xs={12} md={6}>
          <GridContainer justify="between" className={classes.description}>
            <GridItem xs={12} md={6}>
              Fecha de publicación
            </GridItem>
            <GridItem xs={12} md={6}>
              {project.creationDate}
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} md={6} className={classes.documentsContainer}>
          {project.documentation.map((d, idx) => (
            <a
              key={idx}
              href={`${benitoHost}/benito/documents/${d.driveId}`}
              className={classes.document}
            >
              <div>
                <GetAppIcon />
              </div>
              <div>{d.fileName}</div>
            </a>
          ))}
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default hot(module)(DocumentsSection);
