import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import CategorySelector from "../../Common/CategorySelector";
import { connect } from "react-redux";
import { RootState } from "../../../reducers";
import NameInput from "../../Common/NameInput";
import FromDateInput from "../../Common/FromDateInput";
import ToDateInput from "../../Common/ToDateInput";
import DocumentationInput from "../../Common/DocumentationInput";
import KeywordInput from "../../Common/KeywordInput";

const AdvancedSearch = (_: any) => (
  <div className="qui-hamburger-advaned-search-container">
    <div className="container-fluid pt-3 pb-4">
      <div className="row no-gutters ">
        <div className="col-12 text-uppercase font-weight-bold">Nombre</div>
        <div className="col-12">
          <NameInput />
        </div>
        <div className="col-12 mt-2 font-weight-bold text-uppercase">
          Fechas
        </div>
        <div className="col-6 pr-1">
          <FromDateInput placeholder="Principio" />
        </div>
        <div className="col-6 pl-1">
          <ToDateInput placeholder="Fin" />
        </div>
        <div className="col-12 mt-2 font-weight-bold text-uppercase">
          Palabra clave
        </div>
        <div className="col-12">
          <KeywordInput />
        </div>
        <div className="col-12 mt-2 font-weight-bold text-uppercase">
          Documentación
        </div>
        <div className="col-12">
          <DocumentationInput />
        </div>
        <div className="col-12 mt-2 font-weight-bold text-uppercase">
          Categoría
        </div>
        <div className="col-12">
          <CategorySelector />
        </div>
        <div className="col-12 center">
          <div className="qui-hamburger-advanced-search-button mt-4 pl-5 pr-5 font-weight-bold pt-2 pb-2">
            Buscar
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (rootState: RootState) => {
  return rootState.search;
};

export default hot(module)(connect(mapStateToProps)(AdvancedSearch));
