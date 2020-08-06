import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import store from "../../store";
import {
  updateName,
  updateFromDate,
  updateToDate,
  updateProjects,
} from "../../actions/search";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import CategorySelector from "../Common/CategorySelector";
import { fetchProjects } from "../../functions/search";

type Props = {
  name: String;
  toDate: String;
  fromDate: String;
  category: String;
  setDoRedirect: () => void;
};

type State = {
  loading: Boolean;
};

class HomeSearchBox extends React.Component<Props, State> {
  constructor(props: Props, ctx: any) {
    super(props, ctx);
    this.state = {
      loading: false,
    };

    this.search = this.search.bind(this);
  }

  search() {
    this.setState({ loading: true }, () =>
      fetchProjects()
        .then((res) => res.data)
        .then((projects) => store.dispatch(updateProjects(projects)))
        .then(() => this.setState({ loading: false }))
        .then(() => this.props.setDoRedirect())
        .catch(console.error)
    );
  }

  render() {
    return (
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
                  value={this.props.name.valueOf()}
                  onChange={(e) =>
                    store.dispatch(updateName(e.currentTarget.value))
                  }
                />
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-12 qui-home-search-box-item mb-2">
                    Fecha
                  </div>
                  <div className="col-6">
                    <input
                      type="date"
                      className="form-control"
                      value={this.props.fromDate.valueOf()}
                      onChange={(e) =>
                        store.dispatch(updateFromDate(e.currentTarget.value))
                      }
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="date"
                      className="form-control"
                      value={this.props.toDate.valueOf()}
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
                    <button
                      type="button"
                      className="btn btn-block btn-info qui-home-search-box-button pb-2 pt-2 center font-weight-bold"
                      onClick={() => {
                        if (!this.state.loading) {
                          this.search();
                        }
                      }}
                      disabled={this.state.loading.valueOf()}
                    >
                      <span hidden={this.state.loading.valueOf()}>Buscar</span>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                        hidden={!this.state.loading.valueOf()}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (rootState: RootState) => {
  return rootState.search;
};

export default hot(module)(connect(mapStateToProps)(HomeSearchBox));
