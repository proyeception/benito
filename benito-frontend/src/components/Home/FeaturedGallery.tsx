import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../types";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import FeaturedProject from "./FeaturedProject";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type Props = {
  featuredProjects: Array<Project>;
};

const responsive = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 1600 },
    items: 4,
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

const FeaturedGallery = ({ featuredProjects }: Props) => {
  return (
    <div className="container-fluid mt-3 pt-3">
      <div className="font-weight-bold text-center font-size-24">
        Los más destacados
      </div>
      <div className=" qui-featured-container mt-3">
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
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={index} project={project} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  featuredProjects: state.home.featuredProjects,
});

export default hot(module)(connect(mapStateToProps)(FeaturedGallery));
