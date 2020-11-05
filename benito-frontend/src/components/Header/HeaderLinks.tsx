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
import MG from "../../assets/img/proyectate/magnifying-glass.png";
import store from "../../store";
import { invalidateSession, updateSessionSelectedOrganization, updateSessionState } from "../../actions/session";
import { Organization } from "../../types";

const useStyles = makeStyles(styles);

interface Props extends RouteComponentProps {
  session: SessionState;
}

const HeaderLinks = (props: Props) => {

  let color: string = "#c41234"
  let userOrganizations: Array<Organization> = []
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
    userOrganizations = props.session.organizations
  }

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
        <Settings /> <span style={{ paddingLeft: "15px" }}>Editar perfil</span>
      </Link>,
    ];

    if (session.role == "SUPERVISOR") {
      drop.push(
        <Link
          to="/projects/create"
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
          store.dispatch(invalidateSession());
        }}
      >
        <MeetingRoom />{" "}
        <span style={{ paddingLeft: "15px" }}>Cerrar sesión</span>
      </div>
    );

    return (
      <List className={classes.list}>
        {(userOrganizations.length > 1) ?
          (<ListItem className={classes.listItem} style={{color: "white !important"}}>
            <CustomDropdown
              buttonProps={{
                color: "transparent",
                size: "lg"
              }}
              buttonText={session.selectedOrganization.name}
              dropdownList={userOrganizations.map((s: Organization, idx) => (
                <div key={idx}  onClick={(s) => {
                    if(props.session.isLoggedIn){
                      let organi: Organization = session.organizations[idx]
                      store.dispatch(
                        updateSessionState({
                          ...props.session,
                          selectedOrganization: organi
                        })
                      )
                  }
              }}>{s.name.toUpperCase()}</div>
              ))}
              style={{color: "white !important", fontWeight: 500, fontSize: "0.875rem !important"}}
              color={color}
            />
          </ListItem>) : (<span style={{ display: "none" }}></span>)
        }
        <ListItem className={classes.listItem} style={{color: "white !important"}}>
          <CustomDropdown
            buttonProps={{
              color: "transparent",
              size: "lg"
            }}
            buttonText={session.fullName}
            dropdownList={drop}
            style={{color: "white !important"}}
            color={color}
          />
        </ListItem>
      </List>
    );
  };

  return (
    <List className={classes.list} style={{color: "white !important"}}>
      <ListItem className={classes.listItem}>
        <Link to="/search">
          <Button color="transparent" className={classes.navLink}>
            <img src={MG} alt="Lupa" style={{ height: "25px", margin: "0" }} />
          </Button>
        </Link>
      </ListItem>
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
