import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { clearSession } from "../../functions/session";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import Login from "../Login";
import { Role } from "../../types";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

interface Props extends RouteComponentProps {
  token?: String;
  userId?: String;
  profilePicture?: String;
  isLoggedIn?: Boolean;
  fetching: Boolean;
  role: Role;
}

const CustomToggle = (props: Props) =>
  React.forwardRef(({ onClick }: any, ref: any) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="qui-user-icon-container cursor-pointer"
    >
      <img
        className="img-circle"
        src={props.profilePicture?.valueOf() || noProfilePicture}
      />
    </div>
  ));

const googleIcon =
  "https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_1/v1533665793/ogdensdorg/p6ckkwxkxi8zd03ja8h0/GoogleButton.png";

const noProfilePicture = "https://simpleicon.com/wp-content/uploads/user1.png";

const User = (props: Props) => {
  if (props.fetching) {
    return <div className="qui-header-user"></div>;
  }

  if (props.isLoggedIn) {
    return (
      <div className="qui-header-user center-vertically justify-content-end pr-2 pr-md-5">
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle(props)} />
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link
                className="normalize-link"
                to={`/${props.role.toLowerCase()}s/${props.userId}`}
                style={{ textDecoration: "none" }}
              >
                <div className="qui-text font-size-18-md">
                  <FontAwesomeIcon icon={faUser} /> Mi perfil
                </div>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <div
                className="qui-text font-size-18-md cursor-pointer"
                onClick={() => {
                  clearSession(props.token);
                  props.history.go(0);
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }

  return (
    <Login
      loginPath="author"
      render={(renderProps) => (
        <div
          onClick={renderProps.onClick}
          className="qui-header-user center-vertically justify-content-end pr-2 pr-md-5 cursor-pointer"
        >
          <div className="qui-user-icon-container">
            <img className="img-circle" src={googleIcon} />
          </div>
        </div>
      )}
    />
  );
};

const mapStateToProps = (rootState: RootState) => {
  return rootState.session;
};

export default hot(module)(withRouter(connect(mapStateToProps)(User)));
