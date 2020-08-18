import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const NoResultsFound = (_: any) => (
  <div className="mt-5">
    <div className="center qui-no-projects-title">
      Lo lamento, no encontramos ningún proyecto para tu búsqueda :(
    </div>
    <div className="mt-5 ml-3">
      <div className="qui-no-projects-search-tips-title">
        Algunos consejos a la hora de buscar
      </div>
      <div className="mt-3">
        <ul>
          <li className="mt-2 qui-no-projects-search-tip">
            Revisá la ortografía de los parámetros
          </li>
          <li className="mt-2 qui-no-projects-search-tip">
            Probá con un rango de fechas más grande
          </li>
          <li className="mt-2 qui-no-projects-search-tip">
            Usá términos más cortos para los nombres
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default hot(module)(NoResultsFound);
