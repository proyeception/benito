import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import CategorySelector from "../../Common/CategorySelector";
import { connect } from "react-redux";
import { RootState } from "../../../reducers";
import store from "../../../store";
import {
  updateName,
  updateDocumentation,
  updateKeyword,
  updateToDate,
  updateFromDate,
} from "../../../actions/search";

type Props = {
  name: String;
  category: String;
  fromDate: String;
  toDate: String;
  keyword: String;
  documentation: String;
};

const AdvancedSearch = (props: Props) => (
  <div className="qui-hamburger-advaned-search-container">
    <div className="container-fluid pt-3 pb-4">
      <div className="row no-gutters ">
        <div className="col-12 text-uppercase font-weight-bold">Nombre</div>
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            value={props.name.valueOf()}
            onChange={(e) => store.dispatch(updateName(e.currentTarget.value))}
          />
        </div>
        <div className="col-12 mt-2 font-weight-bold text-uppercase">
          Fechas
        </div>
        <div className="col-6 pr-1">
          <input
            type="date"
            className="form-control"
            placeholder="Principio"
            value={props.fromDate.valueOf()}
            onChange={(e) =>
              store.dispatch(updateFromDate(e.currentTarget.value))
            }
          />
        </div>
        <div className="col-6 pl-1">
          <input
            type="date"
            className="form-control"
            placeholder="Fin"
            value={props.toDate.valueOf()}
            onChange={(e) =>
              store.dispatch(updateToDate(e.currentTarget.value))
            }
          />
        </div>
        <div className="col-12 mt-2 font-weight-bold text-uppercase">
          Palabra clave
        </div>
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            value={props.keyword.valueOf()}
            onChange={(e) =>
              store.dispatch(updateKeyword(e.currentTarget.value))
            }
          />
        </div>
        <div className="col-12 mt-2 font-weight-bold text-uppercase">
          Documentación
        </div>
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            value={props.documentation.valueOf()}
            onChange={(e) =>
              store.dispatch(updateDocumentation(e.currentTarget.value))
            }
          />
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
