import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import CategorySelector from "../Common/CategorySelector";
import NameInput from "../Common/NameInput";
import FromDateInput from "../Common/FromDateInput";
import ToDateInput from "../Common/ToDateInput";
import SearchButton from "../Common/SearchButton";

type Props = {
  name: String;
  toDate: String;
  fromDate: String;
  category: String;
};

class HomeSearchBox extends React.Component<Props> {
  constructor(props: Props, ctx: any) {
    super(props, ctx);
  }

  render() {
    return (
      <div className="bg-white d-none d-md-block pt-4 pb-4">
        <div className="qui-home-search-box text-white container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 font-size-24">
                Buscá proyectos que te interesen
              </div>
              <div className="col-12 font-size-18">
                Elegí entre más de 100 categorías de todo tipo
              </div>
              <div className="col-4 mt-3 font-size-14 mb-2">Nombre</div>
              <div className="col-4 mt-3 font-size-14 mb-2">Fecha</div>
              <div className="col-4 mt-3 font-size-14 mb-2">Categoría</div>
              <div className="col-4">
                <NameInput />
              </div>
              <div className="col-2">
                <FromDateInput />
              </div>
              <div className="col-2">
                <ToDateInput />
              </div>
              <div className="col-2">
                <CategorySelector />
              </div>
              <div className="col-2">
                <SearchButton
                  className="qui-home-search-box-button font-size-18 btn btn-block btn-info pb-2 pt-2 center font-weight-bold"
                  style={{ color: "white", borderRadius: "32px" }}
                />
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
