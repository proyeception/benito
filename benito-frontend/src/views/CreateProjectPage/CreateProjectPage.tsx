import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import { Project } from "../../types";

import styles from "../../assets/jss/material-kit-react/views/landingPage";

// Sections for this page
import { hot } from "react-hot-loader";
import { RouteComponentProps, withRouter, Redirect } from "react-router-dom";
import withProject from "../../hooks/withProject";
import { PENDING, ERROR } from "../../hooks/withFetch";
import { Divider } from "@material-ui/core";
import Spinner from "../../components/Spinner/Spinner";
import CreateProjectSection from "./Sections/CreateProjectSection";
import { SessionState } from "../../store/session/types";
import withUser from "../../hooks/withUser";
import { RootState } from "../../reducers";
import { connect } from "react-redux";

const dashboardRoutes: any = [];

const useStyles = makeStyles(styles);

type Any = any;

type MatchParams = {
  id: string;
};

interface Props extends RouteComponentProps<MatchParams>, Any {
  session: SessionState;
}

const ProjectPage = (props: Props) => {
  const classes = useStyles();
  const { ...rest } = props;

  console.log(props.session);
  if (!props.session.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const user = withUser(props.session.role, props.session.userId);

  console.log(user);

  if (user.type == PENDING) {
    return <Spinner/>;
  }

  if (user.type == ERROR) {
    return <Redirect to={{pathname: "/error"}}/>
  }

  //TODO ver que el back devuelva al menos una lista vacía
  if (user.value.organizations[0] == undefined) {
    // error, no puede crear proyectos si no pertenece a al menos una organización
  }

  const emptyProject: Project = {
    id: "",
    title: "",
    description: "",
    authors: [],
    supervisors: [],
    creationDate: new Date(),
    documentation: [],
    tags: [],
    extraContent: "",
    organization: user.value.organizations[0]
  };

  return (
    <div>
      <Header
        color="darkGray"
        routes={dashboardRoutes}
        rightLinks={<HeaderLinks />}
        fixed
        {...rest}
      />
      <Parallax filter image={emptyProject.pictureUrl}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>{emptyProject.title}</h1>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <GridContainer>
          <GridItem
            xs={12}
            sm={12}
            md={9}
            className={classes.container}
          >
          <CreateProjectSection project={emptyProject} />
          </GridItem>
          <Divider orientation="vertical" flexItem />
        </GridContainer>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(ProjectPage)));
