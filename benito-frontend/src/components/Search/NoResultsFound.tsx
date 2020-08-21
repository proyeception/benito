import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const NoResultsFound = (_: any) => (
  <div className="container-fluid ml-3">
    <div className="mt-5">
      <div className="center font-size-18 font-size-36-md font-weight-bold">
        Lo lamento, no encontramos ningún proyecto para tu búsqueda :(
      </div>
      <div className="mt-5 ml-3">
        <div className="font-size-16 font-weight-bolder">
          Algunos consejos a la hora de buscar
        </div>
        <div className="mt-3">
          <ul>
            <li className="mt-2 font-size-13 font-size-16-md font-weight-lighter">
              Revisá la ortografía de los parámetros
            </li>
            <li className="mt-2 font-size-13 font-size-16-md font-weight-lighter">
              Probá con un rango de fechas más grande
            </li>
            <li className="mt-2 font-size-13 font-size-16-md font-weight-lighter">
              Usá términos más cortos para los nombres
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default hot(module)(NoResultsFound);
