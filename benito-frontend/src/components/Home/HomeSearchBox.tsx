import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const HomeSearchBox = (_: any) => (
  <div className="qui-home-search-box-container d-none d-md-block">
    <div className="qui-home-search-box container">
      <div className="qui-home-search-box-title">
        Buscá proyectos que te interesen
      </div>
      <div className="qui-home-search-box-subtitle">
        Elegí entre más de 100 categorías de todo tipo
      </div>
      <div className="row mt-3">
        <div className="col-4">
          <div className="qui-home-search-box-item mb-2">Nombre</div>
          <input type="text" className="form-control" />
        </div>
        <div className="col-4">
          <div className="container-fluid">
            <div className="qui-home-search-box-item mb-2">Fecha</div>
            <div className="row">
              <div className="col-6">
                <input type="date" className="form-control" />
              </div>
              <div className="col-6">
                <input type="date" className="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="container">
            <div className="qui-home-search-box-item mb-2">Categoria</div>
            <div className="row">
              <div className="col-6">
                <input type="text" className="form-control" />
              </div>
              <div className="col-6">
                <div className="qui-home-search-box-button pb-2 pt-2 center">
                  Buscar
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default hot(module)(HomeSearchBox);
