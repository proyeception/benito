import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import CategorySelector from "../../Common/CategorySelector";
import { connect } from "react-redux";
import { RootState } from "../../../reducers";

type Props = {
  name: String;
  category: String;
  fromDate: String;
  toDate: String;
  keyword: String;
  documentation: String;
};

const AdvancedSearch = (props: Props) => (
  <div className="container-fluid mt-3 mb-4">
    <div className="row">
      <div className="col-12">Nombre</div>
      <div className="col-12">
        <input
          type="text"
          className="form-control"
          value={props.name.valueOf()}
        />
      </div>
      <div className="col-12">Fechas</div>
      <div className="col-6">
        <input
          type="text"
          className="form-control"
          placeholder="Principio"
          value={props.fromDate.valueOf()}
        />
      </div>
      <div className="col-6">
        <input
          type="text"
          className="form-control"
          placeholder="Fin"
          value={props.toDate.valueOf()}
        />
      </div>
      <div className="col-12">Categoría</div>
      <div className="col-12">
        <CategorySelector />
      </div>
      <div className="col-12">Palabra clave</div>
      <div className="col-12">
        <input
          type="text"
          className="form-control"
          value={props.keyword.valueOf()}
        />
      </div>
      <div className="col-12">Documentación</div>
      <div className="col-12">
        <input
          type="text"
          className="form-control"
          value={props.documentation.valueOf()}
        />
      </div>
    </div>
  </div>
);

const mapStateToProps = (rootState: RootState) => {
  return rootState.search;
};

export default hot(module)(connect(mapStateToProps)(AdvancedSearch));
