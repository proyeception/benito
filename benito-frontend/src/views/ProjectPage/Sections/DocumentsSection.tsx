import React from "react";
import { hot } from "react-hot-loader";
import { Project } from "../../../types";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import DownloadDocument from "./DownloadDocument";
import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/documentsStyle";
import moment from "moment";
import { Link } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";

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
          <h2 className={classes.subtitle} style={{ textAlign: "center" }}>
            Ficha técnica
          </h2>
        </GridItem>
        <GridItem xs={12} md={6}>
          <GridContainer justify="between" className={classes.description}>
            <GridItem xs={6} md={6}>
              Fecha de publicación
            </GridItem>
            <GridItem xs={6} md={6} style={{ textAlign: "right" }}>
              {moment(project.creationDate)
                .add(1, "days")
                .format("yyyy-MM-DD")
                .toString()}
            </GridItem>
            <GridItem xs={6} md={6}>
              Tags
            </GridItem>
            <GridItem xs={6} md={6} style={{ textAlign: "right" }}>
              {project.tags.map((tag: string) => {
                return (
                  <Link
                    to={`/search?tag=${tag}`}
                    className="normalize-link"
                    style={{ color: "#c41234" }}
                  >
                    {"#" + tag + " "}
                  </Link>
                );
              })}
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} md={6} className={classes.documentsContainer}>
          {project.documentation != undefined ? (
            project.documentation?.map((d, idx) => (
              <DownloadDocument document={d} idx={idx}></DownloadDocument>
            ))
          ) : (
            <Alert
              severity="info"
              icon={false}
              style={{
                marginTop: "30px",
                backgroundColor: "#ececec",
              }}
            >
              <AlertTitle>Inicia sesión para ver este contenido!</AlertTitle>
            </Alert>
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default hot(module)(DocumentsSection);
