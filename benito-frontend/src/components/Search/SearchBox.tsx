import React from "react";
import { hot } from "react-hot-loader";
import store from "../../store";
import { updateName } from "../../actions/search";

type Props = {
  searchCallback(): void;
  categoryCallback(category: string): void;
  fromDateCallback(fromDate: string): void;
  toDateCallback(toDate: string): void;
  keywordCallback(keyword: string): void;
  documentationCallback(documentation: string): void;
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
      <div className="qui-font-text">Categoria</div>
      <input
        className="qui-search-input"
        onChange={(e) => props.categoryCallback(e.target.value)}
      ></input>
    </div>
    <div className="qui-search-filter">
      <div className="qui-font-text">Fechas</div>
      <div className="qui-date-filter-container">
        <input
          type="date"
          className="qui-search-input-date"
          placeholder="Desde"
          name="Fecha inicio"
          onChange={(e) => props.fromDateCallback(e.target.value)}
        ></input>
        <input
          type="date"
          className="qui-search-input-date"
          placeholder="Hasta"
          name="Fecha fin"
          onChange={(e) => props.toDateCallback(e.target.value)}
        ></input>
      </div>
    </div>
    <div className="qui-search-filter">
      <div className="qui-font-text">Palabra clave</div>
      <input
        className="qui-search-input"
        onChange={(e) => props.keywordCallback(e.target.value)}
      ></input>
    </div>
    <div className="qui-search-filter">
      <div className="qui-font-text">Documentación</div>
      <input
        className="qui-search-input"
        onChange={(e) => props.documentationCallback(e.target.value)}
      ></input>
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
