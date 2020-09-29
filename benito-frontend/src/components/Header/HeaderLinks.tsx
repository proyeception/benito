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
            buttonProps={{
              color: "transparent",
            }}
            buttonText={props.session.fullName}
            dropdownList={[
              <UserLink
                role={props.session.role}
                id={props.session.userId}
                className={classes.alignCenter}
              >
                <Person />
                <span style={{ paddingLeft: "15px" }}>Mi perfil</span>
              </UserLink>,
              <Link
                to="/me/profile"
                className={classNames("normalize-link", classes.alignCenter)}
              >
                <Settings />{" "}
                <span style={{ paddingLeft: "15px" }}>Configuración</span>
              </Link>,
              { divider: true },
              <div
                className={classes.alignCenter}
                onClick={() => {
                  clearSession((props.session as LoggedInState).token);
                  props.history.push("/");
                  props.history.go(0);
                }}
              >
                <MeetingRoom />{" "}
                <span style={{ paddingLeft: "15px" }}>Cerrar sesión</span>
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
