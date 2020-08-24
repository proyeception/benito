import React from "react";
import { hot } from "react-hot-loader";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import CategorySelector from "../Common/CategorySelector";
import NameInput from "../Common/NameInput";
import FromDateInput from "../Common/FromDateInput";
import ToDateInput from "../Common/ToDateInput";
import KeywordInput from "../Common/KeywordInput";
import DocumentationInput from "../Common/DocumentationInput";
import SearchButton from "../Common/SearchButton";
import SortSelector from "../Common/SortSelector";

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
    <div className="qui-search-box bg-white">
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
        <SortSelector className="qui-search-combo qui-search-input" />
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
