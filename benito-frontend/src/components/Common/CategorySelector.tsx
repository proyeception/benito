import React from "react";
import { hot } from "react-hot-loader";
import { Category } from "../../types";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import store from "../../store";
import { updateCategory } from "../../actions/search";

type Props = {
  categories: Array<Category>;
  className?: String;
};

const CategorySelector = (props: Props) => (
  <select
    className={`${props.className ? props.className : ""} form-control`}
    onChange={(e) =>
      store.dispatch(
        updateCategory(
          props.categories[e.currentTarget.selectedIndex - 1].tagName
        )
      )
    }
  >
    <option disabled />
    {props.categories.map((cat, idx) => (
      <option value={cat.name.valueOf()} key={idx}>
        {cat.name}
      </option>
    ))}
  </select>
);

const mapStateToProps = (rootState: RootState) => {
  return {
    categories: rootState.common.categories,
  };
};

export default hot(module)(connect(mapStateToProps)(CategorySelector));
