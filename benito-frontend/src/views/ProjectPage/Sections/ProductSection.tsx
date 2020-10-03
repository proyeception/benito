import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";
import { Project } from "../../../types";
import MarkdownCompiler from "../../../components/MarkdownCompiler/MarkdownCompiler";

const useStyles = makeStyles(styles);

type ProductSectionProps = {
  project: Project;
};

export default function ProductSection({ project }: ProductSectionProps) {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <h2 className={classes.title} style={{ textAlign: "center" }}>
            Acerca de {project.title}
          </h2>
          <h5 className={classes.description}>{project.description}</h5>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <div className={classes.description}>
            <MarkdownCompiler source={project.extraContent.valueOf()} />
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
