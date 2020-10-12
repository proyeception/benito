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
import { Link } from "react-router-dom";
import featuredStyle from "../../../assets/jss/material-kit-react/views/homeSections/featuredSection";
import { Height } from "@material-ui/icons";

type FeaturedSectionProps = {};

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

  if (featured.type == "ERROR") {
    return <div>Pará loco rompiste algo!!</div>;
  }

  if (featured.type == "PENDING") {
    return <Spinner />;
  }

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <h2 className={classes.title} style={{ textAlign: "center" }}>
        Los más destacados
      </h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px"
        dotListClass="custom-dot-list-style"
      >
        {featured.value.map((project, index) => (
          <Card key={index} style={{ width: "20rem", height:"400px"}}>
            <img
              style={{ height: "180px", width: "100%", display: "block" }}
              className={classes.imgCardTop}
              src={project.pictureUrl}
              alt={project.title}
            />
            <CardBody className="read-more-container">
              <h4 className={classes.cardTitle}>{project.title}</h4>
              <div className="read-more-container">
                <p className="featured-card-text">{project.description}</p>
                <p className="read-more"></p>
              </div>
              <Link to={`/projects/${project.id}`} className="normalize-link">
                <Button color="primary">Ver más</Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default hot(module)(FeaturedSection);
