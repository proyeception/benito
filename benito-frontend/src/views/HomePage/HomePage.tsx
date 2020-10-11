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

const useStyles = makeStyles(styles);

type HomePageProps = {};

const image =
  "https://res.cloudinary.com/proyectate/image/upload/v1600383533/proyectate_90e388a10b.jpg";

const HomePage = (props: HomePageProps) => {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        rightLinks={<HeaderLinks />}
        absolute
        color="transparent"
        {...rest}
      />
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
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    categories: rootState.common.categories,
  };
};

export default hot(module)(connect(mapStateToProps)(HomePage));
