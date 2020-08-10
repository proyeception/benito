import React from "react";
import { hot } from "react-hot-loader";
import store from "../../store";
import { updateSortMethod } from "../../actions/search";
import { SortMethod } from "../../store/search/types";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import CategorySelector from "../Common/CategorySelector";
import NameInput from "../Common/NameInput";
import FromDateInput from "../Common/FromDateInput";
import ToDateInput from "../Common/ToDateInput";
import KeywordInput from "../Common/KeywordInput";
import DocumentationInput from "../Common/DocumentationInput";
import SearchButton from "../Common/SearchButton";

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
        <NameInput className="qui-search-input" />
      </div>
      <div className="qui-search-filter">
        <div className="qui-font-text">Categoría</div>
        <CategorySelector className="qui-search-input" />
      </div>
      <div className="qui-search-filter">
        <div className="qui-font-text">Fechas</div>
        <div className="qui-date-filter-container">
          <div className="row no-gutters">
            <div className="col-6 pr-1">
              <FromDateInput
                placeholder="Desde"
                className="qui-search-input-date"
              />
            </div>
            <div className="col-6 pl-1">
              <ToDateInput
                placeholder="Hasta"
                className="qui-search-input-date"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="qui-search-filter">
        <div className="qui-font-text">Palabra clave</div>
        <KeywordInput className="qui-search-input" />
      </div>
      <div className="qui-search-filter">
        <div className="qui-font-text">Documentación</div>
        <DocumentationInput className="qui-search-input" />
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
      <SearchButton
        className="btn-primary qui-search-btn"
        onSuccess={props.searchCallback}
      />
    </div>
  );
};

const mapStateToprops = (rootState: RootState) => {
  return rootState.search;
};

export default hot(module)(connect(mapStateToprops)(SearchBox));
