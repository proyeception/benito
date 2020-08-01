import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Category } from "../../types";

type Props = {
  category: Category;
};

const CategorySearch = (props: Props) => (
  <img
    src={props.category.imageUrl.valueOf()}
    className="w-100 img-fluid qui-search-invitation-image"
  />
);

export default hot(module)(CategorySearch);
