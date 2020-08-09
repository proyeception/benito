import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import "./hamburger.scss";
import { slide as Menu } from "react-burger-menu";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import store from "../../store";
import { toggleHamburgerButton } from "../../actions/common";
import { updateProjects } from "../../actions/search";
import { Redirect } from "react-router-dom";
import { fetchProjects } from "../../functions/search";

const searchIconUrl =
  "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png";

type Props = {
  isOpen: Boolean;
};

type State = {
  doRedirect: Boolean;
};

class HamburgerMenu extends React.Component<Props, State> {
  constructor(props: Props, ctx: any) {
    super(props, ctx);
    this.state = {
      doRedirect: false,
    };
  }
  render() {
    if (this.state.doRedirect) {
      this.setState({ doRedirect: false });
      return <Redirect to="/search" />;
    }

    return (
      <div className="d-block d-md-none">
        <Menu
          width={296}
          customBurgerIcon={
            <img
              src={searchIconUrl}
              className="qui-search-icon invert-colors"
            />
          }
          isOpen={this.props.isOpen.valueOf()}
          onStateChange={(it) =>
            store.dispatch(toggleHamburgerButton(it.isOpen))
          }
        >
          <div className="container-fluid qui-mobile-search-container">
            <div className="row no-gutters">
              <div className="col-11" style={{ marginLeft: "-15px" }}>
                <input
                  type="text"
                  className="form-control qui-mobile-search"
                  placeholder="Buscar"
                />
              </div>
              <div
                className="col-1 center qui-search-icon-button"
                style={{ marginRight: "-15px" }}
              >
                <img
                  src={searchIconUrl}
                  className="qui-search-icon-button"
                  onClick={() => {
                    fetchProjects()
                      .then((res) => res.data)
                      .then((projects) =>
                        store.dispatch(updateProjects(projects))
                      )
                      .then(() => store.dispatch(toggleHamburgerButton(false)))
                      .then(() => this.setState({ doRedirect: true }))
                      .catch(console.error);
                  }}
                ></img>
              </div>
            </div>
          </div>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (rootState: RootState) => {
  return {
    isOpen: rootState.common.isMenuOpen,
  };
};

export default hot(module)(connect(mapStateToProps)(HamburgerMenu));
