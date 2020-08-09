import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import "./hamburger.scss";
import { slide as Menu } from "react-burger-menu";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import store from "../../store";
import { toggleHamburgerButton } from "../../actions/common";

const searchIconUrl =
  "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png";

type Props = {
  isOpen: Boolean;
};

const HamburgerMenu = (props: Props) => (
  <div className="d-block d-md-none">
    <Menu
      width={296}
      customBurgerIcon={
        <img src={searchIconUrl} className="qui-search-icon invert-colors" />
      }
      isOpen={props.isOpen.valueOf()}
      onStateChange={(it) => store.dispatch(toggleHamburgerButton(it.isOpen))}
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
          <div className="col-1 center" style={{ marginRight: "-15px" }}>
            <img src={searchIconUrl} className="qui-search-icon-button" />
          </div>
        </div>
      </div>
    </Menu>
  </div>
);

const mapStateToProps = (rootState: RootState) => {
  return {
    isOpen: rootState.common.isMenuOpen,
  };
};

export default hot(module)(connect(mapStateToProps)(HamburgerMenu));
