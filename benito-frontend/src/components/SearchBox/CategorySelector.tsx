import { InputLabel, Select, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { updateCategory } from "../../actions/search";
import { RootState } from "../../reducers";
import store from "../../store";
import { Category } from "../../types";

type CategorySelectorProps = {
  categories: Array<Category>;
  category?: Category;
  variant?: "standard" | "outlined" | "filled" | undefined;
};

const CategorySelector = (props: CategorySelectorProps) => (
  <div>
    <Autocomplete
      fullWidth
      options={props.categories.sort((a, b) => { return a.name.localeCompare(b.name) })}
      getOptionLabel={(option) => option.name}
      defaultValue={props.category}
      onChange={(e, c) => {
        store.dispatch(updateCategory(c!));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label="Categoría"
          variant={props.variant}
        />
      )}
    />
  </div>
);

const mapStateToProps = (rootState: RootState) => {
  return {
    categories: rootState.common.categories,
    category: rootState.search.category,
  };
};

export default hot(module)(connect(mapStateToProps)(CategorySelector));
