/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { ExitToApp, MeetingRoom, Person, Settings } from "@material-ui/icons";
import CreateIcon from "@material-ui/icons/Create";

// core components
import Button from "../CustomButtons/Button";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import { hot } from "react-hot-loader";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import UserLink from "../Links/UserLink";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { clearSession } from "../../functions/session";
import { LoggedInState, SessionState } from "../../store/session/types";
import classNames from "classnames";
import { Hidden } from "@material-ui/core";

const useStyles = makeStyles(styles);

interface Props extends RouteComponentProps {
  session: SessionState;
}

const HeaderLinks = (props: Props) => {
  const classes = useStyles();

  const dropdown = (session: LoggedInState) => {
    const drop: Array<any> = [
      <UserLink
        role={session.role}
        id={session.userId}
        className={classes.alignCenter}
      >
        <Person />
        <span style={{ paddingLeft: "15px" }}>Mi perfil</span>
      </UserLink>,
      <Link
        to="/me/profile"
        className={classNames("normalize-link", classes.alignCenter)}
      >
        <Settings /> <span style={{ paddingLeft: "15px" }}>Configuración</span>
      </Link>,
    ];

    if (session.role == "SUPERVISOR") {
      drop.push(
        <Link
          to="/create"
          className={classNames("normalize-link", classes.alignCenter)}
        >
          <CreateIcon />{" "}
          <span style={{ paddingLeft: "15px" }}>Crear proyecto</span>
        </Link>
      );
    }

    drop.push(
      { divider: true },
      <div
        className={classes.alignCenter}
        onClick={() => {
          clearSession(session.token);
          props.history.push("/");
          props.history.go(0);
        }}
      >
        <MeetingRoom />{" "}
        <span style={{ paddingLeft: "15px" }}>Cerrar sesión</span>
      </div>
    );

    return (
      <CustomDropdown
        buttonProps={{
          color: "transparent",
        }}
        buttonText={session.fullName}
        dropdownList={drop}
      />
    );
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {props.session.isLoggedIn ? (
          dropdown(props.session)
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
