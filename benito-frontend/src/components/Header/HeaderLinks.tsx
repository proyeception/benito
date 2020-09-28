/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

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
import { mapRoleToCollection } from "../../functions/user";
import AuthorLink from "../Links/AuthorLink";

const useStyles = makeStyles(styles);

type Props = {
  isLoggedIn: Boolean;
  userId?: string;
  profilePic?: string;
  role?: Role;
};

const HeaderLinks = (props: Props) => {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {props.isLoggedIn ? (
          <AuthorLink id={props.userId!}>
            <Button color="transparent" className={classNames(classes.navLink)}>
              Mi perfil
            </Button>
          </AuthorLink>
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
  };
};

export default hot(module)(connect(mapStateToProps)(HeaderLinks));
