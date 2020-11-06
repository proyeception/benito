import React from "react";
import { hot } from "react-hot-loader";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import withFeaturedProjects from "../../../hooks/withFeaturedProjects";
import Spinner from "../../../components/Spinner/Spinner";
import { makeStyles, Theme } from "@material-ui/core";
import CardBody from "../../../components/Card/CardBody";
import Card from "../../../components/Card/Card";
import imagesStyles from "../../../assets/jss/material-kit-react/imagesStyles";
import { cardTitle, container } from "../../../assets/jss/material-kit-react";
import Button from "../../../components/CustomButtons/Button";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import featuredStyle from "../../../assets/jss/material-kit-react/views/homeSections/featuredSection";
import { Height } from "@material-ui/icons";
import classNames from "classnames";
import pictureNotFound from "../../../assets/img/proyectate/picture.svg"
import ProjectLink from "../../../components/Links/ProjectLink";
import { RootState } from "../../../reducers";
import { SessionState } from "../../../store/session/types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProjectCreationTimeline from "../../StatsPage/Sections/ProjectCreationTimeline";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

interface FeaturedSectionProps extends RouteComponentProps {
  session?: SessionState;
};

const responsive = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 1600 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1599, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
    partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
  },
};

const styles = (theme: Theme) => {
  return { ...featuredStyle(theme), ...imagesStyles, cardTitle, container };
};

const useStyles = makeStyles(styles);

const FeaturedSection = (props: FeaturedSectionProps) => {
  const featured = withFeaturedProjects();
  const classes = useStyles();

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  if (featured.type == "ERROR") {
    return <Redirect to={{ pathname: "/error" }} />;
  }

  if (featured.type == "PENDING") {
    return <Spinner color={color}/>;
  }

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%", backgroundColor: "#EEEEEE", borderRadius: "6px"}}>
        <div style={{paddingBottom: "20px"}}>
        <GridContainer justify="center">
            <GridItem
                xs={12}
                sm={12}
                md={12}
                lg={3}
                id="search-box"
            >
              <div style={{ paddingRight: "30px"}}>
                <h2 className={classes.title} style={{ textAlign: "center", paddingTop: "40px", color:color}}>
                  ESTADÍSTICAS
                </h2>
                <p>Podés ver cuales son los temas más buscados en los distintos años, los más trabajadso en las distintas universidades y facultades y mucho más!</p>
                <div style={{ margin: "auto", textAlign: "center", paddingBottom: "20px", paddingTop: "50px"}}>
                  <Link to="/stats" className="normalize-link">
                    <Button color={color} style={{ margin: "auto"}}>
                      Ver más estadísticas!
                    </Button>
                  </Link>
                </div>
              </div>
            </GridItem>
            <GridItem
                xs={12}
                sm={12}
                md={12}
                lg={8}
                id="results"
            >
                <ProjectCreationTimeline />
            </GridItem>
        </GridContainer>
        </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(FeaturedSection)));