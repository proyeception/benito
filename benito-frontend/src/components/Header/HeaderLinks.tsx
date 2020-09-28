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

const useStyles = makeStyles(styles);

interface Props extends RouteComponentProps {
  isLoggedIn: Boolean;
  userId?: string;
  profilePic?: string;
  role?: Role;
  token?: string;
}

const HeaderLinks = (props: Props) => {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {props.isLoggedIn ? (
          <CustomDropdown
            buttonText="Mi cuenta"
            dropdownList={[
              <UserLink role={props.role!} id={props.userId!}>
                Mi perfil
              </UserLink>,
              { divider: true },
              <div
                onClick={() => {
                  clearSession(props.token!);
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
    isLoggedIn: rootState.session.isLoggedIn,
    userId: rootState.session.userId,
    profilePic: rootState.session.profilePicture,
    role: rootState.session.role,
    token: rootState.session.token,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(HeaderLinks)));
