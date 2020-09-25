import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import CategoriesSearchCarousel from "./CategoriesSearchCarousel";
import HomeSearchBox from "./HomeSearchBox";
import FeaturedGallery from "./FeaturedGallery";
import Proyectate from "./Proyectate";
import FadeIn from "../Common/FadeIn";
import store from "../../store";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { benitoHost } from "../../config";
import axios from "axios";
import { Project } from "../../types";
import { updateFeaturedProjects } from "../../actions/home";
import Loader from "../Common/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/projects/featured`,
    };

    axios(config)
      .then((response: AxiosResponse<Array<Project>>) => response.data)
      .then((projects) => store.dispatch(updateFeaturedProjects(projects)))
      .then(() => setLoading(false))
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="center h-100">
        <Loader />
      </div>
    );
  }

  return (
    <FadeIn className="pt-5">
      <HomeSearchBox />
      <FeaturedGallery />
      <CategoriesSearchCarousel />
      <Proyectate />
    </FadeIn>
  );
};

export default hot(module)(Home);
