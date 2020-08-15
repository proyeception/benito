import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import store from "../../store";
import { updateProjects } from "../../actions/search";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import CategorySelector from "../Common/CategorySelector";
import { fetchProjects } from "../../functions/search";
import NameInput from "../Common/NameInput";
import FromDateInput from "../Common/FromDateInput";
import ToDateInput from "../Common/ToDateInput";
import SearchButton from "../Common/SearchButton";

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
          <div className="container-fluid">
            <div className="qui-home-search-box-title ml-3">
              Buscá proyectos que te interesen
            </div>
            <div className="qui-home-search-box-subtitle ml-3">
              Elegí entre más de 100 categorías de todo tipo
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <div className="qui-home-search-box-item mb-2">Nombre</div>
                <NameInput />
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-12 qui-home-search-box-item mb-2">
                    Fecha
                  </div>
                  <div className="col-6">
                    <FromDateInput />
                  </div>
                  <div className="col-6">
                    <ToDateInput />
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
                    <SearchButton
                      className="btn btn-block btn-info qui-home-search-box-button pb-2 pt-2 center font-weight-bold"
                      onSuccess={() => this.props.setDoRedirect()}
                    />
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
