import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import CategoriesSearchCarousel from "./CategoriesSearchCarousel";
import HomeSearchBox from "./HomeSearchBox";
import FeaturedGallery from "./FeaturedGallery";
import Proyectate from "./Proyectate";

type Props = {};

const Home = (_: Props) => {
  return (
    <div>
      <HomeSearchBox />
      <FeaturedGallery />
      <Proyectate />
      <CategoriesSearchCarousel />
    </div>
  );
};

export default hot(module)(Home);
