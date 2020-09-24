import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import CategoriesSearchCarousel from "./CategoriesSearchCarousel";
import HomeSearchBox from "./HomeSearchBox";
import FeaturedGallery from "./FeaturedGallery";
import Proyectate from "./Proyectate";
import FadeIn from "../Common/FadeIn";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import store from "../../store";
import { toggleLoading } from "../../actions/common";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { benitoHost } from "../../config";
import axios from "axios";
import { Project } from "../../types";
import { updateFeaturedProjects } from "../../actions/home";

type Props = {
  loading: Boolean;
};

const Home = (props: Props) => {
  useEffect(() => {
    store.dispatch(toggleLoading(true));
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/projects/featured`,
    };

    axios(config)
      .then((response: AxiosResponse<Array<Project>>) => response.data)
      .then((projects) => store.dispatch(updateFeaturedProjects(projects)))
      .then(() => store.dispatch(toggleLoading(false)))
      .catch(console.error);
  }, []);

  if (props.loading) {
    return <div></div>;
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

const mapStateToProps = (rootState: RootState) => {
  return {
    loading: rootState.common.loading,
  };
};

export default hot(module)(connect(mapStateToProps)(Home));
