import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import "./hamburger.scss";
import { slide as Menu } from "react-burger-menu";
import { RootState } from "../../../reducers";
import { connect } from "react-redux";
import store from "../../../store";
import { toggleHamburgerButton } from "../../../actions/common";
import Search from "./Search";
import { searchIconUrl } from "./constants";
import Categories from "./Categories";

type Props = {
  isOpen: Boolean;
};

const HamburgerMenu = (props: Props) => {
  return (
    <div className="d-block d-md-none">
      <Menu
        width={296}
        customBurgerIcon={
          <img src={searchIconUrl} className="qui-search-icon invert-colors" />
        }
        isOpen={props.isOpen.valueOf()}
        onStateChange={(it) => store.dispatch(toggleHamburgerButton(it.isOpen))}
      >
        <Search />
        <Categories />
      </Menu>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    isOpen: rootState.common.isMenuOpen,
  };
};

export default hot(module)(connect(mapStateToProps)(HamburgerMenu));
