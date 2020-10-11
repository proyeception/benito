import { InputLabel, ListSubheader, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { updateSortMethod } from "../../actions/search";
import { RootState } from "../../reducers";
import store from "../../store";
import { SortMethod } from "../../types";

type SortProps = {
  sort: SortMethod;
  variant?: "outlined" | "filled" | "standard";
};

const Sort = (props: SortProps) => (
  <div>
    <InputLabel htmlFor="sort">Ordenamiento</InputLabel>
    <Select
      onChange={(e) => {
        store.dispatch(updateSortMethod(e.target.value as SortMethod));
      }}
      fullWidth
      inputProps={{
        name: "sort",
        id: "sort",
      }}
      variant={props.variant}
      value={props.sort}
    >
      <MenuItem aria-label="None" value="" />
      <ListSubheader>Fecha de creación</ListSubheader>
      <MenuItem value={SortMethod.DateAsc}>Más recientes</MenuItem>
      <MenuItem value={SortMethod.DateDesc}>Más antiguos</MenuItem>
      <ListSubheader>Alfabético</ListSubheader>
      <MenuItem value={SortMethod.AlphaAsc}>A-Z</MenuItem>
      <MenuItem value={SortMethod.AlphaDesc}>Z-A</MenuItem>
      <ListSubheader>Visitas</ListSubheader>
      <MenuItem value={SortMethod.ViewsDesc}>Más visitas</MenuItem>
      <MenuItem value={SortMethod.ViewsAsc}>Menos visitas</MenuItem>
    </Select>
  </div>
);

const mapStateToProps = (rootState: RootState) => {
  return {
    sort: rootState.search.orderBy,
  };
};

export default hot(module)(connect(mapStateToProps)(Sort));
