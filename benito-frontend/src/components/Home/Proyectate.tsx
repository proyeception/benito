import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const Proyectate = (_: any) => (
  <div className="qui-proyectate-tour mt-5 mb-3">
    <div className="container pt-5">
      <div className="row">
        <div className="col-6">
          <div className="font-weight-bold qui-proyectate-tour-title">
            Compartí tu proyecto 🤝
          </div>
          <div className="qui-proyectate-tour-text">
            Cargá tu proyecto, subí la documentación y compartilo con la
            comunidad! Lo podés actualizar cuando quieras.
          </div>
        </div>
        <div className="col-6">Imagen</div>
        <div className="col-6">Imagen</div>
        <div className="col-6">
          <div className="font-weight-bold qui-proyectate-tour-title">
            Encontrá proyectos 🔭
          </div>
          <div className="qui-proyectate-tour-text">
            Usá los filtros personalizados para encontrar proyectos que
            interesen. Encontrá recomendaciónes y proyectos relacionados. Mirá
            los proyectos mas buscados.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default hot(module)(Proyectate);
