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
      value={props.sort}
    >
      <MenuItem aria-label="None" value="" />
      <ListSubheader>Fecha de creación</ListSubheader>
      <MenuItem value={SortMethod.DateDesc}>Más recientes</MenuItem>
      <MenuItem value={SortMethod.DateAsc}>Más antiguos</MenuItem>
      <ListSubheader>Alfabético</ListSubheader>
      <MenuItem value={SortMethod.AlphaDesc}>A-Z</MenuItem>
      <MenuItem value={SortMethod.AlphaAsc}>Z-A</MenuItem>
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
