import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const proyectate =
  "https://res.cloudinary.com/proyectate/image/upload/v1596477365/logo_transparent_yvuwjr.png";

const Proyectate = (_: any) => (
  <div className="qui-proyectate mt-5 mb-3">
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          <img
            src={proyectate}
            alt="Proyectate"
            className="qui-proyectate-logo"
          />
        </div>
        <div className="col-6 font-weight-bold center text-center">
          Proyectate es una plataforma para mostrarle tus proyectos al mundo.
        </div>
      </div>
    </div>
  </div>
);

export default hot(module)(Proyectate);
