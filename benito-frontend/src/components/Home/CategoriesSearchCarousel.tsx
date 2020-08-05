import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Category } from "../../types";
import Carousel from "react-bootstrap/Carousel";
import CategorySearch from "./CategorySearch";
import { RootState } from "../../reducers";
import { connect } from "react-redux";

type Props = {
  categories: Array<Category>;
};

const CategoriesSearchCarousel = ({ categories }: Props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, _: any) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container-fluid mt-5 pl-5 pr-5">
      <div className="row">
        <div className="col-5 center-vertically">
          <div className="text-left pt-3 pb-3 font-weight-bold qui-category-search-title">
            ¿No sabés qué buscar? ¡Empezá por alguna de estas categorías!
          </div>
        </div>
        <div className="col-7">
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
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  categories: rootState.common.categories,
});

export default hot(module)(connect(mapStateToProps)(CategoriesSearchCarousel));
