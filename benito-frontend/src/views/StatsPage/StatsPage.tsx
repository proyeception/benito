import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import classNames from "classnames";
import styles from "../../assets/jss/material-kit-react/views/homePage";
import { Hidden, makeStyles, TextField } from "@material-ui/core";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Footer from "../../components/Footer/Footer";
import image from "../../assets/img/proyectate/pattern.jpg";
import { ChartOptions } from 'chart.js'
import { Autocomplete } from "@material-ui/lab";
import { Category } from "../../types";
import OrganizationQuantity from "./Sections/OrganizationQuantity"
import CategoryQuantity from "./Sections/CategoryQuantity"
import ProjectCreationTimeline from "./Sections/ProjectCreationTimeline"
import MostPopularProjects from "./Sections/MostPopularProjects";
import MostPopularTags from "./Sections/MostPopularTags";

const useStyles = makeStyles(styles);

type StatsPageProps = {
  customizationToken?: string;
  categories: Array<Category>;
  category?: Category;
};


const StatsPage = (props: StatsPageProps) => {
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>
      <Header rightLinks={<HeaderLinks />} fixed color="darkGray" {...rest} />
      <Parallax image={image} filter small>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Proyectate</h1>
                <h3 className={classes.subtitle}>
                  La plataforma para impulsar tu proyecto
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <h1 className={classes.bigTitle}>ESTADÍSTICAS</h1>
            <p>En esta página vas a poder ver dinámicamente estadísticas que recolectamos de los proyectos que tenemos en Proyectate.</p>
            </GridItem >
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <ProjectCreationTimeline />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={6}>
              <OrganizationQuantity />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={6}>
              <CategoryQuantity />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <MostPopularProjects />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={9}>
              <MostPopularTags />
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    categories: rootState.common.categories,
    customizationToken: rootState.common.customizationToken,
  };
};

export default hot(module)(connect(mapStateToProps)(StatsPage));
