import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";
import { Project } from "../../../types";
import MarkdownCompiler from "../../../components/MarkdownCompiler/MarkdownCompiler";
import CustomInput from "../../../components/CustomInput/CustomInput";

const useStyles = makeStyles(styles);

type CreateProjectSectionProps = {
  project: Project;
};

export default function CreateProjectSection({ project }: CreateProjectSectionProps) {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="left">
        <GridItem xs={12} sm={12} md={12} lg={12}>
            <CustomInput
                labelText="Título"
                id="title"
                formControlProps={{
                  fullWidth: true
                }}
            />
            <CustomInput
                labelText="Sumario"
                id="summary"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                    multiline: true,
                    rowsMax: 4,
                    rows: 4,
                    variant: "outlined"
                }}
            />
        </GridItem>
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