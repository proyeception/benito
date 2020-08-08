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
import { RootState } from "../../reducers";
import { connect } from "react-redux";

type Props = {
  searchCallback(): void;
  name: String;
  category: String;
  fromDate: String;
  toDate: String;
  keyword: String;
  documentation: String;
};

const SearchBox = (props: Props) => {
  return (
    <div className="qui-search-box">
      <div className="qui-search-filter">
        <div className="qui-font-text">Nombre</div>
        <input
          className="qui-search-input form-control"
          value={props.name.valueOf()}
          onChange={(e) => store.dispatch(updateName(e.target.value))}
        ></input>
      </div>
      <div className="qui-search-filter">
        <div className="qui-font-text">Categoría</div>
        <input
          className="qui-search-input form-control"
          value={props.category.valueOf()}
          onChange={(e) => store.dispatch(updateCategory(e.target.value))}
        ></input>
      </div>
      <div className="qui-search-filter">
        <div className="qui-font-text">Fechas</div>
        <div className="qui-date-filter-container">
          <div className="row no-gutters">
            <div className="col-6 pr-1">
              <input
                type="date"
                className="qui-search-input-date form-control"
                placeholder="Desde"
                name="Fecha inicio"
                value={props.fromDate.valueOf()}
                onChange={(e) => store.dispatch(updateFromDate(e.target.value))}
              ></input>
            </div>
            <div className="col-6 pl-1">
              <input
                type="date"
                className="qui-search-input-date form-control"
                placeholder="Hasta"
                name="Fecha fin"
                value={props.toDate.valueOf()}
                onChange={(e) => store.dispatch(updateToDate(e.target.value))}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="qui-search-filter">
        <div className="qui-font-text">Palabra clave</div>
        <input
          className="qui-search-input form-control"
          value={props.keyword.valueOf()}
          onChange={(e) => store.dispatch(updateKeyword(e.target.value))}
        ></input>
      </div>
      <div className="qui-search-filter">
        <div className="qui-font-text">Documentación</div>
        <input
          className="qui-search-input form-control"
          value={props.documentation.valueOf()}
          onChange={(e) => store.dispatch(updateDocumentation(e.target.value))}
        ></input>
      </div>
      <div className="qui-search-filter">
        <div className="qui-font-text">Ordenar proyectos</div>
        <select
          className="qui-search-combo form-control"
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
};

const mapStateToprops = (rootState: RootState) => {
  return rootState.search;
};

export default hot(module)(connect(mapStateToprops)(SearchBox));
