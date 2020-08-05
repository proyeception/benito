import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Link } from "react-router-dom";
import store from "../../store";
import {
  updateName,
  updateFromDate,
  updateToDate,
  updateCategory,
} from "../../actions/search";

const HomeSearchBox = (_: any) => (
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
                  onChange={(e) =>
                    store.dispatch(updateFromDate(e.currentTarget.value))
                  }
                />
              </div>
              <div className="col-6">
                <input
                  type="date"
                  className="form-control"
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
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    store.dispatch(updateCategory(e.currentTarget.value))
                  }
                />
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

export default hot(module)(HomeSearchBox);
