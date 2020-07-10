import React from "react";
import { hot } from "react-hot-loader";

const SearchBox = (_: any) => (
  <div>
    <div>
      <div>Nombre</div>
      <input></input>
    </div>
    <div>
      <div>Categoria</div>
      <input></input>
    </div>
    <div>
      <div>Fechas</div>
      <div className="row">
        <input className="col-md-6"></input>
        <input className="col-md-6"></input>
      </div>
    </div>
    <div>
      <div>Palabra clave</div>
      <input></input>
    </div>
    <div>
      <div>Documentación</div>
      <input></input>
    </div>
  </div>
);

export default hot(module)(SearchBox);
