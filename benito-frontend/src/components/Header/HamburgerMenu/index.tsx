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
import { Accordion, Card } from "react-bootstrap";

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
        <Accordion>
          <Card className="qui-hamburger-accordion-card-header cursor-pointer">
            <Accordion.Toggle
              as={Card.Header}
              className="text-uppercase font-weight-bold"
              eventKey="0"
            >
              Buscar
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Search />
            </Accordion.Collapse>
          </Card>
          <Card className="qui-hamburger-accordion-card-header cursor-pointer">
            <Accordion.Toggle
              as={Card.Header}
              className="text-uppercase font-weight-bold"
              eventKey="1"
            >
              Categorías
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Categories />
            </Accordion.Collapse>
          </Card>
        </Accordion>
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
