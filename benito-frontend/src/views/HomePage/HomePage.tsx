import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import classNames from "classnames";
import styles from "../../assets/jss/material-kit-react/views/homePage";
import { Hidden, makeStyles } from "@material-ui/core";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Footer from "../../components/Footer/Footer";
import SearchBoxSection from "./Sections/SearchBoxSection";
import CategoriesSection from "./Sections/CategoriesSection";
import FeaturedSection from "./Sections/FeaturedSection";
import image from "../../assets/img/proyectate/pattern.jpg";
import Cookies from "js-cookie";
import RecommendationsSection from "./Sections/RecommendationsSection";

const useStyles = makeStyles(styles);

type HomePageProps = {
  customizationToken?: string;
};

const HomePage = (props: HomePageProps) => {
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
        <Hidden smDown>
          <SearchBoxSection />
        </Hidden>
        <FeaturedSection />
        <CategoriesSection />
        {props.customizationToken && (
          <RecommendationsSection
            customizationToken={props.customizationToken}
          />
        )}
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

export default hot(module)(connect(mapStateToProps)(HomePage));
