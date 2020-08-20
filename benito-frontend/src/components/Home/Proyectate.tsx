import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { benitoHost } from "../../config";
import { updateProjectTotal } from "../../actions/home";
import store from "../../store";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { resetSearchParameters } from "../../actions/search";

const shareProjects = "https://i.imgur.com/9TvDrss.png";

const search = "https://i.imgur.com/TyS2Ut0.png";

type Props = {
  projectCount: Number;
  categoryCount: Number;
};
const Proyectate = (props: Props) => {
  useEffect(() => {
    axios
      .get<{ total: Number }>(`${benitoHost}/benito/project-count`)
      .then((res) => res.data)
      .then(({ total }) => store.dispatch(updateProjectTotal(total)))
      .catch(console.error);
  }, []);

  return (
    <div className="qui-tour mt-5 pb-5 mb-5">
      <div className="container-md pt-5">
        <div className="row">
          <div className="col-12 col-md-6 center-horizontally flex-column">
            <div className="font-weight-bold qui-tour-title">
              Compartí tus ideas 🤝
            </div>
            <div className="qui-tour-text">
              Cargá tu proyecto, subí la documentación y compartilo con la
              comunidad! Lo podés actualizar cuando quieras.
            </div>
          </div>
          <div className="col-12 col-md-6 center mt-4 mt-md-0">
            <img src={shareProjects} className="img-fluid qui-tour-image" />
          </div>
          <div className="d-none d-md-block col-md-6 center pt-5">
            <img src={search} className="qui-tour-image img-fluid" />
          </div>
          <div className="col-12 col-md-6 pt-5 center-horizontally flex-column">
            <div className="font-weight-bold qui-tour-title">
              Encontrá proyectos 🔭
            </div>
            <div className="qui-tour-text">
              Usá los filtros personalizados para encontrar proyectos que te
              interesen. Descubrí recomendaciónes y proyectos relacionados. Mirá
              los proyectos mas buscados.
            </div>
          </div>
          <div className="d-flex d-md-none col-12 center mt-2">
            <img src={search} className="qui-tour-image img-fluid" />
          </div>
          <div className="col-12 pt-3 pt-md-5 center-horizontally flex-column">
            <div className="font-weight-bold qui-tour-title text-center">
              Más de{" "}
              {props.projectCount ? props.projectCount.valueOf() - 2 : ""}{" "}
              proyectos en {props.categoryCount} categorías!
            </div>
            <div className="font-weight-bold qui-tour-search-title text-center">
              Empezá a buscar ya! 👀
            </div>
            <div className="center mt-3">
              <Link
                to="search"
                style={{ textDecoration: "none" }}
                onClick={() => store.dispatch(resetSearchParameters())}
              >
                <div className="btn btn-primary qui-tour-search-button font-weight-bold">
                  Ver todos los proyectos
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    categoryCount: rootState.common.categories.length,
    projectCount: rootState.home.projectTotal,
  };
};

export default hot(module)(connect(mapStateToProps)(Proyectate));
