import React from "react";
import { hot } from "react-hot-loader";
import store from "../../store";
import {
  updateName,
  updateCategory,
  updateFromDate,
  updateToDate,
  updateKeyword,
  updateDocumentation,
  updateSortMethod,
} from "../../actions/search";
import { SortMethod } from "../../store/search/types";

type Props = {
  searchCallback(): void;
};

const SearchBox = (props: Props) => (
  <div className="qui-search-box">
    <div className="qui-search-filter">
      <div className="qui-font-text">Nombre</div>
      <input
        className="qui-search-input"
        onChange={(e) => store.dispatch(updateName(e.target.value))}
      ></input>
    </div>
    <div className="qui-search-filter">
      <div className="qui-font-text">Categoría</div>
      <input
        className="qui-search-input text-center"
        onChange={(e) => store.dispatch(updateCategory(e.target.value))}
      ></input>
    </div>
    <div className="qui-search-filter">
      <div className="qui-font-text">Fechas</div>
      <div className="qui-date-filter-container">
        <input
          type="date"
          className="qui-search-input-date text-center"
          placeholder="Desde"
          name="Fecha inicio"
          onChange={(e) => store.dispatch(updateFromDate(e.target.value))}
        ></input>
        <input
          type="date"
          className="qui-search-input-date"
          placeholder="Hasta"
          name="Fecha fin"
          onChange={(e) => store.dispatch(updateToDate(e.target.value))}
        ></input>
      </div>
    </div>
    <div className="qui-search-filter">
      <div className="qui-font-text">Palabra clave</div>
      <input
        className="qui-search-input"
        onChange={(e) => store.dispatch(updateKeyword(e.target.value))}
      ></input>
    </div>
    <div className="qui-search-filter">
      <div className="qui-font-text">Documentación</div>
      <input
        className="qui-search-input"
        onChange={(e) => store.dispatch(updateDocumentation(e.target.value))}
      ></input>
    </div>
    <div className="qui-search-filter">
      <div className="qui-font-text">Ordenar proyectos</div>
      <select
        className="qui-search-combo"
        name="sortMethod"
        id="sort"
        onChange={(e) =>
          store.dispatch(
            updateSortMethod(
              Object.values(SortMethod).find(
                (v) => v.valueOf() === e.target.value
              )
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
      </select>
    </div>
    <button
      className="btn-primary qui-search-btn"
      onClick={() => props.searchCallback()}
    >
      Buscar
    </button>
  </div>
);

export default hot(module)(SearchBox);
