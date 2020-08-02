import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { benitoHost } from "../../config";
import store from "../../store";
import { Project } from "../../types";
import { updateFeaturedProjects } from "../../actions/home";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import FeaturedProject from "./FeaturedProject";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type Props = {
  featuredProjects: Array<Project>;
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
  },
};

const FeaturedGallery = ({ featuredProjects }: Props) => {
  useEffect(() => {
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/projects/top-10`,
    };

    axios(config)
      .then((response: AxiosResponse<Array<Project>>) => response.data)
      .then((projects) => store.dispatch(updateFeaturedProjects(projects)))
      .catch(console.error);
  }, []);

  return (
    <div className="container mt-3 pt-3">
      <div className="text-uppercase font-weight-bold text-center qui-featured-title">
        Los más destacados
      </div>
      <Carousel partialVisible={true} responsive={responsive}>
        {featuredProjects.map((project, index) => (
          <FeaturedProject key={index} project={project} />
        ))}
      </Carousel>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  featuredProjects: state.home.featuredProjects,
});

export default hot(module)(connect(mapStateToProps)(FeaturedGallery));
