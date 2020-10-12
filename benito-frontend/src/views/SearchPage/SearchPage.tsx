import React from "react";
import { hot } from "react-hot-loader";
import { RouteChildrenProps } from "react-router-dom";
import { ERROR, PENDING } from "../../hooks/withFetch";
import withProjects from "../../hooks/withProjects";
import { Project, SearchParams } from "../../types";
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
import image from "../../assets/img/proyectate/pattern.jpg"

import styles from "../../assets/jss/material-kit-react/views/searchPage";

// Sections for this page
import { withRouter } from "react-router-dom";
import { Divider, Hidden } from "@material-ui/core";
import SearchBoxSection from "./Sections/SearchBoxSection";
import SearchResultsSection from "./Sections/SearchResultsSection";

const dashboardRoutes: any = [];

const useStyles = makeStyles(styles);

const SearchPage = (props: any) => {
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>
      <Header
        color="darkGray"
        routes={dashboardRoutes}
        rightLinks={<HeaderLinks />}
        fixed
        {...rest}
      />
      <Parallax
        filter
        small
        image={image}
      ></Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div>
            <GridContainer>
              <GridItem
                xs={12}
                sm={12}
                md={3}
                className={classes.searchBox}
                id="search-box"
              >
                <Hidden only={["xs", "sm"]}>
                  <SearchBoxSection />
                </Hidden>
              </GridItem>
              <Divider orientation="vertical" flexItem />
              <GridItem
                xs={12}
                sm={12}
                md={8}
                className={classes.results}
                id="results"
              >
                <SearchResultsSection />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default hot(module)(withRouter(SearchPage));
