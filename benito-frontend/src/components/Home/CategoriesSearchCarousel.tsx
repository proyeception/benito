import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Category } from "../../types";
import Carousel from "react-bootstrap/Carousel";
import CategorySearch from "./CategorySearch";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import axios, { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import store from "../../store";
import { updateCategories } from "../../actions/home";

type Props = {
  categories: Array<Category>;
};

const CategoriesSearchCarousel = ({ categories }: Props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, _: any) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/categories`,
    };

    axios
      .request<Array<Category>>(config)
      .then((res) => res.data)
      .then((categories) => store.dispatch(updateCategories(categories)))
      .catch(console.error);
  }, []);

  return (
    <div className="container mt-3">
      <div className="text-center pt-3 pb-3 text-uppercase font-weight-bold qui-featured-title">
        Tendencias
      </div>
      <div className="mt-3">
        {categories.length > 0 ? (
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {categories.map((category, idx) => {
              return (
                <Carousel.Item key={idx}>
                  <CategorySearch category={category} />
                </Carousel.Item>
              );
            })}
          </Carousel>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  categories: rootState.home.categories,
});

export default hot(module)(connect(mapStateToProps)(CategoriesSearchCarousel));
