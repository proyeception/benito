import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Category } from "../../types";
import Carousel from "react-bootstrap/Carousel";
import CategorySearch from "./CategorySearch";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import FadeIn from "../Common/FadeIn";

type Props = {
  categories: Array<Category>;
};

const CategoriesSearchCarousel = ({ categories }: Props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, _: any) => {
    setIndex(selectedIndex);
  };

  return (
    <FadeIn className="container mt-5 pl-5 pr-5 d-none d-md-block">
      <div className="row">
        <div className="col-12 center">
          <div className="pt-3 pb-3 font-weight-bold font-size-24">
            No sabés qué buscar? Empezá por alguna de estas categorías!
          </div>
        </div>
        <div className="col-12">
          <div className="mt-3">
            {categories.length > 0 ? (
              <Carousel activeIndex={index} onSelect={handleSelect}>
                {categories.map((category, idx) => (
                  <Carousel.Item key={idx}>
                    <CategorySearch category={category} />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  categories: rootState.common.categories,
});

export default hot(module)(connect(mapStateToProps)(CategoriesSearchCarousel));
