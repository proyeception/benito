import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Category } from "../../types";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import store from "../../store";
import { updateCategory, resetSearchParameters } from "../../actions/search";

type Props = {
  category: Category;
};

const CategorySearch = ({ category }: Props) => (
  <Link
    to={`/search?category=${category.tagName}`}
    onClick={() => {
      store.dispatch(resetSearchParameters());
      store.dispatch(updateCategory(category.tagName));
    }}
  >
    <div>
      <img
        src={category.imageUrl.valueOf()}
        className="w-100 qui-search-invitation-image"
      />
      <Carousel.Caption>
        <h3>{category.name}</h3>
      </Carousel.Caption>
    </div>
  </Link>
);

export default hot(module)(CategorySearch);
