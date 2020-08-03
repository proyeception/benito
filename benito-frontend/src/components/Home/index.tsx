import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import CategoriesSearchCarousel from "./CategoriesSearchCarousel";
import HomeSearchBox from "./HomeSearchBox";
import FeaturedGallery from "./FeaturedGallery";
import Proyectate from "./Proyectate";
import Statistics from "./Statistics";

type Props = {};

const Home = (_: Props) => {
  return (
    <div>
      <HomeSearchBox />
      <FeaturedGallery />
      <Proyectate />
      <Statistics />
      <CategoriesSearchCarousel />
    </div>
  );
};

export default hot(module)(Home);
