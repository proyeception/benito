import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import CategoriesSearchCarousel from "./CategoriesSearchCarousel";
import HomeSearchBox from "./HomeSearchBox";

type Props = {};

const Home = (_: Props) => {
  return (
    <div>
      <HomeSearchBox />
      <CategoriesSearchCarousel />
    </div>
  );
};

export default hot(module)(Home);
