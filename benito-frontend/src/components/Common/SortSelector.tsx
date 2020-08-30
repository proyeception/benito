import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import store from "../../store";
import { updateSortMethod } from "../../actions/search";
import { SortMethod } from "../../store/search/types";

type Props = {
  className?: String;
};

const SortSelector = (props: Props) => (
  <select
    className={`form-control ${props.className ? props.className : ""}`}
    name="sortMethod"
    id="sort"
    onChange={(e) =>
      store.dispatch(
        updateSortMethod(
          Object.values(SortMethod).find((v) => v.valueOf() === e.target.value)
        )
      )
    }
  >
    <optgroup label="Fecha de creación">
      <option value={SortMethod.DateDesc}>Más recientes</option>
      <option value={SortMethod.DateAsc}>Más antiguos</option>
    </optgroup>
    <optgroup label="Alfabético">
      <option value={SortMethod.AlphaAsc}>A - Z</option>
      <option value={SortMethod.AlphaDesc}>Z - A</option>
    </optgroup>
    <optgroup label="Cantidad de vistas">
      <option value={SortMethod.ViewsDesc}>Más vistas</option>
      <option value={SortMethod.ViewsAsc}>Menos vistas</option>
    </optgroup>
  </select>
);

export default hot(module)(SortSelector);
