import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";
import { Project } from "../../../types";
import MarkdownCompiler from "../../../components/MarkdownCompiler/MarkdownCompiler";
import { Edit } from "@material-ui/icons";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { connect } from "react-redux";
import { RootState } from "../../../reducers";
import { hot } from "react-hot-loader";
import { SessionState } from "../../../store/session/types";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import classNames from "classnames";

const useStyles = makeStyles(styles);

interface ProductSectionProps extends RouteComponentProps {
  project: Project;
  session: SessionState;
}

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

const ProductSection = ({ project, session, history }: ProductSectionProps) => {
  const classes = useStyles();

  const showEdit =
    session.isLoggedIn &&
    (project.authors.some((a) => a.id == session.userId) ||
      project.supervisors.some((s) => s.id == session.userId));

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <h2 className={classNames(classes.title)} style={{ textAlign: "center", color: project.organization.color }}>
            Acerca de {project.title}
            {showEdit ? (
              <span>
                <ThemeProvider theme={theme}>
                <Button
                  onClick={() => history.push(`/projects/${project.id}/edit`)}
                  type="button"
                  endIcon
                >
                  <Edit /> Editar
                </Button>
                </ThemeProvider>
              </span>
            ) : (
              <div></div>
            )}
          </h2>
          <h3></h3>
          <p className={classes.description}>{project.description}</p>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <div className={"description"}>
            <MarkdownCompiler source={project.extraContent.valueOf()} />
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    session: rootState.session,
  };
};

export default hot(module)(
  connect(mapStateToProps)(withRouter(ProductSection))
);
