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
import { Link, Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import featuredStyle from "../../../assets/jss/material-kit-react/views/homeSections/featuredSection";
import classNames from "classnames";
import pictureNotFound from "../../../assets/img/proyectate/picture.svg";
import { RootState } from "../../../reducers";
import { SessionState } from "../../../store/session/types";
import { connect } from "react-redux";
import withCustomizedRecommendations from "../../../hooks/withCustomizedRecommendations";

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

interface RecommendationSectionProps extends RouteComponentProps {
  session?: SessionState;
}

const styles = (theme: Theme) => {
  return { ...featuredStyle(theme), ...imagesStyles, cardTitle, container };
};

const useStyles = makeStyles(styles);

const RecommendationsSection = (props: RecommendationSectionProps) => {

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  const featured = withCustomizedRecommendations();
  const classes = useStyles();

  if (featured.type == "ERROR") {
    return <Redirect to={{ pathname: "/error" }} />;
  }

  if (featured.type == "PENDING") {
    return <Spinner color={color}/>;
  }

  if (featured.value.length == 0) {
    return <div></div>;
  }

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <h2
        className={classes.title}
        style={{ textAlign: "center", paddingTop: "20px", color:color }}
      >
        ESPECIALMENTE PARA VOS
      </h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item"
        dotListClass="custom-dot-list-style"
      >
        {featured.value.map((project, index) => (
          <Card
            key={index}
            className={classes.card}
            style={{ maxWidth: "20rem", height: "420px", boxShadow: "none" }}
          >
            <img
              style={{ height: "180px", width: "100%", display: "block" }}
              className={classNames(
                classes.imgCard,
                classes.imgRaised,
                classes.imgFit
              )}
              src={project.pictureUrl || pictureNotFound}
              alt={project.title}
            />
            <CardBody className="read-more-container">
              <div className="organization" style={{ color:color }}>
                {project.organization.displayName}
              </div>
              <p className={classNames(classes.cardTitle, classes.longTitle)} style={{ color:color }}>
                {project.title}
              </p>
              <div className="read-more-container">
                <p className="featured-card-text">{project.description}</p>
                <p className="read-more"></p>
              </div>
              <div className="carrousel-button-project">
                <Link to={`/projects/${project.id}`} className="normalize-link">
                  <Button color={color}>Ver más</Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(RecommendationsSection)));
