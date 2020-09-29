/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { ExitToApp } from "@material-ui/icons";

// core components
import Button from "../CustomButtons/Button";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import { hot } from "react-hot-loader";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import classNames from "classnames";
import { Role } from "../../types";
import UserLink from "../Links/UserLink";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { invalidateSession } from "../../actions/session";
import { clearSession } from "../../functions/session";
import { LoggedInState, SessionState } from "../../store/session/types";

const useStyles = makeStyles(styles);

interface Props extends RouteComponentProps {
  session: SessionState;
}

const HeaderLinks = (props: Props) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {props.session.isLoggedIn ? (
          <CustomDropdown
            buttonText="Mi cuenta"
            dropdownList={[
              <UserLink role={props.session.role} id={props.session.userId}>
                Mi perfil
              </UserLink>,
              { divider: true },
              <div
                onClick={() => {
                  clearSession((props.session as LoggedInState).token);
                  props.history.push("/");
                  props.history.go(0);
                }}
              >
                Cerrar sesión
              </div>,
            ]}
          />
        ) : (
          <Link to="/login" className="normalize-link">
            <Button color="transparent" className={classes.navLink}>
              <ExitToApp className={classes.socialIcons} /> Iniciar sesión
            </Button>
          </Link>
        )}
      </ListItem>
    </List>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(HeaderLinks)));
