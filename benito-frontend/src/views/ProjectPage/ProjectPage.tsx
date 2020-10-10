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

import styles from "../../assets/jss/material-kit-react/views/landingPage";

// Sections for this page
import ProductSection from "./Sections/ProductSection";
import TeamSection from "./Sections/TeamSection";
import DocumentsSection from "./Sections/DocumentsSection";
import { hot } from "react-hot-loader";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import withProject from "../../hooks/withProject";
import { PENDING, ERROR } from "../../hooks/withFetch";
import { Divider, Hidden } from "@material-ui/core";
import Recommendations from "./Sections/Recommendations";
import Spinner from "../../components/Spinner/Spinner";

const dashboardRoutes: any = [];

const useStyles = makeStyles(styles);

type Any = any;

type MatchParams = {
  id: string;
};

interface Props extends RouteComponentProps<MatchParams>, Any {}

const ProjectPage = (props: Props) => {
  const classes = useStyles();
  const { ...rest } = props;

  const project = withProject(props.match.params.id);

  if (project.type == PENDING) {
    return <Spinner/>;
  }

  if (project.type == ERROR) {
    return <Redirect to={{pathname: "/error"}}/>;
  }

  return (
    <div>
      <Header
        color="darkGray"
        routes={dashboardRoutes}
        rightLinks={<HeaderLinks />}
        fixed
        {...rest}
      />
      <Parallax filter image={project.value.pictureUrl}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>{project.value.title}</h1>
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
            <ProductSection project={project.value} />
            <TeamSection project={project.value} />
            <DocumentsSection project={project.value} />
          </GridItem>
          <Divider orientation="vertical" flexItem />
          <GridItem
            xs={12}
            sm={12}
            md={2}
            className={classes.recommendations}
          >
            <Recommendations/>
          </GridItem>
        </GridContainer>
      </div>
      <Footer />
    </div>
  );
};

export default hot(module)(withRouter(ProjectPage));
