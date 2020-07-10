import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const projectImage =
  "https://assets.pokemon.com/assets//cms2-es-es/img/video-games/_tiles/pokemon-cafe-mix/launch/pokemon-cafe-mix-169.jpg";

const ProjectSummary = (_: any) => (
  <div className="row container-fluid mt-3 ml-0">
    <div className="col-sm-12 col-md-10">
      <div className="qui-summary-title qui-font-title">
        El uso del formato multimedial en ciencias sociales
      </div>
      <div className="d-sm-block d-md-none">
        <img className="qui-summary-image-sm" src={projectImage} />
      </div>
      <div className="qui-summary qui-font-text mt-3">
        En esta ponencia presentamos algunas discusiones que surgieron a partir
        de la realización del multimedia “Pioneras del feminismo, Próceres de la
        Patria. Herencias e inauguraciones en la organización...
      </div>
      <div className="qui-authors">
        Baez, Jesica; Carpentieri, Yanina; Gofman, Cecilia
      </div>
    </div>
    <div className="col-md-2 d-none d-lg-block">
      <img src={projectImage} className="qui-summary-image-md" />
    </div>
  </div>
);

export default hot(module)(ProjectSummary);
