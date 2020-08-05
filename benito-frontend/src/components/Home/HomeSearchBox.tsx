import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Link } from "react-router-dom";
import store from "../../store";
import { updateName, updateFromDate, updateToDate } from "../../actions/search";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import CategorySelector from "../Common/CategorySelector";

type Props = {
  name: String;
  toDate: String;
  fromDate: String;
  category: String;
};

const HomeSearchBox = (props: Props) => (
  <div className="qui-home-search-box-container d-none d-md-block">
    <div className="qui-home-search-box container">
      <div className="qui-home-search-box-title">
        Buscá proyectos que te interesen
      </div>
      <div className="qui-home-search-box-subtitle">
        Elegí entre más de 100 categorías de todo tipo
      </div>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-4">
            <div className="qui-home-search-box-item mb-2">Nombre</div>
            <input
              type="text"
              className="form-control"
              value={props.name.valueOf()}
              onChange={(e) =>
                store.dispatch(updateName(e.currentTarget.value))
              }
            />
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-12 qui-home-search-box-item mb-2">Fecha</div>
              <div className="col-6">
                <input
                  type="date"
                  className="form-control"
                  value={props.fromDate.valueOf()}
                  onChange={(e) =>
                    store.dispatch(updateFromDate(e.currentTarget.value))
                  }
                />
              </div>
              <div className="col-6">
                <input
                  type="date"
                  className="form-control"
                  value={props.toDate.valueOf()}
                  onChange={(e) =>
                    store.dispatch(updateToDate(e.currentTarget.value))
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-12 qui-home-search-box-item mb-2">
                Categoria
              </div>
              <div className="col-6">
                <CategorySelector />
              </div>
              <div className="col-6">
                <Link to="search" style={{ textDecoration: "none" }}>
                  <div className="qui-home-search-box-button pb-2 pt-2 center">
                    Buscar
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (rootState: RootState) => {
  return rootState.search;
};

export default hot(module)(connect(mapStateToProps)(HomeSearchBox));
